import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Test database connection by fetching schools count
    const schoolsCount = await prisma.school.count();
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      schoolsCount: schoolsCount
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({
      success: false,
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}