"use client";

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';

interface DebugProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

export default function DebugProtectedRoute({ children, requiredRole }: DebugProtectedRouteProps) {
  const { isAuthenticated, user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log('=== DebugProtectedRoute ===');
    console.log('Props:', { requiredRole });
    console.log('Auth State:', { loading, isAuthenticated, user });
    
    // Log localStorage data
    const authToken = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');
    const isAuthenticatedFlag = localStorage.getItem('isAuthenticated');
    
    console.log('LocalStorage Data:', { 
      authToken: !!authToken, 
      userData: userData ? JSON.parse(userData) : null,
      isAuthenticatedFlag 
    });
    
    if (loading) {
      console.log('Still loading, waiting...');
      return;
    }
    
    if (!isAuthenticated) {
      console.log('Not authenticated, redirecting to login');
      router.push('/auth/login');
      return;
    }
    
    // If we're authenticated and no specific role is required, allow access
    if (isAuthenticated && !requiredRole) {
      console.log('Authenticated and no role required, access granted');
      return;
    }
    
    // If role is required, check it
    if (requiredRole && user) {
      console.log('Checking role requirement:', { requiredRole, userRole: user.role });
      
      if (user.role === requiredRole) {
        console.log('✅ Role matches, access granted');
        return;
      } else {
        console.log('❌ Role mismatch, redirecting based on user role:', user.role);
        // Redirect based on user role
        switch (user.role) {
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
            router.push('/');
            break;
        }
      }
    }
    
    console.log('=== End DebugProtectedRoute ===');
  }, [isAuthenticated, user, loading, requiredRole, router]);

  if (loading) {
    console.log('Showing loading spinner');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader className="h-8 w-8 animate-spin text-blue-500" />
          <p className="mt-2 text-slate-600">Loading authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('User not authenticated, returning null');
    return null;
  }

  // If role is required, check it one more time before rendering
  if (requiredRole && user && user.role !== requiredRole) {
    console.log('Role mismatch in final check, returning null');
    return null;
  }

  console.log('Rendering protected content');
  return <>{children}</>;
}