"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, Calendar, Clock, Users, MapPin, Plus, Edit, 
  Filter, Download, RefreshCw, Bell, Settings, Eye, BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

const scheduleData = {
  currentWeek: "15 Jan - 21 Jan 2024",
  schedule: [
    {
      day: "Monday",
      date: "2024-01-15",
      classes: [
        {
          id: 1,
          time: "09:00-10:30",
          subject: "Advanced Mathematics",
          class: "Class 12-A",
          room: "Room 301",
          students: 35,
          type: "regular",
          status: "scheduled"
        },
        {
          id: 2,
          time: "11:00-12:30",
          subject: "Statistics",
          class: "Class 12-C",
          room: "Room 205",
          students: 28,
          type: "regular",
          status: "scheduled"
        },
        {
          id: 3,
          time: "14:00-15:30",
          subject: "Calculus",
          class: "Class 11-B",
          room: "Room 102",
          students: 32,
          type: "regular",
          status: "scheduled"
        }
      ]
    },
    {
      day: "Tuesday",
      date: "2024-01-16",
      classes: [
        {
          id: 4,
          time: "08:00-09:30",
          subject: "Physics Laboratory",
          class: "Class 11-B",
          room: "Lab 201",
          students: 24,
          type: "lab",
          status: "scheduled"
        },
        {
          id: 5,
          time: "10:30-12:00",
          subject: "Mathematics",
          class: "Class 12-A",
          room: "Room 301",
          students: 35,
          type: "regular",
          status: "scheduled"
        },
        {
          id: 6,
          time: "15:00-16:00",
          subject: "Faculty Meeting",
          class: "All Staff",
          room: "Conference Room",
          students: 0,
          type: "meeting",
          status: "scheduled"
        }
      ]
    },
    {
      day: "Wednesday",
      date: "2024-01-17",
      classes: [
        {
          id: 7,
          time: "09:00-10:30",
          subject: "Advanced Mathematics",
          class: "Class 12-A",
          room: "Room 301",
          students: 35,
          type: "regular",
          status: "scheduled"
        },
        {
          id: 8,
          time: "11:30-13:00",
          subject: "Statistics",
          class: "Class 12-C",
          room: "Room 205",
          students: 28,
          type: "regular",
          status: "scheduled"
        }
      ]
    },
    {
      day: "Thursday",
      date: "2024-01-18",
      classes: [
        {
          id: 9,
          time: "08:30-10:00",
          subject: "Calculus",
          class: "Class 11-B",
          room: "Room 102",
          students: 32,
          type: "regular",
          status: "scheduled"
        },
        {
          id: 10,
          time: "13:00-14:30",
          subject: "Physics Laboratory",
          class: "Class 11-B",
          room: "Lab 201",
          students: 24,
          type: "lab",
          status: "scheduled"
        }
      ]
    },
    {
      day: "Friday",
      date: "2024-01-19",
      classes: [
        {
          id: 11,
          time: "10:00-11:30",
          subject: "Advanced Mathematics",
          class: "Class 12-A",
          room: "Room 301",
          students: 35,
          type: "regular",
          status: "scheduled"
        },
        {
          id: 12,
          time: "14:00-15:30",
          subject: "Statistics",
          class: "Class 12-C",
          room: "Room 205",
          students: 28,
          type: "regular",
          status: "scheduled"
        }
      ]
    }
  ]
};

