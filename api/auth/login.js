import jwt from 'jsonwebtoken';

/* ── Credentials (server-side only — never sent to browser) ── */
const ADMIN_EMAIL    = 'admin@apolloclinicsgr.com';
const ADMIN_PASSWORD = 'Apolloclinicsgr@001admin';
const JWT_SECRET     = process.env.JWT_SECRET || 'hhc_jwt_s3cr3t_k3y_2026_x9z';

/* ── Allowed origins ── */
const ALLOWED_ORIGINS = [
  'https://apolloclinicsrgsgr.vercel.app',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
];

/* ── In-memory rate limiter (per Vercel cold-start lifetime) ── */
const loginAttempts = {};
const MAX_ATTEMPTS  = 5;
const WINDOW_MS     = 15 * 60 * 1000; // 15 minutes

function getRateLimitKey(req) {
  return req.headers['x-forwarded-for']?.split(',')[0]?.trim()
    || req.headers['x-real-ip']
    || 'unknown';
}

function isRateLimited(key) {
  const now = Date.now();
  if (!loginAttempts[key]) loginAttempts[key] = [];
  loginAttempts[key] = loginAttempts[key].filter(ts => now - ts < WINDOW_MS);
  return loginAttempts[key].length >= MAX_ATTEMPTS;
}

function recordLoginAttempt(key) {
  if (!loginAttempts[key]) loginAttempts[key] = [];
  loginAttempts[key].push(Date.now());
}

function clearLoginAttempts(key) {
  delete loginAttempts[key];
}

/* ── Sanitize input ── */
function sanitize(str, maxLen = 254) {
  if (typeof str !== 'string') return '';
  return str.replace(/<[^>]*>/g, '').replace(/[<>"'`\\]/g, '').trim().slice(0, maxLen);
}

/* ── CORS helper ── */
function setCors(req, res) {
  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Max-Age', '86400');
}

export default function handler(req, res) {
  setCors(req, res);

  /* ── Preflight ── */
  if (req.method === 'OPTIONS') return res.status(200).end();

  /* ── Method check ── */
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  /* ── Rate limiting ── */
  const ipKey = getRateLimitKey(req);
  if (isRateLimited(ipKey)) {
    return res.status(429).json({
      error: 'Too many login attempts. Please try again in 15 minutes.',
    });
  }

  /* ── Body validation ── */
  const body = req.body || {};
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ error: 'Invalid request.' });
  }

  const email    = sanitize(body.email, 254);
  const password = typeof body.password === 'string' ? body.password.slice(0, 128) : '';

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  /* ── Credential check ── */
  const emailMatch    = email.toLowerCase() === ADMIN_EMAIL;
  const passwordMatch = password === ADMIN_PASSWORD;

  if (!emailMatch || !passwordMatch) {
    recordLoginAttempt(ipKey);
    // Generic error — no enumeration
    return res.status(401).json({ error: 'Invalid credentials.' });
  }

  /* ── Success — clear rate limit and issue token ── */
  clearLoginAttempts(ipKey);

  const payload = { email: ADMIN_EMAIL, role: 'admin' };
  const token   = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

  return res.status(200).json({
    message:   'Login successful.',
    token,
    expiresIn: 3600,
    admin: {
      email: ADMIN_EMAIL,
      role:  'admin',
      name:  'Apollo Clinic Admin',
    },
  });
}
