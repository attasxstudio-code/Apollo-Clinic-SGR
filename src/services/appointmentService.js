import { supabase } from '../utils/supabase';

const STORAGE_KEY = 'clinic_appointments_fallback';

console.log('%c📡 appointmentService initializing', 'color: purple; font-weight: bold');
console.log('  supabase client exists:', !!supabase);

const withTimeout = (promise, ms = 5000) => {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('Database timeout')), ms))
  ]);
};

const getLocalStorageData = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error('Error reading from localStorage:', e);
    return [];
  }
};

const saveToLocalStorage = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving to localStorage:', e);
  }
};

const addToLocalStorage = (newItem) => {
  try {
    const existing = getLocalStorageData();
    const updated = [newItem, ...existing];
    saveToLocalStorage(updated);
    return newItem;
  } catch (e) {
    console.error('Error adding to localStorage:', e);
    return null;
  }
};

console.log('[appointmentService] Supabase client initialized:', !!supabase);
if (!supabase) {
  console.warn('[appointmentService] Using localStorage fallback mode');
}

export const appointmentService = {
  async getAllAppointments() {
    console.log('[appointmentService] Fetching all appointments...');
    
    if (!supabase) { 
      notConfigured(); 
      console.log('[appointmentService] Returning localStorage data');
      return getLocalStorageData();
    }
    
    try {
      const { data, error } = await withTimeout(
        supabase
          .from('appointments')
          .select('*')
          .order('created_at', { ascending: false }),
        8000
      );
      
      if (error) { 
        console.error('[appointmentService] Error fetching appointments:', error);
        console.log('[appointmentService] Falling back to localStorage');
        return getLocalStorageData();
      }
      
      console.log('[appointmentService] Fetched appointments:', data?.length || 0);
      
      const appointments = data || [];
      saveToLocalStorage(appointments);
      return appointments;
    } catch (err) {
      console.error('[appointmentService] Supabase fetch failed:', err);
      console.log('[appointmentService] Falling back to localStorage');
      return getLocalStorageData();
    }
  },

  async saveLead({ name, phone, date, department, notes, message, source }) {
    console.log('[appointmentService] Saving lead:', { name, phone, date, department });
    
    const leadData = { 
      type: 'general', 
      name, 
      phone, 
      date, 
      department, 
      notes: notes || message || '', 
      source: source || 'Website Booking Form', 
      status: 'Pending',
      created_at: new Date().toISOString()
    };

    if (!supabase) { 
      notConfigured(); 
      console.log('[appointmentService] Saving to localStorage fallback');
      return addToLocalStorage(leadData);
    }
    
    try {
      const { data, error } = await withTimeout(
        supabase
          .from('appointments')
          .insert([leadData])
          .select(),
        4000
      );
      
      if (error) { 
        console.error('[appointmentService] Error saving lead:', error);
        console.log('[appointmentService] Saving to localStorage fallback');
        return addToLocalStorage(leadData);
      }
      
      console.log('[appointmentService] Lead saved to Supabase:', data[0]);
      return data[0];
    } catch (err) {
      console.error('[appointmentService] Supabase save failed:', err);
      console.log('[appointmentService] Saving to localStorage fallback');
      return addToLocalStorage(leadData);
    }
  },

  async saveCheckup({ name, phone, date, department, notes, mainTestType, specificTest, source }) {
    console.log('[appointmentService] Saving checkup:', { name, phone, mainTestType, specificTest });
    
    const checkupData = { 
      type: 'checkup', 
      name, 
      phone, 
      date, 
      department: mainTestType || department || '', 
      notes: specificTest
        ? `${specificTest}${notes ? ' | ' + notes : ''}`
        : (notes || ''), 
      source: source || 'Lab Checkup Booking', 
      status: 'Pending',
      created_at: new Date().toISOString()
    };

    if (!supabase) { 
      notConfigured(); 
      return addToLocalStorage(checkupData);
    }
    
    try {
      const { data, error } = await withTimeout(
        supabase
          .from('appointments')
          .insert([checkupData])
          .select(),
        4000
      );
      
      if (error) { 
        console.error('[appointmentService] Error saving checkup:', error);
        return addToLocalStorage(checkupData);
      }
      
      console.log('[appointmentService] Checkup saved:', data[0]);
      return data[0];
    } catch (err) {
      console.error('[appointmentService] Supabase save failed:', err);
      return addToLocalStorage(checkupData);
    }
  },

  async saveVisitingAppointment({ doctorSlug, doctorName, patientName, phone, bookingCycle, bookingMonthLabel }) {
    console.log('[appointmentService] Saving visiting appointment:', { patientName, doctorName });
    
    const visitData = {
      type: 'visiting',
      name: patientName,
      phone,
      doctor_name: doctorName,
      notes: `Booking Cycle: ${bookingCycle}, Month: ${bookingMonthLabel}`,
      status: 'Pending',
      source: 'Visiting Doctor Form',
      created_at: new Date().toISOString()
    };

    if (!supabase) { 
      notConfigured(); 
      return addToLocalStorage(visitData);
    }
    
    try {
      const { data, error } = await withTimeout(
        supabase
          .from('appointments')
          .insert([visitData])
          .select(),
        4000
      );
      
      if (error) { 
        console.error('[appointmentService] Error saving visiting appointment:', error);
        return addToLocalStorage(visitData);
      }
      
      console.log('[appointmentService] Visiting appointment saved:', data[0]);
      return data[0];
    } catch (err) {
      console.error('[appointmentService] Supabase save failed:', err);
      return addToLocalStorage(visitData);
    }
  },

  async updateAppointment(id, updates) {
    console.log('[appointmentService] Updating appointment:', id, updates);
    
    if (!supabase) { 
      notConfigured(); 
      const localData = getLocalStorageData();
      const updated = localData.map(a => a.id === id ? { ...a, ...updates } : a);
      saveToLocalStorage(updated);
      return updated.find(a => a.id === id);
    }
    
    try {
      const { data, error } = await withTimeout(
        supabase
          .from('appointments')
          .update(updates)
          .eq('id', id)
          .select(),
        4000
      );
      
      if (error) { 
        console.error('[appointmentService] Error updating appointment:', error);
        const localData = getLocalStorageData();
        const updated = localData.map(a => a.id === id ? { ...a, ...updates } : a);
        saveToLocalStorage(updated);
        return updated.find(a => a.id === id);
      }
      
      return data[0];
    } catch (err) {
      console.error('[appointmentService] Supabase update failed:', err);
      const localData = getLocalStorageData();
      const updated = localData.map(a => a.id === id ? { ...a, ...updates } : a);
      saveToLocalStorage(updated);
      return updated.find(a => a.id === id);
    }
  },

  async deleteAppointment(id) {
    console.log('[appointmentService] Deleting appointment:', id);
    
    if (!supabase) { 
      notConfigured(); 
      const localData = getLocalStorageData();
      saveToLocalStorage(localData.filter(a => a.id !== id));
      return;
    }
    
    try {
      const { error } = await withTimeout(
        supabase
          .from('appointments')
          .delete()
          .eq('id', id),
        4000
      );
      
      if (error) { 
        console.error('[appointmentService] Error deleting appointment:', error);
        const localData = getLocalStorageData();
        saveToLocalStorage(localData.filter(a => a.id !== id));
      }
    } catch (err) {
      console.error('[appointmentService] Supabase delete failed:', err);
      const localData = getLocalStorageData();
      saveToLocalStorage(localData.filter(a => a.id !== id));
    }
  },
};
