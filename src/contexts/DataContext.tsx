"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { useNotifications } from './NotificationsContext';

// Course Interface
export interface Course {
  id: string;
  name: string;
  code: string;
  description: string;
  grade: string;
  section?: string;
  subject: string;
  teacherId: string;
  teacherName: string;
  academicYear: string;
  semester: string;
  credits: number;
  totalStudents: number;
  enrolledStudents: string[];
  schedule: {
    day: string;
    startTime: string;
    endTime: string;
    room: string;
  }[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Assignment Interface
export interface Assignment {
  id: string;
  title: string;
  description: string;
  courseId: string;
  courseName: string;
  teacherId: string;
  teacherName: string;
  type: 'homework' | 'project' | 'quiz' | 'exam' | 'presentation';
  status: 'draft' | 'published' | 'closed' | 'graded';
  maxMarks: number;
  dueDate: string;
  submissionType: 'online' | 'offline' | 'both';
  instructions: string;
  attachments?: {
    id: string;
    name: string;
    url: string;
    size: number;
  }[];
  submissions: AssignmentSubmission[];
  gradingRubric?: {
    criteria: string;
    maxPoints: number;
  }[];
  createdAt: string;
  updatedAt: string;
}

// Assignment Submission Interface
export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  submittedAt: string;
  status: 'submitted' | 'late' | 'graded' | 'returned';
  grade?: number;
  feedback?: string;
  attachments?: {
    id: string;
    name: string;
    url: string;
    size: number;
  }[];
  gradedAt?: string;
  gradedBy?: string;
}

// Grade Interface
export interface Grade {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  assignmentId?: string;
  assignmentTitle?: string;
  type: 'assignment' | 'quiz' | 'exam' | 'project' | 'participation';
  grade: number;
  maxGrade: number;
  percentage: number;
  letterGrade: string;
  gpa: number;
  comments?: string;
  gradedBy: string;
  gradedAt: string;
  academicYear: string;
  semester: string;
}

// Attendance Interface
export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  notes?: string;
  markedBy: string;
  markedAt: string;
}

// Exam Interface
export interface Exam {
  id: string;
  title: string;
  courseId: string;
  courseName: string;
  teacherId: string;
  teacherName: string;
  type: 'midterm' | 'final' | 'quiz' | 'unit_test';
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  room: string;
  maxMarks: number;
  instructions: string;
  syllabus: string[];
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  results?: {
    studentId: string;
    studentName: string;
    marks: number;
    grade: string;
  }[];
  createdAt: string;
}

// Event Interface
export interface Event {
  id: string;
  title: string;
  description: string;
  type: 'academic' | 'sports' | 'cultural' | 'meeting' | 'holiday' | 'exam';
  date: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  organizer: string;
  participants?: string[];
  isPublic: boolean;
  reminders: {
    type: 'email' | 'sms' | 'push';
    before: number; // minutes before
  }[];
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  createdAt: string;
}

// Fee Interface
export interface Fee {
  id: string;
  studentId: string;
  studentName: string;
  type: 'tuition' | 'library' | 'sports' | 'transport' | 'exam' | 'other';
  description: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  paymentDate?: string;
  paymentMethod?: string;
  transactionId?: string;
  academicYear: string;
  semester: string;
  createdAt: string;
}

// Aggregated Data Interfaces
export interface StudentSummary {
  id: string;
  name: string;
  courses: Course[];
  assignments: Assignment[];
  grades: Grade[];
  attendance: AttendanceRecord[];
  gpa: number;
  attendancePercentage: number;
}

export interface TeacherSummary {
  id: string;
  name: string;
  courses: Course[];
  assignments: Assignment[];
  totalStudents: number;
  averageGrade: number;
}

// Context State Interface
interface DataState {
  courses: Course[];
  assignments: Assignment[];
  grades: Grade[];
  attendance: AttendanceRecord[];
  exams: Exam[];
  events: Event[];
  fees: Fee[];
  isLoading: boolean;
  error: string | null;
}

