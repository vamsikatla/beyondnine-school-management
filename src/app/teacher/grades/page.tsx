"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Calculator, ArrowLeft, Search, Download, BarChart3, Users,
  TrendingUp, Award, FileText, Plus, Edit, Save
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { DataTable } from '@/components/ui/DataTable';
import { cn } from '@/lib/utils';

const studentGrades = [
  {
    id: 1,
    name: "Aarav Sharma",
    rollNumber: "12A001",
    class: "Class 12-A",
    assignments: [
      { name: "Quiz #1", score: 85, maxScore: 100, weight: 20 },
      { name: "Project", score: 92, maxScore: 100, weight: 30 },
      { name: "Midterm", score: 88, maxScore: 100, weight: 50 }
    ],
    totalScore: 265,
    maxTotalScore: 300,
    percentage: 88.3,
    grade: "A"
  },
  {
    id: 2,
    name: "Priya Patel",
    rollNumber: "12A002",
    class: "Class 12-A",
    assignments: [
      { name: "Quiz #1", score: 92, maxScore: 100, weight: 20 },
      { name: "Project", score: 88, maxScore: 100, weight: 30 },
      { name: "Midterm", score: 95, maxScore: 100, weight: 50 }
    ],
    totalScore: 275,
    maxTotalScore: 300,
    percentage: 91.7,
    grade: "A+"
  },
  {
    id: 3,
    name: "Rahul Singh",
    rollNumber: "12A003",
    class: "Class 12-A",
    assignments: [
      { name: "Quiz #1", score: 76, maxScore: 100, weight: 20 },
      { name: "Project", score: 82, maxScore: 100, weight: 30 },
      { name: "Midterm", score: 79, maxScore: 100, weight: 50 }
    ],
    totalScore: 237,
    maxTotalScore: 300,
    percentage: 79.0,
    grade: "B+"
  }
];

const GradesPage = () => {
  const router = useRouter();
  const [grades, setGrades] = React.useState(studentGrades);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedClass, setSelectedClass] = React.useState("Class 12-A");
  const [view, setView] = React.useState("overview"); // overview, detailed, analytics

  const filteredGrades = grades.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const classAverage = (grades.reduce((sum, student) => sum + student.percentage, 0) / grades.length).toFixed(1);
  const highestScore = Math.max(...grades.map(s => s.percentage));
  const lowestScore = Math.min(...grades.map(s => s.percentage));

  const gradeDistribution = {
    'A+': grades.filter(s => s.percentage >= 95).length,
    'A': grades.filter(s => s.percentage >= 85 && s.percentage < 95).length,
    'B+': grades.filter(s => s.percentage >= 75 && s.percentage < 85).length,
    'B': grades.filter(s => s.percentage >= 65 && s.percentage < 75).length,
    'C': grades.filter(s => s.percentage < 65).length,
  };

  const gradeColumns = [
    {
      key: 'name',
      label: 'Student',
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
            {value.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p className="font-medium text-slate-900 dark:text-white">{value}</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">{row.rollNumber}</p>
          </div>
        </div>
      )
    },
    {
      key: 'class',
      label: 'Class',
      sortable: true
    },
    {
      key: 'percentage',
      label: 'Overall %',
      sortable: true,
      render: (value) => (
        <span className={cn(
          "font-medium",
          value >= 90 ? "text-green-600" :
          value >= 75 ? "text-blue-600" :
          value >= 60 ? "text-yellow-600" : "text-red-600"
        )}>
          {value}%
        </span>
      )
    },
    {
      key: 'grade',
      label: 'Grade',
      render: (value) => (
        <Badge variant={
          value === 'A+' ? 'success' :
          value === 'A' ? 'info' :
          value === 'B+' ? 'warning' : 'secondary'
        }>
          {value}
        </Badge>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

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
                  Grades Management
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  View and manage student grades and performance
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Grades
              </Button>
              <Button variant="gradient">
                <Plus className="h-4 w-4 mr-2" />
                Add Grades
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                <option value="Class 12-A">Class 12-A</option>
                <option value="Class 11-B">Class 11-B</option>
                <option value="Class 12-C">Class 12-C</option>
              </Select>
              <div className="flex space-x-2">
                <Button 
                  variant={view === 'overview' ? 'default' : 'outline'}
                  onClick={() => setView('overview')}
                >
                  Overview
                </Button>
                <Button 
                  variant={view === 'analytics' ? 'default' : 'outline'}
                  onClick={() => setView('analytics')}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Class Average</p>
                  <p className="text-2xl font-bold text-blue-600">{classAverage}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Highest Score</p>
                  <p className="text-2xl font-bold text-green-600">{highestScore}%</p>
                </div>
                <Award className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Lowest Score</p>
                  <p className="text-2xl font-bold text-red-600">{lowestScore}%</p>
                </div>
                <Calculator className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Total Students</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{grades.length}</p>
                </div>
                <Users className="h-8 w-8 text-slate-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {view === 'analytics' && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Grade Distribution</CardTitle>
              <CardDescription>Performance overview for {selectedClass}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-4">
                {Object.entries(gradeDistribution).map(([grade, count]) => (
                  <div key={grade} className="text-center">
                    <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg mb-2">
                      <p className="text-2xl font-bold text-blue-600">{count}</p>
                    </div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Grade {grade}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Grades Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calculator className="h-5 w-5 mr-2" />
              Student Grades - {selectedClass}
            </CardTitle>
            <CardDescription>
              Overall performance and grades for all students
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={gradeColumns}
              data={filteredGrades}
              searchKey="name"
              searchPlaceholder="Search students..."
              showSearch={false}
              showPagination={true}
              pageSize={10}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GradesPage;