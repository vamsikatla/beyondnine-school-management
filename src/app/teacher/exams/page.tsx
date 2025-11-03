"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Target, Plus, Search, Calendar, Clock, Users, ArrowLeft,
  Edit, Eye, Trash2, Save, X, BarChart3, FileText, Download
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

const initialExams = [
  {
    id: 1,
    title: "Mathematics Unit Test 1",
    subject: "Mathematics",
    class: "Class 12-A",
    date: "2024-02-15",
    time: "10:00 AM",
    duration: "3 hours",
    type: "Unit Test",
    syllabus: "Chapters 1-3",
    maxMarks: 100,
    students: 35,
    status: "upcoming"
  },
  {
    id: 2,
    title: "Physics Practical Exam",
    subject: "Physics",
    class: "Class 11-B",
    date: "2024-02-18",
    time: "10:00 AM",
    duration: "3 hours",
    type: "Practical Exam",
    syllabus: "All experiments",
    maxMarks: 100,
    students: 32,
    status: "upcoming"
  },
  {
    id: 3,
    title: "Chemistry Theory Exam",
    subject: "Chemistry",
    class: "Class 12-C",
    date: "2024-01-10",
    time: "02:00 PM",
    duration: "2 hours",
    type: "Theory Exam",
    syllabus: "Organic Chemistry",
    maxMarks: 70,
    students: 28,
    status: "completed"
  }
];

const ExamsPage = () => {
  const router = useRouter();
  const [exams, setExams] = React.useState(initialExams);
  const [view, setView] = React.useState('list'); // list, create, edit, results
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterStatus, setFilterStatus] = React.useState("all");
  const [selectedExam, setSelectedExam] = React.useState(null);

  const [newExam, setNewExam] = React.useState({
    title: '',
    subject: 'Mathematics',
    class: 'Class 12-A',
    date: '',
    time: '',
    duration: '3 hours',
    type: 'Unit Test',
    syllabus: '',
    maxMarks: 100,
    instructions: ''
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'info';
      case 'ongoing': return 'warning';
      case 'completed': return 'success';
      case 'cancelled': return 'destructive';
      default: return 'default';
    }
  };

  const handleCreateExam = () => {
    if (newExam.title && newExam.date && newExam.time) {
      const exam = {
        id: exams.length + 1,
        ...newExam,
        students: 35,
        status: 'upcoming'
      };
      setExams([exam, ...exams]);
      setNewExam({
        title: '',
        subject: 'Mathematics',
        class: 'Class 12-A',
        date: '',
        time: '',
        duration: '3 hours',
        type: 'Unit Test',
        syllabus: '',
        maxMarks: 100,
        instructions: ''
      });
      setView('list');
      alert('Exam created successfully!');
    }
  };

  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || exam.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

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
                  Exam Management
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Create and manage exams for your classes
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="gradient" onClick={() => setView('create')}>
                <Plus className="h-4 w-4 mr-2" />
                Create Exam
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === 'list' && (
          <>
            {/* Filters */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input
                      placeholder="Search exams..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                    <option value="all">All Status</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Total Exams</p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">{exams.length}</p>
                    </div>
                    <Target className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Upcoming</p>
                      <p className="text-2xl font-bold text-orange-600">
                        {exams.filter(e => e.status === 'upcoming').length}
                      </p>
                    </div>
                    <Calendar className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Completed</p>
                      <p className="text-2xl font-bold text-green-600">
                        {exams.filter(e => e.status === 'completed').length}
                      </p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Total Students</p>
                      <p className="text-2xl font-bold text-purple-600">
                        {exams.reduce((sum, e) => sum + e.students, 0)}
                      </p>
                    </div>
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Exams List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredExams.map((exam) => (
                <Card key={exam.id} className="hover-lift">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{exam.title}</CardTitle>
                        <CardDescription>{exam.subject} • {exam.class}</CardDescription>
                      </div>
                      <Badge variant={getStatusColor(exam.status)}>
                        {exam.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-slate-600 dark:text-slate-400">Date</p>
                          <p className="font-medium">{formatDate(exam.date)}</p>
                        </div>
                        <div>
                          <p className="text-slate-600 dark:text-slate-400">Time</p>
                          <p className="font-medium">{exam.time}</p>
                        </div>
                        <div>
                          <p className="text-slate-600 dark:text-slate-400">Duration</p>
                          <p className="font-medium">{exam.duration}</p>
                        </div>
                        <div>
                          <p className="text-slate-600 dark:text-slate-400">Max Marks</p>
                          <p className="font-medium">{exam.maxMarks}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">Syllabus</p>
                        <p className="font-medium text-sm">{exam.syllabus}</p>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t">
                        <div className="flex items-center space-x-1 text-sm text-slate-600 dark:text-slate-400">
                          <Users className="h-4 w-4" />
                          <span>{exam.students} students</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
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
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <Plus className="h-5 w-5 mr-2" />
                    Create New Exam
                  </CardTitle>
                  <CardDescription>
                    Schedule a new exam for your students
                  </CardDescription>
                </div>
                <Button variant="ghost" onClick={() => setView('list')}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Exam Title *
                  </label>
                  <Input
                    value={newExam.title}
                    onChange={(e) => setNewExam({...newExam, title: e.target.value})}
                    placeholder="Enter exam title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Exam Type
                  </label>
                  <Select
                    value={newExam.type}
                    onChange={(e) => setNewExam({...newExam, type: e.target.value})}
                  >
                    <option value="Unit Test">Unit Test</option>
                    <option value="Midterm Exam">Midterm Exam</option>
                    <option value="Final Exam">Final Exam</option>
                    <option value="Practical Exam">Practical Exam</option>
                    <option value="Quiz">Quiz</option>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Subject
                  </label>
                  <Select
                    value={newExam.subject}
                    onChange={(e) => setNewExam({...newExam, subject: e.target.value})}
                  >
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="English">English</option>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Class
                  </label>
                  <Select
                    value={newExam.class}
                    onChange={(e) => setNewExam({...newExam, class: e.target.value})}
                  >
                    <option value="Class 12-A">Class 12-A</option>
                    <option value="Class 11-B">Class 11-B</option>
                    <option value="Class 12-C">Class 12-C</option>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Date *
                  </label>
                  <Input
                    type="date"
                    value={newExam.date}
                    onChange={(e) => setNewExam({...newExam, date: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Time *
                  </label>
                  <Input
                    type="time"
                    value={newExam.time}
                    onChange={(e) => setNewExam({...newExam, time: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Duration
                  </label>
                  <Input
                    value={newExam.duration}
                    onChange={(e) => setNewExam({...newExam, duration: e.target.value})}
                    placeholder="e.g., 3 hours"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Maximum Marks
                  </label>
                  <Input
                    type="number"
                    value={newExam.maxMarks}
                    onChange={(e) => setNewExam({...newExam, maxMarks: parseInt(e.target.value)})}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Syllabus
                  </label>
                  <Input
                    value={newExam.syllabus}
                    onChange={(e) => setNewExam({...newExam, syllabus: e.target.value})}
                    placeholder="Enter syllabus covered"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Instructions
                  </label>
                  <textarea
                    className="w-full p-3 border border-slate-300 rounded-lg resize-none"
                    rows={4}
                    value={newExam.instructions}
                    onChange={(e) => setNewExam({...newExam, instructions: e.target.value})}
                    placeholder="Enter exam instructions..."
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-6 pt-6 border-t">
                <Button variant="outline" onClick={() => setView('list')}>
                  Cancel
                </Button>
                <Button variant="gradient" onClick={handleCreateExam}>
                  <Save className="h-4 w-4 mr-2" />
                  Create Exam
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ExamsPage;