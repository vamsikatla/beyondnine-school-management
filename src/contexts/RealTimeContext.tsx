"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { useNotifications } from './NotificationsContext';

// Message Interface
export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'student' | 'teacher' | 'parent' | 'admin';
  recipientId: string;
  recipientName: string;
  recipientRole: 'student' | 'teacher' | 'parent' | 'admin';
  content: string;
  type: 'text' | 'image' | 'file' | 'announcement';
  timestamp: Date;
  isRead: boolean;
  isDelivered: boolean;
  attachments?: {
    id: string;
    name: string;
    url: string;
    size: number;
    type: string;
  }[];
  replyTo?: string;
  isEdited: boolean;
  editedAt?: Date;
}

// Chat Interface
export interface Chat {
  id: string;
  participants: {
    id: string;
    name: string;
    role: string;
    avatar?: string;
    isOnline: boolean;
    lastSeen?: Date;
  }[];
  type: 'direct' | 'group' | 'class' | 'announcement';
  name?: string;
  description?: string;
  avatar?: string;
  messages: Message[];
  lastMessage?: Message;
  unreadCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Live Update Interface
export interface LiveUpdate {
  id: string;
  type: 'user_online' | 'user_offline' | 'message' | 'notification' | 'data_update' | 'system_alert';
  userId?: string;
  data: any;
  timestamp: Date;
}

// Online User Interface
export interface OnlineUser {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  lastSeen: Date;
  currentActivity?: {
    type: 'viewing_dashboard' | 'in_chat' | 'taking_exam' | 'idle';
    details?: string;
  };
}

// Connection Status
export interface ConnectionStatus {
  isConnected: boolean;
  connectionQuality: 'excellent' | 'good' | 'poor' | 'disconnected';
  lastConnected?: Date;
  reconnectAttempts: number;
}

interface RealTimeState {
  chats: Chat[];
  activeChat?: Chat;
  onlineUsers: OnlineUser[];
  connectionStatus: ConnectionStatus;
  isTyping: Record<string, string[]>; // chatId -> userIds
  liveUpdates: LiveUpdate[];
}

interface RealTimeContextType extends RealTimeState {
  // Connection Management
  connect: () => void;
  disconnect: () => void;
  reconnect: () => void;

  // Chat Operations
  getChats: () => Chat[];
  getChatById: (chatId: string) => Chat | undefined;
  createChat: (participants: string[], type: Chat['type'], name?: string) => Promise<Chat>;
  sendMessage: (chatId: string, content: string, type?: Message['type'], attachments?: Message['attachments']) => Promise<Message>;
  markMessageAsRead: (messageId: string) => void;
  editMessage: (messageId: string, newContent: string) => Promise<Message>;
  deleteMessage: (messageId: string) => Promise<void>;
  setActiveChat: (chatId: string | undefined) => void;

  // Typing Indicators
  startTyping: (chatId: string) => void;
  stopTyping: (chatId: string) => void;
  getTypingUsers: (chatId: string) => string[];

  // User Status
  updateUserStatus: (status: OnlineUser['status'], activity?: OnlineUser['currentActivity']) => void;
  getUsersInChat: (chatId: string) => OnlineUser[];

  // Live Updates
  subscribeTo: (type: LiveUpdate['type'], callback: (update: LiveUpdate) => void) => () => void;
  sendLiveUpdate: (type: LiveUpdate['type'], data: any) => void;

  // Search and Filter
  searchMessages: (query: string, chatId?: string) => Message[];
  filterChats: (filter: 'all' | 'unread' | 'groups' | 'direct') => Chat[];
}

const RealTimeContext = createContext<RealTimeContextType | undefined>(undefined);

// Mock Data Generators
const generateMockChats = (currentUserId: string): Chat[] => {
  const chats: Chat[] = [];

  // Direct chat with teacher
  chats.push({
    id: 'chat-001',
    participants: [
      {
        id: currentUserId,
        name: 'You',
        role: 'student',
        isOnline: true,
        lastSeen: new Date()
      },
      {
        id: 'teacher-001',
        name: 'Dr. Priya Gupta',
        role: 'teacher',
        avatar: '/avatars/teacher-1.jpg',
        isOnline: Math.random() > 0.5,
        lastSeen: new Date(Date.now() - Math.random() * 60 * 60 * 1000)
      }
    ],
    type: 'direct',
    messages: [
      {
        id: 'msg-001',
        senderId: 'teacher-001',
        senderName: 'Dr. Priya Gupta',
        senderRole: 'teacher',
        recipientId: currentUserId,
        recipientName: 'You',
        recipientRole: 'student',
        content: 'Hi! How are you doing with the mathematics assignment?',
        type: 'text',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        isRead: false,
        isDelivered: true,
        isEdited: false
      },
      {
        id: 'msg-002',
        senderId: currentUserId,
        senderName: 'You',
        senderRole: 'student',
        recipientId: 'teacher-001',
        recipientName: 'Dr. Priya Gupta',
        recipientRole: 'teacher',
        content: 'I\'m doing well! I have a question about problem 5.',
        type: 'text',
        timestamp: new Date(Date.now() - 25 * 60 * 1000),
        isRead: true,
        isDelivered: true,
        isEdited: false
      }
    ],
    unreadCount: 1,
    isActive: true,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 25 * 60 * 1000)
  });

