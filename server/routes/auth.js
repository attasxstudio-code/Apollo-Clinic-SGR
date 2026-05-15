const express    = require('express');
const jwt        = require('jsonwebtoken');
const verifyToken = require('../middleware/auth');

const router = express.Router();

const ADMIN_EMAIL    = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

/* ─────────────────────────────────────────
   POST /api/auth/login
   Body: { email, password }
   Returns: { token, expiresIn }
───────────────────────────────────────── */
router.post('/login', (req, res) => {
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD || !process.env.JWT_SECRET) {
    return res.status(500).json({ error: 'Admin authentication is not configured.' });
  }

  const { email, password } = req.body;

  // Validate body
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  // Strict single-admin check
  const emailMatch    = email.trim().toLowerCase() === ADMIN_EMAIL;
  const passwordMatch = password === ADMIN_PASSWORD;

  if (!emailMatch || !passwordMatch) {
    // Return the same error regardless of which field is wrong (prevents enumeration)
    return res.status(401).json({ error: 'Invalid credentials.' });
  }

  // Sign JWT
  const payload = { email: ADMIN_EMAIL, role: 'admin' };
  const token   = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' });

  return res.status(200).json({
    message:   'Login successful.',
    token,
    expiresIn: 900,
    admin: {
      email: ADMIN_EMAIL,
      role:  'admin',
      name:  'Appolo Clinic Admin',
    },
  });
});

/* ─────────────────────────────────────────
   GET /api/auth/me  — Protected
   Header: Authorization: Bearer <token>
   Returns: { admin }
───────────────────────────────────────── */
router.get('/me', verifyToken, (req, res) => {
  return res.status(200).json({
    admin: {
      email: req.admin.email,
      role:  req.admin.role,
      name:  'Appolo Clinic Admin',
    },
    tokenExpiresAt: new Date(req.admin.exp * 1000).toISOString(),
  });
});

/* ─────────────────────────────────────────
   POST /api/auth/logout  (optional)
   Client just drops the token, but this
   endpoint confirms the action server-side.
───────────────────────────────────────── */
router.post('/logout', verifyToken, (_req, res) => {
  return res.status(200).json({ message: 'Logged out successfully.' });
});

module.exports = router;
