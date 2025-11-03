"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  Award,
  TrendingUp,
  Bell,
  Download,
  Plus,
  FileText,
  Target,
  Star,
  GraduationCap,
  Calculator,
  MessageCircle,
  Video,
  PieChart,
  BarChart3,
  Activity,
  Edit,
  Eye,
  UserCheck,
  AlertCircle,
  ChevronRight,
  ClipboardList,
  BookMarked,
  MessageSquare,
  Search,
  Filter,
  MoreHorizontal,
  Trash2,
  Upload,
  Book,
  Presentation,
  File,
  Paperclip,
  CalendarClock,
  Clock4,
  User,
  Settings,
  Mail,
  Phone,
  Save,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { DataTable } from '@/components/ui/DataTable';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import ProtectedRoute from '@/components/ProtectedRoute';

// Mock data for teacher dashboard
const teacherData = {
  profile: {
    name: "Dr. Priya Gupta",
    employeeId: "EMP2024001",
    department: "Mathematics Department",
    subjects: ["Advanced Mathematics", "Calculus", "Statistics"],
    experience: "8 years",
    qualification: "PhD in Mathematics",
    avatar: "👩‍🏫",
    email: "priya.gupta@school.edu",
    phone: "+91 98765 43210",
    joiningDate: "2020-06-15"
  },
  stats: {
    totalStudents: 180,
    totalClasses: 6,
    pendingAssignments: 15,
    averageGrade: 8.4,
    attendanceRate: 94.2,
    completedLessons: 42,
    pendingReviews: 8
  }
};

const myClasses = [
  {
    id: 1,
    className: "Class 12-A",
    subject: "Advanced Mathematics",
    students: 35,
    schedule: "Mon, Wed, Fri - 10:00 AM",
    nextClass: "2024-01-16 10:00",
    avgGrade: 8.7,
    attendance: 92,
    section: "A"
  },
  {
    id: 2,
    className: "Class 11-B", 
    subject: "Calculus",
    students: 32,
    schedule: "Tue, Thu - 11:30 AM",
    nextClass: "2024-01-16 11:30",
    avgGrade: 8.2,
    attendance: 89,
    section: "B"
  },
  {
    id: 3,
    className: "Class 12-C",
    subject: "Statistics",
    students: 28,
    schedule: "Mon, Wed - 2:00 PM", 
    nextClass: "2024-01-15 14:00",
    avgGrade: 8.5,
    attendance: 95,
    section: "C"
  }
];

const pendingTasks = [
  {
    id: 1,
    type: "assignment",
    title: "Grade Calculus Assignment #5",
    class: "Class 11-B",
    dueDate: "2024-01-16",
    priority: "high",
    count: 32,
    status: "pending"
  },
  {
    id: 2,
    type: "lesson_plan",
    title: "Prepare Integration Lesson Plan",
    class: "Class 12-A",
    dueDate: "2024-01-17",
    priority: "medium",
    count: 1,
    status: "in_progress"
  },
  {
    id: 3,
    type: "attendance",
    title: "Mark Attendance - Statistics Class",
    class: "Class 12-C", 
    dueDate: "2024-01-15",
    priority: "high",
    count: 28,
    status: "overdue"
  },
  {
    id: 4,
    type: "meeting",
    title: "Department Meeting",
    class: "All Classes",
    dueDate: "2024-01-18",
    priority: "medium",
    count: 1,
    status: "scheduled"
  }
];

const recentSubmissions = [
  {
    id: 1,
    studentName: "Aarav Sharma",
    class: "Class 12-A",
    assignment: "Calculus Problem Set",
    submittedDate: "2024-01-14",
    status: "pending_review",
    score: null,
    maxScore: 100
  },
  {
    id: 2,
    studentName: "Priya Patel",
    class: "Class 11-B",
    assignment: "Statistics Project",
    submittedDate: "2024-01-13",
    status: "graded",
    score: 95,
    maxScore: 100
  },
  {
    id: 3,
    studentName: "Rahul Singh",
    class: "Class 12-C",
    assignment: "Mathematical Modeling",
    submittedDate: "2024-01-12",
    status: "graded", 
    score: 88,
    maxScore: 100
  },
  {
    id: 4,
    studentName: "Ananya Reddy",
    class: "Class 12-A",
    assignment: "Integration Exercises",
    submittedDate: "2024-01-14",
    status: "pending_review",
    score: null,
    maxScore: 100
  }
];

// Mock data for assignments
const initialAssignments = [
  {
    id: 1,
    title: "Calculus Problem Set #5",
    class: "Class 11-B",
    subject: "Calculus",
    dueDate: "2024-01-20",
    assignedDate: "2024-01-10",
    status: "active",
    submissions: 28,
    totalStudents: 32,
    type: "homework"
  },
  {
    id: 2,
    title: "Statistics Project - Data Analysis",
    class: "Class 12-C",
    subject: "Statistics",
    dueDate: "2024-01-25",
    assignedDate: "2024-01-05",
    status: "active",
    submissions: 15,
    totalStudents: 28,
    type: "project"
  },
  {
    id: 3,
    title: "Mathematics Quiz #3",
    class: "Class 12-A",
    subject: "Advanced Mathematics",
    dueDate: "2024-01-18",
    assignedDate: "2024-01-15",
    status: "graded",
    submissions: 35,
    totalStudents: 35,
    type: "quiz"
  }
];

// Mock data for gradebook
const gradebookData = [
  {
    id: 1,
    studentName: "Aarav Sharma",
    rollNumber: "12A001",
    class: "Class 12-A",
    assignments: [
      { name: "Quiz #1", score: 85, maxScore: 100 },
      { name: "Project", score: 92, maxScore: 100 },
      { name: "Midterm", score: 88, maxScore: 100 }
    ],
    totalScore: 265,
    maxTotalScore: 300,
    percentage: 88.3
  },
  {
    id: 2,
    studentName: "Priya Patel",
    rollNumber: "12A002",
    class: "Class 12-A",
    assignments: [
      { name: "Quiz #1", score: 92, maxScore: 100 },
      { name: "Project", score: 88, maxScore: 100 },
      { name: "Midterm", score: 95, maxScore: 100 }
    ],
    totalScore: 275,
    maxTotalScore: 300,
    percentage: 91.7
  }
];

