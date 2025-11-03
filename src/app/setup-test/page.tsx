"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { 
  Shield, 
  School, 
  GraduationCap, 
  User, 
  Users, 
  ArrowRight,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const SetupTestPage = () => {
  const [testStatus, setTestStatus] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);

  const roles = [
    {
      name: 'Super Admin',
      role: 'SUPER_ADMIN',
      path: '/admin/dashboard',
      icon: Shield,
      color: 'from-red-500 to-pink-500'
    },
    {
      name: 'School Admin',
      role: 'SCHOOL_ADMIN',
      path: '/school-admin/dashboard',
      icon: School,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Teacher',
      role: 'TEACHER',
      path: '/teacher/dashboard',
      icon: GraduationCap,
      color: 'from-green-500 to-emerald-500'
    },
    {
      name: 'Student',
      role: 'STUDENT',
      path: '/student/dashboard',
      icon: User,
      color: 'from-purple-500 to-indigo-500'
    },
    {
      name: 'Parent',
      role: 'PARENT',
      path: '/parent/dashboard',
      icon: Users,
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const setupTestAccess = async (role: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/test-access?role=${role}`);
      const data = await response.json();
      
      if (data.success) {
        // Set up local storage with mock data
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('authToken', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        localStorage.setItem('school', JSON.stringify(data.data.school));
        
        // Update test status
        setTestStatus(prev => ({ ...prev, [role]: true }));
        
        // Small delay before redirect
        setTimeout(() => {
          window.location.href = roles.find(r => r.role === role)?.path || '/';
        }, 500);
      }
    } catch (error) {
      console.error('Error setting up test access:', error);
      setTestStatus(prev => ({ ...prev, [role]: false }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Setup Test Environment
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Configure test access for different roles to verify dashboard functionality.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Test Setup Instructions</CardTitle>
            <CardDescription>
              Click on any role below to set up test access and navigate to that role's dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-medium text-slate-900 dark:text-white">Steps:</h3>
                <ol className="list-decimal list-inside space-y-1 text-slate-600 dark:text-slate-300">
                  <li>Click on any role card below</li>
                  <li>Test access will be configured automatically</li>
                  <li>You'll be redirected to the role's dashboard</li>
                  <li>Verify all functionality works correctly</li>
                </ol>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-slate-900 dark:text-white">Note:</h3>
                <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
                  <li>This is for testing purposes only</li>
                  <li>No real authentication is performed</li>
                  <li>Data shown is mock data for demonstration</li>
                  <li>Test environment only works in development</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${role.color} flex items-center justify-center mb-4`}>
                  <role.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">{role.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <Button 
                  variant="gradient" 
                  className="w-full"
                  onClick={() => setupTestAccess(role.role)}
                  disabled={loading}
                >
                  {loading ? 'Setting up...' : 'Setup Test Access'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <div className="text-center">
                  {testStatus[role.role] === true && (
                    <div className="flex items-center justify-center text-green-600 dark:text-green-400">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      <span className="text-sm">Ready for testing</span>
                    </div>
                  )}
                  {testStatus[role.role] === false && (
                    <div className="flex items-center justify-center text-red-600 dark:text-red-400">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      <span className="text-sm">Setup failed</span>
                    </div>
                  )}
                </div>
                
                <Link href={role.path} className="w-full">
                  <Button variant="outline" className="w-full">
                    Go to Dashboard
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/test-all-roles">
            <Button variant="outline">
              Back to Test All Roles
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SetupTestPage;