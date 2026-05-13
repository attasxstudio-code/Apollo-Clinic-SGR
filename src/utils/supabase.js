import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

console.log('%c🔗 Supabase Connection Check', 'color: blue; font-weight: bold; font-size: 14px');
console.log('  URL:', supabaseUrl ? '✅ Found: ' + supabaseUrl : '❌ Missing');
console.log('  Key:', supabaseKey ? '✅ Found (length: ' + supabaseKey.length + ')' : '❌ Missing');

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
    console.log('%c✅ Supabase client CREATED', 'color: green; font-weight: bold');
  } catch (error) {
    console.error('%c❌ FAILED to create client:', error);
    supabase = null;
  }
} else {
  console.warn('%c⚠️ No URL or Key - supabase is NULL', 'color: red; font-weight: bold');
  supabase = null;
}

export { supabase };