// Mock data for lesson plans
const lessonPlans = [
  {
    id: 1,
    title: "Integration Techniques",
    subject: "Calculus",
    class: "Class 12-A",
    date: "2024-01-15",
    duration: "60 mins",
    status: "completed",
    objectives: ["Understand basic integration", "Apply substitution method"],
    resources: ["Textbook Chapter 5", "Video Lecture"]
  },
  {
    id: 2,
    title: "Probability Distributions",
    subject: "Statistics",
    class: "Class 12-C",
    date: "2024-01-17",
    duration: "90 mins",
    status: "scheduled",
    objectives: ["Learn normal distribution", "Calculate probabilities"],
    resources: ["Workbook Exercises", "Online Calculator"]
  }
];

// Mock data for exams
const upcomingExams = [
  {
    id: 1,
    subject: "Mathematics",
    class: "Class 12-A",
    date: "2024-02-15",
    time: "10:00 AM",
    duration: "3 hours",
    type: "Unit Test",
    syllabus: "Chapters 1-3",
    maxMarks: 100,
    students: 35
  },
  {
    id: 2,
    subject: "Physics",
    class: "Class 11-B",
    date: "2024-02-18",
    time: "10:00 AM",
    duration: "3 hours",
    type: "Practical Exam",
    syllabus: "All experiments",
    maxMarks: 100,
    students: 32
  },
  {
    id: 3,
    subject: "Chemistry",
    class: "Class 12-C",
    date: "2024-02-20",
    time: "02:00 PM",
    duration: "2 hours",
    type: "Theory Exam",
    syllabus: "Organic Chemistry",
    maxMarks: 70,
    students: 28
  }
];

const examResults = [
  {
    id: 1,
    exam: "Mathematics Midterm",
    class: "Class 12-A",
    average: 85.2,
    highest: 98,
    lowest: 42,
    passed: 32,
    failed: 3,
    total: 35
  },
  {
    id: 2,
    exam: "Physics Quiz 1",
    class: "Class 11-B",
    average: 78.5,
    highest: 95,
    lowest: 35,
    passed: 28,
    failed: 4,
    total: 32
  }
];

// Mock data for resources
const initialResources = [
  {
    id: 1,
    title: "Calculus Reference Sheet",
    type: "document",
    subject: "Calculus",
    uploadDate: "2024-01-10",
    fileSize: "2.5 MB",
    downloads: 45
  },
  {
    id: 2,
    title: "Statistics Formula Guide",
    type: "document", 
    subject: "Statistics",
    uploadDate: "2024-01-08",
    fileSize: "1.8 MB",
    downloads: 32
  },
  {
    id: 3,
    title: "Integration Video Lesson",
    type: "video",
    subject: "Advanced Mathematics",
    uploadDate: "2024-01-05",
    fileSize: "125 MB",
    downloads: 78
  }
];

