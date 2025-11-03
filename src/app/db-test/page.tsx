"use client";

import { useState } from 'react';

export default function DBTestPage() {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testDBConnection = async () => {
    setLoading(true);
    setResult('Testing database connection...');
    
    try {
      const response = await fetch('/api/db-test');
      const data = await response.json();
      
      if (data.success) {
        setResult(`✅ Database connection successful!\nSchools in database: ${data.schoolsCount}`);
      } else {
        setResult(`❌ Database connection failed!\nError: ${data.error}\nDetails: ${data.details}`);
      }
    } catch (error) {
      setResult(`❌ Error testing database connection:\n${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Database Connection Test</h1>
        
        <div className="space-y-4">
          <button
            onClick={testDBConnection}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Test Database Connection'}
          </button>
        </div>
        
        {result && (
          <div className="mt-6 p-4 bg-gray-100 rounded-md">
            <pre className="text-sm text-gray-800 whitespace-pre-wrap">{result}</pre>
          </div>
        )}
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            This test verifies the MySQL database connection for the BeyondNine ERP system
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Note: Make sure MySQL is running and credentials in .env are correct
          </p>
        </div>
      </div>
    </div>
  );
}