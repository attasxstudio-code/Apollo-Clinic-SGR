import React, { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';

const EnvCheck = () => {
  const [envVars, setEnvVars] = useState({});

  useEffect(() => {
    const vars = {
      VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL || 'NOT SET',
      VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET',
      VITE_SUPABASE_KEY_LENGTH: import.meta.env.VITE_SUPABASE_ANON_KEY?.length || 0
    };
    setEnvVars(vars);
  }, []);

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', fontFamily: 'monospace' }}>
      <h2>Environment Variables Check</h2>
      <pre style={{ background: '#f4f4f4', padding: '1rem', borderRadius: '8px' }}>
        {JSON.stringify(envVars, null, 2)}
      </pre>
      
      <div style={{ marginTop: '2rem' }}>
        <h3>Supabase Client Status:</h3>
        <p>supabase exists: {supabase ? '✅ YES' : '❌ NO'}</p>
        <p>supabase type: {supabase ? typeof supabase : 'null/undefined'}</p>
      </div>
      
      <button 
        onClick={() => window.location.reload()}
        style={{ marginTop: '1rem', padding: '10px 20px' }}
      >
        Refresh
      </button>
    </div>
  );
};

export default EnvCheck;
