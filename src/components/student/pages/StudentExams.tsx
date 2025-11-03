"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, FileText, Download } from 'lucide-react';

const StudentExams: React.FC = () => {
  const upcomingExams = [
    {
      id: '1',
      subject: 'Advanced Mathematics',
      type: 'Mid-term Exam',
      date: '2024-09-30',
      time: '09:00 - 12:00',
      duration: '3 hours',
      room: 'Exam Hall A',
      syllabus: 'Chapters 1-5',
      totalMarks: 100,
      instructions: 'Bring calculator and geometry box'
    },
    {
      id: '2',
      subject: 'Physics Lab',
      type: 'Practical Exam',
      date: '2024-10-02',
      time: '14:00 - 17:00',
      duration: '3 hours',
      room: 'Physics Lab 2',
      syllabus: 'All lab experiments',
      totalMarks: 50,
      instructions: 'Lab coat mandatory'
    }
  ];

  const pastExams = [
    {
      id: '1',
      subject: 'Chemistry',
      type: 'Quiz',
      date: '2024-09-20',
      score: 82,
      totalMarks: 100,
      grade: 'B+',
      rank: 15
    },
    {
      id: '2',
      subject: 'English',
      type: 'Essay Test',
      date: '2024-09-18',
      score: 88,
      totalMarks: 100,
      grade: 'A-',
      rank: 8
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Examinations</h1>
          <p className="text-muted-foreground">Your exam schedule and results</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Admit Card
        </Button>
      </div>

      {/* Upcoming Exams */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Exams</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingExams.map(exam => (
              <div key={exam.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{exam.subject}</h3>
                    <p className="text-muted-foreground">{exam.type}</p>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    {exam.totalMarks} marks
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span>{new Date(exam.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-green-600" />
                    <span>{exam.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-purple-600" />
                    <span>{exam.room}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-orange-600" />
                    <span>{exam.duration}</span>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded text-sm">
                  <p><strong>Syllabus:</strong> {exam.syllabus}</p>
                  <p><strong>Instructions:</strong> {exam.instructions}</p>
                </div>

                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm">View Syllabus</Button>
                  <Button variant="outline" size="sm">Download Admit Card</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Past Results */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pastExams.map(exam => (
              <div key={exam.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{exam.subject} - {exam.type}</h4>
                  <p className="text-sm text-muted-foreground">
                    {new Date(exam.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">
                    {exam.score}/{exam.totalMarks}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800">
                      {exam.grade}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Rank: {exam.rank}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentExams;