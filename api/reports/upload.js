import { put } from '@vercel/blob';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'hhc_jwt_s3cr3t_k3y_2026_x9z';

/* ── Allowed origins ── */
const ALLOWED_ORIGINS = [
  'https://apolloclinicsrgsgr.vercel.app',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
];

/* ── File validation ── */
const ALLOWED_TYPES = {
  'application/pdf': 'pdf',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/png': 'png',
};
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

/* ── Sanitize input ── */
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
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Max-Age', '86400');
}

/* ── Verify admin auth token ── */
function verifyAuth(req) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.split(' ')[1];
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

/* ── AES-256-GCM Encryption ── */
function encryptData(data) {
  const key = crypto.createHash('sha256').update(JWT_SECRET).digest();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'base64');
  encrypted += cipher.final('base64');
  const authTag = cipher.getAuthTag();
  // Format: iv:authTag:ciphertext (all base64)
  return `${iv.toString('base64')}.${authTag.toString('base64')}.${encrypted}`;
}

export default async function handler(req, res) {
  setCors(req, res);

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });

  /* ── Auth check ── */
  const admin = verifyAuth(req);
  if (!admin) {
    return res.status(401).json({ error: 'Unauthorized. Admin login required.' });
  }

  /* ── Check Blob Store availability ── */
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return res.status(500).json({
      error: 'Report storage is not configured. Please set BLOB_READ_WRITE_TOKEN in Vercel environment variables.',
    });
  }

  /* ── Parse body ── */
  const body = req.body;
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ error: 'Invalid request body.' });
  }

  const {
    fileData,     // base64 data URI (e.g. "data:application/pdf;base64,...")
    fileName,     // original file name
    patientName,  // full name
    phone,        // phone number
    dob,          // date of birth (YYYY-MM-DD)
    reportTitle,  // report title
    reportDate,   // report date (YYYY-MM-DD)
    testType,     // test type
    notes,        // optional notes
  } = body;

  /* ── Validate required fields ── */
  if (!fileData || !patientName || !phone || !dob || !reportTitle || !reportDate) {
    return res.status(400).json({ error: 'Missing required fields: file, patient name, phone, DOB, report title, report date.' });
  }

  /* ── Sanitize ── */
  const cleanName   = sanitize(patientName, 100);
  const cleanPhone  = sanitize(phone, 20);
  const cleanDob    = sanitize(dob, 10);
  const cleanTitle  = sanitize(reportTitle, 200);
  const cleanDate   = sanitize(reportDate, 10);
  const cleanType   = sanitize(testType || '', 100);
  const cleanNotes  = sanitize(notes || '', 500);

  if (!cleanName || cleanName.length < 2) {
    return res.status(400).json({ error: 'Patient name must be at least 2 characters.' });
  }

  /* ── Validate file ── */
  if (typeof fileData !== 'string' || !fileData.startsWith('data:')) {
    return res.status(400).json({ error: 'Invalid file format. Expected base64 data URI.' });
  }

  // Extract MIME type and base64 content
  const mimeMatch = fileData.match(/^data:([^;]+);base64,(.+)$/);
  if (!mimeMatch) {
    return res.status(400).json({ error: 'Invalid file data format.' });
  }

  const mimeType = mimeMatch[1].toLowerCase();
  const base64Content = mimeMatch[2];

  // Validate file type
  const fileExt = ALLOWED_TYPES[mimeType];
  if (!fileExt) {
    return res.status(400).json({ error: 'File type not allowed. Only PDF, JPG, JPEG, and PNG are accepted.' });
  }

  // Decode and check size
  let fileBuffer;
  try {
    fileBuffer = Buffer.from(base64Content, 'base64');
  } catch {
    return res.status(400).json({ error: 'Invalid file encoding.' });
  }

  if (fileBuffer.length > MAX_FILE_SIZE) {
    return res.status(400).json({ error: `File too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB.` });
  }

  if (fileBuffer.length < 100) {
    return res.status(400).json({ error: 'File appears to be empty or corrupted.' });
  }

  /* ── Generate unique report ID ── */
  const reportId = crypto.randomBytes(16).toString('hex');

  /* ── Upload to Vercel Blob (private) ── */
  let blob;
  try {
    blob = await put(`reports/${reportId}.${fileExt}`, fileBuffer, {
      access: 'private',
      contentType: mimeType,
      addRandomSuffix: true,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
  } catch (err) {
    console.error('[Report Upload Error]', err.message, err.stack);
    return res.status(500).json({ error: `Failed to store report file: ${err.message}` });
  }

  /* ── Create verification hashes ── */
  const nameHash = crypto.createHash('sha256').update(cleanName.toUpperCase().trim()).digest('hex');
  const dobHash  = crypto.createHash('sha256').update(cleanDob.trim()).digest('hex');

  /* ── Encrypt report token ── */
  const tokenPayload = {
    rid: reportId,
    blobUrl: blob.url,
    nh: nameHash,
    dh: dobHash,
    title: cleanTitle,
    date: cleanDate,
    type: cleanType,
    mime: mimeType,
    exp: Date.now() + (90 * 24 * 60 * 60 * 1000), // 90-day expiry
  };

  let reportToken;
  try {
    reportToken = encryptData(tokenPayload);
  } catch (err) {
    console.error('[Token Encryption Error]', err.message);
    return res.status(500).json({ error: 'Failed to generate secure report link.' });
  }

  // Make token URL-safe
  const urlSafeToken = reportToken
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '~');

  /* ── Store lookup index entry (for patient self-service lookup by name+DOB) ── */
  try {
    const lookupKey = `lookup/${nameHash}_${dobHash}/${reportId}.json`;
    const lookupData = JSON.stringify({
      token: urlSafeToken,
      title: cleanTitle,
      date: cleanDate,
      type: cleanType,
      createdAt: Date.now(),
    });
    await put(lookupKey, lookupData, {
      access: 'private',
      contentType: 'application/json',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
  } catch (err) {
    // Non-fatal — report is still uploaded, just lookup won't work
    console.warn('[Lookup Index] Failed to store lookup entry:', err.message);
  }

  /* ── Return success ── */
  return res.status(200).json({
    message: 'Report uploaded successfully.',
    reportId,
    token: urlSafeToken,
    blobUrl: blob.url,
    meta: {
      patientName: cleanName,
      phone: cleanPhone,
      dob: cleanDob,
      reportTitle: cleanTitle,
      reportDate: cleanDate,
      testType: cleanType,
      notes: cleanNotes,
      mimeType,
    },
  });
}
