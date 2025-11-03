"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TestRedirection() {
  const router = useRouter();

  useEffect(() => {
    console.log('TestRedirection page loaded');
    
    // Check if we have auth data
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const user = localStorage.getItem('user');
    
    console.log('Auth data found:', { isAuthenticated, user });
    
    if (isAuthenticated === 'true' && user) {
      try {
        const userData = JSON.parse(user);
        console.log('User data:', userData);
        
        // Redirect based on role
        switch (userData.role) {
          case 'SUPER_ADMIN':
            console.log('Redirecting SUPER_ADMIN to /admin/dashboard');
            router.push('/admin/dashboard');
            break;
          case 'SCHOOL_ADMIN':
            console.log('Redirecting SCHOOL_ADMIN to /school-admin/dashboard');
            router.push('/school-admin/dashboard');
            break;
          case 'TEACHER':
            console.log('Redirecting TEACHER to /teacher/dashboard');
            router.push('/teacher/dashboard');
            break;
          case 'STUDENT':
            console.log('Redirecting STUDENT to /student/dashboard');
            router.push('/student/dashboard');
            break;
          case 'PARENT':
            console.log('Redirecting PARENT to /parent/dashboard');
            router.push('/parent/dashboard');
            break;
          default:
            console.log('Redirecting to /auth/login (unknown role)');
            router.push('/auth/login');
            break;
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        router.push('/auth/login');
      }
    } else {
      console.log('No auth data, redirecting to /auth/login');
      router.push('/auth/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Testing Redirection...</h1>
        <p className="text-gray-600">Please check the browser console for details.</p>
      </div>
    </div>
  );
}