interface DataContextType extends DataState {
  // Course Operations
  getCourses: (filters?: Partial<Course>) => Course[];
  getCourseById: (id: string) => Course | undefined;
  createCourse: (courseData: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Course>;
  updateCourse: (id: string, updates: Partial<Course>) => Promise<Course>;
  deleteCourse: (id: string) => Promise<void>;

  // Assignment Operations
  getAssignments: (filters?: Partial<Assignment>) => Assignment[];
  getAssignmentById: (id: string) => Assignment | undefined;
  createAssignment: (assignmentData: Omit<Assignment, 'id' | 'createdAt' | 'updatedAt' | 'submissions'>) => Promise<Assignment>;
  updateAssignment: (id: string, updates: Partial<Assignment>) => Promise<Assignment>;
  deleteAssignment: (id: string) => Promise<void>;
  submitAssignment: (submission: Omit<AssignmentSubmission, 'id' | 'submittedAt'>) => Promise<AssignmentSubmission>;

  // Grade Operations
  getGrades: (filters?: Partial<Grade>) => Grade[];
  createGrade: (gradeData: Omit<Grade, 'id' | 'gradedAt'>) => Promise<Grade>;
  updateGrade: (id: string, updates: Partial<Grade>) => Promise<Grade>;
  deleteGrade: (id: string) => Promise<void>;

  // Attendance Operations
  getAttendance: (filters?: Partial<AttendanceRecord>) => AttendanceRecord[];
  markAttendance: (attendanceData: Omit<AttendanceRecord, 'id' | 'markedAt'>) => Promise<AttendanceRecord>;
  updateAttendance: (id: string, updates: Partial<AttendanceRecord>) => Promise<AttendanceRecord>;

  // Exam Operations
  getExams: (filters?: Partial<Exam>) => Exam[];
  createExam: (examData: Omit<Exam, 'id' | 'createdAt'>) => Promise<Exam>;
  updateExam: (id: string, updates: Partial<Exam>) => Promise<Exam>;
  deleteExam: (id: string) => Promise<void>;

  // Event Operations
  getEvents: (filters?: Partial<Event>) => Event[];
  createEvent: (eventData: Omit<Event, 'id' | 'createdAt'>) => Promise<Event>;
  updateEvent: (id: string, updates: Partial<Event>) => Promise<Event>;
  deleteEvent: (id: string) => Promise<void>;

  // Fee Operations
  getFees: (filters?: Partial<Fee>) => Fee[];
  createFee: (feeData: Omit<Fee, 'id' | 'createdAt'>) => Promise<Fee>;
  updateFee: (id: string, updates: Partial<Fee>) => Promise<Fee>;
  payFee: (id: string, paymentDetails: { paymentMethod: string; transactionId: string }) => Promise<Fee>;

  // Summary Operations
  getStudentSummary: (studentId: string) => Promise<StudentSummary | null>;
  getTeacherSummary: (teacherId: string) => Promise<TeacherSummary | null>;

  // Utility Operations
  refreshData: () => Promise<void>;
  exportData: (type: 'courses' | 'grades' | 'attendance' | 'assignments') => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Mock Data Generators
const generateMockCourses = (): Course[] => {
  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History', 'Geography'];
  const grades = ['6', '7', '8', '9', '10', '11', '12'];
  const sections = ['A', 'B', 'C'];
  const courses: Course[] = [];

  for (let i = 1; i <= 20; i++) {
    const subject = subjects[Math.floor(Math.random() * subjects.length)];
    const grade = grades[Math.floor(Math.random() * grades.length)];
    const section = sections[Math.floor(Math.random() * sections.length)];
    
    courses.push({
      id: `course-${String(i).padStart(3, '0')}`,
      name: `${subject} - Grade ${grade}${section}`,
      code: `${subject.substr(0, 3).toUpperCase()}${grade}${section}`,
      description: `${subject} course for Grade ${grade} Section ${section}`,
      grade,
      section,
      subject,
      teacherId: `teacher-${String(Math.floor(i / 3) + 1).padStart(3, '0')}`,
      teacherName: `Dr. Teacher ${Math.floor(i / 3) + 1}`,
      academicYear: '2024-25',
      semester: Math.random() > 0.5 ? 'First' : 'Second',
      credits: Math.floor(Math.random() * 4) + 2,
      totalStudents: 25 + Math.floor(Math.random() * 15),
      enrolledStudents: Array.from({length: 25 + Math.floor(Math.random() * 15)}, (_, j) => `student-${String(j + 1).padStart(3, '0')}`),
      schedule: [
        {
          day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'][Math.floor(Math.random() * 5)],
          startTime: '09:00',
          endTime: '10:00',
          room: `Room ${100 + i}`
        }
      ],
      isActive: true,
      createdAt: new Date(2024, 0, Math.floor(Math.random() * 30)).toISOString(),
      updatedAt: new Date().toISOString()
    });
  }

  return courses;
};

const generateMockAssignments = (courses: Course[]): Assignment[] => {
  const assignments: Assignment[] = [];
  const types: Assignment['type'][] = ['homework', 'project', 'quiz', 'exam', 'presentation'];

  courses.forEach((course, courseIndex) => {
    for (let i = 1; i <= 3; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + Math.floor(Math.random() * 30) + 1);

      assignments.push({
        id: `assignment-${courseIndex + 1}-${i}`,
        title: `${course.subject} ${type.charAt(0).toUpperCase() + type.slice(1)} ${i}`,
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} for ${course.name}`,
        courseId: course.id,
        courseName: course.name,
        teacherId: course.teacherId,
        teacherName: course.teacherName,
        type,
        status: ['draft', 'published', 'closed', 'graded'][Math.floor(Math.random() * 4)] as Assignment['status'],
        maxMarks: type === 'exam' ? 100 : type === 'project' ? 50 : 25,
        dueDate: dueDate.toISOString(),
        submissionType: 'online',
        instructions: `Complete the ${type} as per the guidelines provided in class.`,
        submissions: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
  });

  return assignments;
};

const generateMockGrades = (courses: Course[]): Grade[] => {
  const grades: Grade[] = [];
  const letterGrades = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F'];
  const gpaScale = [4.0, 3.7, 3.3, 3.0, 2.7, 2.3, 2.0, 1.7, 1.3, 1.0, 0.0];

  courses.forEach(course => {
    course.enrolledStudents.slice(0, 10).forEach((studentId, index) => {
      for (let i = 0; i < 3; i++) {
        const grade = 60 + Math.floor(Math.random() * 40);
        const percentage = (grade / 100) * 100;
        const letterGradeIndex = Math.min(Math.floor((100 - grade) / 10), letterGrades.length - 1);

        grades.push({
          id: `grade-${course.id}-${studentId}-${i}`,
          studentId,
          studentName: `Student ${index + 1}`,
          courseId: course.id,
          courseName: course.name,
          type: ['assignment', 'quiz', 'exam'][Math.floor(Math.random() * 3)] as Grade['type'],
          grade,
          maxGrade: 100,
          percentage,
          letterGrade: letterGrades[letterGradeIndex],
          gpa: gpaScale[letterGradeIndex],
          gradedBy: course.teacherName,
          gradedAt: new Date().toISOString(),
          academicYear: course.academicYear,
          semester: course.semester
        });
      }
    });
  });

  return grades;
};

const generateMockAttendance = (courses: Course[]): AttendanceRecord[] => {
  const attendance: AttendanceRecord[] = [];
  const statuses: AttendanceRecord['status'][] = ['present', 'absent', 'late', 'excused'];

  courses.forEach(course => {
    course.enrolledStudents.slice(0, 10).forEach((studentId, index) => {
      for (let day = 0; day < 30; day++) {
        const date = new Date();
        date.setDate(date.getDate() - day);

        // 85% attendance rate
        if (Math.random() > 0.15) {
          attendance.push({
            id: `attendance-${course.id}-${studentId}-${day}`,
            studentId,
            studentName: `Student ${index + 1}`,
            courseId: course.id,
            courseName: course.name,
            date: date.toISOString().split('T')[0],
            status: statuses[Math.random() > 0.9 ? Math.floor(Math.random() * statuses.length) : 0],
            markedBy: course.teacherName,
            markedAt: new Date().toISOString()
          });
        }
      }
    });
  });

  return attendance;
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const { addNotification } = useNotifications();

  const [state, setState] = useState<DataState>({
    courses: [],
    assignments: [],
    grades: [],
    attendance: [],
    exams: [],
    events: [],
    fees: [],
    isLoading: false,
    error: null
  });

  // Initialize data
  useEffect(() => {
    if (isAuthenticated && user) {
      refreshData();
    }
  }, [isAuthenticated, user]);

  const refreshData = useCallback(async (): Promise<void> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const courses = generateMockCourses();
      const assignments = generateMockAssignments(courses);
      const grades = generateMockGrades(courses);
      const attendance = generateMockAttendance(courses);

      setState(prev => ({
        ...prev,
        courses,
        assignments,
        grades,
        attendance,
        isLoading: false
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load data';
      setState(prev => ({ ...prev, isLoading: false, error: errorMessage }));
    }
  }, []);

  // Course Operations
  const getCourses = useCallback((filters?: Partial<Course>): Course[] => {
    let filtered = [...state.courses];
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          filtered = filtered.filter(course => (course as any)[key] === value);
        }
      });
    }
    
    return filtered;
  }, [state.courses]);

  const getCourseById = useCallback((id: string): Course | undefined => {
    return state.courses.find(course => course.id === id);
  }, [state.courses]);

  const createCourse = useCallback(async (courseData: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>): Promise<Course> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const newCourse: Course = {
        ...courseData,
        id: `course-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setState(prev => ({
        ...prev,
        courses: [...prev.courses, newCourse],
        isLoading: false
      }));

      addNotification({
        title: 'Course Created',
        message: `Course "${newCourse.name}" has been created successfully`,
        type: 'success',
        priority: 'medium',
        read: false,
        actionRequired: false
      });

      return newCourse;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create course';
      setState(prev => ({ ...prev, isLoading: false, error: errorMessage }));
      throw error;
    }
  }, [addNotification]);

  // Assignment Operations
  const getAssignments = useCallback((filters?: Partial<Assignment>): Assignment[] => {
    let filtered = [...state.assignments];
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          filtered = filtered.filter(assignment => (assignment as any)[key] === value);
        }
      });
    }
    
