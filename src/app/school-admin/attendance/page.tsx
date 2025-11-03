"use client";

import React, { useState } from 'react';
import { 
  Users, Calendar, Clock, CheckCircle, XCircle, AlertCircle,
  TrendingUp, BarChart3, PieChart, UserCheck, UserX, 
  Search, Filter, Download, Plus, Edit, Eye, Settings,
  Activity, Target, Award, Bell, Phone, Mail, MapPin,
  BookOpen, GraduationCap, Home, Bus, Utensils
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { cn } from '@/lib/utils';

interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  class: string;
  date: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';
  checkInTime?: string;
  checkOutTime?: string;
  subject?: string;
  teacher: string;
  notes?: string;
}

interface StudentAttendance {
  id: string;
  studentId: string;
  name: string;
  class: string;
  rollNumber: string;
  totalDays: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  attendancePercentage: number;
  lastAttendance: string;
  parentContact: string;
  status: 'GOOD' | 'AVERAGE' | 'POOR' | 'CRITICAL';
}

interface ClassAttendance {
  id: string;
  className: string;
  date: string;
  totalStudents: number;
  presentStudents: number;
  absentStudents: number;
  lateStudents: number;
  attendancePercentage: number;
  teacher: string;
  subject: string;
  period: string;
}

const AttendanceManagementPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('all');
  const [filterDate, setFilterDate] = useState('today');

  const studentAttendance: StudentAttendance[] = [
    {
      id: '1',
      studentId: 'ST001',
      name: 'Aarav Sharma',
      class: '12-A',
      rollNumber: '001',
      totalDays: 180,
      presentDays: 165,
      absentDays: 12,
      lateDays: 3,
      attendancePercentage: 91.7,
      lastAttendance: '2024-08-15',
      parentContact: '+91 9876543210',
      status: 'GOOD'
    },
    {
      id: '2',
      studentId: 'ST002',
      name: 'Priya Patel',
      class: '11-B',
      rollNumber: '025',
      totalDays: 180,
      presentDays: 172,
      absentDays: 6,
      lateDays: 2,
      attendancePercentage: 95.6,
      lastAttendance: '2024-08-15',
      parentContact: '+91 9876543211',
      status: 'GOOD'
    },
    {
      id: '3',
      studentId: 'ST003',
      name: 'Arjun Singh',
      class: '10-A',
      rollNumber: '012',
      totalDays: 180,
      presentDays: 142,
      absentDays: 35,
      lateDays: 3,
      attendancePercentage: 78.9,
      lastAttendance: '2024-08-14',
      parentContact: '+91 9876543212',
      status: 'AVERAGE'
    },
    {
      id: '4',
      studentId: 'ST004',
      name: 'Kavya Reddy',
      class: '9-C',
      rollNumber: '078',
      totalDays: 180,
      presentDays: 125,
      absentDays: 52,
      lateDays: 3,
      attendancePercentage: 69.4,
      lastAttendance: '2024-08-13',
      parentContact: '+91 9876543213',
      status: 'POOR'
    }
  ];

  const classAttendance: ClassAttendance[] = [
    {
      id: '1',
      className: '12-A',
      date: '2024-08-15',
      totalStudents: 45,
      presentStudents: 42,
      absentStudents: 2,
      lateStudents: 1,
      attendancePercentage: 93.3,
      teacher: 'Dr. Meera Gupta',
      subject: 'Mathematics',
      period: '1st Period'
    },
    {
      id: '2',
      className: '11-B',
      date: '2024-08-15',
      totalStudents: 38,
      presentStudents: 35,
      absentStudents: 3,
      lateStudents: 0,
      attendancePercentage: 92.1,
      teacher: 'Prof. Raj Kumar',
      subject: 'Physics',
      period: '2nd Period'
    },
    {
      id: '3',
      className: '10-A',
      date: '2024-08-15',
      totalStudents: 42,
      presentStudents: 38,
      absentStudents: 3,
      lateStudents: 1,
      attendancePercentage: 90.5,
      teacher: 'Mrs. Priya Sharma',
      subject: 'English',
      period: '3rd Period'
    }
  ];

  const attendanceRecords: AttendanceRecord[] = [
    {
      id: '1',
      studentId: 'ST001',
      studentName: 'Aarav Sharma',
      class: '12-A',
      date: '2024-08-15',
      status: 'PRESENT',
      checkInTime: '08:45',
      checkOutTime: '15:30',
      subject: 'Mathematics',
      teacher: 'Dr. Meera Gupta'
    },
    {
      id: '2',
      studentId: 'ST002',
      studentName: 'Priya Patel',
      class: '11-B',
      date: '2024-08-15',
      status: 'LATE',
      checkInTime: '09:15',
      checkOutTime: '15:30',
      subject: 'Physics',
      teacher: 'Prof. Raj Kumar',
      notes: 'Traffic delay'
    },
    {
      id: '3',
      studentId: 'ST003',
      studentName: 'Arjun Singh',
      class: '10-A',
      date: '2024-08-15',
      status: 'ABSENT',
      subject: 'English',
      teacher: 'Mrs. Priya Sharma',
      notes: 'Sick leave'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PRESENT': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'ABSENT': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'LATE': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'EXCUSED': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'GOOD': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'AVERAGE': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'POOR': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'CRITICAL': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getAttendanceIcon = (status: string) => {
    switch (status) {
      case 'PRESENT': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'ABSENT': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'LATE': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'EXCUSED': return <AlertCircle className="h-4 w-4 text-blue-500" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'daily', label: 'Daily Attendance', icon: Calendar },
    { id: 'students', label: 'Student Records', icon: Users },
    { id: 'classes', label: 'Class Summary', icon: BookOpen },
    { id: 'reports', label: 'Reports', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Today's Attendance</p>
                <p className="text-3xl font-bold">92.4%</p>
                <p className="text-green-100 text-sm">1,152 of 1,247 present</p>
              </div>
              <UserCheck className="h-12 w-12 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Weekly Average</p>
                <p className="text-3xl font-bold">89.7%</p>
                <p className="text-blue-100 text-sm">↑ 2.1% from last week</p>
              </div>
              <TrendingUp className="h-12 w-12 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Absent Today</p>
                <p className="text-3xl font-bold">95</p>
                <p className="text-orange-100 text-sm">65 notified parents</p>
              </div>
              <UserX className="h-12 w-12 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Late Arrivals</p>
                <p className="text-3xl font-bold">23</p>
                <p className="text-purple-100 text-sm">↓ 5 from yesterday</p>
              </div>
              <Clock className="h-12 w-12 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <UserCheck className="h-6 w-6" />
              <span>Mark Attendance</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Bell className="h-6 w-6" />
              <span>Send Alerts</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Download className="h-6 w-6" />
              <span>Generate Report</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Settings className="h-6 w-6" />
              <span>Settings</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Analytics & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Attendance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { month: 'January', percentage: 91.2, trend: 'up' },
                { month: 'February', percentage: 89.8, trend: 'down' },
                { month: 'March', percentage: 92.5, trend: 'up' },
                { month: 'April', percentage: 88.9, trend: 'down' },
                { month: 'May', percentage: 90.3, trend: 'up' },
                { month: 'June', percentage: 93.1, trend: 'up' },
                { month: 'July', percentage: 91.7, trend: 'down' },
                { month: 'August', percentage: 92.4, trend: 'up' }
              ].map((data, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-slate-400" />
                    <span className="font-medium text-slate-900 dark:text-white">{data.month}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-slate-900 dark:text-white">{data.percentage}%</span>
                    {data.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attendance Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  type: 'LOW_ATTENDANCE',
                  message: '15 students below 75% attendance threshold',
                  priority: 'HIGH',
                  time: '2 hours ago',
                  icon: AlertCircle,
                  color: 'text-red-500'
                },
                {
                  type: 'PARENT_NOTIFICATION',
                  message: 'Automated SMS sent to 65 parents for absent students',
                  priority: 'MEDIUM',
                  time: '3 hours ago',
                  icon: Phone,
                  color: 'text-blue-500'
                },
                {
                  type: 'PERFECT_ATTENDANCE',
                  message: '8 students achieved perfect attendance this month',
                  priority: 'LOW',
                  time: '1 day ago',
                  icon: Award,
                  color: 'text-green-500'
                },
                {
                  type: 'CLASS_ALERT',
                  message: 'Class 9-C has attendance below 80% for 3 consecutive days',
                  priority: 'HIGH',
                  time: '2 days ago',
                  icon: Users,
                  color: 'text-orange-500'
                }
              ].map((alert, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <alert.icon className={cn("h-5 w-5 mt-0.5", alert.color)} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-slate-900 dark:text-white">{alert.type.replace('_', ' ')}</p>
                      <Badge className={cn(
                        "text-xs",
                        alert.priority === 'HIGH' && "bg-red-100 text-red-800",
                        alert.priority === 'MEDIUM' && "bg-yellow-100 text-yellow-800",
                        alert.priority === 'LOW' && "bg-green-100 text-green-800"
                      )}>
                        {alert.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{alert.message}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const StudentsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Student Attendance Records</h2>
          <p className="text-slate-600 dark:text-slate-400">Individual student attendance tracking and analytics</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Export Records</span>
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Select value={filterClass} onValueChange={setFilterClass}>
          <option value="all">All Classes</option>
          <option value="12-a">12-A</option>
          <option value="11-b">11-B</option>
          <option value="10-a">10-A</option>
          <option value="9-c">9-C</option>
        </Select>
        <Select value={filterDate} onValueChange={setFilterDate}>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </Select>
      </div>

      {/* Student Attendance Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studentAttendance.map((student) => (
          <Card key={student.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">{student.name}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{student.class} • Roll #{student.rollNumber}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(student.status)}>
                  {student.status}
                </Badge>
              </div>

              {/* Attendance Percentage */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Attendance Rate</span>
                  <span className="font-medium">{student.attendancePercentage}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                  <div 
                    className={cn(
                      "h-3 rounded-full transition-all",
                      student.attendancePercentage >= 90 ? "bg-green-500" :
                      student.attendancePercentage >= 80 ? "bg-yellow-500" :
                      student.attendancePercentage >= 70 ? "bg-orange-500" : "bg-red-500"
                    )}
                    style={{ width: `${student.attendancePercentage}%` }}
                  />
                </div>
              </div>

              {/* Attendance Stats */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded">
                  <p className="text-lg font-bold text-green-600">{student.presentDays}</p>
                  <p className="text-xs text-green-600">Present</p>
                </div>
                <div className="text-center p-2 bg-red-50 dark:bg-red-900/20 rounded">
                  <p className="text-lg font-bold text-red-600">{student.absentDays}</p>
                  <p className="text-xs text-red-600">Absent</p>
                </div>
                <div className="text-center p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                  <p className="text-lg font-bold text-yellow-600">{student.lateDays}</p>
                  <p className="text-xs text-yellow-600">Late</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  <span>Last: {student.lastAttendance}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-slate-400" />
                  <span>{student.parentContact}</span>
                </div>
              </div>

              <div className="flex space-x-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Attendance Management
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Real-time attendance tracking, analytics, and automated parent notifications
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export Report</span>
              </Button>
              <Button className="flex items-center space-x-2">
                <UserCheck className="h-4 w-4" />
                <span>Mark Attendance</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-white dark:bg-slate-800 p-1 rounded-lg shadow-sm overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-3 rounded-md text-sm font-medium transition-all whitespace-nowrap",
                    activeTab === tab.id
                      ? "bg-blue-500 text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'students' && <StudentsTab />}
          {['daily', 'classes', 'reports', 'settings'].map(tab => (
            activeTab === tab && (
              <div key={tab} className="text-center py-20">
                <Settings className="h-16 w-16 mx-auto text-slate-400 mb-4" />
                <h3 className="text-xl font-medium text-slate-900 dark:text-white mb-2">
                  {tab.charAt(0).toUpperCase() + tab.slice(1)} Management
                </h3>
                <p className="text-slate-600 dark:text-slate-400">Coming soon...</p>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default AttendanceManagementPage;