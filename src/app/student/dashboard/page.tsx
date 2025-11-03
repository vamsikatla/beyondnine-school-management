"use client";

import { Bell, Download, MessageSquare, Plus, Upload } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { StudentChatbot } from '@/components/student/StudentChatbot';

const assignmentColumns = [
  { name: 'title', label: 'Title' },
  { name: 'subject', label: 'Subject' },
  { name: 'dueDate', label: 'Due Date' },
  { name: 'status', label: 'Status' }
];

const examColumns = [
  { name: 'subject', label: 'Subject' },
  { name: 'type', label: 'Type' },
  { name: 'date', label: 'Date' },
  { name: 'time', label: 'Time' },
  { name: 'duration', label: 'Duration' },
  { name: 'syllabus', label: 'Syllabus' },
  { name: 'maxMarks', label: 'Max Marks' }
];

// Mock student data
const studentData = {
  profile: {
    name: 'John Doe',
    grade: '10th',
    section: 'A',
    rollNumber: '2023001',
    admissionNumber: 'ADM2023001',
    contactNumber: '+1234567890',
    email: 'john.doe@example.com',
    address: '123 School Lane, Education City, 12345',
    parentName: 'Jane Doe',
    parentContact: '+0987654321'
  },
  academics: {
    currentGPA: 3.8,
    attendance: 92,
    subjects: [
      { name: 'Mathematics', grade: 'A', teacher: 'Dr. Smith' },
      { name: 'Science', grade: 'A-', teacher: 'Mrs. Johnson' },
      { name: 'English', grade: 'B+', teacher: 'Mr. Williams' },
      { name: 'History', grade: 'A', teacher: 'Ms. Brown' },
      { name: 'Computer Science', grade: 'A+', teacher: 'Mr. Davis' }
    ]
  },
  schedule: [
    { day: 'Monday', periods: [
      { subject: 'Mathematics', time: '8:00 AM - 9:00 AM', room: '101', teacher: 'Dr. Smith' },
      { subject: 'Science', time: '9:10 AM - 10:10 AM', room: '102', teacher: 'Mrs. Johnson' },
      { subject: 'Break', time: '10:10 AM - 10:30 AM', room: '-', teacher: '-' },
      { subject: 'English', time: '10:30 AM - 11:30 AM', room: '103', teacher: 'Mr. Williams' },
      { subject: 'History', time: '11:40 AM - 12:40 PM', room: '104', teacher: 'Ms. Brown' },
      { subject: 'Lunch', time: '12:40 PM - 1:20 PM', room: '-', teacher: '-' },
      { subject: 'Computer Science', time: '1:20 PM - 2:20 PM', room: '105', teacher: 'Mr. Davis' }
    ]},
    { day: 'Tuesday', periods: [
      { subject: 'Science', time: '8:00 AM - 9:00 AM', room: '102', teacher: 'Mrs. Johnson' },
      { subject: 'Mathematics', time: '9:10 AM - 10:10 AM', room: '101', teacher: 'Dr. Smith' },
      { subject: 'Break', time: '10:10 AM - 10:30 AM', room: '-', teacher: '-' },
      { subject: 'Computer Science', time: '10:30 AM - 11:30 AM', room: '105', teacher: 'Mr. Davis' },
      { subject: 'English', time: '11:40 AM - 12:40 PM', room: '103', teacher: 'Mr. Williams' },
      { subject: 'Lunch', time: '12:40 PM - 1:20 PM', room: '-', teacher: '-' },
      { subject: 'History', time: '1:20 PM - 2:20 PM', room: '104', teacher: 'Ms. Brown' }
    ]}
  ],
  assignments: [
    { title: 'Mathematics Problem Set', subject: 'Mathematics', dueDate: '2023-10-15', status: 'Pending' },
    { title: 'Science Lab Report', subject: 'Science', dueDate: '2023-10-10', status: 'Submitted' },
    { title: 'English Essay', subject: 'English', dueDate: '2023-10-20', status: 'Pending' },
    { title: 'History Research Paper', subject: 'History', dueDate: '2023-11-05', status: 'Not Started' },
    { title: 'Programming Project', subject: 'Computer Science', dueDate: '2023-10-30', status: 'In Progress' }
  ],
  exams: [
    { subject: 'Mathematics', type: 'Mid-term', date: '2023-10-25', time: '9:00 AM', duration: '2 hours', syllabus: 'Chapters 1-5', maxMarks: 100 },
    { subject: 'Science', type: 'Quiz', date: '2023-10-18', time: '10:30 AM', duration: '30 minutes', syllabus: 'Chapter 3', maxMarks: 20 },
    { subject: 'English', type: 'Mid-term', date: '2023-10-27', time: '9:00 AM', duration: '2 hours', syllabus: 'Units 1-3', maxMarks: 100 },
    { subject: 'History', type: 'Project Presentation', date: '2023-11-10', time: '1:00 PM', duration: '15 minutes', syllabus: 'Research Topic', maxMarks: 50 },
    { subject: 'Computer Science', type: 'Practical Exam', date: '2023-11-02', time: '10:00 AM', duration: '3 hours', syllabus: 'All programming concepts', maxMarks: 100 }
  ],
  notifications: [
    { title: 'Assignment Due', message: 'Mathematics Problem Set due tomorrow', date: '2023-10-14', read: false },
    { title: 'Exam Schedule', message: 'Mid-term exams start next week', date: '2023-10-18', read: true },
    { title: 'School Event', message: 'Annual Science Fair on November 15', date: '2023-10-20', read: false },
    { title: 'Parent-Teacher Meeting', message: 'Scheduled for October 30', date: '2023-10-22', read: false },
    { title: 'Holiday Notice', message: 'School closed on November 1 for Staff Development', date: '2023-10-25', read: true }
  ]
};

