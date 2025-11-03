"use client";

import { useState } from 'react';

export default function ApiTestPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testLogins = [
    {
      name: 'Super Admin',
      email: 'admin@beyondnine.com',
      password: 'admin123'
    },
    {
      name: 'School Admin',
      email: 'school@beyondnine.com',
      password: 'school123'
    },
    {
      name: 'Teacher',
      email: 'teacher@beyondnine.com',
      password: 'teacher123'
    },
    {
      name: 'Student',
      email: 'student@beyondnine.com',
      password: 'student123'
    },
    {
      name: 'Parent',
      email: 'parent@beyondnine.com',
      password: 'parent123'
    }
  ];

  const testLogin = async (credentials: typeof testLogins[0]) => {
    setLoading(true);
    setResult(null);
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        })
      });
      
      const data = await response.json();
      setResult({
        credentials,
        response: data,
        status: response.status
      });
    } catch (error) {
      setResult({
        credentials,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">API Authentication Test</h1>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Test All Login Credentials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {testLogins.map((login, index) => (
                <button
                  key={index}
                  onClick={() => testLogin(login)}
                  disabled={loading}
                  className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 text-left"
                >
                  <div className="font-medium">{login.name}</div>
                  <div className="text-sm opacity-90 mt-1">Email: {login.email}</div>
                  <div className="text-sm opacity-90">Pass: {login.password}</div>
                </button>
              ))}
            </div>
          </div>
          
          {result && (
            <div className="bg-gray-100 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">Test Result</h3>
              <pre className="text-sm text-gray-800 whitespace-pre-wrap bg-white p-4 rounded">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Test Instructions</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Click on any role button to test the API authentication</li>
            <li>Check if the API returns success: true with user data</li>
            <li>Verify that the user role in the response matches the expected role</li>
            <li>All roles should return success with their respective user data</li>
          </ol>
        </div>
      </div>
    </div>
  );
}