"use client";

import React from 'react';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Award, 
  TrendingUp, 
  Bell, 
  Download, 
  Play, 
  FileText, 
  Target, 
  Star, 
  GraduationCap, 
  Calculator, 
  Bus, 
  Building, 
  Heart, 
  MessageCircle, 
  Video, 
  PieChart, 
  BarChart3, 
  Activity, 
  CreditCard, 
  MapPin, 
  Phone, 
  Mail, 
  AlertCircle, 
  ChevronRight, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Eye, 
  BookMarked, 
  Presentation, 
  File, 
  Paperclip, 
  CalendarClock, 
  Clock4, 
  Settings, 
  Upload, 
  MessageSquare, 
  Library, 
  Home, 
  Menu, 
  X, 
  LogOut,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { DataTable } from '@/components/ui/DataTable';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import ProtectedRoute from '@/components/ProtectedRoute';

// Mock data for parent dashboard
const parentData = {
  profile: {
    name: "Rajesh Sharma",
    relation: "Father of",
    children: [
      {
        id: "ST001",
        name: "Aarav Sharma",
        class: "Class 12-A",
        section: "Science",
        rollNumber: "2024/CS/101",
        avatar: "👨‍🎓",
        attendance: 92.5,
        currentGPA: 8.7,
        rank: 5
      }
    ],
    email: "rajesh.sharma@gmail.com",
    phone: "+91 98765 43210",
    address: "123 Green Valley, Mumbai, Maharashtra"
  },
  children: [
    {
      id: "ST001",
      name: "Aarav Sharma",
      class: "Class 12-A",
      section: "Science",
      rollNumber: "2024/CS/101",
      avatar: "👨‍🎓",
      attendance: 92.5,
      currentGPA: 8.7,
      rank: 5,
      upcomingExams: 3,
      pendingAssignments: 4,
      completedAssignments: 28,
      fees: {
        total: 30000,
        paid: 25000,
        pending: 5000,
        dueDate: "2024-03-15"
      }
    }
  ]
};

const recentNotifications = [
  {
    id: 1,
    type: "assignment",
    title: "Mathematics Assignment Graded",
    message: "Aarav's Calculus Problem Set has been graded - Score: 95/100",
    time: "2 hours ago",
    read: false
  },
  {
    id: 2,
    type: "attendance",
    title: "Attendance Alert",
    message: "Aarav was absent today in Physics class",
    time: "1 day ago",
    read: true
  },
  {
    id: 3,
    type: "announcement",
    title: "Parent-Teacher Meeting",
    message: "Scheduled for March 25, 2024 at 2:00 PM",
    time: "2 days ago",
    read: true
  },
  {
    id: 4,
    type: "fee",
    title: "Fee Payment Due",
    message: "Library fee of ₹1000 is due by March 15, 2024",
    time: "3 days ago",
    read: false
  }
];

