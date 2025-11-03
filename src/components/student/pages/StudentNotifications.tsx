"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Bell,
  Search,
  Filter,
  MoreVertical,
  Calendar,
  BookOpen,
  CreditCard,
  Users,
  AlertTriangle,
  CheckCircle,
  Info,
  Clock,
  Trash2,
  Archive,
  Star,
  StarOff
} from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'assignment' | 'exam' | 'fee' | 'announcement' | 'grade' | 'attendance' | 'event';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  isRead: boolean;
  isStarred: boolean;
  timestamp: string;
  actionRequired?: boolean;
  actionUrl?: string;
  sender?: string;
  category: string;
}

const StudentNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);

  // Mock notifications data
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: '1',
        title: 'Assignment Due Tomorrow',
        message: 'Your Mathematics assignment "Calculus Problems Set 3" is due tomorrow at 11:59 PM. Make sure to submit it on time.',
        type: 'assignment',
        priority: 'high',
        isRead: false,
        isStarred: true,
        timestamp: '2024-01-15T10:30:00Z',
        actionRequired: true,
        actionUrl: '/student/assignments',
        sender: 'Dr. Sarah Johnson',
        category: 'Academic'
      },
      {
        id: '2',
        title: 'Exam Schedule Released',
        message: 'The mid-term examination schedule has been released. Physics exam is scheduled for January 20th at 9:00 AM.',
        type: 'exam',
        priority: 'medium',
        isRead: false,
        isStarred: false,
        timestamp: '2024-01-14T14:15:00Z',
        actionRequired: true,
        actionUrl: '/student/exams',
        sender: 'Academic Office',
        category: 'Academic'
      },
      {
        id: '3',
        title: 'Fee Payment Reminder',
        message: 'Your semester fee payment of $2,500 is due by January 25th. Please make the payment to avoid late fees.',
        type: 'fee',
        priority: 'urgent',
        isRead: false,
        isStarred: false,
        timestamp: '2024-01-14T09:00:00Z',
        actionRequired: true,
        actionUrl: '/student/fees',
        sender: 'Finance Department',
        category: 'Financial'
      },
      {
        id: '4',
        title: 'Grade Published',
        message: 'Your grade for Chemistry Lab Report has been published. You scored 92/100. Great work!',
        type: 'grade',
        priority: 'low',
        isRead: true,
        isStarred: true,
        timestamp: '2024-01-13T16:45:00Z',
        actionRequired: false,
        sender: 'Prof. Michael Chen',
        category: 'Academic'
      },
      {
        id: '5',
        title: 'Attendance Alert',
        message: 'Your attendance in English Literature is below 75%. Please ensure regular attendance to meet requirements.',
        type: 'attendance',
        priority: 'high',
        isRead: true,
        isStarred: false,
        timestamp: '2024-01-12T11:20:00Z',
        actionRequired: true,
        actionUrl: '/student/attendance',
        sender: 'Ms. Emily Davis',
        category: 'Academic'
      },
      {
        id: '6',
        title: 'School Event: Science Fair',
        message: 'Annual Science Fair is scheduled for February 15th. Registration is now open for project submissions.',
        type: 'event',
        priority: 'medium',
        isRead: true,
        isStarred: false,
        timestamp: '2024-01-10T13:30:00Z',
        actionRequired: false,
        sender: 'Student Activities',
        category: 'Events'
      },
      {
        id: '7',
        title: 'Library Book Due',
        message: 'The book "Advanced Physics Concepts" borrowed on December 20th is due for return by January 20th.',
        type: 'announcement',
        priority: 'low',
        isRead: true,
        isStarred: false,
        timestamp: '2024-01-09T08:15:00Z',
        actionRequired: true,
        actionUrl: '/student/library',
        sender: 'Library Services',
        category: 'Library'
      }
    ];

    setNotifications(mockNotifications);
    setFilteredNotifications(mockNotifications);
  }, []);

  // Filter notifications
  useEffect(() => {
    let filtered = notifications;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(notification =>
        notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.sender?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(notification => notification.type === filterType);
    }

    // Priority filter
    if (filterPriority !== 'all') {
      filtered = filtered.filter(notification => notification.priority === filterPriority);
    }

    // Unread filter
    if (showUnreadOnly) {
      filtered = filtered.filter(notification => !notification.isRead);
    }

    setFilteredNotifications(filtered);
  }, [notifications, searchTerm, filterType, filterPriority, showUnreadOnly]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'assignment':
        return <BookOpen className="h-5 w-5" />;
      case 'exam':
        return <Calendar className="h-5 w-5" />;
      case 'fee':
        return <CreditCard className="h-5 w-5" />;
      case 'grade':
        return <CheckCircle className="h-5 w-5" />;
      case 'attendance':
        return <Users className="h-5 w-5" />;
      case 'event':
        return <Calendar className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const toggleStar = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, isStarred: !notification.isStarred }
          : notification
      )
    );
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== notificationId));
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600 mt-1">
            Stay updated with your academic activities and important announcements
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="px-3 py-1">
            {unreadCount} Unread
          </Badge>
          <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
            Mark All Read
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="assignment">Assignments</SelectItem>
                  <SelectItem value="exam">Exams</SelectItem>
                  <SelectItem value="fee">Fees</SelectItem>
                  <SelectItem value="grade">Grades</SelectItem>
                  <SelectItem value="attendance">Attendance</SelectItem>
                  <SelectItem value="event">Events</SelectItem>
                  <SelectItem value="announcement">Announcements</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Priorities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant={showUnreadOnly ? "default" : "outline"}
                onClick={() => setShowUnreadOnly(!showUnreadOnly)}
                className="whitespace-nowrap"
              >
                <Filter className="h-4 w-4 mr-2" />
                Unread Only
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
              <p className="text-gray-500">
                {searchTerm || filterType !== 'all' || filterPriority !== 'all' || showUnreadOnly
                  ? 'Try adjusting your filters to see more notifications.'
                  : 'You\'re all caught up! No new notifications at the moment.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={`transition-all hover:shadow-md ${
                !notification.isRead ? 'border-l-4 border-l-blue-500 bg-blue-50/30' : ''
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`p-2 rounded-full ${
                    notification.type === 'assignment' ? 'bg-blue-100 text-blue-600' :
                    notification.type === 'exam' ? 'bg-purple-100 text-purple-600' :
                    notification.type === 'fee' ? 'bg-red-100 text-red-600' :
                    notification.type === 'grade' ? 'bg-green-100 text-green-600' :
                    notification.type === 'attendance' ? 'bg-orange-100 text-orange-600' :
                    notification.type === 'event' ? 'bg-indigo-100 text-indigo-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className={`font-medium ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                          {notification.title}
                        </h3>
                        <Badge
                          variant="outline"
                          className={`text-xs ${getPriorityColor(notification.priority)}`}
                        >
                          {notification.priority.toUpperCase()}
                        </Badge>
                        {notification.actionRequired && (
                          <Badge variant="destructive" className="text-xs">
                            Action Required
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleStar(notification.id)}
                          className="h-8 w-8 p-0"
                        >
                          {notification.isStarred ? (
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          ) : (
                            <StarOff className="h-4 w-4 text-gray-400" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <p className={`text-sm mb-3 ${!notification.isRead ? 'text-gray-800' : 'text-gray-600'}`}>
                      {notification.message}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatTimestamp(notification.timestamp)}
                        </span>
                        {notification.sender && (
                          <span>From: {notification.sender}</span>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {notification.category}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2">
                        {!notification.isRead && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="text-xs"
                          >
                            Mark as Read
                          </Button>
                        )}
                        {notification.actionRequired && notification.actionUrl && (
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => {
                              markAsRead(notification.id);
                              // Navigate to action URL
                              window.location.href = notification.actionUrl!;
                            }}
                            className="text-xs"
                          >
                            Take Action
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Load More */}
      {filteredNotifications.length > 0 && (
        <div className="text-center">
          <Button variant="outline" className="w-full md:w-auto">
            Load More Notifications
          </Button>
        </div>
      )}
    </div>
  );
};

export default StudentNotifications;