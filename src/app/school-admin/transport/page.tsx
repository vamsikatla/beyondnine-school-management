"use client";

import React from 'react';
import { 
  Bus, 
  MapPin, 
  Users, 
  Clock, 
  Navigation,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  AlertTriangle,
  CheckCircle,
  Phone,
  User,
  Calendar,
  Route,
  Fuel,
  Settings,
  Bell
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SearchInput } from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { DataTable } from '@/components/ui/DataTable';
import { cn } from '@/lib/utils';

// Mock transport data
const mockRoutes = [
  {
    id: "RT001",
    routeName: "Route A - North Zone",
    routeNumber: "A1",
    startPoint: "School Main Gate",
    endPoint: "North Park Colony",
    totalStops: 12,
    distance: "25 km",
    estimatedTime: "45 mins",
    assignedBus: "TN01AB1234",
    driver: "Ravi Kumar",
    students: 35,
    status: "Active",
    lastUpdated: "2024-01-15 08:30"
  },
  {
    id: "RT002",
    routeName: "Route B - South Zone", 
    routeNumber: "B2",
    startPoint: "School Main Gate",
    endPoint: "South Extension",
    totalStops: 8,
    distance: "18 km",
    estimatedTime: "35 mins",
    assignedBus: "TN01AB5678",
    driver: "Suresh Singh",
    students: 28,
    status: "Active",
    lastUpdated: "2024-01-15 08:45"
  },
  {
    id: "RT003",
    routeName: "Route C - East Zone",
    routeNumber: "C3", 
    startPoint: "School Main Gate",
    endPoint: "East Valley",
    totalStops: 15,
    distance: "32 km",
    estimatedTime: "55 mins",
    assignedBus: "TN01AB9012",
    driver: "Amit Patel",
    students: 42,
    status: "Maintenance",
    lastUpdated: "2024-01-14 16:20"
  }
];

const mockBuses = [
  {
    id: "BS001",
    busNumber: "TN01AB1234",
    model: "Tata LP 909",
    capacity: 45,
    currentRoute: "Route A",
    driver: "Ravi Kumar",
    conductor: "Mohan Lal",
    fuelType: "Diesel",
    lastService: "2024-01-10",
    nextService: "2024-02-10",
    insurance: "Valid till Dec 2024",
    fitness: "Valid till Nov 2024",
    status: "Running",
    gpsEnabled: true,
    currentLocation: "Near Stop 5 - Park Street"
  },
  {
    id: "BS002", 
    busNumber: "TN01AB5678",
    model: "Ashok Leyland Viking",
    capacity: 40,
    currentRoute: "Route B",
    driver: "Suresh Singh",
    conductor: "Raj Kumar",
    fuelType: "CNG",
    lastService: "2024-01-08",
    nextService: "2024-02-08",
    insurance: "Valid till Oct 2024",
    fitness: "Valid till Sep 2024", 
    status: "Running",
    gpsEnabled: true,
    currentLocation: "At Stop 3 - Market Complex"
  },
  {
    id: "BS003",
    busNumber: "TN01AB9012", 
    model: "Tata LP 712",
    capacity: 35,
    currentRoute: "Route C",
    driver: "Amit Patel",
    conductor: "Vikram Yadav",
    fuelType: "Diesel",
    lastService: "2024-01-12",
    nextService: "2024-02-12", 
    insurance: "Valid till Jan 2025",
    fitness: "Valid till Dec 2024",
    status: "Maintenance",
    gpsEnabled: true,
    currentLocation: "Service Center"
  }
];

const mockStudentTransport = [
  {
    id: "ST001",
    studentName: "Aarav Sharma",
    class: "10th A",
    rollNumber: "101",
    parentName: "Rajesh Sharma",
    phone: "+91 9876543210",
    route: "Route A",
    stop: "Park Street",
    boardingTime: "07:30 AM",
    dropTime: "02:45 PM",
    fee: 2500,
    feeStatus: "Paid",
    transportStatus: "Active"
  },
  {
    id: "ST002",
    studentName: "Priya Patel", 
    class: "9th B",
    rollNumber: "205",
    parentName: "Amit Patel",
    phone: "+91 9876543211",
    route: "Route B",
    stop: "Market Complex",
    boardingTime: "07:45 AM",
    dropTime: "03:00 PM",
    fee: 2200,
    feeStatus: "Pending",
    transportStatus: "Active"
  }
];

const TransportManagement = () => {
  const [selectedTab, setSelectedTab] = React.useState('overview');
  const [searchTerm, setSearchTerm] = React.useState('');

  // Transport stats
  const transportStats = [
    {
      title: "Total Routes",
      value: "12",
      change: "+2",
      changeType: "positive" as const,
      icon: Route,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Active Buses",
      value: "8",
      change: "+1",
      changeType: "positive" as const,
      icon: Bus,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Students Using Transport",
      value: "285",
      change: "+15",
      changeType: "positive" as const,
      icon: Users,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Monthly Revenue",
      value: "₹6.4L",
      change: "+8.2%",
      changeType: "positive" as const,
      icon: Fuel,
      color: "from-orange-500 to-red-500"
    }
  ];

  // Route table columns
  const routeColumns = [
    {
      key: 'routeName' as keyof typeof mockRoutes[0],
      label: 'Route Details',
      sortable: true,
      render: (value: any, row: typeof mockRoutes[0]) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <Route className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="font-medium text-slate-900 dark:text-white">{row.routeName}</div>
            <div className="text-sm text-slate-500">#{row.routeNumber} • {row.distance}</div>
          </div>
        </div>
      )
    },
    {
      key: 'assignedBus' as keyof typeof mockRoutes[0],
      label: 'Assigned Bus',
      sortable: true,
      render: (value: any, row: typeof mockRoutes[0]) => (
        <div>
          <div className="font-medium text-slate-900 dark:text-white">{value}</div>
          <div className="text-sm text-slate-500">Driver: {row.driver}</div>
        </div>
      )
    },
    {
      key: 'totalStops' as keyof typeof mockRoutes[0],
      label: 'Stops',
      sortable: true,
      render: (value: any) => (
        <div className="flex items-center">
          <MapPin className="h-4 w-4 text-slate-400 mr-1" />
          {value}
        </div>
      )
    },
    {
      key: 'students' as keyof typeof mockRoutes[0],
      label: 'Students',
      sortable: true,
      render: (value: any) => (
        <div className="flex items-center">
          <Users className="h-4 w-4 text-slate-400 mr-1" />
          {value}
        </div>
      )
    },
    {
      key: 'estimatedTime' as keyof typeof mockRoutes[0],
      label: 'Duration',
      render: (value: any) => (
        <div className="flex items-center">
          <Clock className="h-4 w-4 text-slate-400 mr-1" />
          {value}
        </div>
      )
    },
    {
      key: 'status' as keyof typeof mockRoutes[0],
      label: 'Status',
      render: (value: any) => (
        <span className={cn(
          "status-badge",
          value === 'Active' && "status-success",
          value === 'Maintenance' && "status-warning",
          value === 'Inactive' && "status-error"
        )}>
          {value}
        </span>
      )
    }
  ];

  // Bus table columns
  const busColumns = [
    {
      key: 'busNumber' as keyof typeof mockBuses[0],
      label: 'Bus Details',
      sortable: true,
      render: (value: any, row: typeof mockBuses[0]) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
            <Bus className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="font-medium text-slate-900 dark:text-white">{value}</div>
            <div className="text-sm text-slate-500">{row.model} • {row.capacity} seats</div>
          </div>
        </div>
      )
    },
    {
      key: 'currentRoute' as keyof typeof mockBuses[0],
      label: 'Current Route',
      sortable: true
    },
    {
      key: 'driver' as keyof typeof mockBuses[0],
      label: 'Driver',
      sortable: true,
      render: (value: any, row: typeof mockBuses[0]) => (
        <div>
          <div className="font-medium text-slate-900 dark:text-white">{value}</div>
          <div className="text-sm text-slate-500">Conductor: {row.conductor}</div>
        </div>
      )
    },
    {
      key: 'gpsEnabled' as keyof typeof mockBuses[0],
      label: 'GPS Tracking',
      render: (value: any) => (
        <div className="flex items-center">
          {value ? (
            <>
              <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-600 text-sm">Enabled</span>
            </>
          ) : (
            <>
              <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />
              <span className="text-red-600 text-sm">Disabled</span>
            </>
          )}
        </div>
      )
    },
    {
      key: 'status' as keyof typeof mockBuses[0],
      label: 'Status',
      render: (value: any) => (
        <span className={cn(
          "status-badge",
          value === 'Running' && "status-success",
          value === 'Maintenance' && "status-warning",
          value === 'Idle' && "status-info"
        )}>
          {value}
        </span>
      )
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Route },
    { id: 'routes', label: 'Routes', icon: MapPin },
    { id: 'buses', label: 'Buses', icon: Bus },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'tracking', label: 'Live Tracking', icon: Navigation },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Header */}
      <div className="glass border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Bus className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900 dark:text-white">Transport Management</h1>
                  <p className="text-sm text-slate-600 dark:text-slate-400">GPS tracking & route management</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <SearchInput 
                placeholder="Search routes, buses..."
                className="w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="gradient" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Route
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
              onClick={() => setSelectedTab(tab.id)}
              className={cn(
                "flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap",
                selectedTab === tab.id
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
        {selectedTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {transportStats.map((stat, index) => (
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

            {/* Live Transport Status */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>Live Bus Tracking</CardTitle>
                  <CardDescription>Real-time location of active buses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockBuses.filter(bus => bus.status === 'Running').map((bus) => (
                      <div key={bus.id} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                            <Bus className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium text-slate-900 dark:text-white">{bus.busNumber}</h4>
                            <p className="text-sm text-slate-500">{bus.currentRoute}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center text-green-600 text-sm">
                            <Navigation className="h-4 w-4 mr-1" />
                            Live
                          </div>
                          <p className="text-xs text-slate-500">{bus.currentLocation}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>Route Performance</CardTitle>
                  <CardDescription>Today's route efficiency metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockRoutes.map((route) => (
                      <div key={route.id} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <Route className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium text-slate-900 dark:text-white">{route.routeNumber}</h4>
                            <p className="text-sm text-slate-500">{route.students} students</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={cn(
                            "text-sm font-medium",
                            route.status === 'Active' ? "text-green-600" : "text-orange-600"
                          )}>
                            {route.status === 'Active' ? 'On Time' : 'Delayed'}
                          </div>
                          <p className="text-xs text-slate-500">{route.estimatedTime}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Routes Tab */}
        {selectedTab === 'routes' && (
          <div className="space-y-6">
            <DataTable
              title="Route Management"
              description="Manage all transport routes and schedules"
              columns={routeColumns}
              data={mockRoutes}
              searchKey="routeName"
              searchPlaceholder="Search routes..."
              showSearch={true}
              showPagination={true}
              showExport={true}
              pageSize={10}
              onRowClick={(route) => console.log('View route:', route)}
            />
          </div>
        )}

        {/* Buses Tab */}
        {selectedTab === 'buses' && (
          <div className="space-y-6">
            <DataTable
              title="Bus Fleet Management"
              description="Manage all buses, drivers, and maintenance"
              columns={busColumns}
              data={mockBuses}
              searchKey="busNumber"
              searchPlaceholder="Search buses..."
              showSearch={true}
              showPagination={true}
              showExport={true}
              pageSize={10}
              onRowClick={(bus) => console.log('View bus:', bus)}
            />
          </div>
        )}

        {/* Live Tracking Tab */}
        {selectedTab === 'tracking' && (
          <div className="space-y-6">
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Live GPS Tracking</CardTitle>
                <CardDescription>Real-time location tracking of all buses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Navigation className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                      Interactive Map
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      Real-time GPS tracking with route visualization and alerts
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Other tabs placeholder */}
        {['students', 'settings'].includes(selectedTab) && (
          <div className="space-y-6">
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="capitalize">{selectedTab} Management</CardTitle>
                <CardDescription>Comprehensive {selectedTab} management interface</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    {tabs.find(t => t.id === selectedTab)?.icon && 
                      React.createElement(tabs.find(t => t.id === selectedTab)!.icon, { 
                        className: "h-8 w-8 text-white" 
                      })}
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2 capitalize">
                    {selectedTab} Management System
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Advanced {selectedTab} management with comprehensive features and analytics
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransportManagement;