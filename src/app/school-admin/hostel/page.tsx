"use client";

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Building2, 
  Bed, 
  UserCheck, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Settings,
  Filter,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Home,
  Shield,
  Wifi,
  Zap,
  Droplets,
  Wind,
  Camera,
  Lock,
  Users2,
  DollarSign,
  Activity,
  TrendingUp,
  Download,
  Upload,
  FileText,
  Star,
  MessageSquare,
  Utensils,
  ShowerHead,
  Tv
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { cn } from '@/lib/utils';

interface Room {
  id: string;
  number: string;
  type: 'SINGLE' | 'DOUBLE' | 'TRIPLE' | 'QUAD';
  floor: number;
  block: string;
  capacity: number;
  occupied: number;
  status: 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE' | 'RESERVED';
  facilities: string[];
  monthlyFee: number;
  students: {
    id: string;
    name: string;
    class: string;
    joinDate: string;
    contact: string;
  }[];
}

interface HostelBlock {
  id: string;
  name: string;
  type: 'BOYS' | 'GIRLS' | 'MIXED';
  floors: number;
  totalRooms: number;
  occupiedRooms: number;
  totalCapacity: number;
  currentOccupancy: number;
  warden: {
    name: string;
    contact: string;
    email: string;
  };
  facilities: string[];
  monthlyMaintenance: number;
}

interface HostelApplication {
  id: string;
  studentName: string;
  studentId: string;
  class: string;
  guardianName: string;
  guardianContact: string;
  roomPreference: string;
  applicationDate: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'WAITLIST';
  documents: string[];
  reason?: string;
}

const HostelManagementPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedBlock, setSelectedBlock] = useState('all');

  // Mock data
  const hostelBlocks: HostelBlock[] = [
    {
      id: '1',
      name: 'Phoenix Block',
      type: 'BOYS',
      floors: 4,
      totalRooms: 60,
      occupiedRooms: 48,
      totalCapacity: 180,
      currentOccupancy: 142,
      warden: {
        name: 'Mr. Rajesh Kumar',
        contact: '+91 9876543211',
        email: 'rajesh.kumar@greenvalley.edu'
      },
      facilities: ['WiFi', 'AC', 'Laundry', 'Mess', 'Study Hall', 'Recreation Room', 'CCTV'],
      monthlyMaintenance: 15000
    },
    {
      id: '2',
      name: 'Lotus Block',
      type: 'GIRLS',
      floors: 4,
      totalRooms: 50,
      occupiedRooms: 42,
      totalCapacity: 150,
      currentOccupancy: 128,
      warden: {
        name: 'Mrs. Priya Sharma',
        contact: '+91 9876543212',
        email: 'priya.sharma@greenvalley.edu'
      },
      facilities: ['WiFi', 'AC', 'Laundry', 'Mess', 'Study Hall', 'Beauty Parlor', 'CCTV'],
      monthlyMaintenance: 15000
    },
    {
      id: '3',
      name: 'Harmony Block',
      type: 'MIXED',
      floors: 3,
      totalRooms: 30,
      occupiedRooms: 22,
      totalCapacity: 90,
      currentOccupancy: 68,
      warden: {
        name: 'Dr. Anita Reddy',
        contact: '+91 9876543213',
        email: 'anita.reddy@greenvalley.edu'
      },
      facilities: ['WiFi', 'AC', 'Laundry', 'Mess', 'Library', 'Medical Room', 'CCTV'],
      monthlyMaintenance: 12000
    }
  ];

  const rooms: Room[] = [
    {
      id: '1',
      number: 'P-101',
      type: 'DOUBLE',
      floor: 1,
      block: 'Phoenix Block',
      capacity: 2,
      occupied: 2,
      status: 'OCCUPIED',
      facilities: ['AC', 'WiFi', 'Attached Bathroom', 'Study Table', 'Wardrobe'],
      monthlyFee: 8000,
      students: [
        {
          id: 'S001',
          name: 'Arjun Patel',
          class: '11-A',
          joinDate: '2024-04-15',
          contact: '+91 9876543221'
        },
        {
          id: 'S002',
          name: 'Kiran Sharma',
          class: '11-B',
          joinDate: '2024-04-20',
          contact: '+91 9876543222'
        }
      ]
    },
    {
      id: '2',
      number: 'L-205',
      type: 'SINGLE',
      floor: 2,
      block: 'Lotus Block',
      capacity: 1,
      occupied: 1,
      status: 'OCCUPIED',
      facilities: ['AC', 'WiFi', 'Attached Bathroom', 'Study Table', 'Wardrobe', 'Balcony'],
      monthlyFee: 12000,
      students: [
        {
          id: 'S003',
          name: 'Ananya Singh',
          class: '12-A',
          joinDate: '2024-03-10',
          contact: '+91 9876543223'
        }
      ]
    },
    {
      id: '3',
      number: 'P-304',
      type: 'TRIPLE',
      floor: 3,
      block: 'Phoenix Block',
      capacity: 3,
      occupied: 0,
      status: 'AVAILABLE',
      facilities: ['AC', 'WiFi', 'Attached Bathroom', 'Study Tables', 'Wardrobes'],
      monthlyFee: 6000,
      students: []
    }
  ];

  const applications: HostelApplication[] = [
    {
      id: '1',
      studentName: 'Rahul Gupta',
      studentId: 'ST2024001',
      class: '10-A',
      guardianName: 'Mr. Suresh Gupta',
      guardianContact: '+91 9876543231',
      roomPreference: 'Double Sharing',
      applicationDate: '2024-08-15',
      status: 'PENDING',
      documents: ['Application Form', 'Medical Certificate', 'ID Proof', 'Fee Receipt']
    },
    {
      id: '2',
      studentName: 'Priya Mehta',
      studentId: 'ST2024002',
      class: '11-B',
      guardianName: 'Mrs. Sunita Mehta',
      guardianContact: '+91 9876543232',
      roomPreference: 'Single Room',
      applicationDate: '2024-08-12',
      status: 'APPROVED',
      documents: ['Application Form', 'Medical Certificate', 'ID Proof', 'Fee Receipt']
    },
    {
      id: '3',
      studentName: 'Vikash Kumar',
      studentId: 'ST2024003',
      class: '12-A',
      guardianName: 'Mr. Ramesh Kumar',
      guardianContact: '+91 9876543233',
      roomPreference: 'Triple Sharing',
      applicationDate: '2024-08-10',
      status: 'WAITLIST',
      documents: ['Application Form', 'Medical Certificate']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'OCCUPIED': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'MAINTENANCE': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'RESERVED': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'APPROVED': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'REJECTED': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'WAITLIST': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getBlockTypeIcon = (type: string) => {
    switch (type) {
      case 'BOYS': return <Users className="h-5 w-5 text-blue-500" />;
      case 'GIRLS': return <Users2 className="h-5 w-5 text-pink-500" />;
      case 'MIXED': return <Users className="h-5 w-5 text-purple-500" />;
      default: return <Building2 className="h-5 w-5" />;
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'blocks', label: 'Hostel Blocks', icon: Building2 },
    { id: 'rooms', label: 'Room Management', icon: Bed },
    { id: 'applications', label: 'Applications', icon: FileText },
    { id: 'residents', label: 'Residents', icon: Users },
    { id: 'facilities', label: 'Facilities', icon: Settings },
    { id: 'fees', label: 'Fees & Billing', icon: DollarSign },
    { id: 'reports', label: 'Reports', icon: Activity }
  ];

  // Overview Tab Content
  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Residents</p>
                <p className="text-3xl font-bold">338</p>
                <p className="text-blue-100 text-sm">↑ 12 this month</p>
              </div>
              <Users className="h-12 w-12 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Occupancy Rate</p>
                <p className="text-3xl font-bold">81%</p>
                <p className="text-green-100 text-sm">420 total capacity</p>
              </div>
              <TrendingUp className="h-12 w-12 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Available Rooms</p>
                <p className="text-3xl font-bold">28</p>
                <p className="text-purple-100 text-sm">140 total rooms</p>
              </div>
              <Bed className="h-12 w-12 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Pending Applications</p>
                <p className="text-3xl font-bold">15</p>
                <p className="text-orange-100 text-sm">↑ 3 new today</p>
              </div>
              <FileText className="h-12 w-12 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Plus className="h-6 w-6" />
              <span>New Admission</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Bed className="h-6 w-6" />
              <span>Room Allocation</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <DollarSign className="h-6 w-6" />
              <span>Fee Collection</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <FileText className="h-6 w-6" />
              <span>Generate Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {applications.slice(0, 3).map((app) => (
                <div key={app.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div>
                    <p className="font-medium">{app.studentName}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{app.class} • {app.roomPreference}</p>
                  </div>
                  <Badge className={getStatusColor(app.status)}>
                    {app.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Block Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {hostelBlocks.map((block) => (
                <div key={block.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getBlockTypeIcon(block.type)}
                    <div>
                      <p className="font-medium">{block.name}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {block.currentOccupancy}/{block.totalCapacity} occupied
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="w-16 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${(block.currentOccupancy / block.totalCapacity) * 100}%` }}
                      />
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      {Math.round((block.currentOccupancy / block.totalCapacity) * 100)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Hostel Blocks Tab Content
  const BlocksTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Hostel Blocks</h2>
          <p className="text-slate-600 dark:text-slate-400">Manage hostel blocks and facilities</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add New Block</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {hostelBlocks.map((block) => (
          <Card key={block.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getBlockTypeIcon(block.type)}
                  <div>
                    <CardTitle className="text-lg">{block.name}</CardTitle>
                    <CardDescription>{block.type} Block • {block.floors} Floors</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Occupancy Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{block.occupiedRooms}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Occupied Rooms</p>
                </div>
                <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{block.totalRooms - block.occupiedRooms}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Available Rooms</p>
                </div>
              </div>

              {/* Occupancy Bar */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Occupancy</span>
                  <span>{Math.round((block.currentOccupancy / block.totalCapacity) * 100)}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" 
                    style={{ width: `${(block.currentOccupancy / block.totalCapacity) * 100}%` }}
                  />
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  {block.currentOccupancy}/{block.totalCapacity} residents
                </p>
              </div>

              {/* Warden Info */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <p className="font-medium flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Warden
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{block.warden.name}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{block.warden.contact}</p>
              </div>

              {/* Facilities */}
              <div>
                <p className="font-medium mb-2">Facilities</p>
                <div className="flex flex-wrap gap-1">
                  {block.facilities.slice(0, 4).map((facility, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {facility}
                    </Badge>
                  ))}
                  {block.facilities.length > 4 && (
                    <Badge variant="secondary" className="text-xs">
                      +{block.facilities.length - 4} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Hostel Management
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Comprehensive hostel administration and student accommodation management
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export Data</span>
              </Button>
              <Button className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>New Admission</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-white dark:bg-slate-800 p-1 rounded-lg shadow-sm overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-3 rounded-md text-sm font-medium transition-all whitespace-nowrap",
                    activeTab === tab.id
                      ? "bg-blue-500 text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'blocks' && <BlocksTab />}
          {activeTab === 'rooms' && (
            <div className="text-center py-20">
              <Bed className="h-16 w-16 mx-auto text-slate-400 mb-4" />
              <h3 className="text-xl font-medium text-slate-900 dark:text-white mb-2">Room Management</h3>
              <p className="text-slate-600 dark:text-slate-400">Coming soon...</p>
            </div>
          )}
          {activeTab === 'applications' && (
            <div className="text-center py-20">
              <FileText className="h-16 w-16 mx-auto text-slate-400 mb-4" />
              <h3 className="text-xl font-medium text-slate-900 dark:text-white mb-2">Applications Management</h3>
              <p className="text-slate-600 dark:text-slate-400">Coming soon...</p>
            </div>
          )}
          {activeTab === 'residents' && (
            <div className="text-center py-20">
              <Users className="h-16 w-16 mx-auto text-slate-400 mb-4" />
              <h3 className="text-xl font-medium text-slate-900 dark:text-white mb-2">Residents Management</h3>
              <p className="text-slate-600 dark:text-slate-400">Coming soon...</p>
            </div>
          )}
          {activeTab === 'facilities' && (
            <div className="text-center py-20">
              <Settings className="h-16 w-16 mx-auto text-slate-400 mb-4" />
              <h3 className="text-xl font-medium text-slate-900 dark:text-white mb-2">Facilities Management</h3>
              <p className="text-slate-600 dark:text-slate-400">Coming soon...</p>
            </div>
          )}
          {activeTab === 'fees' && (
            <div className="text-center py-20">
              <DollarSign className="h-16 w-16 mx-auto text-slate-400 mb-4" />
              <h3 className="text-xl font-medium text-slate-900 dark:text-white mb-2">Fees & Billing</h3>
              <p className="text-slate-600 dark:text-slate-400">Coming soon...</p>
            </div>
          )}
          {activeTab === 'reports' && (
            <div className="text-center py-20">
              <Activity className="h-16 w-16 mx-auto text-slate-400 mb-4" />
              <h3 className="text-xl font-medium text-slate-900 dark:text-white mb-2">Reports & Analytics</h3>
              <p className="text-slate-600 dark:text-slate-400">Coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HostelManagementPage;