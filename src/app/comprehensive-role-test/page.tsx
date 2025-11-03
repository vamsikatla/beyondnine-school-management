"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ComprehensiveRoleTest() {
  const router = useRouter();
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testRoles = [
    {
      name: 'Super Admin',
      email: 'admin@beyondnine.com',
      password: 'admin123',
      redirect: '/admin/dashboard'
    },
    {
      name: 'School Admin',
      email: 'school@beyondnine.com',
      password: 'school123',
      redirect: '/school-admin/dashboard'
    },
    {
      name: 'Teacher',
      email: 'teacher@beyondnine.com',
      password: 'teacher123',
      redirect: '/teacher/dashboard'
    },
    {
      name: 'Student',
      email: 'student@beyondnine.com',
      password: 'student123',
      redirect: '/student/dashboard'
    },
    {
      name: 'Parent',
      email: 'parent@beyondnine.com',
      password: 'parent123',
      redirect: '/parent/dashboard'
    }
  ];

  const performLoginTest = async (roleData: typeof testRoles[0]) => {
    setLoading(true);
    setResult(`Testing ${roleData.name} login...`);
    
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
          email: roleData.email, 
          password: roleData.password 
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Store auth data
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('authToken', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        localStorage.setItem('school', JSON.stringify(data.data.school));
        
        setResult(`${roleData.name} login successful! User: ${data.data.user.firstName} ${data.data.user.lastName} (${data.data.user.role})`);
        
        // Wait a moment then redirect
        setTimeout(() => {
          setResult(`Redirecting ${roleData.name} to ${roleData.redirect}...`);
          router.push(roleData.redirect);
        }, 1000);
      } else {
        setResult(`${roleData.name} login failed: ${data.error}`);
      }
    } catch (error) {
      setResult(`${roleData.name} login error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const clearAuth = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('school');
    setResult('Authentication data cleared');
  };

  const goToLogin = () => {
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Comprehensive Role Test</h1>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Test All Roles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {testRoles.map((role, index) => (
                <button
                  key={index}
                  onClick={() => performLoginTest(role)}
                  disabled={loading}
                  className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50"
                >
                  <div className="font-medium">{role.name}</div>
                  <div className="text-sm opacity-90 mt-1">{role.redirect}</div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={clearAuth}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Clear Auth Data
            </button>
            
            <button 
              onClick={goToLogin}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Go to Login Page
            </button>
          </div>
        </div>
        
        {result && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Test Result</h2>
            <div className="p-4 bg-gray-100 rounded-md">
              <pre className="text-sm text-gray-800 whitespace-pre-wrap">{result}</pre>
            </div>
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Test Instructions</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Click on any role button to test that role's login and redirection</li>
            <li>Check if the user is properly redirected to their dashboard</li>
            <li>If redirection fails, check browser console for errors</li>
            <li>Use "Clear Auth Data" to reset and try again</li>
            <li>All roles should work: Super Admin, School Admin, Teacher, Student, Parent</li>
          </ol>
          
          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Expected Redirections</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Super Admin → /admin/dashboard</li>
            <li>School Admin → /school-admin/dashboard</li>
            <li>Teacher → /teacher/dashboard</li>
            <li>Student → /student/dashboard</li>
            <li>Parent → /parent/dashboard</li>
          </ul>
        </div>
      </div>
    </div>
  );
}