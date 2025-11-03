import { NextRequest, NextResponse } from 'next/server';

// Mock data for transport management
const mockVehicles = [
  {
    id: '1',
    vehicleNumber: 'DL-1234',
    type: 'Bus',
    capacity: 45,
    driver: 'Rajesh Kumar',
    driverPhone: '+91-9876543210',
    routeId: 'R001',
    routeName: 'Central Delhi Route',
    status: 'Active',
    fuelType: 'Diesel',
    registrationDate: '2022-03-15',
    insuranceExpiry: '2024-03-15',
    maintenanceDate: '2024-01-10',
    gpsEnabled: true,
    currentLocation: { lat: 28.6139, lng: 77.2090 },
    studentsAssigned: 42
  },
  {
    id: '2',
    vehicleNumber: 'DL-5678',
    type: 'Van',
    capacity: 25,
    driver: 'Suresh Singh',
    driverPhone: '+91-9876543211',
    routeId: 'R002',
    routeName: 'South Delhi Route',
    status: 'In Transit',
    fuelType: 'CNG',
    registrationDate: '2023-01-20',
    insuranceExpiry: '2025-01-20',
    maintenanceDate: '2024-01-05',
    gpsEnabled: true,
    currentLocation: { lat: 28.5355, lng: 77.3910 },
    studentsAssigned: 23
  }
];

const mockRoutes = [
  {
    id: 'R001',
    name: 'Central Delhi Route',
    description: 'Covers Central Delhi areas including CP, Karol Bagh',
    stops: [
      { id: 'S001', name: 'Connaught Place', time: '07:30', students: 8 },
      { id: 'S002', name: 'Karol Bagh Metro', time: '07:45', students: 12 },
      { id: 'S003', name: 'Rajendra Place', time: '08:00', students: 15 },
      { id: 'S004', name: 'School Main Gate', time: '08:15', students: 0 }
    ],
    totalDistance: '25 KM',
    estimatedTime: '45 minutes',
    vehicleAssigned: 'DL-1234',
    studentsCount: 35,
    status: 'Active'
  },
  {
    id: 'R002',
    name: 'South Delhi Route',
    description: 'Covers South Delhi areas including Lajpat Nagar, GK',
    stops: [
      { id: 'S005', name: 'Lajpat Nagar', time: '07:20', students: 6 },
      { id: 'S006', name: 'Greater Kailash', time: '07:35', students: 10 },
      { id: 'S007', name: 'Nehru Place', time: '07:50', students: 7 },
      { id: 'S008', name: 'School Main Gate', time: '08:10', students: 0 }
    ],
    totalDistance: '20 KM',
    estimatedTime: '50 minutes',
    vehicleAssigned: 'DL-5678',
    studentsCount: 23,
    status: 'Active'
  }
];

const mockDrivers = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    phone: '+91-9876543210',
    email: 'rajesh.driver@school.com',
    licenseNumber: 'DL-123456789',
    licenseExpiry: '2025-12-31',
    experience: '8 years',
    vehicleAssigned: 'DL-1234',
    status: 'Active',
    rating: 4.5,
    emergencyContact: '+91-9876543200',
    address: '123 Delhi Street, New Delhi'
  },
  {
    id: '2',
    name: 'Suresh Singh',
    phone: '+91-9876543211',
    email: 'suresh.driver@school.com',
    licenseNumber: 'DL-987654321',
    licenseExpiry: '2024-08-15',
    experience: '12 years',
    vehicleAssigned: 'DL-5678',
    status: 'Active',
    rating: 4.8,
    emergencyContact: '+91-9876543201',
    address: '456 Delhi Road, New Delhi'
  }
];

