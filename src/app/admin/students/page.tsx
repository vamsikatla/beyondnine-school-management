"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, Plus, Search, Filter, Download, Upload, Eye, Edit, Trash2,
  UserPlus, UserMinus, GraduationCap, Calendar, Phone, Mail, MapPin,
  CheckCircle, AlertCircle, Clock, Award, BookOpen, FileText, ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { cn } from '@/lib/utils';

const AdminStudentsPage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedGrade, setSelectedGrade] = React.useState('all');
  const [selectedStatus, setSelectedStatus] = React.useState('all');

  // Mock student data
  const students = [
    {
      id: 'STU001',
      name: 'Aarav Sharma',
      email: 'aarav.sharma@student.edu',
      phone: '+91 9876543210',
      grade: 'Grade 12',
      section: 'A',
      rollNumber: '12A001',
      dateOfBirth: '2005-08-15',
      address: '123 Student Colony, Mumbai',
      parentName: 'Rajesh Sharma',
      parentPhone: '+91 9876543211',
      admissionDate: '2021-04-15',
      status: 'Active',
      gpa: 3.8,
      attendance: 92.5,
      feesStatus: 'Paid',
      avatar: '👨‍🎓'
    },
    {
      id: 'STU002',
      name: 'Priya Patel',
      email: 'priya.patel@student.edu',
      phone: '+91 9876543212',
      grade: 'Grade 11',
      section: 'B',
      rollNumber: '11B015',
      dateOfBirth: '2006-03-22',
      address: '456 Education Street, Delhi',
      parentName: 'Vikash Patel',
      parentPhone: '+91 9876543213',
      admissionDate: '2022-06-01',
      status: 'Active',
      gpa: 3.9,
      attendance: 95.2,
      feesStatus: 'Paid',
      avatar: '👩‍🎓'
    },
    {
      id: 'STU003',
      name: 'Rohit Kumar',
      email: 'rohit.kumar@student.edu',
      phone: '+91 9876543214',
      grade: 'Grade 10',
      section: 'A',
      rollNumber: '10A022',
      dateOfBirth: '2007-11-08',
      address: '789 Learning Avenue, Bangalore',
      parentName: 'Suresh Kumar',
      parentPhone: '+91 9876543215',
      admissionDate: '2023-04-10',
      status: 'Active',
      gpa: 3.6,
      attendance: 88.7,
      feesStatus: 'Pending',
      avatar: '👨‍🎓'
    },
    {
      id: 'STU004',
      name: 'Ananya Singh',
      email: 'ananya.singh@student.edu',
      phone: '+91 9876543216',
      grade: 'Grade 9',
      section: 'C',
      rollNumber: '09C008',
      dateOfBirth: '2008-05-14',
      address: '321 Knowledge Park, Chennai',
      parentName: 'Rajesh Singh',
      parentPhone: '+91 9876543217',
      admissionDate: '2023-07-15',
      status: 'Active',
      gpa: 4.0,
      attendance: 97.1,
      feesStatus: 'Paid',
      avatar: '👩‍🎓'
    }
  ];

  const stats = [
    { label: 'Total Students', value: '1,245', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'New Admissions', value: '35', icon: UserPlus, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Pending Fees', value: '125', icon: AlertCircle, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { label: 'Graduate This Year', value: '230', icon: GraduationCap, color: 'text-purple-600', bg: 'bg-purple-100' }
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === 'all' || student.grade === selectedGrade;
    const matchesStatus = selectedStatus === 'all' || student.status.toLowerCase() === selectedStatus.toLowerCase();
    return matchesSearch && matchesGrade && matchesStatus;
  });

  const handleAddStudent = () => {
    console.log('Add new student');
    // Navigate to add student form or open modal
  };

  const handleViewStudent = (studentId: string) => {
    console.log('View student:', studentId);
    // Navigate to student detail page
  };

  const handleEditStudent = (studentId: string) => {
    console.log('Edit student:', studentId);
    // Navigate to edit student form
  };

  const handleDeleteStudent = (studentId: string) => {
    console.log('Delete student:', studentId);
    // Show confirmation dialog and delete
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'inactive': return 'text-yellow-600 bg-yellow-50';
      case 'suspended': return 'text-red-600 bg-red-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  const getFeesStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'overdue': return 'text-red-600 bg-red-50';
      default: return 'text-slate-600 bg-slate-50';
    }
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
                  Student Management
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Manage student enrollment and records
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
              <Button variant="gradient" onClick={handleAddStudent}>
                <Plus className="h-4 w-4 mr-2" />
                Add Student
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
                    placeholder="Search students by name, roll number, or email..."
                    className="pl-10 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Select value={selectedGrade} onChange={(e) => setSelectedGrade(e.target.value)}>
                  <option value="all">All Grades</option>
                  <option value="Grade 9">Grade 9</option>
                  <option value="Grade 10">Grade 10</option>
                  <option value="Grade 11">Grade 11</option>
                  <option value="Grade 12">Grade 12</option>
                </Select>
                <Select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </Select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Students Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <Card key={student.id} className="hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-xl">
                      {student.avatar}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        {student.name}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {student.rollNumber}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <Badge className={cn("text-xs", getStatusColor(student.status))}>
                      {student.status}
                    </Badge>
                    <Badge className={cn("text-xs", getFeesStatusColor(student.feesStatus))}>
                      {student.feesStatus}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400 flex items-center">
                      <GraduationCap className="h-4 w-4 mr-1" />
                      Class:
                    </span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {student.grade} - {student.section}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400 flex items-center">
                      <Award className="h-4 w-4 mr-1" />
                      GPA:
                    </span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {student.gpa}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Attendance:
                    </span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {student.attendance}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400 flex items-center">
                      <Phone className="h-4 w-4 mr-1" />
                      Parent:
                    </span>
                    <span className="font-medium text-slate-900 dark:text-white truncate ml-2">
                      {student.parentName}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t mt-4">
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleViewStudent(student.id)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleEditStudent(student.id)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteStudent(student.id)}
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
          <Card className="cursor-pointer hover:shadow-lg transition-all" onClick={() => console.log('Generate reports')}>
            <CardContent className="p-6 text-center">
              <FileText className="h-8 w-8 text-slate-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                Generate Reports
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Create detailed student reports
              </p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-all" onClick={() => console.log('Bulk operations')}>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-slate-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                Bulk Operations
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Perform bulk student operations
              </p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-all" onClick={() => console.log('Attendance tracking')}>
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-slate-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                Attendance Tracking
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Monitor student attendance
              </p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-all" onClick={() => console.log('Parent communication')}>
            <CardContent className="p-6 text-center">
              <Mail className="h-8 w-8 text-slate-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                Parent Communication
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Send notifications to parents
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminStudentsPage;