"use client";

import React from 'react';
import { 
  Users, 
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Check,
  X,
  Clock,
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  Upload,
  AlertCircle,
  CheckCircle,
  XCircle,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input, SearchInput } from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { DataTable } from '@/components/ui/DataTable';
import { cn } from '@/lib/utils';

// Mock admission applications data
const mockApplications = [
  {
    id: "APP001",
    studentName: "Ravi Kumar",
    parentName: "Suresh Kumar",
    email: "suresh.kumar@example.com",
    phone: "+91 9876543220",
    appliedClass: "6th Grade",
    applicationDate: "2024-01-10",
    status: "Pending Review",
    documents: ["Birth Certificate", "Previous School Records", "Medical Certificate"],
    previousSchool: "City Primary School",
    address: "123 Main Street, Mumbai",
    dateOfBirth: "2012-03-15",
    priority: "Normal",
    interviewScheduled: false,
    interviewDate: null,
    admissionTest: "Scheduled",
    testDate: "2024-01-25",
    fees: {
      applicationFee: "Paid",
      admissionFee: "Pending"
    }
  },
  {
    id: "APP002",
    studentName: "Sneha Patel",
    parentName: "Rajesh Patel",
    email: "rajesh.patel@example.com",
    phone: "+91 9876543221",
    appliedClass: "9th Grade",
    applicationDate: "2024-01-08",
    status: "Approved",
    documents: ["Birth Certificate", "Previous School Records", "Medical Certificate", "Transfer Certificate"],
    previousSchool: "Excellence Academy",
    address: "456 Park Avenue, Delhi",
    dateOfBirth: "2009-07-22",
    priority: "High",
    interviewScheduled: true,
    interviewDate: "2024-01-20",
    admissionTest: "Completed",
    testDate: "2024-01-18",
    testScore: 85,
    fees: {
      applicationFee: "Paid",
      admissionFee: "Paid"
    }
  },
  {
    id: "APP003",
    studentName: "Amit Singh",
    parentName: "Vikram Singh",
    email: "vikram.singh@example.com",
    phone: "+91 9876543222",
    appliedClass: "11th Grade",
    applicationDate: "2024-01-12",
    status: "Rejected",
    documents: ["Birth Certificate", "Previous School Records"],
    previousSchool: "National High School",
    address: "789 Garden Road, Bangalore",
    dateOfBirth: "2007-11-10",
    priority: "Normal",
    interviewScheduled: true,
    interviewDate: "2024-01-22",
    admissionTest: "Completed",
    testDate: "2024-01-20",
    testScore: 65,
    fees: {
      applicationFee: "Paid",
      admissionFee: "N/A"
    },
    rejectionReason: "Did not meet minimum academic requirements"
  }
];

