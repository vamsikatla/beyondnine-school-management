"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  UserCheck, Plus, Search, Filter, Download, Upload, Eye, Edit, Trash2,
  Users, GraduationCap, Calendar, Phone, Mail, MapPin, Clock, Award,
  BookOpen, FileText, ArrowLeft, CheckCircle, AlertCircle, Star,
  Briefcase, School, Target, Activity
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { cn } from '@/lib/utils';

const AdminTeachersPage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedDepartment, setSelectedDepartment] = React.useState('all');
  const [selectedStatus, setSelectedStatus] = React.useState('all');

  // Mock teacher data
  const teachers = [
    {
      id: 'TCH001',
      name: 'Dr. Priya Gupta',
      email: 'priya.gupta@school.edu',
      phone: '+91 9876543210',
      department: 'Mathematics',
      subjects: ['Advanced Mathematics', 'Calculus', 'Statistics'],
      employeeId: 'EMP001',
      designation: 'Senior Teacher',
      experience: 8,
      qualification: 'M.Sc, Ph.D Mathematics',
      joiningDate: '2019-06-15',
      status: 'Active',
      classes: ['Grade 11', 'Grade 12'],
      performance: 4.8,
      studentsCount: 156,
      avatar: '👩‍🏫'
    },
    {
      id: 'TCH002',
      name: 'Mr. Raj Kumar',
      email: 'raj.kumar@school.edu',
      phone: '+91 9876543211',
      department: 'Physics',
      subjects: ['Physics', 'Applied Physics'],
      employeeId: 'EMP002',
      designation: 'Head of Department',
      experience: 12,
      qualification: 'M.Sc Physics, B.Ed',
      joiningDate: '2017-04-01',
      status: 'Active',
      classes: ['Grade 10', 'Grade 11', 'Grade 12'],
      performance: 4.9,
      studentsCount: 203,
      avatar: '👨‍🏫'
    },
    {
      id: 'TCH003',
      name: 'Ms. Anita Singh',
      email: 'anita.singh@school.edu',
      phone: '+91 9876543212',
      department: 'Chemistry',
      subjects: ['Organic Chemistry', 'Inorganic Chemistry'],
      employeeId: 'EMP003',
      designation: 'Assistant Teacher',
      experience: 5,
      qualification: 'M.Sc Chemistry, B.Ed',
      joiningDate: '2021-03-15',
      status: 'Active',
      classes: ['Grade 11', 'Grade 12'],
      performance: 4.7,
      studentsCount: 142,
      avatar: '👩‍🏫'
    },
    {
      id: 'TCH004',
      name: 'Mrs. Sarah Wilson',
      email: 'sarah.wilson@school.edu',
      phone: '+91 9876543213',
      department: 'English',
      subjects: ['English Literature', 'English Grammar'],
      employeeId: 'EMP004',
      designation: 'Senior Teacher',
      experience: 10,
      qualification: 'M.A English Literature, B.Ed',
      joiningDate: '2018-07-20',
      status: 'On Leave',
      classes: ['Grade 9', 'Grade 10'],
      performance: 4.6,
      studentsCount: 180,
      avatar: '👩‍🏫'
    }
  ];

  const stats = [
    { label: 'Total Teachers', value: '87', icon: UserCheck, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'New Hires', value: '12', icon: Plus, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'On Leave', value: '5', icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { label: 'Departments', value: '15', icon: School, color: 'text-purple-600', bg: 'bg-purple-100' }
  ];

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDepartment = selectedDepartment === 'all' || teacher.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'all' || teacher.status.toLowerCase() === selectedStatus.toLowerCase();
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const handleAddTeacher = () => {
    console.log('Add new teacher');
    // Navigate to add teacher form or open modal
  };

  const handleViewTeacher = (teacherId: string) => {
    console.log('View teacher:', teacherId);
    // Navigate to teacher detail page
  };

  const handleEditTeacher = (teacherId: string) => {
    console.log('Edit teacher:', teacherId);
    // Navigate to edit teacher form
  };

  const handleDeleteTeacher = (teacherId: string) => {
    console.log('Delete teacher:', teacherId);
    // Show confirmation dialog and delete
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'on leave': return 'text-yellow-600 bg-yellow-50';
      case 'inactive': return 'text-red-600 bg-red-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  const getPerformanceColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-blue-600';
    if (rating >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Header */}
      <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => router.push('/admin/dashboard')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white">
                  Teacher Management
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Manage teaching staff and assignments
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="gradient" onClick={handleAddTeacher}>
                <Plus className="h-4 w-4 mr-2" />
                Add Teacher
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                        {stat.label}
                      </p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        {stat.value}
                      </p>
                    </div>
                    <div className={cn("p-3 rounded-lg", stat.bg)}>
                      <IconComponent className={cn("h-6 w-6", stat.color)} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    placeholder="Search teachers by name, employee ID, email, or subjects..."
                    className="pl-10 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Select value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
                  <option value="all">All Departments</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="English">English</option>
                  <option value="Biology">Biology</option>
                  <option value="Computer Science">Computer Science</option>
                </Select>
                <Select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="on leave">On Leave</option>
                  <option value="inactive">Inactive</option>
                </Select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTeachers.map((teacher) => (
            <Card key={teacher.id} className="hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-xl">
                      {teacher.avatar}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        {teacher.name}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {teacher.employeeId}
                      </p>
                    </div>
                  </div>
                  <Badge className={cn("text-xs", getStatusColor(teacher.status))}>
                    {teacher.status}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400 flex items-center">
                      <School className="h-4 w-4 mr-1" />
                      Department:
                    </span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {teacher.department}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400 flex items-center">
                      <Briefcase className="h-4 w-4 mr-1" />
                      Designation:
                    </span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {teacher.designation}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      Experience:
                    </span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {teacher.experience} years
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400 flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      Performance:
                    </span>
                    <span className={cn("font-medium", getPerformanceColor(teacher.performance))}>
                      {teacher.performance}/5.0
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400 flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      Students:
                    </span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {teacher.studentsCount}
                    </span>
                  </div>
                </div>

                {/* Subjects */}
                <div className="mt-4">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Subjects:</p>
                  <div className="flex flex-wrap gap-1">
                    {teacher.subjects.map((subject, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Classes */}
                <div className="mt-3">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Classes:</p>
                  <div className="flex flex-wrap gap-1">
                    {teacher.classes.map((cls, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {cls}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t mt-4">
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleViewTeacher(teacher.id)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleEditTeacher(teacher.id)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteTeacher(teacher.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="cursor-pointer hover:shadow-lg transition-all" onClick={() => console.log('Performance reports')}>
            <CardContent className="p-6 text-center">
              <Activity className="h-8 w-8 text-slate-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                Performance Reports
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Generate teacher performance analytics
              </p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-all" onClick={() => console.log('Class assignments')}>
            <CardContent className="p-6 text-center">
              <BookOpen className="h-8 w-8 text-slate-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                Class Assignments
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Manage teacher class assignments
              </p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-all" onClick={() => console.log('Leave management')}>
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 text-slate-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                Leave Management
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Manage teacher leave requests
              </p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-all" onClick={() => console.log('Payroll integration')}>
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 text-slate-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                Payroll Integration
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Connect with payroll systems
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminTeachersPage;