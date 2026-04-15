const jwt = require('jsonwebtoken');

/**
 * verifyToken — Express middleware
 * Reads: Authorization: Bearer <token>
 * Attaches decoded payload to req.admin on success.
 */
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;   // { email, role, iat, exp }
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired. Please log in again.', expired: true });
    }
    return res.status(401).json({ error: 'Invalid token.' });
  }
};

module.exports = verifyToken;
