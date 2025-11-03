"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, TrendingUp, Award, BarChart3, Target, Download,
  BookOpen, Calendar, Filter, Search, Eye, ChevronDown, ChevronUp
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

const studentGrades = {
  currentSemester: "Semester 1 - 2024",
  overallGPA: 3.8,
  overallPercentage: 87.5,
  rank: 5,
  totalStudents: 45,
  
  subjects: [
    {
      id: 1,
      name: "Advanced Mathematics",
      code: "MATH301",
      teacher: "Dr. Priya Gupta",
      credits: 4,
      currentGrade: "A",
      percentage: 92,
      gpa: 4.0,
      assignments: [
        { name: "Assignment 1", maxMarks: 20, obtained: 18, percentage: 90, date: "2024-01-10" },
        { name: "Assignment 2", maxMarks: 20, obtained: 19, percentage: 95, date: "2024-01-20" },
        { name: "Mid-term Exam", maxMarks: 100, obtained: 85, percentage: 85, date: "2024-02-01" }
      ],
      attendance: 95,
      trend: "up"
    },
    {
      id: 2,
      name: "Physics",
      code: "PHYS201",
      teacher: "Prof. Rajesh Kumar",
      credits: 4,
      currentGrade: "B+",
      percentage: 85,
      gpa: 3.7,
      assignments: [
        { name: "Lab Report 1", maxMarks: 25, obtained: 22, percentage: 88, date: "2024-01-15" },
        { name: "Quiz 1", maxMarks: 10, obtained: 8, percentage: 80, date: "2024-01-25" },
        { name: "Mid-term Exam", maxMarks: 100, obtained: 82, percentage: 82, date: "2024-02-05" }
      ],
      attendance: 92,
      trend: "stable"
    },
    {
      id: 3,
      name: "Chemistry",
      code: "CHEM201",
      teacher: "Dr. Meera Sharma",
      credits: 4,
      currentGrade: "A-",
      percentage: 88,
      gpa: 3.7,
      assignments: [
        { name: "Lab Practical", maxMarks: 50, obtained: 45, percentage: 90, date: "2024-01-18" },
        { name: "Theory Test", maxMarks: 30, obtained: 25, percentage: 83, date: "2024-01-28" },
        { name: "Project Work", maxMarks: 20, obtained: 18, percentage: 90, date: "2024-02-08" }
      ],
      attendance: 88,
      trend: "up"
    },
    {
      id: 4,
      name: "English Literature",
      code: "ENG201",
      teacher: "Ms. Sarah Johnson",
      credits: 3,
      currentGrade: "B+",
      percentage: 83,
      gpa: 3.3,
      assignments: [
        { name: "Essay 1", maxMarks: 25, obtained: 20, percentage: 80, date: "2024-01-12" },
        { name: "Poetry Analysis", maxMarks: 25, obtained: 22, percentage: 88, date: "2024-01-22" },
        { name: "Mid-term Exam", maxMarks: 100, obtained: 80, percentage: 80, date: "2024-02-03" }
      ],
      attendance: 90,
      trend: "down"
    },
    {
      id: 5,
      name: "Biology",
      code: "BIO201",
      teacher: "Dr. Anjali Patel",
      credits: 4,
      currentGrade: "A",
      percentage: 91,
      gpa: 4.0,
      assignments: [
        { name: "Lab Report", maxMarks: 30, obtained: 28, percentage: 93, date: "2024-01-14" },
        { name: "Unit Test 1", maxMarks: 50, obtained: 45, percentage: 90, date: "2024-01-24" },
        { name: "Research Project", maxMarks: 20, obtained: 19, percentage: 95, date: "2024-02-07" }
      ],
      attendance: 94,
      trend: "up"
    }
  ],

  previousSemesters: [
    {
      semester: "Semester 2 - 2023",
      gpa: 3.6,
      percentage: 85.2,
      rank: 7
    },
    {
      semester: "Semester 1 - 2023",
      gpa: 3.4,
      percentage: 82.8,
      rank: 9
    }
  ]
};