const ParentDashboard = () => {
  const [selectedTab, setSelectedTab] = React.useState('overview');
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const [selectedChild, setSelectedChild] = React.useState(parentData.children[0]);

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: PieChart },
    { id: 'academics', label: 'Academics', icon: BookOpen },
    { id: 'attendance', label: 'Attendance', icon: CheckCircle },
    { id: 'assignments', label: 'Assignments', icon: FileText },
    { id: 'exams', label: 'Exams', icon: Target },
    { id: 'fees', label: 'Fees', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
        {/* Header */}
        <div className="glass border-b border-white/20 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-2xl">
                    👨‍👩‍👧‍👦
                  </div>
                  <div>
                    <h1 className="text-lg font-bold text-slate-900 dark:text-white">
                      Welcome, {parentData.profile.name.split(' ')[0]}! 👋
                    </h1>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {parentData.profile.relation} {parentData.children[0].name}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right hidden md:block">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {currentTime.toLocaleDateString('en-IN', { 
                      weekday: 'long', 
                      day: 'numeric', 
                      month: 'long' 
                    })}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {currentTime.toLocaleTimeString('en-IN', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4" />
                </Button>
                <Button variant="gradient" size="sm">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Messages
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-8 p-1 bg-white/50 dark:bg-slate-800/50 rounded-lg glass overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap",
                  selectedTab === tab.id
                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50"
                )}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {selectedTab === 'overview' && (
            <div className="space-y-8">
              {/* Child Selector */}
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Select Child:</span>
                <Select 
                  value={selectedChild.id} 
                  onChange={(e) => setSelectedChild(parentData.children.find(child => child.id === e.target.value) || parentData.children[0])}
                >
                  {parentData.children.map((child) => (
                    <option key={child.id} value={child.id}>
                      {child.name} - {child.class}
                    </option>
                  ))}
                </Select>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card variant="elevated" className="hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                          Current GPA
                        </p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">
                          {selectedChild.currentGPA}
                        </p>
                        <p className="text-xs text-green-600 font-medium">
                          Rank #{selectedChild.rank}
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500">
                        <Award className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card variant="elevated" className="hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                          Attendance
                        </p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">
                          {selectedChild.attendance}%
                        </p>
                        <p className="text-xs text-blue-600 font-medium">
                          Excellent
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500">
                        <CheckCircle className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card variant="elevated" className="hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                          Assignments
                        </p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">
                          {selectedChild.completedAssignments}/{selectedChild.completedAssignments + selectedChild.pendingAssignments}
                        </p>
                        <p className="text-xs text-orange-600 font-medium">
                          {selectedChild.pendingAssignments} Pending
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-500">
                        <FileText className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card variant="elevated" className="hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                          Upcoming Exams
                        </p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">
                          {selectedChild.upcomingExams}
                        </p>
                        <p className="text-xs text-purple-600 font-medium">
                          This Month
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                        <Target className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Notifications & Child Info */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Child Info */}
                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      Child Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-2xl">
                        {selectedChild.avatar}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{selectedChild.name}</h3>
                        <p className="text-slate-600 dark:text-slate-400">{selectedChild.class} - {selectedChild.section}</p>
                        <p className="text-sm text-slate-500">Roll No: {selectedChild.rollNumber}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <p className="text-sm text-slate-600 dark:text-slate-400">GPA</p>
                        <p className="text-lg font-bold text-slate-900 dark:text-white">{selectedChild.currentGPA}</p>
                      </div>
                      <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <p className="text-sm text-slate-600 dark:text-slate-400">Attendance</p>
                        <p className="text-lg font-bold text-slate-900 dark:text-white">{selectedChild.attendance}%</p>
                      </div>
                      <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <p className="text-sm text-slate-600 dark:text-slate-400">Assignments</p>
                        <p className="text-lg font-bold text-slate-900 dark:text-white">
                          {selectedChild.completedAssignments}/{selectedChild.completedAssignments + selectedChild.pendingAssignments}
                        </p>
                      </div>
                      <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <p className="text-sm text-slate-600 dark:text-slate-400">Rank</p>
                        <p className="text-lg font-bold text-slate-900 dark:text-white">#{selectedChild.rank}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Notifications */}
                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center">
                        <Bell className="h-5 w-5 mr-2" />
                        Recent Notifications
                      </span>
                      <Button variant="ghost" size="sm">
                        View All
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentNotifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          className={cn(
                            "p-4 rounded-lg border",
                            notification.read 
                              ? "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50" 
                              : "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20"
                          )}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-slate-900 dark:text-white">
                                {notification.title}
                              </h4>
                              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-slate-500 mt-2">
                                {notification.time}
                              </p>
                            </div>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full ml-2"></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Academics Tab */}
          {selectedTab === 'academics' && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Select Child:</span>
                <Select 
                  value={selectedChild.id} 
                  onChange={(e) => setSelectedChild(parentData.children.find(child => child.id === e.target.value) || parentData.children[0])}
                >
                  {parentData.children.map((child) => (
                    <option key={child.id} value={child.id}>
                      {child.name} - {child.class}
                    </option>
                  ))}
                </Select>
              </div>

              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Academic Performance - {selectedChild.name}
                  </CardTitle>
                  <CardDescription>
                    Track your child's academic progress and performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg">
                      <p className="text-sm text-slate-600 dark:text-slate-400">Current GPA</p>
                      <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{selectedChild.currentGPA}</p>
                      <p className="text-sm text-green-600 mt-1">+0.2 from last term</p>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg">
                      <p className="text-sm text-slate-600 dark:text-slate-400">Rank</p>
                      <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">#{selectedChild.rank}</p>
                      <p className="text-sm text-blue-600 mt-1">Out of 120 students</p>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg">
                      <p className="text-sm text-slate-600 dark:text-slate-400">Subjects</p>
                      <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">6</p>
                      <p className="text-sm text-purple-600 mt-1">Science Stream</p>
                    </div>
                  </div>

                  {/* Subject-wise Performance */}
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Subject-wise Performance</h3>
                    <div className="space-y-4">
                      {[
                        { subject: 'Mathematics', score: 95, teacher: 'Dr. Priya Gupta' },
                        { subject: 'Physics', score: 88, teacher: 'Mr. Raj Kumar' },
                        { subject: 'Chemistry', score: 92, teacher: 'Ms. Anita Singh' },
                        { subject: 'English', score: 85, teacher: 'Mrs. Sarah Wilson' },
                        { subject: 'Computer Science', score: 98, teacher: 'Mr. Tech Expert' }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                          <div>
                            <h4 className="font-medium text-slate-900 dark:text-white">{item.subject}</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Teacher: {item.teacher}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-slate-900 dark:text-white">{item.score}%</p>
                            <Badge variant={item.score >= 90 ? 'success' : item.score >= 80 ? 'info' : 'warning'}>
                              {item.score >= 90 ? 'Excellent' : item.score >= 80 ? 'Good' : 'Average'}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Attendance Tab */}
          {selectedTab === 'attendance' && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Select Child:</span>
                <Select 
                  value={selectedChild.id} 
                  onChange={(e) => setSelectedChild(parentData.children.find(child => child.id === e.target.value) || parentData.children[0])}
                >
                  {parentData.children.map((child) => (
                    <option key={child.id} value={child.id}>
                      {child.name} - {child.class}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Overall Attendance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <div className="relative w-48 h-48 mx-auto">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-3xl font-bold text-slate-900 dark:text-white">{selectedChild.attendance}%</span>
                        </div>
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          <circle
                            className="text-slate-200 dark:text-slate-700 stroke-current"
                            strokeWidth="10"
                            cx="50"
                            cy="50"
                            r="40"
                            fill="transparent"
                          ></circle>
                          <circle
                            className="text-green-500 stroke-current"
                            strokeWidth="10"
                            strokeLinecap="round"
                            cx="50"
                            cy="50"
                            r="40"
                            fill="transparent"
                            strokeDasharray="251.2"
                            strokeDashoffset={251.2 - (251.2 * selectedChild.attendance) / 100}
                            transform="rotate(-90 50 50)"
                          ></circle>
                        </svg>
                      </div>
                      <p className="text-lg font-medium text-slate-900 dark:text-white mt-4">Excellent Attendance</p>
                      <p className="text-slate-600 dark:text-slate-400">92.5% is above school average</p>
                    </div>
                  </CardContent>
                </Card>

                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2" />
                      Monthly Attendance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { month: 'January', attendance: 95, status: 'Excellent' },
                        { month: 'December', attendance: 90, status: 'Good' },
                        { month: 'November', attendance: 92, status: 'Excellent' },
                        { month: 'October', attendance: 88, status: 'Good' }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-slate-600 dark:text-slate-400">{item.month}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-24 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                              <div 
                                className="bg-green-500 h-2 rounded-full" 
                                style={{ width: `${item.attendance}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-slate-900 dark:text-white w-12">{item.attendance}%</span>
                            <Badge variant={item.status === 'Excellent' ? 'success' : 'info'}>{item.status}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Subject-wise Attendance */}
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>Subject-wise Attendance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-700">
                          <th className="text-left py-3 text-slate-600 dark:text-slate-400">Subject</th>
                          <th className="text-left py-3 text-slate-600 dark:text-slate-400">Classes</th>
                          <th className="text-left py-3 text-slate-600 dark:text-slate-400">Present</th>
                          <th className="text-left py-3 text-slate-600 dark:text-slate-400">Absent</th>
                          <th className="text-left py-3 text-slate-600 dark:text-slate-400">Percentage</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { subject: 'Mathematics', total: 30, present: 28, absent: 2, percentage: 93.3 },
                          { subject: 'Physics', total: 30, present: 27, absent: 3, percentage: 90.0 },
                          { subject: 'Chemistry', total: 30, present: 29, absent: 1, percentage: 96.7 },
                          { subject: 'English', total: 30, present: 26, absent: 4, percentage: 86.7 },
                          { subject: 'Computer Science', total: 30, present: 30, absent: 0, percentage: 100.0 }
                        ].map((item, index) => (
                          <tr key={index} className="border-b border-slate-100 dark:border-slate-800">
                            <td className="py-3 text-slate-900 dark:text-white">{item.subject}</td>
                            <td className="py-3 text-slate-600 dark:text-slate-400">{item.total}</td>
                            <td className="py-3 text-green-600">{item.present}</td>
                            <td className="py-3 text-red-600">{item.absent}</td>
                            <td className="py-3">
                              <span className="font-medium text-slate-900 dark:text-white">{item.percentage}%</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Assignments Tab */}
          {selectedTab === 'assignments' && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Select Child:</span>
                <Select 
                  value={selectedChild.id} 
                  onChange={(e) => setSelectedChild(parentData.children.find(child => child.id === e.target.value) || parentData.children[0])}
                >
                  {parentData.children.map((child) => (
                    <option key={child.id} value={child.id}>
                      {child.name} - {child.class}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-900">
                        <Clock className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-slate-600 dark:text-slate-400">Pending</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">{selectedChild.pendingAssignments}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900">
                        <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-slate-600 dark:text-slate-400">Completed</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">{selectedChild.completedAssignments}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900">
                        <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-slate-600 dark:text-slate-400">Total</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">
                          {selectedChild.completedAssignments + selectedChild.pendingAssignments}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      Recent Assignments
                    </span>
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        id: 1,
                        subject: "Mathematics",
                        title: "Calculus Problem Set",
                        dueDate: "2024-01-20",
                        status: "graded",
                        marks: 95,
                        maxMarks: 100
                      },
                      {
                        id: 2,
                        subject: "Physics", 
                        title: "Wave Motion Experiment",
                        dueDate: "2024-01-18",
                        status: "graded",
                        marks: 88,
                        maxMarks: 100
                      },
                      {
                        id: 3,
                        subject: "Chemistry",
                        title: "Organic Compounds Analysis", 
                        dueDate: "2024-01-22",
                        status: "pending",
                        marks: null,
                        maxMarks: 100
                      },
                      {
                        id: 4,
                        subject: "English",
                        title: "Poetry Analysis Essay",
                        dueDate: "2024-01-25",
                        status: "submitted",
                        marks: null,
                        maxMarks: 50
                      }
                    ].map((assignment) => (
                      <div key={assignment.id} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                        <div>
                          <h4 className="font-medium text-slate-900 dark:text-white">{assignment.title}</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {assignment.subject} • Due: {new Date(assignment.dueDate).toLocaleDateString('en-IN')}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge variant={
                            assignment.status === 'pending' ? 'warning' :
                            assignment.status === 'submitted' ? 'info' :
                            assignment.status === 'graded' ? 'success' : 'default'
                          }>
                            {assignment.status}
                          </Badge>
                          {assignment.marks !== null && (
                            <p className="text-sm font-medium text-slate-900 dark:text-white mt-1">
                              {assignment.marks}/{assignment.maxMarks}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Exams Tab */}
          {selectedTab === 'exams' && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Select Child:</span>
                <Select 
                  value={selectedChild.id} 
                  onChange={(e) => setSelectedChild(parentData.children.find(child => child.id === e.target.value) || parentData.children[0])}
                >
                  {parentData.children.map((child) => (
                    <option key={child.id} value={child.id}>
                      {child.name} - {child.class}
                    </option>
                  ))}
                </Select>
              </div>

              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    Upcoming Exams
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        subject: "Mathematics",
                        date: "2024-02-15",
                        time: "10:00 AM",
                        duration: "3 hours",
                        type: "Unit Test",
                        syllabus: "Chapters 1-3",
                        maxMarks: 100
                      },
                      {
                        subject: "Physics",
                        date: "2024-02-18", 
                        time: "10:00 AM",
                        duration: "3 hours",
                        type: "Practical Exam",
                        syllabus: "All experiments",
                        maxMarks: 100
                      },
                      {
                        subject: "Chemistry",
                        date: "2024-02-20",
                        time: "02:00 PM",
                        duration: "2 hours",
                        type: "Theory Exam",
                        syllabus: "Organic Chemistry",
                        maxMarks: 70
                      }
                    ].map((exam, index) => (
                      <div key={index} className="p-4 rounded-lg border border-orange-200 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-800">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-slate-900 dark:text-white">
                            {exam.subject}
                          </h4>
                          <Badge variant="warning" className="text-xs">
                            {exam.type}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                          <p>📅 {new Date(exam.date).toLocaleDateString('en-IN')} at {exam.time}</p>
                          <p>⏱️ Duration: {exam.duration}</p>
                          <p>📚 Syllabus: {exam.syllabus}</p>
                          <p>💯 Max Marks: {exam.maxMarks}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Exam Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end justify-between space-x-2">
                    {[
                      { subject: 'Mathematics', score: 88, color: 'bg-blue-500' },
                      { subject: 'Physics', score: 85, color: 'bg-green-500' },
                      { subject: 'Chemistry', score: 92, color: 'bg-purple-500' },
                      { subject: 'English', score: 78, color: 'bg-orange-500' },
                      { subject: 'Computer Science', score: 95, color: 'bg-pink-500' }
                    ].map((item, index) => (
                      <div key={index} className="flex flex-col items-center flex-1">
                        <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                          {item.score}%
                        </div>
                        <div 
                          className={`${item.color} w-full rounded-t-md transition-all hover:opacity-75`}
                          style={{ height: `${item.score * 2}px` }}
                        />
                        <div className="text-xs text-slate-600 dark:text-slate-400 mt-1 text-center">
                          {item.subject}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Fees Tab */}
          {selectedTab === 'fees' && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Select Child:</span>
                <Select 
                  value={selectedChild.id} 
                  onChange={(e) => setSelectedChild(parentData.children.find(child => child.id === e.target.value) || parentData.children[0])}
                >
                  {parentData.children.map((child) => (
                    <option key={child.id} value={child.id}>
                      {child.name} - {child.class}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card variant="elevated">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Fees</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">₹{selectedChild.fees.total.toLocaleString()}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500">
                        <CreditCard className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card variant="elevated">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Paid</p>
                        <p className="text-2xl font-bold text-green-600">₹{selectedChild.fees.paid.toLocaleString()}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500">
                        <CheckCircle className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card variant="elevated">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Pending</p>
                        <p className="text-2xl font-bold text-orange-600">₹{selectedChild.fees.pending.toLocaleString()}</p>
                        <p className="text-xs text-slate-500">Due: {new Date(selectedChild.fees.dueDate).toLocaleDateString('en-IN')}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-500">
                        <Clock className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      Fee Structure
                    </span>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download Receipt
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-700">
                          <th className="text-left py-3 text-slate-600 dark:text-slate-400">Fee Type</th>
                          <th className="text-left py-3 text-slate-600 dark:text-slate-400">Amount</th>
                          <th className="text-left py-3 text-slate-600 dark:text-slate-400">Due Date</th>
                          <th className="text-left py-3 text-slate-600 dark:text-slate-400">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { type: "Tuition Fee", amount: 25000, dueDate: "2024-03-15", status: "paid" },
                          { type: "Transport Fee", amount: 5000, dueDate: "2024-03-15", status: "paid" },
                          { type: "Library Fee", amount: 1000, dueDate: "2024-03-15", status: "pending" },
                          { type: "Examination Fee", amount: 2000, dueDate: "2024-04-15", status: "pending" },
                          { type: "Hostel Fee", amount: 8000, dueDate: "2024-03-15", status: "paid" }
                        ].map((fee, index) => (
                          <tr key={index} className="border-b border-slate-100 dark:border-slate-800">
                            <td className="py-3 text-slate-900 dark:text-white">{fee.type}</td>
                            <td className="py-3 text-slate-600 dark:text-slate-400">₹{fee.amount.toLocaleString()}</td>
                            <td className="py-3 text-slate-600 dark:text-slate-400">{new Date(fee.dueDate).toLocaleDateString('en-IN')}</td>
                            <td className="py-3">
                              <Badge variant={
                                fee.status === 'paid' ? 'success' : 
                                fee.status === 'pending' ? 'warning' : 'default'
                              }>
                                {fee.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Notifications Tab */}
          {selectedTab === 'notifications' && (
            <div className="space-y-6">
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Bell className="h-5 w-5 mr-2" />
                      All Notifications
                    </span>
                    <Button variant="outline">
                      Mark All as Read
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentNotifications.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={cn(
                          "p-4 rounded-lg border",
                          notification.read 
                            ? "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50" 
                            : "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20"
                        )}
                      >
                        <div className="flex items-start">
                          <div className={cn(
                            "p-2 rounded-lg mr-3",
                            notification.type === 'assignment' && "bg-blue-100 dark:bg-blue-900",
                            notification.type === 'attendance' && "bg-orange-100 dark:bg-orange-900",
                            notification.type === 'announcement' && "bg-purple-100 dark:bg-purple-900",
                            notification.type === 'fee' && "bg-green-100 dark:bg-green-900"
                          )}>
                            {notification.type === 'assignment' && <FileText className="h-5 w-5 text-blue-600" />}
                            {notification.type === 'attendance' && <CheckCircle className="h-5 w-5 text-orange-600" />}
                            {notification.type === 'announcement' && <Calendar className="h-5 w-5 text-purple-600" />}
                            {notification.type === 'fee' && <CreditCard className="h-5 w-5 text-green-600" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-slate-900 dark:text-white">
                                {notification.title}
                              </h4>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              )}
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-slate-500 mt-2">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Profile Tab */}
          {selectedTab === 'profile' && (
            <div className="space-y-6">
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Parent Profile
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-6 mb-8">
                    <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-3xl">
                      👨‍👩‍👧‍👦
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{parentData.profile.name}</h3>
                      <p className="text-slate-600 dark:text-slate-400">Parent of {parentData.children[0].name}</p>
                      <div className="flex space-x-2 mt-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit Profile
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-1" />
                          Settings
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Personal Information</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                          <Input defaultValue={parentData.profile.name} className="mt-1" />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                          <Input defaultValue={parentData.profile.email} className="mt-1" type="email" />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Phone</label>
                          <Input defaultValue={parentData.profile.phone} className="mt-1" type="tel" />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Address</label>
                          <Input defaultValue={parentData.profile.address} className="mt-1" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Children</h4>
                      <div className="space-y-4">
                        {parentData.children.map((child) => (
                          <div key={child.id} className="flex items-center space-x-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-lg">
                              {child.avatar}
                            </div>
                            <div className="flex-1">
                              <h5 className="font-medium text-slate-900 dark:text-white">{child.name}</h5>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                {child.class} - {child.section}
                              </p>
                              <p className="text-xs text-slate-500">Roll No: {child.rollNumber}</p>
                            </div>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
  );
};

export default ParentDashboard;