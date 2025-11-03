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
import { Calendar } from '@/components/ui/calendar';
import { 
  CalendarDays, 
  CheckCircle, 
  XCircle, 
  Clock,
  TrendingUp,
  TrendingDown,
  FileText,
  Send,
  Eye,
  Filter
} from 'lucide-react';

interface AttendanceRecord {
  id: string;
  date: string;
  subject: string;
  subjectCode: string;
  teacher: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  timeIn?: string;
  timeOut?: string;
  notes?: string;
  period: number;
}

interface LeaveRequest {
  id: string;
  startDate: string;
  endDate: string;
  reason: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
  reviewedBy?: string;
  reviewedDate?: string;
  reviewNotes?: string;
}

interface AttendanceStats {
  totalDays: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  excusedDays: number;
  attendancePercentage: number;
  trend: 'improving' | 'declining' | 'stable';
}

interface StudentAttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentId: string;
  dateRange?: { startDate: Date; endDate: Date };
  subjectId?: string;
}

const StudentAttendanceModal: React.FC<StudentAttendanceModalProps> = ({
  isOpen,
  onClose,
  studentId,
  dateRange,
  subjectId
}) => {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [attendanceStats, setAttendanceStats] = useState<AttendanceStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSubject, setSelectedSubject] = useState(subjectId || 'all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [leaveForm, setLeaveForm] = useState({
    startDate: '',
    endDate: '',
    reason: '',
    description: ''
  });

  // Mock data
  const mockAttendanceRecords: AttendanceRecord[] = [
    {
      id: '1',
      date: '2024-09-23',
      subject: 'Mathematics',
      subjectCode: 'MATH101',
      teacher: 'Dr. Priya Gupta',
      status: 'present',
      timeIn: '09:00',
      timeOut: '10:00',
      period: 1
    },
    {
      id: '2',
      date: '2024-09-23',
      subject: 'Physics',
      subjectCode: 'PHY101',
      teacher: 'Prof. Rajesh Kumar',
      status: 'present',
      timeIn: '10:15',
      timeOut: '11:15',
      period: 2
    },
    {
      id: '3',
      date: '2024-09-22',
      subject: 'Mathematics',
      subjectCode: 'MATH101',
      teacher: 'Dr. Priya Gupta',
      status: 'absent',
      period: 1,
      notes: 'Medical appointment'
    },
    {
      id: '4',
      date: '2024-09-22',
      subject: 'Chemistry',
      subjectCode: 'CHEM101',
      teacher: 'Dr. Sarah Wilson',
      status: 'late',
      timeIn: '11:25',
      timeOut: '12:15',
      period: 3,
      notes: 'Traffic delay'
    },
    {
      id: '5',
      date: '2024-09-21',
      subject: 'English',
      subjectCode: 'ENG101',
      teacher: 'Ms. Emily Johnson',
      status: 'excused',
      period: 4,
      notes: 'School event participation'
    }
  ];

  const mockLeaveRequests: LeaveRequest[] = [
    {
      id: '1',
      startDate: '2024-09-25',
      endDate: '2024-09-25',
      reason: 'Medical Appointment',
      description: 'Doctor appointment for routine check-up',
      status: 'pending',
      submittedDate: '2024-09-20'
    },
    {
      id: '2',
      startDate: '2024-09-18',
      endDate: '2024-09-19',
      reason: 'Family Function',
      description: 'Sister\'s wedding ceremony',
      status: 'approved',
      submittedDate: '2024-09-10',
      reviewedBy: 'Principal Smith',
      reviewedDate: '2024-09-12',
      reviewNotes: 'Approved for family function'
    }
  ];

  const mockAttendanceStats: AttendanceStats = {
    totalDays: 20,
    presentDays: 16,
    absentDays: 2,
    lateDays: 1,
    excusedDays: 1,
    attendancePercentage: 85,
    trend: 'stable'
  };

  useEffect(() => {
    const fetchAttendanceData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setAttendanceRecords(mockAttendanceRecords);
        setLeaveRequests(mockLeaveRequests);
        setAttendanceStats(mockAttendanceStats);
      } catch (error) {
        console.error('Failed to fetch attendance data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      fetchAttendanceData();
    }
  }, [isOpen, studentId]);

  // Filter attendance records
  const filteredRecords = attendanceRecords.filter(record => {
    const matchesSubject = selectedSubject === 'all' || record.subject === selectedSubject;
    const matchesStatus = selectedStatus === 'all' || record.status === selectedStatus;
    const matchesDate = dateRange ? 
      (new Date(record.date) >= dateRange.startDate && new Date(record.date) <= dateRange.endDate) :
      true;
    
    return matchesSubject && matchesStatus && matchesDate;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'absent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'late':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'excused':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'absent':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'late':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'excused':
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'declining':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <div className="h-4 w-4 bg-gray-400 rounded-full" />;
    }
  };

  const getLeaveStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleLeaveFormSubmit = async () => {
    try {
      const newLeaveRequest: LeaveRequest = {
        id: Date.now().toString(),
        ...leaveForm,
        status: 'pending',
        submittedDate: new Date().toISOString().split('T')[0]
      };
      
      setLeaveRequests(prev => [newLeaveRequest, ...prev]);
      setLeaveForm({ startDate: '', endDate: '', reason: '', description: '' });
      setShowLeaveForm(false);
      
      // Show success message
      console.log('Leave request submitted successfully');
    } catch (error) {
      console.error('Failed to submit leave request:', error);
    }
  };

  const attendanceDates = attendanceRecords.reduce((acc, record) => {
    const date = record.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(record);
    return acc;
  }, {} as Record<string, AttendanceRecord[]>);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-blue-600" />
            My Attendance Record
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2">Loading attendance data...</span>
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">Detailed Records</TabsTrigger>
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
              <TabsTrigger value="leave">Leave Management</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                <Card>
                  <CardContent className="p-3 text-center">
                    <div className="text-2xl font-bold text-blue-600">{attendanceStats?.totalDays}</div>
                    <p className="text-sm text-muted-foreground">Total Days</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-3 text-center">
                    <div className="text-2xl font-bold text-green-600">{attendanceStats?.presentDays}</div>
                    <p className="text-sm text-muted-foreground">Present</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-3 text-center">
                    <div className="text-2xl font-bold text-red-600">{attendanceStats?.absentDays}</div>
                    <p className="text-sm text-muted-foreground">Absent</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-3 text-center">
                    <div className="text-2xl font-bold text-yellow-600">{attendanceStats?.lateDays}</div>
                    <p className="text-sm text-muted-foreground">Late</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-3 text-center">
                    <div className="text-2xl font-bold text-blue-600">{attendanceStats?.excusedDays}</div>
                    <p className="text-sm text-muted-foreground">Excused</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-3 text-center">
                    <div className="text-2xl font-bold text-purple-600">{attendanceStats?.attendancePercentage}%</div>
                    <p className="text-sm text-muted-foreground">Percentage</p>
                  </CardContent>
                </Card>
              </div>

              {/* Attendance Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Attendance Progress
                    {attendanceStats && getTrendIcon(attendanceStats.trend)}
                  </CardTitle>
                  <CardDescription>Your attendance performance this term</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Overall Attendance</span>
                      <span className="text-sm text-muted-foreground">
                        {attendanceStats?.attendancePercentage}%
                      </span>
                    </div>
                    <Progress value={attendanceStats?.attendancePercentage || 0} className="h-2" />
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Present Days: </span>
                        <span className="font-medium text-green-600">{attendanceStats?.presentDays}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Absent Days: </span>
                        <span className="font-medium text-red-600">{attendanceStats?.absentDays}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Attendance */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Attendance</CardTitle>
                  <CardDescription>Last 5 attendance records</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {attendanceRecords.slice(0, 5).map((record) => (
                      <div key={record.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(record.status)}
                          <div>
                            <div className="font-medium">{record.subject}</div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(record.date).toLocaleDateString()} • Period {record.period}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className={getStatusColor(record.status)}>
                            {record.status}
                          </Badge>
                          {record.timeIn && record.timeOut && (
                            <div className="text-xs text-muted-foreground mt-1">
                              {record.timeIn} - {record.timeOut}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Detailed Records Tab */}
            <TabsContent value="details" className="space-y-4">
              {/* Filters */}
              <Card>
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                        <SelectItem value="present">Present</SelectItem>
                        <SelectItem value="absent">Absent</SelectItem>
                        <SelectItem value="late">Late</SelectItem>
                        <SelectItem value="excused">Excused</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      More Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Records List */}
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Records</CardTitle>
                  <CardDescription>
                    Showing {filteredRecords.length} of {attendanceRecords.length} records
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {filteredRecords.map((record) => (
                      <div key={record.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{record.subject} ({record.subjectCode})</h4>
                              {getStatusIcon(record.status)}
                              <Badge variant="outline" className={getStatusColor(record.status)}>
                                {record.status}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              <p>{record.teacher} • Period {record.period}</p>
                              <p>{new Date(record.date).toLocaleDateString()}</p>
                              {record.timeIn && record.timeOut && (
                                <p>Time: {record.timeIn} - {record.timeOut}</p>
                              )}
                              {record.notes && (
                                <p className="text-xs italic mt-1">{record.notes}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Calendar View Tab */}
            <TabsContent value="calendar" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Calendar View</CardTitle>
                  <CardDescription>View your attendance on a calendar</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-md border"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">
                        Attendance for {selectedDate?.toLocaleDateString()}
                      </h4>
                      {selectedDate && attendanceDates[selectedDate.toISOString().split('T')[0]] ? (
                        <div className="space-y-2">
                          {attendanceDates[selectedDate.toISOString().split('T')[0]].map((record) => (
                            <div key={record.id} className="flex items-center justify-between p-2 border rounded">
                              <div className="flex items-center gap-2">
                                {getStatusIcon(record.status)}
                                <span className="text-sm">{record.subject}</span>
                              </div>
                              <Badge variant="outline" className={getStatusColor(record.status)}>
                                {record.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground text-sm">No records for this date</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Leave Management Tab */}
            <TabsContent value="leave" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Leave Requests</CardTitle>
                    <CardDescription>Manage your leave applications</CardDescription>
                  </div>
                  <Button onClick={() => setShowLeaveForm(true)}>
                    <Send className="h-4 w-4 mr-2" />
                    Request Leave
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {leaveRequests.map((request) => (
                      <div key={request.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-medium">{request.reason}</h4>
                              <Badge variant="outline" className={getLeaveStatusColor(request.status)}>
                                {request.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{request.description}</p>
                            <div className="text-xs text-muted-foreground">
                              <p>Period: {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}</p>
                              <p>Submitted: {new Date(request.submittedDate).toLocaleDateString()}</p>
                              {request.reviewedBy && (
                                <p>Reviewed by: {request.reviewedBy} on {new Date(request.reviewedDate!).toLocaleDateString()}</p>
                              )}
                            </div>
                            {request.reviewNotes && (
                              <div className="bg-blue-50 p-2 rounded mt-2 text-sm">
                                <strong>Review Notes:</strong> {request.reviewNotes}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Leave Request Form Modal */}
              {showLeaveForm && (
                <Dialog open={showLeaveForm} onOpenChange={setShowLeaveForm}>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Request Leave</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Start Date</label>
                          <Input
                            type="date"
                            value={leaveForm.startDate}
                            onChange={(e) => setLeaveForm(prev => ({ ...prev, startDate: e.target.value }))}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">End Date</label>
                          <Input
                            type="date"
                            value={leaveForm.endDate}
                            onChange={(e) => setLeaveForm(prev => ({ ...prev, endDate: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Reason</label>
                        <Input
                          placeholder="e.g., Medical Appointment"
                          value={leaveForm.reason}
                          onChange={(e) => setLeaveForm(prev => ({ ...prev, reason: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Description</label>
                        <Textarea
                          placeholder="Provide additional details..."
                          value={leaveForm.description}
                          onChange={(e) => setLeaveForm(prev => ({ ...prev, description: e.target.value }))}
                          rows={3}
                        />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setShowLeaveForm(false)}>
                          Cancel
                        </Button>
                        <Button 
                          onClick={handleLeaveFormSubmit}
                          disabled={!leaveForm.startDate || !leaveForm.endDate || !leaveForm.reason}
                        >
                          Submit Request
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
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

export default StudentAttendanceModal;