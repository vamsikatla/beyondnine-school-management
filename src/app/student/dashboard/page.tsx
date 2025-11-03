"use client";

import React from 'react';
import StudentDashboard from '@/components/student/StudentDashboard';
import { StudentChatbot } from '@/components/student/StudentChatbot';

export default function StudentDashboardPage() {
  return (
    <>
      <StudentDashboard />
      <StudentChatbot />
    </>
  );
}