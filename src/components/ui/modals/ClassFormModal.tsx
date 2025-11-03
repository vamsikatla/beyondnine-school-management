import React, { useState, useEffect } from 'react';
import { Save, X, BookOpen, Users, Clock, Calendar, MapPin, User } from 'lucide-react';
import { Modal } from "../Modal";
import { Button } from '../Button';
import { Input } from '../Input';
import { Select, SelectItem } from '../Select';
import { Card } from '../Card';

interface ClassFormData {
  id?: string;
  name: string;
  code: string;
  subject: string;
  grade: string;
  section: string;
  teacherId: string;
  room: string;
  capacity: number;
  schedule: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
  semester: string;
  academicYear: string;
  description: string;
  credits: number;
  prerequisites: string[];
  status: 'active' | 'inactive' | 'completed';
}

interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  subject: string;
}

interface ClassFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (classData: ClassFormData) => Promise<void>;
  initialData?: Partial<ClassFormData>;
  mode: 'create' | 'edit';
  teachers: Teacher[];
}

const SUBJECTS = [
  'Mathematics', 'English', 'Science', 'History', 'Geography', 
  'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Art',
  'Music', 'Physical Education', 'Languages', 'Social Studies'
];

const GRADES = [
  'Kindergarten', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 
  'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 
  'Grade 10', 'Grade 11', 'Grade 12'
];

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const SEMESTERS = ['Fall', 'Spring', 'Summer'];

