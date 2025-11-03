import { NextResponse } from 'next/server';

// This API route is for testing purposes only
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const role = searchParams.get('role');
  
  // Mock user data for testing
  const mockUsers: Record<string, any> = {
    SUPER_ADMIN: {
      id: '1',
      email: 'admin@beyondnine.com',
      username: 'admin',
      firstName: 'Super',
      lastName: 'Admin',
      role: 'SUPER_ADMIN',
      schoolId: '1',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    SCHOOL_ADMIN: {
      id: '2',
      email: 'school@beyondnine.com',
      username: 'schooladmin',
      firstName: 'School',
      lastName: 'Admin',
      role: 'SCHOOL_ADMIN',
      schoolId: '1',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    TEACHER: {
      id: '3',
      email: 'teacher@beyondnine.com',
      username: 'teacher',
      firstName: 'John',
      lastName: 'Doe',
      role: 'TEACHER',
      schoolId: '1',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    STUDENT: {
      id: '4',
      email: 'student@beyondnine.com',
      username: 'student',
      firstName: 'Jane',
      lastName: 'Smith',
      role: 'STUDENT',
      schoolId: '1',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    PARENT: {
      id: '5',
      email: 'parent@beyondnine.com',
      username: 'parent',
      firstName: 'Robert',
      lastName: 'Johnson',
      role: 'PARENT',
      schoolId: '1',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  };

  // Mock school data
  const mockSchool = {
    id: '1',
    name: 'Green Valley International School',
    code: 'GVIS001',
    email: 'info@greenvalley.edu',
    subscriptionPlan: 'ENTERPRISE',
    subscriptionStatus: 'ACTIVE'
  };

  // Mock token (in a real app, this would be a JWT)
  const mockToken = `mock-token-for-${role}`;

  if (!role || !mockUsers[role]) {
    return NextResponse.json(
      { success: false, message: 'Invalid role specified' },
      { status: 400 }
    );
  }

  return NextResponse.json({
    success: true,
    data: {
      token: mockToken,
      user: mockUsers[role],
      school: mockSchool
    }
  });
}