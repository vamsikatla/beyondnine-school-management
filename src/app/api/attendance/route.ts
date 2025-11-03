import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // students, classes, records, analytics

    switch (type) {
      case 'students':
        return NextResponse.json({
          success: true,
          data: {
            students: [
              {
                id: '1',
                studentId: 'ST001',
                name: 'Aarav Sharma',
                class: '12-A',
                rollNumber: '001',
                totalDays: 180,
                presentDays: 165,
                absentDays: 12,
                lateDays: 3,
                attendancePercentage: 91.7,
                lastAttendance: '2024-08-15',
                parentContact: '+91 9876543210',
                status: 'GOOD'
              },
              {
                id: '2',
                studentId: 'ST002',
                name: 'Priya Patel',
                class: '11-B',
                rollNumber: '025',
                totalDays: 180,
                presentDays: 172,
                absentDays: 6,
                lateDays: 2,
                attendancePercentage: 95.6,
                lastAttendance: '2024-08-15',
                parentContact: '+91 9876543211',
                status: 'GOOD'
              }
            ]
          }
        });

      case 'classes':
        return NextResponse.json({
          success: true,
          data: {
            classes: [
              {
                id: '1',
                className: '12-A',
                date: '2024-08-15',
                totalStudents: 45,
                presentStudents: 42,
                absentStudents: 2,
                lateStudents: 1,
                attendancePercentage: 93.3,
                teacher: 'Dr. Meera Gupta',
                subject: 'Mathematics',
                period: '1st Period'
              },
              {
                id: '2',
                className: '11-B',
                date: '2024-08-15',
                totalStudents: 38,
                presentStudents: 35,
                absentStudents: 3,
                lateStudents: 0,
                attendancePercentage: 92.1,
                teacher: 'Prof. Raj Kumar',
                subject: 'Physics',
                period: '2nd Period'
              }
            ]
          }
        });

      case 'records':
        return NextResponse.json({
          success: true,
          data: {
            records: [
              {
                id: '1',
                studentId: 'ST001',
                studentName: 'Aarav Sharma',
                class: '12-A',
                date: '2024-08-15',
                status: 'PRESENT',
                checkInTime: '08:45',
                checkOutTime: '15:30',
                subject: 'Mathematics',
                teacher: 'Dr. Meera Gupta'
              },
              {
                id: '2',
                studentId: 'ST002',
                studentName: 'Priya Patel',
                class: '11-B',
                date: '2024-08-15',
                status: 'LATE',
                checkInTime: '09:15',
                checkOutTime: '15:30',
                subject: 'Physics',
                teacher: 'Prof. Raj Kumar',
                notes: 'Traffic delay'
              }
            ]
          }
        });

      case 'analytics':
        return NextResponse.json({
          success: true,
          data: {
            monthlyTrends: [
              { month: 'January', percentage: 91.2 },
              { month: 'February', percentage: 89.8 },
              { month: 'March', percentage: 92.5 },
              { month: 'April', percentage: 88.9 },
              { month: 'May', percentage: 90.3 },
              { month: 'June', percentage: 93.1 },
              { month: 'July', percentage: 91.7 },
              { month: 'August', percentage: 92.4 }
            ],
            classWiseAttendance: [
              { class: '12-A', percentage: 93.5, students: 45 },
              { class: '11-B', percentage: 91.2, students: 38 },
              { class: '10-A', percentage: 88.7, students: 42 },
              { class: '9-C', percentage: 85.3, students: 35 }
            ],
            lowAttendanceStudents: [
              { studentId: 'ST004', name: 'Kavya Reddy', class: '9-C', percentage: 69.4 },
              { studentId: 'ST003', name: 'Arjun Singh', class: '10-A', percentage: 78.9 }
            ]
          }
        });

      default:
        return NextResponse.json({
          success: true,
          data: {
            stats: {
              todayAttendance: 92.4,
              totalStudents: 1247,
              presentToday: 1152,
              absentToday: 95,
              lateToday: 23,
              weeklyAverage: 89.7,
              monthlyAverage: 91.2,
              parentNotifications: 65
            },
            alerts: [
              {
                id: '1',
                type: 'LOW_ATTENDANCE',
                message: '15 students below 75% attendance threshold',
                priority: 'HIGH',
                timestamp: '2024-08-15 10:30:00'
              },
              {
                id: '2',
                type: 'PARENT_NOTIFICATION',
                message: 'Automated SMS sent to 65 parents for absent students',
                priority: 'MEDIUM',
                timestamp: '2024-08-15 09:15:00'
              }
            ],
            recentActivities: [
              {
                id: '1',
                type: 'ATTENDANCE_MARKED',
                message: 'Class 12-A attendance marked by Dr. Meera Gupta',
                timestamp: '2024-08-15 09:00:00',
                user: 'Dr. Meera Gupta'
              },
              {
                id: '2',
                type: 'ALERT_SENT',
                message: 'Low attendance alert sent for 3 students',
                timestamp: '2024-08-15 08:45:00',
                user: 'System'
              }
            ]
          }
        });
    }

  } catch (error) {
    console.error('Attendance API error:', error);
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
      case 'mark_attendance':
        return NextResponse.json({
          success: true,
          data: {
            attendance: {
              id: Date.now().toString(),
              ...data,
              markedAt: new Date().toISOString(),
              markedBy: data.teacherId
            }
          },
          message: 'Attendance marked successfully'
        });

      case 'bulk_mark_attendance':
        return NextResponse.json({
          success: true,
          data: {
            attendanceRecords: data.students.map((student: any) => ({
              id: Date.now().toString() + student.studentId,
              studentId: student.studentId,
              status: student.status,
              date: data.date,
              classId: data.classId,
              markedAt: new Date().toISOString(),
              markedBy: data.teacherId
            }))
          },
          message: `Attendance marked for ${data.students.length} students`
        });

      case 'send_notification':
        return NextResponse.json({
          success: true,
          data: {
            notification: {
              id: Date.now().toString(),
              type: data.type,
              recipients: data.recipients,
              message: data.message,
              sentAt: new Date().toISOString(),
              status: 'SENT'
            }
          },
          message: 'Notifications sent successfully'
        });

      case 'update_attendance':
        return NextResponse.json({
          success: true,
          data: {
            attendance: {
              id: data.attendanceId,
              status: data.status,
              notes: data.notes,
              updatedAt: new Date().toISOString(),
              updatedBy: data.updatedBy
            }
          },
          message: 'Attendance updated successfully'
        });

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Attendance API POST error:', error);
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
          updatedAt: new Date().toISOString()
        }
      },
      message: 'Attendance record updated successfully'
    });

  } catch (error) {
    console.error('Attendance API PUT error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}