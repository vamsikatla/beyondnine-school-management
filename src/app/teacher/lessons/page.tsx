"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  BookMarked, Plus, Search, Calendar, Clock, Users, ArrowLeft,
  Edit, Eye, Trash2, Save, X, BookOpen, FileText, Download
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

const initialLessonPlans = [
  {
    id: 1,
    title: "Integration Techniques",
    subject: "Calculus",
    class: "Class 12-A",
    date: "2024-01-15",
    duration: "60 mins",
    status: "completed",
    objectives: ["Understand basic integration", "Apply substitution method", "Solve complex integrals"],
    resources: ["Textbook Chapter 5", "Video Lecture", "Practice Worksheet"],
    activities: ["Warm-up problems", "Guided practice", "Independent work"],
    assessment: "Exit ticket with 3 integration problems"
  },
  {
    id: 2,
    title: "Probability Distributions",
    subject: "Statistics",
    class: "Class 12-C",
    date: "2024-01-17",
    duration: "90 mins",
    status: "scheduled",
    objectives: ["Learn normal distribution", "Calculate probabilities", "Apply to real-world scenarios"],
    resources: ["Workbook Exercises", "Online Calculator", "Statistical Tables"],
    activities: ["Distribution examples", "Calculator practice", "Group problem-solving"],
    assessment: "Quiz on probability calculations"
  },
  {
    id: 3,
    title: "Linear Algebra Introduction",
    subject: "Advanced Mathematics",
    class: "Class 12-A",
    date: "2024-01-20",
    duration: "75 mins",
    status: "draft",
    objectives: ["Define vectors and matrices", "Understand matrix operations", "Solve linear systems"],
    resources: ["Linear Algebra Textbook", "Graphing Calculator", "Matrix Examples"],
    activities: ["Matrix manipulation", "System solving", "Real-world applications"],
    assessment: "Problem set on matrix operations"
  }
];

const LessonsPage = () => {
  const router = useRouter();
  const [lessonPlans, setLessonPlans] = React.useState(initialLessonPlans);
  const [view, setView] = React.useState('list'); // list, create, edit, preview
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterStatus, setFilterStatus] = React.useState("all");
  const [selectedLesson, setSelectedLesson] = React.useState(null);

  const [newLesson, setNewLesson] = React.useState({
    title: '',
    subject: 'Mathematics',
    class: 'Class 12-A',
    date: '',
    duration: '60 mins',
    objectives: [''],
    resources: [''],
    activities: [''],
    assessment: ''
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'scheduled': return 'info';
      case 'draft': return 'secondary';
      case 'cancelled': return 'destructive';
      default: return 'default';
    }
  };

  const handleCreateLesson = () => {
    if (newLesson.title && newLesson.date) {
      const lesson = {
        id: lessonPlans.length + 1,
        ...newLesson,
        status: 'scheduled'
      };
      setLessonPlans([lesson, ...lessonPlans]);
      setNewLesson({
        title: '',
        subject: 'Mathematics',
        class: 'Class 12-A',
        date: '',
        duration: '60 mins',
        objectives: [''],
        resources: [''],
        activities: [''],
        assessment: ''
      });
      setView('list');
      alert('Lesson plan created successfully!');
    }
  };

  const addObjective = () => {
    setNewLesson({
      ...newLesson,
      objectives: [...newLesson.objectives, '']
    });
  };

  const removeObjective = (index) => {
    const newObjectives = newLesson.objectives.filter((_, i) => i !== index);
    setNewLesson({
      ...newLesson,
      objectives: newObjectives.length > 0 ? newObjectives : ['']
    });
  };

  const updateObjective = (index, value) => {
    const newObjectives = [...newLesson.objectives];
    newObjectives[index] = value;
    setNewLesson({
      ...newLesson,
      objectives: newObjectives
    });
  };

  const addResource = () => {
    setNewLesson({
      ...newLesson,
      resources: [...newLesson.resources, '']
    });
  };

  const removeResource = (index) => {
    const newResources = newLesson.resources.filter((_, i) => i !== index);
    setNewLesson({
      ...newLesson,
      resources: newResources.length > 0 ? newResources : ['']
    });
  };

  const updateResource = (index, value) => {
    const newResources = [...newLesson.resources];
    newResources[index] = value;
    setNewLesson({
      ...newLesson,
      resources: newResources
    });
  };

  const filteredLessons = lessonPlans.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lesson.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || lesson.status === filterStatus;
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
                  Lesson Plans
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Create and manage your lesson plans
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
                New Lesson Plan
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
                      placeholder="Search lesson plans..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                    <option value="all">All Status</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                    <option value="draft">Draft</option>
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
                      <p className="text-sm text-slate-600 dark:text-slate-400">Total Lessons</p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">{lessonPlans.length}</p>
                    </div>
                    <BookMarked className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Scheduled</p>
                      <p className="text-2xl font-bold text-orange-600">
                        {lessonPlans.filter(l => l.status === 'scheduled').length}
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
                        {lessonPlans.filter(l => l.status === 'completed').length}
                      </p>
                    </div>
                    <BookOpen className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Draft</p>
                      <p className="text-2xl font-bold text-gray-600">
                        {lessonPlans.filter(l => l.status === 'draft').length}
                      </p>
                    </div>
                    <FileText className="h-8 w-8 text-gray-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Lesson Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredLessons.map((lesson) => (
                <Card key={lesson.id} className="hover-lift">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{lesson.title}</CardTitle>
                        <CardDescription>{lesson.subject} • {lesson.class}</CardDescription>
                      </div>
                      <Badge variant={getStatusColor(lesson.status)}>
                        {lesson.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-slate-600 dark:text-slate-400">Date</p>
                          <p className="font-medium">{formatDate(lesson.date)}</p>
                        </div>
                        <div>
                          <p className="text-slate-600 dark:text-slate-400">Duration</p>
                          <p className="font-medium">{lesson.duration}</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-1">Objectives</p>
                        <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                          {lesson.objectives.slice(0, 2).map((objective, index) => (
                            <li key={index} className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>{objective}</span>
                            </li>
                          ))}
                          {lesson.objectives.length > 2 && (
                            <li className="text-slate-500">+{lesson.objectives.length - 2} more</li>
                          )}
                        </ul>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t">
                        <div className="flex items-center space-x-1 text-sm text-slate-600 dark:text-slate-400">
                          <Clock className="h-4 w-4" />
                          <span>{lesson.duration}</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => setView('preview')}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => setView('edit')}>
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
                    Create New Lesson Plan
                  </CardTitle>
                  <CardDescription>
                    Plan your lesson with objectives, activities, and assessments
                  </CardDescription>
                </div>
                <Button variant="ghost" onClick={() => setView('list')}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Lesson Title *
                    </label>
                    <Input
                      value={newLesson.title}
                      onChange={(e) => setNewLesson({...newLesson, title: e.target.value})}
                      placeholder="Enter lesson title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Duration
                    </label>
                    <Input
                      value={newLesson.duration}
                      onChange={(e) => setNewLesson({...newLesson, duration: e.target.value})}
                      placeholder="e.g., 60 mins"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Subject
                    </label>
                    <Select
                      value={newLesson.subject}
                      onChange={(e) => setNewLesson({...newLesson, subject: e.target.value})}
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
                      value={newLesson.class}
                      onChange={(e) => setNewLesson({...newLesson, class: e.target.value})}
                    >
                      <option value="Class 12-A">Class 12-A</option>
                      <option value="Class 11-B">Class 11-B</option>
                      <option value="Class 12-C">Class 12-C</option>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Date *
                    </label>
                    <Input
                      type="date"
                      value={newLesson.date}
                      onChange={(e) => setNewLesson({...newLesson, date: e.target.value})}
                    />
                  </div>
                </div>

                {/* Learning Objectives */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Learning Objectives
                  </label>
                  <div className="space-y-2">
                    {newLesson.objectives.map((objective, index) => (
                      <div key={index} className="flex space-x-2">
                        <Input
                          value={objective}
                          onChange={(e) => updateObjective(index, e.target.value)}
                          placeholder={`Objective ${index + 1}`}
                        />
                        {newLesson.objectives.length > 1 && (
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

                {/* Resources */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Resources & Materials
                  </label>
                  <div className="space-y-2">
                    {newLesson.resources.map((resource, index) => (
                      <div key={index} className="flex space-x-2">
                        <Input
                          value={resource}
                          onChange={(e) => updateResource(index, e.target.value)}
                          placeholder={`Resource ${index + 1}`}
                        />
                        {newLesson.resources.length > 1 && (
                          <Button variant="outline" size="sm" onClick={() => removeResource(index)}>
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={addResource}>
                      <Plus className="h-4 w-4 mr-1" />
                      Add Resource
                    </Button>
                  </div>
                </div>

                {/* Assessment */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Assessment Method
                  </label>
                  <textarea
                    className="w-full p-3 border border-slate-300 rounded-lg resize-none"
                    rows={3}
                    value={newLesson.assessment}
                    onChange={(e) => setNewLesson({...newLesson, assessment: e.target.value})}
                    placeholder="Describe how you will assess student learning..."
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-6 pt-6 border-t">
                <Button variant="outline" onClick={() => setView('list')}>
                  Cancel
                </Button>
                <Button variant="gradient" onClick={handleCreateLesson}>
                  <Save className="h-4 w-4 mr-2" />
                  Create Lesson Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LessonsPage;