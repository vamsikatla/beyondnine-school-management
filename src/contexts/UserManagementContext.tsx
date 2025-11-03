"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { useNotifications } from './NotificationsContext';

// Base User Interface
interface BaseUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  avatar?: string;
  isActive: boolean;
  joinDate: string;
  lastLogin?: string;
}

// Student Interface
export interface Student extends BaseUser {
  type: 'student';
  studentId: string;
  grade: string;
  section: string;
  rollNumber: string;
  dateOfBirth: string;
  parentIds: string[];
  subjects: string[];
  academicYear: string;
  attendance: {
    present: number;
    absent: number;
    percentage: number;
  };
  performance: {
    gpa: number;
    totalAssignments: number;
    submittedAssignments: number;
    averageGrade: number;
  };
}

// Teacher Interface
export interface Teacher extends BaseUser {
  type: 'teacher';
  employeeId: string;
  department: string;
  subjects: string[];
  classes: Array<{
    grade: string;
    section: string;
    subject: string;
  }>;
  qualifications: string[];
  experience: number;
  performance: {
    rating: number;
    totalStudents: number;
    classesTaught: number;
    satisfaction: number;
  };
}

// Parent Interface
export interface Parent extends BaseUser {
  type: 'parent';
  occupation?: string;
  children: Array<{
    id: string;
    name: string;
    grade: string;
    section: string;
  }>;
  emergencyContact?: {
    name: string;
    phone: string;
    relation: string;
  };
}

// Admin Interface
export interface Admin extends BaseUser {
  type: 'admin';
  employeeId: string;
  role: 'admin' | 'super_admin';
  department: string;
  permissions: string[];
  schoolId?: string;
}

export type User = Student | Teacher | Parent | Admin;

// Filters and Search
export interface UserFilters {
  type?: User['type'];
  grade?: string;
  section?: string;
  department?: string;
  isActive?: boolean;
  searchTerm?: string;
}

export interface UserStats {
  total: number;
  active: number;
  inactive: number;
  byType: {
    students: number;
    teachers: number;
    parents: number;
    admins: number;
  };
  byGrade?: Record<string, number>;
  byDepartment?: Record<string, number>;
}

interface UserManagementState {
  users: User[];
  filteredUsers: User[];
  stats: UserStats;
  isLoading: boolean;
  error: string | null;
  filters: UserFilters;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

interface UserManagementContextType extends UserManagementState {
  // CRUD Operations
  createUser: (userData: Omit<User, 'id' | 'joinDate' | 'lastLogin'>) => Promise<User>;
  updateUser: (id: string, updates: Partial<User>) => Promise<User>;
  deleteUser: (id: string) => Promise<void>;
  getUserById: (id: string) => User | undefined;
  getUsersByType: (type: User['type']) => User[];

  // Batch Operations
  deleteMultipleUsers: (ids: string[]) => Promise<void>;
  updateMultipleUsers: (ids: string[], updates: Partial<User>) => Promise<void>;
  activateUsers: (ids: string[]) => Promise<void>;
  deactivateUsers: (ids: string[]) => Promise<void>;

  // Search and Filter
  setFilters: (filters: Partial<UserFilters>) => void;
  clearFilters: () => void;
  searchUsers: (term: string) => void;

  // Pagination
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;