const GradesPage = () => {
  const router = useRouter();
  const [selectedSubject, setSelectedSubject] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterSubject, setFilterSubject] = React.useState("all");
  const [viewMode, setViewMode] = React.useState("overview"); // overview, detailed

  const getGradeColor = (grade) => {
    if (grade === 'A' || grade === 'A+') return 'text-green-600 bg-green-50 border-green-200';
    if (grade === 'A-') return 'text-green-500 bg-green-50 border-green-200';
    if (grade === 'B+') return 'text-blue-600 bg-blue-50 border-blue-200';
    if (grade === 'B' || grade === 'B-') return 'text-blue-500 bg-blue-50 border-blue-200';
    if (grade === 'C+' || grade === 'C') return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getTrendIcon = (trend) => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (trend === 'down') return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
    return <div className="h-4 w-4 bg-slate-300 rounded-full" />;
  };

  const filteredSubjects = studentGrades.subjects.filter(subject => {
    const matchesSearch = subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subject.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterSubject === "all" || subject.name === filterSubject;
    return matchesSearch && matchesFilter;
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
                  My Grades
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {studentGrades.currentSemester}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === 'overview' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('overview')}
                  className="rounded-none border-0"
                >
                  Overview
                </Button>
                <Button
                  variant={viewMode === 'detailed' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('detailed')}
                  className="rounded-none border-0"
                >
                  Detailed
                </Button>
              </div>
              <Button variant="gradient">
                <Download className="h-4 w-4 mr-2" />
                Report Card
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Overall GPA</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{studentGrades.overallGPA}</p>
                  <p className="text-xs text-green-600">Excellent</p>
                </div>
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Percentage</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{studentGrades.overallPercentage}%</p>
                  <p className="text-xs text-blue-600">Above Average</p>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Class Rank</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{studentGrades.rank}</p>
                  <p className="text-xs text-purple-600">of {studentGrades.totalStudents}</p>
                </div>
                <Target className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Subjects</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{studentGrades.subjects.length}</p>
                  <p className="text-xs text-green-600">Current Semester</p>
                </div>
                <BookOpen className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* GPA Trend */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Academic Progress
            </CardTitle>
            <CardDescription>Your GPA trend over semesters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end space-x-8 h-32">
              {studentGrades.previousSemesters.map((sem, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div 
                    className="bg-blue-500 rounded-t-md w-16 mb-2 transition-all hover:bg-blue-600"
                    style={{ height: `${(sem.gpa / 4.0) * 100}px` }}
                  />
                  <div className="text-center">
                    <p className="text-xs text-slate-600 dark:text-slate-400">{sem.semester.split(' - ')[0]}</p>
                    <p className="text-sm font-bold">{sem.gpa}</p>
                  </div>
                </div>
              ))}
              <div className="flex flex-col items-center">
                <div 
                  className="bg-green-500 rounded-t-md w-16 mb-2 transition-all hover:bg-green-600"
                  style={{ height: `${(studentGrades.overallGPA / 4.0) * 100}px` }}
                />
                <div className="text-center">
                  <p className="text-xs text-slate-600 dark:text-slate-400">Current</p>
                  <p className="text-sm font-bold">{studentGrades.overallGPA}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search subjects or teachers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)}>
                <option value="all">All Subjects</option>
                {studentGrades.subjects.map(subject => (
                  <option key={subject.id} value={subject.name}>{subject.name}</option>
                ))}
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Subject Grades */}
        <div className="space-y-6">
          {filteredSubjects.map((subject) => (
            <Card key={subject.id} className="hover-lift">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <CardTitle className="text-lg">{subject.name}</CardTitle>
                      <CardDescription>
                        {subject.code} • {subject.teacher} • {subject.credits} Credits
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {getTrendIcon(subject.trend)}
                    <div className={cn("px-3 py-1 rounded-lg border", getGradeColor(subject.currentGrade))}>
                      <span className="font-bold">{subject.currentGrade}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <p className="text-xs text-slate-600 dark:text-slate-400">Current Grade</p>
                    <p className="text-lg font-bold">{subject.currentGrade}</p>
                  </div>
                  <div className="text-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <p className="text-xs text-slate-600 dark:text-slate-400">Percentage</p>
                    <p className="text-lg font-bold">{subject.percentage}%</p>
                  </div>
                  <div className="text-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <p className="text-xs text-slate-600 dark:text-slate-400">GPA Points</p>
                    <p className="text-lg font-bold">{subject.gpa}</p>
                  </div>
                  <div className="text-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <p className="text-xs text-slate-600 dark:text-slate-400">Attendance</p>
                    <p className="text-lg font-bold">{subject.attendance}%</p>
                  </div>
                </div>

                {viewMode === 'detailed' && (
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-white mb-3">Assessment Breakdown</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-slate-200 dark:border-slate-700">
                            <th className="text-left p-2 font-medium text-slate-600 dark:text-slate-400">Assessment</th>
                            <th className="text-center p-2 font-medium text-slate-600 dark:text-slate-400">Max Marks</th>
                            <th className="text-center p-2 font-medium text-slate-600 dark:text-slate-400">Obtained</th>
                            <th className="text-center p-2 font-medium text-slate-600 dark:text-slate-400">Percentage</th>
                            <th className="text-center p-2 font-medium text-slate-600 dark:text-slate-400">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {subject.assignments.map((assignment, index) => (
                            <tr key={index} className="border-b border-slate-100 dark:border-slate-800">
                              <td className="p-2 font-medium">{assignment.name}</td>
                              <td className="p-2 text-center">{assignment.maxMarks}</td>
                              <td className="p-2 text-center">{assignment.obtained}</td>
                              <td className="p-2 text-center">
                                <Badge variant={assignment.percentage >= 90 ? 'success' : assignment.percentage >= 80 ? 'info' : assignment.percentage >= 70 ? 'warning' : 'destructive'}>
                                  {assignment.percentage}%
                                </Badge>
                              </td>
                              <td className="p-2 text-center text-slate-600 dark:text-slate-400">
                                {new Date(assignment.date).toLocaleDateString('en-GB')}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                <div className="flex space-x-2 pt-4 border-t mt-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => setSelectedSubject(selectedSubject === subject.id ? null : subject.id)}
                  >
                    {selectedSubject === subject.id ? <ChevronUp className="h-4 w-4 mr-1" /> : <ChevronDown className="h-4 w-4 mr-1" />}
                    {selectedSubject === subject.id ? 'Hide Details' : 'Show Details'}
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-1" />
                    View Assignments
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSubjects.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <BookOpen className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 dark:text-slate-400">
                No subjects found matching your criteria.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default GradesPage;