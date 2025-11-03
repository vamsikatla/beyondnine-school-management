"use client";

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DebugAuthPage() {
  const { user, isAuthenticated, loading, school } = useAuth();
  const router = useRouter();
  const [localStorageData, setLocalStorageData] = useState<Record<string, string>>({});

  useEffect(() => {
    // Get all relevant localStorage data
    const data: Record<string, string> = {};
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
  }, []);

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

  const handleGoToParentDashboard = () => {
    router.push('/parent/dashboard');
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
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Authentication Debug Page</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-blue-800 mb-2">Auth Context State</h2>
              <div className="space-y-2">
                <p><span className="font-medium">Authenticated:</span> {isAuthenticated ? 'Yes' : 'No'}</p>
                <p><span className="font-medium">Loading:</span> {loading ? 'Yes' : 'No'}</p>
                <p><span className="font-medium">User:</span> {user ? user.firstName + ' ' + user.lastName + ' (' + user.role + ')' : 'None'}</p>
                <p><span className="font-medium">School:</span> {school ? school.name : 'None'}</p>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-green-800 mb-2">LocalStorage Data</h2>
              <div className="space-y-2">
                <p><span className="font-medium">isAuthenticated:</span> {localStorageData.isAuthenticated || 'Not set'}</p>
                <p><span className="font-medium">authToken:</span> {localStorageData.authToken ? 'Set' : 'Not set'}</p>
                <p><span className="font-medium">user:</span> {localStorageData.user ? 'Set' : 'Not set'}</p>
                <p><span className="font-medium">school:</span> {localStorageData.school ? 'Set' : 'Not set'}</p>
              </div>
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
              onClick={handleGoToParentDashboard}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              Go to Parent Dashboard
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
            <li>If you're redirected back to login, check if ProtectedRoute is working correctly</li>
          </ol>
        </div>
      </div>
    </div>
  );
}