export const ClassFormModal: React.FC<ClassFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = {},
  mode,
  teachers
}) => {
  const [formData, setFormData] = useState<ClassFormData>({
    name: '',
    code: '',
    subject: '',
    grade: '',
    section: 'A',
    teacherId: '',
    room: '',
    capacity: 30,
    schedule: [{ day: 'Monday', startTime: '09:00', endTime: '10:00' }],
    semester: 'Fall',
    academicYear: new Date().getFullYear().toString(),
    description: '',
    credits: 1,
    prerequisites: [],
    status: 'active',
    ...initialData
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        code: '',
        subject: '',
        grade: '',
        section: 'A',
        teacherId: '',
        room: '',
        capacity: 30,
        schedule: [{ day: 'Monday', startTime: '09:00', endTime: '10:00' }],
        semester: 'Fall',
        academicYear: new Date().getFullYear().toString(),
        description: '',
        credits: 1,
        prerequisites: [],
        status: 'active',
        ...initialData
      });
      setErrors({});
    }
  }, [isOpen, initialData]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Class name is required';
    }

    if (!formData.code.trim()) {
      newErrors.code = 'Class code is required';
    }

    if (!formData.subject) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.grade) {
      newErrors.grade = 'Grade is required';
    }

    if (!formData.teacherId) {
      newErrors.teacherId = 'Teacher is required';
    }

    if (!formData.room.trim()) {
      newErrors.room = 'Room is required';
    }

    if (formData.capacity <= 0) {
      newErrors.capacity = 'Capacity must be greater than 0';
    }

    // Validate schedule
    formData.schedule.forEach((scheduleItem, index) => {
      if (!scheduleItem.day || !scheduleItem.startTime || !scheduleItem.endTime) {
        newErrors[`schedule_${index}`] = 'All schedule fields are required';
      }
      
      if (scheduleItem.startTime >= scheduleItem.endTime) {
        newErrors[`schedule_${index}`] = 'End time must be after start time';
      }
    });

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
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Failed to save class:', error);
      setErrors({ submit: 'Failed to save class. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (field: keyof ClassFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const addScheduleItem = () => {
    setFormData(prev => ({
      ...prev,
      schedule: [...prev.schedule, { day: 'Monday', startTime: '09:00', endTime: '10:00' }]
    }));
  };

  const removeScheduleItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      schedule: prev.schedule.filter((_, i) => i !== index)
    }));
  };

  const updateScheduleItem = (index: number, field: keyof typeof formData.schedule[0], value: string) => {
    setFormData(prev => ({
      ...prev,
      schedule: prev.schedule.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const getAvailableTeachers = () => {
    return teachers.filter(teacher => 
      !formData.subject || teacher.subject === formData.subject || teacher.subject === 'General'
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      title={mode === 'create' ? 'Create New Class' : 'Edit Class'}
      icon={<BookOpen className="w-6 h-6 text-blue-500" />}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <div className="text-red-800 text-sm">{errors.submit}</div>
          </div>
        )}

        {/* Basic Information */}
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Class Name *
              </label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => updateFormData('name', e.target.value)}
                placeholder="e.g., Advanced Mathematics"
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Class Code *
              </label>
              <Input
                type="text"
                value={formData.code}
                onChange={(e) => updateFormData('code', e.target.value.toUpperCase())}
                placeholder="e.g., MATH101"
                className={errors.code ? 'border-red-500' : ''}
              />
              {errors.code && (
                <p className="text-red-500 text-sm mt-1">{errors.code}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject *
              </label>
              <Select
                value={formData.subject}
                onChange={(e) => updateFormData('subject', e.target.value)}
                className={errors.subject ? 'border-red-500' : ''}
              >
                <SelectItem value="">Select Subject</SelectItem>
                {SUBJECTS.map(subject => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </Select>
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Grade *
              </label>
              <Select
                value={formData.grade}
                onChange={(e) => updateFormData('grade', e.target.value)}
                className={errors.grade ? 'border-red-500' : ''}
              >
                <SelectItem value="">Select Grade</SelectItem>
                {GRADES.map(grade => (
                  <SelectItem key={grade} value={grade}>
                    {grade}
                  </SelectItem>
                ))}
              </Select>
              {errors.grade && (
                <p className="text-red-500 text-sm mt-1">{errors.grade}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section
              </label>
              <Input
                type="text"
                value={formData.section}
                onChange={(e) => updateFormData('section', e.target.value.toUpperCase())}
                placeholder="A"
                maxLength={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Credits
              </label>
              <Input
                type="number"
                value={formData.credits}
                onChange={(e) => updateFormData('credits', parseInt(e.target.value) || 1)}
                min="1"
                max="10"
              />
            </div>
          </div>
        </Card>

        {/* Teacher and Logistics */}
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <User className="w-5 h-5" />
            Teacher & Logistics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teacher *
              </label>
              <Select
                value={formData.teacherId}
                onChange={(e) => updateFormData('teacherId', e.target.value)}
                className={errors.teacherId ? 'border-red-500' : ''}
              >
                <SelectItem value="">Select Teacher</SelectItem>
                {getAvailableTeachers().map(teacher => (
                  <SelectItem key={teacher.id} value={teacher.id}>
                    {teacher.firstName} {teacher.lastName} - {teacher.subject}
                  </SelectItem>
                ))}
              </Select>
              {errors.teacherId && (
                <p className="text-red-500 text-sm mt-1">{errors.teacherId}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Room *
              </label>
              <Input
                type="text"
                value={formData.room}
                onChange={(e) => updateFormData('room', e.target.value)}
                placeholder="e.g., Room 101"
                className={errors.room ? 'border-red-500' : ''}
              />
              {errors.room && (
                <p className="text-red-500 text-sm mt-1">{errors.room}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Capacity
              </label>
              <Input
                type="number"
                value={formData.capacity}
                onChange={(e) => updateFormData('capacity', parseInt(e.target.value) || 0)}
                min="1"
                max="100"
                className={errors.capacity ? 'border-red-500' : ''}
              />
              {errors.capacity && (
                <p className="text-red-500 text-sm mt-1">{errors.capacity}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <Select
                value={formData.status}
                onChange={(e) => updateFormData('status', e.target.value as any)}
              >
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </Select>
            </div>
          </div>
        </Card>

        {/* Schedule */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Class Schedule
            </h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addScheduleItem}
            >
              Add Time Slot
            </Button>
          </div>
          
          <div className="space-y-3">
            {formData.schedule.map((scheduleItem, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-1 grid grid-cols-3 gap-3">
                  <Select
                    value={scheduleItem.day}
                    onChange={(e) => updateScheduleItem(index, 'day', e.target.value)}
                  >
                    {DAYS.map(day => (
                      <SelectItem key={day} value={day}>
                        {day}
                      </SelectItem>
                    ))}
                  </Select>
                  
                  <Input
                    type="time"
                    value={scheduleItem.startTime}
                    onChange={(e) => updateScheduleItem(index, 'startTime', e.target.value)}
                  />
                  
                  <Input
                    type="time"
                    value={scheduleItem.endTime}
                    onChange={(e) => updateScheduleItem(index, 'endTime', e.target.value)}
                  />
                </div>
                
                {formData.schedule.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeScheduleItem(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Academic Details */}
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Academic Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Semester
              </label>
              <Select
                value={formData.semester}
                onChange={(e) => updateFormData('semester', e.target.value)}
              >
                {SEMESTERS.map(semester => (
                  <SelectItem key={semester} value={semester}>
                    {semester}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Academic Year
              </label>
              <Input
                type="text"
                value={formData.academicYear}
                onChange={(e) => updateFormData('academicYear', e.target.value)}
                placeholder="2024"
                pattern="[0-9]{4}"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => updateFormData('description', e.target.value)}
              placeholder="Class description and learning objectives..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>
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
                {mode === 'create' ? 'Create Class' : 'Update Class'}
              </>
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};