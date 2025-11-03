"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  FileText, Plus, Search, Filter, MoreHorizontal, Eye, Edit, 
  Trash2, Calendar, Users, Clock, ArrowLeft, Download, 
  CheckCircle, AlertCircle, X, Save
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { DataTable } from '@/components/ui/DataTable';
import { cn } from '@/lib/utils';

// Mock data
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
    type: "homework",
    description: "Solve integration problems from chapter 5",
    maxMarks: 100,
    attachment: "calculus_problems.pdf"
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
    type: "project",
    description: "Analyze real-world data and present findings",
    maxMarks: 150,
    attachment: "project_guidelines.pdf"
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
    type: "quiz",
    description: "Quick assessment on chapter 3 concepts",
    maxMarks: 50,
    attachment: null
  }
];

const submissions = [
  {
    id: 1,
    assignmentId: 1,
    studentName: "Aarav Sharma",
    rollNumber: "12A001",
    submittedDate: "2024-01-14",
    status: "submitted",
    score: null,
    feedback: null
  },
  {
    id: 2,
    assignmentId: 1,
    studentName: "Priya Patel",
    rollNumber: "12A002",
    submittedDate: "2024-01-13",
    status: "graded",
    score: 95,
    feedback: "Excellent work!"
  }
];

const AssignmentsPage = () => {
  const router = useRouter();
  const [assignments, setAssignments] = React.useState(initialAssignments);
  const [selectedAssignment, setSelectedAssignment] = React.useState(null);
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterClass, setFilterClass] = React.useState("all");
  const [filterStatus, setFilterStatus] = React.useState("all");
  const [view, setView] = React.useState("list"); // list, submissions, create, edit

  const [newAssignment, setNewAssignment] = React.useState({
    title: '',
    class: 'Class 12-A',
    subject: 'Advanced Mathematics',
    dueDate: '',
    type: 'homework',
    description: '',
    maxMarks: 100,
    attachment: null
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'info';
      case 'graded': return 'success';
      case 'expired': return 'warning';
      case 'draft': return 'secondary';
      default: return 'default';
    }
  };

  const handleCreateAssignment = () => {
    if (newAssignment.title && newAssignment.dueDate) {
      const assignment = {
        id: assignments.length + 1,
        ...newAssignment,
        assignedDate: new Date().toISOString().split('T')[0],
        status: "active",
        submissions: 0,
        totalStudents: 35,
        attachment: null
      };
      setAssignments([assignment, ...assignments]);
      setNewAssignment({
        title: '',
        class: 'Class 12-A',
        subject: 'Advanced Mathematics',
        dueDate: '',
        type: 'homework',
        description: '',
        maxMarks: 100,
        attachment: null
      });
      setView('list');
      alert('Assignment created successfully!');
    }
  };

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = filterClass === "all" || assignment.class === filterClass;
    const matchesStatus = filterStatus === "all" || assignment.status === filterStatus;
    return matchesSearch && matchesClass && matchesStatus;
  });

  const assignmentColumns = [
    {
      key: 'title',
      label: 'Assignment',
      sortable: true,
      render: (value, row) => (
        <div>
          <p className="font-medium text-slate-900 dark:text-white">{value}</p>
          <p className="text-sm text-slate-600 dark:text-slate-400">{row.subject}</p>
        </div>
      )
    },
    {
      key: 'class',
      label: 'Class',
      sortable: true
    },
    {
      key: 'dueDate',
      label: 'Due Date',
      sortable: true,
      render: (value) => formatDate(value)
    },
    {
      key: 'submissions',
      label: 'Submissions',
      render: (value, row) => (
        <span className={cn(
          "font-medium",
          value === row.totalStudents ? "text-green-600" : "text-orange-600"
        )}>
          {value}/{row.totalStudents}
        </span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <Badge variant={getStatusColor(value)}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Badge>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" onClick={() => setView('submissions')}>
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setView('edit')}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-red-600">
            <Trash2 className="h-4 w-4" />
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
                  Assignments Management
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Create and manage assignments for your classes
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
                Create Assignment
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
                      placeholder="Search assignments..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filterClass} onChange={(e) => setFilterClass(e.target.value)}>
                    <option value="all">All Classes</option>
                    <option value="Class 12-A">Class 12-A</option>
                    <option value="Class 11-B">Class 11-B</option>
                    <option value="Class 12-C">Class 12-C</option>
                  </Select>
                  <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="graded">Graded</option>
                    <option value="expired">Expired</option>
                    <option value="draft">Draft</option>
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
                      <p className="text-sm text-slate-600 dark:text-slate-400">Total Assignments</p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">{assignments.length}</p>
                    </div>
                    <FileText className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Active</p>
                      <p className="text-2xl font-bold text-green-600">
                        {assignments.filter(a => a.status === 'active').length}
                      </p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Pending Review</p>
                      <p className="text-2xl font-bold text-orange-600">
                        {assignments.reduce((sum, a) => sum + (a.totalStudents - a.submissions), 0)}
                      </p>
                    </div>
                    <Clock className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Graded</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {assignments.filter(a => a.status === 'graded').length}
                      </p>
                    </div>
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Assignments Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  All Assignments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable
                  columns={assignmentColumns}
                  data={filteredAssignments}
                  searchKey="title"
                  searchPlaceholder="Search assignments..."
                  showSearch={false}
                  showPagination={true}
                  pageSize={10}
                />
              </CardContent>
            </Card>
          </>
        )}

        {view === 'create' && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <Plus className="h-5 w-5 mr-2" />
                    Create New Assignment
                  </CardTitle>
                  <CardDescription>
                    Create a new assignment for your students
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
                    Assignment Title *
                  </label>
                  <Input
                    value={newAssignment.title}
                    onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                    placeholder="Enter assignment title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Assignment Type
                  </label>
                  <Select
                    value={newAssignment.type}
                    onChange={(e) => setNewAssignment({...newAssignment, type: e.target.value})}
                  >
                    <option value="homework">Homework</option>
                    <option value="project">Project</option>
                    <option value="quiz">Quiz</option>
                    <option value="exam">Exam</option>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
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
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
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
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Due Date *
                  </label>
                  <Input
                    type="date"
                    value={newAssignment.dueDate}
                    onChange={(e) => setNewAssignment({...newAssignment, dueDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Maximum Marks
                  </label>
                  <Input
                    type="number"
                    value={newAssignment.maxMarks}
                    onChange={(e) => setNewAssignment({...newAssignment, maxMarks: parseInt(e.target.value)})}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Description
                  </label>
                  <textarea
                    className="w-full p-3 border border-slate-300 rounded-lg resize-none"
                    rows={4}
                    value={newAssignment.description}
                    onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})}
                    placeholder="Enter assignment description and instructions..."
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Attach Files
                  </label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                    <FileText className="h-8 w-8 mx-auto text-slate-400 mb-2" />
                    <p className="text-sm text-slate-600 mb-2">
                      Drag and drop files here or click to browse
                    </p>
                    <Button variant="outline" size="sm">
                      Browse Files
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-6 pt-6 border-t">
                <Button variant="outline" onClick={() => setView('list')}>
                  Cancel
                </Button>
                <Button variant="gradient" onClick={handleCreateAssignment}>
                  <Save className="h-4 w-4 mr-2" />
                  Create Assignment
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AssignmentsPage;