"use client";

import React, { useState } from 'react';
import { 
  BookOpen, Users, Video, FileText, Award, Calendar, Clock, 
  Play, Pause, Download, Upload, Plus, Edit, Eye, Search,
  Filter, Star, TrendingUp, Activity, Target, Zap, Globe,
  CheckCircle, AlertCircle, Settings, BarChart3, PieChart
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { cn } from '@/lib/utils';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  category: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  duration: number; // in hours
  totalLessons: number;
  completedLessons: number;
  enrolledStudents: number;
  maxStudents: number;
  rating: number;
  reviews: number;
  price: number;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  createdDate: string;
  lastUpdated: string;
  tags: string[];
  thumbnail?: string;
}

interface Assignment {
  id: string;
  title: string;
  courseId: string;
  courseName: string;
  description: string;
  dueDate: string;
  maxScore: number;
  submissions: number;
  totalStudents: number;
  status: 'ACTIVE' | 'CLOSED' | 'DRAFT';
  type: 'ESSAY' | 'QUIZ' | 'PROJECT' | 'PRESENTATION';
  createdBy: string;
  createdDate: string;
}

const LMSPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const courses: Course[] = [
    {
      id: '1',
      title: 'Advanced Mathematics - Calculus',
      description: 'Comprehensive calculus course covering limits, derivatives, and integrals',
      instructor: 'Dr. Meera Gupta',
      category: 'Mathematics',
      level: 'ADVANCED',
      duration: 120,
      totalLessons: 24,
      completedLessons: 18,
      enrolledStudents: 45,
      maxStudents: 50,
      rating: 4.8,
      reviews: 32,
      price: 2999,
      status: 'PUBLISHED',
      createdDate: '2024-01-15',
      lastUpdated: '2024-08-10',
      tags: ['calculus', 'mathematics', 'advanced']
    },
    {
      id: '2',
      title: 'Physics - Quantum Mechanics',
      description: 'Introduction to quantum mechanics principles and applications',
      instructor: 'Prof. Raj Kumar',
      category: 'Physics',
      level: 'INTERMEDIATE',
      duration: 80,
      totalLessons: 16,
      completedLessons: 12,
      enrolledStudents: 38,
      maxStudents: 40,
      rating: 4.6,
      reviews: 28,
      price: 3499,
      status: 'PUBLISHED',
      createdDate: '2024-02-01',
      lastUpdated: '2024-08-05',
      tags: ['quantum', 'physics', 'mechanics']
    },
    {
      id: '3',
      title: 'Computer Science - Data Structures',
      description: 'Fundamental data structures and algorithms',
      instructor: 'Mr. Arjun Singh',
      category: 'Computer Science',
      level: 'BEGINNER',
      duration: 60,
      totalLessons: 20,
      completedLessons: 8,
      enrolledStudents: 52,
      maxStudents: 60,
      rating: 4.9,
      reviews: 41,
      price: 1999,
      status: 'PUBLISHED',
      createdDate: '2024-03-01',
      lastUpdated: '2024-08-12',
      tags: ['programming', 'algorithms', 'computer science']
    }
  ];

  const assignments: Assignment[] = [
    {
      id: '1',
      title: 'Calculus Problem Set 5',
      courseId: '1',
      courseName: 'Advanced Mathematics - Calculus',
      description: 'Solve integration problems using various techniques',
      dueDate: '2024-08-25',
      maxScore: 100,
      submissions: 32,
      totalStudents: 45,
      status: 'ACTIVE',
      type: 'ESSAY',
      createdBy: 'Dr. Meera Gupta',
      createdDate: '2024-08-15'
    },
    {
      id: '2',
      title: 'Quantum States Quiz',
      courseId: '2',
      courseName: 'Physics - Quantum Mechanics',
      description: 'Multiple choice quiz on quantum state principles',
      dueDate: '2024-08-20',
      maxScore: 50,
      submissions: 28,
      totalStudents: 38,
      status: 'ACTIVE',
      type: 'QUIZ',
      createdBy: 'Prof. Raj Kumar',
      createdDate: '2024-08-10'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PUBLISHED': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'DRAFT': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'ARCHIVED': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      case 'ACTIVE': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'CLOSED': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'BEGINNER': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'INTERMEDIATE': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'ADVANCED': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'assignments', label: 'Assignments', icon: FileText },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: PieChart },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Courses</p>
                <p className="text-3xl font-bold">24</p>
                <p className="text-blue-100 text-sm">↑ 3 this month</p>
              </div>
              <BookOpen className="h-12 w-12 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Active Students</p>
                <p className="text-3xl font-bold">1,247</p>
                <p className="text-green-100 text-sm">85% completion rate</p>
              </div>
              <Users className="h-12 w-12 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Assignments</p>
                <p className="text-3xl font-bold">156</p>
                <p className="text-purple-100 text-sm">18 pending review</p>
              </div>
              <FileText className="h-12 w-12 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Certificates</p>
                <p className="text-3xl font-bold">892</p>
                <p className="text-orange-100 text-sm">↑ 45 this week</p>
              </div>
              <Award className="h-12 w-12 text-orange-200" />
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
              <span>Create Course</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <FileText className="h-6 w-6" />
              <span>New Assignment</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Video className="h-6 w-6" />
              <span>Live Session</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Award className="h-6 w-6" />
              <span>Issue Certificate</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity & Top Courses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: 'Course Published',
                  details: 'Advanced Mathematics - Calculus by Dr. Meera Gupta',
                  time: '2 hours ago',
                  icon: BookOpen,
                  color: 'text-green-500'
                },
                {
                  action: 'Assignment Submitted',
                  details: '32 students submitted Calculus Problem Set 5',
                  time: '4 hours ago',
                  icon: FileText,
                  color: 'text-blue-500'
                },
                {
                  action: 'New Enrollment',
                  details: '15 students enrolled in Quantum Mechanics',
                  time: '1 day ago',
                  icon: Users,
                  color: 'text-purple-500'
                },
                {
                  action: 'Certificate Issued',
                  details: '25 certificates issued for Data Structures course',
                  time: '2 days ago',
                  icon: Award,
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
            <CardTitle>Top Performing Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {courses.slice(0, 3).map((course, index) => (
                <div key={course.id} className="flex items-center space-x-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900 dark:text-white">{course.title}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{course.instructor}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-slate-600 dark:text-slate-400 ml-1">{course.rating}</span>
                      </div>
                      <span className="text-sm text-slate-500">•</span>
                      <span className="text-sm text-slate-600 dark:text-slate-400">{course.enrolledStudents} students</span>
                    </div>
                  </div>
                  <Badge className={getLevelColor(course.level)}>
                    {course.level}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const CoursesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Course Management</h2>
          <p className="text-slate-600 dark:text-slate-400">Create and manage educational courses</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Create Course</span>
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <option value="all">All Categories</option>
          <option value="mathematics">Mathematics</option>
          <option value="physics">Physics</option>
          <option value="computer-science">Computer Science</option>
          <option value="chemistry">Chemistry</option>
        </Select>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <Badge className={getStatusColor(course.status)}>
                  {course.status}
                </Badge>
                <Badge className={getLevelColor(course.level)}>
                  {course.level}
                </Badge>
              </div>

              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{course.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">{course.description}</p>
              
              <div className="flex items-center space-x-2 mb-3">
                <Users className="h-4 w-4 text-slate-400" />
                <span className="text-sm text-slate-600 dark:text-slate-400">{course.instructor}</span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Students:</span>
                  <span className="font-medium">{course.enrolledStudents}/{course.maxStudents}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Lessons:</span>
                  <span className="font-medium">{course.completedLessons}/{course.totalLessons}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Duration:</span>
                  <span className="font-medium">{course.duration}h</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{Math.round((course.completedLessons / course.totalLessons) * 100)}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" 
                    style={{ width: `${(course.completedLessons / course.totalLessons) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-1 mt-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={cn("h-4 w-4", i < Math.floor(course.rating) ? "text-yellow-400 fill-current" : "text-slate-300")} />
                ))}
                <span className="text-sm text-slate-600 ml-1">({course.reviews})</span>
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
                  <Play className="h-4 w-4" />
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
                Learning Management System
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Comprehensive course creation, delivery, and assessment platform
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export Reports</span>
              </Button>
              <Button className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Create Course</span>
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
          {activeTab === 'courses' && <CoursesTab />}
          {activeTab === 'assignments' && (
            <div className="text-center py-20">
              <FileText className="h-16 w-16 mx-auto text-slate-400 mb-4" />
              <h3 className="text-xl font-medium text-slate-900 dark:text-white mb-2">Assignment Management</h3>
              <p className="text-slate-600 dark:text-slate-400">Create and track assignments coming soon...</p>
            </div>
          )}
          {['students', 'analytics', 'settings'].map(tab => (
            activeTab === tab && (
              <div key={tab} className="text-center py-20">
                <Settings className="h-16 w-16 mx-auto text-slate-400 mb-4" />
                <h3 className="text-xl font-medium text-slate-900 dark:text-white mb-2">{tab.charAt(0).toUpperCase() + tab.slice(1)}</h3>
                <p className="text-slate-600 dark:text-slate-400">Coming soon...</p>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default LMSPage;