export default function StudentDashboard() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome</h2>
          <p className="text-slate-600 dark:text-slate-400">
            {studentData.profile.name}!
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </button>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
            <Download className="mr-2 h-4 w-4" />
            Download
          </button>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 p-0">
            <Bell className="h-4 w-4" />
          </button>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 p-0">
            <MessageSquare className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-col space-y-1.5">
            <h3 className="text-lg font-semibold leading-none tracking-tight">Profile</h3>
          </div>
          <div className="p-0">
            <div className="flex flex-col gap-2 mt-4">
              <div>
                <span className="font-semibold">Name:</span> {studentData.profile.name}
              </div>
              <div>
                <span className="font-semibold">Grade:</span> {studentData.profile.grade}
              </div>
              <div>
                <span className="font-semibold">Section:</span> {studentData.profile.section}
              </div>
              <div>
                <span className="font-semibold">Roll Number:</span> {studentData.profile.rollNumber}
              </div>
              <div>
                <span className="font-semibold">Admission Number:</span> {studentData.profile.admissionNumber}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-col space-y-1.5">
            <h3 className="text-lg font-semibold leading-none tracking-tight">Academic Overview</h3>
          </div>
          <div className="p-0">
            <div className="flex flex-col gap-2 mt-4">
              <div>
                <span className="font-semibold">Current GPA:</span> {studentData.academics.currentGPA}
              </div>
              <div>
                <span className="font-semibold">Attendance:</span> {studentData.academics.attendance}%
              </div>
              <div className="mt-2">
                <span className="font-semibold">Subjects:</span>
                <div className="mt-2 space-y-1">
                  {studentData.academics.subjects.map((subject, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{subject.name}</span>
                      <span className="font-medium">{subject.grade}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-col space-y-1.5">
            <h3 className="text-lg font-semibold leading-none tracking-tight">Notifications</h3>
          </div>
          <div className="p-0">
            <div className="flex flex-col gap-2 mt-4">
              {studentData.notifications.map((notification, index) => (
                <div key={index} className={`p-2 rounded-md ${notification.read ? 'bg-gray-100 dark:bg-gray-800' : 'bg-blue-50 dark:bg-blue-900'}`}>
                  <div className="font-semibold">{notification.title}</div>
                  <div className="text-sm">{notification.message}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Upcoming Assignments</h3>
        <DataTable
          columns={assignmentColumns}
          data={studentData.assignments}
          searchPlaceholder="Search assignments..."
        />
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Upcoming Exams</h3>
        <DataTable
          columns={examColumns}
          data={studentData.exams}
          searchPlaceholder="Search exams..."
        />
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Class Schedule</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {studentData.schedule.map((day, dayIndex) => (
            <div key={dayIndex} className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="flex flex-col space-y-1.5 p-6 pb-2">
                <h3 className="text-lg font-semibold leading-none tracking-tight">{day.day}</h3>
              </div>
              <div className="p-6 pt-0">
                <div className="mt-2">
                  {day.periods.map((period, periodIndex) => (
                    <div key={periodIndex} className="mb-2 p-2 rounded-md bg-gray-50 dark:bg-gray-800">
                      <div className="flex justify-between">
                        <span className="font-semibold">{period.subject}</span>
                        <span>{period.time}</span>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Room: {period.room} | Teacher: {period.teacher}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Student Chatbot */}
      <StudentChatbot />
    </div>
  );
}