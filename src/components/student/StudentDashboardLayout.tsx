"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/Badge';
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Calendar,
  CalendarDays,
  ClipboardList,
  CreditCard,
  Library,
  User,
  Bell,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';

interface NavigationItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

const navigationItems: NavigationItem[] = [
  {
    label: 'Dashboard',
    href: '/student/dashboard',
    icon: <LayoutDashboard className="h-4 w-4" />
  },
  {
    label: 'Academics',
    href: '/student/academics',
    icon: <BookOpen className="h-4 w-4" />
  },
  {
    label: 'Assignments',
    href: '/student/assignments',
    icon: <FileText className="h-4 w-4" />,
    badge: 3
  },
  {
    label: 'Courses',
    href: '/student/courses',
    icon: <BookOpen className="h-4 w-4" />
  },
  {
    label: 'Timetable',
    href: '/student/timetable',
    icon: <Calendar className="h-4 w-4" />
  },
  {
    label: 'Attendance',
    href: '/student/attendance',
    icon: <CalendarDays className="h-4 w-4" />
  },
  {
    label: 'Exams',
    href: '/student/exams',
    icon: <ClipboardList className="h-4 w-4" />,
    badge: 2
  },
  {
    label: 'Fees',
    href: '/student/fees',
    icon: <CreditCard className="h-4 w-4" />
  },
  {
    label: 'Library',
    href: '/student/library',
    icon: <Library className="h-4 w-4" />
  },
  {
    label: 'Profile',
    href: '/student/profile',
    icon: <User className="h-4 w-4" />
  }
];

interface StudentDashboardLayoutProps {
  children: React.ReactNode;
}

export const StudentDashboardLayout: React.FC<StudentDashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications] = useState(5); // Mock notification count

  const getCurrentPageTitle = () => {
    const currentItem = navigationItems.find(item => item.href === pathname);
    return currentItem?.label || 'Dashboard';
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-full flex-col">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between px-4 py-6 border-b">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">BeyondNine</h2>
                <p className="text-sm text-gray-500">Student Portal</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  pathname === item.href
                    ? "bg-blue-50 text-blue-700 border-l-4 border-blue-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <div className="flex items-center space-x-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge && item.badge > 0 && (
                  <Badge variant="secondary" className="bg-red-100 text-red-800">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            ))}
          </nav>

          {/* User Profile */}
          <div className="px-4 py-4 border-t">
            <div className="flex items-center space-x-3 mb-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback>{user?.name?.charAt(0) || 'S'}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.name || 'Student'}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email || 'student@school.edu'}
                </p>
              </div>
            </div>
            <div className="space-y-1">
              <Link href="/student/profile">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-red-600 hover:text-red-700"
                onClick={logout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {getCurrentPageTitle()}
                </h1>
                <p className="text-sm text-gray-500">
                  Welcome back, {user?.name?.split(' ')[0] || 'Student'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
                    {notifications}
                  </Badge>
                )}
              </Button>

              {/* User Avatar */}
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback>{user?.name?.charAt(0) || 'S'}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-4 lg:p-6">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default StudentDashboardLayout;