"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { BookOpen, Users, Clock, Calendar, Star } from 'lucide-react';

const StudentCourses: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [courses] = useState([
    {
      id: '1',
      name: 'Advanced Mathematics',
      code: 'MATH401',
      instructor: 'Dr. Priya Gupta',
      credits: 4,
      semester: 'Fall 2024',
      progress: 75,
      grade: 'A',
      schedule: 'Mon, Wed, Fri 9:00-10:00 AM',
      room: 'Room 101',
      description: 'Advanced calculus and linear algebra concepts',
      enrollmentStatus: 'enrolled',
      assignments: 12,
      completedAssignments: 9,
      nextClass: '2024-09-26T09:00:00'
    },
    {
      id: '2',
      name: 'Applied Physics',
      code: 'PHY301',
      instructor: 'Prof. Rajesh Kumar',
      credits: 4,
      semester: 'Fall 2024',
      progress: 65,
      grade: 'A-',
      schedule: 'Tue, Thu 10:15-11:45 AM',
      room: 'Lab 205',
      description: 'Practical applications of physics principles',
      enrollmentStatus: 'enrolled',
      assignments: 10,
      completedAssignments: 7,
      nextClass: '2024-09-26T10:15:00'
    }
  ]);

  const handleViewCourse = (courseId: string) => {
    alert(`Opening course ${courseId} details...`);
  };

  const filteredCourses = courses.filter(course => 
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">My Courses</h1>
          <p className="text-muted-foreground">Manage your enrolled courses</p>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{courses.length}</div>
            <p className="text-sm text-muted-foreground">Enrolled Courses</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">16</div>
            <p className="text-sm text-muted-foreground">Total Credits</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">3.6</div>
            <p className="text-sm text-muted-foreground">Current GPA</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">70%</div>
            <p className="text-sm text-muted-foreground">Avg Progress</p>
          </CardContent>
        </Card>
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    {course.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {course.code} • {course.instructor}
                  </p>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  {course.grade}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{course.description}</p>
              
              {/* Progress */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Course Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>

              {/* Course Info */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <span>{course.schedule}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-green-600" />
                  <span>{course.room}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-purple-600" />
                  <span>{course.credits} Credits</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-orange-600" />
                  <span>{course.completedAssignments}/{course.assignments} Tasks</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  onClick={() => handleViewCourse(course.id)}
                  className="flex-1"
                >
                  View Course
                </Button>
                <Button variant="outline" className="flex-1">
                  Assignments
                </Button>
              </div>

              {/* Next Class */}
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-blue-800">Next Class</p>
                <p className="text-xs text-blue-600">
                  {new Date(course.nextClass).toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudentCourses;