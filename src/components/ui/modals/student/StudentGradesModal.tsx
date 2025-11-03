"use client";

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  Award, 
  Book, 
  Calendar,
  Download,
  Search,
  Filter,
  BarChart3,
  Target
} from 'lucide-react';

interface Grade {
  id: string;
  subject: string;
  subjectCode: string;
  assessmentType: 'exam' | 'assignment' | 'quiz' | 'project';
  assessmentName: string;
  score: number;
  maxScore: number;
  percentage: number;
  grade: string;
  date: string;
  term: string;
  teacher: string;
  weight: number;
  feedback?: string;
}

interface GradeSummary {
  subject: string;
  currentGPA: number;
  totalCredits: number;
  averageScore: number;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
}

interface StudentGradesModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentId: string;
  subjectId?: string;
  termId?: string;
  onViewDetails?: (grade: Grade) => void;
}

const StudentGradesModal: React.FC<StudentGradesModalProps> = ({
  isOpen,
  onClose,
  studentId,
  subjectId,
  termId,
  onViewDetails
}) => {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [gradeSummary, setGradeSummary] = useState<GradeSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState(subjectId || 'all');
  const [selectedTerm, setSelectedTerm] = useState(termId || 'current');
  const [selectedAssessmentType, setSelectedAssessmentType] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - replace with actual API call
  const mockGrades: Grade[] = [
    {
      id: '1',
      subject: 'Mathematics',
      subjectCode: 'MATH101',
      assessmentType: 'exam',
      assessmentName: 'Mid-term Examination',
      score: 85,
      maxScore: 100,
      percentage: 85,
      grade: 'A',
      date: '2024-09-15',
      term: 'Term 1',
      teacher: 'Dr. Priya Gupta',
      weight: 0.3,
      feedback: 'Excellent work on calculus problems. Need improvement in algebra.'
    },
    {
      id: '2',
      subject: 'Physics',
      subjectCode: 'PHY101',
      assessmentType: 'assignment',
      assessmentName: 'Lab Report - Motion',
      score: 92,
      maxScore: 100,
      percentage: 92,
      grade: 'A+',
      date: '2024-09-10',
      term: 'Term 1',
      teacher: 'Prof. Rajesh Kumar',
      weight: 0.2,
      feedback: 'Outstanding analysis and presentation.'
    },
    {
      id: '3',
      subject: 'Chemistry',
      subjectCode: 'CHEM101',
      assessmentType: 'quiz',
      assessmentName: 'Organic Chemistry Quiz',
      score: 78,
      maxScore: 100,
      percentage: 78,
      grade: 'B+',
      date: '2024-09-08',
      term: 'Term 1',
      teacher: 'Dr. Sarah Wilson',
      weight: 0.1
    },
    {
      id: '4',
      subject: 'English',
      subjectCode: 'ENG101',
      assessmentType: 'project',
      assessmentName: 'Literature Analysis Project',
      score: 88,
      maxScore: 100,
      percentage: 88,
      grade: 'A',
      date: '2024-09-05',
      term: 'Term 1',
      teacher: 'Ms. Emily Johnson',
      weight: 0.25,
      feedback: 'Great interpretation and writing style. Minor grammar improvements needed.'
    }
  ];

  const mockGradeSummary: GradeSummary[] = [
    {
      subject: 'Mathematics',
      currentGPA: 3.5,
      totalCredits: 4,
      averageScore: 85,
      trend: 'up',
      lastUpdated: '2024-09-15'
    },
    {
      subject: 'Physics',
      currentGPA: 3.8,
      totalCredits: 4,
      averageScore: 92,
      trend: 'stable',
      lastUpdated: '2024-09-10'
    },
    {
      subject: 'Chemistry',
      currentGPA: 3.2,
      totalCredits: 3,
      averageScore: 78,
      trend: 'down',
      lastUpdated: '2024-09-08'
    },
    {
      subject: 'English',
      currentGPA: 3.6,
      totalCredits: 3,
      averageScore: 88,
      trend: 'up',
      lastUpdated: '2024-09-05'
    }
  ];

  useEffect(() => {
    const fetchGrades = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setGrades(mockGrades);
        setGradeSummary(mockGradeSummary);
      } catch (error) {
        console.error('Failed to fetch grades:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      fetchGrades();
    }
  }, [isOpen, studentId, termId]);

  // Filter grades based on search and filters
  const filteredGrades = grades.filter(grade => {
    const matchesSearch = grade.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grade.assessmentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || grade.subject === selectedSubject;
    const matchesTerm = selectedTerm === 'current' || grade.term === selectedTerm;
    const matchesType = selectedAssessmentType === 'all' || grade.assessmentType === selectedAssessmentType;

    return matchesSearch && matchesSubject && matchesTerm && matchesType;
  });

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600 bg-green-50';
    if (percentage >= 80) return 'text-blue-600 bg-blue-50';
    if (percentage >= 70) return 'text-yellow-600 bg-yellow-50';
    if (percentage >= 60) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <BarChart3 className="h-4 w-4 text-gray-600" />;
    }
  };

  const overallGPA = gradeSummary.reduce((acc, summary, index) => 
    acc + summary.currentGPA, 0) / gradeSummary.length;

  const handleDownloadReport = () => {
    // Simulate download
    console.log('Downloading grade report...');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-blue-600" />
            My Grades & Academic Performance
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2">Loading grades...</span>
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">Detailed Grades</TabsTrigger>
              <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Overall GPA</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">
                      {overallGPA.toFixed(2)}
                    </div>
                    <p className="text-xs text-muted-foreground">out of 4.0</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Credits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">
                      {gradeSummary.reduce((acc, s) => acc + s.totalCredits, 0)}
                    </div>
                    <p className="text-xs text-muted-foreground">completed</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-600">
                      {Math.round(gradeSummary.reduce((acc, s) => acc + s.averageScore, 0) / gradeSummary.length)}%
                    </div>
                    <p className="text-xs text-muted-foreground">across all subjects</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Subjects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-600">
                      {gradeSummary.length}
                    </div>
                    <p className="text-xs text-muted-foreground">enrolled</p>
                  </CardContent>
                </Card>
              </div>

              {/* Subject Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Subject Performance</CardTitle>
                  <CardDescription>Your current standing in each subject</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {gradeSummary.map((summary, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Book className="h-5 w-5 text-blue-600" />
                          <div>
                            <h4 className="font-medium">{summary.subject}</h4>
                            <p className="text-sm text-muted-foreground">
                              {summary.totalCredits} credits • Last updated: {summary.lastUpdated}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="font-bold text-lg">
                              GPA: {summary.currentGPA.toFixed(1)}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Avg: {summary.averageScore}%
                            </div>
                          </div>
                          {getTrendIcon(summary.trend)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Detailed Grades Tab */}
            <TabsContent value="details" className="space-y-4">
              {/* Filters */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Filter & Search</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search grades..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                    
                    <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Subjects</SelectItem>
                        {gradeSummary.map(summary => (
                          <SelectItem key={summary.subject} value={summary.subject}>
                            {summary.subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={selectedTerm} onValueChange={setSelectedTerm}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Term" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="current">Current Term</SelectItem>
                        <SelectItem value="Term 1">Term 1</SelectItem>
                        <SelectItem value="Term 2">Term 2</SelectItem>
                        <SelectItem value="Term 3">Term 3</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={selectedAssessmentType} onValueChange={setSelectedAssessmentType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Assessment Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="exam">Exams</SelectItem>
                        <SelectItem value="assignment">Assignments</SelectItem>
                        <SelectItem value="quiz">Quizzes</SelectItem>
                        <SelectItem value="project">Projects</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Grades List */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Grade Details</CardTitle>
                    <CardDescription>
                      Showing {filteredGrades.length} of {grades.length} grades
                    </CardDescription>
                  </div>
                  <Button variant="outline" onClick={handleDownloadReport}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {filteredGrades.map((grade) => (
                      <div 
                        key={grade.id} 
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => onViewDetails?.(grade)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold">{grade.assessmentName}</h4>
                              <Badge variant="outline" className="text-xs">
                                {grade.assessmentType}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground space-y-1">
                              <p>{grade.subject} ({grade.subjectCode}) • {grade.teacher}</p>
                              <p className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {grade.date} • {grade.term}
                              </p>
                              {grade.feedback && (
                                <p className="text-xs italic">{grade.feedback}</p>
                              )}
                            </div>
                          </div>
                          <div className="text-right space-y-1">
                            <Badge className={`${getGradeColor(grade.percentage)} border`}>
                              {grade.grade}
                            </Badge>
                            <div className="text-lg font-bold">
                              {grade.score}/{grade.maxScore}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {grade.percentage}%
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Performance Analytics
                  </CardTitle>
                  <CardDescription>Track your academic progress over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Subject Progress Bars */}
                    {gradeSummary.map((summary, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{summary.subject}</span>
                          <span className="text-sm text-muted-foreground">
                            {summary.averageScore}%
                          </span>
                        </div>
                        <Progress value={summary.averageScore} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Goals Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Academic Goals</CardTitle>
                  <CardDescription>Set and track your academic objectives</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Set your academic goals to track progress</p>
                    <Button className="mt-4" variant="outline">
                      Set Goals
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudentGradesModal;