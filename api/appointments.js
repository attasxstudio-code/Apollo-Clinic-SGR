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

function getJwtSecret() {
  return process.env.JWT_SECRET || '';
}

function verifyAdmin(req) {
  const secret = getJwtSecret();
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

function cleanAppointment(body = {}) {
  const allowedTypes = new Set(['general', 'checkup', 'visiting']);
  const type = sanitize(body.type || 'general', 40);
  return {
    type: allowedTypes.has(type) ? type : 'general',
    name: sanitize(body.name, 100),
    phone: sanitize(body.phone, 30),
    date: sanitize(body.date, 20),
    department: sanitize(body.department, 120),
    notes: sanitize(body.notes, 1000),
    doctor_name: sanitize(body.doctor_name, 160),
    source: sanitize(body.source || 'Website Booking Form', 160),
    status: 'Pending',
    created_at: body.created_at || new Date().toISOString(),
  };
}

export default async function handler(req, res) {
  setCors(req, res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return res.status(500).json({ error: 'Appointment database is not configured.' });
  }

  if (req.method === 'POST') {
    const appointment = cleanAppointment(req.body || {});
    if (!appointment.name || !appointment.phone) {
      return res.status(400).json({ error: 'Name and phone are required.' });
    }
    const { data, error } = await supabase
      .from('appointments')
      .insert([appointment])
      .select()
      .single();
    if (error) return res.status(500).json({ error: 'Unable to save appointment.' });
    return res.status(200).json({ appointment: data });
  }

  const admin = verifyAdmin(req);
  if (!admin) return res.status(401).json({ error: 'Unauthorized. Admin login required.' });

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) return res.status(500).json({ error: 'Unable to load appointments.' });
    return res.status(200).json({ appointments: data || [] });
  }

  const id = sanitize(req.query.id || req.body?.id, 80);
  if (!id) return res.status(400).json({ error: 'Appointment ID is required.' });

  if (req.method === 'PATCH') {
    const updates = { ...(req.body?.updates || req.body || {}) };
    delete updates.id;
    const allowed = ['status', 'name', 'phone', 'date', 'department', 'notes', 'doctor_name', 'source'];
    const cleanUpdates = {};
    for (const key of allowed) {
      if (updates[key] !== undefined) cleanUpdates[key] = sanitize(String(updates[key]), key === 'notes' ? 1000 : 160);
    }
    const { data, error } = await supabase
      .from('appointments')
      .update(cleanUpdates)
      .eq('id', id)
      .select()
      .single();
    if (error) return res.status(500).json({ error: 'Unable to update appointment.' });
    return res.status(200).json({ appointment: data });
  }

  if (req.method === 'DELETE') {
    const { error } = await supabase.from('appointments').delete().eq('id', id);
    if (error) return res.status(500).json({ error: 'Unable to delete appointment.' });
    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: 'Method not allowed.' });
}
