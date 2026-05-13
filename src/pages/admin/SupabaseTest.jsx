import React, { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';
import { appointmentService } from '../../services/appointmentService';

const SupabaseTest = () => {
  const [status, setStatus] = useState('checking...');
  const [results, setResults] = useState([]);
  const [testing, setTesting] = useState(false);

  const addResult = (msg, isError = false) => {
    setResults(prev => [...prev, { msg, isError, time: new Date().toLocaleTimeString() }]);
  };

  const runTest = async () => {
    setTesting(true);
    setResults([]);
    setStatus('Testing...');

    addResult('🔄 Starting connection test...');

    // Test 1: Check environment
    addResult('📋 Checking environment variables...');
    const envUrl = import.meta.env.VITE_SUPABASE_URL;
    const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (!envUrl) {
      addResult('❌ VITE_SUPABASE_URL is missing', true);
      setStatus('FAILED - Missing URL');
      setTesting(false);
      return;
    }
    addResult('✅ URL found: ' + envUrl);

    if (!envKey) {
      addResult('❌ VITE_SUPABASE_ANON_KEY is missing', true);
      setStatus('FAILED - Missing Key');
      setTesting(false);
      return;
    }
    addResult('✅ Key found (length: ' + envKey.length + ')');

    // Test 2: Check supabase client
    addResult('📡 Checking Supabase client...');
    if (!supabase) {
      addResult('❌ Supabase client is NULL - not connected', true);
      setStatus('FAILED - Client not created');
      setTesting(false);
      return;
    }
    addResult('✅ Supabase client exists');

    // Test 3: Try to fetch data
    addResult('📊 Trying to fetch existing appointments...');
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .limit(5);
      
      if (error) {
        addResult('❌ Error fetching: ' + error.message, true);
        addResult('   Code: ' + error.code);
        addResult('   Details: ' + error.details);
        setStatus('FAILED - Fetch error');
      } else {
        addResult('✅ Fetched ' + (data?.length || 0) + ' appointments');
      }
    } catch (err) {
      addResult('❌ Exception: ' + err.message, true);
      setStatus('FAILED - Exception');
    }

    // Test 4: Try to insert test data
    addResult('📝 Testing insert (saving a test record)...');
    try {
      const testData = {
        type: 'general',
        name: 'TEST - Delete Me',
        phone: '+91 9999999999',
        date: new Date().toISOString().split('T')[0],
        department: 'Testing',
        notes: 'This is a test to verify Supabase connection - can be deleted',
        source: 'Supabase Test',
        status: 'Pending'
      };

      const { data, error } = await supabase
        .from('appointments')
        .insert([testData])
        .select();

      if (error) {
        addResult('❌ Insert error: ' + error.message, true);
        addResult('   Code: ' + error.code);
        if (error.details) addResult('   Details: ' + error.details);
        setStatus('FAILED - Insert error');
      } else {
        addResult('✅ Successfully inserted test record!');
        addResult('   ID: ' + data[0]?.id);
        setStatus('SUCCESS - Connected!');
      }
    } catch (err) {
      addResult('❌ Insert exception: ' + err.message, true);
      setStatus('FAILED - Insert exception');
    }

    setTesting(false);
  };

  useEffect(() => {
    runTest();
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#f0f9ff', 
      padding: '2rem',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{ 
        maxWidth: '700px', 
        margin: '0 auto',
        background: 'white',
        borderRadius: '16px',
        padding: '2rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ 
            width: 60, height: 60, 
            background: status.includes('SUCCESS') ? '#10b981' : status.includes('FAILED') ? '#ef4444' : '#3b82f6',
            borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontSize: '24px'
          }}>
            {status.includes('SUCCESS') ? '✅' : status.includes('FAILED') ? '❌' : '⏳'}
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.5rem', color: '#1e293b' }}>Supabase Connection Test</h1>
            <p style={{ margin: '4px 0 0', color: status.includes('SUCCESS') ? '#10b981' : status.includes('FAILED') ? '#ef4444' : '#64748b' }}>
              Status: {status}
            </p>
          </div>
        </div>

        <button
          onClick={runTest}
          disabled={testing}
          style={{
            width: '100%',
            padding: '1rem',
            background: testing ? '#94a3b8' : '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: testing ? 'not-allowed' : 'pointer',
            marginBottom: '2rem'
          }}
        >
          {testing ? 'Testing...' : '🔄 Run Test Again'}
        </button>

        <div style={{ 
          background: '#f8fafc', 
          borderRadius: '12px', 
          padding: '1rem',
          maxHeight: '400px',
          overflowY: 'auto'
        }}>
          {results.map((r, i) => (
            <div key={i} style={{ 
              padding: '8px 0', 
              borderBottom: i < results.length - 1 ? '1px solid #e2e8f0' : 'none',
              fontFamily: 'monospace',
              fontSize: '14px',
              color: r.isError ? '#ef4444' : '#334155'
            }}>
              <span style={{ color: '#94a3b8', marginRight: '8px' }}>{r.time}</span>
              {r.msg}
            </div>
          ))}
        </div>

        {status.includes('SUCCESS') && (
          <div style={{ 
            marginTop: '1.5rem', 
            padding: '1rem', 
            background: '#ecfdf5', 
            borderRadius: '12px',
            color: '#065f46',
            fontSize: '14px'
          }}>
            <strong>🎉 Supabase is connected!</strong>
            <p style={{ margin: '8px 0 0' }}>
              If appointments still don't appear in dashboard, check if you're using the same Supabase project.
              The test record was added to your database.
            </p>
          </div>
        )}

        {status.includes('FAILED') && (
          <div style={{ 
            marginTop: '1.5rem', 
            padding: '1rem', 
            background: '#fef2f2', 
            borderRadius: '12px',
            color: '#991b1b',
            fontSize: '14px'
          }}>
            <strong>❌ Connection Failed</strong>
            <p style={{ margin: '8px 0 0' }}>
              1. Make sure you added environment variables in Vercel<br/>
              2. Make sure you ran the SQL in Supabase to create the table<br/>
              3. Redeploy on Vercel after adding env variables
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupabaseTest;