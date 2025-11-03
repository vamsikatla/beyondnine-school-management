"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, User, Mail, Phone, Calendar, MapPin, GraduationCap,
  Edit, Save, Camera, Award, BookOpen, Clock, Settings, Eye, EyeOff,
  Shield, Bell, Palette, Globe, Upload, School, Users
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

const studentProfile = {
  personal: {
    firstName: "Aarav",
    lastName: "Sharma",
    fullName: "Aarav Sharma",
    email: "aarav.sharma@student.school.edu",
    phone: "+91 98765 43210",
    dateOfBirth: "2005-08-15",
    gender: "Male",
    bloodGroup: "B+",
    nationality: "Indian",
    avatar: "👨‍🎓"
  },
  academic: {
    studentId: "STU2024001",
    grade: "Grade 12",
    section: "A",
    rollNumber: "12A001",
    academicYear: "2023-2024",
    admissionDate: "2021-04-15",
    currentGPA: 3.8,
    overallPercentage: 87.5,
    rank: 5,
    totalStudents: 45
  },
  contact: {
    address: {
      street: "123 Student Colony",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      country: "India"
    },
    emergencyContact: {
      name: "Rajesh Sharma",
      relation: "Father",
      phone: "+91 98765 43211",
      email: "rajesh.sharma@email.com"
    }
  },
  preferences: {
    language: "English",
    timezone: "Asia/Kolkata",
    theme: "light",
    notifications: {
      email: true,
      sms: false,
      push: true,
      assignments: true,
      grades: true,
      announcements: true
    },
    privacy: {
      profileVisibility: "friends",
      showGrades: false,
      showContactInfo: false
    }
  },
  achievements: [
    { title: "Academic Excellence Award", year: "2023", category: "Academic" },
    { title: "Science Fair Winner", year: "2023", category: "Competition" },
    { title: "Perfect Attendance", year: "2022", category: "Attendance" }
  ],
  subjects: [
    "Advanced Mathematics",
    "Physics", 
    "Chemistry",
    "Biology",
    "English Literature"
  ]
};

