"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, BookOpen, Users, Calendar, Clock, Star, Award,
  Play, Download, FileText, MessageCircle, Search, Filter, Eye
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

const studentCourses = {
  enrolled: [
    {
      id: 1,
      title: "Advanced Mathematics",
      code: "MATH301",
      instructor: "Dr. Priya Gupta",
      description: "Advanced calculus, differential equations, and analytical geometry",
      credits: 4,
      semester: "Spring 2024",
      schedule: "Mon, Wed, Fri - 10:00-11:30 AM",
      location: "Room 301",
      progress: 75,
      grade: "A",
      attendance: 92,
      totalLectures: 45,
      completedLectures: 34,
      assignments: 8,
      submittedAssignments: 7,
      nextClass: "2024-02-15T10:00:00",
      materials: [
        { name: "Lecture Notes - Chapter 5", type: "pdf", size: "2.1 MB" },
        { name: "Assignment 8", type: "doc", size: "1.5 MB" },
        { name: "Video Lecture - Integration", type: "video", size: "125 MB" }
      ],
      announcements: [
        { title: "Assignment 8 Due Date Extended", date: "2024-02-10", priority: "medium" },
        { title: "Mid-term Results Published", date: "2024-02-08", priority: "high" }
      ]
    },
    {
      id: 2,
      title: "Physics Laboratory",
      code: "PHYS201L",
      instructor: "Prof. Rajesh Kumar",
      description: "Hands-on physics experiments covering mechanics, optics, and thermodynamics",
      credits: 2,
      semester: "Spring 2024",
      schedule: "Tue, Thu - 2:00-5:00 PM",
      location: "Physics Lab",
      progress: 68,
      grade: "B+",
      attendance: 88,
      totalLectures: 20,
      completedLectures: 14,
      assignments: 10,
      submittedAssignments: 9,
      nextClass: "2024-02-16T14:00:00",
      materials: [
        { name: "Lab Manual", type: "pdf", size: "5.2 MB" },
        { name: "Safety Guidelines", type: "pdf", size: "800 KB" },
        { name: "Experiment Data Sheet", type: "xlsx", size: "450 KB" }
      ],
      announcements: [
        { title: "Lab Safety Refresher Session", date: "2024-02-12", priority: "high" },
        { title: "Equipment Maintenance - Lab Closed", date: "2024-02-09", priority: "low" }
      ]
    },
    {
      id: 3,
      title: "Chemistry Organic",
      code: "CHEM301",
      instructor: "Dr. Meera Sharma",
      description: "Comprehensive study of organic chemistry reactions and mechanisms",
      credits: 4,
      semester: "Spring 2024",
      schedule: "Mon, Wed, Fri - 9:00-10:30 AM",
      location: "Room 205",
      progress: 82,
      grade: "A-",
      attendance: 95,
      totalLectures: 45,
      completedLectures: 37,
      assignments: 6,
      submittedAssignments: 6,
      nextClass: "2024-02-15T09:00:00",
      materials: [
        { name: "Organic Reactions Guide", type: "pdf", size: "3.8 MB" },
        { name: "Mechanism Practice Problems", type: "pdf", size: "2.2 MB" },
        { name: "Lab Synthesis Report Template", type: "doc", size: "1.1 MB" }
      ],
      announcements: [
        { title: "Guest Lecture on Green Chemistry", date: "2024-02-11", priority: "medium" },
        { title: "Final Project Guidelines Released", date: "2024-02-07", priority: "high" }
      ]
    },
    {
      id: 4,
      title: "English Literature",
      code: "ENG201",
      instructor: "Ms. Sarah Johnson",
      description: "Modern and contemporary literature analysis and critical writing",
      credits: 3,
      semester: "Spring 2024",
      schedule: "Tue, Thu - 11:00-12:30 PM",
      location: "Room 102",
      progress: 70,
      grade: "B+",
      attendance: 90,
      totalLectures: 30,
      completedLectures: 21,
      assignments: 5,
      submittedAssignments: 4,
      nextClass: "2024-02-16T11:00:00",
      materials: [
        { name: "Reading List - Term 2", type: "pdf", size: "900 KB" },
        { name: "Essay Writing Guidelines", type: "pdf", size: "1.3 MB" },
        { name: "Critical Analysis Examples", type: "pdf", size: "2.1 MB" }
      ],
      announcements: [
        { title: "Poetry Recitation Contest", date: "2024-02-13", priority: "low" },
        { title: "Essay 3 Topic Selection Due", date: "2024-02-10", priority: "medium" }
      ]
    }
  ]
};

const CoursesPage = () => {
  const router = useRouter();
  const [selectedCourse, setSelectedCourse] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterSemester, setFilterSemester] = React.useState("all");
  const [viewMode, setViewMode] = React.useState("grid"); // grid, list

  const formatNextClass = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return `Today at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return `Tomorrow at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return `${date.toLocaleDateString('en-GB')} at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    }
  };

  const getGradeColor = (grade) => {
    if (grade === 'A' || grade === 'A+') return 'text-green-600';
    if (grade === 'A-') return 'text-green-500';
    if (grade === 'B+') return 'text-blue-600';
    if (grade === 'B' || grade === 'B-') return 'text-blue-500';
    if (grade === 'C+' || grade === 'C') return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const filteredCourses = studentCourses.enrolled.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSemester = filterSemester === "all" || course.semester === filterSemester;
    return matchesSearch && matchesSemester;
  });

  const totalCredits = studentCourses.enrolled.reduce((sum, course) => sum + course.credits, 0);
  const averageProgress = Math.round(studentCourses.enrolled.reduce((sum, course) => sum + course.progress, 0) / studentCourses.enrolled.length);

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
                  My Courses
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Spring 2024 • {totalCredits} Credits
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <MessageCircle className="h-4 w-4 mr-2" />
                Messages
              </Button>
              <Button variant="gradient">
                <Download className="h-4 w-4 mr-2" />
                Schedule
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
                  <p className="text-sm text-slate-600 dark:text-slate-400">Enrolled Courses</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{studentCourses.enrolled.length}</p>
                </div>
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Total Credits</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{totalCredits}</p>
                </div>
                <Award className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Avg Progress</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{averageProgress}%</p>
                </div>
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Next Class</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Mathematics</p>
                  <p className="text-xs text-orange-600">Today 10:00 AM</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search courses, instructors, or codes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterSemester} onChange={(e) => setFilterSemester(e.target.value)}>
                <option value="all">All Semesters</option>
                <option value="Spring 2024">Spring 2024</option>
                <option value="Fall 2023">Fall 2023</option>
                <option value="Spring 2023">Spring 2023</option>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Course Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="hover-lift">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <CardDescription>
                      {course.code} • {course.instructor} • {course.credits} Credits
                    </CardDescription>
                  </div>
                  <div className={cn("text-lg font-bold", getGradeColor(course.grade))}>
                    {course.grade}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {course.description}
                  </p>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600 dark:text-slate-400">Course Progress</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Course Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-slate-600 dark:text-slate-400">Attendance</p>
                      <p className="font-medium">{course.attendance}%</p>
                    </div>
                    <div>
                      <p className="text-slate-600 dark:text-slate-400">Lectures</p>
                      <p className="font-medium">{course.completedLectures}/{course.totalLectures}</p>
                    </div>
                    <div>
                      <p className="text-slate-600 dark:text-slate-400">Assignments</p>
                      <p className="font-medium">{course.submittedAssignments}/{course.assignments}</p>
                    </div>
                    <div>
                      <p className="text-slate-600 dark:text-slate-400">Schedule</p>
                      <p className="font-medium text-xs">{course.schedule}</p>
                    </div>
                  </div>

                  {/* Next Class */}
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Next Class</p>
                        <p className="text-xs text-blue-700 dark:text-blue-300">{formatNextClass(course.nextClass)}</p>
                      </div>
                      <div className="text-xs text-blue-600 dark:text-blue-400">
                        {course.location}
                      </div>
                    </div>
                  </div>

                  {/* Recent Announcements */}
                  {course.announcements.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-2">Recent Announcements</h4>
                      <div className="space-y-2">
                        {course.announcements.slice(0, 2).map((announcement, index) => (
                          <div key={index} className="flex items-start justify-between p-2 bg-slate-50 dark:bg-slate-800 rounded">
                            <div className="flex-1">
                              <p className="text-sm font-medium">{announcement.title}</p>
                              <p className="text-xs text-slate-600 dark:text-slate-400">
                                {new Date(announcement.date).toLocaleDateString('en-GB')}
                              </p>
                            </div>
                            <Badge variant={getPriorityColor(announcement.priority)} className="text-xs">
                              {announcement.priority}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Course Materials */}
                  <div>
                    <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-2">Latest Materials</h4>
                    <div className="space-y-1">
                      {course.materials.slice(0, 2).map((material, index) => (
                        <div key={index} className="flex items-center justify-between text-xs">
                          <span className="text-slate-600 dark:text-slate-400">{material.name}</span>
                          <span className="text-slate-500">{material.size}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-3 border-t">
                    <Button variant="primary" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-1" />
                      View Course
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <FileText className="h-4 w-4 mr-1" />
                      Materials
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Discuss
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <BookOpen className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 dark:text-slate-400">
                No courses found matching your criteria.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;