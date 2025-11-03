import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    console.log('Testing database connection...');
    
    // Test connection by querying the database
    const schools = await prisma.school.findMany();
    console.log(`Found ${schools.length} schools in the database`);
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      schoolsCount: schools.length
    });
  } catch (error) {
    console.error('Database connection failed:', error);
    return NextResponse.json({
      success: false,
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}