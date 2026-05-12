import { supabase } from '../utils/supabase';

/**
 * Service to handle all appointment and lead management via Supabase.
 * This replaces the local browser storage (localStorage) logic.
 */

export const appointmentService = {
  /**
   * Fetch all appointments (Leads + Checkups + Visiting)
   */
  async getAllAppointments() {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching appointments:', error);
      return [];
    }
    return data;
  },

  /**
   * Save a new general appointment lead
   */
  async saveLead({ name, phone, date, department, notes, source }) {
    const { data, error } = await supabase
      .from('appointments')
      .insert([
        {
          type: 'general',
          name,
          phone,
          date,
          department,
          notes,
          source: source || 'Website Booking Form',
          status: 'Pending',
        }
      ])
      .select();

    if (error) {
      console.error('Error saving lead:', error);
      throw error;
    }
    return data[0];
  },

  /**
   * Save a new checkup booking
   */
  async saveCheckup({ name, phone, date, department, notes, source }) {
    const { data, error } = await supabase
      .from('appointments')
      .insert([
        {
          type: 'checkup',
          name,
          phone,
          date,
          department,
          notes,
          source: source || 'Lab Checkup Booking',
          status: 'Pending',
        }
      ])
      .select();

    if (error) {
      console.error('Error saving checkup:', error);
      throw error;
    }
    return data[0];
  },

  /**
   * Save a new visiting doctor appointment
   */
  async saveVisitingAppointment({ doctorSlug, doctorName, patientName, phone, bookingCycle, bookingMonthLabel }) {
    const { data, error } = await supabase
      .from('appointments')
      .insert([
        {
          type: 'visiting',
          name: patientName,
          phone,
          doctor_name: doctorName,
          notes: `Booking Cycle: ${bookingCycle}, Month: ${bookingMonthLabel}`,
          status: 'Pending',
          source: 'Visiting Doctor Form',
        }
      ])
      .select();

    if (error) {
      console.error('Error saving visiting appointment:', error);
      throw error;
    }
    return data[0];
  },

  /**
   * Update an appointment status or other details
   */
  async updateAppointment(id, updates) {
    const { data, error } = await supabase
      .from('appointments')
      .update(updates)
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error updating appointment:', error);
      throw error;
    }
    return data[0];
  },

  /**
   * Delete an appointment
   */
  async deleteAppointment(id) {
    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting appointment:', error);
      throw error;
    }
  }
};