const AdmissionPortal = () => {
  const [selectedTab, setSelectedTab] = React.useState('applications');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('All');
  const [showApplicationForm, setShowApplicationForm] = React.useState(false);

  // Application table columns
  const applicationColumns = [
    {
      key: 'studentName' as keyof typeof mockApplications[0],
      label: 'Student Details',
      sortable: true,
      render: (value: any, row: typeof mockApplications[0]) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="font-medium text-slate-900 dark:text-white">{row.studentName}</div>
            <div className="text-sm text-slate-500">App ID: {row.id}</div>
            <div className="text-sm text-slate-500">Applied: {new Date(row.applicationDate).toLocaleDateString()}</div>
          </div>
        </div>
      )
    },
    {
      key: 'parentName' as keyof typeof mockApplications[0],
      label: 'Parent/Guardian',
      sortable: true,
      render: (value: any, row: typeof mockApplications[0]) => (
        <div>
          <div className="font-medium text-slate-900 dark:text-white">{row.parentName}</div>
          <div className="text-sm text-slate-500 flex items-center mt-1">
            <Mail className="h-3 w-3 mr-1" />
            {row.email}
          </div>
          <div className="text-sm text-slate-500 flex items-center mt-1">
            <Phone className="h-3 w-3 mr-1" />
            {row.phone}
          </div>
        </div>
      )
    },
    {
      key: 'appliedClass' as keyof typeof mockApplications[0],
      label: 'Applied Class',
      sortable: true,
      render: (value: any) => (
        <span className="font-medium text-slate-900 dark:text-white">{value}</span>
      )
    },
    {
      key: 'status' as keyof typeof mockApplications[0],
      label: 'Status',
      render: (value: any) => (
        <span className={cn(
          "status-badge",
          value === 'Approved' && "status-success",
          value === 'Pending Review' && "status-warning",
          value === 'Rejected' && "status-error",
          value === 'Interview Scheduled' && "status-info"
        )}>
          {value}
        </span>
      )
    },
    {
      key: 'admissionTest' as keyof typeof mockApplications[0],
      label: 'Test Status',
      render: (value: any, row: typeof mockApplications[0]) => (
        <div>
          <span className={cn(
            "text-xs px-2 py-1 rounded",
            value === 'Completed' && "bg-green-100 text-green-800",
            value === 'Scheduled' && "bg-blue-100 text-blue-800",
            value === 'Pending' && "bg-gray-100 text-gray-800"
          )}>
            {value}
          </span>
          {row.testScore && (
            <div className="text-sm text-slate-500 mt-1">Score: {row.testScore}%</div>
          )}
        </div>
      )
    },
    {
      key: 'priority' as keyof typeof mockApplications[0],
      label: 'Priority',
      render: (value: any) => (
        <span className={cn(
          "text-xs px-2 py-1 rounded",
          value === 'High' && "bg-red-100 text-red-800",
          value === 'Normal' && "bg-gray-100 text-gray-800",
          value === 'Low' && "bg-blue-100 text-blue-800"
        )}>
          {value}
        </span>
      )
    }
  ];

  const stats = [
    {
      title: "Total Applications",
      value: "127",
      change: "+23",
      changeType: "positive" as const,
      icon: FileText,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Pending Review",
      value: "45",
      change: "+12",
      changeType: "positive" as const,
      icon: Clock,
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Approved",
      value: "68",
      change: "+8",
      changeType: "positive" as const,
      icon: CheckCircle,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Interviews Scheduled",
      value: "32",
      change: "+5",
      changeType: "positive" as const,
      icon: Calendar,
      color: "from-purple-500 to-pink-500"
    }
  ];

  const filteredApplications = mockApplications.filter(app => {
    const matchesSearch = app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Header */}
      <div className="glass border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900 dark:text-white">Admission Portal</h1>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Manage student admissions and applications</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="gradient" size="sm" onClick={() => setShowApplicationForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Application
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
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
                      {stat.changeType === 'positive' ? '↗' : '↘'} {stat.change}
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

        {/* Filters */}
        <Card variant="elevated" className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center space-x-4 w-full md:w-auto">
                <SearchInput
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-64"
                />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="All">All Status</option>
                  <option value="Pending Review">Pending Review</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Interview Scheduled">Interview Scheduled</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Applications Table */}
        <DataTable
          title="Admission Applications"
          description={`${filteredApplications.length} applications found`}
          columns={applicationColumns}
          data={filteredApplications}
          searchKey="studentName"
          showSearch={false}
          showPagination={true}
          showExport={false}
          pageSize={10}
          onRowClick={(application) => console.log('View application:', application)}
        />

        {/* Quick Actions */}
        <Card variant="elevated" className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common admission management tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Calendar, label: 'Schedule Interviews', color: 'from-blue-500 to-cyan-500', count: '12 pending' },
                { icon: FileText, label: 'Review Documents', color: 'from-green-500 to-emerald-500', count: '8 incomplete' },
                { icon: CheckCircle, label: 'Send Approval Letters', color: 'from-purple-500 to-pink-500', count: '5 approved' },
                { icon: Mail, label: 'Send Notifications', color: 'from-orange-500 to-red-500', count: '15 updates' }
              ].map((action, index) => (
                <button
                  key={index}
                  className="group p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-transparent hover:shadow-lg transition-all duration-200 bg-white dark:bg-slate-800"
                >
                  <div className={cn(
                    "w-10 h-10 rounded-lg bg-gradient-to-r flex items-center justify-center mb-3 group-hover:scale-110 transition-transform",
                    action.color
                  )}>
                    <action.icon className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white mb-1">
                    {action.label}
                  </p>
                  <p className="text-xs text-slate-500">
                    {action.count}
                  </p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Application Form Modal */}
      {showApplicationForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card variant="elevated" className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>New Admission Application</CardTitle>
                  <CardDescription>Create a new student admission application</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowApplicationForm(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Student Information */}
                <div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4">Student Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Student Name*</label>
                      <Input placeholder="Enter student name" className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Date of Birth*</label>
                      <Input type="date" className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Applied Class*</label>
                      <select className="mt-1 w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800">
                        <option value="">Select Class</option>
                        <option value="6th Grade">6th Grade</option>
                        <option value="7th Grade">7th Grade</option>
                        <option value="8th Grade">8th Grade</option>
                        <option value="9th Grade">9th Grade</option>
                        <option value="10th Grade">10th Grade</option>
                        <option value="11th Grade">11th Grade</option>
                        <option value="12th Grade">12th Grade</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Previous School</label>
                      <Input placeholder="Enter previous school name" className="mt-1" />
                    </div>
                  </div>
                </div>

                {/* Parent Information */}
                <div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4">Parent/Guardian Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Parent Name*</label>
                      <Input placeholder="Enter parent/guardian name" className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email*</label>
                      <Input type="email" placeholder="Enter email address" className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Phone Number*</label>
                      <Input placeholder="Enter phone number" className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Emergency Contact</label>
                      <Input placeholder="Enter emergency contact" className="mt-1" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Address*</label>
                    <textarea
                      placeholder="Enter complete address"
                      className="mt-1 w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white resize-none"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4">Additional Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Medical Information</label>
                      <textarea
                        placeholder="Any medical conditions, allergies, or special requirements"
                        className="mt-1 w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white resize-none"
                        rows={3}
                      />
                    </div>
                    <div className="flex items-center space-x-6">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm text-slate-700 dark:text-slate-300">Transport Required</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm text-slate-700 dark:text-slate-300">Hostel Required</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-slate-200 dark:border-slate-700">
                  <Button variant="outline" onClick={() => setShowApplicationForm(false)}>
                    Cancel
                  </Button>
                  <Button variant="gradient">
                    Submit Application
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdmissionPortal;