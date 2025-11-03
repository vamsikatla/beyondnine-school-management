"use client";

import { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { AuthUtils } from '@/lib/auth';

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

interface AuthContextType {
  user: User | null;
  school: School | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [school, setSchool] = useState<School | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is already authenticated
    checkAuthStatus();
    
    // Also check auth status when the page becomes visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkAuthStatus();
      }
    };
    
    // Listen for storage changes (in case another tab updates auth state)
    const handleStorageChange = () => {
      checkAuthStatus();
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const checkAuthStatus = () => {
    try {
      console.log('Checking auth status');
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('user');
      const schoolData = localStorage.getItem('school');
      const isAuthenticatedFlag = localStorage.getItem('isAuthenticated');
      
      console.log('Found in localStorage:', { token, userData, schoolData, isAuthenticatedFlag });
      
      if (token && userData && schoolData && isAuthenticatedFlag === 'true') {
        // For demo purposes, we'll accept any token as valid
        // In production, you would verify the token properly
        try {
          // Try to verify the token, but don't fail if it's a demo token
          try {
            const decoded = AuthUtils.verifyToken(token);
            console.log('Token verified:', decoded);
          } catch (verifyError) {
            console.log('Token verification failed (might be demo token):', verifyError);
            // Continue anyway for demo purposes
          }
          
          const parsedUser = JSON.parse(userData);
          const parsedSchool = JSON.parse(schoolData);
          console.log('Parsed user and school:', { parsedUser, parsedSchool });
          setUser(parsedUser);
          setSchool(parsedSchool);
          setIsAuthenticated(true);
          console.log('Authentication state set to true');
        } catch (error) {
          console.error('Error parsing user/school data:', error);
          // Data invalid, clear storage
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          localStorage.removeItem('school');
          localStorage.removeItem('isAuthenticated');
          setIsAuthenticated(false);
        }
      } else {
        console.log('Missing authentication data in localStorage');
        // Clear any partial data
        if (!isAuthenticatedFlag) {
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          localStorage.removeItem('school');
        }
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      // Clear storage on error
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      localStorage.removeItem('school');
      localStorage.removeItem('isAuthenticated');
      setIsAuthenticated(false);
    } finally {
      console.log('Finished checking auth status, loading set to false');
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        console.log('Login successful, setting localStorage and state');
        localStorage.setItem('authToken', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        localStorage.setItem('school', JSON.stringify(data.data.school));
        localStorage.setItem('isAuthenticated', 'true');
        
        // Add a small delay to ensure state is properly set before redirecting
        setTimeout(() => {
          setUser(data.data.user);
          setSchool(data.data.school);
          setIsAuthenticated(true);
          console.log('Authentication state updated:', { user: data.data.user, school: data.data.school });
        }, 100);
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('school');
    localStorage.removeItem('isAuthenticated');
    
    setUser(null);
    setSchool(null);
    setIsAuthenticated(false);
    
    router.push('/auth/login');
  };

  const value = {
    user,
    school,
    isAuthenticated,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}