  // Class group chat
  chats.push({
    id: 'chat-002',
    participants: [
      {
        id: currentUserId,
        name: 'You',
        role: 'student',
        isOnline: true
      },
      {
        id: 'student-002',
        name: 'Priya Sharma',
        role: 'student',
        isOnline: false,
        lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000)
      },
      {
        id: 'student-003',
        name: 'Rahul Kumar',
        role: 'student',
        isOnline: true
      }
    ],
    type: 'group',
    name: 'Grade 12-A Study Group',
    description: 'Mathematics study group for Grade 12-A',
    messages: [
      {
        id: 'msg-003',
        senderId: 'student-002',
        senderName: 'Priya Sharma',
        senderRole: 'student',
        recipientId: 'chat-002',
        recipientName: 'Grade 12-A Study Group',
        recipientRole: 'student',
        content: 'Anyone wants to study together for tomorrow\'s physics test?',
        type: 'text',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        isRead: false,
        isDelivered: true,
        isEdited: false
      }
    ],
    unreadCount: 1,
    isActive: true,
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
  });

  // Update last messages
  chats.forEach(chat => {
    if (chat.messages.length > 0) {
      chat.lastMessage = chat.messages[chat.messages.length - 1];
    }
  });

  return chats;
};

const generateMockOnlineUsers = (): OnlineUser[] => {
  const users: OnlineUser[] = [];
  const statuses: OnlineUser['status'][] = ['online', 'away', 'busy', 'offline'];
  const activities: OnlineUser['currentActivity']['type'][] = ['viewing_dashboard', 'in_chat', 'taking_exam', 'idle'];

  for (let i = 1; i <= 20; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const isOnline = status !== 'offline';
    
    users.push({
      id: `user-${String(i).padStart(3, '0')}`,
      name: `User ${i}`,
      role: ['student', 'teacher', 'parent'][Math.floor(Math.random() * 3)],
      avatar: `/avatars/user-${i % 10}.jpg`,
      status,
      lastSeen: new Date(Date.now() - (isOnline ? 0 : Math.random() * 24 * 60 * 60 * 1000)),
      currentActivity: isOnline ? {
        type: activities[Math.floor(Math.random() * activities.length)],
        details: `Active in ${['Mathematics', 'Physics', 'Chemistry'][Math.floor(Math.random() * 3)]}`
      } : undefined
    });
  }

  return users;
};

export const RealTimeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const { addNotification } = useNotifications();
  
  const [state, setState] = useState<RealTimeState>({
    chats: [],
    activeChat: undefined,
    onlineUsers: [],
    connectionStatus: {
      isConnected: false,
      connectionQuality: 'disconnected',
      reconnectAttempts: 0
    },
    isTyping: {},
    liveUpdates: []
  });

  const websocketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();
  const typingTimeoutRef = useRef<Record<string, NodeJS.Timeout>>({});
  const subscriptionsRef = useRef<Map<string, ((update: LiveUpdate) => void)[]>>(new Map());

  // Initialize connection when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      connect();
      // Initialize with mock data
      setState(prev => ({
        ...prev,
        chats: generateMockChats(user.id),
        onlineUsers: generateMockOnlineUsers()
      }));
    } else {
      disconnect();
    }

    return () => {
      disconnect();
    };
  }, [isAuthenticated, user]);

  // Connection Management
  const connect = useCallback(() => {
    if (!user) return;

    // Mock WebSocket connection
    setState(prev => ({
      ...prev,
      connectionStatus: {
        isConnected: true,
        connectionQuality: 'excellent',
        lastConnected: new Date(),
        reconnectAttempts: 0
      }
    }));

    // Simulate real-time updates
    const interval = setInterval(() => {
      // Randomly simulate online status changes
      if (Math.random() < 0.1) {
        setState(prev => ({
          ...prev,
          onlineUsers: prev.onlineUsers.map(u => ({
            ...u,
            status: Math.random() > 0.8 ? 'offline' : 'online',
            lastSeen: new Date()
          }))
        }));
      }

      // Randomly simulate new messages (very low probability)
      if (Math.random() < 0.05) {
        const mockMessage: Message = {
          id: `msg-${Date.now()}`,
          senderId: 'teacher-001',
          senderName: 'Dr. Priya Gupta',
          senderRole: 'teacher',
          recipientId: user.id,
          recipientName: user.name,
          recipientRole: user.role,
          content: 'Don\'t forget about tomorrow\'s assignment deadline!',
          type: 'text',
          timestamp: new Date(),
          isRead: false,
          isDelivered: true,
          isEdited: false
        };

        setState(prev => {
          const updatedChats = prev.chats.map(chat => {
            if (chat.id === 'chat-001') {
              return {
                ...chat,
                messages: [...chat.messages, mockMessage],
                lastMessage: mockMessage,
                unreadCount: chat.unreadCount + 1,
                updatedAt: new Date()
              };
            }
            return chat;
          });

          return {
            ...prev,
            chats: updatedChats
          };
        });

        addNotification({
          title: 'New Message',
          message: `${mockMessage.senderName}: ${mockMessage.content.substring(0, 50)}...`,
          type: 'info',
          priority: 'medium',
          read: false,
          actionRequired: false
        });
      }
    }, 10000); // Every 10 seconds

    return () => clearInterval(interval);
  }, [user, addNotification]);

  const disconnect = useCallback(() => {
    setState(prev => ({
      ...prev,
      connectionStatus: {
        isConnected: false,
        connectionQuality: 'disconnected',
        reconnectAttempts: 0
      }
    }));
  }, []);

  const reconnect = useCallback(() => {
    setState(prev => ({
      ...prev,
      connectionStatus: {
        ...prev.connectionStatus,
        reconnectAttempts: prev.connectionStatus.reconnectAttempts + 1
      }
    }));

    reconnectTimeoutRef.current = setTimeout(() => {
      connect();
    }, Math.min(1000 * Math.pow(2, state.connectionStatus.reconnectAttempts), 30000));
  }, [connect, state.connectionStatus.reconnectAttempts]);

  // Chat Operations
  const getChats = useCallback((): Chat[] => {
    return state.chats.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  }, [state.chats]);

  const getChatById = useCallback((chatId: string): Chat | undefined => {
    return state.chats.find(chat => chat.id === chatId);
  }, [state.chats]);

  const createChat = useCallback(async (participants: string[], type: Chat['type'], name?: string): Promise<Chat> => {
    // Mock chat creation
    const newChat: Chat = {
      id: `chat-${Date.now()}`,
      participants: participants.map(id => ({
        id,
        name: `User ${id}`,
        role: 'student',
        isOnline: Math.random() > 0.5
      })),
      type,
      name,
      messages: [],
      unreadCount: 0,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setState(prev => ({
      ...prev,
      chats: [...prev.chats, newChat]
    }));

    return newChat;
  }, []);

  const sendMessage = useCallback(async (chatId: string, content: string, type: Message['type'] = 'text', attachments?: Message['attachments']): Promise<Message> => {
    if (!user) throw new Error('User not authenticated');

    const chat = getChatById(chatId);
    if (!chat) throw new Error('Chat not found');

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: user.id,
      senderName: user.name,
      senderRole: user.role,
      recipientId: chat.type === 'direct' ? chat.participants.find(p => p.id !== user.id)?.id || '' : chatId,
      recipientName: chat.type === 'direct' ? chat.participants.find(p => p.id !== user.id)?.name || '' : chat.name || '',
      recipientRole: user.role,
      content,
      type,
      timestamp: new Date(),
      isRead: false,
      isDelivered: true,
      attachments,
      isEdited: false
    };

    setState(prev => ({
      ...prev,
      chats: prev.chats.map(c => {
        if (c.id === chatId) {
          return {
            ...c,
            messages: [...c.messages, newMessage],
            lastMessage: newMessage,
            updatedAt: new Date()
          };
        }
        return c;
      })
    }));

    return newMessage;
  }, [user, getChatById]);

  const markMessageAsRead = useCallback((messageId: string) => {
    setState(prev => ({
      ...prev,
      chats: prev.chats.map(chat => ({
        ...chat,
        messages: chat.messages.map(msg => 
          msg.id === messageId ? { ...msg, isRead: true } : msg
        ),
        unreadCount: chat.messages.filter(msg => !msg.isRead && msg.senderId !== user?.id).length
      }))
    }));
  }, [user]);

  const setActiveChat = useCallback((chatId: string | undefined) => {
    const chat = chatId ? getChatById(chatId) : undefined;
    setState(prev => ({ ...prev, activeChat: chat }));

    // Mark all messages in active chat as read
    if (chat && user) {
      chat.messages.forEach(msg => {
        if (!msg.isRead && msg.senderId !== user.id) {
          markMessageAsRead(msg.id);
        }
      });
    }
  }, [getChatById, user, markMessageAsRead]);

  // Typing Indicators
  const startTyping = useCallback((chatId: string) => {
    if (!user) return;

    setState(prev => ({
      ...prev,
      isTyping: {
        ...prev.isTyping,
        [chatId]: [...(prev.isTyping[chatId] || []), user.id].filter((id, index, arr) => arr.indexOf(id) === index)
      }
    }));

    // Auto-stop typing after 3 seconds
    if (typingTimeoutRef.current[chatId]) {
      clearTimeout(typingTimeoutRef.current[chatId]);
    }
    typingTimeoutRef.current[chatId] = setTimeout(() => {
      stopTyping(chatId);
    }, 3000);
  }, [user]);

  const stopTyping = useCallback((chatId: string) => {
    if (!user) return;

    setState(prev => ({
      ...prev,
      isTyping: {
        ...prev.isTyping,
        [chatId]: (prev.isTyping[chatId] || []).filter(id => id !== user.id)
      }
    }));

    if (typingTimeoutRef.current[chatId]) {
      clearTimeout(typingTimeoutRef.current[chatId]);
      delete typingTimeoutRef.current[chatId];
    }
  }, [user]);

  const getTypingUsers = useCallback((chatId: string): string[] => {
    return state.isTyping[chatId] || [];
  }, [state.isTyping]);

  // User Status
  const updateUserStatus = useCallback((status: OnlineUser['status'], activity?: OnlineUser['currentActivity']) => {
    if (!user) return;

    setState(prev => ({
      ...prev,
      onlineUsers: prev.onlineUsers.map(u => 
        u.id === user.id 
          ? { ...u, status, currentActivity: activity, lastSeen: new Date() }
          : u
      )
    }));
  }, [user]);

  // Live Updates
  const subscribeTo = useCallback((type: LiveUpdate['type'], callback: (update: LiveUpdate) => void): (() => void) => {
    const callbacks = subscriptionsRef.current.get(type) || [];
    callbacks.push(callback);
    subscriptionsRef.current.set(type, callbacks);

    // Return unsubscribe function
    return () => {
      const updatedCallbacks = subscriptionsRef.current.get(type)?.filter(cb => cb !== callback) || [];
      subscriptionsRef.current.set(type, updatedCallbacks);
    };
  }, []);

  const sendLiveUpdate = useCallback((type: LiveUpdate['type'], data: any) => {
    const update: LiveUpdate = {
      id: `update-${Date.now()}`,
      type,
      userId: user?.id,
      data,
      timestamp: new Date()
    };

    setState(prev => ({
      ...prev,
      liveUpdates: [update, ...prev.liveUpdates.slice(0, 99)] // Keep last 100 updates
    }));

    // Notify subscribers
    const callbacks = subscriptionsRef.current.get(type) || [];
    callbacks.forEach(callback => callback(update));
  }, [user]);

  // Search and Filter
  const searchMessages = useCallback((query: string, chatId?: string): Message[] => {
    const chatsToSearch = chatId ? [getChatById(chatId)].filter(Boolean) : state.chats;
    const messages: Message[] = [];

    chatsToSearch.forEach(chat => {
      if (chat) {
        messages.push(...chat.messages.filter(msg => 
          msg.content.toLowerCase().includes(query.toLowerCase())
        ));
      }
    });

    return messages.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }, [state.chats, getChatById]);

  const filterChats = useCallback((filter: 'all' | 'unread' | 'groups' | 'direct'): Chat[] => {
    let filtered = [...state.chats];

    switch (filter) {
      case 'unread':
        filtered = filtered.filter(chat => chat.unreadCount > 0);
        break;
      case 'groups':
        filtered = filtered.filter(chat => chat.type === 'group' || chat.type === 'class');
        break;
      case 'direct':
        filtered = filtered.filter(chat => chat.type === 'direct');
        break;
    }

    return filtered.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  }, [state.chats]);

  const contextValue: RealTimeContextType = {
    ...state,
    connect,
    disconnect,
    reconnect,
    getChats,
    getChatById,
    createChat,
    sendMessage,
    markMessageAsRead,
    editMessage: async () => { throw new Error('Not implemented') },
    deleteMessage: async () => { throw new Error('Not implemented') },
    setActiveChat,
    startTyping,
    stopTyping,
    getTypingUsers,
    updateUserStatus,
    getUsersInChat: (chatId) => {
      const chat = getChatById(chatId);
      return chat ? state.onlineUsers.filter(user => 
        chat.participants.some(p => p.id === user.id)
      ) : [];
    },
    subscribeTo,
    sendLiveUpdate,
    searchMessages,
    filterChats
  };

  return (
    <RealTimeContext.Provider value={contextValue}>
      {children}
    </RealTimeContext.Provider>
  );
};

export const useRealTime = (): RealTimeContextType => {
  const context = useContext(RealTimeContext);
  if (context === undefined) {
    throw new Error('useRealTime must be used within a RealTimeProvider');
  }
  return context;
};

export default RealTimeContext;