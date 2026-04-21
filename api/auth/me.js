import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'hhc_jwt_s3cr3t_k3y_2026_x9z';

/* ── Allowed origins ── */
const ALLOWED_ORIGINS = [
  'https://apolloclinicsrgsgr.vercel.app',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
];

function setCors(req, res) {
  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Max-Age', '86400');
}

export default function handler(req, res) {
  setCors(req, res);

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed.' });

  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied.' });
  }

  const token = authHeader.split(' ')[1];
  if (!token || token.length > 2048) {
    return res.status(401).json({ error: 'Invalid token.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return res.status(200).json({
      admin: {
        email: decoded.email,
        role:  decoded.role,
        name:  'Apollo Clinic Admin',
      },
      tokenExpiresAt: new Date(decoded.exp * 1000).toISOString(),
    });
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Session expired. Please log in again.', expired: true });
    }
    return res.status(401).json({ error: 'Invalid token.' });
  }
}
