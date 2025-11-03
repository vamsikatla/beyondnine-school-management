"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, Plus, Search, Calendar, Clock, ArrowLeft, Settings,
  BookOpen, GraduationCap, UserCheck, UserX, Edit, Eye, MoreVertical,
  TrendingUp, Award, AlertTriangle, CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

const initialClasses = [
  {
    id: 1,
    name: "Advanced Mathematics 12-A",
    code: "MATH12A",
    subject: "Mathematics",
    grade: "Grade 12",
    section: "A",
    totalStudents: 28,
    activeStudents: 26,
    schedule: [
      { day: "Monday", time: "09:00-10:30" },
      { day: "Wednesday", time: "10:30-12:00" },
      { day: "Friday", time: "14:00-15:30" }
    ],
    classroom: "Room 301",
    description: "Advanced calculus and analytical geometry",
    startDate: "2024-01-15",
    endDate: "2024-06-15",
    averageAttendance: 92,
    averageGrade: 85,
    status: "active"
  },
  {
    id: 2,
    name: "Physics Laboratory 11-B",
    code: "PHYS11B",
    subject: "Physics",
    grade: "Grade 11",
    section: "B",
    totalStudents: 24,
    activeStudents: 23,
    schedule: [
      { day: "Tuesday", time: "08:00-09:30" },
      { day: "Thursday", time: "13:00-14:30" }
    ],
    classroom: "Lab 201",
    description: "Practical physics experiments and demonstrations",
    startDate: "2024-01-10",
    endDate: "2024-06-10",
    averageAttendance: 88,
    averageGrade: 78,
    status: "active"
  },
  {
    id: 3,
    name: "Statistics & Probability 12-C",
    code: "STAT12C",
    subject: "Statistics",
    grade: "Grade 12",
    section: "C",
    totalStudents: 30,
    activeStudents: 29,
    schedule: [
      { day: "Monday", time: "11:00-12:30" },
      { day: "Wednesday", time: "14:00-15:30" },
      { day: "Friday", time: "09:00-10:30" }
    ],
    classroom: "Room 205",
    description: "Statistical analysis and probability theory",
    startDate: "2024-01-08",
    endDate: "2024-06-08",
    averageAttendance: 95,
    averageGrade: 82,
    status: "active"
  }
];

