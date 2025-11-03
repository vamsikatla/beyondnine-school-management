"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, User, Mail, Phone, Camera, Save, Edit, Settings,
  Lock, Eye, EyeOff, Upload, Calendar, Award, GraduationCap,
  MapPin, Clock, Shield, Bell, Palette, Globe
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

const teacherProfile = {
  name: "Dr. Priya Gupta",
  firstName: "Priya",
  lastName: "Gupta",
  email: "priya.gupta@school.edu",
  phone: "+91 98765 43210",
  employeeId: "EMP2024001",
  department: "Mathematics Department",
  designation: "Senior Mathematics Teacher",
  qualification: "PhD in Mathematics",
  experience: "8 years",
  joiningDate: "2020-06-15",
  subjects: ["Advanced Mathematics", "Calculus", "Statistics"],
  avatar: "👩‍🏫",
  address: {
    street: "123 Teachers Colony",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    country: "India"
  },
  preferences: {
    language: "English",
    timezone: "Asia/Kolkata",
    theme: "light",
    notifications: {
      email: true,
      sms: false,
      push: true
    }
  }
};

const ProfilePage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState('personal');
  const [isEditing, setIsEditing] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState(teacherProfile);

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'professional', label: 'Professional', icon: GraduationCap },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Settings }
  ];

  const handleSave = () => {
    // In a real app, this would save to the database
    console.log('Saving profile:', formData);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddressChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }));
  };

  const handlePreferenceChange = (category, field, value) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [category]: typeof prev.preferences[category] === 'object' 
          ? { ...prev.preferences[category], [field]: value }
          : value
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Header */}
      <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => router.push('/teacher/dashboard')}>
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
                  <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-3xl mx-auto">
                    {formData.avatar}
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
                  {formData.name}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
                  {formData.designation}
                </p>
                <p className="text-slate-500 dark:text-slate-500 text-xs mb-4">
                  {formData.employeeId}
                </p>
                
                <div className="flex flex-wrap gap-1 justify-center">
                  {formData.subjects.map((subject, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 text-slate-400 mr-2" />
                  <span className="text-slate-600 dark:text-slate-400">Joined {formData.joiningDate}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Award className="h-4 w-4 text-slate-400 mr-2" />
                  <span className="text-slate-600 dark:text-slate-400">{formData.experience} experience</span>
                </div>
                <div className="flex items-center text-sm">
                  <GraduationCap className="h-4 w-4 text-slate-400 mr-2" />
                  <span className="text-slate-600 dark:text-slate-400">{formData.qualification}</span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 text-slate-400 mr-2" />
                  <span className="text-slate-600 dark:text-slate-400">{formData.address.city}, {formData.address.state}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tab Navigation */}
            <div className="flex space-x-1 mb-6 p-1 bg-white/50 dark:bg-slate-800/50 rounded-lg">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all flex-1 justify-center",
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
                  <CardDescription>Update your personal details and contact information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        First Name
                      </label>
                      <Input
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Last Name
                      </label>
                      <Input
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
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
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Address
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Input
                          placeholder="Street Address"
                          value={formData.address.street}
                          onChange={(e) => handleAddressChange('street', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <Input
                        placeholder="City"
                        value={formData.address.city}
                        onChange={(e) => handleAddressChange('city', e.target.value)}
                        disabled={!isEditing}
                      />
                      <Input
                        placeholder="State"
                        value={formData.address.state}
                        onChange={(e) => handleAddressChange('state', e.target.value)}
                        disabled={!isEditing}
                      />
                      <Input
                        placeholder="Pincode"
                        value={formData.address.pincode}
                        onChange={(e) => handleAddressChange('pincode', e.target.value)}
                        disabled={!isEditing}
                      />
                      <Input
                        placeholder="Country"
                        value={formData.address.country}
                        onChange={(e) => handleAddressChange('country', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Professional Tab */}
            {activeTab === 'professional' && (
              <Card>
                <CardHeader>
                  <CardTitle>Professional Information</CardTitle>
                  <CardDescription>Your work-related information and qualifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Employee ID
                      </label>
                      <Input
                        value={formData.employeeId}
                        disabled
                        className="bg-slate-100 dark:bg-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Department
                      </label>
                      <Input
                        value={formData.department}
                        onChange={(e) => handleInputChange('department', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Designation
                      </label>
                      <Input
                        value={formData.designation}
                        onChange={(e) => handleInputChange('designation', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Experience
                      </label>
                      <Input
                        value={formData.experience}
                        onChange={(e) => handleInputChange('experience', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Qualification
                      </label>
                      <Input
                        value={formData.qualification}
                        onChange={(e) => handleInputChange('qualification', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Joining Date
                      </label>
                      <Input
                        type="date"
                        value={formData.joiningDate}
                        onChange={(e) => handleInputChange('joiningDate', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Teaching Subjects
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {formData.subjects.map((subject, index) => (
                        <Badge key={index} variant="secondary">
                          {subject}
                          {isEditing && (
                            <button className="ml-1 text-xs">×</button>
                          )}
                        </Badge>
                      ))}
                      {isEditing && (
                        <Button variant="outline" size="sm">
                          Add Subject
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>Update your account password</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter current password"
                        />
                        <button
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        New Password
                      </label>
                      <Input
                        type="password"
                        placeholder="Enter new password"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Confirm New Password
                      </label>
                      <Input
                        type="password"
                        placeholder="Confirm new password"
                      />
                    </div>
                    <Button variant="gradient">
                      Update Password
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Two-Factor Authentication</CardTitle>
                    <CardDescription>Add an extra layer of security to your account</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-slate-900 dark:text-white">SMS Authentication</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Receive verification codes via SMS
                        </p>
                      </div>
                      <Button variant="outline">
                        Enable
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>Customize your app experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Language
                      </label>
                      <Select
                        value={formData.preferences.language}
                        onChange={(e) => handlePreferenceChange('language', null, e.target.value)}
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
                        onChange={(e) => handlePreferenceChange('timezone', null, e.target.value)}
                      >
                        <option value="Asia/Kolkata">Asia/Kolkata</option>
                        <option value="Asia/Dubai">Asia/Dubai</option>
                        <option value="UTC">UTC</option>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-4">
                      Notifications
                    </label>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 text-slate-400 mr-3" />
                          <div>
                            <h4 className="text-sm font-medium text-slate-900 dark:text-white">Email Notifications</h4>
                            <p className="text-xs text-slate-600 dark:text-slate-400">Receive notifications via email</p>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={formData.preferences.notifications.email}
                          onChange={(e) => handlePreferenceChange('notifications', 'email', e.target.checked)}
                          className="rounded"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 text-slate-400 mr-3" />
                          <div>
                            <h4 className="text-sm font-medium text-slate-900 dark:text-white">SMS Notifications</h4>
                            <p className="text-xs text-slate-600 dark:text-slate-400">Receive notifications via SMS</p>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={formData.preferences.notifications.sms}
                          onChange={(e) => handlePreferenceChange('notifications', 'sms', e.target.checked)}
                          className="rounded"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Bell className="h-4 w-4 text-slate-400 mr-3" />
                          <div>
                            <h4 className="text-sm font-medium text-slate-900 dark:text-white">Push Notifications</h4>
                            <p className="text-xs text-slate-600 dark:text-slate-400">Receive push notifications</p>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={formData.preferences.notifications.push}
                          onChange={(e) => handlePreferenceChange('notifications', 'push', e.target.checked)}
                          className="rounded"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;