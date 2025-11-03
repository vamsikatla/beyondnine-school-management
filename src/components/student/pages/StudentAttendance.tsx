"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { useStudentAttendanceModals } from '@/contexts/StudentModalContext';
import { 
  Calendar as CalendarIcon, 
  CalendarDays, 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  FileText,
  Download,
  Filter,
  BarChart3,
  CheckCircle,
  XCircle,
  Clock3
} from 'lucide-react';

interface AttendanceRecord {
  id: string;
  date: string;
  subject: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  period: string;
  teacher: string;
  remarks?: string;
}

interface SubjectAttendance {
  subject: string;
  present: number;
  absent: number;
  late: number;
  excused: number;
  total: number;
  percentage: number;
  requiredAttendance: number;
  classesNeeded: number;
  canAffordToMiss: number;
}

const StudentAttendance: React.FC = () => {
  const { viewAttendance, requestLeave, viewLeaveStatus } = useStudentAttendanceModals();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'overview' | 'calendar' | 'detailed'>('overview');
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [subjectAttendance, setSubjectAttendance] = useState<SubjectAttendance[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Mock attendance data
  useEffect(() => {
    const mockRecords: AttendanceRecord[] = [
      {
        id: '1',
        date: '2024-01-15',
        subject: 'Mathematics',
        status: 'present',
        period: '1st Period (9:00-10:00)',
        teacher: 'Dr. Sarah Johnson'
      },
      {
        id: '2',
        date: '2024-01-15',
        subject: 'Physics',
        status: 'present',
        period: '2nd Period (10:15-11:15)',
        teacher: 'Prof. Michael Chen'
      },
      {
        id: '3',
        date: '2024-01-14',
        subject: 'Chemistry',
        status: 'absent',
        period: '3rd Period (11:30-12:30)',
        teacher: 'Dr. Emily Davis',
        remarks: 'Medical leave'
      },
      {
        id: '4',
        date: '2024-01-14',
        subject: 'English',
        status: 'late',
        period: '4th Period (1:30-2:30)',
        teacher: 'Ms. Lisa Wilson',
        remarks: 'Arrived 15 minutes late'
      },
      {
        id: '5',
        date: '2024-01-13',
        subject: 'Mathematics',
        status: 'present',
        period: '1st Period (9:00-10:00)',
        teacher: 'Dr. Sarah Johnson'
      }
    ];

    const mockSubjectAttendance: SubjectAttendance[] = [
      {
        subject: 'Mathematics',
        present: 28,
        absent: 3,
        late: 1,
        excused: 0,
        total: 32,
        percentage: 87.5,
        requiredAttendance: 75,
        classesNeeded: 0,
        canAffordToMiss: 4
      },
      {
        subject: 'Physics',
        present: 26,
        absent: 3,
        late: 1,
        excused: 0,
        total: 30,
        percentage: 86.7,
        requiredAttendance: 75,
        classesNeeded: 0,
        canAffordToMiss: 3
      },
      {
        subject: 'Chemistry',
        present: 25,
        absent: 2,
        late: 1,
        excused: 0,
        total: 28,
        percentage: 89.3,
        requiredAttendance: 75,
        classesNeeded: 0,
        canAffordToMiss: 4
      },
      {
        subject: 'English',
        present: 24,
        absent: 5,
        late: 1,
        excused: 0,
        total: 30,
        percentage: 80.0,
        requiredAttendance: 75,
        classesNeeded: 0,
        canAffordToMiss: 1
      },
      {
        subject: 'History',
        present: 20,
        absent: 6,
        late: 2,
        excused: 0,
        total: 28,
        percentage: 71.4,
        requiredAttendance: 75,
        classesNeeded: 3,
        canAffordToMiss: 0
      }
    ];

    setAttendanceRecords(mockRecords);
    setSubjectAttendance(mockSubjectAttendance);
  }, []);

  const overallStats = {
    totalPresent: subjectAttendance.reduce((sum, subject) => sum + subject.present, 0),
    totalAbsent: subjectAttendance.reduce((sum, subject) => sum + subject.absent, 0),
    totalLate: subjectAttendance.reduce((sum, subject) => sum + subject.late, 0),
    totalClasses: subjectAttendance.reduce((sum, subject) => sum + subject.total, 0),
    overallPercentage: subjectAttendance.length > 0 
      ? (subjectAttendance.reduce((sum, subject) => sum + subject.percentage, 0) / subjectAttendance.length)
      : 0
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'absent':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'late':
        return <Clock3 className="h-4 w-4 text-yellow-600" />;
      case 'excused':
        return <FileText className="h-4 w-4 text-blue-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

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

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 85) return 'text-green-600';
    if (percentage >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredRecords = selectedSubject === 'all' 
    ? attendanceRecords 
    : attendanceRecords.filter(record => record.subject === selectedSubject);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Attendance</h1>
          <p className="text-gray-600">Track your attendance across all subjects and manage leave requests</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => viewLeaveStatus()}>
            <FileText className="mr-2 h-4 w-4" />
            Leave Status
          </Button>
          <Button onClick={() => requestLeave()}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            Request Leave
          </Button>
        </div>
      </div>

      {/* View Mode Selector */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'overview' ? 'default' : 'outline'}
            onClick={() => setViewMode('overview')}
            size="sm"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Overview
          </Button>
          <Button
            variant={viewMode === 'calendar' ? 'default' : 'outline'}
            onClick={() => setViewMode('calendar')}
            size="sm"
          >
            <CalendarIcon className="h-4 w-4 mr-2" />
            Calendar
          </Button>
          <Button
            variant={viewMode === 'detailed' ? 'default' : 'outline'}
            onClick={() => setViewMode('detailed')}
            size="sm"
          >
            <FileText className="h-4 w-4 mr-2" />
            Detailed
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {subjectAttendance.map((subject) => (
                <SelectItem key={subject.subject} value={subject.subject}>
                  {subject.subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {viewMode === 'overview' && (
        <>
          {/* Overall Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Overall Attendance</p>
                    <p className={`text-2xl font-bold ${getAttendanceColor(overallStats.overallPercentage)}`}>
                      {overallStats.overallPercentage.toFixed(1)}%
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <CalendarDays className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  {overallStats.overallPercentage >= 85 ? (
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                  )}
                  <span className="text-sm text-gray-600">
                    {overallStats.overallPercentage >= 75 ? 'Good attendance' : 'Below required'}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Present Days</p>
                    <p className="text-2xl font-bold text-green-600">{overallStats.totalPresent}</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Absent Days</p>
                    <p className="text-2xl font-bold text-red-600">{overallStats.totalAbsent}</p>
                  </div>
                  <div className="p-3 bg-red-100 rounded-full">
                    <XCircle className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Late Arrivals</p>
                    <p className="text-2xl font-bold text-yellow-600">{overallStats.totalLate}</p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <Clock3 className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Subject-wise Attendance */}
          <Card>
            <CardHeader>
              <CardTitle>Subject-wise Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subjectAttendance.map((subject, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium">{subject.subject}</h3>
                        <Badge
                          variant="outline"
                          className={getAttendanceColor(subject.percentage)}
                        >
                          {subject.percentage.toFixed(1)}%
                        </Badge>
                        {subject.percentage < 75 && (
                          <Badge variant="destructive" className="text-xs">
                            Below Required
                          </Badge>
                        )}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <span>Present: {subject.present}</span>
                        <span>Absent: {subject.absent}</span>
                        <span>Late: {subject.late}</span>
                        <span>Total: {subject.total}</span>
                      </div>
                      {subject.percentage < 75 && (
                        <p className="text-sm text-red-600 mt-2">
                          Need to attend {subject.classesNeeded} more classes to meet 75% requirement
                        </p>
                      )}
                      {subject.canAffordToMiss > 0 && subject.percentage >= 75 && (
                        <p className="text-sm text-green-600 mt-2">
                          Can afford to miss {subject.canAffordToMiss} more classes
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            subject.percentage >= 85 ? 'bg-green-500' :
                            subject.percentage >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.min(subject.percentage, 100)}%` }}
                        />
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => viewAttendance({ subjectId: subject.subject })}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {viewMode === 'calendar' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Select Date</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>
                Attendance for {selectedDate?.toLocaleDateString() || 'Select a date'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDate && (
                <div className="space-y-3">
                  {filteredRecords
                    .filter(record => record.date === selectedDate.toISOString().split('T')[0])
                    .map((record) => (
                      <div key={record.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(record.status)}
                          <div>
                            <h4 className="font-medium">{record.subject}</h4>
                            <p className="text-sm text-gray-600">{record.period}</p>
                            <p className="text-sm text-gray-500">Teacher: {record.teacher}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className={getStatusColor(record.status)}>
                            {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                          </Badge>
                          {record.remarks && (
                            <p className="text-xs text-gray-500 mt-1">{record.remarks}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  {filteredRecords.filter(record => record.date === selectedDate.toISOString().split('T')[0]).length === 0 && (
                    <p className="text-center text-gray-500 py-8">No attendance records for this date</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {viewMode === 'detailed' && (
        <Card>
          <CardHeader>
            <CardTitle>Detailed Attendance Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredRecords.map((record) => (
                <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    {getStatusIcon(record.status)}
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-medium">{record.subject}</h4>
                        <Badge variant="outline" className={getStatusColor(record.status)}>
                          {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{record.period}</p>
                      <p className="text-sm text-gray-500">Teacher: {record.teacher}</p>
                      {record.remarks && (
                        <p className="text-sm text-blue-600 mt-1">Note: {record.remarks}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{new Date(record.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StudentAttendance;