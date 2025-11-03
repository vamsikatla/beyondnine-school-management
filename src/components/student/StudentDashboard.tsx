"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { 
  useStudentAcademicModals, 
  useStudentAttendanceModals, 
  useStudentFeeModals 
} from '@/contexts/StudentModalContext';
import {
  BookOpen,
  FileText,
  CalendarDays,
  CreditCard,
  User,
  Bell,
  BookMarked,
  Calendar,
  TrendingUp,
  HelpCircle,
  Award,
  Clock
} from 'lucide-react';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const { viewGrades, viewAssignments, viewExamSchedule } = useStudentAcademicModals();
  const { viewAttendance, requestLeave } = useStudentAttendanceModals();
  const { viewFeeDetails, payFees } = useStudentFeeModals();

  // Mock quick stats data
  const quickStats = {
    overallGPA: 3.6,
    attendancePercentage: 85,
    pendingAssignments: 3,
    upcomingExams: 2,
    outstandingFees: 12500
  };

  const recentActivity = [
    {
      id: '1',
      type: 'grade',
      title: 'Mathematics Mid-term Result',
      description: 'Scored 85/100 (A grade)',
      time: '2 hours ago',
      icon: <Award className="h-4 w-4" />
    },
    {
      id: '2',
      type: 'assignment',
      title: 'Physics Lab Report Due',
      description: 'Due tomorrow at 11:59 PM',
      time: '1 day left',
      icon: <Clock className="h-4 w-4" />
    },
    {
      id: '3',
      type: 'announcement',
      title: 'School Sports Day',
      description: 'Annual sports event on Oct 15',
      time: '3 days ago',
      icon: <Bell className="h-4 w-4" />
    }
  ];

  const upcomingEvents = [
    {
      id: '1',
      title: 'Chemistry Practical Exam',
      date: '2024-09-28',
      time: '10:00 AM',
      type: 'exam'
    },
    {
      id: '2',
      title: 'Mathematics Assignment Due',
      date: '2024-09-30',
      time: '11:59 PM',
      type: 'assignment'
    },
    {
      id: '3',
      title: 'Parent-Teacher Meeting',
      date: '2024-10-02',
      time: '3:00 PM',
      type: 'meeting'
    }
  ];

  const handleQuickAction = (action: string, params?: any) => {
    switch (action) {
      case 'view-grades':
        viewGrades({ studentId: user?.id, ...params });
        break;
      case 'view-assignments':
        viewAssignments({ studentId: user?.id, ...params });
        break;
      case 'view-attendance':
        viewAttendance({ studentId: user?.id, ...params });
        break;
      case 'view-fees':
        viewFeeDetails();
        break;
      case 'pay-fees':
        payFees({ studentId: user?.id, ...params });
        break;
      case 'request-leave':
        requestLeave({ studentId: user?.id, ...params });
        break;
      case 'view-exam-schedule':
        viewExamSchedule({ studentId: user?.id, upcomingOnly: true, ...params });
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your academics today.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" 
              onClick={() => handleQuickAction('view-grades')}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overall GPA</p>
                <p className="text-2xl font-bold text-blue-600">{quickStats.overallGPA}</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
            <Progress value={(quickStats.overallGPA / 4.0) * 100} className="mt-3 h-1" />
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleQuickAction('view-attendance')}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Attendance</p>
                <p className="text-2xl font-bold text-green-600">{quickStats.attendancePercentage}%</p>
              </div>
              <CalendarDays className="h-8 w-8 text-green-600" />
            </div>
            <Progress value={quickStats.attendancePercentage} className="mt-3 h-1" />
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleQuickAction('view-assignments', { status: 'pending' })}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Tasks</p>
                <p className="text-2xl font-bold text-yellow-600">{quickStats.pendingAssignments}</p>
              </div>
              <FileText className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleQuickAction('view-exam-schedule')}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming Exams</p>
                <p className="text-2xl font-bold text-purple-600">{quickStats.upcomingExams}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleQuickAction('view-fees')}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Outstanding Fees</p>
                <p className="text-2xl font-bold text-red-600">₹{quickStats.outstandingFees.toLocaleString()}</p>
              </div>
              <CreditCard className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Access your most used features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                className="h-16 flex flex-col items-center gap-2"
                onClick={() => handleQuickAction('view-grades')}
              >
                <BookOpen className="h-6 w-6" />
                <span className="text-sm">View Grades</span>
              </Button>

              <Button 
                variant="outline" 
                className="h-16 flex flex-col items-center gap-2"
                onClick={() => handleQuickAction('view-assignments')}
              >
                <FileText className="h-6 w-6" />
                <span className="text-sm">Assignments</span>
              </Button>

              <Button 
                variant="outline" 
                className="h-16 flex flex-col items-center gap-2"
                onClick={() => handleQuickAction('view-attendance')}
              >
                <CalendarDays className="h-6 w-6" />
                <span className="text-sm">Attendance</span>
              </Button>

              <Button 
                variant="outline" 
                className="h-16 flex flex-col items-center gap-2"
                onClick={() => handleQuickAction('pay-fees')}
              >
                <CreditCard className="h-6 w-6" />
                <span className="text-sm">Pay Fees</span>
              </Button>

              <Button 
                variant="outline" 
                className="h-16 flex flex-col items-center gap-2"
                onClick={() => handleQuickAction('request-leave')}
              >
                <Calendar className="h-6 w-6" />
                <span className="text-sm">Request Leave</span>
              </Button>

              <Button 
                variant="outline" 
                className="h-16 flex flex-col items-center gap-2"
              >
                <BookMarked className="h-6 w-6" />
                <span className="text-sm">Library</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    {activity.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>Important dates and deadlines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">{event.title}</h4>
                  <Badge 
                    variant="outline" 
                    className={
                      event.type === 'exam' ? 'bg-red-50 text-red-700' :
                      event.type === 'assignment' ? 'bg-yellow-50 text-yellow-700' :
                      'bg-blue-50 text-blue-700'
                    }
                  >
                    {event.type}
                  </Badge>
                </div>
                <div className="text-xs text-gray-500">
                  <p>{new Date(event.date).toLocaleDateString()}</p>
                  <p>{event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Academic Performance
            </CardTitle>
            <CardDescription>Your progress across subjects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Mathematics</span>
                  <span>85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Physics</span>
                  <span>92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Chemistry</span>
                  <span>78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>English</span>
                  <span>88%</span>
                </div>
                <Progress value={88} className="h-2" />
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4" onClick={() => handleQuickAction('view-grades')}>
              View Detailed Report
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Need Help?
            </CardTitle>
            <CardDescription>Get assistance when you need it</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <BookMarked className="h-4 w-4 mr-2" />
                Academic Support
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <User className="h-4 w-4 mr-2" />
                Contact Counselor
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Bell className="h-4 w-4 mr-2" />
                Report an Issue
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <HelpCircle className="h-4 w-4 mr-2" />
                FAQs & Help Center
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;