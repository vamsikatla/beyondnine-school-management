"use client";

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const TestDashboardFunctionality = () => {
  const dashboards = [
    {
      name: "Student Dashboard",
      path: "/student/dashboard",
      description: "Test student role features and functionality"
    },
    {
      name: "Teacher Dashboard",
      path: "/teacher/dashboard",
      description: "Test teacher role features and functionality"
    },
    {
      name: "School Admin Dashboard",
      path: "/school-admin/dashboard",
      description: "Test school admin role features and functionality"
    },
    {
      name: "Super Admin Dashboard",
      path: "/admin/dashboard",
      description: "Test super admin role features and functionality"
    },
    {
      name: "Parent Dashboard",
      path: "/parent/dashboard",
      description: "Test parent role features and functionality"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Dashboard Functionality Test
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Verify that all role dashboards are working correctly with functional features
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboards.map((dashboard, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">{dashboard.name}</CardTitle>
                <CardDescription>{dashboard.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={dashboard.path}>
                  <Button className="w-full" variant="gradient">
                    Test Dashboard
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
            Testing Checklist
          </h2>
          <ul className="space-y-2 text-slate-600 dark:text-slate-400">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              All dashboard tabs are accessible
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Interactive features work (modals, forms, buttons)
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Data is displayed correctly
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Navigation between features works
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Forms can be submitted and data is processed
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TestDashboardFunctionality;