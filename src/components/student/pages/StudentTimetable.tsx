"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, User } from 'lucide-react';

const StudentTimetable: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState('current');

  const timeSlots = [
    '09:00 - 10:00',
    '10:15 - 11:15',
    '11:30 - 12:30',
    '14:00 - 15:00',
    '15:15 - 16:15'
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const timetable = {
    'Monday': {
      '09:00 - 10:00': { subject: 'Mathematics', teacher: 'Dr. Priya Gupta', room: 'Room 101', type: 'lecture' },
      '10:15 - 11:15': { subject: 'Physics', teacher: 'Prof. Rajesh Kumar', room: 'Lab 205', type: 'lab' },
      '11:30 - 12:30': { subject: 'Chemistry', teacher: 'Dr. Sarah Wilson', room: 'Lab 301', type: 'lecture' }
    },
    'Tuesday': {
      '09:00 - 10:00': { subject: 'English', teacher: 'Ms. Emily Johnson', room: 'Room 102', type: 'lecture' },
      '14:00 - 15:00': { subject: 'Computer Science', teacher: 'Dr. Michael Chang', room: 'Lab 401', type: 'practical' }
    },
    'Wednesday': {
      '09:00 - 10:00': { subject: 'Mathematics', teacher: 'Dr. Priya Gupta', room: 'Room 101', type: 'lecture' },
      '10:15 - 11:15': { subject: 'Physics', teacher: 'Prof. Rajesh Kumar', room: 'Lab 205', type: 'practical' }
    },
    'Thursday': {
      '10:15 - 11:15': { subject: 'Chemistry', teacher: 'Dr. Sarah Wilson', room: 'Lab 301', type: 'lab' },
      '14:00 - 15:00': { subject: 'Computer Science', teacher: 'Dr. Michael Chang', room: 'Lab 401', type: 'lecture' }
    },
    'Friday': {
      '09:00 - 10:00': { subject: 'Mathematics', teacher: 'Dr. Priya Gupta', room: 'Room 101', type: 'tutorial' },
      '11:30 - 12:30': { subject: 'English', teacher: 'Ms. Emily Johnson', room: 'Room 102', type: 'discussion' }
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lecture': return 'bg-blue-100 text-blue-800';
      case 'lab': return 'bg-green-100 text-green-800';
      case 'practical': return 'bg-purple-100 text-purple-800';
      case 'tutorial': return 'bg-orange-100 text-orange-800';
      case 'discussion': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Weekly Timetable</h1>
          <p className="text-muted-foreground">Your class schedule for the week</p>
        </div>
        <Button variant="outline">
          <Calendar className="h-4 w-4 mr-2" />
          Export Schedule
        </Button>
      </div>

      {/* Current Day Highlight */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-blue-800 mb-2">Today's Classes</h3>
          <div className="space-y-2">
            {Object.entries(timetable['Monday'] || {}).map(([time, class_]) => (
              <div key={time} className="flex items-center justify-between bg-white p-2 rounded">
                <div>
                  <span className="font-medium">{class_.subject}</span>
                  <span className="text-sm text-muted-foreground ml-2">{time}</span>
                </div>
                <Badge className={getTypeColor(class_.type)}>{class_.type}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Timetable Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2 bg-gray-50 w-24">Time</th>
                  {days.map(day => (
                    <th key={day} className="border p-2 bg-gray-50">{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map(timeSlot => (
                  <tr key={timeSlot}>
                    <td className="border p-2 font-medium text-sm bg-gray-50">
                      {timeSlot}
                    </td>
                    {days.map(day => {
                      const class_ = timetable[day]?.[timeSlot];
                      return (
                        <td key={day} className="border p-2 h-20">
                          {class_ ? (
                            <div className="bg-blue-50 p-2 rounded h-full">
                              <div className="font-medium text-sm text-blue-900">
                                {class_.subject}
                              </div>
                              <div className="text-xs text-blue-700 flex items-center gap-1 mt-1">
                                <User className="h-3 w-3" />
                                {class_.teacher}
                              </div>
                              <div className="text-xs text-blue-700 flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {class_.room}
                              </div>
                              <Badge className={`${getTypeColor(class_.type)} text-xs mt-1`}>
                                {class_.type}
                              </Badge>
                            </div>
                          ) : (
                            <div className="text-gray-400 text-sm">Free</div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">25</div>
            <p className="text-sm text-muted-foreground">Hours/Week</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">5</div>
            <p className="text-sm text-muted-foreground">Subjects</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">8</div>
            <p className="text-sm text-muted-foreground">Labs/Week</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">3</div>
            <p className="text-sm text-muted-foreground">Free Slots</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentTimetable;