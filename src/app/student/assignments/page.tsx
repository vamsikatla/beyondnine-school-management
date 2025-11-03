"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  FileText, ArrowLeft, Search, Calendar, Clock, Upload,
  CheckCircle, AlertCircle, Eye, Download, Plus
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

const studentAssignments = [
  {
    id: 1,
    title: "Calculus Problem Set #5",
    subject: "Mathematics",
    teacher: "Dr. Priya Gupta",
    assignedDate: "2024-01-10",
    dueDate: "2024-01-20",
    status: "pending",
    maxMarks: 100,
    submittedDate: null,
    score: null,
    feedback: null,
    description: "Solve integration problems from chapter 5. Show all working steps.",
    attachments: ["calculus_problems.pdf"]
  },
  {
    id: 2,
    title: "Physics Lab Report - Wave Motion",
    subject: "Physics",
    teacher: "Mr. Raj Kumar",
    assignedDate: "2024-01-12",
    dueDate: "2024-01-18",
    status: "submitted",
    maxMarks: 100,
    submittedDate: "2024-01-17",
    score: null,
    feedback: null,
    description: "Complete lab report on wave motion experiment conducted in class.",
    attachments: ["lab_guidelines.pdf"]
  },
  {
    id: 3,
    title: "Chemistry Assignment - Organic Compounds",
    subject: "Chemistry",
    teacher: "Ms. Anita Singh",
    assignedDate: "2024-01-05",
    dueDate: "2024-01-15",
    status: "graded",
    maxMarks: 100,
    submittedDate: "2024-01-14",
    score: 88,
    feedback: "Good work! Improve your structural formulas.",
    description: "Analysis of organic compounds and their properties.",
    attachments: ["organic_compounds.pdf"]
  },
  {
    id: 4,
    title: "English Essay - Modern Literature",
    subject: "English",
    teacher: "Mrs. Sarah Wilson",
    assignedDate: "2024-01-08",
    dueDate: "2024-01-22",
    status: "overdue",
    maxMarks: 50,
    submittedDate: null,
    score: null,
    feedback: null,
    description: "Write a 1500-word essay on themes in modern literature.",
    attachments: ["essay_guidelines.pdf"]
  }
];

const StudentAssignmentsPage = () => {
  const router = useRouter();
  const [assignments, setAssignments] = React.useState(studentAssignments);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterStatus, setFilterStatus] = React.useState("all");
  const [selectedAssignment, setSelectedAssignment] = React.useState(null);
  const [showSubmitModal, setShowSubmitModal] = React.useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'submitted': return 'info';
      case 'graded': return 'success';
      case 'overdue': return 'destructive';
      default: return 'default';
    }
  };

  const getDaysLeft = (dueDate) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = due - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || assignment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSubmitAssignment = (assignmentId) => {
    // In real app, this would handle file upload and submission
    setAssignments(assignments.map(a => 
      a.id === assignmentId 
        ? { ...a, status: 'submitted', submittedDate: new Date().toISOString().split('T')[0] }
        : a
    ));
    setShowSubmitModal(false);
    alert('Assignment submitted successfully!');
  };

  const pendingCount = assignments.filter(a => a.status === 'pending').length;
  const submittedCount = assignments.filter(a => a.status === 'submitted').length;
  const gradedCount = assignments.filter(a => a.status === 'graded').length;
  const overdueCount = assignments.filter(a => a.status === 'overdue').length;

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
                  My Assignments
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  View and submit your assignments
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="info" className="hidden md:flex">
                {pendingCount} Pending
              </Badge>
              <Badge variant="warning" className="hidden md:flex">
                {overdueCount} Overdue
              </Badge>
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
                  placeholder="Search assignments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="submitted">Submitted</option>
                <option value="graded">Graded</option>
                <option value="overdue">Overdue</option>
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
                  <p className="text-sm text-slate-600 dark:text-slate-400">Pending</p>
                  <p className="text-2xl font-bold text-orange-600">{pendingCount}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Submitted</p>
                  <p className="text-2xl font-bold text-blue-600">{submittedCount}</p>
                </div>
                <Upload className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Graded</p>
                  <p className="text-2xl font-bold text-green-600">{gradedCount}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Overdue</p>
                  <p className="text-2xl font-bold text-red-600">{overdueCount}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Assignments List */}
        <div className="grid grid-cols-1 gap-6">
          {filteredAssignments.map((assignment) => {
            const daysLeft = getDaysLeft(assignment.dueDate);
            return (
              <Card key={assignment.id} className="hover-lift">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <CardTitle className="text-lg">{assignment.title}</CardTitle>
                        <Badge variant={getStatusColor(assignment.status)}>
                          {assignment.status}
                        </Badge>
                        {daysLeft <= 3 && assignment.status === 'pending' && (
                          <Badge variant="destructive">
                            {daysLeft === 0 ? 'Due Today' : `${daysLeft} days left`}
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="mt-1">
                        {assignment.subject} • {assignment.teacher}
                      </CardDescription>
                    </div>
                    {assignment.score !== null && (
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">{assignment.score}</p>
                        <p className="text-sm text-slate-600">/{assignment.maxMarks}</p>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {assignment.description}
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Assigned</p>
                        <p className="font-medium">{formatDate(assignment.assignedDate)}</p>
                      </div>
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Due Date</p>
                        <p className="font-medium">{formatDate(assignment.dueDate)}</p>
                      </div>
                      {assignment.submittedDate && (
                        <div>
                          <p className="text-slate-600 dark:text-slate-400">Submitted</p>
                          <p className="font-medium">{formatDate(assignment.submittedDate)}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Max Marks</p>
                        <p className="font-medium">{assignment.maxMarks}</p>
                      </div>
                    </div>

                    {assignment.feedback && (
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
                          Teacher Feedback:
                        </p>
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                          {assignment.feedback}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center space-x-2">
                        {assignment.attachments && assignment.attachments.length > 0 && (
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download ({assignment.attachments.length})
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                      
                      {assignment.status === 'pending' && (
                        <Button 
                          variant="gradient" 
                          onClick={() => handleSubmitAssignment(assignment.id)}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Submit Assignment
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredAssignments.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="h-12 w-12 mx-auto text-slate-400 mb-4" />
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                No assignments found
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Try adjusting your search or filter criteria.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default StudentAssignmentsPage;