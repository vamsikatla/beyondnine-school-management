"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  BookOpen,
  FileText,
  CalendarDays,
  CreditCard,
  TrendingUp,
  TrendingDown,
  Clock,
  Award,
  Bell,
  Calendar,
  Users,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';

const StudentOverview: React.FC = () => {
  const [stats, setStats] = useState({
    overallGPA: 3.6,
    attendancePercentage: 85,
    pendingAssignments: 3,
    upcomingExams: 2,
    outstandingFees: 12500,
    completedCourses: 6,
    totalCourses: 8
  });

  const [recentActivity] = useState([
    {
      id: '1',
      type: 'grade',
      title: 'Mathematics Test Result',
      description: 'Scored 92/100 - Excellent work!',
      time: '2 hours ago',
      icon: <Award className="h-4 w-4 text-green-600" />,
      status: 'positive'
    },
    {
      id: '2',
      type: 'assignment',
      title: 'Physics Lab Report Due',
      description: 'Submit by tomorrow 11:59 PM',
      time: '1 day left',
      icon: <Clock className="h-4 w-4 text-yellow-600" />,
      status: 'warning'
    },
    {
      id: '3',
      type: 'attendance',
      title: 'Chemistry Class Marked Present',
      description: 'Perfect attendance this week!',
      time: '3 hours ago',
      icon: <CheckCircle className="h-4 w-4 text-green-600" />,
      status: 'positive'
    },
    {
      id: '4',
      type: 'announcement',
      title: 'Sports Day Registration',
      description: 'Register for annual sports event',
      time: '1 day ago',
      icon: <Bell className="h-4 w-4 text-blue-600" />,
      status: 'info'
    }
  ]);

  const [upcomingEvents] = useState([
    {
      id: '1',
      title: 'Chemistry Practical Exam',
      date: '2024-09-28',
      time: '10:00 AM',
      type: 'exam',
      location: 'Lab Block - Room 201'
    },
    {
      id: '2',
      title: 'Mathematics Assignment Due',
      date: '2024-09-30',
      time: '11:59 PM',
      type: 'assignment',
      subject: 'Advanced Mathematics'
    },
    {
      id: '3',
      title: 'Parent-Teacher Meeting',
      date: '2024-10-02',
      time: '3:00 PM',
      type: 'meeting',
      location: 'Main Hall'
    },
    {
      id: '4',
      title: 'Physics Project Presentation',
      date: '2024-10-05',
      time: '2:00 PM',
      type: 'presentation',
      subject: 'Applied Physics'
    }
  ]);

  const [todaySchedule] = useState([
    {
      id: '1',
      subject: 'Mathematics',
      teacher: 'Dr. Priya Gupta',
      time: '09:00 - 10:00',
      room: 'Room 101',
      status: 'completed'
    },
    {
      id: '2',
      subject: 'Physics',
      teacher: 'Prof. Rajesh Kumar',
      time: '10:15 - 11:15',
      room: 'Room 205',
      status: 'current'
    },
    {
      id: '3',
      subject: 'Chemistry',
      teacher: 'Dr. Sarah Wilson',
      time: '11:30 - 12:30',
      room: 'Lab 301',
      status: 'upcoming'
    },
    {
      id: '4',
      subject: 'English',
      teacher: 'Ms. Emily Johnson',
      time: '14:00 - 15:00',
      room: 'Room 102',
      status: 'upcoming'
    }
  ]);

  const [quickActions] = useState([
    {
      id: 'submit-assignment',
      label: 'Submit Assignment',
      description: '3 pending submissions',
      icon: <FileText className="h-5 w-5" />,
      color: 'bg-blue-500',
      action: () => handleQuickAction('assignments')
    },
    {
      id: 'view-grades',
      label: 'View Grades',
      description: 'Latest results available',
      icon: <BookOpen className="h-5 w-5" />,
      color: 'bg-green-500',
      action: () => handleQuickAction('academics')
    },
    {
      id: 'check-attendance',
      label: 'Check Attendance',
      description: '85% this month',
      icon: <CalendarDays className="h-5 w-5" />,
      color: 'bg-yellow-500',
      action: () => handleQuickAction('attendance')
    },
    {
      id: 'pay-fees',
      label: 'Pay Fees',
      description: '₹12,500 pending',
      icon: <CreditCard className="h-5 w-5" />,
      color: 'bg-red-500',
      action: () => handleQuickAction('fees')
    }
  ]);

  const handleQuickAction = (action: string) => {
    // This would normally navigate to the appropriate page or open a modal
    console.log(`Navigating to: ${action}`);
    // For demo purposes, we'll show an alert
    alert(`Opening ${action} page...`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'positive':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getClassStatus = (status: string) => {
    switch (status) {
      case 'completed':
        return { color: 'bg-green-100 text-green-800', icon: <CheckCircle className="h-3 w-3" /> };
      case 'current':
        return { color: 'bg-blue-100 text-blue-800', icon: <Clock className="h-3 w-3" /> };
      case 'upcoming':
        return { color: 'bg-gray-100 text-gray-800', icon: <Calendar className="h-3 w-3" /> };
      default:
        return { color: 'bg-gray-100 text-gray-800', icon: <Calendar className="h-3 w-3" /> };
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'exam':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'assignment':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'meeting':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'presentation':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back! 🎓</h2>
        <p className="text-blue-100 mb-4">
          Here's your academic overview for today. Keep up the great work!
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.overallGPA}</div>
            <div className="text-sm text-blue-100">Overall GPA</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.attendancePercentage}%</div>
            <div className="text-sm text-blue-100">Attendance</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.completedCourses}/{stats.totalCourses}</div>
            <div className="text-sm text-blue-100">Courses</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.pendingAssignments}</div>
            <div className="text-sm text-blue-100">Pending Tasks</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Access your most used features instantly</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Button
                key={action.id}
                variant="outline"
                className="h-auto p-4 flex flex-col items-start space-y-2 hover:shadow-md transition-shadow"
                onClick={action.action}
              >
                <div className={`p-2 rounded-lg ${action.color} text-white`}>
                  {action.icon}
                </div>
                <div className="text-left">
                  <div className="font-medium">{action.label}</div>
                  <div className="text-sm text-muted-foreground">{action.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Schedule
            </CardTitle>
            <CardDescription>Your classes for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todaySchedule.map((class_) => {
                const statusStyle = getClassStatus(class_.status);
                return (
                  <div
                    key={class_.id}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      class_.status === 'current' ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${statusStyle.color}`}>
                        {statusStyle.icon}
                      </div>
                      <div>
                        <h4 className="font-medium">{class_.subject}</h4>
                        <p className="text-sm text-muted-foreground">{class_.teacher}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{class_.time}</p>
                      <p className="text-xs text-muted-foreground">{class_.room}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest updates and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className={`p-3 rounded-lg border ${getStatusColor(activity.status)}`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {activity.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              {[
                { subject: 'Mathematics', score: 92, trend: 'up' },
                { subject: 'Physics', score: 88, trend: 'up' },
                { subject: 'Chemistry', score: 85, trend: 'stable' },
                { subject: 'English', score: 90, trend: 'up' }
              ].map((subject) => (
                <div key={subject.subject} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{subject.subject}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{subject.score}%</span>
                      {subject.trend === 'up' ? (
                        <TrendingUp className="h-3 w-3 text-green-600" />
                      ) : subject.trend === 'down' ? (
                        <TrendingDown className="h-3 w-3 text-red-600" />
                      ) : (
                        <div className="h-3 w-3 bg-gray-400 rounded-full" />
                      )}
                    </div>
                  </div>
                  <Progress value={subject.score} className="h-2" />
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" onClick={() => handleQuickAction('academics')}>
              View Detailed Report
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Important dates and deadlines</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingEvents.slice(0, 4).map((event) => (
                <div key={event.id} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50">
                  <div className="flex-shrink-0">
                    <Badge className={getEventTypeColor(event.type)}>
                      {event.type}
                    </Badge>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{event.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(event.date).toLocaleDateString()} at {event.time}
                    </p>
                    {(event.location || event.subject) && (
                      <p className="text-xs text-muted-foreground">
                        {event.location || event.subject}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" onClick={() => handleQuickAction('calendar')}>
              View All Events
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Alerts and Notifications */}
      {(stats.pendingAssignments > 0 || stats.outstandingFees > 0) && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              <AlertTriangle className="h-5 w-5" />
              Action Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {stats.pendingAssignments > 0 && (
                <div className="flex items-center justify-between p-2 bg-white rounded-lg">
                  <span className="text-sm">You have {stats.pendingAssignments} pending assignments</span>
                  <Button size="sm" onClick={() => handleQuickAction('assignments')}>
                    View Assignments
                  </Button>
                </div>
              )}
              {stats.outstandingFees > 0 && (
                <div className="flex items-center justify-between p-2 bg-white rounded-lg">
                  <span className="text-sm">Outstanding fees: ₹{stats.outstandingFees.toLocaleString()}</span>
                  <Button size="sm" onClick={() => handleQuickAction('fees')}>
                    Pay Now
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StudentOverview;