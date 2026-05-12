// ─── Visiting Doctor Appointments Service ───
// Abstraction over localStorage for visiting doctor bookings & settings.
// Can be swapped to Supabase/Firebase/API later without touching UI components.

const APPOINTMENTS_KEY = 'visiting_doctor_appointments';
const SETTINGS_KEY = 'visiting_doctor_settings';

/* ── Helpers ── */
const read = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || null;
  } catch {
    return null;
  }
};

const write = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const generateId = () => `vda_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

const currentMonthLabel = () => {
  const d = new Date();
  return d.toLocaleString('en-US', { month: 'long', year: 'numeric' });
};

/* ══════════════════════════════════════════
   APPOINTMENTS
══════════════════════════════════════════ */

export const getAppointments = () => {
  return read(APPOINTMENTS_KEY) || [];
};

export const saveAppointment = ({ doctorSlug, doctorName, patientName, phone, bookingCycle }) => {
  const appointments = getAppointments();
  const now = new Date().toISOString();

  const newAppt = {
    id: generateId(),
    type: 'visiting-doctor-appointment',
    doctorSlug,
    doctorName,
    patientName: patientName.trim(),
    phone: phone.trim(),
    bookingCycle: bookingCycle || 'current-month',
    bookingMonthLabel: currentMonthLabel(),
    status: 'new',
    contacted: false,
    spotConfirmed: false,
    whatsappRedirected: false,
    createdAt: now,
    updatedAt: now,
  };

  appointments.unshift(newAppt);
  write(APPOINTMENTS_KEY, appointments);
  return newAppt;
};

export const updateAppointment = (id, updates) => {
  const appointments = getAppointments();
  const idx = appointments.findIndex(a => a.id === id);
  if (idx === -1) return null;

  appointments[idx] = {
    ...appointments[idx],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  write(APPOINTMENTS_KEY, appointments);
  return appointments[idx];
};

export const markWhatsappRedirected = (id) => {
  return updateAppointment(id, { whatsappRedirected: true });
};

export const deleteAppointment = (id) => {
  const appointments = getAppointments().filter(a => a.id !== id);
  write(APPOINTMENTS_KEY, appointments);
};

/* ══════════════════════════════════════════
   BOOKING SETTINGS (per doctor)
══════════════════════════════════════════ */

const DEFAULT_SETTINGS = {
  currentMonthFull: false,
  acceptNextMonthBookings: true,
};

export const getAllSettings = () => {
  return read(SETTINGS_KEY) || {};
};

export const getDoctorSettings = (slug) => {
  const all = getAllSettings();
  return { ...DEFAULT_SETTINGS, ...(all[slug] || {}) };
};

export const saveDoctorSettings = (slug, updates) => {
  const all = getAllSettings();
  all[slug] = {
    ...(all[slug] || DEFAULT_SETTINGS),
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  write(SETTINGS_KEY, all);
  return all[slug];
};