const mockGPSData = [
  {
    vehicleId: '1',
    vehicleNumber: 'DL-1234',
    timestamp: new Date().toISOString(),
    location: { lat: 28.6139, lng: 77.2090 },
    speed: 25,
    direction: 'NE',
    status: 'Moving',
    nextStop: 'Karol Bagh Metro',
    eta: '5 minutes',
    studentsOnboard: 20
  },
  {
    vehicleId: '2',
    vehicleNumber: 'DL-5678',
    timestamp: new Date().toISOString(),
    location: { lat: 28.5355, lng: 77.3910 },
    speed: 30,
    direction: 'N',
    status: 'Moving',
    nextStop: 'Greater Kailash',
    eta: '8 minutes',
    studentsOnboard: 15
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');
    const routeId = searchParams.get('routeId');

    switch (type) {
      case 'vehicles':
        const filteredVehicles = routeId 
          ? mockVehicles.filter(v => v.routeId === routeId)
          : mockVehicles;
        return NextResponse.json({
          success: true,
          data: filteredVehicles,
          total: filteredVehicles.length
        });

      case 'routes':
        const filteredRoutes = id 
          ? mockRoutes.filter(r => r.id === id)
          : mockRoutes;
        return NextResponse.json({
          success: true,
          data: filteredRoutes,
          total: filteredRoutes.length
        });

      case 'drivers':
        return NextResponse.json({
          success: true,
          data: mockDrivers,
          total: mockDrivers.length
        });

      case 'gps':
        const filteredGPS = id 
          ? mockGPSData.filter(g => g.vehicleId === id)
          : mockGPSData;
        return NextResponse.json({
          success: true,
          data: filteredGPS,
          total: filteredGPS.length
        });

      case 'analytics':
        return NextResponse.json({
          success: true,
          data: {
            totalVehicles: mockVehicles.length,
            activeVehicles: mockVehicles.filter(v => v.status === 'Active').length,
            totalRoutes: mockRoutes.length,
            totalDrivers: mockDrivers.length,
            studentsTransported: mockVehicles.reduce((sum, v) => sum + v.studentsAssigned, 0),
            averageCapacityUtilization: 85.5,
            onTimePerformance: 92.3,
            fuelEfficiency: [
              { vehicle: 'DL-1234', efficiency: '12 km/l', cost: '₹2,500' },
              { vehicle: 'DL-5678', efficiency: '15 km/l', cost: '₹1,800' }
            ],
            maintenanceAlerts: [
              { vehicle: 'DL-1234', type: 'Insurance Expiry', dueDate: '2024-03-15' },
              { vehicle: 'DL-5678', type: 'Service Due', dueDate: '2024-02-05' }
            ]
          }
        });

      default:
        return NextResponse.json({
          success: true,
          data: {
            vehicles: mockVehicles,
            routes: mockRoutes,
            drivers: mockDrivers,
            gpsData: mockGPSData
          }
        });
    }
  } catch (error) {
    console.error('Error fetching transport data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch transport data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, ...data } = body;

    switch (type) {
      case 'vehicle':
        const newVehicle = {
          id: (mockVehicles.length + 1).toString(),
          ...data,
          createdAt: new Date().toISOString(),
          gpsEnabled: true,
          studentsAssigned: 0
        };
        mockVehicles.push(newVehicle);
        return NextResponse.json({
          success: true,
          message: 'Vehicle added successfully',
          data: newVehicle
        });

      case 'route':
        const newRoute = {
          id: `R${(mockRoutes.length + 1).toString().padStart(3, '0')}`,
          ...data,
          createdAt: new Date().toISOString(),
          studentsCount: 0
        };
        mockRoutes.push(newRoute);
        return NextResponse.json({
          success: true,
          message: 'Route created successfully',
          data: newRoute
        });

      case 'driver':
        const newDriver = {
          id: (mockDrivers.length + 1).toString(),
          ...data,
          createdAt: new Date().toISOString(),
          status: 'Active'
        };
        mockDrivers.push(newDriver);
        return NextResponse.json({
          success: true,
          message: 'Driver added successfully',
          data: newDriver
        });

      case 'emergency':
        // Handle emergency alerts
        return NextResponse.json({
          success: true,
          message: 'Emergency alert sent successfully',
          data: {
            alertId: Date.now().toString(),
            timestamp: new Date().toISOString(),
            status: 'Sent'
          }
        });

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid request type' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error creating transport data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create transport data' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, id, ...updateData } = body;

    switch (type) {
      case 'vehicle':
        const vehicleIndex = mockVehicles.findIndex(v => v.id === id);
        if (vehicleIndex === -1) {
          return NextResponse.json(
            { success: false, error: 'Vehicle not found' },
            { status: 404 }
          );
        }
        mockVehicles[vehicleIndex] = { ...mockVehicles[vehicleIndex], ...updateData };
        return NextResponse.json({
          success: true,
          message: 'Vehicle updated successfully',
          data: mockVehicles[vehicleIndex]
        });

      case 'route':
        const routeIndex = mockRoutes.findIndex(r => r.id === id);
        if (routeIndex === -1) {
          return NextResponse.json(
            { success: false, error: 'Route not found' },
            { status: 404 }
          );
        }
        mockRoutes[routeIndex] = { ...mockRoutes[routeIndex], ...updateData };
        return NextResponse.json({
          success: true,
          message: 'Route updated successfully',
          data: mockRoutes[routeIndex]
        });

      case 'driver':
        const driverIndex = mockDrivers.findIndex(d => d.id === id);
        if (driverIndex === -1) {
          return NextResponse.json(
            { success: false, error: 'Driver not found' },
            { status: 404 }
          );
        }
        mockDrivers[driverIndex] = { ...mockDrivers[driverIndex], ...updateData };
        return NextResponse.json({
          success: true,
          message: 'Driver updated successfully',
          data: mockDrivers[driverIndex]
        });

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid request type' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error updating transport data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update transport data' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID is required' },
        { status: 400 }
      );
    }

    switch (type) {
      case 'vehicle':
        const vehicleIndex = mockVehicles.findIndex(v => v.id === id);
        if (vehicleIndex === -1) {
          return NextResponse.json(
            { success: false, error: 'Vehicle not found' },
            { status: 404 }
          );
        }
        mockVehicles.splice(vehicleIndex, 1);
        return NextResponse.json({
          success: true,
          message: 'Vehicle deleted successfully'
        });

      case 'route':
        const routeIndex = mockRoutes.findIndex(r => r.id === id);
        if (routeIndex === -1) {
          return NextResponse.json(
            { success: false, error: 'Route not found' },
            { status: 404 }
          );
        }
        mockRoutes.splice(routeIndex, 1);
        return NextResponse.json({
          success: true,
          message: 'Route deleted successfully'
        });

      case 'driver':
        const driverIndex = mockDrivers.findIndex(d => d.id === id);
        if (driverIndex === -1) {
          return NextResponse.json(
            { success: false, error: 'Driver not found' },
            { status: 404 }
          );
        }
        mockDrivers.splice(driverIndex, 1);
        return NextResponse.json({
          success: true,
          message: 'Driver deleted successfully'
        });

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid request type' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error deleting transport data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete transport data' },
      { status: 500 }
    );
  }
}