// Mock student data for attendance
  const classStudents = [
    { id: 1, name: "Aarav Sharma", rollNumber: "12A001", present: true },
    { id: 2, name: "Priya Patel", rollNumber: "12A002", present: true },
    { id: 3, name: "Rahul Singh", rollNumber: "12A003", present: false },
    { id: 4, name: "Ananya Reddy", rollNumber: "12A004", present: true },
    { id: 5, name: "Vikram Mehta", rollNumber: "12A005", present: true }
  ];

  const TeacherDashboard = () => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = React.useState('overview');
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const [isClient, setIsClient] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedClass, setSelectedClass] = React.useState('all');
  const [assignments, setAssignments] = React.useState(initialAssignments);
  const [showCreateAssignment, setShowCreateAssignment] = React.useState(false);
  const [showTakeAttendance, setShowTakeAttendance] = React.useState(false);
  const [showCreateExam, setShowCreateExam] = React.useState(false);
  const [showCreateLessonPlan, setShowCreateLessonPlan] = React.useState(false);
  const [showViewAllClasses, setShowViewAllClasses] = React.useState(false);
  const [showViewAllTasks, setShowViewAllTasks] = React.useState(false);
  const [showViewAllSubmissions, setShowViewAllSubmissions] = React.useState(false);
  const [showViewAllGrades, setShowViewAllGrades] = React.useState(false);
  const [showAddSubject, setShowAddSubject] = React.useState(false);
  const [showUploadResource, setShowUploadResource] = React.useState(false);
  const [attendanceData, setAttendanceData] = React.useState(classStudents);
  const [newAssignment, setNewAssignment] = React.useState({
    title: '',
    class: 'Class 12-A',
    subject: 'Advanced Mathematics',
    dueDate: '',
    type: 'homework' as 'homework' | 'project' | 'quiz' | 'exam'
  });
  const [newLessonPlan, setNewLessonPlan] = React.useState({
    title: '',
    class: 'Class 12-A',
    subject: 'Advanced Mathematics',
    date: '',
    duration: '',
    objectives: [''],
    resources: [''],
    activities: [''],
    assessment: ''
  });
  const [newSubject, setNewSubject] = React.useState('');
  const [currentLessonPlans, setCurrentLessonPlans] = React.useState(lessonPlans);
  const [currentResources, setCurrentResources] = React.useState(initialResources);
  const [subjects, setSubjects] = React.useState(teacherData.profile.subjects);

  // Consistent date formatting to avoid hydration mismatches
  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-GB', { // Using en-GB for consistent format
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric'
    });
  };

  const formatDateLong = (date: Date) => {
    if (!isClient) return 'Loading...';
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
  };

  React.useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: PieChart },
    { id: 'classes', label: 'My Classes', icon: Users },
    { id: 'assignments', label: 'Assignments', icon: FileText },
    { id: 'gradebook', label: 'Gradebook', icon: Calculator },
    { id: 'lessons', label: 'Lesson Plans', icon: BookMarked },
    { id: 'exams', label: 'Exams', icon: Target },
    { id: 'attendance', label: 'Attendance', icon: UserCheck },
    { id: 'resources', label: 'Resources', icon: Book },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  // Table columns for submissions
  const submissionColumns = [
    {
      key: 'studentName' as keyof typeof recentSubmissions[0],
      label: 'Student',
      sortable: true,
      render: (value: any, row: typeof recentSubmissions[0]) => (
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
            {value.split(' ').map((n: string) => n[0]).join('')}
          </div>
          <div>
            <div className="font-medium">{value}</div>
            <div className="text-sm text-slate-500">{row.class}</div>
          </div>
        </div>
      )
    },
    {
      key: 'assignment' as keyof typeof recentSubmissions[0],
      label: 'Assignment',
      sortable: true
    },
    {
      key: 'submittedDate' as keyof typeof recentSubmissions[0],
      label: 'Submitted',
      sortable: true,
      render: (value: any) => formatDate(value)
    },
    {
      key: 'status' as keyof typeof recentSubmissions[0],
      label: 'Status',
      render: (value: any) => (
        <Badge variant={
          value === 'pending_review' ? 'warning' : 
          value === 'graded' ? 'success' : 'default'
        }>
          {value === 'pending_review' ? 'Pending Review' : 
           value === 'graded' ? 'Graded' : 'Submitted'}
        </Badge>
      )
    },
    {
      key: 'score' as keyof typeof recentSubmissions[0],
      label: 'Score',
      render: (value: any, row: typeof recentSubmissions[0]) => value ? (
        <span className="font-medium">{value}/{row.maxScore}</span>
      ) : (
        <span className="text-slate-500">-</span>
      )
    }
  ];

  // Handle assignment creation
  const handleCreateAssignment = () => {
    if (newAssignment.title && newAssignment.dueDate) {
      const assignment = {
        id: assignments.length + 1,
        ...newAssignment,
        assignedDate: new Date().toISOString().split('T')[0],
        status: "active",
        submissions: 0,
        totalStudents: 35
      };
      setAssignments([assignment, ...assignments]);
      setNewAssignment({
        title: '',
        class: 'Class 12-A',
        subject: 'Advanced Mathematics',
        dueDate: '',
        type: 'homework'
      });
      setShowCreateAssignment(false);
    }
  };

  // Handle attendance toggle
  const toggleAttendance = (studentId: number) => {
    setAttendanceData(attendanceData.map(student => 
      student.id === studentId 
        ? { ...student, present: !student.present } 
        : student
    ));
  };

  // Handle save attendance
  const handleSaveAttendance = () => {
    // In a real app, this would save to the database
    console.log('Attendance saved:', attendanceData);
    setShowTakeAttendance(false);
  };

  // Handle create lesson plan
  const handleCreateLessonPlan = () => {
    if (newLessonPlan.title && newLessonPlan.date) {
      const lessonPlan = {
        id: currentLessonPlans.length + 1,
        ...newLessonPlan,
        status: "scheduled"
      };
      setCurrentLessonPlans([lessonPlan, ...currentLessonPlans]);
      setNewLessonPlan({
        title: '',
        class: 'Class 12-A',
        subject: 'Advanced Mathematics',
        date: '',
        duration: '',
        objectives: [''],
        resources: [''],
        activities: [''],
        assessment: ''
      });
      setShowCreateLessonPlan(false);
    }
  };

  // Handle add subject
  const handleAddSubject = () => {
    if (newSubject.trim() && !subjects.includes(newSubject)) {
      setSubjects([...subjects, newSubject]);
      setNewSubject('');
      setShowAddSubject(false);
    }
  };

  // Handle view functions (navigate to dedicated pages)
  const handleViewAllClasses = () => router.push('/teacher/classes');
  const handleViewAllTasks = () => alert('Tasks page coming soon!');
  const handleViewAllSubmissions = () => router.push('/teacher/assignments');
  const handleViewAllGrades = () => router.push('/teacher/grades');
  const handleUploadResource = () => router.push('/teacher/resources');
  const handleViewLessons = () => router.push('/teacher/lessons');
  const handleTakeAttendance = () => router.push('/teacher/attendance');
  const handleViewSchedule = () => router.push('/teacher/schedule');

  // Helper functions for array inputs in lesson plan
  const addObjective = () => {
    setNewLessonPlan({
      ...newLessonPlan,
      objectives: [...newLessonPlan.objectives, '']
    });
  };

  const removeObjective = (index: number) => {
    const newObjectives = newLessonPlan.objectives.filter((_, i) => i !== index);
    setNewLessonPlan({
      ...newLessonPlan,
      objectives: newObjectives.length > 0 ? newObjectives : ['']
    });
  };

  const updateObjective = (index: number, value: string) => {
    const newObjectives = [...newLessonPlan.objectives];
    newObjectives[index] = value;
    setNewLessonPlan({
      ...newLessonPlan,
      objectives: newObjectives
    });
  };

  // Table columns for assignments
  const assignmentColumns = [
    {
      key: 'title' as keyof typeof assignments[0],
      label: 'Assignment',
      sortable: true
    },
    {
      key: 'class' as keyof typeof assignments[0],
      label: 'Class',
      sortable: true
    },
    {
      key: 'dueDate' as keyof typeof assignments[0],
      label: 'Due Date',
      sortable: true,
      render: (value: any) => formatDate(value)
    },
    {
      key: 'submissions' as keyof typeof assignments[0],
      label: 'Submissions',
      render: (value: any, row: typeof assignments[0]) => (
        <span>{value}/{row.totalStudents}</span>
      )
    },
    {
      key: 'status' as keyof typeof assignments[0],
      label: 'Status',
      render: (value: any) => (
        <Badge variant={
          value === 'active' ? 'success' : 
          value === 'graded' ? 'info' : 'default'
        }>
          {value}
        </Badge>
      )
    }
  ];

  // Table columns for gradebook
  const gradebookColumns = [
    {
      key: 'studentName' as keyof typeof gradebookData[0],
      label: 'Student',
      sortable: true,
      render: (value: any, row: typeof gradebookData[0]) => (
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
            {value.split(' ').map((n: string) => n[0]).join('')}
          </div>
          <div>
            <div className="font-medium">{value}</div>
            <div className="text-sm text-slate-500">{row.rollNumber}</div>
          </div>
        </div>
      )
    },
    {
      key: 'class' as keyof typeof gradebookData[0],
      label: 'Class',
      sortable: true
    },
    {
      key: 'percentage' as keyof typeof gradebookData[0],
      label: 'Percentage',
      sortable: true,
      render: (value: any) => (
        <span className={cn(
          "font-medium",
          value >= 90 ? "text-green-600" :
          value >= 75 ? "text-blue-600" :
          value >= 60 ? "text-yellow-600" : "text-red-600"
        )}>
          {value}%
        </span>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
        {/* Header */}
        <div className="glass border-b border-white/20 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center text-2xl">
                    {teacherData.profile.avatar}
                  </div>
                  <div>
                    <h1 className="text-lg font-bold text-slate-900 dark:text-white">
                      Welcome, {teacherData.profile.name.split(' ')[1]}! 👋
                    </h1>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {teacherData.profile.department} • {teacherData.profile.employeeId}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right hidden md:block">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {formatDateLong(currentTime)}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {isClient ? currentTime.toLocaleTimeString('en-IN', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    }) : '--:--'}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4" />
                </Button>
                <Button variant="gradient" size="sm" onClick={() => router.push('/teacher/assignments')}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Assignment
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-8 p-1 bg-white/50 dark:bg-slate-800/50 rounded-lg glass overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap",
                  selectedTab === tab.id
                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50"
                )}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {selectedTab === 'overview' && (
            <div className="space-y-8">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card variant="elevated" className="hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                          Total Students
                        </p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">
                          {teacherData.stats.totalStudents}
                        </p>
                        <p className="text-xs text-blue-600 font-medium">
                          Across {teacherData.stats.totalClasses} classes
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card variant="elevated" className="hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                          Average Grade
                        </p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">
                          {teacherData.stats.averageGrade}
                        </p>
                        <p className="text-xs text-green-600 font-medium">
                          Excellent Performance
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500">
                        <Award className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card variant="elevated" className="hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                          Pending Tasks
                        </p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">
                          {teacherData.stats.pendingAssignments}
                        </p>
                        <p className="text-xs text-orange-600 font-medium">
                          Need Attention
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-500">
                        <ClipboardList className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card variant="elevated" className="hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                          Attendance Rate
                        </p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">
                          {teacherData.stats.attendanceRate}%
                        </p>
                        <p className="text-xs text-purple-600 font-medium">
                          Very Good
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                        <UserCheck className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* My Classes & Pending Tasks */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* My Classes */}
                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center">
                        <Users className="h-5 w-5 mr-2" />
                        My Classes
                      </span>
                      <Button variant="ghost" size="sm" onClick={handleViewAllClasses}>
                        View All
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {myClasses.map((classItem) => (
                        <div key={classItem.id} className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-slate-900 dark:text-white">
                              {classItem.className} - {classItem.subject}
                            </h4>
                            <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                              {classItem.students} students
                            </span>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                            Schedule: {classItem.schedule}
                          </p>
                          <div className="flex items-center justify-between text-xs text-slate-500">
                            <span>Next: {formatDate(classItem.nextClass)}</span>
                            <div className="flex space-x-2">
                              <span>Avg: {classItem.avgGrade}</span>
                              <span>Att: {classItem.attendance}%</span>
                            </div>
                          </div>
                          <div className="flex space-x-2 mt-3">
                            <Button variant="outline" size="sm" className="flex-1 text-xs h-8" onClick={() => router.push('/teacher/classes')}>
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                            <Button variant="gradient" size="sm" className="flex-1 text-xs h-8" onClick={handleViewSchedule}>
                              <Calendar className="h-3 w-3 mr-1" />
                              Schedule
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Pending Tasks */}
                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center">
                        <ClipboardList className="h-5 w-5 mr-2" />
                        Pending Tasks
                      </span>
                      <Button variant="ghost" size="sm" onClick={handleViewAllTasks}>
                        View All
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {pendingTasks.map((task) => (
                        <div key={task.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                          <div className="flex items-start space-x-3">
                            <div className={cn(
                              "p-2 rounded-lg",
                              task.type === 'assignment' && "bg-blue-100 dark:bg-blue-900",
                              task.type === 'lesson_plan' && "bg-green-100 dark:bg-green-900",
                              task.type === 'attendance' && "bg-orange-100 dark:bg-orange-900",
                              task.type === 'meeting' && "bg-purple-100 dark:bg-purple-900"
                            )}>
                              {task.type === 'assignment' && <FileText className="h-4 w-4 text-blue-600" />}
                              {task.type === 'lesson_plan' && <BookOpen className="h-4 w-4 text-green-600" />}
                              {task.type === 'attendance' && <UserCheck className="h-4 w-4 text-orange-600" />}
                              {task.type === 'meeting' && <Calendar className="h-4 w-4 text-purple-600" />}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-slate-900 dark:text-white text-sm">
                                {task.title}
                              </h4>
                              <p className="text-xs text-slate-600 dark:text-slate-400">
                                {task.class} • Due: {formatDate(task.dueDate)}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant={
                              task.priority === 'high' ? 'destructive' :
                              task.priority === 'medium' ? 'warning' : 'default'
                            } className="text-xs">
                              {task.priority}
                            </Badge>
                            {task.count > 1 && (
                              <p className="text-xs text-slate-500 mt-1">
                                {task.count} items
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Submissions */}
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      Recent Submissions
                    </span>
                    <Button variant="ghost" size="sm" onClick={handleViewAllSubmissions}>
                      View All
                    </Button>
                  </CardTitle>
                  <CardDescription>
                    Latest assignment submissions requiring your attention
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DataTable
                    columns={submissionColumns}
                    data={recentSubmissions}
                    searchKey="studentName"
                    searchPlaceholder="Search submissions..."
                    showSearch={true}
                    showPagination={false}
                    pageSize={5}
                    onRowClick={(submission) => router.push('/teacher/assignments')}
                  />
                </CardContent>
              </Card>
            </div>
          )}

          {/* Classes Tab */}
          {selectedTab === 'classes' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myClasses.map((classItem) => (
                  <Card key={classItem.id} variant="elevated" className="hover-lift cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{classItem.className}</CardTitle>
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <Users className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <CardDescription>{classItem.subject} - Section {classItem.section}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-slate-600 dark:text-slate-400">Students</span>
                            <p className="font-medium text-slate-900 dark:text-white">{classItem.students}</p>
                          </div>
                          <div>
                            <span className="text-slate-600 dark:text-slate-400">Avg Grade</span>
                            <p className="font-medium text-slate-900 dark:text-white">{classItem.avgGrade}</p>
                          </div>
                          <div>
                            <span className="text-slate-600 dark:text-slate-400">Attendance</span>
                            <p className="font-medium text-slate-900 dark:text-white">{classItem.attendance}%</p>
                          </div>
                          <div>
                            <span className="text-slate-600 dark:text-slate-400">Schedule</span>
                            <p className="font-medium text-slate-900 dark:text-white text-xs">{classItem.schedule}</p>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2 mt-3">
                          <Button variant="outline" size="sm" className="flex-1 text-xs h-8">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button variant="gradient" size="sm" className="flex-1 text-xs h-8" onClick={handleViewSchedule}>
                            <Calendar className="h-3 w-3 mr-1" />
                            Schedule
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Assignments Tab */}
          {selectedTab === 'assignments' && (
            <div className="space-y-6">
              {/* Filters and Search */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input
                      placeholder="Search assignments..."
                      className="pl-10 w-full sm:w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select defaultValue="all">
                    <option value="all">All Classes</option>
                    <option value="12A">Class 12-A</option>
                    <option value="11B">Class 11-B</option>
                    <option value="12C">Class 12-C</option>
                  </Select>
                </div>
                <Button variant="gradient" onClick={() => router.push('/teacher/assignments')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Assignment
                </Button>
              </div>

              {/* Assignment Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center">
                      <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                        <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-slate-600 dark:text-slate-400">Total</p>
                        <p className="text-xl font-bold text-slate-900 dark:text-white">24</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center">
                      <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900">
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-slate-600 dark:text-slate-400">Graded</p>
                        <p className="text-xl font-bold text-slate-900 dark:text-white">18</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center">
                      <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900">
                        <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-slate-600 dark:text-slate-400">Pending</p>
                        <p className="text-xl font-bold text-slate-900 dark:text-white">4</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center">
                      <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900">
                        <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-slate-600 dark:text-slate-400">Avg Score</p>
                        <p className="text-xl font-bold text-slate-900 dark:text-white">87%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Assignments Table */}
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Assignment Management
                  </CardTitle>
                  <CardDescription>
                    Create, distribute, and grade assignments for your classes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DataTable
                    columns={assignmentColumns}
                    data={assignments}
                    searchKey="title"
                    searchPlaceholder="Search assignments..."
                    showSearch={false}
                    showPagination={true}
                    pageSize={10}
                    onRowClick={(assignment) => router.push('/teacher/assignments')}
                  />
                </CardContent>
              </Card>
            </div>
          )}

          {/* Gradebook Tab */}
          {selectedTab === 'gradebook' && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input
                      placeholder="Search students..."
                      className="pl-10 w-full sm:w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select defaultValue="12A">
                    <option value="12A">Class 12-A</option>
                    <option value="11B">Class 11-B</option>
                    <option value="12C">Class 12-C</option>
                  </Select>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button variant="gradient" onClick={() => router.push('/teacher/grades')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Grades
                  </Button>
                </div>
              </div>

              {/* Grade Distribution Chart */}
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Grade Distribution
                  </CardTitle>
                  <CardDescription>
                    Performance overview for Class 12-A
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end justify-between space-x-2">
                    {[
                      { range: '90-100%', count: 8, color: 'bg-green-500' },
                      { range: '80-89%', count: 12, color: 'bg-blue-500' },
                      { range: '70-79%', count: 10, color: 'bg-yellow-500' },
                      { range: '60-69%', count: 5, color: 'bg-orange-500' },
                      { range: 'Below 60%', count: 2, color: 'bg-red-500' }
                    ].map((item, index) => (
                      <div key={index} className="flex flex-col items-center flex-1">
                        <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                          {item.count}
                        </div>
                        <div 
                          className={`${item.color} w-full rounded-t-md transition-all hover:opacity-75`}
                          style={{ height: `${item.count * 10}px` }}
                        />
                        <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                          {item.range}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Gradebook Table */}
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Calculator className="h-5 w-5 mr-2" />
                      Gradebook
                    </span>
                    <Button variant="ghost" size="sm" onClick={handleViewAllGrades}>
                      View All
                    </Button>
                  </CardTitle>
                  <CardDescription>
                    Student grades and performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DataTable
                    columns={gradebookColumns}
                    data={gradebookData}
                    searchKey="studentName"
                    searchPlaceholder="Search students..."
                    showSearch={false}
                    showPagination={true}
                    pageSize={10}
                    onRowClick={(student) => console.log('View student:', student)}
                  />
                </CardContent>
              </Card>
            </div>
          )}

          {/* Lesson Plans Tab */}
          {selectedTab === 'lessons' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Lesson Plans</h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    Create and manage your lesson plans
                  </p>
                </div>
                <Button variant="gradient" onClick={() => router.push('/teacher/lessons')}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Lesson Plan
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {lessonPlans.map((plan) => (
                  <Card key={plan.id} variant="elevated" className="hover-lift">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{plan.title}</CardTitle>
                          <CardDescription>
                            {plan.subject} • {plan.class}
                          </CardDescription>
                        </div>
                        <Badge 
                          variant={
                            plan.status === 'completed' ? 'success' :
                            plan.status === 'scheduled' ? 'info' : 'default'
                          }
                        >
                          {plan.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                          <Calendar className="h-4 w-4 mr-2" />
                          {formatDate(plan.date)}
                        </div>
                        <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                          <Clock4 className="h-4 w-4 mr-2" />
                          {plan.duration}
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-1">Learning Objectives</h4>
                          <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                            {plan.objectives.map((objective, index) => (
                              <li key={index} className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>{objective}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-1">Resources</h4>
                          <div className="flex flex-wrap gap-2">
                            {plan.resources.map((resource, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {resource}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="pt-3 border-t flex space-x-2">
                          <Button variant="outline" size="sm" className="flex-1" onClick={() => router.push('/teacher/lessons')}>
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1" onClick={() => router.push('/teacher/lessons')}>
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Attendance Tab */}
          {selectedTab === 'attendance' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Attendance Management</h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    Track and manage student attendance
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Select defaultValue="today">
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                  </Select>
                <Button variant="gradient" onClick={() => handleTakeAttendance()}>
                    <Plus className="h-4 w-4 mr-2" />
                    Take Attendance
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600">Today's Attendance</p>
                        <p className="text-2xl font-bold text-green-600">92%</p>
                        <p className="text-xs text-slate-500">165/180 present</p>
                      </div>
                      <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500">
                        <UserCheck className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600">This Week</p>
                        <p className="text-2xl font-bold text-blue-600">89%</p>
                        <p className="text-xs text-slate-500">Average attendance</p>
                      </div>
                      <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500">
                        <Calendar className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600">Low Attendance</p>
                        <p className="text-2xl font-bold text-red-600">12</p>
                        <p className="text-xs text-slate-500">Students below 75%</p>
                      </div>
                      <div className="p-3 rounded-lg bg-gradient-to-r from-red-500 to-orange-500">
                        <AlertCircle className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>Class Attendance</CardTitle>
                  <CardDescription>Attendance records for today</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { class: "Class 12-A", subject: "Mathematics", present: 32, total: 35, percentage: 91.4 },
                      { class: "Class 11-B", subject: "Calculus", present: 28, total: 32, percentage: 87.5 },
                      { class: "Class 12-C", subject: "Statistics", present: 26, total: 28, percentage: 92.9 }
                    ].map((item, index) => (
                      <div key={index} className="p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-medium text-slate-900 dark:text-white">{item.class}</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">{item.subject}</p>
                          </div>
                          <Badge variant="secondary">{item.percentage}%</Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600 dark:text-slate-400">
                            {item.present} present out of {item.total}
                          </span>
                          <Button variant="outline" size="sm" onClick={() => handleTakeAttendance()}>
                            <UserCheck className="h-4 w-4 mr-1" />
                            Take Attendance
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Exams Tab */}
          {selectedTab === 'exams' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Exam Management</h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    Create and manage exams for your classes
                  </p>
                </div>
                <Button variant="gradient" onClick={() => router.push('/teacher/exams')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Exam
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="h-5 w-5 mr-2" />
                      Upcoming Exams
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingExams.map((exam) => (
                        <div key={exam.id} className="p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-medium text-slate-900 dark:text-white">
                                {exam.subject} - {exam.class}
                              </h4>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                {exam.type}
                              </p>
                            </div>
                            <Badge variant="warning">{exam.type}</Badge>
                          </div>
                          <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                            <p>📅 {formatDate(exam.date)} at {exam.time}</p>
                            <p>⏱️ Duration: {exam.duration}</p>
                            <p>📚 Syllabus: {exam.syllabus}</p>
                            <p>💯 Max Marks: {exam.maxMarks}</p>
                            <p>👥 Students: {exam.students}</p>
                          </div>
                          <div className="flex space-x-2 mt-3">
                            <Button variant="outline" size="sm" className="flex-1" onClick={() => router.push('/teacher/exams')}>
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1" onClick={() => router.push('/teacher/exams')}>
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2" />
                      Exam Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {examResults.map((result) => (
                        <div key={result.id} className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-slate-900 dark:text-white">
                              {result.exam}
                            </h4>
                            <Badge variant="secondary">{result.class}</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-slate-600 dark:text-slate-400">Average Score</p>
                              <p className="font-medium text-slate-900 dark:text-white">{result.average}%</p>
                            </div>
                            <div>
                              <p className="text-slate-600 dark:text-slate-400">Highest Score</p>
                              <p className="font-medium text-slate-900 dark:text-white">{result.highest}</p>
                            </div>
                            <div>
                              <p className="text-slate-600 dark:text-slate-400">Lowest Score</p>
                              <p className="font-medium text-slate-900 dark:text-white">{result.lowest}</p>
                            </div>
                            <div>
                              <p className="text-slate-600 dark:text-slate-400">Pass Rate</p>
                              <p className="font-medium text-slate-900 dark:text-white">
                                {Math.round((result.passed / result.total) * 100)}%
                              </p>
                            </div>
                          </div>
                          <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {result.passed} passed, {result.failed} failed out of {result.total} students
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Resources Tab */}
          {selectedTab === 'resources' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Learning Resources</h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    Manage educational materials and resources
                  </p>
                </div>
                <Button variant="gradient" onClick={() => router.push('/teacher/resources')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Upload Resource
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: "Mathematics Formula Sheet", type: "PDF", size: "2.4 MB", date: "2024-01-10", icon: "📄" },
                  { title: "Calculus Video Lectures", type: "Video", size: "1.2 GB", date: "2024-01-08", icon: "🎥" },
                  { title: "Statistics Workbook", type: "Document", size: "5.7 MB", date: "2024-01-05", icon: "📝" },
                  { title: "Online Calculator Tool", type: "Link", size: "N/A", date: "2024-01-03", icon: "🔗" },
                  { title: "Graphing Software", type: "Software", size: "45 MB", date: "2024-01-01", icon: "💻" },
                  { title: "Mathematical Tables", type: "Image", size: "3.2 MB", date: "2023-12-28", icon: "📊" }
                ].map((resource, index) => (
                  <Card key={index} variant="elevated" className="hover-lift">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="text-3xl">{resource.icon}</div>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{resource.title}</h3>
                      <div className="flex items-center text-sm text-slate-600 dark:text-slate-400 mb-3">
                        <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded mr-2">{resource.type}</span>
                        <span>{resource.size}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500">{resource.date}</span>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => router.push('/teacher/resources')}>
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => router.push('/teacher/resources')}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {selectedTab === 'profile' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">My Profile</h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    Manage your personal information and settings
                  </p>
                </div>
                <Button variant="gradient">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <Card variant="elevated">
                    <CardContent className="p-6 text-center">
                      <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                        {teacherData.profile.avatar}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {teacherData.profile.name}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-4">
                        {teacherData.profile.department}
                      </p>
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Change Photo
                      </Button>
                    </CardContent>
                  </Card>

                  <Card variant="elevated" className="mt-6">
                    <CardHeader>
                      <CardTitle>Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 text-slate-400 mr-3" />
                          <span className="text-sm">{teacherData.profile.email}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 text-slate-400 mr-3" />
                          <span className="text-sm">{teacherData.profile.phone}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="lg:col-span-2">
                  <Card variant="elevated">
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">First Name</label>
                          <Input defaultValue={teacherData.profile.name.split(' ')[0]} className="mt-1" />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Last Name</label>
                          <Input defaultValue={teacherData.profile.name.split(' ')[1]} className="mt-1" />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Employee ID</label>
                          <Input defaultValue={teacherData.profile.employeeId} className="mt-1" readOnly />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Department</label>
                          <Input defaultValue={teacherData.profile.department} className="mt-1" />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Qualification</label>
                          <Input defaultValue={teacherData.profile.qualification} className="mt-1" />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Experience</label>
                          <Input defaultValue={teacherData.profile.experience} className="mt-1" />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                          <Input defaultValue={teacherData.profile.email} className="mt-1" type="email" />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Phone</label>
                          <Input defaultValue={teacherData.profile.phone} className="mt-1" type="tel" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card variant="elevated" className="mt-6">
                    <CardHeader>
                      <CardTitle>Subjects</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {subjects.map((subject, index) => (
                          <Badge key={index} variant="secondary">
                            {subject}
                          </Badge>
                        ))}
                        <Button variant="outline" size="sm" onClick={() => setShowAddSubject(true)}>
                          <Plus className="h-4 w-4 mr-1" />
                          Add Subject
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      
      {/* Create Assignment Modal */}
      {showCreateAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Create New Assignment</h3>
              <Button variant="ghost" onClick={() => setShowCreateAssignment(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Assignment Title
                </label>
                <Input
                  value={newAssignment.title}
                  onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                  placeholder="Enter assignment title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Class
                </label>
                <Select
                  value={newAssignment.class}
                  onChange={(e) => setNewAssignment({...newAssignment, class: e.target.value})}
                >
                  <option value="Class 12-A">Class 12-A</option>
                  <option value="Class 11-B">Class 11-B</option>
                  <option value="Class 12-C">Class 12-C</option>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Subject
                </label>
                <Select
                  value={newAssignment.subject}
                  onChange={(e) => setNewAssignment({...newAssignment, subject: e.target.value})}
                >
                  <option value="Advanced Mathematics">Advanced Mathematics</option>
                  <option value="Calculus">Calculus</option>
                  <option value="Statistics">Statistics</option>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Assignment Type
                </label>
                <Select
                  value={newAssignment.type}
                  onChange={(e) => setNewAssignment({...newAssignment, type: e.target.value as 'homework' | 'project' | 'quiz' | 'exam'})}
                >
                  <option value="homework">Homework</option>
                  <option value="project">Project</option>
                  <option value="quiz">Quiz</option>
                  <option value="exam">Exam</option>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Due Date
                </label>
                <Input
                  type="date"
                  value={newAssignment.dueDate}
                  onChange={(e) => setNewAssignment({...newAssignment, dueDate: e.target.value})}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 p-4 border-t border-slate-200 dark:border-slate-700">
              <Button variant="outline" onClick={() => setShowCreateAssignment(false)}>
                Cancel
              </Button>
              <Button variant="gradient" onClick={handleCreateAssignment}>
                Create Assignment
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Take Attendance Modal */}
      {showTakeAttendance && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Take Attendance</h3>
              <Button variant="ghost" onClick={() => setShowTakeAttendance(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {attendanceData.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">{student.name}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Roll: {student.rollNumber}</p>
                    </div>
                    <Button
                      variant={student.present ? "success" : "outline"}
                      onClick={() => toggleAttendance(student.id)}
                    >
                      {student.present ? "Present" : "Absent"}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-2 p-4 border-t border-slate-200 dark:border-slate-700">
              <Button variant="outline" onClick={() => setShowTakeAttendance(false)}>
                Cancel
              </Button>
              <Button variant="gradient" onClick={handleSaveAttendance}>
                Save Attendance
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Create Exam Modal */}
      {showCreateExam && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Create New Exam</h3>
              <Button variant="ghost" onClick={() => setShowCreateExam(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Exam Title
                </label>
                <Input placeholder="Enter exam title" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Class
                </label>
                <Select>
                  <option value="Class 12-A">Class 12-A</option>
                  <option value="Class 11-B">Class 11-B</option>
                  <option value="Class 12-C">Class 12-C</option>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Subject
                </label>
                <Select>
                  <option value="Advanced Mathematics">Advanced Mathematics</option>
                  <option value="Calculus">Calculus</option>
                  <option value="Statistics">Statistics</option>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Exam Type
                </label>
                <Select>
                  <option value="unit_test">Unit Test</option>
                  <option value="midterm">Midterm Exam</option>
                  <option value="final">Final Exam</option>
                  <option value="practical">Practical Exam</option>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Date
                  </label>
                  <Input type="date" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Time
                  </label>
                  <Input type="time" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Duration (in minutes)
                </label>
                <Input type="number" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Maximum Marks
                </label>
                <Input type="number" placeholder="100" />
              </div>
            </div>
            <div className="flex justify-end space-x-2 p-4 border-t border-slate-200 dark:border-slate-700">
              <Button variant="outline" onClick={() => setShowCreateExam(false)}>
                Cancel
              </Button>
              <Button variant="gradient" onClick={() => setShowCreateExam(false)}>
                Create Exam
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Create Lesson Plan Modal */}
      {showCreateLessonPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Create New Lesson Plan</h3>
              <Button variant="ghost" onClick={() => setShowCreateLessonPlan(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Lesson Title
                  </label>
                  <Input
                    value={newLessonPlan.title}
                    onChange={(e) => setNewLessonPlan({...newLessonPlan, title: e.target.value})}
                    placeholder="Enter lesson title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Duration
                  </label>
                  <Input
                    value={newLessonPlan.duration}
                    onChange={(e) => setNewLessonPlan({...newLessonPlan, duration: e.target.value})}
                    placeholder="e.g., 60 mins"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Class
                  </label>
                  <Select
                    value={newLessonPlan.class}
                    onChange={(e) => setNewLessonPlan({...newLessonPlan, class: e.target.value})}
                  >
                    <option value="Class 12-A">Class 12-A</option>
                    <option value="Class 11-B">Class 11-B</option>
                    <option value="Class 12-C">Class 12-C</option>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Subject
                  </label>
                  <Select
                    value={newLessonPlan.subject}
                    onChange={(e) => setNewLessonPlan({...newLessonPlan, subject: e.target.value})}
                  >
                    <option value="Advanced Mathematics">Advanced Mathematics</option>
                    <option value="Calculus">Calculus</option>
                    <option value="Statistics">Statistics</option>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Date
                  </label>
                  <Input
                    type="date"
                    value={newLessonPlan.date}
                    onChange={(e) => setNewLessonPlan({...newLessonPlan, date: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Learning Objectives
                </label>
                <div className="space-y-2">
                  {newLessonPlan.objectives.map((objective, index) => (
                    <div key={index} className="flex space-x-2">
                      <Input
                        value={objective}
                        onChange={(e) => updateObjective(index, e.target.value)}
                        placeholder={`Objective ${index + 1}`}
                      />
                      {newLessonPlan.objectives.length > 1 && (
                        <Button variant="outline" size="sm" onClick={() => removeObjective(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={addObjective}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Objective
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2 p-4 border-t border-slate-200 dark:border-slate-700">
              <Button variant="outline" onClick={() => setShowCreateLessonPlan(false)}>
                Cancel
              </Button>
              <Button variant="gradient" onClick={handleCreateLessonPlan}>
                Create Lesson Plan
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add Subject Modal */}
      {showAddSubject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Add New Subject</h3>
              <Button variant="ghost" onClick={() => setShowAddSubject(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Subject Name
                </label>
                <Input
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="Enter subject name"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddSubject()}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 p-4 border-t border-slate-200 dark:border-slate-700">
              <Button variant="outline" onClick={() => setShowAddSubject(false)}>
                Cancel
              </Button>
              <Button variant="gradient" onClick={handleAddSubject} disabled={!newSubject.trim()}>
                Add Subject
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* View All Classes Modal */}
      {showViewAllClasses && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">All Classes</h3>
              <Button variant="ghost" onClick={() => setShowViewAllClasses(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myClasses.map((classItem) => (
                  <Card key={classItem.id} variant="elevated">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                        {classItem.className} - {classItem.subject}
                      </h4>
                      <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                        <p>Students: {classItem.students}</p>
                        <p>Schedule: {classItem.schedule}</p>
                        <p>Average Grade: {classItem.avgGrade}</p>
                        <p>Attendance: {classItem.attendance}%</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View All Tasks Modal */}
      {showViewAllTasks && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">All Pending Tasks</h3>
              <Button variant="ghost" onClick={() => setShowViewAllTasks(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {pendingTasks.map((task) => (
                  <Card key={task.id} variant="elevated">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-slate-900 dark:text-white">{task.title}</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {task.class} • Due: {formatDate(task.dueDate)}
                          </p>
                        </div>
                        <Badge variant={
                          task.priority === 'high' ? 'destructive' :
                          task.priority === 'medium' ? 'warning' : 'default'
                        }>
                          {task.priority}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Resource Modal */}
      {showUploadResource && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Upload Resource</h3>
              <Button variant="ghost" onClick={() => setShowUploadResource(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Resource Title
                </label>
                <Input placeholder="Enter resource title" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Subject
                </label>
                <Select>
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Resource Type
                </label>
                <Select>
                  <option value="document">Document</option>
                  <option value="video">Video</option>
                  <option value="image">Image</option>
                  <option value="link">Link</option>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Upload File
                </label>
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto text-slate-400 mb-2" />
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                    Drag and drop files here or click to browse
                  </p>
                  <Button variant="outline" size="sm">
                    Browse Files
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2 p-4 border-t border-slate-200 dark:border-slate-700">
              <Button variant="outline" onClick={() => setShowUploadResource(false)}>
                Cancel
              </Button>
              <Button variant="gradient">
                Upload Resource
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
