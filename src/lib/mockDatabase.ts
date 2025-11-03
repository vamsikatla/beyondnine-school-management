// Mock Database Layer with CRUD operations for all school management entities

import { Notification } from '@/contexts/NotificationsContext';

// Base Entity Interface
interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Entity Types
export interface Student extends BaseEntity {
  name: string;
  email: string;
  phone?: string;
  rollNumber: string;
  studentId: string;
  grade: string;
  section: string;
  dateOfBirth: string;
  address: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  admissionDate: string;
  status: 'Active' | 'Inactive' | 'Suspended' | 'Graduated';
  gpa: number;
  attendance: number;
  feesStatus: 'Paid' | 'Pending' | 'Overdue';
  avatar?: string;
  medicalInfo?: {
    bloodGroup?: string;
    allergies?: string[];
    medications?: string[];
    emergencyContact?: string;
  };
}

export interface Teacher extends BaseEntity {
  name: string;
  email: string;
  phone: string;
  employeeId: string;
  department: string;
  subjects: string[];
  designation: string;
  qualification: string;
  experience: number;
  joiningDate: string;
  salary?: number;
  status: 'Active' | 'On Leave' | 'Inactive';
  classes: string[];
  performance: number;
  studentsCount: number;
  avatar?: string;
  address?: string;
}

export interface Parent extends BaseEntity {
  name: string;
  email: string;
  phone: string;
  address: string;
  profession?: string;
  children: Array<{
    id: string;
    name: string;
    grade: string;
    section: string;
  }>;
  avatar?: string;
}

export interface Assignment extends BaseEntity {
  title: string;
  description: string;
  subject: string;
  teacherId: string;
  teacherName: string;
  classes: string[];
  dueDate: string;
  maxMarks: number;
  type: 'Homework' | 'Project' | 'Lab' | 'Quiz';
  status: 'Draft' | 'Published' | 'Closed';
  attachments?: Array<{
    name: string;
    url: string;
    size: number;
  }>;
  submissions?: Array<{
    studentId: string;
    studentName: string;
    submittedAt: string;
    marks?: number;
    feedback?: string;
    files: Array<{
      name: string;
      url: string;
    }>;
  }>;
}

export interface Exam extends BaseEntity {
  title: string;
  subject: string;
  teacherId: string;
  teacherName: string;
  classes: string[];
  date: string;
  time: string;
  duration: number; // in minutes
  maxMarks: number;
  type: 'Unit Test' | 'Mid-term' | 'Final' | 'Practical' | 'Viva';
  status: 'Scheduled' | 'Ongoing' | 'Completed' | 'Cancelled';
  location: string;
  instructions: string;
  syllabus: string;
  results?: Array<{
    studentId: string;
    studentName: string;
    marks: number;
    grade: string;
    rank: number;
  }>;
}

export interface Grade extends BaseEntity {
  studentId: string;
  studentName: string;
  subject: string;
  teacherId: string;
  teacherName: string;
  assignmentId?: string;
  examId?: string;
  type: 'Assignment' | 'Exam' | 'Quiz' | 'Project' | 'Lab';
  marks: number;
  maxMarks: number;
  grade: string;
  percentage: number;
  feedback?: string;
  gradedDate: string;
}

export interface Attendance extends BaseEntity {
  studentId: string;
  studentName: string;
  teacherId: string;
  teacherName: string;
  subject: string;
  class: string;
  date: string;
  status: 'Present' | 'Absent' | 'Late' | 'Excused';
  period: number;
  notes?: string;
}

export interface Fee extends BaseEntity {
  studentId: string;
  studentName: string;
  type: string; // 'Tuition', 'Transport', 'Library', etc.
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue' | 'Partial';
  paidAmount?: number;
  paidDate?: string;
  paymentMethod?: string;
  transactionId?: string;
  description?: string;
}

export interface Class extends BaseEntity {
  name: string;
  grade: string;
  section: string;
  capacity: number;
  currentStrength: number;
  classTeacherId: string;
  classTeacherName: string;
  subjects: Array<{
    subject: string;
    teacherId: string;
    teacherName: string;
  }>;
  schedule: Array<{
    day: string;
    periods: Array<{
      period: number;
      subject: string;
      teacherId: string;
      startTime: string;
      endTime: string;
    }>;
  }>;
  room: string;
}

// Mock Database Storage
class MockDatabase {
  private students: Student[] = [];
  private teachers: Teacher[] = [];
  private parents: Parent[] = [];
  private assignments: Assignment[] = [];
  private exams: Exam[] = [];
  private grades: Grade[] = [];
  private attendance: Attendance[] = [];
  private fees: Fee[] = [];
  private classes: Class[] = [];

