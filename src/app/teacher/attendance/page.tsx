"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, Calendar, CheckCircle, X, UserCheck, UserX, Save, 
  Filter, Search, Download, ArrowLeft, Clock, BarChart3,
  AlertCircle, TrendingUp, Activity
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

// Mock data
const classes = [
  { id: 1, name: "Class 12-A", subject: "Mathematics", students: 35 },
  { id: 2, name: "Class 11-B", subject: "Calculus", students: 32 },
  { id: 3, name: "Class 12-C", subject: "Statistics", students: 28 }
];

const studentsData = [
  { id: 1, name: "Aarav Sharma", rollNumber: "12A001", present: true, totalClasses: 45, attendedClasses: 42 },
  { id: 2, name: "Priya Patel", rollNumber: "12A002", present: true, totalClasses: 45, attendedClasses: 44 },
  { id: 3, name: "Rahul Singh", rollNumber: "12A003", present: false, totalClasses: 45, attendedClasses: 39 },
  { id: 4, name: "Ananya Reddy", rollNumber: "12A004", present: true, totalClasses: 45, attendedClasses: 43 },
  { id: 5, name: "Vikram Mehta", rollNumber: "12A005", present: false, totalClasses: 45, attendedClasses: 37 },
  { id: 6, name: "Sneha Gupta", rollNumber: "12A006", present: true, totalClasses: 45, attendedClasses: 45 },
  { id: 7, name: "Arjun Kumar", rollNumber: "12A007", present: true, totalClasses: 45, attendedClasses: 41 },
  { id: 8, name: "Kavya Nair", rollNumber: "12A008", present: false, totalClasses: 45, attendedClasses: 38 }
];

const AttendancePage = () => {
  const router = useRouter();
  const [selectedClass, setSelectedClass] = React.useState("1");
  const [selectedDate, setSelectedDate] = React.useState(new Date().toISOString().split('T')[0]);
  const [students, setStudents] = React.useState(studentsData);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [showAnalytics, setShowAnalytics] = React.useState(false);

  const toggleAttendance = (studentId: number) => {
    setStudents(students.map(student => 
      student.id === studentId 
        ? { ...student, present: !student.present }
        : student
    ));
  };

  const markAllPresent = () => {
    setStudents(students.map(student => ({ ...student, present: true })));
  };

  const markAllAbsent = () => {
    setStudents(students.map(student => ({ ...student, present: false })));
  };

  const saveAttendance = () => {
    // In real app, this would save to database
    console.log('Saving attendance:', {
      classId: selectedClass,
      date: selectedDate,
      attendance: students.map(s => ({ id: s.id, present: s.present }))
    });
    alert('Attendance saved successfully!');
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const presentCount = students.filter(s => s.present).length;
  const absentCount = students.length - presentCount;
  const attendancePercentage = ((presentCount / students.length) * 100).toFixed(1);

  const selectedClassData = classes.find(c => c.id === parseInt(selectedClass));

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
                  Attendance Management
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {selectedClassData?.name} - {selectedClassData?.subject}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => setShowAnalytics(!showAnalytics)}>
                <BarChart3 className="h-4 w-4 mr-2" />
                {showAnalytics ? 'Hide' : 'Show'} Analytics
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Select Class
                  </label>
                  <Select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                    {classes.map(cls => (
                      <option key={cls.id} value={cls.id.toString()}>
                        {cls.name} - {cls.subject}
                      </option>
                    ))}
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Date
                  </label>
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Search Students
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input
                      placeholder="Search by name or roll number..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={markAllPresent}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark All Present
                </Button>
                <Button variant="outline" onClick={markAllAbsent}>
                  <UserX className="h-4 w-4 mr-2" />
                  Mark All Absent
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Analytics Cards */}
        {showAnalytics && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Present Today</p>
                    <p className="text-2xl font-bold text-green-600">{presentCount}</p>
                  </div>
                  <UserCheck className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Absent Today</p>
                    <p className="text-2xl font-bold text-red-600">{absentCount}</p>
                  </div>
                  <UserX className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Attendance Rate</p>
                    <p className="text-2xl font-bold text-blue-600">{attendancePercentage}%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Total Students</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{students.length}</p>
                  </div>
                  <Users className="h-8 w-8 text-slate-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Attendance List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Student Attendance
                </CardTitle>
                <CardDescription>
                  Mark attendance for {new Date(selectedDate).toLocaleDateString('en-GB')}
                </CardDescription>
              </div>
              <Badge variant={attendancePercentage >= 80 ? "success" : attendancePercentage >= 60 ? "warning" : "destructive"}>
                {attendancePercentage}% Present
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredStudents.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">{student.name}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Roll: {student.rollNumber} • Attendance: {Math.round((student.attendedClasses / student.totalClasses) * 100)}%
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right text-sm">
                      <p className="text-slate-600 dark:text-slate-400">
                        {student.attendedClasses}/{student.totalClasses}
                      </p>
                    </div>
                    <Button
                      variant={student.present ? "success" : "outline"}
                      onClick={() => toggleAttendance(student.id)}
                      className={cn(
                        "min-w-[100px]",
                        student.present ? "bg-green-600 hover:bg-green-700" : "border-red-300 text-red-600 hover:bg-red-50"
                      )}
                    >
                      {student.present ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Present
                        </>
                      ) : (
                        <>
                          <X className="h-4 w-4 mr-2" />
                          Absent
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="mt-6 flex justify-end">
          <Button variant="gradient" onClick={saveAttendance} className="min-w-[200px]">
            <Save className="h-4 w-4 mr-2" />
            Save Attendance
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;