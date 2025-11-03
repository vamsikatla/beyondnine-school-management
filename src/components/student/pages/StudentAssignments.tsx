"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Upload,
  Download,
  Eye,
  Send,
  Calendar,
  Search,
  Filter,
  Plus
} from 'lucide-react';

const StudentAssignments: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [submissionModal, setSubmissionModal] = useState<string | null>(null);
  const [submissionText, setSubmissionText] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const [assignments] = useState([
    {
      id: '1',
      title: 'Calculus Problem Set #3',
      description: 'Complete problems 1-20 from Chapter 5. Show all work and explain your reasoning.',
      subject: 'Mathematics',
      subjectCode: 'MATH401',
      teacher: 'Dr. Priya Gupta',
      dueDate: '2024-09-30T23:59:00',
      submittedDate: null,
      status: 'pending',
      priority: 'high',
      maxScore: 100,
      score: null,
      grade: null,
      feedback: null,
      attachments: ['problem_set_3.pdf', 'formula_sheet.pdf'],
      submissionType: 'file',
      allowLateSubmission: true,
      instructions: 'Submit your solutions as a PDF file. Include step-by-step solutions for each problem.',
      estimatedTime: '3-4 hours'
    },
    {
      id: '2',
      title: 'Physics Lab Report - Pendulum Motion',
      description: 'Write a comprehensive lab report based on the pendulum motion experiment.',
      subject: 'Physics',
      subjectCode: 'PHY301',
      teacher: 'Prof. Rajesh Kumar',
      dueDate: '2024-09-28T11:59:00',
      submittedDate: '2024-09-27T10:30:00',
      status: 'submitted',
      priority: 'medium',
      maxScore: 50,
      score: 45,
      grade: 'A-',
      feedback: 'Good analysis but missing error calculations.',
      attachments: ['lab_instructions.pdf', 'data_template.xlsx'],
      submissionType: 'file',
      allowLateSubmission: false,
      instructions: 'Follow the lab report template provided.',
      estimatedTime: '2-3 hours'
    },
    {
      id: '3',
      title: 'Organic Chemistry Research Paper',
      description: 'Write a 1500-word research paper on organic synthesis methods.',
      subject: 'Chemistry',
      subjectCode: 'CHEM301',
      teacher: 'Dr. Sarah Wilson',
      dueDate: '2024-10-05T23:59:00',
      submittedDate: null,
      status: 'in_progress',
      priority: 'high',
      maxScore: 100,
      score: null,
      grade: null,
      feedback: null,
      attachments: ['research_guidelines.pdf', 'citation_guide.pdf'],
      submissionType: 'file',
      allowLateSubmission: true,
      instructions: 'Use APA format for citations. Include at least 10 peer-reviewed sources.',
      estimatedTime: '6-8 hours'
    },
    {
      id: '4',
      title: 'Shakespeare Analysis Essay',
      description: 'Analyze the themes of power and corruption in Macbeth.',
      subject: 'English',
      subjectCode: 'ENG201',
      teacher: 'Ms. Emily Johnson',
      dueDate: '2024-09-25T23:59:00',
      submittedDate: null,
      status: 'overdue',
      priority: 'medium',
      maxScore: 75,
      score: null,
      grade: null,
      feedback: null,
      attachments: ['essay_rubric.pdf'],
      submissionType: 'text',
      allowLateSubmission: true,
      instructions: 'Essay should be 1000-1200 words. Include proper citations.',
      estimatedTime: '3-4 hours'
    },
    {
      id: '5',
      title: 'Computer Science Project',
      description: 'Create a web application using React and Node.js.',
      subject: 'Computer Science',
      subjectCode: 'CS201',
      teacher: 'Dr. Michael Chang',
      dueDate: '2024-10-10T23:59:00',
      submittedDate: null,
      status: 'not_started',
      priority: 'high',
      maxScore: 150,
      score: null,
      grade: null,
      feedback: null,
      attachments: ['project_requirements.pdf', 'starter_code.zip'],
      submissionType: 'file',
      allowLateSubmission: false,
      instructions: 'Include source code, documentation, and a demo video.',
      estimatedTime: '10-12 hours'
    }
  ]);

  const [stats] = useState({
    total: assignments.length,
    pending: assignments.filter(a => ['pending', 'in_progress', 'not_started'].includes(a.status)).length,
    submitted: assignments.filter(a => a.status === 'submitted').length,
    graded: assignments.filter(a => a.grade !== null).length,
    overdue: assignments.filter(a => a.status === 'overdue').length
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'not_started':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'submitted':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'graded':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'overdue':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'in_progress':
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleSubmitAssignment = (assignmentId: string) => {
    setSubmissionModal(assignmentId);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const handleSubmissionSubmit = () => {
    console.log('Submitting assignment:', submissionModal);
    console.log('Text submission:', submissionText);
    console.log('Files:', uploadedFiles);
    
    // Simulate submission
    alert('Assignment submitted successfully!');
    setSubmissionModal(null);
    setSubmissionText('');
    setUploadedFiles([]);
  };

  const handleViewAssignment = (assignmentId: string) => {
    console.log('Viewing assignment:', assignmentId);
    alert(`Opening assignment ${assignmentId} details...`);
  };

  const handleDownloadAttachment = (filename: string) => {
    console.log('Downloading:', filename);
    alert(`Downloading ${filename}...`);
  };

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || assignment.subject === selectedSubject;
    const matchesStatus = selectedStatus === 'all' || assignment.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || assignment.priority === selectedPriority;

    return matchesSearch && matchesSubject && matchesStatus && matchesPriority;
  });

  const pendingAssignments = filteredAssignments.filter(a => 
    ['pending', 'in_progress', 'not_started'].includes(a.status)
  );
  const submittedAssignments = filteredAssignments.filter(a => a.status === 'submitted');
  const overdueAssignments = filteredAssignments.filter(a => a.status === 'overdue');

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <p className="text-sm text-muted-foreground">Total</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.submitted}</div>
            <p className="text-sm text-muted-foreground">Submitted</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.graded}</div>
            <p className="text-sm text-muted-foreground">Graded</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{stats.overdue}</div>
            <p className="text-sm text-muted-foreground">Overdue</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Assignments</TabsTrigger>
          <TabsTrigger value="pending">Pending ({stats.pending})</TabsTrigger>
          <TabsTrigger value="submitted">Submitted ({stats.submitted})</TabsTrigger>
          <TabsTrigger value="overdue">Overdue ({stats.overdue})</TabsTrigger>
        </TabsList>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search assignments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="All Subjects" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="not_started">Not Started</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                <SelectTrigger>
                  <SelectValue placeholder="All Priorities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="low">Low Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <TabsContent value="all" className="space-y-4">
          {filteredAssignments.map((assignment) => (
            <AssignmentCard
              key={assignment.id}
              assignment={assignment}
              onSubmit={handleSubmitAssignment}
              onView={handleViewAssignment}
              onDownload={handleDownloadAttachment}
              getStatusColor={getStatusColor}
              getPriorityColor={getPriorityColor}
              getStatusIcon={getStatusIcon}
              getDaysUntilDue={getDaysUntilDue}
            />
          ))}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {pendingAssignments.map((assignment) => (
            <AssignmentCard
              key={assignment.id}
              assignment={assignment}
              onSubmit={handleSubmitAssignment}
              onView={handleViewAssignment}
              onDownload={handleDownloadAttachment}
              getStatusColor={getStatusColor}
              getPriorityColor={getPriorityColor}
              getStatusIcon={getStatusIcon}
              getDaysUntilDue={getDaysUntilDue}
            />
          ))}
        </TabsContent>

        <TabsContent value="submitted" className="space-y-4">
          {submittedAssignments.map((assignment) => (
            <AssignmentCard
              key={assignment.id}
              assignment={assignment}
              onSubmit={handleSubmitAssignment}
              onView={handleViewAssignment}
              onDownload={handleDownloadAttachment}
              getStatusColor={getStatusColor}
              getPriorityColor={getPriorityColor}
              getStatusIcon={getStatusIcon}
              getDaysUntilDue={getDaysUntilDue}
            />
          ))}
        </TabsContent>

        <TabsContent value="overdue" className="space-y-4">
          {overdueAssignments.map((assignment) => (
            <AssignmentCard
              key={assignment.id}
              assignment={assignment}
              onSubmit={handleSubmitAssignment}
              onView={handleViewAssignment}
              onDownload={handleDownloadAttachment}
              getStatusColor={getStatusColor}
              getPriorityColor={getPriorityColor}
              getStatusIcon={getStatusIcon}
              getDaysUntilDue={getDaysUntilDue}
            />
          ))}
        </TabsContent>
      </Tabs>

      {/* Submission Modal */}
      <Dialog open={!!submissionModal} onOpenChange={() => setSubmissionModal(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Submit Assignment</DialogTitle>
            <DialogDescription>
              {submissionModal && assignments.find(a => a.id === submissionModal)?.title}
            </DialogDescription>
          </DialogHeader>
          
          {submissionModal && (() => {
            const assignment = assignments.find(a => a.id === submissionModal);
            if (!assignment) return null;

            return (
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Assignment Details</h4>
                  <p className="text-sm text-muted-foreground mb-2">{assignment.description}</p>
                  <div className="text-xs text-muted-foreground">
                    <p>Due: {new Date(assignment.dueDate).toLocaleString()}</p>
                    <p>Max Score: {assignment.maxScore} points</p>
                    <p>Estimated Time: {assignment.estimatedTime}</p>
                  </div>
                </div>

                {assignment.instructions && (
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Instructions</h4>
                    <p className="text-sm">{assignment.instructions}</p>
                  </div>
                )}

                {assignment.submissionType === 'text' || assignment.submissionType === 'both' ? (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Text Submission</label>
                    <Textarea
                      placeholder="Enter your submission text here..."
                      value={submissionText}
                      onChange={(e) => setSubmissionText(e.target.value)}
                      rows={6}
                    />
                  </div>
                ) : null}

                {assignment.submissionType === 'file' || assignment.submissionType === 'both' ? (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">File Upload</label>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="block w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
                    />
                    
                    {uploadedFiles.length > 0 && (
                      <div className="space-y-2">
                        <h5 className="text-sm font-medium">Uploaded Files:</h5>
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                            <span className="text-sm">{file.name}</span>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setUploadedFiles(prev => prev.filter((_, i) => i !== index))}
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : null}

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setSubmissionModal(null)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSubmissionSubmit}
                    disabled={
                      (assignment.submissionType === 'text' && !submissionText.trim()) ||
                      (assignment.submissionType === 'file' && uploadedFiles.length === 0)
                    }
                  >
                    Submit Assignment
                  </Button>
                </div>
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Assignment Card Component
interface AssignmentCardProps {
  assignment: any;
  onSubmit: (id: string) => void;
  onView: (id: string) => void;
  onDownload: (filename: string) => void;
  getStatusColor: (status: string) => string;
  getPriorityColor: (priority: string) => string;
  getStatusIcon: (status: string) => React.ReactNode;
  getDaysUntilDue: (date: string) => number;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({
  assignment,
  onSubmit,
  onView,
  onDownload,
  getStatusColor,
  getPriorityColor,
  getStatusIcon,
  getDaysUntilDue
}) => {
  const daysLeft = getDaysUntilDue(assignment.dueDate);
  
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                {getStatusIcon(assignment.status)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-lg">{assignment.title}</h3>
                  <Badge className={getStatusColor(assignment.status)}>
                    {assignment.status.replace('_', ' ')}
                  </Badge>
                  <Badge className={getPriorityColor(assignment.priority)} variant="outline">
                    {assignment.priority}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{assignment.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                  <div>
                    <span className="font-medium">Subject:</span> {assignment.subject}
                  </div>
                  <div>
                    <span className="font-medium">Teacher:</span> {assignment.teacher}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span className={daysLeft < 0 ? 'text-red-600' : daysLeft <= 2 ? 'text-yellow-600' : ''}>
                      {daysLeft < 0 ? `${Math.abs(daysLeft)} days overdue` : 
                       daysLeft === 0 ? 'Due today' : 
                       `${daysLeft} days left`}
                    </span>
                  </div>
                </div>

                {assignment.score !== null && (
                  <div className="mt-3 p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Grade: {assignment.grade}</span>
                      <span className="text-sm">
                        {assignment.score}/{assignment.maxScore} ({Math.round((assignment.score / assignment.maxScore) * 100)}%)
                      </span>
                    </div>
                    {assignment.feedback && (
                      <p className="text-sm text-green-700 mt-2 italic">{assignment.feedback}</p>
                    )}
                  </div>
                )}

                {assignment.attachments.length > 0 && (
                  <div className="mt-3">
                    <h4 className="text-sm font-medium mb-2">Attachments:</h4>
                    <div className="flex flex-wrap gap-2">
                      {assignment.attachments.map((filename: string, index: number) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => onDownload(filename)}
                          className="text-xs"
                        >
                          <Download className="h-3 w-3 mr-1" />
                          {filename}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 ml-4">
            {assignment.status === 'submitted' ? (
              <Button variant="outline" size="sm" onClick={() => onView(assignment.id)}>
                <Eye className="h-3 w-3 mr-1" />
                View
              </Button>
            ) : (
              <Button size="sm" onClick={() => onSubmit(assignment.id)}>
                <Send className="h-3 w-3 mr-1" />
                Submit
              </Button>
            )}
            
            <Button variant="outline" size="sm" onClick={() => onView(assignment.id)}>
              <FileText className="h-3 w-3 mr-1" />
              Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentAssignments;