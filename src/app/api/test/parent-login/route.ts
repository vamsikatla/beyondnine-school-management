import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    console.log('Test login attempt:', { email, password });
    
    // Parent mock login
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

      return NextResponse.json({
        success: true,
        data: {
          user: mockParent,
          token: 'test-jwt-token-for-parent',
          school: mockParent.school
        },
        message: 'Login successful'
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Test login error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}