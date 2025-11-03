// Core Authentication Types
export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  SCHOOL_ADMIN = 'SCHOOL_ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
  PARENT = 'PARENT',
  ACCOUNTANT = 'ACCOUNTANT',
  LIBRARIAN = 'LIBRARIAN',
  TRANSPORT_MANAGER = 'TRANSPORT_MANAGER',
  NURSE = 'NURSE',
  FACILITY_MANAGER = 'FACILITY_MANAGER',
  SECURITY_MANAGER = 'SECURITY_MANAGER'
}

export interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  schoolId: string;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
  schoolCode?: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
  school: School;
}

export interface School {
  id: string;
  name: string;
  code: string;
  email: string;
  subscriptionPlan: string;
  subscriptionStatus: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  totalRevenue: number;
  attendanceRate: number;
  feeCollectionRate: number;
}