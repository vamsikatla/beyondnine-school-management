import { NextRequest, NextResponse } from 'next/server';
import { AuthUtils } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Test token generation
    const testPayload = {
      userId: 'test-user-id',
      email: 'test@example.com',
      role: 'PARENT',
      schoolId: 'test-school-id'
    };
    
    console.log('Testing AuthUtils with payload:', testPayload);
    
    const token = AuthUtils.generateToken(testPayload);
    console.log('Generated token:', token);
    
    // Test token verification
    const decoded = AuthUtils.verifyToken(token);
    console.log('Decoded token:', decoded);
    
    return NextResponse.json({
      success: true,
      token,
      decoded
    });
  } catch (error) {
    console.error('AuthUtils test error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}