    return filtered;
  }, [state.assignments]);

  const createAssignment = useCallback(async (assignmentData: Omit<Assignment, 'id' | 'createdAt' | 'updatedAt' | 'submissions'>): Promise<Assignment> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const newAssignment: Assignment = {
        ...assignmentData,
        id: `assignment-${Date.now()}`,
        submissions: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setState(prev => ({
        ...prev,
        assignments: [...prev.assignments, newAssignment],
        isLoading: false
      }));

      addNotification({
        title: 'Assignment Created',
        message: `Assignment "${newAssignment.title}" has been created`,
        type: 'info',
        priority: 'medium',
        read: false,
        actionRequired: false
      });

      return newAssignment;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create assignment';
      setState(prev => ({ ...prev, isLoading: false, error: errorMessage }));
      throw error;
    }
  }, [addNotification]);

  // Grade Operations
  const getGrades = useCallback((filters?: Partial<Grade>): Grade[] => {
    let filtered = [...state.grades];
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          filtered = filtered.filter(grade => (grade as any)[key] === value);
        }
      });
    }
    
    return filtered;
  }, [state.grades]);

  // Summary Operations
  const getStudentSummary = useCallback(async (studentId: string): Promise<StudentSummary | null> => {
    try {
      const studentCourses = state.courses.filter(course => 
        course.enrolledStudents.includes(studentId)
      );
      
      const studentAssignments = state.assignments.filter(assignment =>
        studentCourses.some(course => course.id === assignment.courseId)
      );
      
      const studentGrades = state.grades.filter(grade => grade.studentId === studentId);
      const studentAttendance = state.attendance.filter(attendance => attendance.studentId === studentId);
      
      const gpa = studentGrades.length > 0 
        ? studentGrades.reduce((sum, grade) => sum + grade.gpa, 0) / studentGrades.length 
        : 0;
      
      const totalClasses = studentAttendance.length;
      const presentClasses = studentAttendance.filter(record => record.status === 'present').length;
      const attendancePercentage = totalClasses > 0 ? (presentClasses / totalClasses) * 100 : 0;

      return {
        id: studentId,
        name: studentGrades[0]?.studentName || `Student ${studentId}`,
        courses: studentCourses,
        assignments: studentAssignments,
        grades: studentGrades,
        attendance: studentAttendance,
        gpa,
        attendancePercentage
      };
    } catch (error) {
      console.error('Failed to get student summary:', error);
      return null;
    }
  }, [state]);

  const contextValue: DataContextType = {
    ...state,
    getCourses,
    getCourseById,
    createCourse,
    updateCourse: async (id, updates) => { throw new Error('Not implemented') },
    deleteCourse: async (id) => { throw new Error('Not implemented') },
    getAssignments,
    getAssignmentById: (id) => state.assignments.find(a => a.id === id),
    createAssignment,
    updateAssignment: async (id, updates) => { throw new Error('Not implemented') },
    deleteAssignment: async (id) => { throw new Error('Not implemented') },
    submitAssignment: async (submission) => { throw new Error('Not implemented') },
    getGrades,
    createGrade: async (gradeData) => { throw new Error('Not implemented') },
    updateGrade: async (id, updates) => { throw new Error('Not implemented') },
    deleteGrade: async (id) => { throw new Error('Not implemented') },
    getAttendance: (filters) => {
      let filtered = [...state.attendance];
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined) {
            filtered = filtered.filter(record => (record as any)[key] === value);
          }
        });
      }
      return filtered;
    },
    markAttendance: async (attendanceData) => { throw new Error('Not implemented') },
    updateAttendance: async (id, updates) => { throw new Error('Not implemented') },
    getExams: (filters) => state.exams,
    createExam: async (examData) => { throw new Error('Not implemented') },
    updateExam: async (id, updates) => { throw new Error('Not implemented') },
    deleteExam: async (id) => { throw new Error('Not implemented') },
    getEvents: (filters) => state.events,
    createEvent: async (eventData) => { throw new Error('Not implemented') },
    updateEvent: async (id, updates) => { throw new Error('Not implemented') },
    deleteEvent: async (id) => { throw new Error('Not implemented') },
    getFees: (filters) => state.fees,
    createFee: async (feeData) => { throw new Error('Not implemented') },
    updateFee: async (id, updates) => { throw new Error('Not implemented') },
    payFee: async (id, paymentDetails) => { throw new Error('Not implemented') },
    getStudentSummary,
    getTeacherSummary: async (teacherId) => null, // Placeholder
    refreshData,
    exportData: (type) => { console.log(`Exporting ${type} data...`) }
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export default DataContext;