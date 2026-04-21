/**
 * Security Utilities — Apollo Clinic Srinagar
 * Lightweight client-side protections for forms and auth.
 * No external dependencies.
 */

/* ══════════════════════════════════════════
   1. RATE LIMITER (in-memory, per-action)
══════════════════════════════════════════ */
const _rateBuckets = {};

/**
 * Check if an action is rate-limited.
 * @param {string} action - Unique key (e.g. 'booking_form', 'admin_login')
 * @param {number} maxAttempts - Max attempts allowed in the window
 * @param {number} windowMs - Time window in milliseconds
 * @returns {{ allowed: boolean, remaining: number, resetIn: number }}
 */
export function checkRateLimit(action, maxAttempts = 5, windowMs = 15 * 60 * 1000) {
  const now = Date.now();
  if (!_rateBuckets[action]) {
    _rateBuckets[action] = [];
  }

  // Prune expired entries
  _rateBuckets[action] = _rateBuckets[action].filter(ts => now - ts < windowMs);

  if (_rateBuckets[action].length >= maxAttempts) {
    const oldest = _rateBuckets[action][0];
    const resetIn = Math.ceil((oldest + windowMs - now) / 1000);
    return { allowed: false, remaining: 0, resetIn };
  }

  return { allowed: true, remaining: maxAttempts - _rateBuckets[action].length - 1, resetIn: 0 };
}

/**
 * Record an attempt for rate limiting.
 */
export function recordAttempt(action) {
  if (!_rateBuckets[action]) _rateBuckets[action] = [];
  _rateBuckets[action].push(Date.now());
}

/**
 * Clear rate limit for an action (e.g. after successful login).
 */
export function clearRateLimit(action) {
  delete _rateBuckets[action];
}


/* ══════════════════════════════════════════
   2. INPUT SANITIZER
══════════════════════════════════════════ */

/**
 * Strip HTML tags and dangerous characters from a string.
 * Preserves letters, numbers, common punctuation.
 */
export function sanitizeInput(str, maxLength = 500) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<[^>]*>/g, '')           // Strip HTML tags
    .replace(/[<>"'`\\]/g, '')         // Remove dangerous chars
    .replace(/javascript:/gi, '')      // Remove JS protocol
    .replace(/on\w+\s*=/gi, '')        // Remove event handlers
    .trim()
    .slice(0, maxLength);
}

/**
 * Sanitize an object's string values (shallow).
 */
export function sanitizeObject(obj) {
  const clean = {};
  for (const [key, val] of Object.entries(obj)) {
    clean[key] = typeof val === 'string' ? sanitizeInput(val) : val;
  }
  return clean;
}


/* ══════════════════════════════════════════
   3. VALIDATORS
══════════════════════════════════════════ */

/** Validate Indian phone number (10 digits, optionally with +91 prefix) */
export function isValidPhone(phone) {
  const cleaned = phone.replace(/[\s\-+()]/g, '');
  // Accept 10 digits or 91 + 10 digits
  return /^(91)?[6-9]\d{9}$/.test(cleaned);
}

/** Validate a person's name (letters, spaces, dots, hyphens, 2-100 chars) */
export function isValidName(name) {
  if (!name || name.length < 2 || name.length > 100) return false;
  return /^[a-zA-Z\s.\-']+$/.test(name);
}

/** Validate date string (YYYY-MM-DD, not in the past by more than 1 day) */
export function isValidDate(dateStr) {
  if (!dateStr) return true; // Date is often optional
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return false;
  // Allow yesterday to 1 year in the future
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  return d >= yesterday && d <= maxDate;
}

/** Validate message length */
export function isValidMessage(msg, maxLen = 1000) {
  if (!msg) return true; // Often optional
  return msg.length <= maxLen;
}

/** Validate email format */
export function isValidEmail(email) {
  if (!email || email.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


/* ══════════════════════════════════════════
   4. HONEYPOT CHECK
══════════════════════════════════════════ */

/**
 * Check honeypot field — should be empty.
 * Returns true if the form is likely a bot.
 */
export function isBot(honeypotValue) {
  return honeypotValue !== undefined && honeypotValue !== null && honeypotValue !== '';
}


/* ══════════════════════════════════════════
   5. MINIMUM FILL TIME
══════════════════════════════════════════ */

/**
 * Check if enough time has passed since the form was mounted.
 * @param {number} mountTime - timestamp when the form was mounted
 * @param {number} minMs - minimum milliseconds (default 2000 = 2 seconds)
 * @returns {boolean} true if too fast (likely bot)
 */
export function isTooFast(mountTime, minMs = 2000) {
  return Date.now() - mountTime < minMs;
}


/* ══════════════════════════════════════════
   6. DUPLICATE SUBMISSION GUARD
══════════════════════════════════════════ */
const _lastSubmissions = {};

/**
 * Prevent duplicate rapid submissions.
 * @param {string} key - form identifier
 * @param {number} cooldownMs - minimum time between submissions (default 3000ms)
 * @returns {boolean} true if this is a duplicate (allow = false)
 */
export function isDuplicateSubmission(key, cooldownMs = 3000) {
  const now = Date.now();
  if (_lastSubmissions[key] && now - _lastSubmissions[key] < cooldownMs) {
    return true;
  }
  _lastSubmissions[key] = now;
  return false;
}


/* ══════════════════════════════════════════
   7. SECURITY LOGGER (minimal, safe)
══════════════════════════════════════════ */

/**
 * Log suspicious activity to console in development.
 * In production, this is a no-op or could be connected to a logging service.
 */
export function logSuspicious(event, details = {}) {
  if (import.meta.env.DEV) {
    console.warn(`[Security] ${event}`, {
      timestamp: new Date().toISOString(),
      ...details,
    });
  }
}
