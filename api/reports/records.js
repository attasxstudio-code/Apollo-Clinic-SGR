import jwt from 'jsonwebtoken';
import { createClient } from '@supabase/supabase-js';

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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Max-Age', '86400');
}

function verifyAdmin(req) {
  const secret = process.env.JWT_SECRET;
  if (!secret) return null;
  const authHeader = req.headers.authorization || '';
  if (!authHeader.startsWith('Bearer ')) return null;
  try {
    return jwt.verify(authHeader.slice(7), secret);
  } catch {
    return null;
  }
}

function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function sanitize(str, maxLen = 500) {
  if (typeof str !== 'string') return '';
  return str.replace(/<[^>]*>/g, '').replace(/[<>"'`\\]/g, '').trim().slice(0, maxLen);
}

function cleanReport(body = {}) {
  return {
    id: sanitize(body.id, 80),
    patient_name: sanitize(body.patient_name, 100),
    phone: sanitize(body.phone, 30),
    dob: sanitize(body.dob, 20),
    report_title: sanitize(body.report_title, 200),
    report_date: sanitize(body.report_date, 20),
    test_type: sanitize(body.test_type || '', 120),
    notes: sanitize(body.notes || '', 1000),
    status: sanitize(body.status || 'Pending', 40),
    blob_url: sanitize(body.blob_url, 1000),
    token: sanitize(body.token, 5000),
  };
}

export default async function handler(req, res) {
  setCors(req, res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  const admin = verifyAdmin(req);
  if (!admin) return res.status(401).json({ error: 'Unauthorized. Admin login required.' });

  const supabase = getSupabaseAdmin();
  if (!supabase) return res.status(500).json({ error: 'Report database is not configured.' });

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('test_reports')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) return res.status(500).json({ error: 'Unable to load reports.' });
    return res.status(200).json({ reports: data || [] });
  }

  if (req.method === 'POST') {
    const report = cleanReport(req.body || {});
    if (!report.id || !report.patient_name || !report.phone || !report.dob || !report.report_title || !report.report_date || !report.token) {
      return res.status(400).json({ error: 'Missing required report metadata.' });
    }
    const { error } = await supabase.from('test_reports').insert([report]);
    if (error) return res.status(500).json({ error: 'Unable to save report metadata.' });
    return res.status(200).json({ ok: true });
  }

  const id = sanitize(req.query.id || req.body?.id, 80);
  if (!id) return res.status(400).json({ error: 'Report ID is required.' });

  if (req.method === 'PATCH') {
    const status = sanitize(req.body?.status, 40);
    if (!['Pending', 'Sent', 'Viewed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid report status.' });
    }
    const { error } = await supabase.from('test_reports').update({ status }).eq('id', id);
    if (error) return res.status(500).json({ error: 'Unable to update report status.' });
    return res.status(200).json({ ok: true });
  }

  if (req.method === 'DELETE') {
    const { error } = await supabase.from('test_reports').delete().eq('id', id);
    if (error) return res.status(500).json({ error: 'Unable to delete report metadata.' });
    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: 'Method not allowed.' });
}