const SchedulePage = () => {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = React.useState("Monday");
  const [viewMode, setViewMode] = React.useState("week"); // week, day
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const getTypeColor = (type) => {
    switch (type) {
      case 'regular': return 'bg-blue-500';
      case 'lab': return 'bg-green-500';
      case 'meeting': return 'bg-purple-500';
      case 'exam': return 'bg-red-500';
      default: return 'bg-slate-500';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'regular': return 'Class';
      case 'lab': return 'Lab';
      case 'meeting': return 'Meeting';
      case 'exam': return 'Exam';
      default: return 'Event';
    }
  };

  const formatTime = (timeRange) => {
    return timeRange;
  };

  const totalClasses = scheduleData.schedule.reduce((total, day) => 
    total + day.classes.filter(c => c.type === 'regular' || c.type === 'lab').length, 0
  );

  const todaySchedule = scheduleData.schedule.find(day => 
    day.date === new Date().toISOString().split('T')[0]
  ) || scheduleData.schedule[0];

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
                  My Schedule
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {scheduleData.currentWeek}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === 'week' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('week')}
                  className="rounded-none border-0"
                >
                  Week
                </Button>
                <Button
                  variant={viewMode === 'day' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('day')}
                  className="rounded-none border-0"
                >
                  Day
                </Button>
              </div>
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Sync
              </Button>
              <Button variant="gradient" onClick={() => router.push('/teacher/classes')}>
                <Plus className="h-4 w-4 mr-2" />
                Add Class
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">This Week</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{totalClasses}</p>
                  <p className="text-xs text-blue-600">Classes</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Today</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{todaySchedule.classes.length}</p>
                  <p className="text-xs text-green-600">Sessions</p>
                </div>
                <Clock className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Total Students</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {scheduleData.schedule.reduce((total, day) => 
                      total + day.classes.reduce((dayTotal, cls) => dayTotal + cls.students, 0), 0
                    )}
                  </p>
                  <p className="text-xs text-purple-600">This Week</p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Rooms</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">5</p>
                  <p className="text-xs text-orange-600">Different</p>
                </div>
                <MapPin className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Week View */}
        {viewMode === 'week' && (
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
            {scheduleData.schedule.map((daySchedule, dayIndex) => (
              <Card key={dayIndex} className={cn(
                "hover-lift",
                daySchedule.day === "Monday" ? "lg:col-span-1" : ""
              )}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-sm font-medium">
                        {daySchedule.day}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {new Date(daySchedule.date).toLocaleDateString('en-GB', { 
                          day: '2-digit', 
                          month: 'short' 
                        })}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {daySchedule.classes.length}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    {daySchedule.classes.length > 0 ? (
                      daySchedule.classes.map((classItem) => (
                        <div 
                          key={classItem.id}
                          className={cn(
                            "p-3 rounded-lg text-white text-xs cursor-pointer hover:opacity-90 transition-opacity",
                            getTypeColor(classItem.type)
                          )}
                          onClick={() => router.push('/teacher/classes')}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-xs">
                              {formatTime(classItem.time)}
                            </span>
                            <span className="text-xs opacity-75">
                              {getTypeLabel(classItem.type)}
                            </span>
                          </div>
                          <div className="font-medium text-sm mb-1">
                            {classItem.subject}
                          </div>
                          <div className="text-xs opacity-75">
                            {classItem.class} • {classItem.room}
                          </div>
                          {classItem.students > 0 && (
                            <div className="text-xs opacity-75 mt-1">
                              {classItem.students} students
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-slate-400 text-xs">
                        No classes scheduled
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Day View */}
        {viewMode === 'day' && (
          <div className="space-y-6">
            {/* Day Selector */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2">
                  {scheduleData.schedule.map((daySchedule) => (
                    <Button
                      key={daySchedule.day}
                      variant={selectedDay === daySchedule.day ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedDay(daySchedule.day)}
                    >
                      {daySchedule.day}
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {daySchedule.classes.length}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Selected Day Classes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {scheduleData.schedule
                .find(day => day.day === selectedDay)?.classes
                .map((classItem) => (
                  <Card key={classItem.id} className="hover-lift cursor-pointer" onClick={() => router.push('/teacher/classes')}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className={cn(
                          "w-3 h-3 rounded-full",
                          getTypeColor(classItem.type)
                        )} />
                        <Badge variant="secondary" className="text-xs">
                          {getTypeLabel(classItem.type)}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{classItem.subject}</CardTitle>
                      <CardDescription>
                        {classItem.class} • {classItem.room}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                          <Clock className="h-4 w-4 mr-2" />
                          {formatTime(classItem.time)}
                        </div>
                        <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                          <MapPin className="h-4 w-4 mr-2" />
                          {classItem.room}
                        </div>
                        {classItem.students > 0 && (
                          <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                            <Users className="h-4 w-4 mr-2" />
                            {classItem.students} students
                          </div>
                        )}
                        
                        <div className="flex space-x-2 pt-3 border-t">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              }
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                className="flex items-center justify-start p-4 h-auto"
                onClick={() => router.push('/teacher/classes')}
              >
                <BookOpen className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Manage Classes</div>
                  <div className="text-xs text-slate-500">View and edit your classes</div>
                </div>
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center justify-start p-4 h-auto"
                onClick={() => router.push('/teacher/attendance')}
              >
                <Users className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Take Attendance</div>
                  <div className="text-xs text-slate-500">Mark today's attendance</div>
                </div>
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center justify-start p-4 h-auto"
                onClick={() => router.push('/teacher/lessons')}
              >
                <Calendar className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Lesson Plans</div>
                  <div className="text-xs text-slate-500">View and create lesson plans</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SchedulePage;