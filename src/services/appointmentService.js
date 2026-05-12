import { supabase } from '../utils/supabase';

/**
 * Service to handle all appointment and lead management via Supabase.
 * Gracefully falls back to no-ops if Supabase is not configured.
 */

const notConfigured = () => {
  console.warn('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to your environment variables.');
};

export const appointmentService = {
  async getAllAppointments() {
    if (!supabase) { notConfigured(); return []; }
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) { console.error('Error fetching appointments:', error); return []; }
    return data;
  },

  async saveLead({ name, phone, date, department, notes, source }) {
    if (!supabase) { notConfigured(); return null; }
    const { data, error } = await supabase
      .from('appointments')
      .insert([{ type: 'general', name, phone, date, department, notes, source: source || 'Website Booking Form', status: 'Pending' }])
      .select();
    if (error) { console.error('Error saving lead:', error); throw error; }
    return data[0];
  },

  async saveCheckup({ name, phone, date, department, notes, source }) {
    if (!supabase) { notConfigured(); return null; }
    const { data, error } = await supabase
      .from('appointments')
      .insert([{ type: 'checkup', name, phone, date, department, notes, source: source || 'Lab Checkup Booking', status: 'Pending' }])
      .select();
    if (error) { console.error('Error saving checkup:', error); throw error; }
    return data[0];
  },

  async saveVisitingAppointment({ doctorSlug, doctorName, patientName, phone, bookingCycle, bookingMonthLabel }) {
    if (!supabase) { notConfigured(); return null; }
    const { data, error } = await supabase
      .from('appointments')
      .insert([{
        type: 'visiting',
        name: patientName,
        phone,
        doctor_name: doctorName,
        notes: `Booking Cycle: ${bookingCycle}, Month: ${bookingMonthLabel}`,
        status: 'Pending',
        source: 'Visiting Doctor Form',
      }])
      .select();
    if (error) { console.error('Error saving visiting appointment:', error); throw error; }
    return data[0];
  },

  async updateAppointment(id, updates) {
    if (!supabase) { notConfigured(); return null; }
    const { data, error } = await supabase
      .from('appointments')
      .update(updates)
      .eq('id', id)
      .select();
    if (error) { console.error('Error updating appointment:', error); throw error; }
    return data[0];
  },

  async deleteAppointment(id) {
    if (!supabase) { notConfigured(); return; }
    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', id);
    if (error) { console.error('Error deleting appointment:', error); throw error; }
  },
};
