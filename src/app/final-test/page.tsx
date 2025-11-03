"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FinalTestPage() {
  const router = useRouter();
  const [testResults, setTestResults] = useState<any[]>([]);
  const [currentTest, setCurrentTest] = useState<string>('');

  const testCredentials = [
    {
      name: 'Super Admin',
      email: 'admin@beyondnine.com',
      password: 'admin123',
      expectedRole: 'SUPER_ADMIN',
      expectedRedirect: '/admin/dashboard'
    },
    {
      name: 'School Admin',
      email: 'school@beyondnine.com',
      password: 'school123',
      expectedRole: 'SCHOOL_ADMIN',
      expectedRedirect: '/school-admin/dashboard'
    },
    {
      name: 'Teacher',
      email: 'teacher@beyondnine.com',
      password: 'teacher123',
      expectedRole: 'TEACHER',
      expectedRedirect: '/teacher/dashboard'
    },
    {
      name: 'Student',
      email: 'student@beyondnine.com',
      password: 'student123',
      expectedRole: 'STUDENT',
      expectedRedirect: '/student/dashboard'
    },
    {
      name: 'Parent',
      email: 'parent@beyondnine.com',
      password: 'parent123',
      expectedRole: 'PARENT',
      expectedRedirect: '/parent/dashboard'
    }
  ];

  const runAllTests = async () => {
    setTestResults([]);
    
    for (const credential of testCredentials) {
      setCurrentTest(`Testing ${credential.name}...`);
      
      try {
        // Clear previous auth data
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        localStorage.removeItem('school');
        
        // Perform login
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            email: credential.email, 
            password: credential.password 
          })
        });
        
        const data = await response.json();
        
        if (data.success) {
          // Check if role matches
          const roleMatch = data.data.user.role === credential.expectedRole;
          
          // Store result
          const result = {
            name: credential.name,
            email: credential.email,
            success: true,
            roleMatch,
            actualRole: data.data.user.role,
            expectedRole: credential.expectedRole,
            message: roleMatch ? '✅ Role matches expected' : '❌ Role mismatch'
          };
          
          setTestResults(prev => [...prev, result]);
        } else {
          setTestResults(prev => [...prev, {
            name: credential.name,
            email: credential.email,
            success: false,
            message: `❌ Login failed: ${data.error}`
          }]);
        }
      } catch (error) {
        setTestResults(prev => [...prev, {
          name: credential.name,
          email: credential.email,
          success: false,
          message: `❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`
        }]);
      }
    }
    
    setCurrentTest('');
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Final Authentication Test</h1>
          
          <div className="mb-8">
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={runAllTests}
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Run All Tests
              </button>
              
              <button 
                onClick={clearResults}
                className="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors font-medium"
              >
                Clear Results
              </button>
            </div>
            
            {currentTest && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-800 font-medium">{currentTest}</p>
              </div>
            )}
          </div>
          
          {testResults.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Test Results</h2>
              <div className="space-y-4">
                {testResults.map((result, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-lg border ${
                      result.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{result.name}</h3>
                        <p className="text-sm text-gray-600">{result.email}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {result.success ? 'Success' : 'Failed'}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-700">{result.message}</p>
                    {result.roleMatch !== undefined && (
                      <p className="mt-1 text-xs text-gray-600">
                        Role: {result.actualRole} (expected: {result.expectedRole})
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-800 mb-2">Test Information</h3>
            <p className="text-sm text-blue-700">
              This test verifies that all demo login credentials work correctly and return the expected user roles. 
              If all tests pass, the authentication system is working properly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}