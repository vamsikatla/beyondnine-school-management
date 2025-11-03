"use client";

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from './AuthContext';

// Types
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'assignment' | 'grade' | 'attendance' | 'fee' | 'announcement';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  read: boolean;
  actionRequired: boolean;
  timestamp: Date;
  expiresAt?: Date;
  relatedEntity?: {
    type: 'student' | 'teacher' | 'parent' | 'class' | 'assignment' | 'exam' | 'fee';
    id: string;
    name: string;
  };
  actions?: Array<{
    id: string;
    label: string;
    type: 'primary' | 'secondary' | 'danger';
    url?: string;
  }>;
  metadata?: Record<string, any>;
}

interface NotificationsState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
  filters: {
    type?: Notification['type'];
    priority?: Notification['priority'];
    read?: boolean;
  };
}

type NotificationsAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_NOTIFICATIONS'; payload: Notification[] }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'UPDATE_NOTIFICATION'; payload: { id: string; updates: Partial<Notification> } }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'MARK_AS_READ'; payload: string[] }
  | { type: 'MARK_ALL_AS_READ' }
  | { type: 'CLEAR_ALL' }
  | { type: 'SET_FILTERS'; payload: Partial<NotificationsState['filters']> };

// Initial state
const initialState: NotificationsState = {
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  error: null,
  filters: {},
};

// Reducer
function notificationsReducer(state: NotificationsState, action: NotificationsAction): NotificationsState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload };

    case 'SET_NOTIFICATIONS':
      const unreadCount = action.payload.filter(n => !n.read).length;
      return {
        ...state,
        notifications: action.payload,
        unreadCount,
        isLoading: false,
        error: null,
      };

    case 'ADD_NOTIFICATION':
      const newNotifications = [action.payload, ...state.notifications];
      return {
        ...state,
        notifications: newNotifications,
        unreadCount: action.payload.read ? state.unreadCount : state.unreadCount + 1,
      };

    case 'UPDATE_NOTIFICATION':
      const updatedNotifications = state.notifications.map(n =>
        n.id === action.payload.id ? { ...n, ...action.payload.updates } : n
      );
      const newUnreadCount = updatedNotifications.filter(n => !n.read).length;
      return {
        ...state,
        notifications: updatedNotifications,
        unreadCount: newUnreadCount,
      };

    case 'REMOVE_NOTIFICATION':
      const filteredNotifications = state.notifications.filter(n => n.id !== action.payload);
      return {
        ...state,
        notifications: filteredNotifications,
        unreadCount: filteredNotifications.filter(n => !n.read).length,
      };

    case 'MARK_AS_READ':
      const markedNotifications = state.notifications.map(n =>
        action.payload.includes(n.id) ? { ...n, read: true } : n
      );
      return {
        ...state,
        notifications: markedNotifications,
        unreadCount: markedNotifications.filter(n => !n.read).length,
      };

    case 'MARK_ALL_AS_READ':
      return {
        ...state,
        notifications: state.notifications.map(n => ({ ...n, read: true })),
        unreadCount: 0,
      };

    case 'CLEAR_ALL':
      return {
        ...state,
        notifications: [],
        unreadCount: 0,
      };

    case 'SET_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };

    default:
      return state;
  }
}

// Context
interface NotificationsContextType extends NotificationsState {
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  updateNotification: (id: string, updates: Partial<Notification>) => void;
  removeNotification: (id: string) => void;
  markAsRead: (ids: string[]) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
  setFilters: (filters: Partial<NotificationsState['filters']>) => void;
  getFilteredNotifications: () => Notification[];
  refresh: () => Promise<void>;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

// Mock notifications generator
const generateMockNotifications = (userRole: string, userId: string): Notification[] => {
  const baseNotifications: Notification[] = [];
  const now = new Date();

  if (userRole === 'student') {
    baseNotifications.push(
      {
        id: 'notif_001',
        title: 'New Grade Posted',
        message: 'Your Mathematics quiz has been graded. Score: 95/100',
        type: 'grade',
        priority: 'medium',
        read: false,
        actionRequired: false,
        timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
        relatedEntity: {
          type: 'assignment',
          id: 'assign_001',
          name: 'Mathematics Quiz'
        },
        actions: [
          { id: 'view_grade', label: 'View Grade', type: 'primary', url: '/student/grades' }
        ]
      },
      {
        id: 'notif_002',
        title: 'Assignment Due Tomorrow',
        message: 'Physics lab report is due tomorrow by 11:59 PM',
        type: 'assignment',
        priority: 'high',
        read: false,
        actionRequired: true,
        timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000), // 4 hours ago
        expiresAt: new Date(now.getTime() + 20 * 60 * 60 * 1000), // 20 hours from now
        actions: [
          { id: 'view_assignment', label: 'View Assignment', type: 'primary', url: '/student/assignments' },
          { id: 'submit', label: 'Submit Now', type: 'primary', url: '/student/assignments/submit' }
        ]
      }
    );
  }

  if (userRole === 'teacher') {
    baseNotifications.push(
      {
        id: 'notif_101',
        title: 'New Assignment Submissions',
        message: '12 new submissions received for Calculus Problem Set',
        type: 'assignment',
        priority: 'medium',
        read: false,
        actionRequired: true,
        timestamp: new Date(now.getTime() - 1 * 60 * 60 * 1000), // 1 hour ago
        actions: [
          { id: 'review_submissions', label: 'Review Submissions', type: 'primary', url: '/teacher/assignments' }
        ]
      },
      {
        id: 'notif_102',
        title: 'Low Attendance Alert',
        message: '5 students have attendance below 75% in your Mathematics class',
        type: 'attendance',
        priority: 'high',
        read: true,
        actionRequired: true,
        timestamp: new Date(now.getTime() - 6 * 60 * 60 * 1000), // 6 hours ago
        actions: [
          { id: 'view_attendance', label: 'View Details', type: 'primary', url: '/teacher/attendance' }
        ]
      }
    );
  }

  if (userRole === 'parent') {
    baseNotifications.push(
      {
        id: 'notif_201',
        title: 'Excellent Performance!',
        message: 'Aarav scored 95% in the recent Mathematics test',
        type: 'grade',
        priority: 'low',
        read: false,
        actionRequired: false,
        timestamp: new Date(now.getTime() - 3 * 60 * 60 * 1000), // 3 hours ago
      },
      {
        id: 'notif_202',
        title: 'Fee Payment Reminder',
        message: 'Library fee of ₹1,000 is due on March 15, 2024',
        type: 'fee',
        priority: 'medium',
        read: false,
        actionRequired: true,
        timestamp: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        expiresAt: new Date('2024-03-15'),
        actions: [
          { id: 'pay_fee', label: 'Pay Now', type: 'primary', url: '/parent/fees' }
        ]
      }
    );
  }

  if (userRole === 'admin') {
    baseNotifications.push(
      {
        id: 'notif_301',
        title: 'System Maintenance Complete',
        message: 'Database backup completed successfully at 2:00 AM',
        type: 'success',
        priority: 'low',
        read: true,
        actionRequired: false,
        timestamp: new Date(now.getTime() - 8 * 60 * 60 * 1000), // 8 hours ago
      },
      {
        id: 'notif_302',
        title: 'New Teacher Registration',
        message: 'Sarah Johnson has applied for English Teacher position',
        type: 'info',
        priority: 'medium',
        read: false,
        actionRequired: true,
        timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
        actions: [
          { id: 'review_application', label: 'Review Application', type: 'primary', url: '/admin/teachers' }
        ]
      }
    );
  }

  return baseNotifications;
};

// Provider component
export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(notificationsReducer, initialState);
  const { user, isAuthenticated } = useAuth();

  // Load notifications when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      refresh();
    }
  }, [isAuthenticated, user]);

  // Simulate real-time notifications
  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const interval = setInterval(() => {
      // Randomly add new notifications (simulate real-time updates)
      if (Math.random() < 0.1) { // 10% chance every 30 seconds
        const mockNotifications = [
          {
            title: 'New Message',
            message: 'You have received a new message from your teacher',
            type: 'info' as const,
            priority: 'low' as const,
            read: false,
            actionRequired: false,
          },
          {
            title: 'Reminder',
            message: 'Don\'t forget about tomorrow\'s parent-teacher meeting',
            type: 'announcement' as const,
            priority: 'medium' as const,
            read: false,
            actionRequired: true,
          },
        ];

        const randomNotification = mockNotifications[Math.floor(Math.random() * mockNotifications.length)];
        addNotification(randomNotification);
      }
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, [isAuthenticated, user]);

  // Auto-remove expired notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      state.notifications.forEach(notification => {
        if (notification.expiresAt && notification.expiresAt < now) {
          dispatch({ type: 'REMOVE_NOTIFICATION', payload: notification.id });
        }
      });
    }, 60000); // Every minute

    return () => clearInterval(interval);
  }, [state.notifications]);

  const refresh = async (): Promise<void> => {
    if (!user) return;

    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const notifications = generateMockNotifications(user.role, user.id);
      dispatch({ type: 'SET_NOTIFICATIONS', payload: notifications });
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to load notifications' 
      });
    }
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
    };

    dispatch({ type: 'ADD_NOTIFICATION', payload: newNotification });
  };

  const updateNotification = (id: string, updates: Partial<Notification>) => {
    dispatch({ type: 'UPDATE_NOTIFICATION', payload: { id, updates } });
  };

  const removeNotification = (id: string) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
  };

  const markAsRead = (ids: string[]) => {
    dispatch({ type: 'MARK_AS_READ', payload: ids });
  };

  const markAllAsRead = () => {
    dispatch({ type: 'MARK_ALL_AS_READ' });
  };

  const clearAll = () => {
    dispatch({ type: 'CLEAR_ALL' });
  };

  const setFilters = (filters: Partial<NotificationsState['filters']>) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  const getFilteredNotifications = (): Notification[] => {
    let filtered = [...state.notifications];

    if (state.filters.type) {
      filtered = filtered.filter(n => n.type === state.filters.type);
    }

    if (state.filters.priority) {
      filtered = filtered.filter(n => n.priority === state.filters.priority);
    }

    if (state.filters.read !== undefined) {
      filtered = filtered.filter(n => n.read === state.filters.read);
    }

    // Sort by timestamp (newest first)
    return filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  };

  const value: NotificationsContextType = {
    ...state,
    addNotification,
    updateNotification,
    removeNotification,
    markAsRead,
    markAllAsRead,
    clearAll,
    setFilters,
    getFilteredNotifications,
    refresh,
  };

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
}

// Hook to use notifications context
export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
}

// Hook for toast notifications
export function useToast() {
  const { addNotification } = useNotifications();

  const toast = {
    success: (title: string, message?: string) => {
      addNotification({
        title,
        message: message || '',
        type: 'success',
        priority: 'low',
        read: false,
        actionRequired: false,
      });
    },
    error: (title: string, message?: string) => {
      addNotification({
        title,
        message: message || '',
        type: 'error',
        priority: 'high',
        read: false,
        actionRequired: false,
      });
    },
    warning: (title: string, message?: string) => {
      addNotification({
        title,
        message: message || '',
        type: 'warning',
        priority: 'medium',
        read: false,
        actionRequired: false,
      });
    },
    info: (title: string, message?: string) => {
      addNotification({
        title,
        message: message || '',
        type: 'info',
        priority: 'low',
        read: false,
        actionRequired: false,
      });
    },
  };

  return toast;
}