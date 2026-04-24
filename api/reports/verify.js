import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'hhc_jwt_s3cr3t_k3y_2026_x9z';

/* ── Allowed origins ── */
const ALLOWED_ORIGINS = [
  'https://apolloclinicsrgsgr.vercel.app',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
];

/* ── Rate limiting (per cold-start lifetime) ── */
const verifyAttempts = {};
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function getIpKey(req) {
  return req.headers['x-forwarded-for']?.split(',')[0]?.trim()
    || req.headers['x-real-ip']
    || 'unknown';
}

function isRateLimited(key) {
  const now = Date.now();
  if (!verifyAttempts[key]) verifyAttempts[key] = [];
  verifyAttempts[key] = verifyAttempts[key].filter(ts => now - ts < WINDOW_MS);
  return verifyAttempts[key].length >= MAX_ATTEMPTS;
}

function recordAttempt(key) {
  if (!verifyAttempts[key]) verifyAttempts[key] = [];
  verifyAttempts[key].push(Date.now());
}

/* ── Sanitize ── */
function sanitize(str, maxLen = 200) {
  if (typeof str !== 'string') return '';
  return str.replace(/<[^>]*>/g, '').replace(/[<>"'`\\]/g, '').trim().slice(0, maxLen);
}

/* ── CORS ── */
function setCors(req, res) {
  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400');
}

/* ── AES-256-GCM Decryption ── */
function decryptData(encryptedStr) {
  // Restore from URL-safe encoding
  const restored = encryptedStr
    .replace(/-/g, '+')
    .replace(/_/g, '/')
    .replace(/~/g, '=');

  const parts = restored.split('.');
  if (parts.length !== 3) throw new Error('Invalid token format');

  const iv = Buffer.from(parts[0], 'base64');
  const authTag = Buffer.from(parts[1], 'base64');
  const ciphertext = parts[2];

  const key = crypto.createHash('sha256').update(JWT_SECRET).digest();
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(ciphertext, 'base64', 'utf8');
  decrypted += decipher.final('utf8');

  return JSON.parse(decrypted);
}

export default async function handler(req, res) {
  setCors(req, res);

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });

  /* ── Rate limit ── */
  const ipKey = getIpKey(req);
  if (isRateLimited(ipKey)) {
    return res.status(429).json({
      error: 'Too many verification attempts. Please try again in 15 minutes.',
    });
  }

  /* ── Parse body ── */
  const body = req.body;
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ error: 'Invalid request.' });
  }

  const token    = typeof body.token === 'string' ? body.token.slice(0, 5000) : '';
  const fullName = sanitize(body.fullName, 100);
  const dob      = sanitize(body.dob, 10);

  if (!token || !fullName || !dob) {
    return res.status(400).json({ error: 'All fields are required: full name and date of birth.' });
  }

  /* ── Decrypt token ── */
  let payload;
  try {
    payload = decryptData(token);
  } catch (err) {
    recordAttempt(ipKey);
    console.warn('[Report Verify] Invalid token decryption attempt from', ipKey);
    return res.status(400).json({ error: 'Invalid or expired report link. Please contact Apollo Clinic.' });
  }

  /* ── Check expiry ── */
  if (payload.exp && Date.now() > payload.exp) {
    return res.status(410).json({ error: 'This report link has expired. Please contact Apollo Clinic for a new link.' });
  }

  /* ── Verify identity ── */
  // Normalize: uppercase, collapse spaces, trim
  const normalizedName = fullName.toUpperCase().replace(/\s+/g, ' ').trim();
  const normalizedDob  = dob.trim();

  console.log('[Report Verify] Submitted name:', JSON.stringify(normalizedName));
  console.log('[Report Verify] Submitted DOB:', JSON.stringify(normalizedDob));

  const submittedNameHash = crypto.createHash('sha256').update(normalizedName).digest('hex');
  const submittedDobHash  = crypto.createHash('sha256').update(normalizedDob).digest('hex');

  console.log('[Report Verify] Name hash match:', submittedNameHash === payload.nh);
  console.log('[Report Verify] DOB hash match:', submittedDobHash === payload.dh);
  console.log('[Report Verify] Expected NH:', payload.nh?.slice(0, 12) + '...');
  console.log('[Report Verify] Got NH:', submittedNameHash.slice(0, 12) + '...');
  console.log('[Report Verify] Expected DH:', payload.dh?.slice(0, 12) + '...');
  console.log('[Report Verify] Got DH:', submittedDobHash.slice(0, 12) + '...');

  const nameMatch = submittedNameHash === payload.nh;
  const dobMatch  = submittedDobHash === payload.dh;

  if (!nameMatch || !dobMatch) {
    recordAttempt(ipKey);
    console.warn('[Report Verify] FAILED from', ipKey, '- Name match:', nameMatch, 'DOB match:', dobMatch);
    // Generic error — no indication of which field is wrong
    return res.status(401).json({ error: 'Verification failed. Please check your full name (in CAPITAL LETTERS) and date of birth.' });
  }

  /* ── Fetch private blob and return as base64 ── */
  try {
    const blobResponse = await fetch(payload.blobUrl, {
      headers: {
        authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
      },
    });

    if (!blobResponse.ok) {
      console.error('[Report Verify] Blob fetch failed:', blobResponse.status);
      return res.status(500).json({ error: 'Unable to retrieve report file. Please contact Apollo Clinic.' });
    }

    const arrayBuffer = await blobResponse.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    const mimeType = payload.mime || 'application/pdf';
    const dataUri = `data:${mimeType};base64,${base64}`;

    return res.status(200).json({
      verified: true,
      report: {
        fileData: dataUri,
        title: payload.title || 'Test Report',
        date: payload.date || '',
        type: payload.type || '',
        mimeType,
      },
    });
  } catch (err) {
    console.error('[Report Verify] File fetch error:', err.message);
    return res.status(500).json({ error: 'Unable to retrieve report file. Please contact Apollo Clinic.' });
  }
}