  constructor() {
    this.initializeMockData();
  }

  // Generic CRUD Operations
  private generateId(): string {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private updateTimestamps<T extends BaseEntity>(entity: T): T {
    const now = new Date();
    return {
      ...entity,
      updatedAt: now,
      createdAt: entity.createdAt || now,
    };
  }

  // Students CRUD
  async getStudents(filters?: {
    grade?: string;
    section?: string;
    status?: string;
    search?: string;
  }): Promise<Student[]> {
    await this.simulateDelay();
    
    let filtered = [...this.students];
    
    if (filters?.grade) {
      filtered = filtered.filter(s => s.grade === filters.grade);
    }
    if (filters?.section) {
      filtered = filtered.filter(s => s.section === filters.section);
    }
    if (filters?.status) {
      filtered = filtered.filter(s => s.status === filters.status);
    }
    if (filters?.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(s => 
        s.name.toLowerCase().includes(search) ||
        s.email.toLowerCase().includes(search) ||
        s.rollNumber.toLowerCase().includes(search)
      );
    }
    
    return filtered;
  }

  async getStudentById(id: string): Promise<Student | null> {
    await this.simulateDelay();
    return this.students.find(s => s.id === id) || null;
  }

  async createStudent(studentData: Omit<Student, keyof BaseEntity>): Promise<Student> {
    await this.simulateDelay();
    
    const student: Student = this.updateTimestamps({
      id: this.generateId(),
      ...studentData,
    });
    
    this.students.push(student);
    return student;
  }

  async updateStudent(id: string, updates: Partial<Omit<Student, keyof BaseEntity>>): Promise<Student | null> {
    await this.simulateDelay();
    
    const index = this.students.findIndex(s => s.id === id);
    if (index === -1) return null;
    
    this.students[index] = this.updateTimestamps({
      ...this.students[index],
      ...updates,
    });
    
    return this.students[index];
  }

  async deleteStudent(id: string): Promise<boolean> {
    await this.simulateDelay();
    
    const index = this.students.findIndex(s => s.id === id);
    if (index === -1) return false;
    
    this.students.splice(index, 1);
    return true;
  }

  // Teachers CRUD
  async getTeachers(filters?: {
    department?: string;
    status?: string;
    search?: string;
  }): Promise<Teacher[]> {
    await this.simulateDelay();
    
    let filtered = [...this.teachers];
    
    if (filters?.department) {
      filtered = filtered.filter(t => t.department === filters.department);
    }
    if (filters?.status) {
      filtered = filtered.filter(t => t.status === filters.status);
    }
    if (filters?.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(t => 
        t.name.toLowerCase().includes(search) ||
        t.email.toLowerCase().includes(search) ||
        t.employeeId.toLowerCase().includes(search) ||
        t.subjects.some(s => s.toLowerCase().includes(search))
      );
    }
    
    return filtered;
  }

  async createTeacher(teacherData: Omit<Teacher, keyof BaseEntity>): Promise<Teacher> {
    await this.simulateDelay();
    
    const teacher: Teacher = this.updateTimestamps({
      id: this.generateId(),
      ...teacherData,
    });
    
    this.teachers.push(teacher);
    return teacher;
  }

  // Assignments CRUD
  async getAssignments(filters?: {
    teacherId?: string;
    subject?: string;
    class?: string;
    status?: string;
  }): Promise<Assignment[]> {
    await this.simulateDelay();
    
    let filtered = [...this.assignments];
    
    if (filters?.teacherId) {
      filtered = filtered.filter(a => a.teacherId === filters.teacherId);
    }
    if (filters?.subject) {
      filtered = filtered.filter(a => a.subject === filters.subject);
    }
    if (filters?.class) {
      filtered = filtered.filter(a => a.classes.includes(filters.class!));
    }
    if (filters?.status) {
      filtered = filtered.filter(a => a.status === filters.status);
    }
    
    return filtered.sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());
  }

  async createAssignment(assignmentData: Omit<Assignment, keyof BaseEntity>): Promise<Assignment> {
    await this.simulateDelay();
    
    const assignment: Assignment = this.updateTimestamps({
      id: this.generateId(),
      ...assignmentData,
    });
    
    this.assignments.push(assignment);
    return assignment;
  }

  // Exams CRUD
  async getExams(filters?: {
    teacherId?: string;
    subject?: string;
    class?: string;
    status?: string;
  }): Promise<Exam[]> {
    await this.simulateDelay();
    
    let filtered = [...this.exams];
    
    if (filters?.teacherId) {
      filtered = filtered.filter(e => e.teacherId === filters.teacherId);
    }
    if (filters?.subject) {
      filtered = filtered.filter(e => e.subject === filters.subject);
    }
    if (filters?.class) {
      filtered = filtered.filter(e => e.classes.includes(filters.class!));
    }
    if (filters?.status) {
      filtered = filtered.filter(e => e.status === filters.status);
    }
    
    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  // Grades CRUD
  async getGrades(filters?: {
    studentId?: string;
    teacherId?: string;
    subject?: string;
  }): Promise<Grade[]> {
    await this.simulateDelay();
    
    let filtered = [...this.grades];
    
    if (filters?.studentId) {
      filtered = filtered.filter(g => g.studentId === filters.studentId);
    }
    if (filters?.teacherId) {
      filtered = filtered.filter(g => g.teacherId === filters.teacherId);
    }
    if (filters?.subject) {
      filtered = filtered.filter(g => g.subject === filters.subject);
    }
    
    return filtered.sort((a, b) => new Date(b.gradedDate).getTime() - new Date(a.gradedDate).getTime());
  }

  // Attendance CRUD
  async getAttendance(filters?: {
    studentId?: string;
    teacherId?: string;
    subject?: string;
    class?: string;
    date?: string;
  }): Promise<Attendance[]> {
    await this.simulateDelay();
    
    let filtered = [...this.attendance];
    
    if (filters?.studentId) {
      filtered = filtered.filter(a => a.studentId === filters.studentId);
    }
    if (filters?.teacherId) {
      filtered = filtered.filter(a => a.teacherId === filters.teacherId);
    }
    if (filters?.subject) {
      filtered = filtered.filter(a => a.subject === filters.subject);
    }
    if (filters?.class) {
      filtered = filtered.filter(a => a.class === filters.class);
    }
    if (filters?.date) {
      filtered = filtered.filter(a => a.date === filters.date);
    }
    
    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  async markAttendance(attendanceData: Omit<Attendance, keyof BaseEntity>): Promise<Attendance> {
    await this.simulateDelay();
    
    const attendance: Attendance = this.updateTimestamps({
      id: this.generateId(),
      ...attendanceData,
    });
    
    this.attendance.push(attendance);
    return attendance;
  }

  // Fees CRUD
  async getFees(filters?: {
    studentId?: string;
    status?: string;
    type?: string;
  }): Promise<Fee[]> {
    await this.simulateDelay();
    
    let filtered = [...this.fees];
    
    if (filters?.studentId) {
      filtered = filtered.filter(f => f.studentId === filters.studentId);
    }
    if (filters?.status) {
      filtered = filtered.filter(f => f.status === filters.status);
    }
    if (filters?.type) {
      filtered = filtered.filter(f => f.type === filters.type);
    }
    
    return filtered.sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());
  }

  // Analytics and Reports
  async getStudentAnalytics(studentId: string) {
    await this.simulateDelay();
    
    const student = await this.getStudentById(studentId);
    if (!student) return null;

    const grades = await this.getGrades({ studentId });
    const attendance = await this.getAttendance({ studentId });
    const fees = await this.getFees({ studentId });

    return {
      student,
      academic: {
        totalGrades: grades.length,
        averageGrade: grades.reduce((sum, g) => sum + g.percentage, 0) / grades.length || 0,
        subjectPerformance: this.calculateSubjectPerformance(grades),
        gpa: student.gpa,
        rank: this.calculateRank(student.id),
      },
      attendance: {
        totalClasses: attendance.length,
        present: attendance.filter(a => a.status === 'Present').length,
        absent: attendance.filter(a => a.status === 'Absent').length,
        percentage: student.attendance,
        subjectWise: this.calculateSubjectAttendance(attendance),
      },
      fees: {
        total: fees.reduce((sum, f) => sum + f.amount, 0),
        paid: fees.filter(f => f.status === 'Paid').reduce((sum, f) => sum + f.amount, 0),
        pending: fees.filter(f => f.status === 'Pending').reduce((sum, f) => sum + f.amount, 0),
        overdue: fees.filter(f => f.status === 'Overdue').reduce((sum, f) => sum + f.amount, 0),
      }
    };
  }

  async getClassAnalytics(classId: string) {
    await this.simulateDelay();
    
    const classInfo = this.classes.find(c => c.id === classId);
    if (!classInfo) return null;

    const students = await this.getStudents({ 
      grade: classInfo.grade, 
      section: classInfo.section 
    });
    
    const totalStudents = students.length;
    const averageAttendance = students.reduce((sum, s) => sum + s.attendance, 0) / totalStudents || 0;
    const averageGPA = students.reduce((sum, s) => sum + s.gpa, 0) / totalStudents || 0;

    return {
      class: classInfo,
      students: {
        total: totalStudents,
        active: students.filter(s => s.status === 'Active').length,
        averageGPA,
        averageAttendance,
        performanceDistribution: this.calculatePerformanceDistribution(students),
      },
      fees: {
        totalCollected: students.filter(s => s.feesStatus === 'Paid').length,
        pending: students.filter(s => s.feesStatus === 'Pending').length,
        overdue: students.filter(s => s.feesStatus === 'Overdue').length,
      }
    };
  }

  // Helper methods
  private calculateSubjectPerformance(grades: Grade[]) {
    const subjectMap = new Map();
    
    grades.forEach(grade => {
      if (!subjectMap.has(grade.subject)) {
        subjectMap.set(grade.subject, []);
      }
      subjectMap.get(grade.subject).push(grade.percentage);
    });

    const result = [];
    for (const [subject, percentages] of subjectMap) {
      const average = percentages.reduce((sum: number, p: number) => sum + p, 0) / percentages.length;
      result.push({ subject, average, count: percentages.length });
    }

    return result;
  }

  private calculateSubjectAttendance(attendance: Attendance[]) {
    const subjectMap = new Map();
    
    attendance.forEach(record => {
      if (!subjectMap.has(record.subject)) {
        subjectMap.set(record.subject, { total: 0, present: 0 });
      }
      const data = subjectMap.get(record.subject);
      data.total++;
      if (record.status === 'Present') data.present++;
    });

    const result = [];
    for (const [subject, data] of subjectMap) {
      const percentage = (data.present / data.total) * 100;
      result.push({ subject, percentage, total: data.total, present: data.present });
    }

    return result;
  }

  private calculateRank(studentId: string): number {
    const student = this.students.find(s => s.id === studentId);
    if (!student) return 0;

    const sameGradeStudents = this.students
      .filter(s => s.grade === student.grade && s.section === student.section && s.status === 'Active')
      .sort((a, b) => b.gpa - a.gpa);

    return sameGradeStudents.findIndex(s => s.id === studentId) + 1;
  }

  private calculatePerformanceDistribution(students: Student[]) {
    const excellent = students.filter(s => s.gpa >= 4.0).length;
    const good = students.filter(s => s.gpa >= 3.0 && s.gpa < 4.0).length;
    const average = students.filter(s => s.gpa >= 2.0 && s.gpa < 3.0).length;
    const needsImprovement = students.filter(s => s.gpa < 2.0).length;

    return { excellent, good, average, needsImprovement };
  }

  private async simulateDelay(ms: number = 300): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, ms));
  }

  // Initialize with mock data
  private initializeMockData() {
    // Sample students
    this.students = [
      {
        id: 'stu_001',
        name: 'Aarav Sharma',
        email: 'aarav.sharma@student.edu',
        rollNumber: '12A001',
        studentId: 'STU2024001',
        grade: 'Grade 12',
        section: 'A',
        dateOfBirth: '2005-08-15',
        address: '123 Student Colony, Mumbai',
        parentName: 'Rajesh Sharma',
        parentPhone: '+91 9876543211',
        parentEmail: 'rajesh.sharma@email.com',
        admissionDate: '2021-04-15',
        status: 'Active',
        gpa: 3.8,
        attendance: 92.5,
        feesStatus: 'Paid',
        avatar: '👨‍🎓',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
        medicalInfo: {
          bloodGroup: 'B+',
          allergies: [],
          medications: [],
        }
      }
    ];

    // Sample teachers
    this.teachers = [
      {
        id: 'tch_001',
        name: 'Dr. Priya Gupta',
        email: 'priya.gupta@school.edu',
        phone: '+91 9876543210',
        employeeId: 'EMP001',
        department: 'Mathematics',
        subjects: ['Advanced Mathematics', 'Calculus', 'Statistics'],
        designation: 'Senior Teacher',
        qualification: 'M.Sc, Ph.D Mathematics',
        experience: 8,
        joiningDate: '2019-06-15',
        status: 'Active',
        classes: ['Grade 11', 'Grade 12'],
        performance: 4.8,
        studentsCount: 156,
        avatar: '👩‍🏫',
        createdAt: new Date('2019-06-15'),
        updatedAt: new Date('2024-01-15'),
      }
    ];

    // Initialize other mock data...
  }
}

// Export singleton instance
export const mockDatabase = new MockDatabase();