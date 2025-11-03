"use client";

import React from 'react';
import { StudentDashboardLayout } from '@/components/student/StudentDashboardLayout';
import { StudentModalProvider } from '@/contexts/StudentModalContext';

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StudentModalProvider>
      <StudentDashboardLayout>
        {children}
      </StudentDashboardLayout>
    </StudentModalProvider>
  );
}