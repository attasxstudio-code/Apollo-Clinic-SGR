import { supabase } from '../utils/supabase';

/**
 * Service to handle all appointment and lead management via Supabase.
 * Gracefully falls back to no-ops if Supabase is not configured.
 */

const notConfigured = () => {
  console.warn('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to your environment variables.');
};

// Helper for timeout
const withTimeout = (promise, ms = 5000) => {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('Database timeout')), ms))
  ]);
};

export const appointmentService = {
  async getAllAppointments() {
    if (!supabase) { notConfigured(); return []; }
    try {
      const { data, error } = await withTimeout(
        supabase
          .from('appointments')
          .select('*')
          .order('created_at', { ascending: false }),
        8000 // 8 second timeout for fetching
      );
      if (error) { console.error('Error fetching appointments:', error); return []; }
      return data || [];
    } catch (err) {
      console.error('Supabase fetch failed or timed out:', err);
      return [];
    }
  },

  async saveLead({ name, phone, date, department, notes, message, source }) {
    if (!supabase) { notConfigured(); return null; }
    try {
      const { data, error } = await withTimeout(
        supabase
          .from('appointments')
          .insert([{ 
            type: 'general', 
            name, 
            phone, 
            date, 
            department, 
            notes: notes || message || '', 
            source: source || 'Website Booking Form', 
            status: 'Pending' 
          }])
          .select(),
        4000
      );
      if (error) { console.error('Error saving lead:', error); throw error; }
      return data[0];
    } catch (err) {
      console.error('Supabase save failed:', err);
      throw err;
    }
  },

  async saveCheckup({ name, phone, date, department, notes, mainTestType, specificTest, source }) {
    if (!supabase) { notConfigured(); return null; }
    try {
      const { data, error } = await withTimeout(
        supabase
          .from('appointments')
          .insert([{ 
            type: 'checkup', 
            name, 
            phone, 
            date, 
            department: department || mainTestType || '', 
            notes: notes || specificTest || '', 
            source: source || 'Lab Checkup Booking', 
            status: 'Pending' 
          }])
          .select(),
        4000
      );
      if (error) { console.error('Error saving checkup:', error); throw error; }
      return data[0];
    } catch (err) {
      console.error('Supabase save failed:', err);
      throw err;
    }
  },

  async saveVisitingAppointment({ doctorSlug, doctorName, patientName, phone, bookingCycle, bookingMonthLabel }) {
    if (!supabase) { notConfigured(); return null; }
    try {
      const { data, error } = await withTimeout(
        supabase
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
          .select(),
        4000
      );
      if (error) { console.error('Error saving visiting appointment:', error); throw error; }
      return data[0];
    } catch (err) {
      console.error('Supabase save failed:', err);
      throw err;
    }
  },

  async updateAppointment(id, updates) {
    if (!supabase) { notConfigured(); return null; }
    try {
      const { data, error } = await withTimeout(
        supabase
          .from('appointments')
          .update(updates)
          .eq('id', id)
          .select(),
        4000
      );
      if (error) { console.error('Error updating appointment:', error); throw error; }
      return data[0];
    } catch (err) {
      console.error('Supabase update failed:', err);
      throw err;
    }
  },

  async deleteAppointment(id) {
    if (!supabase) { notConfigured(); return; }
    try {
      const { error } = await withTimeout(
        supabase
          .from('appointments')
          .delete()
          .eq('id', id),
        4000
      );
      if (error) { console.error('Error deleting appointment:', error); throw error; }
    } catch (err) {
      console.error('Supabase delete failed:', err);
      throw err;
    }
  },
};
