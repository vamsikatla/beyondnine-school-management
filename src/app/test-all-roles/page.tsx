"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { 
  Shield, 
  School, 
  GraduationCap, 
  User, 
  Users, 
  ArrowRight 
} from 'lucide-react';

const TestAllRolesPage = () => {
  const roles = [
    {
      name: 'Super Admin',
      path: '/admin/dashboard',
      icon: Shield,
      color: 'from-red-500 to-pink-500',
      description: 'Full system access and management'
    },
    {
      name: 'School Admin',
      path: '/school-admin/dashboard',
      icon: School,
      color: 'from-blue-500 to-cyan-500',
      description: 'School-level administration and management'
    },
    {
      name: 'Teacher',
      path: '/teacher/dashboard',
      icon: GraduationCap,
      color: 'from-green-500 to-emerald-500',
      description: 'Teaching portal and student management'
    },
    {
      name: 'Student',
      path: '/student/dashboard',
      icon: User,
      color: 'from-purple-500 to-indigo-500',
      description: 'Student dashboard and learning portal'
    },
    {
      name: 'Parent',
      path: '/parent/dashboard',
      icon: Users,
      color: 'from-indigo-500 to-purple-500',
      description: 'Parent portal to track child progress'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Test All Roles
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Click on any role below to navigate directly to that role's dashboard for testing purposes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role, index) => (
            <Link key={index} href={role.path}>
              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${role.color} flex items-center justify-center mb-4`}>
                    <role.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{role.name}</CardTitle>
                  <CardDescription>{role.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="gradient" className="w-full">
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="bg-white/50 dark:bg-slate-800/50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Testing Instructions
              </h3>
              <ul className="text-left text-slate-600 dark:text-slate-300 space-y-2 max-w-md mx-auto">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Click on any role card above to navigate to that role's dashboard</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>All dashboards should load without authentication for testing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Verify that each role has appropriate access and features</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Check navigation and functionality within each dashboard</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TestAllRolesPage;