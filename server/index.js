require('dotenv').config();
const express = require('express');
const cors    = require('cors');

const authRoutes = require('./routes/auth');

const app  = express();
const PORT = process.env.PORT || 4000;

/* ── Middleware ── */
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
}));
app.use(express.json());

/* ── Routes ── */
app.use('/api/auth', authRoutes);

/* ── Health check ── */
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'HomeHeal Clinic API', ts: new Date().toISOString() });
});

/* ── 404 handler ── */
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

/* ── Global error handler ── */
app.use((err, _req, res, _next) => {
  console.error('[Server Error]', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`✅  HomeHeal API running → http://localhost:${PORT}`);
});
