"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  BookOpen,
  TrendingUp,
  TrendingDown,
  Award,
  BarChart3,
  Download,
  Search,
  Filter,
  Calendar,
  Target,
  Star,
  Trophy
} from 'lucide-react';

const StudentAcademics: React.FC = () => {
  const [selectedTerm, setSelectedTerm] = useState('current');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [academicData] = useState({
    overallGPA: 3.6,
    currentTerm: 'Fall 2024',
    totalCredits: 120,
    completedCredits: 90,
    rank: 15,
    totalStudents: 150
  });

  const [subjects] = useState([
    {
      id: '1',
      name: 'Advanced Mathematics',
      code: 'MATH401',
      teacher: 'Dr. Priya Gupta',
      credits: 4,
      currentGrade: 'A',
      percentage: 92,
      gpa: 4.0,
      trend: 'up',
      assignments: 5,
      exams: 2,
      lastUpdated: '2024-09-25'
    },
    {
      id: '2',
      name: 'Applied Physics',
      code: 'PHY301',
      teacher: 'Prof. Rajesh Kumar',
      credits: 4,
      currentGrade: 'A-',
      percentage: 88,
      gpa: 3.7,
      trend: 'stable',
      assignments: 4,
      exams: 2,
      lastUpdated: '2024-09-24'
    },
    {
      id: '3',
      name: 'Organic Chemistry',
      code: 'CHEM301',
      teacher: 'Dr. Sarah Wilson',
      credits: 3,
      currentGrade: 'B+',
      percentage: 85,
      gpa: 3.3,
      trend: 'down',
      assignments: 6,
      exams: 1,
      lastUpdated: '2024-09-23'
    },
    {
      id: '4',
      name: 'English Literature',
      code: 'ENG201',
      teacher: 'Ms. Emily Johnson',
      credits: 3,
      currentGrade: 'A',
      percentage: 90,
      gpa: 4.0,
      trend: 'up',
      assignments: 3,
      exams: 2,
      lastUpdated: '2024-09-25'
    },
    {
      id: '5',
      name: 'Computer Science',
      code: 'CS201',
      teacher: 'Dr. Michael Chang',
      credits: 4,
      currentGrade: 'A-',
      percentage: 87,
      gpa: 3.7,
      trend: 'up',
      assignments: 4,
      exams: 1,
      lastUpdated: '2024-09-22'
    }
  ]);

  const [recentGrades] = useState([
    {
      id: '1',
      subject: 'Mathematics',
      assessment: 'Calculus Test 2',
      score: 95,
      maxScore: 100,
      grade: 'A+',
      date: '2024-09-25',
      feedback: 'Excellent work on complex integrals!'
    },
    {
      id: '2',
      subject: 'Physics',
      assessment: 'Lab Report - Motion',
      score: 88,
      maxScore: 100,
      grade: 'A-',
      date: '2024-09-24',
      feedback: 'Good analysis, minor calculation errors.'
    },
    {
      id: '3',
      subject: 'Chemistry',
      assessment: 'Organic Reactions Quiz',
      score: 82,
      maxScore: 100,
      grade: 'B+',
      date: '2024-09-23',
      feedback: 'Review mechanism pathways.'
    },
    {
      id: '4',
      subject: 'English',
      assessment: 'Essay - Shakespeare Analysis',
      score: 92,
      maxScore: 100,
      grade: 'A',
      date: '2024-09-22',
      feedback: 'Insightful analysis and excellent writing.'
    }
  ]);

  const [achievements] = useState([
    {
      id: '1',
      title: 'Dean\'s List',
      description: 'Achieved GPA above 3.5 for consecutive terms',
      icon: <Trophy className="h-5 w-5" />,
      date: '2024-09-01',
      level: 'gold'
    },
    {
      id: '2',
      title: 'Perfect Attendance',
      description: 'No absences in Mathematics for the term',
      icon: <Award className="h-5 w-5" />,
      date: '2024-08-15',
      level: 'silver'
    },
    {
      id: '3',
      title: 'Top Performer',
      description: 'Highest score in Physics midterm exam',
      icon: <Star className="h-5 w-5" />,
      date: '2024-07-20',
      level: 'bronze'
    }
  ]);

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+':
      case 'A':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'A-':
      case 'B+':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'B':
      case 'B-':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'C+':
      case 'C':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-red-100 text-red-800 border-red-200';
    }
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

  const getAchievementColor = (level: string) => {
    switch (level) {
      case 'gold':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'silver':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'bronze':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  const handleViewGradeDetails = (subjectId: string) => {
    console.log('Viewing grade details for subject:', subjectId);
    alert(`Opening detailed grades for subject ${subjectId}`);
  };

  const handleDownloadTranscript = () => {
    console.log('Downloading transcript');
    alert('Downloading official transcript...');
  };

  const handleSetGoal = () => {
    console.log('Setting academic goal');
    alert('Opening goal setting form...');
  };

  const filteredSubjects = subjects.filter(subject => {
    const matchesSearch = subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subject.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedSubject === 'all' || subject.id === selectedSubject;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Academic Overview Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 text-white">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold">{academicData.overallGPA}</div>
            <div className="text-green-100">Overall GPA</div>
            <div className="text-sm text-green-200">out of 4.0</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{academicData.completedCredits}</div>
            <div className="text-green-100">Credits Earned</div>
            <div className="text-sm text-green-200">of {academicData.totalCredits} total</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">#{academicData.rank}</div>
            <div className="text-green-100">Class Rank</div>
            <div className="text-sm text-green-200">out of {academicData.totalStudents}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{subjects.length}</div>
            <div className="text-green-100">Current Courses</div>
            <div className="text-sm text-green-200">{academicData.currentTerm}</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Button
          onClick={() => handleViewGradeDetails('all')}
          className="h-auto p-4 flex flex-col items-center space-y-2"
          variant="outline"
        >
          <BookOpen className="h-6 w-6 text-blue-600" />
          <div className="text-center">
            <div className="font-medium">View All Grades</div>
            <div className="text-xs text-muted-foreground">Detailed breakdown</div>
          </div>
        </Button>

        <Button
          onClick={handleDownloadTranscript}
          className="h-auto p-4 flex flex-col items-center space-y-2"
          variant="outline"
        >
          <Download className="h-6 w-6 text-green-600" />
          <div className="text-center">
            <div className="font-medium">Download Transcript</div>
            <div className="text-xs text-muted-foreground">Official document</div>
          </div>
        </Button>

        <Button
          onClick={handleSetGoal}
          className="h-auto p-4 flex flex-col items-center space-y-2"
          variant="outline"
        >
          <Target className="h-6 w-6 text-purple-600" />
          <div className="text-center">
            <div className="font-medium">Set Academic Goals</div>
            <div className="text-xs text-muted-foreground">Track progress</div>
          </div>
        </Button>

        <Button
          onClick={() => console.log('View analytics')}
          className="h-auto p-4 flex flex-col items-center space-y-2"
          variant="outline"
        >
          <BarChart3 className="h-6 w-6 text-orange-600" />
          <div className="text-center">
            <div className="font-medium">Performance Analytics</div>
            <div className="text-xs text-muted-foreground">Trends & insights</div>
          </div>
        </Button>
      </div>

      <Tabs defaultValue="subjects" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="subjects">Current Subjects</TabsTrigger>
          <TabsTrigger value="grades">Recent Grades</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="analytics">Performance</TabsTrigger>
        </TabsList>

        {/* Current Subjects Tab */}
        <TabsContent value="subjects" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search subjects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={selectedTerm} onValueChange={setSelectedTerm}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Select Term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current">Current Term</SelectItem>
                    <SelectItem value="fall2024">Fall 2024</SelectItem>
                    <SelectItem value="spring2024">Spring 2024</SelectItem>
                    <SelectItem value="winter2024">Winter 2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Subjects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSubjects.map((subject) => (
              <Card key={subject.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{subject.name}</CardTitle>
                      <CardDescription>{subject.code} • {subject.teacher}</CardDescription>
                    </div>
                    <div className="text-right">
                      <Badge className={getGradeColor(subject.currentGrade)}>
                        {subject.currentGrade}
                      </Badge>
                      {getTrendIcon(subject.trend)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Overall Score</span>
                        <span>{subject.percentage}%</span>
                      </div>
                      <Progress value={subject.percentage} className="h-2" />
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-blue-600">{subject.gpa}</div>
                        <div className="text-xs text-muted-foreground">GPA</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-green-600">{subject.assignments}</div>
                        <div className="text-xs text-muted-foreground">Assignments</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-purple-600">{subject.exams}</div>
                        <div className="text-xs text-muted-foreground">Exams</div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewGradeDetails(subject.id)}
                        className="flex-1"
                      >
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => console.log('View assignments for', subject.id)}
                        className="flex-1"
                      >
                        Assignments
                      </Button>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      Last updated: {new Date(subject.lastUpdated).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Recent Grades Tab */}
        <TabsContent value="grades" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Grade Updates</CardTitle>
              <CardDescription>Your latest assessment results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentGrades.map((grade) => (
                  <div key={grade.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h4 className="font-medium">{grade.assessment}</h4>
                        <Badge className={getGradeColor(grade.grade)}>
                          {grade.grade}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {grade.subject} • {new Date(grade.date).toLocaleDateString()}
                      </p>
                      {grade.feedback && (
                        <p className="text-sm text-blue-600 mt-2 italic">{grade.feedback}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">
                        {grade.score}/{grade.maxScore}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {Math.round((grade.score / grade.maxScore) * 100)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Academic Achievements</CardTitle>
              <CardDescription>Your accomplishments and recognitions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className={`p-4 rounded-lg border-2 ${getAchievementColor(achievement.level)}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-full ${
                        achievement.level === 'gold' ? 'bg-yellow-200' :
                        achievement.level === 'silver' ? 'bg-gray-200' : 'bg-amber-200'
                      }`}>
                        {achievement.icon}
                      </div>
                      <h3 className="font-semibold">{achievement.title}</h3>
                    </div>
                    <p className="text-sm mb-2">{achievement.description}</p>
                    <p className="text-xs text-muted-foreground">
                      Earned on {new Date(achievement.date).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
                <CardDescription>Your grades across all subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjects.map((subject) => (
                    <div key={subject.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{subject.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{subject.percentage}%</span>
                          <Badge className={getGradeColor(subject.currentGrade)} variant="outline">
                            {subject.currentGrade}
                          </Badge>
                        </div>
                      </div>
                      <Progress value={subject.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>GPA Trend</CardTitle>
                <CardDescription>Your academic performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    {academicData.overallGPA}
                  </div>
                  <div className="text-muted-foreground mb-4">Current GPA</div>
                  <div className="flex items-center justify-center gap-2 text-green-600">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm">+0.2 from last term</span>
                  </div>
                </div>
                <div className="space-y-3 mt-6">
                  <div className="flex justify-between text-sm">
                    <span>Fall 2024 (Current)</span>
                    <span className="font-medium">{academicData.overallGPA}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Spring 2024</span>
                    <span className="font-medium">3.4</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Winter 2024</span>
                    <span className="font-medium">3.2</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Fall 2023</span>
                    <span className="font-medium">3.1</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Academic Goals</CardTitle>
              <CardDescription>Track your progress towards your targets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Maintain GPA above 3.5</h4>
                    <Badge className="bg-green-100 text-green-800">On Track</Badge>
                  </div>
                  <Progress value={((academicData.overallGPA - 3.0) / (4.0 - 3.0)) * 100} className="h-2" />
                  <p className="text-sm text-muted-foreground mt-2">
                    Current: {academicData.overallGPA} / Target: 3.5+
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Complete 120 Credits</h4>
                    <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
                  </div>
                  <Progress value={(academicData.completedCredits / academicData.totalCredits) * 100} className="h-2" />
                  <p className="text-sm text-muted-foreground mt-2">
                    Progress: {academicData.completedCredits} / {academicData.totalCredits} credits
                  </p>
                </div>
              </div>
              
              <Button onClick={handleSetGoal} className="w-full mt-4">
                <Target className="h-4 w-4 mr-2" />
                Set New Goal
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentAcademics;