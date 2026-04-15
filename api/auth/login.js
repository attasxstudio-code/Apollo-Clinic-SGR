import jwt from 'jsonwebtoken';

const ADMIN_EMAIL    = 'admin@homeheal.com';
const ADMIN_PASSWORD = 'Homeheal@001admin';
const JWT_SECRET     = process.env.JWT_SECRET || 'hhc_jwt_s3cr3t_k3y_2026_x9z';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });

  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const emailMatch    = email.trim().toLowerCase() === ADMIN_EMAIL;
  const passwordMatch = password === ADMIN_PASSWORD;

  if (!emailMatch || !passwordMatch) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }

  const payload = { email: ADMIN_EMAIL, role: 'admin' };
  const token   = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

  return res.status(200).json({
    message:   'Login successful.',
    token,
    expiresIn: 3600,
    admin: {
      email: ADMIN_EMAIL,
      role:  'admin',
      name:  'HomeHeal Admin',
    },
  });
}
