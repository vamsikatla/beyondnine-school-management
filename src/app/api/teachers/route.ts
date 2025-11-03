import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // teachers, leave, performance, payroll

    switch (type) {
      case 'teachers':
        return NextResponse.json({
          success: true,
          data: {
            teachers: [
              {
                id: '1',
                employeeId: 'EMP001',
                name: 'Dr. Meera Gupta',
                email: 'meera.gupta@greenvalley.edu',
                phone: '+91 9876543213',
                address: '123 Teacher Colony, Mumbai',
                department: 'Mathematics',
                subject: 'Advanced Mathematics',
                qualification: 'Ph.D in Mathematics, M.Sc, B.Ed',
                experience: 8,
                joinDate: '2020-06-15',
                status: 'ACTIVE',
                employmentType: 'FULL_TIME',
                salary: 65000,
                performance: {
                  rating: 4.8,
                  reviews: 156,
                  studentFeedback: 4.7
                },
                classes: ['11-A', '11-B', '12-A'],
                subjects: ['Calculus', 'Algebra', 'Trigonometry'],
                schedule: {
                  monday: ['9:00-10:00', '11:00-12:00'],
                  tuesday: ['10:00-11:00', '2:00-3:00'],
                  wednesday: ['9:00-10:00', '1:00-2:00'],
                  thursday: ['11:00-12:00', '3:00-4:00'],
                  friday: ['9:00-10:00', '10:00-11:00'],
                  saturday: ['9:00-10:00']
                },
                achievements: ['Best Teacher Award 2023', 'Research Publication in Mathematics Journal'],
                documents: {
                  resume: true,
                  certificates: true,
                  idProof: true,
                  addressProof: true
                }
              },
              {
                id: '2',
                employeeId: 'EMP002',
                name: 'Prof. Raj Kumar',
                email: 'raj.kumar@greenvalley.edu',
                phone: '+91 9876543214',
                address: '456 Faculty Street, Delhi',
                department: 'Physics',
                subject: 'Physics',
                qualification: 'M.Sc Physics, B.Ed',
                experience: 12,
                joinDate: '2019-04-10',
                status: 'ACTIVE',
                employmentType: 'FULL_TIME',
                salary: 58000,
                performance: {
                  rating: 4.6,
                  reviews: 134,
                  studentFeedback: 4.5
                },
                classes: ['10-A', '10-B', '11-C'],
                subjects: ['Mechanics', 'Thermodynamics', 'Electronics'],
                schedule: {
                  monday: ['10:00-11:00', '2:00-3:00'],
                  tuesday: ['9:00-10:00', '1:00-2:00'],
                  wednesday: ['11:00-12:00', '3:00-4:00'],
                  thursday: ['9:00-10:00', '2:00-3:00'],
                  friday: ['11:00-12:00', '1:00-2:00'],
                  saturday: ['10:00-11:00']
                },
                achievements: ['Excellence in Teaching Award 2022', 'Science Fair Coordinator'],
                documents: {
                  resume: true,
                  certificates: true,
                  idProof: true,
                  addressProof: false
                }
              }
            ]
          }
        });

      case 'leave':
        return NextResponse.json({
          success: true,
          data: {
            leaveRequests: [
              {
                id: '1',
                teacherId: '3',
                teacherName: 'Mrs. Priya Sharma',
                type: 'MATERNITY',
                startDate: '2024-08-01',
                endDate: '2024-11-30',
                days: 120,
                reason: 'Maternity leave for childbirth and recovery',
                status: 'APPROVED',
                appliedDate: '2024-07-01',
                approvedBy: 'Principal',
                approvedDate: '2024-07-05',
                comments: 'Approved with full pay. Substitute teacher arranged.'
              },
              {
                id: '2',
                teacherId: '2',
                teacherName: 'Prof. Raj Kumar',
                type: 'SICK',
                startDate: '2024-08-20',
                endDate: '2024-08-22',
                days: 3,
                reason: 'Fever and flu symptoms',
                status: 'PENDING',
                appliedDate: '2024-08-19'
              }
            ]
          }
        });

      case 'performance':
        return NextResponse.json({
          success: true,
          data: {
            performanceData: [
              {
                teacherId: '1',
                teacherName: 'Dr. Meera Gupta',
                department: 'Mathematics',
                overallRating: 4.8,
                studentFeedback: 4.7,
                punctuality: 4.9,
                lessonPreparation: 4.8,
                classroomManagement: 4.6,
                achievements: ['Best Teacher Award 2023'],
                goals: ['Complete advanced calculus certification', 'Mentor new teachers'],
                lastReviewDate: '2024-06-15'
              },
              {
                teacherId: '2',
                teacherName: 'Prof. Raj Kumar',
                department: 'Physics',
                overallRating: 4.6,
                studentFeedback: 4.5,
                punctuality: 4.7,
                lessonPreparation: 4.8,
                classroomManagement: 4.4,
                achievements: ['Science Fair Coordinator'],
                goals: ['Improve student engagement', 'Integrate more technology'],
                lastReviewDate: '2024-06-10'
              }
            ]
          }
        });

      case 'payroll':
        return NextResponse.json({
          success: true,
          data: {
            payrollData: [
              {
                teacherId: '1',
                teacherName: 'Dr. Meera Gupta',
                basicSalary: 65000,
                allowances: {
                  houseRent: 13000,
                  transport: 3000,
                  medical: 2000
                },
                deductions: {
                  tax: 8500,
                  providentFund: 7800,
                  insurance: 1200
                },
                netSalary: 66500,
                lastPaymentDate: '2024-07-31',
                paymentStatus: 'PAID'
              },
              {
                teacherId: '2',
                teacherName: 'Prof. Raj Kumar',
                basicSalary: 58000,
                allowances: {
                  houseRent: 11600,
                  transport: 2500,
                  medical: 1800
                },
                deductions: {
                  tax: 7200,
                  providentFund: 6960,
                  insurance: 1000
                },
                netSalary: 59740,
                lastPaymentDate: '2024-07-31',
                paymentStatus: 'PAID'
              }
            ]
          }
        });

      default:
        return NextResponse.json({
          success: true,
          data: {
            stats: {
              totalTeachers: 85,
              activeTeachers: 78,
              onLeave: 5,
              newHires: 3,
              avgRating: 4.7,
              totalReviews: 1247,
              pendingLeaveRequests: 12,
              avgSalary: 58500
            },
            departmentStats: [
              { department: 'Mathematics', teachers: 15, avgRating: 4.8 },
              { department: 'Physics', teachers: 12, avgRating: 4.6 },
              { department: 'Chemistry', teachers: 10, avgRating: 4.7 },
              { department: 'English', teachers: 18, avgRating: 4.9 },
              { department: 'Computer Science', teachers: 8, avgRating: 4.5 }
            ],
            recentActivities: [
              {
                id: '1',
                type: 'LEAVE_APPROVED',
                message: 'Dr. Meera Gupta - Annual leave approved for 6 days',
                timestamp: '2024-08-15 10:30:00',
                user: 'Principal'
              },
              {
                id: '2',
                type: 'NEW_HIRE',
                message: 'Ms. Anita Singh joined Computer Science department',
                timestamp: '2024-08-14 14:20:00',
                user: 'HR Manager'
              },
              {
                id: '3',
                type: 'PERFORMANCE_REVIEW',
                message: 'Quarterly review completed for 15 teachers',
                timestamp: '2024-08-12 16:45:00',
                user: 'System'
              }
            ]
          }
        });
    }

  } catch (error) {
    console.error('Teacher Management API error:', error);
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
      case 'add_teacher':
        return NextResponse.json({
          success: true,
          data: {
            teacher: {
              id: Date.now().toString(),
              employeeId: `EMP${Date.now()}`,
              ...data,
              status: 'ACTIVE',
              joinDate: new Date().toISOString(),
              performance: {
                rating: 0,
                reviews: 0,
                studentFeedback: 0
              }
            }
          },
          message: 'Teacher added successfully'
        });

      case 'apply_leave':
        return NextResponse.json({
          success: true,
          data: {
            leaveRequest: {
              id: Date.now().toString(),
              ...data,
              status: 'PENDING',
              appliedDate: new Date().toISOString()
            }
          },
          message: 'Leave request submitted successfully'
        });

      case 'approve_leave':
        return NextResponse.json({
          success: true,
          data: {
            leaveRequest: {
              id: data.leaveId,
              status: 'APPROVED',
              approvedBy: data.approvedBy,
              approvedDate: new Date().toISOString(),
              comments: data.comments
            }
          },
          message: 'Leave request approved successfully'
        });

      case 'reject_leave':
        return NextResponse.json({
          success: true,
          data: {
            leaveRequest: {
              id: data.leaveId,
              status: 'REJECTED',
              rejectedBy: data.rejectedBy,
              rejectedDate: new Date().toISOString(),
              comments: data.comments
            }
          },
          message: 'Leave request rejected'
        });

      case 'update_performance':
        return NextResponse.json({
          success: true,
          data: {
            performance: {
              teacherId: data.teacherId,
              ...data.performanceData,
              reviewDate: new Date().toISOString(),
              reviewedBy: data.reviewedBy
            }
          },
          message: 'Performance updated successfully'
        });

      case 'process_payroll':
        return NextResponse.json({
          success: true,
          data: {
            payroll: {
              teacherId: data.teacherId,
              month: data.month,
              year: data.year,
              processedDate: new Date().toISOString(),
              status: 'PROCESSED'
            }
          },
          message: 'Payroll processed successfully'
        });

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Teacher Management API POST error:', error);
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
      message: 'Teacher information updated successfully'
    });

  } catch (error) {
    console.error('Teacher Management API PUT error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const type = searchParams.get('type');

    if (!id || !type) {
      return NextResponse.json(
        { success: false, error: 'ID and type are required' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { deletedId: id, type },
      message: `${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully`
    });

  } catch (error) {
    console.error('Teacher Management API DELETE error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}