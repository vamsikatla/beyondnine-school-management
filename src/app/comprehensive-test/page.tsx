"use client";

import { useState, useEffect } from 'react';
import { AuthUtils } from '@/lib/auth';

export default function ComprehensiveTestPage() {
  const [testResults, setTestResults] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const runAllTests = async () => {
    setLoading(true);
    const results: any = {};
    
    try {
      // Test 1: AuthUtils token generation and verification
      console.log('Test 1: AuthUtils token generation and verification');
      const testPayload = {
        userId: 'test-user-id',
        email: 'test@example.com',
        role: 'PARENT',
        schoolId: 'test-school-id'
      };
      
      const token = AuthUtils.generateToken(testPayload);
      const decoded = AuthUtils.verifyToken(token);
      
      results.authUtils = {
        success: true,
        tokenGenerated: !!token,
        tokenVerified: !!decoded,
        payloadMatch: JSON.stringify(decoded) === JSON.stringify({ ...testPayload, iat: decoded.iat, exp: decoded.exp })
      };
      
      // Test 2: API login endpoint
      console.log('Test 2: API login endpoint');
      const loginResponse = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'parent@beyondnine.com',
          password: 'parent123'
        })
      });
      
      const loginData = await loginResponse.json();
      results.apiLogin = {
        success: loginData.success,
        statusCode: loginResponse.status,
        hasToken: !!loginData.data?.token,
        hasUser: !!loginData.data?.user,
        userRole: loginData.data?.user?.role
      };
      
      // Test 3: localStorage operations
      console.log('Test 3: localStorage operations');
      try {
        localStorage.setItem('test-key', 'test-value');
        const retrievedValue = localStorage.getItem('test-key');
        localStorage.removeItem('test-key');
        
        results.localStorage = {
          success: retrievedValue === 'test-value'
        };
      } catch (error) {
        results.localStorage = {
          success: false,
          error: error.message
        };
      }
      
    } catch (error) {
      console.error('Test error:', error);
      results.general = {
        success: false,
        error: error.message
      };
    } finally {
      setTestResults(results);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Comprehensive System Test</h1>
        
        <button
          onClick={runAllTests}
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50 mb-6"
        >
          {loading ? 'Running Tests...' : 'Run All Tests'}
        </button>
        
        {Object.keys(testResults).length > 0 && (
          <div className="mt-6 space-y-4">
            <h2 className="text-lg font-semibold">Test Results:</h2>
            
            {Object.entries(testResults).map(([testName, result]: [string, any]) => (
              <div key={testName} className="p-4 bg-gray-50 rounded-md">
                <h3 className="font-medium capitalize">{testName} Test</h3>
                <div className="mt-2">
                  <span className={`inline-block w-3 h-3 rounded-full mr-2 ${result.success ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  <span className={result.success ? 'text-green-600' : 'text-red-600'}>
                    {result.success ? 'PASSED' : 'FAILED'}
                  </span>
                </div>
                
                {result.error && (
                  <p className="mt-2 text-sm text-red-600">Error: {result.error}</p>
                )}
                
                {result.statusCode && (
                  <p className="mt-1 text-sm">Status Code: {result.statusCode}</p>
                )}
                
                {result.userRole && (
                  <p className="mt-1 text-sm">User Role: {result.userRole}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}