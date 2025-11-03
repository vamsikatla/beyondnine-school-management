"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function AuthDebugPage() {
  const { isAuthenticated, user, loading, school } = useAuth();
  const router = useRouter();
  const [localStorageData, setLocalStorageData] = useState<Record<string, any>>({});
  const [debugInfo, setDebugInfo] = useState<any>({});

  useEffect(() => {
    // Get all relevant localStorage data
    const updateLocalStorageData = () => {
      const data: Record<string, any> = {};
      const keys = ['isAuthenticated', 'authToken', 'user', 'school'];
      keys.forEach(key => {
        const value = localStorage.getItem(key);
        if (value) {
          try {
            data[key] = JSON.parse(value);
          } catch {
            data[key] = value;
          }
        }
      });
      setLocalStorageData(data);
    };

    updateLocalStorageData();
    
    // Set up listener for storage changes
    const handleStorageChange = () => {
      updateLocalStorageData();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    // Update debug info
    setDebugInfo({
      timestamp: new Date().toISOString(),
      authContext: {
        isAuthenticated,
        user: user ? { id: user.id, email: user.email, role: user.role } : null,
        school: school ? { id: school.id, name: school.name } : null,
        loading
      },
      localStorage: localStorageData,
      windowLocation: typeof window !== 'undefined' ? window.location.pathname : 'server'
    });
  }, [isAuthenticated, user, loading, school, localStorageData]);

  const handleCheckAuth = () => {
    // Force re-check authentication status
    window.location.reload();
  };

  const handleClearAuth = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('school');
    window.location.reload();
  };

  const handleGoToLogin = () => {
    router.push('/auth/login');
  };

  const handleTestRedirect = (path: string) => {
    router.push(path);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading Authentication Data...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Authentication Debug Page</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-blue-800 mb-2">Auth Context State</h2>
              <div className="space-y-2">
                <p><span className="font-medium">Authenticated:</span> {isAuthenticated ? 'Yes' : 'No'}</p>
                <p><span className="font-medium">Loading:</span> {loading ? 'Yes' : 'No'}</p>
                <p><span className="font-medium">User:</span> {user ? `${user.firstName} ${user.lastName} (${user.role})` : 'None'}</p>
                <p><span className="font-medium">School:</span> {school ? school.name : 'None'}</p>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-green-800 mb-2">LocalStorage Data</h2>
              <div className="space-y-2">
                <p><span className="font-medium">isAuthenticated:</span> {localStorageData.isAuthenticated || 'Not set'}</p>
                <p><span className="font-medium">authToken:</span> {localStorageData.authToken ? 'Set' : 'Not set'}</p>
                <p><span className="font-medium">user:</span> {localStorageData.user ? `${localStorageData.user.firstName} ${localStorageData.user.lastName} (${localStorageData.user.role})` : 'Not set'}</p>
                <p><span className="font-medium">school:</span> {localStorageData.school ? localStorageData.school.name : 'Not set'}</p>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Debug Information</h2>
            <div className="bg-gray-100 p-4 rounded-lg">
              <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={handleCheckAuth}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Refresh Auth Status
            </button>
            
            <button 
              onClick={handleClearAuth}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Clear Auth Data
            </button>
            
            <button 
              onClick={handleGoToLogin}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Go to Login
            </button>
            
            <button 
              onClick={() => handleTestRedirect('/admin/dashboard')}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              Test Admin Dashboard
            </button>
            
            <button 
              onClick={() => handleTestRedirect('/school-admin/dashboard')}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Test School Admin Dashboard
            </button>
            
            <button 
              onClick={() => handleTestRedirect('/teacher/dashboard')}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Test Teacher Dashboard
            </button>
            
            <button 
              onClick={() => handleTestRedirect('/student/dashboard')}
              className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
            >
              Test Student Dashboard
            </button>
            
            <button 
              onClick={() => handleTestRedirect('/parent/dashboard')}
              className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors"
            >
              Test Parent Dashboard
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Debug Instructions</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Click "Refresh Auth Status" to check current authentication state</li>
            <li>If you're logged in but see "Not Authenticated", there's a state sync issue</li>
            <li>Try "Clear Auth Data" and re-login if there are persistent issues</li>
            <li>Check the browser console for any error messages</li>
            <li>Test direct navigation to dashboards using the test buttons</li>
            <li>The debug information shows both context state and localStorage data</li>
          </ol>
        </div>
      </div>
    </div>
  );
}