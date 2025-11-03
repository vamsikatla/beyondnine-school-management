import React, { useState } from 'react';
import { X, Save, User, GraduationCap, Users, Shield, Briefcase } from 'lucide-react';
import { Modal } from "../Modal";
import { Button } from '../Button';
import { Input } from '../Input';
import { Select, SelectItem } from '../Select';
import { Card } from '../Card';

interface UserFormData {
  name: string;
  email: string;
  phone: string;
  // Student specific
  class?: string;
  rollNumber?: string;
  parentName?: string;
  feeStatus?: 'Paid' | 'Pending' | 'Overdue';
  // Teacher specific
  subject?: string;
  qualification?: string;
  experience?: string;
  salary?: number;
  // Parent specific
  children?: string[];
  occupation?: string;
  // Common
  address?: string;
  dateOfBirth?: string;
  gender?: 'Male' | 'Female' | 'Other';
  bloodGroup?: string;
  emergencyContact?: string;
}

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (userData: UserFormData) => void;
  userType: 'student' | 'teacher' | 'parent' | 'school-admin' | 'staff';
  mode: 'create' | 'edit';
  initialData?: UserFormData;
}

export const UserFormModal: React.FC<UserFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  userType,
  mode,
  initialData
}) => {
  const [formData, setFormData] = useState<UserFormData>(
    initialData || {
      name: '',
      email: '',
      phone: '',
      address: '',
      dateOfBirth: '',
      gender: undefined,
      bloodGroup: '',
      emergencyContact: '',
      // Initialize type-specific fields
      ...(userType === 'student' && {
        class: '',
        rollNumber: '',
        parentName: '',
        feeStatus: 'Pending' as const
      }),
      ...(userType === 'teacher' && {
        subject: '',
        qualification: '',
        experience: '',
        salary: 0
      }),
      ...(userType === 'parent' && {
        children: [],
        occupation: ''
      })
    }
  );

  const [errors, setErrors] = useState<Partial<UserFormData>>({});

  const handleInputChange = (field: keyof UserFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<UserFormData> = {};

    // Required fields for all users
    if (!formData.name?.trim()) newErrors.name = 'Name is required';
    if (!formData.email?.trim()) newErrors.email = 'Email is required';
    if (!formData.phone?.trim()) newErrors.phone = 'Phone is required';

    // Email format validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Type-specific validations
    if (userType === 'student') {
      if (!formData.class?.trim()) newErrors.class = 'Class is required';
      if (!formData.rollNumber?.trim()) newErrors.rollNumber = 'Roll number is required';
      if (!formData.parentName?.trim()) newErrors.parentName = 'Parent name is required';
    }

    if (userType === 'teacher') {
      if (!formData.subject?.trim()) newErrors.subject = 'Subject is required';
      if (!formData.qualification?.trim()) newErrors.qualification = 'Qualification is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(formData);
      onClose();
    }
  };

  const getModalTitle = () => {
    const action = mode === 'create' ? 'Add' : 'Edit';
    const userTypeLabel = userType.charAt(0).toUpperCase() + userType.slice(1).replace('-', ' ');
    return `${action} ${userTypeLabel}`;
  };

  const getModalIcon = () => {
    switch (userType) {
      case 'student': return User;
      case 'teacher': return GraduationCap;
      case 'parent': return Users;
      case 'school-admin': return Shield;
      case 'staff': return Briefcase;
      default: return User;
    }
  };

  const ModalIcon = getModalIcon();

  const renderBasicFields = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <Input
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter full name"
            error={errors.name}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="Enter email address"
            error={errors.email}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone *
          </label>
          <Input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="Enter phone number"
            error={errors.phone}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <Select
            value={formData.gender || ''}
            onChange={(e) => handleInputChange('gender', e.target.value)}
          >
            <SelectItem value="">Select Gender</SelectItem>
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </Select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Address
        </label>
        <Input
          value={formData.address || ''}
          onChange={(e) => handleInputChange('address', e.target.value)}
          placeholder="Enter address"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth
          </label>
          <Input
            type="date"
            value={formData.dateOfBirth || ''}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Blood Group
          </label>
          <Select
            value={formData.bloodGroup || ''}
            onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
          >
            <SelectItem value="">Select Blood Group</SelectItem>
            <SelectItem value="A+">A+</SelectItem>
            <SelectItem value="A-">A-</SelectItem>
            <SelectItem value="B+">B+</SelectItem>
            <SelectItem value="B-">B-</SelectItem>
            <SelectItem value="AB+">AB+</SelectItem>
            <SelectItem value="AB-">AB-</SelectItem>
            <SelectItem value="O+">O+</SelectItem>
            <SelectItem value="O-">O-</SelectItem>
          </Select>
        </div>
      </div>
    </>
  );

  const renderStudentFields = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Class *
          </label>
          <Input
            value={formData.class || ''}
            onChange={(e) => handleInputChange('class', e.target.value)}
            placeholder="Enter class (e.g., 10th A)"
            error={errors.class}
          />
          {errors.class && <p className="text-red-500 text-xs mt-1">{errors.class}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Roll Number *
          </label>
          <Input
            value={formData.rollNumber || ''}
            onChange={(e) => handleInputChange('rollNumber', e.target.value)}
            placeholder="Enter roll number"
            error={errors.rollNumber}
          />
          {errors.rollNumber && <p className="text-red-500 text-xs mt-1">{errors.rollNumber}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Parent/Guardian Name *
          </label>
          <Input
            value={formData.parentName || ''}
            onChange={(e) => handleInputChange('parentName', e.target.value)}
            placeholder="Enter parent/guardian name"
            error={errors.parentName}
          />
          {errors.parentName && <p className="text-red-500 text-xs mt-1">{errors.parentName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fee Status
          </label>
          <Select
            value={formData.feeStatus || 'Pending'}
            onChange={(e) => handleInputChange('feeStatus', e.target.value)}
          >
            <SelectItem value="Paid">Paid</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Overdue">Overdue</SelectItem>
          </Select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Emergency Contact
        </label>
        <Input
          value={formData.emergencyContact || ''}
          onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
          placeholder="Enter emergency contact number"
        />
      </div>
    </>
  );

  const renderTeacherFields = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subject *
          </label>
          <Input
            value={formData.subject || ''}
            onChange={(e) => handleInputChange('subject', e.target.value)}
            placeholder="Enter subject"
            error={errors.subject}
          />
          {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Qualification *
          </label>
          <Input
            value={formData.qualification || ''}
            onChange={(e) => handleInputChange('qualification', e.target.value)}
            placeholder="Enter qualification"
            error={errors.qualification}
          />
          {errors.qualification && <p className="text-red-500 text-xs mt-1">{errors.qualification}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Experience
          </label>
          <Input
            value={formData.experience || ''}
            onChange={(e) => handleInputChange('experience', e.target.value)}
            placeholder="Enter experience (e.g., 5 years)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Salary
          </label>
          <Input
            type="number"
            value={formData.salary || ''}
            onChange={(e) => handleInputChange('salary', Number(e.target.value))}
            placeholder="Enter salary"
          />
        </div>
      </div>
    </>
  );

  const renderParentFields = () => (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Occupation
        </label>
        <Input
          value={formData.occupation || ''}
          onChange={(e) => handleInputChange('occupation', e.target.value)}
          placeholder="Enter occupation"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Emergency Contact
        </label>
        <Input
          value={formData.emergencyContact || ''}
          onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
          placeholder="Enter emergency contact number"
        />
      </div>
    </>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="flex items-center justify-between p-6 border-b">
        <div className="flex items-center space-x-2">
          <ModalIcon className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">{getModalTitle()}</h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="p-1 hover:bg-gray-100"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="p-6 max-h-96 overflow-y-auto">
        <div className="space-y-4">
          {renderBasicFields()}
          
          {userType === 'student' && renderStudentFields()}
          {userType === 'teacher' && renderTeacherFields()}
          {userType === 'parent' && renderParentFields()}
        </div>
      </div>

      <div className="flex justify-end space-x-3 p-6 border-t bg-gray-50">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSave} className="flex items-center space-x-2">
          <Save className="w-4 h-4" />
          <span>{mode === 'create' ? 'Add' : 'Update'} {userType.charAt(0).toUpperCase() + userType.slice(1)}</span>
        </Button>
      </div>
    </Modal>
  );
};

export default UserFormModal;