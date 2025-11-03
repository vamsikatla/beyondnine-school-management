import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Test Parent credentials
    if (email === 'parent@beyondnine.com' && password === 'parent123') {
      const mockParent = {
        id: '5',
        email: 'parent@beyondnine.com',
        username: 'raj.malhotra',
        firstName: 'Raj',
        lastName: 'Malhotra',
        role: 'PARENT',
        schoolId: 'school_2',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        school: {
          id: 'school_2',
          name: 'Green Valley International School',
          code: 'GVIS001',
          email: 'admin@greenvalley.edu',
          subscriptionPlan: 'PREMIUM',
          subscriptionStatus: 'ACTIVE'
        }
      };

      // Simple token generation for testing
      const token = `test-token-${Date.now()}`;

      return NextResponse.json({
        success: true,
        data: {
          user: mockParent,
          token,
          school: mockParent.school
        },
        message: 'Parent login successful'
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid credentials for Parent' },
      { status: 401 }
    );

  } catch (error) {
    console.error('Test Parent login error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}