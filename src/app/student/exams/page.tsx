"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, Calendar, Clock, Target, Award, AlertCircle, 
  BookOpen, FileText, Eye, Download, Filter, Search, Bell
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

const studentExams = {
  upcoming: [
    {
      id: 1,
      subject: "Advanced Mathematics",
      type: "Unit Test",
      date: "2024-02-15",
      time: "10:00 AM",
      duration: "2 hours",
      location: "Room 301",
      syllabus: "Chapters 1-3: Calculus and Integration",
      maxMarks: 100,
      status: "scheduled",
      instructions: ["Bring calculator", "No mobile phones", "Arrive 15 minutes early"]
    },
    {
      id: 2,
      subject: "Physics",
      type: "Practical Exam",
      date: "2024-02-18",
      time: "2:00 PM",
      duration: "3 hours",
      location: "Physics Lab",
      syllabus: "All experiments from Term 1",
      maxMarks: 50,
      status: "scheduled",
      instructions: ["Bring lab coat", "Complete observation book", "Safety first"]
    },
    {
      id: 3,
      subject: "Chemistry",
      type: "Theory Exam",
      date: "2024-02-20",
      time: "9:00 AM",
      duration: "3 hours",
      location: "Room 205",
      syllabus: "Organic Chemistry - Complete",
      maxMarks: 100,
      status: "scheduled",
      instructions: ["Periodic table provided", "Use blue/black pen only"]
    }
  ],
  completed: [
    {
      id: 4,
      subject: "English Literature",
      type: "Essay Exam",
      date: "2024-01-25",
      time: "11:00 AM",
      duration: "2 hours",
      location: "Room 102",
      maxMarks: 80,
      obtainedMarks: 72,
      grade: "A",
      percentage: 90,
      status: "completed",
      feedback: "Excellent analysis of themes. Work on grammar."
    },
    {
      id: 5,
      subject: "Biology",
      type: "Unit Test",
      date: "2024-01-20",
      time: "10:00 AM",
      duration: "1.5 hours",
      location: "Room 208",
      maxMarks: 50,
      obtainedMarks: 42,
      grade: "B+",
      percentage: 84,
      status: "completed",
      feedback: "Good understanding of concepts. Practice more diagrams."
    }
  ]
};

const ExamsPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState('upcoming');
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterSubject, setFilterSubject] = React.useState("all");

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'info';
      case 'completed': return 'success';
      case 'missed': return 'destructive';
      default: return 'default';
    }
  };

  const getGradeColor = (grade) => {
    if (grade === 'A' || grade === 'A+') return 'text-green-600';
    if (grade === 'B' || grade === 'B+') return 'text-blue-600';
    if (grade === 'C' || grade === 'C+') return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredExams = (activeTab === 'upcoming' ? studentExams.upcoming : studentExams.completed)
    .filter(exam => {
      const matchesSearch = exam.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           exam.type.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSubject = filterSubject === "all" || exam.subject === filterSubject;
      return matchesSearch && matchesSubject;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Header */}
      <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => router.push('/student/dashboard')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white">
                  My Exams
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  View your exam schedule and results
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="gradient">
                <Download className="h-4 w-4 mr-2" />
                Download Schedule
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Upcoming</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{studentExams.upcoming.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Completed</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{studentExams.completed.length}</p>
                </div>
                <Target className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Average Score</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">87%</p>
                </div>
                <Award className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">This Week</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">2</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs and Filters */}
        <div className="flex flex-col space-y-4 mb-6">
          <div className="flex space-x-1 p-1 bg-white/50 dark:bg-slate-800/50 rounded-lg w-fit">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-all",
                activeTab === 'upcoming'
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              Upcoming Exams
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-all",
                activeTab === 'completed'
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              Results
            </button>
          </div>

          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    placeholder="Search exams..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)}>
                  <option value="all">All Subjects</option>
                  <option value="Advanced Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                  <option value="English Literature">English</option>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Exam Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredExams.map((exam) => (
            <Card key={exam.id} className="hover-lift">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{exam.subject}</CardTitle>
                    <CardDescription>{exam.type}</CardDescription>
                  </div>
                  <Badge variant={getStatusColor(exam.status)}>
                    {exam.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-slate-600 dark:text-slate-400">Date & Time</p>
                      <p className="font-medium">{formatDate(exam.date)} at {exam.time}</p>
                    </div>
                    <div>
                      <p className="text-slate-600 dark:text-slate-400">Duration</p>
                      <p className="font-medium">{exam.duration}</p>
                    </div>
                    <div>
                      <p className="text-slate-600 dark:text-slate-400">Location</p>
                      <p className="font-medium">{exam.location}</p>
                    </div>
                    <div>
                      <p className="text-slate-600 dark:text-slate-400">Max Marks</p>
                      <p className="font-medium">{exam.maxMarks}</p>
                    </div>
                  </div>

                  {exam.status === 'completed' && (
                    <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-xs text-slate-600 dark:text-slate-400">Score</p>
                          <p className="text-lg font-bold">{exam.obtainedMarks}/{exam.maxMarks}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-600 dark:text-slate-400">Grade</p>
                          <p className={cn("text-lg font-bold", getGradeColor(exam.grade))}>{exam.grade}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-600 dark:text-slate-400">Percentage</p>
                          <p className="text-lg font-bold">{exam.percentage}%</p>
                        </div>
                      </div>
                      {exam.feedback && (
                        <div className="mt-3 pt-3 border-t">
                          <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Feedback</p>
                          <p className="text-sm">{exam.feedback}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {exam.status === 'scheduled' && exam.syllabus && (
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white mb-2">Syllabus</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{exam.syllabus}</p>
                    </div>
                  )}

                  {exam.instructions && (
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white mb-2">Instructions</p>
                      <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                        {exam.instructions.map((instruction, index) => (
                          <li key={index} className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>{instruction}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex space-x-2 pt-3 border-t">
                    {exam.status === 'completed' && (
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    )}
                    {exam.status === 'scheduled' && (
                      <>
                        <Button variant="outline" size="sm" className="flex-1">
                          <BookOpen className="h-4 w-4 mr-1" />
                          Study Material
                        </Button>
                        <Button variant="primary" size="sm" className="flex-1">
                          <Bell className="h-4 w-4 mr-1" />
                          Set Reminder
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredExams.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Target className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 dark:text-slate-400">
                No exams found matching your criteria.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ExamsPage;