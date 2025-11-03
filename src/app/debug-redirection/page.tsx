"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
  schoolId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface School {
  id: string;
  name: string;
  code: string;
  email: string;
  subscriptionPlan: string;
  subscriptionStatus: string;
}

const DebugRedirectionPage = () => {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();
  const [debugInfo, setDebugInfo] = useState<any>({});

  useEffect(() => {
    setDebugInfo({
      isAuthenticated,
      user,
      loading,
      timestamp: new Date().toISOString()
    });
  }, [isAuthenticated, user, loading]);

  const handleTeacherLogin = async () => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'teacher@beyondnine.com',
          password: 'teacher123'
        })
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (data.success) {
        // Set authentication data in localStorage
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('authToken', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        localStorage.setItem('school', JSON.stringify(data.data.school));
        
        // Update the authentication context
        const userRole = (data.data.user as User).role;
        console.log('Redirecting user with role:', userRole);
        
        // Add a small delay to ensure authentication state is properly set
        setTimeout(() => {
          // Use router.push instead of window.location.assign for better state management
          switch (userRole) {
            case 'SUPER_ADMIN':
              console.log('Redirecting to admin dashboard');
              router.push('/admin/dashboard');
              break;
            case 'SCHOOL_ADMIN':
              console.log('Redirecting to school admin dashboard');
              router.push('/school-admin/dashboard');
              break;
            case 'TEACHER':
              console.log('Redirecting to teacher dashboard');
              router.push('/teacher/dashboard');
              break;
            case 'STUDENT':
              console.log('Redirecting to student dashboard');
              router.push('/student/dashboard');
              break;
            case 'PARENT':
              console.log('Redirecting to parent dashboard');
              router.push('/parent/dashboard');
              break;
            default:
              console.log('Redirecting to default dashboard');
              router.push('/dashboard');
              break;
          }
        }, 200);
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">Debug Role Redirection</h1>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Current Auth State</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={handleTeacherLogin}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Login as Teacher
          </button>
          
          <button
            onClick={() => router.push('/auth/login')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Go to Login Page
          </button>
          
          <button
            onClick={() => router.push('/teacher/dashboard')}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
          >
            Go to Teacher Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default DebugRedirectionPage;