import { NextRequest, NextResponse } from 'next/server';

// Mock data for demonstration
const mockStudents = [
  {
    id: "ST001",
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    class: "10th A",
    rollNumber: "101",
    parentName: "Rajesh Sharma",
    parentEmail: "rajesh.sharma@example.com",
    phone: "+91 9876543210",
    address: "123 Main Street, Mumbai, Maharashtra",
    dateOfBirth: "2008-05-15",
    bloodGroup: "O+",
    status: "Active",
    feeStatus: "Paid",
    attendance: 95,
    joinDate: "2023-04-15",
    academicYear: "2023-2024",
    subjects: ["Mathematics", "Science", "English", "Hindi", "Social Studies"],
    emergencyContact: "+91 9876543211",
    medicalInfo: "No known allergies",
    previousSchool: "City Public School",
    transportRequired: true,
    hostelRequired: false
  },
  {
    id: "ST002",
    name: "Priya Patel",
    email: "priya.patel@example.com",
    class: "9th B",
    rollNumber: "205",
    parentName: "Amit Patel",
    parentEmail: "amit.patel@example.com",
    phone: "+91 9876543211",
    address: "456 Park Avenue, Delhi, NCR",
    dateOfBirth: "2009-08-22",
    bloodGroup: "A+",
    status: "Active",
    feeStatus: "Pending",
    attendance: 88,
    joinDate: "2023-04-16",
    academicYear: "2023-2024",
    subjects: ["Mathematics", "Science", "English", "Hindi", "Social Studies"],
    emergencyContact: "+91 9876543212",
    medicalInfo: "Requires glasses for reading",
    previousSchool: "Bright Future School",
    transportRequired: false,
    hostelRequired: true
  },
  {
    id: "ST003",
    name: "Arjun Singh",
    email: "arjun.singh@example.com",
    class: "11th A",
    rollNumber: "301",
    parentName: "Vikram Singh",
    parentEmail: "vikram.singh@example.com",
    phone: "+91 9876543212",
    address: "789 Garden Road, Bangalore, Karnataka",
    dateOfBirth: "2007-12-10",
    bloodGroup: "B+",
    status: "Active",
    feeStatus: "Paid",
    attendance: 92,
    joinDate: "2023-04-20",
    academicYear: "2023-2024",
    subjects: ["Mathematics", "Physics", "Chemistry", "English", "Computer Science"],
    emergencyContact: "+91 9876543213",
    medicalInfo: "Asthma - inhaler required",
    previousSchool: "Excellence Academy",
    transportRequired: true,
    hostelRequired: false
  }
];

// GET - Fetch all students or search
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const classFilter = searchParams.get('class');
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    let filteredStudents = [...mockStudents];

    // Apply search filter
    if (search) {
      filteredStudents = filteredStudents.filter(student => 
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.rollNumber.includes(search) ||
        student.email.toLowerCase().includes(search.toLowerCase()) ||
        student.parentName.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply class filter
    if (classFilter) {
      filteredStudents = filteredStudents.filter(student => 
        student.class === classFilter
      );
    }

    // Apply status filter
    if (status) {
      filteredStudents = filteredStudents.filter(student => 
        student.status === status
      );
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedStudents = filteredStudents.slice(startIndex, endIndex);

    const response = {
      success: true,
      data: {
        students: paginatedStudents,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(filteredStudents.length / limit),
          totalStudents: filteredStudents.length,
          studentsPerPage: limit
        },
        summary: {
          totalStudents: mockStudents.length,
          activeStudents: mockStudents.filter(s => s.status === 'Active').length,
          inactiveStudents: mockStudents.filter(s => s.status === 'Inactive').length,
          averageAttendance: Math.round(mockStudents.reduce((acc, s) => acc + s.attendance, 0) / mockStudents.length),
          feesPaid: mockStudents.filter(s => s.feeStatus === 'Paid').length,
          feesPending: mockStudents.filter(s => s.feeStatus === 'Pending').length
        }
      },
      message: 'Students retrieved successfully'
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch students',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}

// POST - Create new student
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'class', 'rollNumber', 'parentName', 'parentEmail', 'phone'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          {
            success: false,
            error: `Missing required field: ${field}`,
            message: 'Please provide all required fields'
          },
          { status: 400 }
        );
      }
    }

    // Check for duplicate roll number or email
    const existingStudent = mockStudents.find(s => 
      s.rollNumber === body.rollNumber || s.email === body.email
    );
    
    if (existingStudent) {
      return NextResponse.json(
        {
          success: false,
          error: 'Student already exists',
          message: 'A student with this roll number or email already exists'
        },
        { status: 409 }
      );
    }

    // Create new student
    const newStudent = {
      id: `ST${String(mockStudents.length + 1).padStart(3, '0')}`,
      name: body.name,
      email: body.email,
      class: body.class,
      rollNumber: body.rollNumber,
      parentName: body.parentName,
      parentEmail: body.parentEmail,
      phone: body.phone,
      address: body.address || '',
      dateOfBirth: body.dateOfBirth || '',
      bloodGroup: body.bloodGroup || '',
      status: 'Active',
      feeStatus: 'Pending',
      attendance: 0,
      joinDate: new Date().toISOString().split('T')[0],
      academicYear: body.academicYear || '2023-2024',
      subjects: body.subjects || [],
      emergencyContact: body.emergencyContact || '',
      medicalInfo: body.medicalInfo || '',
      previousSchool: body.previousSchool || '',
      transportRequired: body.transportRequired || false,
      hostelRequired: body.hostelRequired || false
    };

    // In a real application, this would be saved to the database
    mockStudents.push(newStudent);

    return NextResponse.json(
      {
        success: true,
        data: newStudent,
        message: 'Student created successfully'
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create student',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}

// PUT - Update student (bulk update or specific updates)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { studentIds, updates } = body;

    if (!studentIds || !Array.isArray(studentIds) || studentIds.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid student IDs',
          message: 'Please provide valid student IDs for update'
        },
        { status: 400 }
      );
    }

    const updatedStudents = [];
    const notFoundStudents = [];

    for (const studentId of studentIds) {
      const studentIndex = mockStudents.findIndex(s => s.id === studentId);
      
      if (studentIndex === -1) {
        notFoundStudents.push(studentId);
        continue;
      }

      // Update student with provided fields
      Object.keys(updates).forEach(key => {
        if (updates[key] !== undefined) {
          (mockStudents[studentIndex] as any)[key] = updates[key];
        }
      });

      updatedStudents.push(mockStudents[studentIndex]);
    }

    return NextResponse.json({
      success: true,
      data: {
        updatedStudents,
        updatedCount: updatedStudents.length,
        notFoundStudents
      },
      message: `${updatedStudents.length} student(s) updated successfully`
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update students',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete students
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const studentIds = searchParams.get('ids')?.split(',') || [];

    if (studentIds.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'No student IDs provided',
          message: 'Please provide student IDs to delete'
        },
        { status: 400 }
      );
    }

    const deletedStudents: typeof mockStudents = [];
    const notFoundStudents: string[] = [];

    studentIds.forEach(studentId => {
      const studentIndex = mockStudents.findIndex(s => s.id === studentId);
      
      if (studentIndex === -1) {
        notFoundStudents.push(studentId);
        return;
      }

      const deletedStudent = mockStudents.splice(studentIndex, 1)[0];
      deletedStudents.push(deletedStudent);
    });

    return NextResponse.json({
      success: true,
      data: {
        deletedStudents,
        deletedCount: deletedStudents.length,
        notFoundStudents
      },
      message: `${deletedStudents.length} student(s) deleted successfully`
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete students',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}