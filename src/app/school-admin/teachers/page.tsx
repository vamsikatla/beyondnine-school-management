"use client";

import React, { useState } from 'react';
import { 
  Users, GraduationCap, Calendar, Clock, Phone, Mail, 
  MapPin, Award, TrendingUp, Activity, Plus, Edit, Eye,
  Search, Filter, Download, Upload, Star, CheckCircle,
  AlertCircle, XCircle, Settings, FileText, Briefcase,
  DollarSign, Target, BookOpen, UserCheck
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { cn } from '@/lib/utils';

interface Teacher {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  department: string;
  subject: string;
  qualification: string;
  experience: number; // in years
  joinDate: string;
  status: 'ACTIVE' | 'ON_LEAVE' | 'SUSPENDED' | 'RESIGNED';
  employmentType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT';
  salary: number;
  performance: {
    rating: number;
    reviews: number;
    studentFeedback: number;
  };
  classes: string[];
  subjects: string[];
  schedule: {
    monday: string[];
    tuesday: string[];
    wednesday: string[];
    thursday: string[];
    friday: string[];
    saturday: string[];
  };
  achievements: string[];
  documents: {
    resume: boolean;
    certificates: boolean;
    idProof: boolean;
    addressProof: boolean;
  };
}

interface LeaveRequest {
  id: string;
  teacherId: string;
  teacherName: string;
  type: 'SICK' | 'CASUAL' | 'MATERNITY' | 'EMERGENCY' | 'ANNUAL';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  appliedDate: string;
  approvedBy?: string;
  approvedDate?: string;
  comments?: string;
}

const TeacherManagementPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const teachers: Teacher[] = [
    {
      id: '1',
      employeeId: 'EMP001',
      name: 'Dr. Meera Gupta',
      email: 'meera.gupta@greenvalley.edu',
      phone: '+91 9876543213',
      address: '123 Teacher Colony, Mumbai',
      department: 'Mathematics',
      subject: 'Advanced Mathematics',
      qualification: 'Ph.D in Mathematics, M.Sc, B.Ed',
      experience: 8,
      joinDate: '2020-06-15',
      status: 'ACTIVE',
      employmentType: 'FULL_TIME',
      salary: 65000,
      performance: {
        rating: 4.8,
        reviews: 156,
        studentFeedback: 4.7
      },
      classes: ['11-A', '11-B', '12-A'],
      subjects: ['Calculus', 'Algebra', 'Trigonometry'],
      schedule: {
        monday: ['9:00-10:00', '11:00-12:00'],
        tuesday: ['10:00-11:00', '2:00-3:00'],
        wednesday: ['9:00-10:00', '1:00-2:00'],
        thursday: ['11:00-12:00', '3:00-4:00'],
        friday: ['9:00-10:00', '10:00-11:00'],
        saturday: ['9:00-10:00']
      },
      achievements: ['Best Teacher Award 2023', 'Research Publication in Mathematics Journal'],
      documents: {
        resume: true,
        certificates: true,
        idProof: true,
        addressProof: true
      }
    },
    {
      id: '2',
      employeeId: 'EMP002',
      name: 'Prof. Raj Kumar',
      email: 'raj.kumar@greenvalley.edu',
      phone: '+91 9876543214',
      address: '456 Faculty Street, Delhi',
      department: 'Physics',
      subject: 'Physics',
      qualification: 'M.Sc Physics, B.Ed',
      experience: 12,
      joinDate: '2019-04-10',
      status: 'ACTIVE',
      employmentType: 'FULL_TIME',
      salary: 58000,
      performance: {
        rating: 4.6,
        reviews: 134,
        studentFeedback: 4.5
      },
      classes: ['10-A', '10-B', '11-C'],
      subjects: ['Mechanics', 'Thermodynamics', 'Electronics'],
      schedule: {
        monday: ['10:00-11:00', '2:00-3:00'],
        tuesday: ['9:00-10:00', '1:00-2:00'],
        wednesday: ['11:00-12:00', '3:00-4:00'],
        thursday: ['9:00-10:00', '2:00-3:00'],
        friday: ['11:00-12:00', '1:00-2:00'],
        saturday: ['10:00-11:00']
      },
      achievements: ['Excellence in Teaching Award 2022', 'Science Fair Coordinator'],
      documents: {
        resume: true,
        certificates: true,
        idProof: true,
        addressProof: false
      }
    },
    {
      id: '3',
      employeeId: 'EMP003',
      name: 'Mrs. Priya Sharma',
      email: 'priya.sharma@greenvalley.edu',
      phone: '+91 9876543215',
      address: '789 Education Lane, Bangalore',
      department: 'English',
      subject: 'English Literature',
      qualification: 'M.A English, B.Ed',
      experience: 6,
      joinDate: '2021-08-20',
      status: 'ON_LEAVE',
      employmentType: 'FULL_TIME',
      salary: 52000,
      performance: {
        rating: 4.9,
        reviews: 98,
        studentFeedback: 4.8
      },
      classes: ['9-A', '9-B', '10-C'],
      subjects: ['Literature', 'Grammar', 'Creative Writing'],
      schedule: {
        monday: ['9:00-10:00', '11:00-12:00'],
        tuesday: ['10:00-11:00', '1:00-2:00'],
        wednesday: ['9:00-10:00', '2:00-3:00'],
        thursday: ['11:00-12:00', '1:00-2:00'],
        friday: ['9:00-10:00', '3:00-4:00'],
        saturday: ['9:00-10:00']
      },
      achievements: ['Literary Competition Organizer', 'Student Counseling Certificate'],
      documents: {
        resume: true,
        certificates: true,
        idProof: true,
        addressProof: true
      }
    }
  ];

  const leaveRequests: LeaveRequest[] = [
    {
      id: '1',
      teacherId: '3',
      teacherName: 'Mrs. Priya Sharma',
      type: 'MATERNITY',
      startDate: '2024-08-01',
      endDate: '2024-11-30',
      days: 120,
      reason: 'Maternity leave for childbirth and recovery',
      status: 'APPROVED',
      appliedDate: '2024-07-01',
      approvedBy: 'Principal',
      approvedDate: '2024-07-05',
      comments: 'Approved with full pay. Substitute teacher arranged.'
    },
    {
      id: '2',
      teacherId: '2',
      teacherName: 'Prof. Raj Kumar',
      type: 'SICK',
      startDate: '2024-08-20',
      endDate: '2024-08-22',
      days: 3,
      reason: 'Fever and flu symptoms',
      status: 'PENDING',
      appliedDate: '2024-08-19'
    },
    {
      id: '3',
      teacherId: '1',
      teacherName: 'Dr. Meera Gupta',
      type: 'ANNUAL',
      startDate: '2024-09-15',
      endDate: '2024-09-20',
      days: 6,
      reason: 'Family vacation',
      status: 'APPROVED',
      appliedDate: '2024-08-10',
      approvedBy: 'Principal',
      approvedDate: '2024-08-12',
      comments: 'Approved. Classes will be covered by substitute teacher.'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'ON_LEAVE': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'SUSPENDED': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'RESIGNED': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      case 'PENDING': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'APPROVED': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'REJECTED': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getEmploymentTypeColor = (type: string) => {
    switch (type) {
      case 'FULL_TIME': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'PART_TIME': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'CONTRACT': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'teachers', label: 'Teachers', icon: Users },
    { id: 'performance', label: 'Performance', icon: Award },
    { id: 'leave', label: 'Leave Management', icon: Calendar },
    { id: 'payroll', label: 'Payroll', icon: DollarSign },
    { id: 'reports', label: 'Reports', icon: FileText }
  ];

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Teachers</p>
                <p className="text-3xl font-bold">85</p>
                <p className="text-blue-100 text-sm">↑ 3 this month</p>
              </div>
              <Users className="h-12 w-12 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Active Teachers</p>
                <p className="text-3xl font-bold">78</p>
                <p className="text-green-100 text-sm">92% availability</p>
              </div>
              <UserCheck className="h-12 w-12 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Avg Rating</p>
                <p className="text-3xl font-bold">4.7</p>
                <p className="text-purple-100 text-sm">Based on 1,247 reviews</p>
              </div>
              <Star className="h-12 w-12 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Leave Requests</p>
                <p className="text-3xl font-bold">12</p>
                <p className="text-orange-100 text-sm">5 pending approval</p>
              </div>
              <Calendar className="h-12 w-12 text-orange-200" />
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
              <Plus className="h-6 w-6" />
              <span>Add Teacher</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Calendar className="h-6 w-6" />
              <span>Schedule</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Award className="h-6 w-6" />
              <span>Performance</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <DollarSign className="h-6 w-6" />
              <span>Payroll</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities & Department Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: 'Leave Approved',
                  details: 'Dr. Meera Gupta - Annual leave for 6 days',
                  time: '2 hours ago',
                  icon: CheckCircle,
                  color: 'text-green-500'
                },
                {
                  action: 'New Teacher',
                  details: 'Ms. Anita Singh joined Computer Science dept',
                  time: '1 day ago',
                  icon: Plus,
                  color: 'text-blue-500'
                },
                {
                  action: 'Performance Review',
                  details: 'Quarterly review completed for 15 teachers',
                  time: '2 days ago',
                  icon: Award,
                  color: 'text-purple-500'
                },
                {
                  action: 'Leave Request',
                  details: 'Prof. Raj Kumar applied for sick leave',
                  time: '3 days ago',
                  icon: AlertCircle,
                  color: 'text-orange-500'
                }
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <activity.icon className={cn("h-5 w-5 mt-0.5", activity.color)} />
                  <div className="flex-1">
                    <p className="font-medium text-slate-900 dark:text-white">{activity.action}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{activity.details}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { department: 'Mathematics', teachers: 15, avgRating: 4.8, color: 'from-blue-500 to-cyan-500' },
                { department: 'Physics', teachers: 12, avgRating: 4.6, color: 'from-green-500 to-emerald-500' },
                { department: 'Chemistry', teachers: 10, avgRating: 4.7, color: 'from-purple-500 to-pink-500' },
                { department: 'English', teachers: 18, avgRating: 4.9, color: 'from-orange-500 to-red-500' },
                { department: 'Computer Science', teachers: 8, avgRating: 4.5, color: 'from-indigo-500 to-purple-500' }
              ].map((dept, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={cn("w-10 h-10 rounded-lg bg-gradient-to-r flex items-center justify-center", dept.color)}>
                      <GraduationCap className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">{dept.department}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{dept.teachers} teachers</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="font-medium text-slate-900 dark:text-white">{dept.avgRating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const TeachersTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Teacher Directory</h2>
          <p className="text-slate-600 dark:text-slate-400">Manage teacher profiles and information</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Teacher</span>
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search teachers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Select value={filterDepartment} onValueChange={setFilterDepartment}>
          <option value="all">All Departments</option>
          <option value="mathematics">Mathematics</option>
          <option value="physics">Physics</option>
          <option value="chemistry">Chemistry</option>
          <option value="english">English</option>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="on-leave">On Leave</option>
          <option value="suspended">Suspended</option>
        </Select>
      </div>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((teacher) => (
          <Card key={teacher.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {teacher.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">{teacher.name}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">ID: {teacher.employeeId}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(teacher.status)}>
                  {teacher.status.replace('_', ' ')}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Briefcase className="h-4 w-4 text-slate-400" />
                  <span className="text-sm">{teacher.department}</span>
                  <Badge className={getEmploymentTypeColor(teacher.employmentType)} variant="secondary">
                    {teacher.employmentType.replace('_', ' ')}
                  </Badge>
                </div>

                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-slate-400" />
                  <span className="text-sm">{teacher.subject}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-slate-400" />
                  <span className="text-sm">{teacher.experience} years experience</span>
                </div>

                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-slate-400" />
                  <span className="text-sm">{teacher.phone}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <span className="text-sm text-blue-600">{teacher.email}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-slate-400" />
                  <span className="text-sm font-medium">₹{teacher.salary.toLocaleString()}/month</span>
                </div>

                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm">{teacher.performance.rating} ({teacher.performance.reviews} reviews)</span>
                </div>
              </div>

              <div className="flex space-x-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4" />
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
                Teacher Management
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Comprehensive staff management, performance tracking, and HR operations
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export Data</span>
              </Button>
              <Button className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add Teacher</span>
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
          {activeTab === 'teachers' && <TeachersTab />}
          {['performance', 'leave', 'payroll', 'reports'].map(tab => (
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

export default TeacherManagementPage;