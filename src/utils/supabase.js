import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

console.log('[supabase] Initializing with URL:', supabaseUrl ? 'Yes' : 'No');
console.log('[supabase] Initializing with Key:', supabaseKey ? 'Yes (length: ' + (supabaseKey?.length || 0) + ')' : 'No');

let supabase = null;

if (supabaseUrl && supabaseKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
      global: {
        headers: {
          'x-client-info': 'apollo-clinic-web',
        },
      },
    });
    console.log('[supabase] Client created successfully');
  } catch (error) {
    console.error('[supabase] Failed to create client:', error);
    supabase = null;
  }
} else {
  console.warn('[supabase] Missing URL or Key - using null client (localStorage fallback mode)');
}

export { supabase };
