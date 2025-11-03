import React, { useState, useEffect } from 'react';
import { Save, X, UserCheck, Users, Calendar, Clock, Filter, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Modal } from "../Modal";
import { Button } from '../Button';
import { Input } from '../Input';
import { Select, SelectItem } from '../Select';
import { Card } from '../Card';
import { Badge } from '../Badge';

interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  class: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  timeIn?: string;
  timeOut?: string;
  remarks?: string;
}

interface BulkAttendanceData {
  classId: string;
  className: string;
  date: string;
  subject?: string;
  period?: string;
  students: {
    id: string;
    name: string;
    rollNumber: string;
    status: 'present' | 'absent' | 'late' | 'excused';
    timeIn?: string;
    remarks?: string;
  }[];
}

interface AttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'bulk_entry' | 'individual_entry' | 'attendance_report' | 'mark_attendance';
  onSubmit: (data: any) => Promise<void>;
  initialData?: any;
  classes?: any[];
  students?: any[];
  existingAttendance?: AttendanceRecord[];
}

const ATTENDANCE_STATUSES = [
  { value: 'present', label: 'Present', color: 'success', icon: CheckCircle },
  { value: 'absent', label: 'Absent', color: 'destructive', icon: XCircle },
  { value: 'late', label: 'Late', color: 'warning', icon: Clock },
  { value: 'excused', label: 'Excused', color: 'secondary', icon: AlertCircle }
];

const PERIODS = [
  '1st Period', '2nd Period', '3rd Period', '4th Period', '5th Period',
  '6th Period', '7th Period', '8th Period'
];

