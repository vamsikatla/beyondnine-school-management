"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TestParentLogin() {
  const router = useRouter();
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testParentLogin = async () => {
    setLoading(true);
    setResult('Testing Parent login...');
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: 'parent@beyondnine.com', 
          password: 'parent123' 
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Set authentication data in localStorage
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('authToken', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        localStorage.setItem('school', JSON.stringify(data.data.school));
        
        setResult(`Login successful! User: ${data.data.user.firstName} ${data.data.user.lastName} (${data.data.user.role})`);
        
        // Wait a moment then redirect
        setTimeout(() => {
          router.push('/parent/dashboard');
        }, 1000);
      } else {
        setResult(`Login failed: ${data.error}`);
      }
    } catch (err) {
      setResult(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const clearAuth = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('school');
    setResult('Authentication data cleared');
  };

  const checkAuth = () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('authToken');
    
    setResult(`
      isAuthenticated: ${isAuthenticated || 'not set'}
      user: ${user ? 'set' : 'not set'}
      token: ${token ? 'set' : 'not set'}
    `);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Parent Login Test</h1>
        
        <div className="space-y-4">
          <button
            onClick={testParentLogin}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Test Parent Login'}
          </button>
          
          <button
            onClick={checkAuth}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
          >
            Check Auth Status
          </button>
          
          <button
            onClick={clearAuth}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
          >
            Clear Auth Data
          </button>
        </div>
        
        {result && (
          <div className="mt-6 p-4 bg-gray-100 rounded-md">
            <pre className="text-sm text-gray-800 whitespace-pre-wrap">{result}</pre>
          </div>
        )}
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            This test verifies the Parent login flow without UI components
          </p>
        </div>
      </div>
    </div>
  );
}