"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Users, School, DollarSign, TrendingUp, Settings, Shield, 
  BarChart3, PieChart, Activity, AlertTriangle, CheckCircle,
  Building, Globe, UserPlus, CreditCard, Calendar, Bell,
  FileText, Download, Filter, Search, Eye, Edit, Trash2,
  Plus, MoreHorizontal, ArrowUp, ArrowDown, Upload, Save,
  X, UserCheck, Clock, MapPin, Phone, Mail, BookOpen
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Select } from '@/components/ui/Select';
import { cn } from '@/lib/utils';
import ProtectedRoute from '@/components/ProtectedRoute';

interface School {
  id: string;
  name: string;
  code: string;
  address: string;
  city: string;
  state: string;
  principal: string;
  email: string;
  phone: string;
  students: number;
  teachers: number;
  plan: 'BASIC' | 'PREMIUM' | 'ENTERPRISE';
  status: 'ACTIVE' | 'SUSPENDED' | 'PENDING';
  subscription: {
    plan: string;
    amount: number;
    dueDate: string;
    status: 'PAID' | 'PENDING' | 'OVERDUE';
  };
  createdAt: string;
}

interface SupportTicket {
  id: string;
  school: string;
  title: string;
  description: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  createdAt: string;
  updatedAt: string;
}

interface Subscription {
  id: string;
  school: string;
  plan: string;
  amount: number;
  startDate: string;
  endDate: string;
  status: 'ACTIVE' | 'EXPIRED' | 'CANCELLED';
  paymentMethod: string;
}

const SuperAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlan, setFilterPlan] = useState('all');
  const [showAddSchool, setShowAddSchool] = useState(false);
  const [showSupportTicket, setShowSupportTicket] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);

  const schools: School[] = [
    {
      id: '1',
      name: 'Green Valley International School',
      code: 'GVIS001',
      address: '123 Education Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      principal: 'Dr. Sarah Johnson',
      email: 'principal@greenvalley.edu',
      phone: '+91 9876543210',
      students: 1250,
      teachers: 85,
      plan: 'ENTERPRISE',
      status: 'ACTIVE',
      subscription: {
        plan: 'Enterprise Plan',
        amount: 150000,
        dueDate: '2024-03-15',
        status: 'PAID'
      },
      createdAt: '2023-01-15'
    },
    {
      id: '2',
      name: 'Sunrise Public School',
      code: 'SPS002',
      address: '456 Learning Avenue',
      city: 'Delhi',
      state: 'Delhi',
      principal: 'Mr. Raj Kumar',
      email: 'principal@sunrise.edu',
      phone: '+91 9876543211',
      students: 850,
      teachers: 55,
      plan: 'PREMIUM',
      status: 'ACTIVE',
      subscription: {
        plan: 'Premium Plan',
        amount: 80000,
        dueDate: '2024-02-28',
        status: 'PAID'
      },
      createdAt: '2023-03-20'
    },
    {
      id: '3',
      name: 'Golden Heights Academy',
      code: 'GHA003',
      address: '789 Knowledge Park',
      city: 'Bangalore',
      state: 'Karnataka',
      principal: 'Mrs. Priya Sharma',
      email: 'principal@goldenheights.edu',
      phone: '+91 9876543212',
      students: 650,
      teachers: 42,
      plan: 'BASIC',
      status: 'PENDING',
      subscription: {
        plan: 'Basic Plan',
        amount: 35000,
        dueDate: '2024-02-15',
        status: 'OVERDUE'
      },
      createdAt: '2023-06-10'
    }
  ];

  const supportTickets: SupportTicket[] = [
    {
      id: 'T001',
      school: 'Green Valley International School',
      title: 'Login Issues',
      description: 'Multiple teachers reporting issues with login system',
      priority: 'HIGH',
      status: 'IN_PROGRESS',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-16'
    },
    {
      id: 'T002',
      school: 'Sunrise Public School',
      title: 'Attendance Module Not Working',
      description: 'Attendance module showing incorrect data for some classes',
      priority: 'MEDIUM',
      status: 'OPEN',
      createdAt: '2024-01-14',
      updatedAt: '2024-01-14'
    },
    {
      id: 'T003',
      school: 'Golden Heights Academy',
      title: 'Report Generation Failed',
      description: 'Unable to generate monthly reports for December',
      priority: 'URGENT',
      status: 'RESOLVED',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-12'
    }
  ];

  const subscriptions: Subscription[] = [
    {
      id: 'S001',
      school: 'Green Valley International School',
      plan: 'Enterprise Plan',
      amount: 150000,
      startDate: '2023-01-15',
      endDate: '2024-01-15',
      status: 'ACTIVE',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 'S002',
      school: 'Sunrise Public School',
      plan: 'Premium Plan',
      amount: 80000,
      startDate: '2023-03-20',
      endDate: '2024-03-20',
      status: 'ACTIVE',
      paymentMethod: 'Credit Card'
    },
    {
      id: 'S003',
      school: 'Golden Heights Academy',
      plan: 'Basic Plan',
      amount: 35000,
      startDate: '2023-06-10',
      endDate: '2024-06-10',
      status: 'ACTIVE',
      paymentMethod: 'Cheque'
    }
  ];

  const dashboardStats = [
    {
      title: "Total Schools",
      value: "156",
      change: "+12",
      changeType: "positive" as const,
      icon: School,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Total Students",
      value: "45,280",
      change: "+2,350",
      changeType: "positive" as const,
      icon: Users,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Monthly Revenue",
      value: "₹2.4Cr",
      change: "+18.5%",
      changeType: "positive" as const,
      icon: DollarSign,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Active Subscriptions",
      value: "142",
      change: "+8",
      changeType: "positive" as const,
      icon: TrendingUp,
      color: "from-orange-500 to-red-500"
    }
  ];

  const recentActivities = [
    { id: 1, school: 'Green Valley International', action: 'New subscription activated', time: '2 hours ago', type: 'subscription' },
    { id: 2, school: 'Sunrise Public School', action: 'Payment received', time: '4 hours ago', type: 'payment' },
    { id: 3, school: 'Golden Heights Academy', action: 'Support ticket raised', time: '6 hours ago', type: 'support' },
    { id: 4, school: 'St. Mary\'s Convent', action: 'Plan upgraded to Premium', time: '1 day ago', type: 'upgrade' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'schools', label: 'Schools', icon: School },
    { id: 'subscriptions', label: 'Subscriptions', icon: CreditCard },
    { id: 'analytics', label: 'Analytics', icon: PieChart },
    { id: 'support', label: 'Support', icon: Shield },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const filteredSchools = schools.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         school.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = filterPlan === 'all' || school.plan === filterPlan.toUpperCase();
    return matchesSearch && matchesPlan;
  });

  const handleAddSchool = () => {
    // Implementation for adding a new school
    console.log('Adding new school');
    setShowAddSchool(false);
  };

  const handleViewSchool = (school: School) => {
    setSelectedSchool(school);
    // Implementation for viewing school details
    console.log('Viewing school:', school);
  };

  const handleEditSchool = (school: School) => {
    setSelectedSchool(school);
    // Implementation for editing school details
    console.log('Editing school:', school);
  };

  const handleDeleteSchool = (schoolId: string) => {
    // Implementation for deleting a school
    console.log('Deleting school with ID:', schoolId);
  };

  const handleCreateSupportTicket = () => {
    // Implementation for creating a support ticket
    console.log('Creating support ticket');
    setShowSupportTicket(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
        {/* Header */}
        <div className="glass border-b border-white/20 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg flex items-center justify-center">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-slate-900 dark:text-white">Super Admin</h1>
                    <p className="text-sm text-slate-600 dark:text-slate-400">System Administrator</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4" />
                </Button>
                <Button variant="gradient" size="sm" onClick={() => setShowAddSchool(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add School
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-8 p-1 bg-white/50 dark:bg-slate-800/50 rounded-lg glass overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap",
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

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {dashboardStats.map((stat, index) => (
                  <Card key={index} variant="elevated" className="hover-lift">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                            {stat.title}
                          </p>
                          <p className="text-2xl font-bold text-slate-900 dark:text-white">
                            {stat.value}
                          </p>
                          <p className={cn(
                            "text-xs font-medium flex items-center mt-1",
                            stat.changeType === 'positive' ? "text-green-600" : "text-red-600"
                          )}>
                            {stat.changeType === 'positive' ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                            {stat.change}
                          </p>
                        </div>
                        <div className={cn(
                          "p-3 rounded-lg bg-gradient-to-r",
                          stat.color
                        )}>
                          <stat.icon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Charts and Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest updates from all schools</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-3">
                          <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium text-white",
                            activity.type === 'subscription' && "bg-blue-500",
                            activity.type === 'payment' && "bg-green-500",
                            activity.type === 'support' && "bg-yellow-500",
                            activity.type === 'upgrade' && "bg-purple-500"
                          )}>
                            {activity.type === 'subscription' && <School className="h-4 w-4" />}
                            {activity.type === 'payment' && <DollarSign className="h-4 w-4" />}
                            {activity.type === 'support' && <AlertTriangle className="h-4 w-4" />}
                            {activity.type === 'upgrade' && <TrendingUp className="h-4 w-4" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900 dark:text-white">
                              {activity.school}
                            </p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              {activity.action}
                            </p>
                            <p className="text-xs text-slate-400 dark:text-slate-500">
                              {activity.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle>System Health</CardTitle>
                    <CardDescription>Overall system performance metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Server Uptime</span>
                        <Badge variant="success">99.9%</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Active Schools</span>
                        <Badge variant="info">142/156</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Pending Payments</span>
                        <Badge variant="warning">8</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Support Tickets</span>
                        <Badge variant="default">23</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Schools Tab */}
          {activeTab === 'schools' && (
            <div className="space-y-6">
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search schools..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Select value={filterPlan} onChange={(e) => setFilterPlan(e.target.value)}>
                  <option value="all">All Plans</option>
                  <option value="basic">Basic</option>
                  <option value="premium">Premium</option>
                  <option value="enterprise">Enterprise</option>
                </Select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="gradient" onClick={() => setShowAddSchool(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add School
                </Button>
              </div>

              {/* Schools Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredSchools.map((school) => (
                  <Card key={school.id} variant="elevated" className="hover-lift">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{school.name}</CardTitle>
                          <CardDescription>{school.code}</CardDescription>
                        </div>
                        <Badge 
                          variant={school.status === 'ACTIVE' ? 'success' : 
                                  school.status === 'PENDING' ? 'warning' : 'destructive'}
                        >
                          {school.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">Principal:</span>
                          <span className="font-medium">{school.principal}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">Students:</span>
                          <span className="font-medium">{school.students.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">Teachers:</span>
                          <span className="font-medium">{school.teachers}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">Plan:</span>
                          <Badge 
                            variant={school.plan === 'ENTERPRISE' ? 'gradient' : 
                                    school.plan === 'PREMIUM' ? 'info' : 'default'}
                          >
                            {school.plan}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">Subscription:</span>
                          <Badge 
                            variant={school.subscription.status === 'PAID' ? 'success' : 
                                    school.subscription.status === 'PENDING' ? 'warning' : 'destructive'}
                          >
                            {school.subscription.status}
                          </Badge>
                        </div>
                        <div className="pt-3 border-t flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1" onClick={() => handleViewSchool(school)}>
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEditSchool(school)}>
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDeleteSchool(school.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Subscriptions Tab */}
          {activeTab === 'subscriptions' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Subscription Management</h2>
                  <p className="text-slate-600 dark:text-slate-400">Manage all school subscriptions and billing</p>
                </div>
                <Button variant="gradient">
                  <Plus className="h-4 w-4 mr-2" />
                  New Subscription
                </Button>
              </div>
              
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>Subscription Overview</CardTitle>
                  <CardDescription>Track and manage all school subscriptions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-700">
                          <th className="text-left py-3 text-slate-600 dark:text-slate-400">School</th>
                          <th className="text-left py-3 text-slate-600 dark:text-slate-400">Plan</th>
                          <th className="text-left py-3 text-slate-600 dark:text-slate-400">Amount</th>
                          <th className="text-left py-3 text-slate-600 dark:text-slate-400">Period</th>
                          <th className="text-left py-3 text-slate-600 dark:text-slate-400">Status</th>
                          <th className="text-left py-3 text-slate-600 dark:text-slate-400">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subscriptions.map((subscription) => (
                          <tr key={subscription.id} className="border-b border-slate-100 dark:border-slate-800">
                            <td className="py-3 text-slate-900 dark:text-white">{subscription.school}</td>
                            <td className="py-3 text-slate-600 dark:text-slate-400">{subscription.plan}</td>
                            <td className="py-3 text-slate-900 dark:text-white">₹{subscription.amount.toLocaleString()}</td>
                            <td className="py-3 text-slate-600 dark:text-slate-400">
                              {new Date(subscription.startDate).toLocaleDateString()} - {new Date(subscription.endDate).toLocaleDateString()}
                            </td>
                            <td className="py-3">
                              <Badge 
                                variant={subscription.status === 'ACTIVE' ? 'success' : 
                                        subscription.status === 'EXPIRED' ? 'destructive' : 'default'}
                              >
                                {subscription.status}
                              </Badge>
                            </td>
                            <td className="py-3">
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card variant="elevated">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600">Total Revenue</p>
                        <p className="text-2xl font-bold text-green-600">₹2.4Cr</p>
                      </div>
                      <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500">
                        <DollarSign className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card variant="elevated">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600">Active Subscriptions</p>
                        <p className="text-2xl font-bold text-blue-600">142</p>
                      </div>
                      <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500">
                        <CheckCircle className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card variant="elevated">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600">Pending Renewals</p>
                        <p className="text-2xl font-bold text-orange-600">8</p>
                      </div>
                      <div className="p-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-500">
                        <Clock className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Analytics Dashboard</h2>
                  <p className="text-slate-600 dark:text-slate-400">Comprehensive analytics and reporting</p>
                </div>
                <div className="flex space-x-2">
                  <Select defaultValue="monthly">
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </Select>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle>Revenue Trend</CardTitle>
                    <CardDescription>Monthly revenue growth</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-end justify-between space-x-2">
                      {[65, 70, 75, 80, 85, 90, 95, 100, 95, 90, 95, 100].map((height, index) => (
                        <div key={index} className="flex flex-col items-center flex-1">
                          <div 
                            className="bg-gradient-to-t from-blue-500 to-cyan-500 w-full rounded-t-md transition-all hover:opacity-75"
                            style={{ height: `${height * 2}px` }}
                          />
                          <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                            {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][index]}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle>School Distribution</CardTitle>
                    <CardDescription>By plan type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center">
                      <div className="relative w-48 h-48">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">156</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Total Schools</p>
                          </div>
                        </div>
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          <circle
                            className="text-blue-200 stroke-current"
                            strokeWidth="10"
                            cx="50"
                            cy="50"
                            r="40"
                            fill="transparent"
                          ></circle>
                          <circle
                            className="text-blue-500 stroke-current"
                            strokeWidth="10"
                            strokeLinecap="round"
                            cx="50"
                            cy="50"
                            r="40"
                            fill="transparent"
                            strokeDasharray="157"
                            strokeDashoffset="0"
                            transform="rotate(-90 50 50)"
                          ></circle>
                        </svg>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div className="text-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto mb-1"></div>
                        <p className="text-sm font-medium">Enterprise</p>
                        <p className="text-xs text-slate-600">45</p>
                      </div>
                      <div className="text-center">
                        <div className="w-3 h-3 bg-cyan-500 rounded-full mx-auto mb-1"></div>
                        <p className="text-sm font-medium">Premium</p>
                        <p className="text-xs text-slate-600">68</p>
                      </div>
                      <div className="text-center">
                        <div className="w-3 h-3 bg-slate-300 rounded-full mx-auto mb-1"></div>
                        <p className="text-sm font-medium">Basic</p>
                        <p className="text-xs text-slate-600">43</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                  <CardDescription>Student and teacher growth over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end justify-between space-x-2">
                    {[45, 50, 55, 60, 65, 70, 75, 80].map((height, index) => (
                      <div key={index} className="flex flex-col items-center flex-1">
                        <div className="flex items-end space-x-1">
                          <div 
                            className="bg-green-500 w-3 rounded-t-md transition-all hover:opacity-75"
                            style={{ height: `${height}px` }}
                          />
                          <div 
                            className="bg-blue-500 w-3 rounded-t-md transition-all hover:opacity-75"
                            style={{ height: `${height * 0.8}px` }}
                          />
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'][index]}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center space-x-6 mt-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-sm">Students</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                      <span className="text-sm">Teachers</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Support Tab */}
          {activeTab === 'support' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Support Center</h2>
                  <p className="text-slate-600 dark:text-slate-400">Manage support tickets and help requests</p>
                </div>
                <Button variant="gradient" onClick={() => setShowSupportTicket(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Ticket
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card variant="elevated">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600">Open Tickets</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">12</p>
                      </div>
                      <div className="p-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-500">
                        <AlertTriangle className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card variant="elevated">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600">In Progress</p>
                        <p className="text-2xl font-bold text-blue-600">8</p>
                      </div>
                      <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500">
                        <Activity className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card variant="elevated">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600">Resolved</p>
                        <p className="text-2xl font-bold text-green-600">45</p>
                      </div>
                      <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500">
                        <CheckCircle className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card variant="elevated">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600">Avg. Response Time</p>
                        <p className="text-2xl font-bold text-purple-600">2.4h</p>
                      </div>
                      <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                        <Clock className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>Recent Support Tickets</CardTitle>
                  <CardDescription>All support requests from schools</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-700">
                          <th className="text-left py-3 text-slate-600 dark:text-slate-400">Ticket</th>
                          <th className="text-left py-3 text-slate-600 dark:text-slate-400">School</th>
                          <th className="text-left py-3 text-slate-600 dark:text-slate-400">Title</th>
                          <th className="text-left py-3 text-slate-600 dark:text-slate-400">Priority</th>
                          <th className="text-left py-3 text-slate-600 dark:text-slate-400">Status</th>
                          <th className="text-left py-3 text-slate-600 dark:text-slate-400">Created</th>
                          <th className="text-left py-3 text-slate-600 dark:text-slate-400">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {supportTickets.map((ticket) => (
                          <tr key={ticket.id} className="border-b border-slate-100 dark:border-slate-800">
                            <td className="py-3 text-slate-900 dark:text-white">#{ticket.id}</td>
                            <td className="py-3 text-slate-600 dark:text-slate-400">{ticket.school}</td>
                            <td className="py-3 text-slate-900 dark:text-white">{ticket.title}</td>
                            <td className="py-3">
                              <Badge 
                                variant={ticket.priority === 'URGENT' ? 'destructive' : 
                                        ticket.priority === 'HIGH' ? 'warning' : 
                                        ticket.priority === 'MEDIUM' ? 'info' : 'default'}
                              >
                                {ticket.priority}
                              </Badge>
                            </td>
                            <td className="py-3">
                              <Badge 
                                variant={ticket.status === 'OPEN' ? 'default' : 
                                        ticket.status === 'IN_PROGRESS' ? 'info' : 
                                        ticket.status === 'RESOLVED' ? 'success' : 'secondary'}
                              >
                                {ticket.status}
                              </Badge>
                            </td>
                            <td className="py-3 text-slate-600 dark:text-slate-400">
                              {new Date(ticket.createdAt).toLocaleDateString()}
                            </td>
                            <td className="py-3">
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">System Settings</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <Card variant="elevated">
                    <CardHeader>
                      <CardTitle>Platform Configuration</CardTitle>
                      <CardDescription>Global system settings and preferences</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4">General Settings</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Platform Name</label>
                              <Input defaultValue="EduSphere" className="mt-1" />
                            </div>
                            <div>
                              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Support Email</label>
                              <Input defaultValue="support@edusphere.com" className="mt-1" type="email" />
                            </div>
                            <div>
                              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Default Plan</label>
                              <Select defaultValue="basic">
                                <option value="basic">Basic</option>
                                <option value="premium">Premium</option>
                                <option value="enterprise">Enterprise</option>
                              </Select>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Trial Period (days)</label>
                              <Input defaultValue="14" className="mt-1" type="number" />
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4">Billing Settings</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Currency</label>
                              <Select defaultValue="inr">
                                <option value="inr">INR (₹)</option>
                                <option value="usd">USD ($)</option>
                                <option value="eur">EUR (€)</option>
                              </Select>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Tax Rate (%)</label>
                              <Input defaultValue="18" className="mt-1" type="number" />
                            </div>
                            <div>
                              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Payment Gateway</label>
                              <Select defaultValue="razorpay">
                                <option value="razorpay">Razorpay</option>
                                <option value="stripe">Stripe</option>
                                <option value="paypal">PayPal</option>
                              </Select>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Late Fee (%)</label>
                              <Input defaultValue="2" className="mt-1" type="number" />
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-3">
                          <Button variant="gradient">
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </Button>
                          <Button variant="outline">
                            <Upload className="h-4 w-4 mr-2" />
                            Import Settings
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card variant="elevated">
                    <CardHeader>
                      <CardTitle>System Maintenance</CardTitle>
                      <CardDescription>Platform maintenance and updates</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                          <div>
                            <h4 className="font-medium text-slate-900 dark:text-white">Database Backup</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Last backup: 2 hours ago</p>
                          </div>
                          <Button variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Backup Now
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                          <div>
                            <h4 className="font-medium text-slate-900 dark:text-white">System Update</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Version 2.4.1 available</p>
                          </div>
                          <Button variant="gradient">
                            <Upload className="h-4 w-4 mr-2" />
                            Update
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                          <div>
                            <h4 className="font-medium text-slate-900 dark:text-white">Clear Cache</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Clear temporary files and cache</p>
                          </div>
                          <Button variant="outline" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Clear
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-6">
                  <Card variant="elevated">
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full justify-start">
                          <Users className="h-4 w-4 mr-2" />
                          Manage Admins
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Shield className="h-4 w-4 mr-2" />
                          Security Settings
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Globe className="h-4 w-4 mr-2" />
                          API Configuration
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <FileText className="h-4 w-4 mr-2" />
                          Audit Logs
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Performance Reports
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card variant="elevated">
                    <CardHeader>
                      <CardTitle>System Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">API Server</span>
                          <Badge variant="success">Operational</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Database</span>
                          <Badge variant="success">Operational</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">File Storage</span>
                          <Badge variant="success">Operational</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Email Service</span>
                          <Badge variant="warning">Degraded</Badge>
                        </div>
                        <div className="pt-4 border-t">
                          <Button variant="outline" className="w-full">
                            <Activity className="h-4 w-4 mr-2" />
                            View Detailed Status
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Add School Modal */}
        {showAddSchool && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-800 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Add New School</h3>
                  <button 
                    onClick={() => setShowAddSchool(false)}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">School Name</label>
                    <Input className="mt-1" placeholder="Enter school name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">School Code</label>
                    <Input className="mt-1" placeholder="Enter unique code" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Principal Name</label>
                    <Input className="mt-1" placeholder="Enter principal name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                    <Input className="mt-1" placeholder="Enter email" type="email" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Phone</label>
                    <Input className="mt-1" placeholder="Enter phone number" type="tel" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Address</label>
                    <Input className="mt-1" placeholder="Enter full address" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Subscription Plan</label>
                    <Select defaultValue="basic">
                      <option value="basic">Basic</option>
                      <option value="premium">Premium</option>
                      <option value="enterprise">Enterprise</option>
                    </Select>
                  </div>
                </div>
                
                <div className="mt-6 flex space-x-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowAddSchool(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="gradient" 
                    onClick={handleAddSchool}
                    className="flex-1"
                  >
                    Add School
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Support Ticket Modal */}
        {showSupportTicket && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-800 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Create Support Ticket</h3>
                  <button 
                    onClick={() => setShowSupportTicket(false)}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">School</label>
                    <Select>
                      <option value="">Select a school</option>
                      {schools.map((school) => (
                        <option key={school.id} value={school.id}>{school.name}</option>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Title</label>
                    <Input className="mt-1" placeholder="Enter ticket title" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Description</label>
                    <textarea 
                      className="w-full mt-1 p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                      rows={4}
                      placeholder="Describe the issue in detail"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Priority</label>
                    <Select defaultValue="medium">
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </Select>
                  </div>
                </div>
                
                <div className="mt-6 flex space-x-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowSupportTicket(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="gradient" 
                    onClick={handleCreateSupportTicket}
                    className="flex-1"
                  >
                    Create Ticket
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
  );
};

export default SuperAdminDashboard;