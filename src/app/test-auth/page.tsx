"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

const TestAuthPage = () => {
  const router = useRouter();
  const { user, isAuthenticated, loading, login } = useAuth();
  const [testResult, setTestResult] = useState<string>('');
  const [isTesting, setIsTesting] = useState<boolean>(false);

  const testTeacherLogin = async () => {
    setIsTesting(true);
    setTestResult('Testing teacher login...');
    
    try {
      // Clear any existing auth data
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      localStorage.removeItem('school');
      
      // Attempt to login as teacher
      const success = await login('teacher@beyondnine.com', 'teacher123');
      
      if (success) {
        setTestResult('Login successful. Checking user data...');
        
        // Wait a bit for state to update
        setTimeout(() => {
          const userData = localStorage.getItem('user');
          if (userData) {
            const parsedUser = JSON.parse(userData);
            setTestResult(`Login successful. User role: ${parsedUser.role}`);
            
            // Try to navigate to teacher dashboard
            router.push('/teacher/dashboard');
          } else {
            setTestResult('Login successful but user data not found in localStorage');
          }
        }, 300);
      } else {
        setTestResult('Login failed');
      }
    } catch (error) {
      setTestResult(`Error during login: ${error}`);
    } finally {
      setIsTesting(false);
    }
  };

  const checkCurrentAuthState = () => {
    const isAuthenticatedFlag = localStorage.getItem('isAuthenticated');
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('authToken');
    
    let userInfo = 'No user data';
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        userInfo = `Role: ${parsedUser.role}, Name: ${parsedUser.firstName} ${parsedUser.lastName}`;
      } catch (e) {
        userInfo = 'Error parsing user data';
      }
    }
    
    setTestResult(`Auth State - isAuthenticated: ${isAuthenticatedFlag}, Token: ${token ? 'Present' : 'Missing'}, User: ${userInfo}`);
  };

  useEffect(() => {
    // Check auth state on component mount
    checkCurrentAuthState();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">Authentication Test</h1>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Current Auth State</h2>
          <div className="bg-gray-100 p-4 rounded">
            <p><strong>isAuthenticated:</strong> {isAuthenticated ? 'true' : 'false'}</p>
            <p><strong>loading:</strong> {loading ? 'true' : 'false'}</p>
            <p><strong>user:</strong> {user ? `${user.firstName} ${user.lastName} (${user.role})` : 'null'}</p>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Test Results</h2>
          <div className="bg-blue-100 p-4 rounded">
            <p>{testResult || 'Click "Test Teacher Login" to begin'}</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <button
            onClick={testTeacherLogin}
            disabled={isTesting}
            className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-4 py-2 rounded"
          >
            {isTesting ? 'Testing...' : 'Test Teacher Login'}
          </button>
          
          <button
            onClick={checkCurrentAuthState}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Check Auth State
          </button>
          
          <button
            onClick={() => router.push('/auth/login')}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
          >
            Go to Login Page
          </button>
          
          <button
            onClick={() => router.push('/teacher/dashboard')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
          >
            Go to Teacher Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestAuthPage;