"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, Clock, Calendar, TrendingUp, Send } from 'lucide-react';

const StudentAttendance: React.FC = () => {
  const [attendanceData] = useState({
    overall: 85,
    thisMonth: 88,
    totalDays: 120,
    presentDays: 102,
    absentDays: 12,
    lateDays: 6
  });

  const [recentAttendance] = useState([
    { date: '2024-09-25', subject: 'Mathematics', status: 'present', time: '09:00' },
    { date: '2024-09-25', subject: 'Physics', status: 'present', time: '10:15' },
    { date: '2024-09-24', subject: 'Chemistry', status: 'late', time: '11:35' },
    { date: '2024-09-24', subject: 'English', status: 'absent', time: '-' },
    { date: '2024-09-23', subject: 'Computer Science', status: 'present', time: '14:00' }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-800';
      case 'absent': return 'bg-red-100 text-red-800';
      case 'late': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'absent': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'late': return <Clock className="h-4 w-4 text-yellow-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const handleRequestLeave = () => {
    alert('Opening leave request form...');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">My Attendance</h1>
          <p className="text-muted-foreground">Track your attendance record</p>
        </div>
        <Button onClick={handleRequestLeave}>
          <Send className="h-4 w-4 mr-2" />
          Request Leave
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{attendanceData.overall}%</div>
            <p className="text-sm text-muted-foreground">Overall</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{attendanceData.presentDays}</div>
            <p className="text-sm text-muted-foreground">Present Days</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{attendanceData.absentDays}</div>
            <p className="text-sm text-muted-foreground">Absent Days</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{attendanceData.lateDays}</div>
            <p className="text-sm text-muted-foreground">Late Days</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Attendance Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Overall Attendance</span>
                <span>{attendanceData.overall}%</span>
              </div>
              <Progress value={attendanceData.overall} className="h-2" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                <span>Present</span>
                <span className="font-bold text-green-700">{attendanceData.presentDays} days</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                <span>Absent</span>
                <span className="font-bold text-red-700">{attendanceData.absentDays} days</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                <span>Late</span>
                <span className="font-bold text-yellow-700">{attendanceData.lateDays} days</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Attendance */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentAttendance.map((record, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(record.status)}
                  <div>
                    <div className="font-medium">{record.subject}</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(record.date).toLocaleDateString()} • {record.time}
                    </div>
                  </div>
                </div>
                <Badge className={getStatusColor(record.status)}>
                  {record.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Subject-wise Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Subject-wise Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {['Mathematics', 'Physics', 'Chemistry', 'English', 'Computer Science'].map(subject => (
              <div key={subject} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{subject}</span>
                  <span className="text-sm">
                    {Math.floor(Math.random() * 15) + 80}%
                  </span>
                </div>
                <Progress value={Math.floor(Math.random() * 15) + 80} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentAttendance;