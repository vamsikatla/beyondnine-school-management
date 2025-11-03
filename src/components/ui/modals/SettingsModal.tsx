import React, { useState } from 'react';
import { Settings, Save, X, User, Shield, Bell, Eye, Lock, Globe, Palette, Database, Clock } from 'lucide-react';
import { Modal } from '../Modal';
import { Button } from '../Button';
import { Input } from '../Input';
import { Select, SelectItem } from '../Select';
import { Card } from '../Card';
import { Badge } from '../Badge';

interface SettingsData {
  // Profile Settings
  displayName: string;
  email: string;
  phone: string;
  timezone: string;
  language: string;
  avatar?: string;

  // Notification Settings
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  notificationSound: boolean;

  // Privacy Settings
  profileVisibility: 'public' | 'private' | 'restricted';
  allowDirectMessages: boolean;
  showOnlineStatus: boolean;
  dataSharing: boolean;

  // System Preferences
  theme: 'light' | 'dark' | 'system';
  compactMode: boolean;
  autoSave: boolean;
  sessionTimeout: number;
}

interface UserPreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (settings: SettingsData) => void;
  currentSettings?: Partial<SettingsData>;
}

export const UserPreferencesModal: React.FC<UserPreferencesModalProps> = ({
  isOpen,
  onClose,
  onSave,
  currentSettings = {}
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'privacy' | 'system'>('profile');
  const [settings, setSettings] = useState<SettingsData>({
    displayName: '',
    email: '',
    phone: '',
    timezone: 'UTC',
    language: 'en',
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    notificationSound: true,
    profileVisibility: 'public',
    allowDirectMessages: true,
    showOnlineStatus: true,
    dataSharing: false,
    theme: 'system',
    compactMode: false,
    autoSave: true,
    sessionTimeout: 30,
    ...currentSettings
  });

  const handleSave = () => {
    onSave(settings);
    onClose();
  };

  const tabs = [
    { id: 'profile' as const, label: 'Profile', icon: User },
    { id: 'notifications' as const, label: 'Notifications', icon: Bell },
    { id: 'privacy' as const, label: 'Privacy', icon: Shield },
    { id: 'system' as const, label: 'System', icon: Settings }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
              <Input
                value={settings.displayName}
                onChange={(e) => setSettings(prev => ({ ...prev, displayName: e.target.value }))}
                placeholder="Enter your display name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <Input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <Input
                type="tel"
                value={settings.phone}
                onChange={(e) => setSettings(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
              <Select
                value={settings.timezone}
                onChange={(e) => setSettings(prev => ({ ...prev, timezone: e.target.value }))}
              >
                <SelectItem value="UTC">UTC</SelectItem>
                <SelectItem value="America/New_York">Eastern Time</SelectItem>
                <SelectItem value="America/Chicago">Central Time</SelectItem>
                <SelectItem value="America/Denver">Mountain Time</SelectItem>
                <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                <SelectItem value="Europe/London">London</SelectItem>
                <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
              <Select
                value={settings.language}
                onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
              >
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="zh">Chinese</SelectItem>
              </Select>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email Notifications</label>
                <p className="text-sm text-gray-500">Receive notifications via email</p>
              </div>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => setSettings(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700">SMS Notifications</label>
                <p className="text-sm text-gray-500">Receive notifications via SMS</p>
              </div>
              <input
                type="checkbox"
                checked={settings.smsNotifications}
                onChange={(e) => setSettings(prev => ({ ...prev, smsNotifications: e.target.checked }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700">Push Notifications</label>
                <p className="text-sm text-gray-500">Receive push notifications</p>
              </div>
              <input
                type="checkbox"
                checked={settings.pushNotifications}
                onChange={(e) => setSettings(prev => ({ ...prev, pushNotifications: e.target.checked }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700">Notification Sound</label>
                <p className="text-sm text-gray-500">Play sound for notifications</p>
              </div>
              <input
                type="checkbox"
                checked={settings.notificationSound}
                onChange={(e) => setSettings(prev => ({ ...prev, notificationSound: e.target.checked }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Profile Visibility</label>
              <Select
                value={settings.profileVisibility}
                onChange={(e) => setSettings(prev => ({ ...prev, profileVisibility: e.target.value as any }))}
              >
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="private">Private</SelectItem>
                <SelectItem value="restricted">Restricted</SelectItem>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700">Allow Direct Messages</label>
                <p className="text-sm text-gray-500">Allow others to send you direct messages</p>
              </div>
              <input
                type="checkbox"
                checked={settings.allowDirectMessages}
                onChange={(e) => setSettings(prev => ({ ...prev, allowDirectMessages: e.target.checked }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700">Show Online Status</label>
                <p className="text-sm text-gray-500">Show when you are online</p>
              </div>
              <input
                type="checkbox"
                checked={settings.showOnlineStatus}
                onChange={(e) => setSettings(prev => ({ ...prev, showOnlineStatus: e.target.checked }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700">Data Sharing</label>
                <p className="text-sm text-gray-500">Allow analytics and improvement data sharing</p>
              </div>
              <input
                type="checkbox"
                checked={settings.dataSharing}
                onChange={(e) => setSettings(prev => ({ ...prev, dataSharing: e.target.checked }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
          </div>
        );

      case 'system':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
              <Select
                value={settings.theme}
                onChange={(e) => setSettings(prev => ({ ...prev, theme: e.target.value as any }))}
              >
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700">Compact Mode</label>
                <p className="text-sm text-gray-500">Use compact interface layout</p>
              </div>
              <input
                type="checkbox"
                checked={settings.compactMode}
                onChange={(e) => setSettings(prev => ({ ...prev, compactMode: e.target.checked }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700">Auto Save</label>
                <p className="text-sm text-gray-500">Automatically save changes</p>
              </div>
              <input
                type="checkbox"
                checked={settings.autoSave}
                onChange={(e) => setSettings(prev => ({ ...prev, autoSave: e.target.checked }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Session Timeout (minutes)</label>
              <Input
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => setSettings(prev => ({ ...prev, sessionTimeout: Number(e.target.value) }))}
                min="5"
                max="480"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="flex items-center justify-between p-6 border-b">
        <div className="flex items-center space-x-2">
          <Settings className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">User Preferences</h2>
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

      <div className="flex">
        <div className="w-1/3 border-r bg-gray-50 p-4">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="flex-1 p-6">
          <div className="max-w-md">
            {renderTabContent()}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3 p-6 border-t bg-gray-50">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSave} className="flex items-center space-x-2">
          <Save className="w-4 h-4" />
          <span>Save Settings</span>
        </Button>
      </div>
    </Modal>
  );
};

// Role Permissions Modal
interface Permission {
  id: string;
  name: string;
  description: string;
  category: 'users' | 'content' | 'system' | 'reports';
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  isSystem: boolean;
}

interface RolePermissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (roles: Role[]) => void;
  roles: Role[];
  permissions: Permission[];
}

export const RolePermissionsModal: React.FC<RolePermissionsModalProps> = ({
  isOpen,
  onClose,
  onSave,
  roles: initialRoles,
  permissions
}) => {
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [selectedRole, setSelectedRole] = useState<string>(roles[0]?.id || '');

  const selectedRoleData = roles.find(role => role.id === selectedRole);

  const togglePermission = (permissionId: string) => {
    setRoles(prev => prev.map(role => {
      if (role.id === selectedRole) {
        const hasPermission = role.permissions.includes(permissionId);
        return {
          ...role,
          permissions: hasPermission
            ? role.permissions.filter(p => p !== permissionId)
            : [...role.permissions, permissionId]
        };
      }
      return role;
    }));
  };

  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <div className="flex items-center justify-between p-6 border-b">
        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Role Permissions</h2>
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

      <div className="flex h-96">
        <div className="w-1/3 border-r bg-gray-50 p-4 overflow-y-auto">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Roles</h3>
          <div className="space-y-1">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`w-full text-left p-3 rounded-md text-sm transition-colors ${
                  selectedRole === role.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'hover:bg-gray-100'
                }`}
              >
                <div className="font-medium">{role.name}</div>
                <div className="text-xs text-gray-500 mt-1">{role.description}</div>
                {role.isSystem && (
                  <Badge variant="secondary" size="sm" className="mt-1">
                    System Role
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
          {selectedRoleData && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900">{selectedRoleData.name}</h3>
                <p className="text-sm text-gray-500">{selectedRoleData.description}</p>
              </div>

              <div className="space-y-6">
                {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => (
                  <div key={category}>
                    <h4 className="text-sm font-medium text-gray-700 mb-3 capitalize">
                      {category} Permissions
                    </h4>
                    <div className="space-y-2">
                      {categoryPermissions.map((permission) => (
                        <div key={permission.id} className="flex items-start space-x-3">
                          <input
                            type="checkbox"
                            id={permission.id}
                            checked={selectedRoleData.permissions.includes(permission.id)}
                            onChange={() => togglePermission(permission.id)}
                            disabled={selectedRoleData.isSystem}
                            className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <div className="flex-1">
                            <label
                              htmlFor={permission.id}
                              className="block text-sm font-medium text-gray-700 cursor-pointer"
                            >
                              {permission.name}
                            </label>
                            <p className="text-xs text-gray-500">{permission.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-3 p-6 border-t bg-gray-50">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={() => onSave(roles)} className="flex items-center space-x-2">
          <Save className="w-4 h-4" />
          <span>Save Permissions</span>
        </Button>
      </div>
    </Modal>
  );
};

// System Settings Modal
interface SystemSettings {
  schoolName: string;
  schoolAddress: string;
  schoolPhone: string;
  schoolEmail: string;
  academicYear: string;
  currentSemester: string;
  gradeScale: 'percentage' | 'gpa' | 'letter';
  attendanceThreshold: number;
  autoBackup: boolean;
  backupFrequency: 'daily' | 'weekly' | 'monthly';
  maintenanceMode: boolean;
  registrationOpen: boolean;
}

interface SystemSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (settings: SystemSettings) => void;
  currentSettings: SystemSettings;
}

export const SystemSettingsModal: React.FC<SystemSettingsModalProps> = ({
  isOpen,
  onClose,
  onSave,
  currentSettings
}) => {
  const [settings, setSettings] = useState<SystemSettings>(currentSettings);

  const handleSave = () => {
    onSave(settings);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="flex items-center justify-between p-6 border-b">
        <div className="flex items-center space-x-2">
          <Database className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">System Settings</h2>
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
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2">
            <h3 className="text-lg font-medium text-gray-900 mb-4">School Information</h3>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">School Name</label>
            <Input
              value={settings.schoolName}
              onChange={(e) => setSettings(prev => ({ ...prev, schoolName: e.target.value }))}
              placeholder="Enter school name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">School Email</label>
            <Input
              type="email"
              value={settings.schoolEmail}
              onChange={(e) => setSettings(prev => ({ ...prev, schoolEmail: e.target.value }))}
              placeholder="Enter school email"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">School Address</label>
            <Input
              value={settings.schoolAddress}
              onChange={(e) => setSettings(prev => ({ ...prev, schoolAddress: e.target.value }))}
              placeholder="Enter school address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">School Phone</label>
            <Input
              type="tel"
              value={settings.schoolPhone}
              onChange={(e) => setSettings(prev => ({ ...prev, schoolPhone: e.target.value }))}
              placeholder="Enter school phone"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year</label>
            <Input
              value={settings.academicYear}
              onChange={(e) => setSettings(prev => ({ ...prev, academicYear: e.target.value }))}
              placeholder="e.g., 2024-2025"
            />
          </div>

          <div className="col-span-2 mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Academic Settings</h3>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Semester</label>
            <Select
              value={settings.currentSemester}
              onChange={(e) => setSettings(prev => ({ ...prev, currentSemester: e.target.value }))}
            >
              <SelectItem value="First">First Semester</SelectItem>
              <SelectItem value="Second">Second Semester</SelectItem>
              <SelectItem value="Summer">Summer Term</SelectItem>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Grade Scale</label>
            <Select
              value={settings.gradeScale}
              onChange={(e) => setSettings(prev => ({ ...prev, gradeScale: e.target.value as any }))}
            >
              <SelectItem value="percentage">Percentage</SelectItem>
              <SelectItem value="gpa">GPA</SelectItem>
              <SelectItem value="letter">Letter Grade</SelectItem>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Attendance Threshold (%)</label>
            <Input
              type="number"
              value={settings.attendanceThreshold}
              onChange={(e) => setSettings(prev => ({ ...prev, attendanceThreshold: Number(e.target.value) }))}
              min="0"
              max="100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Backup Frequency</label>
            <Select
              value={settings.backupFrequency}
              onChange={(e) => setSettings(prev => ({ ...prev, backupFrequency: e.target.value as any }))}
            >
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </Select>
          </div>

          <div className="col-span-2 mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">System Controls</h3>
          </div>

          <div className="flex items-center justify-between col-span-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Auto Backup</label>
              <p className="text-sm text-gray-500">Automatically backup system data</p>
            </div>
            <input
              type="checkbox"
              checked={settings.autoBackup}
              onChange={(e) => setSettings(prev => ({ ...prev, autoBackup: e.target.checked }))}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-between col-span-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Registration Open</label>
              <p className="text-sm text-gray-500">Allow new student registrations</p>
            </div>
            <input
              type="checkbox"
              checked={settings.registrationOpen}
              onChange={(e) => setSettings(prev => ({ ...prev, registrationOpen: e.target.checked }))}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-between col-span-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Maintenance Mode</label>
              <p className="text-sm text-gray-500">Enable maintenance mode (restricted access)</p>
            </div>
            <input
              type="checkbox"
              checked={settings.maintenanceMode}
              onChange={(e) => setSettings(prev => ({ ...prev, maintenanceMode: e.target.checked }))}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3 p-6 border-t bg-gray-50">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSave} className="flex items-center space-x-2">
          <Save className="w-4 h-4" />
          <span>Save Settings</span>
        </Button>
      </div>
    </Modal>
  );
};