  // Utility Methods
  refreshUsers: () => Promise<void>;
  exportUsers: (type?: User['type']) => void;
  getRecentUsers: (limit?: number) => User[];
  validateUser: (userData: Partial<User>) => { valid: boolean; errors: string[] };
}

const UserManagementContext = createContext<UserManagementContextType | undefined>(undefined);

// Mock Data Generator
const generateMockUsers = (): User[] => {
  const users: User[] = [];

  // Generate Students
  const grades = ['6', '7', '8', '9', '10', '11', '12'];
  const sections = ['A', 'B', 'C'];
  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History'];

  for (let i = 1; i <= 50; i++) {
    const grade = grades[Math.floor(Math.random() * grades.length)];
    const section = sections[Math.floor(Math.random() * sections.length)];
    
    users.push({
      id: `student-${String(i).padStart(3, '0')}`,
      type: 'student',
      name: `Student ${i}`,
      email: `student${i}@school.com`,
      phone: `+91 98765${String(i).padStart(5, '0')}`,
      address: `Address ${i}, City`,
      avatar: `/avatars/student-${i % 10}.jpg`,
      isActive: Math.random() > 0.1,
      joinDate: new Date(2022, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString(),
      lastLogin: Math.random() > 0.3 ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString() : undefined,
      studentId: `STU${String(i).padStart(4, '0')}`,
      grade,
      section,
      rollNumber: `${grade}${section}${String(i % 50).padStart(2, '0')}`,
      dateOfBirth: new Date(2006, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString(),
      parentIds: [`parent-${String(Math.floor(i/2)).padStart(3, '0')}`],
      subjects: subjects.slice(0, 4 + Math.floor(Math.random() * 3)),
      academicYear: '2024-25',
      attendance: {
        present: 150 + Math.floor(Math.random() * 50),
        absent: Math.floor(Math.random() * 20),
        percentage: 75 + Math.floor(Math.random() * 25)
      },
      performance: {
        gpa: 2.5 + Math.random() * 1.5,
        totalAssignments: 20 + Math.floor(Math.random() * 10),
        submittedAssignments: 15 + Math.floor(Math.random() * 10),
        averageGrade: 60 + Math.random() * 40
      }
    });
  }

  // Generate Teachers
  const departments = ['Mathematics', 'Science', 'English', 'Social Studies', 'Arts', 'Physical Education'];
  
  for (let i = 1; i <= 15; i++) {
    const department = departments[Math.floor(Math.random() * departments.length)];
    const teacherSubjects = subjects.filter(() => Math.random() > 0.5).slice(0, 2);
    
    users.push({
      id: `teacher-${String(i).padStart(3, '0')}`,
      type: 'teacher',
      name: `Dr. Teacher ${i}`,
      email: `teacher${i}@school.com`,
      phone: `+91 97654${String(i).padStart(5, '0')}`,
      address: `Teacher Address ${i}, City`,
      avatar: `/avatars/teacher-${i % 10}.jpg`,
      isActive: Math.random() > 0.05,
      joinDate: new Date(2020, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString(),
      lastLogin: Math.random() > 0.2 ? new Date(Date.now() - Math.random() * 3 * 24 * 60 * 60 * 1000).toISOString() : undefined,
      employeeId: `TCH${String(i).padStart(4, '0')}`,
      department,
      subjects: teacherSubjects,
      classes: grades.slice(0, 2 + Math.floor(Math.random() * 3)).map(grade => ({
        grade,
        section: sections[Math.floor(Math.random() * sections.length)],
        subject: teacherSubjects[Math.floor(Math.random() * teacherSubjects.length)]
      })),
      qualifications: ['B.Ed', 'M.A', 'Ph.D'].slice(0, 1 + Math.floor(Math.random() * 2)),
      experience: 1 + Math.floor(Math.random() * 20),
      performance: {
        rating: 3.5 + Math.random() * 1.5,
        totalStudents: 80 + Math.floor(Math.random() * 50),
        classesTaught: 5 + Math.floor(Math.random() * 5),
        satisfaction: 70 + Math.random() * 30
      }
    });
  }

  // Generate Parents
  for (let i = 1; i <= 25; i++) {
    const childrenCount = 1 + Math.floor(Math.random() * 2);
    const children = [];
    
    for (let j = 0; j < childrenCount; j++) {
      const childIndex = (i - 1) * 2 + j + 1;
      if (childIndex <= 50) {
        const grade = grades[Math.floor(Math.random() * grades.length)];
        const section = sections[Math.floor(Math.random() * sections.length)];
        children.push({
          id: `student-${String(childIndex).padStart(3, '0')}`,
          name: `Student ${childIndex}`,
          grade,
          section
        });
      }
    }
    
    users.push({
      id: `parent-${String(i).padStart(3, '0')}`,
      type: 'parent',
      name: `Parent ${i}`,
      email: `parent${i}@gmail.com`,
      phone: `+91 96543${String(i).padStart(5, '0')}`,
      address: `Parent Address ${i}, City`,
      avatar: `/avatars/parent-${i % 10}.jpg`,
      isActive: Math.random() > 0.05,
      joinDate: new Date(2022, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString(),
      lastLogin: Math.random() > 0.4 ? new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000).toISOString() : undefined,
      occupation: ['Engineer', 'Doctor', 'Teacher', 'Business', 'Government', 'Other'][Math.floor(Math.random() * 6)],
      children,
      emergencyContact: {
        name: `Emergency Contact ${i}`,
        phone: `+91 95432${String(i).padStart(5, '0')}`,
        relation: ['Spouse', 'Parent', 'Sibling', 'Friend'][Math.floor(Math.random() * 4)]
      }
    });
  }

  // Generate Admins
  for (let i = 1; i <= 5; i++) {
    users.push({
      id: `admin-${String(i).padStart(3, '0')}`,
      type: 'admin',
      name: `Admin ${i}`,
      email: `admin${i}@school.com`,
      phone: `+91 94321${String(i).padStart(5, '0')}`,
      address: `Admin Address ${i}, City`,
      avatar: `/avatars/admin-${i % 5}.jpg`,
      isActive: true,
      joinDate: new Date(2019, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString(),
      lastLogin: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
      employeeId: `ADM${String(i).padStart(4, '0')}`,
      role: i === 1 ? 'super_admin' : 'admin',
      department: ['Administration', 'Academic', 'Finance', 'IT', 'HR'][Math.floor(Math.random() * 5)],
      permissions: i === 1 ? ['*'] : ['manage_users', 'view_reports', 'manage_courses'],
      schoolId: 'school-001'
    });
  }

  return users;
};

// Calculate Stats
const calculateStats = (users: User[]): UserStats => {
  const stats: UserStats = {
    total: users.length,
    active: users.filter(u => u.isActive).length,
    inactive: users.filter(u => !u.isActive).length,
    byType: {
      students: users.filter(u => u.type === 'student').length,
      teachers: users.filter(u => u.type === 'teacher').length,
      parents: users.filter(u => u.type === 'parent').length,
      admins: users.filter(u => u.type === 'admin').length,
    },
    byGrade: {},
    byDepartment: {}
  };

  // Calculate by grade
  users.filter(u => u.type === 'student').forEach(student => {
    const s = student as Student;
    stats.byGrade![s.grade] = (stats.byGrade![s.grade] || 0) + 1;
  });

  // Calculate by department
  users.filter(u => u.type === 'teacher' || u.type === 'admin').forEach(user => {
    const dept = (user as Teacher | Admin).department;
    stats.byDepartment![dept] = (stats.byDepartment![dept] || 0) + 1;
  });

  return stats;
};

// Filter Users
const filterUsers = (users: User[], filters: UserFilters): User[] => {
  let filtered = [...users];

  if (filters.type) {
    filtered = filtered.filter(u => u.type === filters.type);
  }

  if (filters.isActive !== undefined) {
    filtered = filtered.filter(u => u.isActive === filters.isActive);
  }

  if (filters.grade) {
    filtered = filtered.filter(u => u.type === 'student' && (u as Student).grade === filters.grade);
  }

  if (filters.section) {
    filtered = filtered.filter(u => u.type === 'student' && (u as Student).section === filters.section);
  }

  if (filters.department) {
    filtered = filtered.filter(u => 
      (u.type === 'teacher' && (u as Teacher).department === filters.department) ||
      (u.type === 'admin' && (u as Admin).department === filters.department)
    );
  }

  if (filters.searchTerm) {
    const term = filters.searchTerm.toLowerCase();
    filtered = filtered.filter(u =>
      u.name.toLowerCase().includes(term) ||
      u.email.toLowerCase().includes(term) ||
      (u.phone && u.phone.includes(term))
    );
  }

  return filtered;
};

export const UserManagementProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user: currentUser, hasPermission } = useAuth();
  const { addNotification } = useNotifications();

  const [state, setState] = useState<UserManagementState>({
    users: [],
    filteredUsers: [],
    stats: {
      total: 0,
      active: 0,
      inactive: 0,
      byType: { students: 0, teachers: 0, parents: 0, admins: 0 }
    },
    isLoading: false,
    error: null,
    filters: {},
    pagination: {
      page: 1,
      limit: 20,
      total: 0
    }
  });

  // Initialize users
  useEffect(() => {
    if (currentUser && hasPermission('manage_users')) {
      refreshUsers();
    }
  }, [currentUser, hasPermission]);

  // Update filtered users when filters change
  useEffect(() => {
    const filtered = filterUsers(state.users, state.filters);
    const stats = calculateStats(state.users);

    setState(prev => ({
      ...prev,
      filteredUsers: filtered,
      stats,
      pagination: {
        ...prev.pagination,
        total: filtered.length
      }
    }));
  }, [state.users, state.filters]);

  // CRUD Operations
  const createUser = useCallback(async (userData: Omit<User, 'id' | 'joinDate' | 'lastLogin'>): Promise<User> => {
    if (!hasPermission('manage_users')) {
      throw new Error('Permission denied: Cannot create users');
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newUser: User = {
        ...userData,
        id: `${userData.type}-${Date.now()}`,
        joinDate: new Date().toISOString(),
      } as User;

      setState(prev => ({
        ...prev,
        users: [newUser, ...prev.users],
        isLoading: false
      }));

      addNotification({
        title: 'User Created',
        message: `${newUser.name} has been successfully created`,
        type: 'success',
        priority: 'medium',
        read: false,
        actionRequired: false,
      });

      return newUser;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create user';
      setState(prev => ({ ...prev, isLoading: false, error: errorMessage }));
      throw error;
    }
  }, [hasPermission, addNotification]);

  const updateUser = useCallback(async (id: string, updates: Partial<User>): Promise<User> => {
    if (!hasPermission('manage_users')) {
      throw new Error('Permission denied: Cannot update users');
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      setState(prev => {
        const updatedUsers = prev.users.map(user =>
          user.id === id ? { ...user, ...updates } : user
        );

        const updatedUser = updatedUsers.find(u => u.id === id);
        if (!updatedUser) {
          throw new Error('User not found');
        }

        return {
          ...prev,
          users: updatedUsers,
          isLoading: false
        };
      });

      const updatedUser = state.users.find(u => u.id === id);
      if (!updatedUser) {
        throw new Error('User not found');
      }

      addNotification({
        title: 'User Updated',
        message: `${updatedUser.name} has been successfully updated`,
        type: 'success',
        priority: 'low',
        read: false,
        actionRequired: false,
      });

      return { ...updatedUser, ...updates };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update user';
      setState(prev => ({ ...prev, isLoading: false, error: errorMessage }));
      throw error;
    }
  }, [hasPermission, addNotification, state.users]);

  const deleteUser = useCallback(async (id: string): Promise<void> => {
    if (!hasPermission('manage_users')) {
      throw new Error('Permission denied: Cannot delete users');
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const userToDelete = state.users.find(u => u.id === id);
      if (!userToDelete) {
        throw new Error('User not found');
      }

      setState(prev => ({
        ...prev,
        users: prev.users.filter(user => user.id !== id),
        isLoading: false
      }));

      addNotification({
        title: 'User Deleted',
        message: `${userToDelete.name} has been successfully deleted`,
        type: 'warning',
        priority: 'medium',
        read: false,
        actionRequired: false,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete user';
      setState(prev => ({ ...prev, isLoading: false, error: errorMessage }));
      throw error;
    }
  }, [hasPermission, addNotification, state.users]);

  // Utility methods
  const getUserById = useCallback((id: string): User | undefined => {
    return state.users.find(user => user.id === id);
  }, [state.users]);

  const getUsersByType = useCallback((type: User['type']): User[] => {
    return state.users.filter(user => user.type === type);
  }, [state.users]);

  const refreshUsers = useCallback(async (): Promise<void> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const users = generateMockUsers();
      
      setState(prev => ({
        ...prev,
        users,
        isLoading: false
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to refresh users';
      setState(prev => ({ ...prev, isLoading: false, error: errorMessage }));
    }
  }, []);

  const setFilters = useCallback((filters: Partial<UserFilters>) => {
    setState(prev => ({
      ...prev,
      filters: { ...prev.filters, ...filters },
      pagination: { ...prev.pagination, page: 1 }
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setState(prev => ({
      ...prev,
      filters: {},
      pagination: { ...prev.pagination, page: 1 }
    }));
  }, []);

  const searchUsers = useCallback((term: string) => {
    setFilters({ searchTerm: term });
  }, [setFilters]);

  // Additional methods would be implemented similarly...
  const deleteMultipleUsers = useCallback(async (ids: string[]): Promise<void> => {
    // Implementation for batch delete
    for (const id of ids) {
      await deleteUser(id);
    }
  }, [deleteUser]);

  const activateUsers = useCallback(async (ids: string[]): Promise<void> => {
    for (const id of ids) {
      await updateUser(id, { isActive: true });
    }
  }, [updateUser]);

  const deactivateUsers = useCallback(async (ids: string[]): Promise<void> => {
    for (const id of ids) {
      await updateUser(id, { isActive: false });
    }
  }, [updateUser]);

  const validateUser = useCallback((userData: Partial<User>): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!userData.name || userData.name.trim().length < 2) {
      errors.push('Name must be at least 2 characters long');
    }

    if (!userData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
      errors.push('Valid email is required');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }, []);

  const contextValue: UserManagementContextType = {
    ...state,
    createUser,
    updateUser,
    deleteUser,
    getUserById,
    getUsersByType,
    deleteMultipleUsers,
    updateMultipleUsers: async () => {}, // Placeholder
    activateUsers,
    deactivateUsers,
    setFilters,
    clearFilters,
    searchUsers,
    setPage: (page) => setState(prev => ({ ...prev, pagination: { ...prev.pagination, page } })),
    setLimit: (limit) => setState(prev => ({ ...prev, pagination: { ...prev.pagination, limit } })),
    refreshUsers,
    exportUsers: () => {}, // Placeholder
    getRecentUsers: (limit = 10) => state.users.slice(0, limit),
    validateUser
  };

  return (
    <UserManagementContext.Provider value={contextValue}>
      {children}
    </UserManagementContext.Provider>
  );
};

export const useUserManagement = (): UserManagementContextType => {
  const context = useContext(UserManagementContext);
  if (context === undefined) {
    throw new Error('useUserManagement must be used within a UserManagementProvider');
  }
  return context;
};

export default UserManagementContext;