export const AttendanceModal: React.FC<AttendanceModalProps> = ({
  isOpen,
  onClose,
  mode,
  onSubmit,
  initialData = {},
  classes = [],
  students = [],
  existingAttendance = []
}) => {
  const [bulkData, setBulkData] = useState<BulkAttendanceData>({
    classId: '',
    className: '',
    date: new Date().toISOString().split('T')[0],
    subject: '',
    period: '',
    students: []
  });

  const [individualData, setIndividualData] = useState({
    studentId: '',
    studentName: '',
    class: '',
    date: new Date().toISOString().split('T')[0],
    status: 'present' as const,
    timeIn: '',
    timeOut: '',
    remarks: ''
  });

  const [reportFilters, setReportFilters] = useState({
    classId: '',
    startDate: '',
    endDate: '',
    status: '',
    studentId: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (isOpen) {
      const today = new Date().toISOString().split('T')[0];
      
      if (mode === 'bulk_entry' || mode === 'mark_attendance') {
        setBulkData({
          classId: '',
          className: '',
          date: today,
          subject: '',
          period: '',
          students: []
        });
      } else if (mode === 'individual_entry') {
        setIndividualData({
          studentId: '',
          studentName: '',
          class: '',
          date: today,
          status: 'present',
          timeIn: '',
          timeOut: '',
          remarks: ''
        });
      } else if (mode === 'attendance_report') {
        setReportFilters({
          classId: '',
          startDate: '',
          endDate: today,
          status: '',
          studentId: ''
        });
      }
      
      setErrors({});
      setSearchTerm('');
    }
  }, [isOpen, mode, initialData]);

  const validateBulkEntry = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!bulkData.classId) {
      newErrors.classId = 'Class selection is required';
    }

    if (!bulkData.date) {
      newErrors.date = 'Date is required';
    }

    if (bulkData.students.length === 0) {
      newErrors.students = 'No students loaded for attendance';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateIndividualEntry = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!individualData.studentId) {
      newErrors.studentId = 'Student selection is required';
    }

    if (!individualData.date) {
      newErrors.date = 'Date is required';
    }

    if (individualData.status === 'present' || individualData.status === 'late') {
      if (!individualData.timeIn) {
        newErrors.timeIn = 'Time in is required for present/late status';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = false;
    if (mode === 'bulk_entry' || mode === 'mark_attendance') {
      isValid = validateBulkEntry();
    } else if (mode === 'individual_entry') {
      isValid = validateIndividualEntry();
    }

    if (!isValid && mode !== 'attendance_report') return;

    setIsSubmitting(true);

    try {
      if (mode === 'bulk_entry' || mode === 'mark_attendance') {
        await onSubmit(bulkData);
      } else if (mode === 'individual_entry') {
        const record: AttendanceRecord = {
          id: `attendance-${Date.now()}`,
          ...individualData,
          studentName: students.find(s => s.id === individualData.studentId)?.name || ''
        };
        await onSubmit(record);
      } else if (mode === 'attendance_report') {
        await onSubmit(reportFilters);
      }
      onClose();
    } catch (error) {
      console.error('Failed to save:', error);
      setErrors({ submit: 'Failed to save attendance. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClassSelect = (classId: string) => {
    const selectedClass = classes.find(c => c.id === classId);
    if (selectedClass) {
      setSelectedClass(selectedClass);
      setBulkData(prev => ({
        ...prev,
        classId,
        className: selectedClass.name,
        students: selectedClass.enrolledStudents.map((studentId: string, index: number) => ({
          id: studentId,
          name: `Student ${index + 1}`,
          rollNumber: `${String(index + 1).padStart(3, '0')}`,
          status: 'present' as const,
          timeIn: '09:00',
          remarks: ''
        }))
      }));
    }
  };

  const updateStudentStatus = (studentId: string, field: string, value: any) => {
    setBulkData(prev => ({
      ...prev,
      students: prev.students.map(student =>
        student.id === studentId ? { ...student, [field]: value } : student
      )
    }));
  };

  const markAllStudents = (status: 'present' | 'absent') => {
    setBulkData(prev => ({
      ...prev,
      students: prev.students.map(student => ({
        ...student,
        status,
        timeIn: status === 'present' ? '09:00' : undefined
      }))
    }));
  };

  const getModalTitle = () => {
    switch (mode) {
      case 'bulk_entry': return 'Bulk Attendance Entry';
      case 'mark_attendance': return 'Mark Attendance';
      case 'individual_entry': return 'Individual Attendance';
      case 'attendance_report': return 'Attendance Report';
      default: return 'Attendance Management';
    }
  };

  const filteredStudents = bulkData.students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.includes(searchTerm)
  );

  const renderBulkEntryForm = () => (
    <div className="space-y-6">
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Users className="w-5 h-5" />
          Class Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Class *
            </label>
            <Select
              value={bulkData.classId}
              onChange={(e) => handleClassSelect(e.target.value)}
              className={errors.classId ? 'border-red-500' : ''}
            >
              <SelectItem value="">Select Class</SelectItem>
              {classes.map(cls => (
                <SelectItem key={cls.id} value={cls.id}>
                  {cls.name} - {cls.grade}{cls.section}
                </SelectItem>
              ))}
            </Select>
            {errors.classId && <p className="text-red-500 text-sm mt-1">{errors.classId}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date *
            </label>
            <Input
              type="date"
              value={bulkData.date}
              onChange={(e) => setBulkData(prev => ({ ...prev, date: e.target.value }))}
              className={errors.date ? 'border-red-500' : ''}
            />
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Period
            </label>
            <Select
              value={bulkData.period}
              onChange={(e) => setBulkData(prev => ({ ...prev, period: e.target.value }))}
            >
              <SelectItem value="">Select Period</SelectItem>
              {PERIODS.map(period => (
                <SelectItem key={period} value={period}>
                  {period}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <Input
              type="text"
              value={bulkData.subject}
              onChange={(e) => setBulkData(prev => ({ ...prev, subject: e.target.value }))}
              placeholder="Enter subject name"
            />
          </div>
        </div>
      </Card>

      {bulkData.students.length > 0 && (
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <UserCheck className="w-5 h-5" />
              Student Attendance ({bulkData.students.length} students)
            </h3>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => markAllStudents('present')}
              >
                <CheckCircle className="w-4 h-4 mr-1 text-green-600" />
                Mark All Present
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => markAllStudents('absent')}
              >
                <XCircle className="w-4 h-4 mr-1 text-red-600" />
                Mark All Absent
              </Button>
            </div>
          </div>

          <div className="mb-4">
            <Input
              type="text"
              placeholder="Search students by name or roll number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredStudents.map(student => {
              const statusConfig = ATTENDANCE_STATUSES.find(s => s.value === student.status);
              const StatusIcon = statusConfig?.icon || CheckCircle;
              
              return (
                <div key={student.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {student.rollNumber}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-500">Roll No: {student.rollNumber}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    {(student.status === 'present' || student.status === 'late') && (
                      <div className="flex items-center space-x-2">
                        <label className="text-sm text-gray-600">Time In:</label>
                        <Input
                          type="time"
                          value={student.timeIn || ''}
                          onChange={(e) => updateStudentStatus(student.id, 'timeIn', e.target.value)}
                          className="w-32"
                        />
                      </div>
                    )}

                    <Select
                      value={student.status}
                      onChange={(e) => updateStudentStatus(student.id, 'status', e.target.value)}
                      className="w-32"
                    >
                      {ATTENDANCE_STATUSES.map(status => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </Select>

                    <Badge variant={statusConfig?.color as any} size="sm">
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {statusConfig?.label}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>

          {errors.students && <p className="text-red-500 text-sm mt-2">{errors.students}</p>}

          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="font-semibold text-green-600">
                  {bulkData.students.filter(s => s.status === 'present').length}
                </div>
                <div className="text-gray-600">Present</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-red-600">
                  {bulkData.students.filter(s => s.status === 'absent').length}
                </div>
                <div className="text-gray-600">Absent</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-yellow-600">
                  {bulkData.students.filter(s => s.status === 'late').length}
                </div>
                <div className="text-gray-600">Late</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-blue-600">
                  {bulkData.students.filter(s => s.status === 'excused').length}
                </div>
                <div className="text-gray-600">Excused</div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );

  const renderIndividualEntryForm = () => (
    <div className="space-y-6">
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <UserCheck className="w-5 h-5" />
          Individual Attendance
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Student *
            </label>
            <Select
              value={individualData.studentId}
              onChange={(e) => {
                const student = students.find(s => s.id === e.target.value);
                setIndividualData(prev => ({
                  ...prev,
                  studentId: e.target.value,
                  studentName: student?.name || '',
                  class: student?.class || ''
                }));
              }}
              className={errors.studentId ? 'border-red-500' : ''}
            >
              <SelectItem value="">Select Student</SelectItem>
              {students.map(student => (
                <SelectItem key={student.id} value={student.id}>
                  {student.name} - {student.class}
                </SelectItem>
              ))}
            </Select>
            {errors.studentId && <p className="text-red-500 text-sm mt-1">{errors.studentId}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date *
            </label>
            <Input
              type="date"
              value={individualData.date}
              onChange={(e) => setIndividualData(prev => ({ ...prev, date: e.target.value }))}
              className={errors.date ? 'border-red-500' : ''}
            />
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Attendance Status *
            </label>
            <Select
              value={individualData.status}
              onChange={(e) => setIndividualData(prev => ({ ...prev, status: e.target.value as any }))}
            >
              {ATTENDANCE_STATUSES.map(status => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </Select>
          </div>

          {(individualData.status === 'present' || individualData.status === 'late') && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time In *
                </label>
                <Input
                  type="time"
                  value={individualData.timeIn}
                  onChange={(e) => setIndividualData(prev => ({ ...prev, timeIn: e.target.value }))}
                  className={errors.timeIn ? 'border-red-500' : ''}
                />
                {errors.timeIn && <p className="text-red-500 text-sm mt-1">{errors.timeIn}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time Out
                </label>
                <Input
                  type="time"
                  value={individualData.timeOut}
                  onChange={(e) => setIndividualData(prev => ({ ...prev, timeOut: e.target.value }))}
                />
              </div>
            </>
          )}

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Remarks
            </label>
            <Input
              type="text"
              value={individualData.remarks}
              onChange={(e) => setIndividualData(prev => ({ ...prev, remarks: e.target.value }))}
              placeholder="Additional notes (optional)"
            />
          </div>
        </div>
      </Card>
    </div>
  );

  const renderAttendanceReportForm = () => (
    <div className="space-y-6">
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Report Filters
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Class
            </label>
            <Select
              value={reportFilters.classId}
              onChange={(e) => setReportFilters(prev => ({ ...prev, classId: e.target.value }))}
            >
              <SelectItem value="">All Classes</SelectItem>
              {classes.map(cls => (
                <SelectItem key={cls.id} value={cls.id}>
                  {cls.name} - {cls.grade}{cls.section}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Student
            </label>
            <Select
              value={reportFilters.studentId}
              onChange={(e) => setReportFilters(prev => ({ ...prev, studentId: e.target.value }))}
            >
              <SelectItem value="">All Students</SelectItem>
              {students.map(student => (
                <SelectItem key={student.id} value={student.id}>
                  {student.name} - {student.class}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <Input
              type="date"
              value={reportFilters.startDate}
              onChange={(e) => setReportFilters(prev => ({ ...prev, startDate: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <Input
              type="date"
              value={reportFilters.endDate}
              onChange={(e) => setReportFilters(prev => ({ ...prev, endDate: e.target.value }))}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Attendance Status
            </label>
            <Select
              value={reportFilters.status}
              onChange={(e) => setReportFilters(prev => ({ ...prev, status: e.target.value }))}
            >
              <SelectItem value="">All Statuses</SelectItem>
              {ATTENDANCE_STATUSES.map(status => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      title={getModalTitle()}
      icon={<UserCheck className="w-6 h-6 text-blue-500" />}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <div className="text-red-800 text-sm">{errors.submit}</div>
          </div>
        )}

        {(mode === 'bulk_entry' || mode === 'mark_attendance') && renderBulkEntryForm()}
        {mode === 'individual_entry' && renderIndividualEntryForm()}
        {mode === 'attendance_report' && renderAttendanceReportForm()}

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                {mode === 'attendance_report' ? 'Generate Report' : 'Save Attendance'}
              </>
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};