const ProfilePage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState('personal');
  const [isEditing, setIsEditing] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState(studentProfile);

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'academic', label: 'Academic', icon: GraduationCap },
    { id: 'contact', label: 'Contact & Emergency', icon: Phone },
    { id: 'preferences', label: 'Preferences', icon: Settings }
  ];

  const handleSave = () => {
    // In a real app, this would save to the database
    console.log('Saving profile:', formData);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleNestedInputChange = (section, subsection, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...prev[section][subsection],
          [field]: value
        }
      }
    }));
  };

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Header */}
      <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => router.push('/student/dashboard')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white">
                  My Profile
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Manage your personal information and settings
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button variant="gradient" onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button variant="gradient" onClick={() => setIsEditing(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardContent className="p-6 text-center">
                <div className="relative mb-4">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-3xl mx-auto">
                    {formData.personal.avatar}
                  </div>
                  {isEditing && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                  {formData.personal.fullName}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
                  {formData.academic.grade} - {formData.academic.section}
                </p>
                <p className="text-slate-500 dark:text-slate-500 text-xs mb-4">
                  {formData.academic.studentId}
                </p>
                
                <div className="flex flex-wrap gap-1 justify-center mb-4">
                  <Badge variant="primary" className="text-xs">
                    Rank #{formData.academic.rank}
                  </Badge>
                  <Badge variant="success" className="text-xs">
                    GPA {formData.academic.currentGPA}
                  </Badge>
                </div>

                {/* Quick Stats */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Age</span>
                    <span>{calculateAge(formData.personal.dateOfBirth)} years</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Grade</span>
                    <span>{formData.academic.grade}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Percentage</span>
                    <span>{formData.academic.overallPercentage}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center">
                  <Award className="h-4 w-4 mr-2" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                {formData.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Award className="h-4 w-4 text-yellow-500" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{achievement.title}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        {achievement.year} • {achievement.category}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tab Navigation */}
            <div className="flex space-x-1 mb-6 p-1 bg-white/50 dark:bg-slate-800/50 rounded-lg overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap flex-1 justify-center",
                    activeTab === tab.id
                      ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50"
                  )}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Personal Info Tab */}
            {activeTab === 'personal' && (
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        First Name
                      </label>
                      <Input
                        value={formData.personal.firstName}
                        onChange={(e) => handleInputChange('personal', 'firstName', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Last Name
                      </label>
                      <Input
                        value={formData.personal.lastName}
                        onChange={(e) => handleInputChange('personal', 'lastName', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        value={formData.personal.email}
                        onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        value={formData.personal.phone}
                        onChange={(e) => handleInputChange('personal', 'phone', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Date of Birth
                      </label>
                      <Input
                        type="date"
                        value={formData.personal.dateOfBirth}
                        onChange={(e) => handleInputChange('personal', 'dateOfBirth', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Gender
                      </label>
                      <Select
                        value={formData.personal.gender}
                        onChange={(e) => handleInputChange('personal', 'gender', e.target.value)}
                        disabled={!isEditing}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Blood Group
                      </label>
                      <Input
                        value={formData.personal.bloodGroup}
                        onChange={(e) => handleInputChange('personal', 'bloodGroup', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Nationality
                    </label>
                    <Input
                      value={formData.personal.nationality}
                      onChange={(e) => handleInputChange('personal', 'nationality', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Academic Tab */}
            {activeTab === 'academic' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Academic Information</CardTitle>
                    <CardDescription>Your academic details and performance</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Student ID
                        </label>
                        <Input
                          value={formData.academic.studentId}
                          disabled
                          className="bg-slate-100 dark:bg-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Roll Number
                        </label>
                        <Input
                          value={formData.academic.rollNumber}
                          disabled
                          className="bg-slate-100 dark:bg-slate-800"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Grade
                        </label>
                        <Input
                          value={formData.academic.grade}
                          disabled
                          className="bg-slate-100 dark:bg-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Section
                        </label>
                        <Input
                          value={formData.academic.section}
                          disabled
                          className="bg-slate-100 dark:bg-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Academic Year
                        </label>
                        <Input
                          value={formData.academic.academicYear}
                          disabled
                          className="bg-slate-100 dark:bg-slate-800"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Subjects
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {formData.subjects.map((subject, index) => (
                          <Badge key={index} variant="secondary">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Academic Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <p className="text-sm text-slate-600 dark:text-slate-400">Current GPA</p>
                        <p className="text-2xl font-bold text-green-600">{formData.academic.currentGPA}</p>
                      </div>
                      <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <p className="text-sm text-slate-600 dark:text-slate-400">Percentage</p>
                        <p className="text-2xl font-bold text-blue-600">{formData.academic.overallPercentage}%</p>
                      </div>
                      <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <p className="text-sm text-slate-600 dark:text-slate-400">Class Rank</p>
                        <p className="text-2xl font-bold text-purple-600">#{formData.academic.rank}</p>
                      </div>
                      <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <p className="text-sm text-slate-600 dark:text-slate-400">Total Students</p>
                        <p className="text-2xl font-bold text-slate-600">{formData.academic.totalStudents}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Contact Tab */}
            {activeTab === 'contact' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Address Information</CardTitle>
                    <CardDescription>Your residential address</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Street Address
                      </label>
                      <Input
                        value={formData.contact.address.street}
                        onChange={(e) => handleNestedInputChange('contact', 'address', 'street', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          City
                        </label>
                        <Input
                          value={formData.contact.address.city}
                          onChange={(e) => handleNestedInputChange('contact', 'address', 'city', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          State
                        </label>
                        <Input
                          value={formData.contact.address.state}
                          onChange={(e) => handleNestedInputChange('contact', 'address', 'state', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Pincode
                        </label>
                        <Input
                          value={formData.contact.address.pincode}
                          onChange={(e) => handleNestedInputChange('contact', 'address', 'pincode', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Country
                        </label>
                        <Input
                          value={formData.contact.address.country}
                          onChange={(e) => handleNestedInputChange('contact', 'address', 'country', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Emergency Contact</CardTitle>
                    <CardDescription>Primary emergency contact information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Contact Name
                        </label>
                        <Input
                          value={formData.contact.emergencyContact.name}
                          onChange={(e) => handleNestedInputChange('contact', 'emergencyContact', 'name', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Relation
                        </label>
                        <Input
                          value={formData.contact.emergencyContact.relation}
                          onChange={(e) => handleNestedInputChange('contact', 'emergencyContact', 'relation', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Phone Number
                        </label>
                        <Input
                          type="tel"
                          value={formData.contact.emergencyContact.phone}
                          onChange={(e) => handleNestedInputChange('contact', 'emergencyContact', 'phone', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Email Address
                        </label>
                        <Input
                          type="email"
                          value={formData.contact.emergencyContact.email}
                          onChange={(e) => handleNestedInputChange('contact', 'emergencyContact', 'email', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>General Preferences</CardTitle>
                    <CardDescription>Customize your app experience</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Language
                        </label>
                        <Select
                          value={formData.preferences.language}
                          onChange={(e) => handleInputChange('preferences', 'language', e.target.value)}
                        >
                          <option value="English">English</option>
                          <option value="Hindi">Hindi</option>
                          <option value="Marathi">Marathi</option>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Timezone
                        </label>
                        <Select
                          value={formData.preferences.timezone}
                          onChange={(e) => handleInputChange('preferences', 'timezone', e.target.value)}
                        >
                          <option value="Asia/Kolkata">Asia/Kolkata</option>
                          <option value="Asia/Dubai">Asia/Dubai</option>
                          <option value="UTC">UTC</option>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Choose what notifications you want to receive</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { key: 'email', label: 'Email Notifications', icon: Mail },
                      { key: 'sms', label: 'SMS Notifications', icon: Phone },
                      { key: 'push', label: 'Push Notifications', icon: Bell },
                      { key: 'assignments', label: 'Assignment Reminders', icon: BookOpen },
                      { key: 'grades', label: 'Grade Updates', icon: Award },
                      { key: 'announcements', label: 'School Announcements', icon: School }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <item.icon className="h-4 w-4 text-slate-400 mr-3" />
                          <span className="text-sm font-medium text-slate-900 dark:text-white">
                            {item.label}
                          </span>
                        </div>
                        <input
                          type="checkbox"
                          checked={formData.preferences.notifications[item.key]}
                          onChange={(e) => handleNestedInputChange('preferences', 'notifications', item.key, e.target.checked)}
                          className="rounded"
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Privacy Settings</CardTitle>
                    <CardDescription>Control who can see your information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Profile Visibility
                      </label>
                      <Select
                        value={formData.preferences.privacy.profileVisibility}
                        onChange={(e) => handleNestedInputChange('preferences', 'privacy', 'profileVisibility', e.target.value)}
                      >
                        <option value="public">Public</option>
                        <option value="friends">Friends Only</option>
                        <option value="private">Private</option>
                      </Select>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-900 dark:text-white">
                          Show Grades to Others
                        </span>
                        <input
                          type="checkbox"
                          checked={formData.preferences.privacy.showGrades}
                          onChange={(e) => handleNestedInputChange('preferences', 'privacy', 'showGrades', e.target.checked)}
                          className="rounded"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-900 dark:text-white">
                          Show Contact Information
                        </span>
                        <input
                          type="checkbox"
                          checked={formData.preferences.privacy.showContactInfo}
                          onChange={(e) => handleNestedInputChange('preferences', 'privacy', 'showContactInfo', e.target.checked)}
                          className="rounded"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;