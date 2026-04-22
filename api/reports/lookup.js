import { list } from '@vercel/blob';
import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'hhc_jwt_s3cr3t_k3y_2026_x9z';

/* ── Allowed origins ── */
const ALLOWED_ORIGINS = [
  'https://apolloclinicsrgsgr.vercel.app',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
];

/* ── Rate limiting (per cold-start lifetime) ── */
const lookupAttempts = {};
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function getIpKey(req) {
  return req.headers['x-forwarded-for']?.split(',')[0]?.trim()
    || req.headers['x-real-ip']
    || 'unknown';
}

function isRateLimited(key) {
  const now = Date.now();
  if (!lookupAttempts[key]) lookupAttempts[key] = [];
  lookupAttempts[key] = lookupAttempts[key].filter(ts => now - ts < WINDOW_MS);
  return lookupAttempts[key].length >= MAX_ATTEMPTS;
}

function recordAttempt(key) {
  if (!lookupAttempts[key]) lookupAttempts[key] = [];
  lookupAttempts[key].push(Date.now());
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
      error: 'Too many lookup attempts. Please try again in 15 minutes.',
    });
  }

  /* ── Check blob store ── */
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return res.status(500).json({ error: 'Report system is not configured.' });
  }

  /* ── Parse body ── */
  const body = req.body;
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ error: 'Invalid request.' });
  }

  const fullName = sanitize(body.fullName, 100);
  const dob      = sanitize(body.dob, 10);

  if (!fullName || fullName.length < 2 || !dob) {
    return res.status(400).json({ error: 'Please enter your full name and date of birth.' });
  }

  /* ── Hash name + DOB ── */
  const nameHash = crypto.createHash('sha256').update(fullName.toUpperCase().trim()).digest('hex');
  const dobHash  = crypto.createHash('sha256').update(dob.trim()).digest('hex');

  /* ── Search for matching lookup entries ── */
  const prefix = `lookup/${nameHash}_${dobHash}/`;
  let blobs;
  try {
    blobs = await list({
      prefix,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
  } catch (err) {
    console.error('[Report Lookup] Blob list error:', err.message);
    return res.status(500).json({ error: 'Unable to search for reports. Please try again.' });
  }

  if (!blobs.blobs || blobs.blobs.length === 0) {
    recordAttempt(ipKey);
    console.warn('[Report Lookup] No reports found for', ipKey);
    return res.status(404).json({
      error: 'No reports found. Please check your full name (in CAPITAL LETTERS) and date of birth match exactly what was provided to the clinic.',
    });
  }

  /* ── Fetch each lookup entry and decrypt tokens ── */
  const reports = [];
  for (const blob of blobs.blobs) {
    try {
      const entryRes = await fetch(blob.url, {
        headers: { authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` },
      });
      if (!entryRes.ok) continue;

      const entry = await entryRes.json();
      if (!entry.token) continue;

      // Decrypt the token to get report metadata
      const payload = decryptData(entry.token);

      // Check expiry
      if (payload.exp && Date.now() > payload.exp) continue;

      // Verify hash matches (double-check security)
      if (payload.nh !== nameHash || payload.dh !== dobHash) continue;

      reports.push({
        token: entry.token,
        title: payload.title || 'Test Report',
        date: payload.date || '',
        type: payload.type || '',
        mimeType: payload.mime || 'application/pdf',
      });
    } catch (err) {
      console.warn('[Report Lookup] Failed to process blob entry:', err.message);
      continue;
    }
  }

  if (reports.length === 0) {
    recordAttempt(ipKey);
    return res.status(404).json({
      error: 'No valid reports found. Your reports may have expired. Please contact Apollo Clinic.',
    });
  }

  /* ── Success — return report list (without file data) ── */
  return res.status(200).json({
    found: true,
    count: reports.length,
    reports,
  });
}
