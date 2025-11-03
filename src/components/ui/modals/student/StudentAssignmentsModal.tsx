"use client";

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  Calendar, 
  Clock,
  Upload,
  Download,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Edit,
  Send
} from 'lucide-react';

interface Assignment {
  id: string;
  title: string;
  description: string;
  subject: string;
  subjectCode: string;
  teacher: string;
  dueDate: string;
  submissionDate?: string;
  status: 'not_started' | 'in_progress' | 'submitted' | 'graded' | 'late';
  priority: 'low' | 'medium' | 'high';
  maxScore: number;
  score?: number;
  feedback?: string;
  attachments: string[];
  submissionType: 'file' | 'text' | 'both';
  allowLateSubmission: boolean;
  instructions?: string;
}

interface StudentAssignmentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentId: string;
  subjectId?: string;
  status?: 'pending' | 'submitted' | 'graded';
  onSubmitAssignment?: (assignmentId: string) => void;
}

const StudentAssignmentsModal: React.FC<StudentAssignmentsModalProps> = ({
  isOpen,
  onClose,
  studentId,
  subjectId,
  status,
  onSubmitAssignment
}) => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState(subjectId || 'all');
  const [selectedStatus, setSelectedStatus] = useState(status || 'all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [submissionText, setSubmissionText] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  // Mock assignments data
  const mockAssignments: Assignment[] = [
    {
      id: '1',
      title: 'Calculus Problem Set #3',
      description: 'Complete problems 1-20 from Chapter 5. Show all work and explain your reasoning for each solution.',
      subject: 'Mathematics',
      subjectCode: 'MATH101',
      teacher: 'Dr. Priya Gupta',
      dueDate: '2024-09-30T23:59:00',
      status: 'not_started',
      priority: 'high',
      maxScore: 100,
      attachments: ['problem_set_3.pdf'],
      submissionType: 'both',
      allowLateSubmission: true,
      instructions: 'Submit your solutions as a PDF file. Include step-by-step solutions for each problem.'
    },
    {
      id: '2',
      title: 'Physics Lab Report - Pendulum Motion',
      description: 'Write a comprehensive lab report based on the pendulum motion experiment conducted in class.',
      subject: 'Physics',
      subjectCode: 'PHY101',
      teacher: 'Prof. Rajesh Kumar',
      dueDate: '2024-09-28T11:59:00',
      submissionDate: '2024-09-27T10:30:00',
      status: 'submitted',
      priority: 'medium',
      maxScore: 50,
      score: 45,
      feedback: 'Good analysis but missing error calculations.',
      attachments: ['lab_instructions.pdf', 'data_template.xlsx'],
      submissionType: 'file',
      allowLateSubmission: false
    },
    {
      id: '3',
      title: 'Chemistry Research Paper',
      description: 'Write a 1500-word research paper on organic synthesis methods.',
      subject: 'Chemistry',
      subjectCode: 'CHEM101',
      teacher: 'Dr. Sarah Wilson',
      dueDate: '2024-10-05T23:59:00',
      status: 'in_progress',
      priority: 'high',
      maxScore: 100,
      attachments: ['research_guidelines.pdf'],
      submissionType: 'file',
      allowLateSubmission: true,
      instructions: 'Use APA format for citations. Include at least 10 peer-reviewed sources.'
    },
    {
      id: '4',
      title: 'English Essay - Shakespeare Analysis',
      description: 'Analyze the themes of power and corruption in Macbeth.',
      subject: 'English',
      subjectCode: 'ENG101',
      teacher: 'Ms. Emily Johnson',
      dueDate: '2024-09-25T23:59:00',
      status: 'late',
      priority: 'medium',
      maxScore: 75,
      attachments: ['essay_rubric.pdf'],
      submissionType: 'text',
      allowLateSubmission: true
    }
  ];

  useEffect(() => {
    const fetchAssignments = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setAssignments(mockAssignments);
      } catch (error) {
        console.error('Failed to fetch assignments:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      fetchAssignments();
    }
  }, [isOpen, studentId]);

  // Filter assignments
  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || assignment.subject === selectedSubject;
    const matchesStatus = selectedStatus === 'all' || assignment.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || assignment.priority === selectedPriority;

    let matchesTab = true;
    if (activeTab === 'pending') {
      matchesTab = ['not_started', 'in_progress'].includes(assignment.status);
    } else if (activeTab === 'submitted') {
      matchesTab = assignment.status === 'submitted';
    } else if (activeTab === 'graded') {
      matchesTab = assignment.status === 'graded';
    } else if (activeTab === 'overdue') {
      matchesTab = assignment.status === 'late' || (new Date(assignment.dueDate) < new Date() && !assignment.submissionDate);
    }

    return matchesSearch && matchesSubject && matchesStatus && matchesPriority && matchesTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'not_started':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'submitted':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'graded':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'late':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'graded':
        return <CheckCircle className="h-4 w-4 text-purple-600" />;
      case 'late':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
    }
  };

  const isOverdue = (dueDate: string, status: string) => {
    return new Date(dueDate) < new Date() && !['submitted', 'graded'].includes(status);
  };

  const getDaysUntilDue = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleSubmitAssignment = async (assignment: Assignment) => {
    try {
      // Simulate submission
      console.log('Submitting assignment:', assignment.id);
      console.log('Text submission:', submissionText);
      console.log('Files:', uploadedFiles);
      
      // Update assignment status
      setAssignments(prev => prev.map(a => 
        a.id === assignment.id 
          ? { ...a, status: 'submitted' as const, submissionDate: new Date().toISOString() }
          : a
      ));
      
      setSelectedAssignment(null);
      setSubmissionText('');
      setUploadedFiles([]);
      
      onSubmitAssignment?.(assignment.id);
    } catch (error) {
      console.error('Failed to submit assignment:', error);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Statistics for overview
  const stats = {
    total: assignments.length,
    pending: assignments.filter(a => ['not_started', 'in_progress'].includes(a.status)).length,
    submitted: assignments.filter(a => a.status === 'submitted').length,
    graded: assignments.filter(a => a.status === 'graded').length,
    overdue: assignments.filter(a => a.status === 'late' || isOverdue(a.dueDate, a.status)).length
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            My Assignments
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2">Loading assignments...</span>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Overview Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Card>
                <CardContent className="p-3 text-center">
                  <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                  <p className="text-sm text-muted-foreground">Total</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 text-center">
                  <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 text-center">
                  <div className="text-2xl font-bold text-green-600">{stats.submitted}</div>
                  <p className="text-sm text-muted-foreground">Submitted</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 text-center">
                  <div className="text-2xl font-bold text-purple-600">{stats.graded}</div>
                  <p className="text-sm text-muted-foreground">Graded</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 text-center">
                  <div className="text-2xl font-bold text-red-600">{stats.overdue}</div>
                  <p className="text-sm text-muted-foreground">Overdue</p>
                </CardContent>
              </Card>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="submitted">Submitted</TabsTrigger>
                <TabsTrigger value="graded">Graded</TabsTrigger>
                <TabsTrigger value="overdue">Overdue</TabsTrigger>
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
                        <SelectItem value="submitted">Submitted</SelectItem>
                        <SelectItem value="graded">Graded</SelectItem>
                        <SelectItem value="late">Late</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Priorities" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Priorities</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <TabsContent value={activeTab} className="space-y-4">
                {/* Assignments List */}
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredAssignments.map((assignment) => (
                    <Card key={assignment.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{assignment.title}</h3>
                              {getStatusIcon(assignment.status)}
                              <Badge 
                                variant="outline" 
                                className={getStatusColor(assignment.status)}
                              >
                                {assignment.status.replace('_', ' ')}
                              </Badge>
                              <Badge 
                                variant="outline" 
                                className={getPriorityColor(assignment.priority)}
                              >
                                {assignment.priority}
                              </Badge>
                            </div>
                            
                            <p className="text-sm text-muted-foreground">{assignment.description}</p>
                            
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>{assignment.subject} • {assignment.teacher}</span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                Due: {new Date(assignment.dueDate).toLocaleDateString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {getDaysUntilDue(assignment.dueDate)} days left
                              </span>
                            </div>

                            {assignment.score !== undefined && (
                              <div className="flex items-center gap-2">
                                <Progress value={(assignment.score / assignment.maxScore) * 100} className="w-24 h-2" />
                                <span className="text-sm font-medium">
                                  {assignment.score}/{assignment.maxScore} ({Math.round((assignment.score / assignment.maxScore) * 100)}%)
                                </span>
                              </div>
                            )}

                            {assignment.feedback && (
                              <div className="bg-blue-50 p-2 rounded text-sm">
                                <strong>Feedback:</strong> {assignment.feedback}
                              </div>
                            )}
                          </div>

                          <div className="flex flex-col gap-2 ml-4">
                            {assignment.status === 'not_started' || assignment.status === 'in_progress' ? (
                              <Button
                                size="sm"
                                onClick={() => setSelectedAssignment(assignment)}
                                className="flex items-center gap-1"
                              >
                                <Send className="h-3 w-3" />
                                Submit
                              </Button>
                            ) : null}
                            
                            <Button variant="outline" size="sm">
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                            
                            {assignment.attachments.length > 0 && (
                              <Button variant="outline" size="sm">
                                <Download className="h-3 w-3 mr-1" />
                                Files
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Assignment Submission Modal */}
        {selectedAssignment && (
          <Dialog open={!!selectedAssignment} onOpenChange={() => setSelectedAssignment(null)}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Submit Assignment: {selectedAssignment.title}</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Assignment Details</h4>
                  <p className="text-sm text-muted-foreground mb-2">{selectedAssignment.description}</p>
                  <div className="text-xs text-muted-foreground">
                    <p>Due: {new Date(selectedAssignment.dueDate).toLocaleString()}</p>
                    <p>Max Score: {selectedAssignment.maxScore} points</p>
                  </div>
                </div>

                {selectedAssignment.instructions && (
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Instructions</h4>
                    <p className="text-sm">{selectedAssignment.instructions}</p>
                  </div>
                )}

                {(selectedAssignment.submissionType === 'text' || selectedAssignment.submissionType === 'both') && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Text Submission</label>
                    <Textarea
                      placeholder="Enter your submission text here..."
                      value={submissionText}
                      onChange={(e) => setSubmissionText(e.target.value)}
                      rows={6}
                    />
                  </div>
                )}

                {(selectedAssignment.submissionType === 'file' || selectedAssignment.submissionType === 'both') && (
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
                              onClick={() => removeFile(index)}
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setSelectedAssignment(null)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={() => handleSubmitAssignment(selectedAssignment)}
                    disabled={
                      (selectedAssignment.submissionType === 'text' && !submissionText.trim()) ||
                      (selectedAssignment.submissionType === 'file' && uploadedFiles.length === 0) ||
                      (selectedAssignment.submissionType === 'both' && !submissionText.trim() && uploadedFiles.length === 0)
                    }
                  >
                    Submit Assignment
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
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

export default StudentAssignmentsModal;