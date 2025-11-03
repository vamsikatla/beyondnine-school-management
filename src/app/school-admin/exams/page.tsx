"use client";

import React, { useState } from 'react';
import { 
  FileText, Users, Calendar, Clock, Award, Target, 
  TrendingUp, BarChart3, PieChart, CheckCircle, XCircle,
  Search, Filter, Download, Plus, Edit, Eye, Settings,
  Brain, BookOpen, GraduationCap, Star, AlertCircle,
  Play, Pause, Timer, Calculator, Lightbulb, Flag
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { cn } from '@/lib/utils';

interface Exam {
  id: string;
  title: string;
  description: string;
  subject: string;
  class: string;
  type: 'UNIT_TEST' | 'MIDTERM' | 'FINAL' | 'MOCK' | 'ASSIGNMENT';
  duration: number; // in minutes
  totalMarks: number;
  passingMarks: number;
  questions: number;
  startDate: string;
  endDate: string;
  status: 'DRAFT' | 'SCHEDULED' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  participants: number;
  completed: number;
  averageScore: number;
  createdBy: string;
  createdAt: string;
}

interface Question {
  id: string;
  examId: string;
  type: 'MCQ' | 'TRUE_FALSE' | 'SHORT_ANSWER' | 'ESSAY' | 'FILL_BLANK';
  question: string;
  options?: string[];
  correctAnswer: string;
  marks: number;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  subject: string;
  topic: string;
  explanation?: string;
}

interface Result {
  id: string;
  examId: string;
  examTitle: string;
  studentId: string;
  studentName: string;
  class: string;
  score: number;
  totalMarks: number;
  percentage: number;
  grade: string;
  rank: number;
  totalParticipants: number;
  timeSpent: number; // in minutes
  submittedAt: string;
  status: 'PASSED' | 'FAILED' | 'PENDING';
  subjectWiseScores: {
    subject: string;
    score: number;
    totalMarks: number;
  }[];
}

const ExaminationPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const exams: Exam[] = [
    {
      id: '1',
      title: 'Mathematics Mid-Term Exam',
      description: 'Comprehensive mid-term examination covering algebra, geometry, and trigonometry',
      subject: 'Mathematics',
      class: '12-A',
      type: 'MIDTERM',
      duration: 180,
      totalMarks: 100,
      passingMarks: 40,
      questions: 50,
      startDate: '2024-08-20',
      endDate: '2024-08-20',
      status: 'SCHEDULED',
      participants: 45,
      completed: 0,
      averageScore: 0,
      createdBy: 'Dr. Meera Gupta',
      createdAt: '2024-08-10'
    },
    {
      id: '2',
      title: 'Physics Unit Test - Mechanics',
      description: 'Unit test covering laws of motion, work, energy, and power',
      subject: 'Physics',
      class: '11-B',
      type: 'UNIT_TEST',
      duration: 90,
      totalMarks: 50,
      passingMarks: 20,
      questions: 25,
      startDate: '2024-08-18',
      endDate: '2024-08-18',
      status: 'COMPLETED',
      participants: 38,
      completed: 38,
      averageScore: 38.2,
      createdBy: 'Prof. Raj Kumar',
      createdAt: '2024-08-05'
    },
    {
      id: '3',
      title: 'English Literature Final Exam',
      description: 'Final examination covering Shakespeare, poetry, and prose analysis',
      subject: 'English',
      class: '10-A',
      type: 'FINAL',
      duration: 240,
      totalMarks: 150,
      passingMarks: 60,
      questions: 35,
      startDate: '2024-08-25',
      endDate: '2024-08-25',
      status: 'DRAFT',
      participants: 42,
      completed: 0,
      averageScore: 0,
      createdBy: 'Mrs. Priya Sharma',
      createdAt: '2024-08-12'
    }
  ];

  const results: Result[] = [
    {
      id: '1',
      examId: '2',
      examTitle: 'Physics Unit Test - Mechanics',
      studentId: 'ST001',
      studentName: 'Aarav Sharma',
      class: '11-B',
      score: 47,
      totalMarks: 50,
      percentage: 94,
      grade: 'A+',
      rank: 1,
      totalParticipants: 38,
      timeSpent: 82,
      submittedAt: '2024-08-18 11:22:00',
      status: 'PASSED',
      subjectWiseScores: [
        { subject: 'Mechanics', score: 47, totalMarks: 50 }
      ]
    },
    {
      id: '2',
      examId: '2',
      examTitle: 'Physics Unit Test - Mechanics',
      studentId: 'ST002',
      studentName: 'Priya Patel',
      class: '11-B',
      score: 44,
      totalMarks: 50,
      percentage: 88,
      grade: 'A',
      rank: 2,
      totalParticipants: 38,
      timeSpent: 89,
      submittedAt: '2024-08-18 11:29:00',
      status: 'PASSED',
      subjectWiseScores: [
        { subject: 'Mechanics', score: 44, totalMarks: 50 }
      ]
    },
    {
      id: '3',
      examId: '2',
      examTitle: 'Physics Unit Test - Mechanics',
      studentId: 'ST003',
      studentName: 'Arjun Singh',
      class: '11-B',
      score: 18,
      totalMarks: 50,
      percentage: 36,
      grade: 'F',
      rank: 35,
      totalParticipants: 38,
      timeSpent: 90,
      submittedAt: '2024-08-18 11:30:00',
      status: 'FAILED',
      subjectWiseScores: [
        { subject: 'Mechanics', score: 18, totalMarks: 50 }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DRAFT': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      case 'SCHEDULED': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'ACTIVE': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'COMPLETED': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'CANCELLED': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'PASSED': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'FAILED': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'A': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'B+': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'B': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'C': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'D': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'F': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'UNIT_TEST': return <FileText className="h-4 w-4" />;
      case 'MIDTERM': return <BookOpen className="h-4 w-4" />;
      case 'FINAL': return <GraduationCap className="h-4 w-4" />;
      case 'MOCK': return <Target className="h-4 w-4" />;
      case 'ASSIGNMENT': return <Edit className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'exams', label: 'Examinations', icon: FileText },
    { id: 'questions', label: 'Question Bank', icon: Brain },
    { id: 'results', label: 'Results', icon: Award },
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
                <p className="text-blue-100 text-sm font-medium">Total Exams</p>
                <p className="text-3xl font-bold">156</p>
                <p className="text-blue-100 text-sm">↑ 12 this month</p>
              </div>
              <FileText className="h-12 w-12 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Active Exams</p>
                <p className="text-3xl font-bold">8</p>
                <p className="text-green-100 text-sm">Ongoing assessments</p>
              </div>
              <Play className="h-12 w-12 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Questions</p>
                <p className="text-3xl font-bold">2,847</p>
                <p className="text-purple-100 text-sm">In question bank</p>
              </div>
              <Brain className="h-12 w-12 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Avg Performance</p>
                <p className="text-3xl font-bold">84.2%</p>
                <p className="text-orange-100 text-sm">↑ 3.2% improvement</p>
              </div>
              <TrendingUp className="h-12 w-12 text-orange-200" />
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
              <span>Create Exam</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Brain className="h-6 w-6" />
              <span>Add Questions</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Award className="h-6 w-6" />
              <span>View Results</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Download className="h-6 w-6" />
              <span>Export Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Exams & Performance Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Examinations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {exams.slice(0, 4).map((exam) => (
                <div key={exam.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      {getTypeIcon(exam.type)}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">{exam.title}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{exam.subject} • {exam.class}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Clock className="h-3 w-3 text-slate-400" />
                        <span className="text-xs text-slate-500">{exam.duration} min</span>
                        <span className="text-xs text-slate-500">•</span>
                        <span className="text-xs text-slate-500">{exam.totalMarks} marks</span>
                      </div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(exam.status)}>
                    {exam.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { subject: 'Mathematics', average: 86.5, trend: 'up', exams: 12 },
                { subject: 'Physics', average: 82.3, trend: 'up', exams: 8 },
                { subject: 'Chemistry', average: 79.8, trend: 'down', exams: 10 },
                { subject: 'English', average: 88.2, trend: 'up', exams: 15 },
                { subject: 'Biology', average: 84.7, trend: 'stable', exams: 9 }
              ].map((subject, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <BookOpen className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">{subject.subject}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{subject.exams} exams conducted</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-slate-900 dark:text-white">{subject.average}%</span>
                    {subject.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : subject.trend === 'down' ? (
                      <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
                    ) : (
                      <div className="w-4 h-4 bg-gray-400 rounded-full" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const ExamsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Examination Management</h2>
          <p className="text-slate-600 dark:text-slate-400">Create, schedule, and manage examinations</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Create Exam</span>
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search examinations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Select value={filterSubject} onValueChange={setFilterSubject}>
          <option value="all">All Subjects</option>
          <option value="mathematics">Mathematics</option>
          <option value="physics">Physics</option>
          <option value="chemistry">Chemistry</option>
          <option value="english">English</option>
        </Select>
        <Select value={filterType} onValueChange={setFilterType}>
          <option value="all">All Types</option>
          <option value="unit-test">Unit Test</option>
          <option value="midterm">Mid-term</option>
          <option value="final">Final</option>
          <option value="mock">Mock</option>
        </Select>
      </div>

      {/* Exams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exams.map((exam) => (
          <Card key={exam.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    {getTypeIcon(exam.type)}
                  </div>
                  <Badge variant="secondary">{exam.type.replace('_', ' ')}</Badge>
                </div>
                <Badge className={getStatusColor(exam.status)}>
                  {exam.status}
                </Badge>
              </div>

              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{exam.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">{exam.description}</p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Subject:</span>
                  <span className="font-medium">{exam.subject}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Class:</span>
                  <span className="font-medium">{exam.class}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Duration:</span>
                  <span className="font-medium">{exam.duration} min</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Total Marks:</span>
                  <span className="font-medium">{exam.totalMarks}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Questions:</span>
                  <span className="font-medium">{exam.questions}</span>
                </div>
              </div>

              {exam.status === 'COMPLETED' && (
                <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <span>Completion:</span>
                    <span className="font-medium">{exam.completed}/{exam.participants}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span>Average Score:</span>
                    <span className="font-medium">{exam.averageScore.toFixed(1)}%</span>
                  </div>
                </div>
              )}

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
                Examination & Assessment
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Comprehensive examination system with question banks and automated evaluation
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export Results</span>
              </Button>
              <Button className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Create Exam</span>
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
          {activeTab === 'exams' && <ExamsTab />}
          {['questions', 'results', 'analytics', 'settings'].map(tab => (
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

export default ExaminationPage;