const ClassesPage = () => {
  const router = useRouter();
  const [classes, setClasses] = React.useState(initialClasses);
  const [view, setView] = React.useState('overview'); // overview, details, create, edit
  const [selectedClass, setSelectedClass] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterSubject, setFilterSubject] = React.useState("all");

  const [newClass, setNewClass] = React.useState({
    name: '',
    code: '',
    subject: 'Mathematics',
    grade: 'Grade 12',
    section: 'A',
    classroom: '',
    description: '',
    startDate: '',
    endDate: ''
  });

  const formatSchedule = (schedule) => {
    return schedule.map(s => `${s.day} ${s.time}`).join(', ');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'secondary';
      case 'completed': return 'info';
      default: return 'default';
    }
  };

  const getPerformanceColor = (value, type) => {
    if (type === 'attendance') {
      if (value >= 90) return 'text-green-600';
      if (value >= 80) return 'text-yellow-600';
      return 'text-red-600';
    }
    if (type === 'grade') {
      if (value >= 80) return 'text-green-600';
      if (value >= 70) return 'text-yellow-600';
      return 'text-red-600';
    }
    return 'text-slate-600';
  };

  const handleCreateClass = () => {
    if (newClass.name && newClass.code && newClass.startDate && newClass.endDate) {
      const classData = {
        id: classes.length + 1,
        ...newClass,
        totalStudents: 0,
        activeStudents: 0,
        schedule: [],
        averageAttendance: 0,
        averageGrade: 0,
        status: 'active'
      };
      setClasses([classData, ...classes]);
      setNewClass({
        name: '',
        code: '',
        subject: 'Mathematics',
        grade: 'Grade 12',
        section: 'A',
        classroom: '',
        description: '',
        startDate: '',
        endDate: ''
      });
      setView('overview');
      alert('Class created successfully!');
    }
  };

  const viewClassDetails = (classData) => {
    setSelectedClass(classData);
    setView('details');
  };

  const filteredClasses = classes.filter(cls => {
    const matchesSearch = cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cls.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cls.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = filterSubject === "all" || cls.subject === filterSubject;
    return matchesSearch && matchesSubject;
  });

  const classStats = {
    total: classes.length,
    active: classes.filter(c => c.status === 'active').length,
    totalStudents: classes.reduce((sum, c) => sum + c.totalStudents, 0),
    averageAttendance: Math.round(classes.reduce((sum, c) => sum + c.averageAttendance, 0) / classes.length)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Header */}
      <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => router.push('/teacher/dashboard')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white">
                  My Classes
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Manage your classes and student enrollment
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {view === 'overview' && (
                <Button variant="gradient" onClick={() => setView('create')}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Class
                </Button>
              )}
              {view === 'details' && (
                <Button variant="outline" onClick={() => setView('overview')}>
                  Back to Classes
                </Button>
              )}
              {view === 'create' && (
                <Button variant="outline" onClick={() => setView('overview')}>
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === 'overview' && (
          <>
            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Total Classes</p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">{classStats.total}</p>
                    </div>
                    <BookOpen className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Active Classes</p>
                      <p className="text-2xl font-bold text-green-600">{classStats.active}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Total Students</p>
                      <p className="text-2xl font-bold text-purple-600">{classStats.totalStudents}</p>
                    </div>
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Avg. Attendance</p>
                      <p className={`text-2xl font-bold ${getPerformanceColor(classStats.averageAttendance, 'attendance')}`}>
                        {classStats.averageAttendance}%
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input
                      placeholder="Search classes..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)}>
                    <option value="all">All Subjects</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="Statistics">Statistics</option>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Classes Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredClasses.map((cls) => (
                <Card key={cls.id} className="hover-lift">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{cls.name}</CardTitle>
                        <CardDescription>{cls.code} • {cls.classroom}</CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={getStatusColor(cls.status)}>
                          {cls.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {cls.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Students</p>
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-slate-400" />
                            <span className="text-sm font-medium">
                              {cls.activeStudents}/{cls.totalStudents}
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Attendance</p>
                          <div className="flex items-center space-x-2">
                            <UserCheck className="h-4 w-4 text-slate-400" />
                            <span className={`text-sm font-medium ${getPerformanceColor(cls.averageAttendance, 'attendance')}`}>
                              {cls.averageAttendance}%
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Average Grade</p>
                          <div className="flex items-center space-x-2">
                            <Award className="h-4 w-4 text-slate-400" />
                            <span className={`text-sm font-medium ${getPerformanceColor(cls.averageGrade, 'grade')}`}>
                              {cls.averageGrade}%
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Schedule</p>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-slate-400" />
                            <span className="text-sm font-medium">
                              {cls.schedule.length} sessions/week
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t">
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Next Sessions:</p>
                        <div className="space-y-1">
                          {cls.schedule.slice(0, 2).map((session, index) => (
                            <div key={index} className="flex items-center justify-between text-sm">
                              <span className="text-slate-600 dark:text-slate-400">{session.day}</span>
                              <span className="text-slate-900 dark:text-white font-medium">{session.time}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-2 pt-3 border-t">
                        <Button 
                          variant="primary" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => viewClassDetails(cls)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {view === 'create' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                Create New Class
              </CardTitle>
              <CardDescription>
                Set up a new class for your students
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Class Name *
                  </label>
                  <Input
                    value={newClass.name}
                    onChange={(e) => setNewClass({...newClass, name: e.target.value})}
                    placeholder="e.g., Advanced Mathematics 12-A"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Class Code *
                  </label>
                  <Input
                    value={newClass.code}
                    onChange={(e) => setNewClass({...newClass, code: e.target.value.toUpperCase()})}
                    placeholder="e.g., MATH12A"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Subject
                  </label>
                  <Select
                    value={newClass.subject}
                    onChange={(e) => setNewClass({...newClass, subject: e.target.value})}
                  >
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="Statistics">Statistics</option>
                    <option value="English">English</option>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Grade & Section
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <Select
                      value={newClass.grade}
                      onChange={(e) => setNewClass({...newClass, grade: e.target.value})}
                    >
                      <option value="Grade 9">Grade 9</option>
                      <option value="Grade 10">Grade 10</option>
                      <option value="Grade 11">Grade 11</option>
                      <option value="Grade 12">Grade 12</option>
                    </Select>
                    <Select
                      value={newClass.section}
                      onChange={(e) => setNewClass({...newClass, section: e.target.value})}
                    >
                      <option value="A">Section A</option>
                      <option value="B">Section B</option>
                      <option value="C">Section C</option>
                      <option value="D">Section D</option>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Classroom
                  </label>
                  <Input
                    value={newClass.classroom}
                    onChange={(e) => setNewClass({...newClass, classroom: e.target.value})}
                    placeholder="e.g., Room 301"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Duration
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="date"
                      value={newClass.startDate}
                      onChange={(e) => setNewClass({...newClass, startDate: e.target.value})}
                    />
                    <Input
                      type="date"
                      value={newClass.endDate}
                      onChange={(e) => setNewClass({...newClass, endDate: e.target.value})}
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Description
                  </label>
                  <textarea
                    className="w-full p-3 border border-slate-300 rounded-lg resize-none"
                    rows={3}
                    value={newClass.description}
                    onChange={(e) => setNewClass({...newClass, description: e.target.value})}
                    placeholder="Brief description of the class curriculum and objectives..."
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-6 pt-6 border-t">
                <Button variant="outline" onClick={() => setView('overview')}>
                  Cancel
                </Button>
                <Button variant="gradient" onClick={handleCreateClass}>
                  Create Class
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {view === 'details' && selectedClass && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{selectedClass.name}</CardTitle>
                    <CardDescription>{selectedClass.code} • {selectedClass.classroom}</CardDescription>
                  </div>
                  <Badge variant={getStatusColor(selectedClass.status)} className="text-sm">
                    {selectedClass.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-slate-900 dark:text-white">Class Information</h4>
                    <div className="space-y-2 text-sm">
                      <div><span className="text-slate-500">Subject:</span> {selectedClass.subject}</div>
                      <div><span className="text-slate-500">Grade:</span> {selectedClass.grade} - {selectedClass.section}</div>
                      <div><span className="text-slate-500">Duration:</span> {selectedClass.startDate} to {selectedClass.endDate}</div>
                      <div><span className="text-slate-500">Students:</span> {selectedClass.activeStudents}/{selectedClass.totalStudents}</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium text-slate-900 dark:text-white">Performance</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-slate-500">Attendance:</span> 
                        <span className={`ml-2 font-medium ${getPerformanceColor(selectedClass.averageAttendance, 'attendance')}`}>
                          {selectedClass.averageAttendance}%
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500">Average Grade:</span> 
                        <span className={`ml-2 font-medium ${getPerformanceColor(selectedClass.averageGrade, 'grade')}`}>
                          {selectedClass.averageGrade}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium text-slate-900 dark:text-white">Schedule</h4>
                    <div className="space-y-2 text-sm">
                      {selectedClass.schedule.map((session, index) => (
                        <div key={index} className="flex justify-between">
                          <span className="text-slate-500">{session.day}:</span>
                          <span className="font-medium">{session.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <UserCheck className="h-4 w-4 mr-2" />
                    Take Attendance
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="h-4 w-4 mr-2" />
                    View Assignments
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Grade Management
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    Class Settings
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800 rounded">
                      <span>Assignment submitted by 24 students</span>
                      <span className="text-slate-500">2 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800 rounded">
                      <span>Attendance marked for Monday class</span>
                      <span className="text-slate-500">1 day ago</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800 rounded">
                      <span>New resource uploaded</span>
                      <span className="text-slate-500">3 days ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassesPage;