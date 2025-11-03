import React, { useState, useEffect } from 'react';
import { Save, X, Calendar, Clock, MapPin, Users, Bell, Star, Tag, AlertCircle, CheckCircle } from 'lucide-react';
import { Modal } from "../Modal";
import { Button } from '../Button';
import { Input } from '../Input';
import { Select, SelectItem } from '../Select';
import { Card } from '../Card';
import { Badge } from '../Badge';

interface EventData {
  id?: string;
  title: string;
  description: string;
  eventType: 'academic' | 'sports' | 'cultural' | 'meeting' | 'exam' | 'holiday' | 'other';
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  capacity?: number;
  organizer: string;
  organizerContact: string;
  participants: {
    targetAudience: 'all_students' | 'specific_grades' | 'specific_classes' | 'teachers' | 'parents' | 'custom';
    specificGrades?: string[];
    specificClasses?: string[];
    customParticipants?: string[];
  };
  notifications: {
    enableNotifications: boolean;
    notificationTiming: number; // hours before event
    notificationMethods: ('email' | 'sms' | 'app')[];
  };
  status: 'draft' | 'published' | 'cancelled' | 'completed';
  priority: 'low' | 'medium' | 'high';
  recurrence?: {
    isRecurring: boolean;
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    interval: number;
    endDate?: string;
  };
  attachments?: string[];
  requirements?: string[];
  tags?: string[];
  isPublic: boolean;
  registrationRequired: boolean;
  registrationDeadline?: string;
  maxParticipants?: number;
  fee?: number;
}

interface EventManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'edit' | 'duplicate';
  onSubmit: (eventData: EventData) => Promise<void>;
  initialData?: Partial<EventData>;
  classes?: any[];
  teachers?: any[];
  students?: any[];
}

const EVENT_TYPES = [
  { value: 'academic', label: 'Academic', icon: '📚', color: 'blue' },
  { value: 'sports', label: 'Sports', icon: '⚽', color: 'green' },
  { value: 'cultural', label: 'Cultural', icon: '🎭', color: 'purple' },
  { value: 'meeting', label: 'Meeting', icon: '🤝', color: 'orange' },
  { value: 'exam', label: 'Examination', icon: '📝', color: 'red' },
  { value: 'holiday', label: 'Holiday', icon: '🏖️', color: 'yellow' },
  { value: 'other', label: 'Other', icon: '📅', color: 'gray' }
];

const GRADES = [
  'Kindergarten', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5',
  'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'
];

const NOTIFICATION_TIMINGS = [
  { value: 1, label: '1 hour before' },
  { value: 2, label: '2 hours before' },
  { value: 6, label: '6 hours before' },
  { value: 24, label: '1 day before' },
  { value: 48, label: '2 days before' },
  { value: 168, label: '1 week before' }
];

export const EventManagementModal: React.FC<EventManagementModalProps> = ({
  isOpen,
  onClose,
  mode,
  onSubmit,
  initialData = {},
  classes = [],
  teachers = [],
  students = []
}) => {
  const [eventData, setEventData] = useState<EventData>({
    title: '',
    description: '',
    eventType: 'academic',
    date: '',
    startTime: '',
    endTime: '',
    venue: '',
    capacity: undefined,
    organizer: '',
    organizerContact: '',
    participants: {
      targetAudience: 'all_students',
      specificGrades: [],
      specificClasses: [],
      customParticipants: []
    },
    notifications: {
      enableNotifications: true,
      notificationTiming: 24,
      notificationMethods: ['email']
    },
    status: 'draft',
    priority: 'medium',
    recurrence: {
      isRecurring: false,
      frequency: 'weekly',
      interval: 1
    },
    attachments: [],
    requirements: [],
    tags: [],
    isPublic: true,
    registrationRequired: false,
    ...initialData
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'participants' | 'notifications' | 'advanced'>('basic');
  const [newTag, setNewTag] = useState('');
  const [newRequirement, setNewRequirement] = useState('');

  useEffect(() => {
    if (isOpen) {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      setEventData({
        title: '',
        description: '',
        eventType: 'academic',
        date: tomorrow.toISOString().split('T')[0],
        startTime: '09:00',
        endTime: '10:00',
        venue: '',
        capacity: undefined,
        organizer: '',
        organizerContact: '',
        participants: {
          targetAudience: 'all_students',
          specificGrades: [],
          specificClasses: [],
          customParticipants: []
        },
        notifications: {
          enableNotifications: true,
          notificationTiming: 24,
          notificationMethods: ['email']
        },
        status: 'draft',
        priority: 'medium',
        recurrence: {
          isRecurring: false,
          frequency: 'weekly',
          interval: 1
        },
        attachments: [],
        requirements: [],
        tags: [],
        isPublic: true,
        registrationRequired: false,
        ...initialData
      });
      setErrors({});
      setActiveTab('basic');
      setNewTag('');
      setNewRequirement('');
    }
  }, [isOpen, initialData]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!eventData.title.trim()) {
      newErrors.title = 'Event title is required';
    }

    if (!eventData.date) {
      newErrors.date = 'Event date is required';
    }

    if (!eventData.startTime) {
      newErrors.startTime = 'Start time is required';
    }

    if (!eventData.endTime) {
      newErrors.endTime = 'End time is required';
    }

    if (eventData.startTime && eventData.endTime && eventData.startTime >= eventData.endTime) {
      newErrors.endTime = 'End time must be after start time';
    }

    if (!eventData.venue.trim()) {
      newErrors.venue = 'Venue is required';
    }

    if (!eventData.organizer.trim()) {
      newErrors.organizer = 'Organizer name is required';
    }

    if (eventData.registrationRequired && eventData.registrationDeadline) {
      const eventDate = new Date(eventData.date);
      const registrationDate = new Date(eventData.registrationDeadline);
      if (registrationDate >= eventDate) {
        newErrors.registrationDeadline = 'Registration deadline must be before event date';
      }
    }

    if (eventData.capacity && eventData.capacity <= 0) {
      newErrors.capacity = 'Capacity must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const finalEventData = {
        ...eventData,
        id: mode === 'create' ? `event-${Date.now()}` : eventData.id
      };
      await onSubmit(finalEventData);
      onClose();
    } catch (error) {
      console.error('Failed to save event:', error);
      setErrors({ submit: 'Failed to save event. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateEventData = (field: keyof EventData, value: any) => {
    setEventData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const updateNestedData = (section: 'participants' | 'notifications' | 'recurrence', field: string, value: any) => {
    setEventData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !eventData.tags?.includes(newTag.trim())) {
      setEventData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setEventData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
    }));
  };

  const addRequirement = () => {
    if (newRequirement.trim() && !eventData.requirements?.includes(newRequirement.trim())) {
      setEventData(prev => ({
        ...prev,
        requirements: [...(prev.requirements || []), newRequirement.trim()]
      }));
      setNewRequirement('');
    }
  };

  const removeRequirement = (reqToRemove: string) => {
    setEventData(prev => ({
      ...prev,
      requirements: prev.requirements?.filter(req => req !== reqToRemove) || []
    }));
  };

  const getModalTitle = () => {
    switch (mode) {
      case 'create': return 'Create New Event';
      case 'edit': return 'Edit Event';
      case 'duplicate': return 'Duplicate Event';
      default: return 'Event Management';
    }
  };

  const renderBasicTab = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event Title *
          </label>
          <Input
            type="text"
            value={eventData.title}
            onChange={(e) => updateEventData('title', e.target.value)}
            placeholder="Enter event title"
            className={errors.title ? 'border-red-500' : ''}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event Type *
          </label>
          <Select
            value={eventData.eventType}
            onChange={(e) => updateEventData('eventType', e.target.value as any)}
          >
            {EVENT_TYPES.map(type => (
              <SelectItem key={type.value} value={type.value}>
                {type.icon} {type.label}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <Select
            value={eventData.priority}
            onChange={(e) => updateEventData('priority', e.target.value as any)}
          >
            <SelectItem value="low">🔵 Low</SelectItem>
            <SelectItem value="medium">🟡 Medium</SelectItem>
            <SelectItem value="high">🔴 High</SelectItem>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date *
          </label>
          <Input
            type="date"
            value={eventData.date}
            onChange={(e) => updateEventData('date', e.target.value)}
            className={errors.date ? 'border-red-500' : ''}
          />
          {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Time *
          </label>
          <Input
            type="time"
            value={eventData.startTime}
            onChange={(e) => updateEventData('startTime', e.target.value)}
            className={errors.startTime ? 'border-red-500' : ''}
          />
          {errors.startTime && <p className="text-red-500 text-sm mt-1">{errors.startTime}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Time *
          </label>
          <Input
            type="time"
            value={eventData.endTime}
            onChange={(e) => updateEventData('endTime', e.target.value)}
            className={errors.endTime ? 'border-red-500' : ''}
          />
          {errors.endTime && <p className="text-red-500 text-sm mt-1">{errors.endTime}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Venue *
          </label>
          <Input
            type="text"
            value={eventData.venue}
            onChange={(e) => updateEventData('venue', e.target.value)}
            placeholder="Enter venue location"
            className={errors.venue ? 'border-red-500' : ''}
          />
          {errors.venue && <p className="text-red-500 text-sm mt-1">{errors.venue}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Capacity
          </label>
          <Input
            type="number"
            value={eventData.capacity || ''}
            onChange={(e) => updateEventData('capacity', parseInt(e.target.value) || undefined)}
            placeholder="Maximum participants"
            min="1"
            className={errors.capacity ? 'border-red-500' : ''}
          />
          {errors.capacity && <p className="text-red-500 text-sm mt-1">{errors.capacity}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Organizer *
          </label>
          <Input
            type="text"
            value={eventData.organizer}
            onChange={(e) => updateEventData('organizer', e.target.value)}
            placeholder="Organizer name"
            className={errors.organizer ? 'border-red-500' : ''}
          />
          {errors.organizer && <p className="text-red-500 text-sm mt-1">{errors.organizer}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Organizer Contact
          </label>
          <Input
            type="text"
            value={eventData.organizerContact}
            onChange={(e) => updateEventData('organizerContact', e.target.value)}
            placeholder="Phone/Email"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={eventData.description}
            onChange={(e) => updateEventData('description', e.target.value)}
            placeholder="Enter event description..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
        </div>
      </div>
    </div>
  );

  const renderParticipantsTab = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Target Audience
        </label>
        <Select
          value={eventData.participants.targetAudience}
          onChange={(e) => updateNestedData('participants', 'targetAudience', e.target.value)}
        >
          <SelectItem value="all_students">All Students</SelectItem>
          <SelectItem value="specific_grades">Specific Grades</SelectItem>
          <SelectItem value="specific_classes">Specific Classes</SelectItem>
          <SelectItem value="teachers">Teachers</SelectItem>
          <SelectItem value="parents">Parents</SelectItem>
          <SelectItem value="custom">Custom Selection</SelectItem>
        </Select>
      </div>

      {eventData.participants.targetAudience === 'specific_grades' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Grades
          </label>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
            {GRADES.map(grade => (
              <label key={grade} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={eventData.participants.specificGrades?.includes(grade) || false}
                  onChange={(e) => {
                    const currentGrades = eventData.participants.specificGrades || [];
                    if (e.target.checked) {
                      updateNestedData('participants', 'specificGrades', [...currentGrades, grade]);
                    } else {
                      updateNestedData('participants', 'specificGrades', currentGrades.filter(g => g !== grade));
                    }
                  }}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm">{grade}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {eventData.participants.targetAudience === 'specific_classes' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Classes
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {classes.map(cls => (
              <label key={cls.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={eventData.participants.specificClasses?.includes(cls.id) || false}
                  onChange={(e) => {
                    const currentClasses = eventData.participants.specificClasses || [];
                    if (e.target.checked) {
                      updateNestedData('participants', 'specificClasses', [...currentClasses, cls.id]);
                    } else {
                      updateNestedData('participants', 'specificClasses', currentClasses.filter(c => c !== cls.id));
                    }
                  }}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm">{cls.name} - {cls.grade}{cls.section}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="registrationRequired"
            checked={eventData.registrationRequired}
            onChange={(e) => updateEventData('registrationRequired', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="registrationRequired" className="ml-2 text-sm font-medium text-gray-700">
            Registration Required
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="isPublic"
            checked={eventData.isPublic}
            onChange={(e) => updateEventData('isPublic', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="isPublic" className="ml-2 text-sm font-medium text-gray-700">
            Public Event
          </label>
        </div>
      </div>

      {eventData.registrationRequired && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Registration Deadline
            </label>
            <Input
              type="date"
              value={eventData.registrationDeadline || ''}
              onChange={(e) => updateEventData('registrationDeadline', e.target.value)}
              className={errors.registrationDeadline ? 'border-red-500' : ''}
            />
            {errors.registrationDeadline && <p className="text-red-500 text-sm mt-1">{errors.registrationDeadline}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Maximum Participants
            </label>
            <Input
              type="number"
              value={eventData.maxParticipants || ''}
              onChange={(e) => updateEventData('maxParticipants', parseInt(e.target.value) || undefined)}
              placeholder="Leave empty for no limit"
              min="1"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Registration Fee (₹)
            </label>
            <Input
              type="number"
              value={eventData.fee || ''}
              onChange={(e) => updateEventData('fee', parseFloat(e.target.value) || undefined)}
              placeholder="0"
              min="0"
              step="0.01"
            />
          </div>
        </div>
      )}
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-4">
      <div className="flex items-center">
        <input
          type="checkbox"
          id="enableNotifications"
          checked={eventData.notifications.enableNotifications}
          onChange={(e) => updateNestedData('notifications', 'enableNotifications', e.target.checked)}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="enableNotifications" className="ml-2 text-sm font-medium text-gray-700">
          Enable Event Notifications
        </label>
      </div>

      {eventData.notifications.enableNotifications && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Send Notification
            </label>
            <Select
              value={eventData.notifications.notificationTiming.toString()}
              onChange={(e) => updateNestedData('notifications', 'notificationTiming', parseInt(e.target.value))}
            >
              {NOTIFICATION_TIMINGS.map(timing => (
                <SelectItem key={timing.value} value={timing.value.toString()}>
                  {timing.label}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notification Methods
            </label>
            <div className="space-y-2">
              {[
                { value: 'email', label: 'Email' },
                { value: 'sms', label: 'SMS' },
                { value: 'app', label: 'App Notification' }
              ].map(method => (
                <label key={method.value} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={eventData.notifications.notificationMethods.includes(method.value as any)}
                    onChange={(e) => {
                      const currentMethods = eventData.notifications.notificationMethods;
                      if (e.target.checked) {
                        updateNestedData('notifications', 'notificationMethods', [...currentMethods, method.value]);
                      } else {
                        updateNestedData('notifications', 'notificationMethods', currentMethods.filter(m => m !== method.value));
                      }
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">{method.label}</span>
                </label>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="flex items-center">
        <input
          type="checkbox"
          id="isRecurring"
          checked={eventData.recurrence?.isRecurring || false}
          onChange={(e) => updateNestedData('recurrence', 'isRecurring', e.target.checked)}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="isRecurring" className="ml-2 text-sm font-medium text-gray-700">
          Recurring Event
        </label>
      </div>

      {eventData.recurrence?.isRecurring && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Frequency
            </label>
            <Select
              value={eventData.recurrence.frequency}
              onChange={(e) => updateNestedData('recurrence', 'frequency', e.target.value)}
            >
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Every
            </label>
            <Input
              type="number"
              value={eventData.recurrence.interval}
              onChange={(e) => updateNestedData('recurrence', 'interval', parseInt(e.target.value) || 1)}
              min="1"
              placeholder="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <Input
              type="date"
              value={eventData.recurrence.endDate || ''}
              onChange={(e) => updateNestedData('recurrence', 'endDate', e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );

  const renderAdvancedTab = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <Select
          value={eventData.status}
          onChange={(e) => updateEventData('status', e.target.value as any)}
        >
          <SelectItem value="draft">Draft</SelectItem>
          <SelectItem value="published">Published</SelectItem>
          <SelectItem value="cancelled">Cancelled</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tags
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {eventData.tags?.map((tag, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-1 text-gray-500 hover:text-gray-700"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add tag"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
          />
          <Button type="button" variant="outline" size="sm" onClick={addTag}>
            Add
          </Button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Requirements/What to bring
        </label>
        <div className="space-y-2 mb-2">
          {eventData.requirements?.map((req, index) => (
            <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
              <span className="flex-1 text-sm">{req}</span>
              <button
                type="button"
                onClick={() => removeRequirement(req)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            type="text"
            value={newRequirement}
            onChange={(e) => setNewRequirement(e.target.value)}
            placeholder="Add requirement"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
          />
          <Button type="button" variant="outline" size="sm" onClick={addRequirement}>
            Add
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      title={getModalTitle()}
      icon={<Calendar className="w-6 h-6 text-purple-500" />}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <div className="text-red-800 text-sm">{errors.submit}</div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {[
            { id: 'basic', label: 'Basic Info', icon: Calendar },
            { id: 'participants', label: 'Participants', icon: Users },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'advanced', label: 'Advanced', icon: Star }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <Card className="p-4">
          {activeTab === 'basic' && renderBasicTab()}
          {activeTab === 'participants' && renderParticipantsTab()}
          {activeTab === 'notifications' && renderNotificationsTab()}
          {activeTab === 'advanced' && renderAdvancedTab()}
        </Card>

        {/* Form Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                {mode === 'create' ? 'Create Event' : mode === 'duplicate' ? 'Duplicate Event' : 'Update Event'}
              </>
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};