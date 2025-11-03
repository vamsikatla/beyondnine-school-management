import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // courses, assignments, students, analytics

    switch (type) {
      case 'courses':
        return NextResponse.json({
          success: true,
          data: {
            courses: [
              {
                id: '1',
                title: 'Advanced Mathematics - Calculus',
                description: 'Comprehensive calculus course covering limits, derivatives, and integrals',
                instructor: 'Dr. Meera Gupta',
                instructorId: 'T001',
                category: 'Mathematics',
                level: 'ADVANCED',
                duration: 120,
                totalLessons: 24,
                completedLessons: 18,
                enrolledStudents: 45,
                maxStudents: 50,
                rating: 4.8,
                reviews: 32,
                price: 2999,
                status: 'PUBLISHED',
                createdDate: '2024-01-15',
                lastUpdated: '2024-08-10',
                tags: ['calculus', 'mathematics', 'advanced']
              },
              {
                id: '2',
                title: 'Physics - Quantum Mechanics',
                description: 'Introduction to quantum mechanics principles and applications',
                instructor: 'Prof. Raj Kumar',
                instructorId: 'T002',
                category: 'Physics',
                level: 'INTERMEDIATE',
                duration: 80,
                totalLessons: 16,
                completedLessons: 12,
                enrolledStudents: 38,
                maxStudents: 40,
                rating: 4.6,
                reviews: 28,
                price: 3499,
                status: 'PUBLISHED',
                createdDate: '2024-02-01',
                lastUpdated: '2024-08-05',
                tags: ['quantum', 'physics', 'mechanics']
              }
            ]
          }
        });

      case 'assignments':
        return NextResponse.json({
          success: true,
          data: {
            assignments: [
              {
                id: '1',
                title: 'Calculus Problem Set 5',
                courseId: '1',
                courseName: 'Advanced Mathematics - Calculus',
                description: 'Solve integration problems using various techniques',
                dueDate: '2024-08-25',
                maxScore: 100,
                submissions: 32,
                totalStudents: 45,
                status: 'ACTIVE',
                type: 'ESSAY',
                createdBy: 'Dr. Meera Gupta',
                createdDate: '2024-08-15'
              },
              {
                id: '2',
                title: 'Quantum States Quiz',
                courseId: '2',
                courseName: 'Physics - Quantum Mechanics',
                description: 'Multiple choice quiz covering quantum state principles',
                dueDate: '2024-08-20',
                maxScore: 50,
                submissions: 28,
                totalStudents: 38,
                status: 'ACTIVE',
                type: 'QUIZ',
                createdBy: 'Prof. Raj Kumar',
                createdDate: '2024-08-10'
              }
            ]
          }
        });

      case 'students':
        return NextResponse.json({
          success: true,
          data: {
            students: [
              {
                id: 'ST001',
                name: 'Aarav Sharma',
                email: 'aarav.sharma@student.greenvalley.edu',
                class: '12-A',
                enrolledCourses: 3,
                completedCourses: 1,
                totalAssignments: 15,
                submittedAssignments: 12,
                averageGrade: 88.5,
                lastActivity: '2024-08-15'
              },
              {
                id: 'ST002',
                name: 'Priya Patel',
                email: 'priya.patel@student.greenvalley.edu',
                class: '11-B',
                enrolledCourses: 2,
                completedCourses: 0,
                totalAssignments: 10,
                submittedAssignments: 9,
                averageGrade: 92.3,
                lastActivity: '2024-08-14'
              }
            ]
          }
        });

      default:
        return NextResponse.json({
          success: true,
          data: {
            stats: {
              totalCourses: 24,
              activeStudents: 1247,
              totalAssignments: 156,
              certificatesIssued: 892,
              completionRate: 85.3,
              averageRating: 4.6,
              totalInstructors: 18,
              activeLessons: 342
            },
            recentActivities: [
              {
                id: '1',
                type: 'COURSE_PUBLISHED',
                message: 'Advanced Mathematics - Calculus published by Dr. Meera Gupta',
                timestamp: '2024-08-15 10:30:00',
                user: 'Dr. Meera Gupta'
              },
              {
                id: '2',
                type: 'ASSIGNMENT_SUBMITTED',
                message: '32 students submitted Calculus Problem Set 5',
                timestamp: '2024-08-15 09:15:00',
                user: 'System'
              }
            ]
          }
        });
    }

  } catch (error) {
    console.error('LMS API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;

    switch (action) {
      case 'create_course':
        return NextResponse.json({
          success: true,
          data: {
            course: {
              id: Date.now().toString(),
              ...data,
              status: 'DRAFT',
              enrolledStudents: 0,
              completedLessons: 0,
              rating: 0,
              reviews: 0,
              createdDate: new Date().toISOString(),
              lastUpdated: new Date().toISOString()
            }
          },
          message: 'Course created successfully'
        });

      case 'create_assignment':
        return NextResponse.json({
          success: true,
          data: {
            assignment: {
              id: Date.now().toString(),
              ...data,
              submissions: 0,
              status: 'ACTIVE',
              createdDate: new Date().toISOString()
            }
          },
          message: 'Assignment created successfully'
        });

      case 'enroll_student':
        return NextResponse.json({
          success: true,
          data: {
            enrollment: {
              id: Date.now().toString(),
              studentId: data.studentId,
              courseId: data.courseId,
              enrollmentDate: new Date().toISOString(),
              progress: 0,
              status: 'ACTIVE'
            }
          },
          message: 'Student enrolled successfully'
        });

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('LMS API POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, data } = body;

    return NextResponse.json({
      success: true,
      data: {
        updated: {
          id,
          ...data,
          lastUpdated: new Date().toISOString()
        }
      },
      message: 'Updated successfully'
    });

  } catch (error) {
    console.error('LMS API PUT error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}