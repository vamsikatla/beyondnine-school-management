import { NextRequest, NextResponse } from 'next/server';

// Mock data for hostel management
const mockHostels = [
  {
    id: '1',
    name: 'Boys Hostel Block A',
    type: 'Boys',
    capacity: 200,
    occupied: 185,
    available: 15,
    warden: 'Mr. Vikram Sharma',
    wardenPhone: '+91-9876543220',
    floors: 4,
    roomsPerFloor: 50,
    facilities: ['WiFi', 'Mess', 'Laundry', 'Recreation Room', 'Study Hall'],
    status: 'Active',
    establishedYear: 2018,
    feePerMonth: 15000,
    address: 'School Campus, Block A'
  },
  {
    id: '2',
    name: 'Girls Hostel Block B',
    type: 'Girls',
    capacity: 180,
    occupied: 165,
    available: 15,
    warden: 'Ms. Priya Gupta',
    wardenPhone: '+91-9876543221',
    floors: 4,
    roomsPerFloor: 45,
    facilities: ['WiFi', 'Mess', 'Laundry', 'Recreation Room', 'Study Hall', 'Medical Room'],
    status: 'Active',
    establishedYear: 2019,
    feePerMonth: 15000,
    address: 'School Campus, Block B'
  }
];

const mockRooms = [
  {
    id: '1',
    hostelId: '1',
    hostelName: 'Boys Hostel Block A',
    roomNumber: 'A101',
    floor: 1,
    type: 'Double Sharing',
    capacity: 2,
    occupied: 2,
    available: 0,
    students: [
      { id: 'S001', name: 'Rahul Kumar', class: '11th A', rollNo: '11A001' },
      { id: 'S002', name: 'Amit Singh', class: '11th B', rollNo: '11B015' }
    ],
    amenities: ['AC', 'Attached Bathroom', 'Study Table', 'Wardrobe'],
    monthlyFee: 8000,
    status: 'Occupied',
    lastMaintenance: '2024-01-10'
  },
  {
    id: '2',
    hostelId: '1',
    hostelName: 'Boys Hostel Block A',
    roomNumber: 'A102',
    floor: 1,
    type: 'Triple Sharing',
    capacity: 3,
    occupied: 2,
    available: 1,
    students: [
      { id: 'S003', name: 'Vikash Yadav', class: '12th A', rollNo: '12A007' },
      { id: 'S004', name: 'Suresh Patel', class: '12th C', rollNo: '12C022' }
    ],
    amenities: ['Fan', 'Attached Bathroom', 'Study Table', 'Wardrobe'],
    monthlyFee: 6000,
    status: 'Partially Occupied',
    lastMaintenance: '2024-01-08'
  },
  {
    id: '3',
    hostelId: '2',
    hostelName: 'Girls Hostel Block B',
    roomNumber: 'B201',
    floor: 2,
    type: 'Double Sharing',
    capacity: 2,
    occupied: 2,
    available: 0,
    students: [
      { id: 'S005', name: 'Priya Sharma', class: '11th A', rollNo: '11A012' },
      { id: 'S006', name: 'Neha Gupta', class: '11th C', rollNo: '11C018' }
    ],
    amenities: ['AC', 'Attached Bathroom', 'Study Table', 'Wardrobe', 'Balcony'],
    monthlyFee: 8500,
    status: 'Occupied',
    lastMaintenance: '2024-01-12'
  }
];

const mockStudents = [
  {
    id: 'S001',
    name: 'Rahul Kumar',
    class: '11th A',
    rollNo: '11A001',
    hostelId: '1',
    hostelName: 'Boys Hostel Block A',
    roomId: '1',
    roomNumber: 'A101',
    admissionDate: '2023-04-15',
    parentName: 'Rajesh Kumar',
    parentPhone: '+91-9876543230',
    emergencyContact: '+91-9876543231',
    medicalInfo: 'No known allergies',
    feeStatus: 'Paid',
    lastFeeDate: '2024-01-01',
    guardianVisits: 3,
    disciplinaryRecord: 'Clean'
  },
  {
    id: 'S002',
    name: 'Amit Singh',
    class: '11th B',
    rollNo: '11B015',
    hostelId: '1',
    hostelName: 'Boys Hostel Block A',
    roomId: '1',
    roomNumber: 'A101',
    admissionDate: '2023-04-20',
    parentName: 'Suresh Singh',
    parentPhone: '+91-9876543232',
    emergencyContact: '+91-9876543233',
    medicalInfo: 'Asthma - inhaler required',
    feeStatus: 'Pending',
    lastFeeDate: '2023-12-01',
    guardianVisits: 5,
    disciplinaryRecord: 'Clean'
  }
];

const mockFacilities = [
  {
    id: '1',
    hostelId: '1',
    name: 'Mess Hall',
    type: 'Dining',
    capacity: 250,
    operatingHours: '06:00 - 22:00',
    status: 'Active',
    lastMaintenance: '2024-01-05',
    nextMaintenance: '2024-02-05',
    staff: 'Chef Raman + 4 assistants'
  },
  {
    id: '2',
    hostelId: '1',
    name: 'Recreation Room',
    type: 'Entertainment',
    capacity: 50,
    operatingHours: '16:00 - 21:00',
    status: 'Active',
    lastMaintenance: '2024-01-10',
    nextMaintenance: '2024-02-10',
    staff: 'Supervisor on duty'
  },
  {
    id: '3',
    hostelId: '2',
    name: 'Study Hall',
    type: 'Academic',
    capacity: 80,
    operatingHours: '18:00 - 22:00',
    status: 'Active',
    lastMaintenance: '2024-01-08',
    nextMaintenance: '2024-02-08',
    staff: 'Study supervisor'
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const hostelId = searchParams.get('hostelId');
    const roomId = searchParams.get('roomId');

    switch (type) {
      case 'rooms':
        const filteredRooms = hostelId 
          ? mockRooms.filter(r => r.hostelId === hostelId)
          : mockRooms;
        return NextResponse.json({
          success: true,
          data: filteredRooms,
          total: filteredRooms.length
        });

      case 'students':
        const filteredStudents = hostelId 
          ? mockStudents.filter(s => s.hostelId === hostelId)
          : roomId 
          ? mockStudents.filter(s => s.roomId === roomId)
          : mockStudents;
        return NextResponse.json({
          success: true,
          data: filteredStudents,
          total: filteredStudents.length
        });

      case 'facilities':
        const filteredFacilities = hostelId 
          ? mockFacilities.filter(f => f.hostelId === hostelId)
          : mockFacilities;
        return NextResponse.json({
          success: true,
          data: filteredFacilities,
          total: filteredFacilities.length
        });

      case 'analytics':
        return NextResponse.json({
          success: true,
          data: {
            totalHostels: mockHostels.length,
            totalCapacity: mockHostels.reduce((sum, h) => sum + h.capacity, 0),
            totalOccupied: mockHostels.reduce((sum, h) => sum + h.occupied, 0),
            totalAvailable: mockHostels.reduce((sum, h) => sum + h.available, 0),
            occupancyRate: 92.1,
            totalRooms: mockRooms.length,
            availableRooms: mockRooms.filter(r => r.available > 0).length,
            monthlyRevenue: 2750000,
            pendingFees: 185000,
            maintenanceRequests: 5,
            occupancyTrend: [
              { month: 'Jan', rate: 92.1 },
              { month: 'Dec', rate: 90.5 },
              { month: 'Nov', rate: 89.8 }
            ],
            facilityUtilization: [
              { facility: 'Mess Hall', utilization: 95 },
              { facility: 'Study Hall', utilization: 78 },
              { facility: 'Recreation Room', utilization: 65 }
            ]
          }
        });

      default:
        return NextResponse.json({
          success: true,
          data: mockHostels,
          total: mockHostels.length
        });
    }
  } catch (error) {
    console.error('Error fetching hostel data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch hostel data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, ...data } = body;

    switch (type) {
      case 'hostel':
        const newHostel = {
          id: (mockHostels.length + 1).toString(),
          ...data,
          occupied: 0,
          available: data.capacity || 0,
          status: 'Active',
          createdAt: new Date().toISOString()
        };
        mockHostels.push(newHostel);
        return NextResponse.json({
          success: true,
          message: 'Hostel created successfully',
          data: newHostel
        });

      case 'room':
        const newRoom = {
          id: (mockRooms.length + 1).toString(),
          ...data,
          students: [],
          occupied: 0,
          available: data.capacity || 0,
          status: 'Available',
          createdAt: new Date().toISOString()
        };
        mockRooms.push(newRoom);
        return NextResponse.json({
          success: true,
          message: 'Room created successfully',
          data: newRoom
        });

      case 'admission':
        const newStudent = {
          id: `S${(mockStudents.length + 1).toString().padStart(3, '0')}`,
          ...data,
          admissionDate: new Date().toISOString().split('T')[0],
          feeStatus: 'Pending',
          guardianVisits: 0,
          disciplinaryRecord: 'Clean'
        };
        mockStudents.push(newStudent);

        // Update room occupancy
        const room = mockRooms.find(r => r.id === data.roomId);
        if (room) {
          room.students.push({
            id: newStudent.id,
            name: newStudent.name,
            class: newStudent.class,
            rollNo: newStudent.rollNo
          });
          room.occupied = room.students.length;
          room.available = room.capacity - room.occupied;
          room.status = room.available === 0 ? 'Occupied' : 'Partially Occupied';
        }

        return NextResponse.json({
          success: true,
          message: 'Student admission successful',
          data: newStudent
        });

      case 'facility':
        const newFacility = {
          id: (mockFacilities.length + 1).toString(),
          ...data,
          status: 'Active',
          createdAt: new Date().toISOString()
        };
        mockFacilities.push(newFacility);
        return NextResponse.json({
          success: true,
          message: 'Facility added successfully',
          data: newFacility
        });

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid request type' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error creating hostel data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create hostel data' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, id, ...updateData } = body;

    switch (type) {
      case 'hostel':
        const hostelIndex = mockHostels.findIndex(h => h.id === id);
        if (hostelIndex === -1) {
          return NextResponse.json(
            { success: false, error: 'Hostel not found' },
            { status: 404 }
          );
        }
        mockHostels[hostelIndex] = { ...mockHostels[hostelIndex], ...updateData };
        return NextResponse.json({
          success: true,
          message: 'Hostel updated successfully',
          data: mockHostels[hostelIndex]
        });

      case 'room':
        const roomIndex = mockRooms.findIndex(r => r.id === id);
        if (roomIndex === -1) {
          return NextResponse.json(
            { success: false, error: 'Room not found' },
            { status: 404 }
          );
        }
        mockRooms[roomIndex] = { ...mockRooms[roomIndex], ...updateData };
        return NextResponse.json({
          success: true,
          message: 'Room updated successfully',
          data: mockRooms[roomIndex]
        });

      case 'student':
        const studentIndex = mockStudents.findIndex(s => s.id === id);
        if (studentIndex === -1) {
          return NextResponse.json(
            { success: false, error: 'Student not found' },
            { status: 404 }
          );
        }
        mockStudents[studentIndex] = { ...mockStudents[studentIndex], ...updateData };
        return NextResponse.json({
          success: true,
          message: 'Student updated successfully',
          data: mockStudents[studentIndex]
        });

      case 'facility':
        const facilityIndex = mockFacilities.findIndex(f => f.id === id);
        if (facilityIndex === -1) {
          return NextResponse.json(
            { success: false, error: 'Facility not found' },
            { status: 404 }
          );
        }
        mockFacilities[facilityIndex] = { ...mockFacilities[facilityIndex], ...updateData };
        return NextResponse.json({
          success: true,
          message: 'Facility updated successfully',
          data: mockFacilities[facilityIndex]
        });

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid request type' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error updating hostel data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update hostel data' },
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
      case 'hostel':
        const hostelIndex = mockHostels.findIndex(h => h.id === id);
        if (hostelIndex === -1) {
          return NextResponse.json(
            { success: false, error: 'Hostel not found' },
            { status: 404 }
          );
        }
        mockHostels.splice(hostelIndex, 1);
        return NextResponse.json({
          success: true,
          message: 'Hostel deleted successfully'
        });

      case 'room':
        const roomIndex = mockRooms.findIndex(r => r.id === id);
        if (roomIndex === -1) {
          return NextResponse.json(
            { success: false, error: 'Room not found' },
            { status: 404 }
          );
        }
        mockRooms.splice(roomIndex, 1);
        return NextResponse.json({
          success: true,
          message: 'Room deleted successfully'
        });

      case 'student':
        const studentIndex = mockStudents.findIndex(s => s.id === id);
        if (studentIndex === -1) {
          return NextResponse.json(
            { success: false, error: 'Student not found' },
            { status: 404 }
          );
        }
        
        // Remove student from room
        const student = mockStudents[studentIndex];
        const room = mockRooms.find(r => r.id === student.roomId);
        if (room) {
          room.students = room.students.filter(s => s.id !== id);
          room.occupied = room.students.length;
          room.available = room.capacity - room.occupied;
          room.status = room.occupied === 0 ? 'Available' : 
                       room.available === 0 ? 'Occupied' : 'Partially Occupied';
        }
        
        mockStudents.splice(studentIndex, 1);
        return NextResponse.json({
          success: true,
          message: 'Student removed successfully'
        });

      case 'facility':
        const facilityIndex = mockFacilities.findIndex(f => f.id === id);
        if (facilityIndex === -1) {
          return NextResponse.json(
            { success: false, error: 'Facility not found' },
            { status: 404 }
          );
        }
        mockFacilities.splice(facilityIndex, 1);
        return NextResponse.json({
          success: true,
          message: 'Facility deleted successfully'
        });

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid request type' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error deleting hostel data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete hostel data' },
      { status: 500 }
    );
  }
}