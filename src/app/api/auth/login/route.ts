import { NextRequest, NextResponse } from 'next/server';
import { AuthUtils } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { email, password, schoolCode } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // For demo purposes, return mock data
    if (email === 'admin@beyondnine.com' && password === 'admin123') {
      const mockUser = {
        id: '1',
        email: 'admin@beyondnine.com',
        username: 'admin',
        firstName: 'Super',
        lastName: 'Admin',
        role: 'SUPER_ADMIN',
        schoolId: 'school_1',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        school: {
          id: 'school_1',
          name: 'BeyondNine Platform',
          code: 'BN001',
          email: 'platform@beyondnine.com',
          subscriptionPlan: 'ENTERPRISE',
          subscriptionStatus: 'ACTIVE'
        }
      };

      const token = AuthUtils.generateToken({
        userId: mockUser.id,
        email: mockUser.email,
        role: mockUser.role,
        schoolId: mockUser.schoolId
      });

      return NextResponse.json({
        success: true,
        data: {
          user: mockUser,
          token,
          school: mockUser.school
        },
        message: 'Login successful'
      });
    }

    // Student mock login
    if (email === 'student@beyondnine.com' && password === 'student123') {
      const mockStudent = {
        id: '2',
        email: 'student@beyondnine.com',
        username: 'aarav.sharma',
        firstName: 'Aarav',
        lastName: 'Sharma',
        role: 'STUDENT',
        schoolId: 'school_2',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        school: {
          id: 'school_2',
          name: 'Green Valley International School',
          code: 'GVIS001',
          email: 'admin@greenvalley.edu',
          subscriptionPlan: 'PREMIUM',
          subscriptionStatus: 'ACTIVE'
        }
      };

      const token = AuthUtils.generateToken({
        userId: mockStudent.id,
        email: mockStudent.email,
        role: mockStudent.role,
        schoolId: mockStudent.schoolId
      });

      return NextResponse.json({
        success: true,
        data: {
          user: mockStudent,
          token,
          school: mockStudent.school
        },
        message: 'Login successful'
      });
    }

    // School Admin mock login
    if (email === 'school@beyondnine.com' && password === 'school123') {
      const mockSchoolAdmin = {
        id: '3',
        email: 'school@beyondnine.com',
        username: 'school.admin',
        firstName: 'Sarah',
        lastName: 'Johnson',
        role: 'SCHOOL_ADMIN',
        schoolId: 'school_2',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        school: {
          id: 'school_2',
          name: 'Green Valley International School',
          code: 'GVIS001',
          email: 'admin@greenvalley.edu',
          subscriptionPlan: 'PREMIUM',
          subscriptionStatus: 'ACTIVE'
        }
      };

      const token = AuthUtils.generateToken({
        userId: mockSchoolAdmin.id,
        email: mockSchoolAdmin.email,
        role: mockSchoolAdmin.role,
        schoolId: mockSchoolAdmin.schoolId
      });

      return NextResponse.json({
        success: true,
        data: {
          user: mockSchoolAdmin,
          token,
          school: mockSchoolAdmin.school
        },
        message: 'Login successful'
      });
    }

    // Teacher mock login
    if (email === 'teacher@beyondnine.com' && password === 'teacher123') {
      const mockTeacher = {
        id: '4',
        email: 'teacher@beyondnine.com',
        username: 'meera.gupta',
        firstName: 'Meera',
        lastName: 'Gupta',
        role: 'TEACHER',
        schoolId: 'school_2',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        school: {
          id: 'school_2',
          name: 'Green Valley International School',
          code: 'GVIS001',
          email: 'admin@greenvalley.edu',
          subscriptionPlan: 'PREMIUM',
          subscriptionStatus: 'ACTIVE'
        }
      };

      const token = AuthUtils.generateToken({
        userId: mockTeacher.id,
        email: mockTeacher.email,
        role: mockTeacher.role,
        schoolId: mockTeacher.schoolId
      });

      return NextResponse.json({
        success: true,
        data: {
          user: mockTeacher,
          token,
          school: mockTeacher.school
        },
        message: 'Login successful'
      });
    }

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
        createdAt: new Date(),
        updatedAt: new Date(),
        school: {
          id: 'school_2',
          name: 'Green Valley International School',
          code: 'GVIS001',
          email: 'admin@greenvalley.edu',
          subscriptionPlan: 'PREMIUM',
          subscriptionStatus: 'ACTIVE'
        }
      };

      const token = AuthUtils.generateToken({
        userId: mockParent.id,
        email: mockParent.email,
        role: mockParent.role,
        schoolId: mockParent.schoolId
      });

      return NextResponse.json({
        success: true,
        data: {
          user: mockParent,
          token,
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
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}