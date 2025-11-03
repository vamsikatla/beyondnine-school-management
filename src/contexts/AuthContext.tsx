"use client";

import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Types
interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'parent' | 'admin' | 'super_admin';
  avatar?: string;
  permissions: string[];
  profile: {
    phone?: string;
    address?: string;
    dateOfBirth?: string;
    // Role-specific profile data
    studentId?: string;
    employeeId?: string;
    grade?: string;
    subjects?: string[];
    children?: Array<{
      id: string;
      name: string;
      grade: string;
      section: string;
    }>;
  };
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  sessionToken: string | null;
}

type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'AUTH_FAILURE'; payload: string }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'UPDATE_USER'; payload: Partial<User> }
  | { type: 'CLEAR_ERROR' };

// Initial state
const initialState: AuthState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
  sessionToken: null,
};

// Auth reducer
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case 'AUTH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
        sessionToken: action.payload.token,
        error: null,
      };

    case 'AUTH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        sessionToken: null,
        error: action.payload,
      };

    case 'AUTH_LOGOUT':
      return {
        ...initialState,
      };

    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}

// Context
interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  clearError: () => void;
  hasPermission: (permission: string) => boolean;
  switchRole: (newRole: User['role']) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users database
const mockUsers: Record<string, User & { password: string }> = {
  // Student
  'student@test.com': {
    id: 'stu_001',
    name: 'Aarav Sharma',
    email: 'student@test.com',
    password: 'password',
    role: 'student',
    avatar: '👨‍🎓',
    permissions: ['view_grades', 'view_assignments', 'view_attendance', 'update_profile'],
    profile: {
      phone: '+91 9876543210',
      address: '123 Student Colony, Mumbai',
      dateOfBirth: '2005-08-15',
      studentId: 'STU2024001',
      grade: 'Grade 12',
    },
  },
  // Teacher
  'teacher@test.com': {
    id: 'tch_001',
    name: 'Dr. Priya Gupta',
    email: 'teacher@test.com',
    password: 'password',
    role: 'teacher',
    avatar: '👩‍🏫',
    permissions: ['view_students', 'manage_grades', 'manage_assignments', 'view_attendance', 'update_profile'],
    profile: {
      phone: '+91 9876543211',
      address: '456 Teacher Street, Mumbai',
      employeeId: 'EMP001',
      subjects: ['Mathematics', 'Statistics'],
    },
  },
  // Parent
  'parent@test.com': {
    id: 'par_001',
    name: 'Rajesh Sharma',
    email: 'parent@test.com',
    password: 'password',
    role: 'parent',
    avatar: '👨‍💼',
    permissions: ['view_child_grades', 'view_child_attendance', 'communication', 'fee_management'],
    profile: {
      phone: '+91 9876543212',
      address: '123 Parent Colony, Mumbai',
      children: [
        { id: 'stu_001', name: 'Aarav Sharma', grade: 'Grade 12', section: 'A' },
      ],
    },
  },
  // Admin
  'admin@test.com': {
    id: 'adm_001',
    name: 'School Administrator',
    email: 'admin@test.com',
    password: 'password',
    role: 'admin',
    avatar: '👨‍💼',
    permissions: [
      'manage_students', 'manage_teachers', 'manage_classes', 'view_reports', 
      'manage_fees', 'system_settings', 'communication_admin'
    ],
    profile: {
      phone: '+91 9876543213',
      employeeId: 'ADM001',
    },
  },
  // Super Admin
  'superadmin@test.com': {
    id: 'sup_001',
    name: 'Super Administrator',
    email: 'superadmin@test.com',
    password: 'password',
    role: 'super_admin',
    avatar: '👑',
    permissions: ['*'], // All permissions
    profile: {
      phone: '+91 9876543214',
      employeeId: 'SUP001',
    },
  },
};

// Provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for stored session on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('authUser');
    
    if (storedToken && storedUser) {
      try {
        const user = JSON.parse(storedUser);
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: { user, token: storedToken }
        });
      } catch (error) {
        // Invalid stored data, clear it
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
      }
    }
  }, []);

  // Mock login function
  const login = async (email: string, password: string): Promise<void> => {
    dispatch({ type: 'AUTH_START' });

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const user = mockUsers[email];
      if (!user || user.password !== password) {
        throw new Error('Invalid email or password');
      }

      const { password: _, ...userWithoutPassword } = user;
      const token = `mock_token_${Date.now()}`;

      // Store in localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('authUser', JSON.stringify(userWithoutPassword));

      dispatch({
        type: 'AUTH_SUCCESS',
        payload: { user: userWithoutPassword, token }
      });
    } catch (error) {
      dispatch({
        type: 'AUTH_FAILURE',
        payload: error instanceof Error ? error.message : 'Login failed'
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    dispatch({ type: 'AUTH_LOGOUT' });
  };

  const updateUser = (userData: Partial<User>) => {
    dispatch({ type: 'UPDATE_USER', payload: userData });
    
    // Update localStorage
    if (state.user) {
      const updatedUser = { ...state.user, ...userData };
      localStorage.setItem('authUser', JSON.stringify(updatedUser));
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const hasPermission = (permission: string): boolean => {
    if (!state.user) return false;
    
    // Super admin has all permissions
    if (state.user.permissions.includes('*')) return true;
    
    return state.user.permissions.includes(permission);
  };

  // Mock role switching (useful for demo purposes)
  const switchRole = async (newRole: User['role']): Promise<void> => {
    if (!state.user) return;

    dispatch({ type: 'AUTH_START' });

    try {
      // Find a mock user with the target role
      const targetUser = Object.values(mockUsers).find(user => user.role === newRole);
      if (!targetUser) {
        throw new Error(`No mock user found for role: ${newRole}`);
      }

      const { password: _, ...userWithoutPassword } = targetUser;
      const token = `mock_token_${Date.now()}`;

      // Update localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('authUser', JSON.stringify(userWithoutPassword));

      dispatch({
        type: 'AUTH_SUCCESS',
        payload: { user: userWithoutPassword, token }
      });
    } catch (error) {
      dispatch({
        type: 'AUTH_FAILURE',
        payload: error instanceof Error ? error.message : 'Role switch failed'
      });
    }
  };

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    updateUser,
    clearError,
    hasPermission,
    switchRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Higher-order component for protected routes
export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  requiredPermissions?: string[]
) {
  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated, isLoading, hasPermission, user } = useAuth();

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    if (!isAuthenticated) {
      // Redirect to login or show login component
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="max-w-md w-full">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-slate-900">Authentication Required</h1>
              <p className="text-slate-600">Please log in to access this page.</p>
            </div>
          </div>
        </div>
      );
    }

    // Check permissions if required
    if (requiredPermissions && requiredPermissions.length > 0) {
      const hasRequiredPermissions = requiredPermissions.every(permission => 
        hasPermission(permission)
      );

      if (!hasRequiredPermissions) {
        return (
          <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="max-w-md w-full text-center">
              <h1 className="text-2xl font-bold text-slate-900 mb-4">Access Denied</h1>
              <p className="text-slate-600">You don't have permission to access this page.</p>
              <p className="text-sm text-slate-500 mt-2">Required permissions: {requiredPermissions.join(', ')}</p>
            </div>
          </div>
        );
      }
    }

    return <WrappedComponent {...props} />;
  };
}