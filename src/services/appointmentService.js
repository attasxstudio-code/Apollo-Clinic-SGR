const withTimeout = (promise, ms = 5000) => {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('Database timeout')), ms))
  ]);
};

const request = async (url, options = {}, fetcher = fetch) => {
  const res = await withTimeout(fetcher(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  }), 8000);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Database request failed.');
  return data;
};

export const appointmentService = {
  async getAllAppointments(fetcher) {
    const data = await request('/api/appointments', { method: 'GET' }, fetcher);
    return data.appointments || [];
  },

  async saveLead({ name, phone, date, department, notes, message, source }) {
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

    const data = await request('/api/appointments', { method: 'POST', body: JSON.stringify(leadData) });
    return data.appointment;
  },

  async saveCheckup({ name, phone, date, department, notes, mainTestType, specificTest, source }) {
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

    const data = await request('/api/appointments', { method: 'POST', body: JSON.stringify(checkupData) });
    return data.appointment;
  },

  async saveVisitingAppointment({ doctorSlug, doctorName, patientName, phone, bookingCycle, bookingMonthLabel }) {
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

    const data = await request('/api/appointments', { method: 'POST', body: JSON.stringify(visitData) });
    return data.appointment;
  },

  async updateAppointment(id, updates, fetcher) {
    const data = await request(`/api/appointments?id=${encodeURIComponent(id)}`, {
      method: 'PATCH',
      body: JSON.stringify({ updates }),
    }, fetcher);
    return data.appointment;
  },

  async deleteAppointment(id, fetcher) {
    await request(`/api/appointments?id=${encodeURIComponent(id)}`, { method: 'DELETE' }, fetcher);
  },
};
