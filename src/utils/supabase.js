import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

console.log('%c🔗 Supabase Connection Check', 'color: blue; font-weight: bold;');
console.log('  URL:', supabaseUrl ? '✅ Found' : '❌ Missing');
console.log('  Key:', supabaseKey ? '✅ Found (length: ' + supabaseKey.length + ')' : '❌ Missing');

if (supabaseKey && !supabaseKey.startsWith('eyJ')) {
  console.error('%c❌ SUPABASE KEY ISSUE!', 'color: red; font-weight: bold;');
  console.error('  Your key does not look like a valid JWT token.');
  console.error('  Expected format: starts with "eyJ..."');
  console.error('  Current value starts with:', supabaseKey.substring(0, 20) + '...');
  console.error('  ➡️  Please update your .env file with the correct ANON KEY from Supabase dashboard');
}

let supabase = null;

if (supabaseUrl && supabaseKey && supabaseKey.startsWith('eyJ')) {
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
    console.log('%c✅ Supabase client connected successfully!', 'color: green; font-weight: bold;');
  } catch (error) {
    console.error('%c❌ Failed to create Supabase client:', error);
    supabase = null;
  }
} else {
  console.warn('%c⚠️ Using localStorage fallback (data will only be saved in browser)', 'color: orange; font-weight: bold;');
  console.warn('  To enable full Supabase sync:');
  console.warn('  1. Go to https://supabase.com/dashboard/project/iognlpkitvdflbqtadxy/settings/api');
  console.warn('  2. Copy the "anon" key (starts with eyJ...)');
  console.warn('  3. Update .env: VITE_SUPABASE_ANON_KEY=eyJ...');
  supabase = null;
}

export { supabase };
