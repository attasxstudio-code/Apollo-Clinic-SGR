// ─── Centralized Contact Configuration ───
// All clinic contact details in one place.
// Import from here instead of hardcoding values.

export const CLINIC_PHONES = [
  { display: '0194-2488069', href: 'tel:01942488069' },
  { display: '0194-4068095', href: 'tel:01944068095' },
];

export const WHATSAPP_NUMBER = '9596800336';
export const WHATSAPP_LINK = `https://wa.me/91${WHATSAPP_NUMBER}`;

export const CLINIC_EMAIL = 'cypherhealthservicespvtltd@gmail.com';
export const CLINIC_EMAIL_HREF = `mailto:${CLINIC_EMAIL}`;

export const WORKING_HOURS = {
  weekdays: { label: 'Monday – Saturday', time: '08:00 AM – 07:00 PM' },
  sunday:   { label: 'Sunday',            time: '08:00 AM – 02:00 PM' },
};

// Primary phone for "Call Us" CTAs (first landline)
export const PRIMARY_PHONE = CLINIC_PHONES[0].display;
export const PRIMARY_PHONE_HREF = CLINIC_PHONES[0].href;

// Helper: build a WhatsApp link with a pre-filled message
export const waLink = (message) =>
  `${WHATSAPP_LINK}?text=${encodeURIComponent(message)}`;
