"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TestParentAPI() {
  const router = useRouter();
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testParentAPI = async () => {
    setLoading(true);
    setResult('Testing Parent API login...');
    
    try {
      const response = await fetch('/api/test-parent-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: 'parent@beyondnine.com', 
          password: 'parent123' 
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setResult(`API Test successful! 
User: ${data.data.user.firstName} ${data.data.user.lastName} (${data.data.user.role})
Token: ${data.data.token}
School: ${data.data.school.name}`);
      } else {
        setResult(`API Test failed: ${data.error}`);
      }
    } catch (err) {
      setResult(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Parent API Test</h1>
        
        <div className="space-y-4">
          <button
            onClick={testParentAPI}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Test Parent API'}
          </button>
        </div>
        
        {result && (
          <div className="mt-6 p-4 bg-gray-100 rounded-md">
            <pre className="text-sm text-gray-800 whitespace-pre-wrap">{result}</pre>
          </div>
        )}
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            This test verifies the Parent login API endpoint directly
          </p>
        </div>
      </div>
    </div>
  );
}