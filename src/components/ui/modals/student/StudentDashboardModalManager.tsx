"use client";

import React from 'react';
import { useStudentModal, StudentModalType } from '@/contexts/StudentModalContext';

// Import all student modal components
import StudentGradesModal from './StudentGradesModal';
import StudentAssignmentsModal from './StudentAssignmentsModal';
import StudentAttendanceModal from './StudentAttendanceModal';
import StudentFeeDetailsModal from './StudentFeeDetailsModal';
import StudentProfileModal from './StudentProfileModal';
import StudentExamScheduleModal from './StudentExamScheduleModal';
import StudentTimetableModal from './StudentTimetableModal';
import StudentNotificationsModal from './StudentNotificationsModal';
import StudentLibraryModal from './StudentLibraryModal';
import StudentEventsModal from './StudentEventsModal';
import StudentProgressModal from './StudentProgressModal';
import StudentHelpSupportModal from './StudentHelpSupportModal';

const StudentDashboardModalManager: React.FC = () => {
  const { currentModal, closeModal } = useStudentModal();

  if (!currentModal.isOpen || !currentModal.type) {
    return null;
  }

  const { type, props, onConfirm } = currentModal;

  const renderModal = () => {
    switch (type) {
      // Academic Modals
      case StudentModalType.VIEW_GRADES:
        return (
          <StudentGradesModal
            isOpen={true}
            onClose={closeModal}
            studentId={props.studentId || ''}
            subjectId={props.subjectId}
            termId={props.termId}
            onViewDetails={onConfirm}
          />
        );

      case StudentModalType.VIEW_ASSIGNMENTS:
        return (
          <StudentAssignmentsModal
            isOpen={true}
            onClose={closeModal}
            studentId={props.studentId || ''}
            subjectId={props.subjectId}
            status={props.status}
            onSubmitAssignment={onConfirm}
          />
        );

      case StudentModalType.SUBMIT_ASSIGNMENT:
        return (
          <StudentAssignmentsModal
            isOpen={true}
            onClose={closeModal}
            studentId={props.studentId || ''}
            subjectId={props.subjectId}
            status="pending"
            onSubmitAssignment={onConfirm}
          />
        );

      case StudentModalType.VIEW_EXAM_SCHEDULE:
        return (
          <StudentExamScheduleModal
            isOpen={true}
            onClose={closeModal}
            studentId={props.studentId || ''}
            upcomingOnly={props.upcomingOnly}
            onViewExamDetails={onConfirm}
          />
        );

      case StudentModalType.VIEW_TIMETABLE:
        return (
          <StudentTimetableModal
            isOpen={true}
            onClose={closeModal}
            studentId={props.studentId || ''}
          />
        );

      // Attendance Modals
      case StudentModalType.VIEW_ATTENDANCE:
        return (
          <StudentAttendanceModal
            isOpen={true}
            onClose={closeModal}
            studentId={props.studentId || ''}
            dateRange={props.dateRange}
            subjectId={props.subjectId}
          />
        );

      case StudentModalType.REQUEST_LEAVE:
        return (
          <StudentAttendanceModal
            isOpen={true}
            onClose={closeModal}
            studentId={props.studentId || ''}
          />
        );

      // Fee Management Modals
      case StudentModalType.VIEW_FEE_DETAILS:
        return (
          <StudentFeeDetailsModal
            isOpen={true}
            onClose={closeModal}
            studentId={props.studentId || ''}
          />
        );

      case StudentModalType.PAY_FEES:
        return (
          <StudentFeeDetailsModal
            isOpen={true}
            onClose={closeModal}
            studentId={props.studentId || ''}
            feeId={props.feeId}
            showPaymentForm={true}
            onPaymentSuccess={onConfirm}
          />
        );

      case StudentModalType.VIEW_PAYMENT_HISTORY:
        return (
          <StudentFeeDetailsModal
            isOpen={true}
            onClose={closeModal}
            studentId={props.studentId || ''}
            activeTab="history"
          />
        );

      // Profile & Settings Modals
      case StudentModalType.VIEW_PROFILE:
        return (
          <StudentProfileModal
            isOpen={true}
            onClose={closeModal}
            studentId={props.studentId || ''}
            mode="view"
          />
        );

      case StudentModalType.EDIT_PROFILE:
        return (
          <StudentProfileModal
            isOpen={true}
            onClose={closeModal}
            studentId={props.studentId || ''}
            mode="edit"
            onSave={onConfirm}
          />
        );

      case StudentModalType.CHANGE_PASSWORD:
        return (
          <StudentProfileModal
            isOpen={true}
            onClose={closeModal}
            studentId={props.studentId || ''}
            mode="password"
            onSave={onConfirm}
          />
        );

      case StudentModalType.PREFERENCES:
        return (
          <StudentProfileModal
            isOpen={true}
            onClose={closeModal}
            studentId={props.studentId || ''}
            mode="preferences"
            onSave={onConfirm}
          />
        );

      // Communication & Notifications
      case StudentModalType.VIEW_NOTIFICATIONS:
        return (
          <StudentNotificationsModal
            isOpen={true}
            onClose={closeModal}
            studentId={props.studentId || ''}
          />
        );

      case StudentModalType.VIEW_ANNOUNCEMENTS:
        return (
          <StudentNotificationsModal
            isOpen={true}
            onClose={closeModal}
            studentId={props.studentId || ''}
            activeTab="announcements"
          />
        );

      case StudentModalType.MESSAGE_TEACHER:
        return (
          <StudentNotificationsModal
            isOpen={true}
            onClose={closeModal}
            studentId={props.studentId || ''}
            activeTab="messages"
            teacherId={props.teacherId}
          />
        );

      // Resource Modals
      case StudentModalType.VIEW_LIBRARY_BOOKS:
        return (
          <StudentLibraryModal
            isOpen={true}
            onClose={closeModal}
            studentId={props.studentId || ''}
          />
        );

      case StudentModalType.REQUEST_BOOK:
        return (
          <StudentLibraryModal
            isOpen={true}
            onClose={closeModal}
            studentId={props.studentId || ''}
            showRequestForm={true}
            onBookRequest={onConfirm}
          />
        );

      case StudentModalType.VIEW_STUDY_MATERIALS:
        return (
          <StudentLibraryModal
            isOpen={true}
            onClose={closeModal}
            studentId={props.studentId || ''}
            activeTab="materials"
          />
        );

      case StudentModalType.VIEW_DOWNLOADS:
        return (
          <StudentLibraryModal
            isOpen={true}
            onClose={closeModal}
            studentId={props.studentId || ''}
            activeTab="downloads"
          />
        );

      // Event & Calendar Modals
      case StudentModalType.VIEW_EVENTS:
        return (
          <StudentEventsModal
            isOpen={true}
            onClose={closeModal}
            studentId={props.studentId || ''}
          />
        );

      case StudentModalType.VIEW_CALENDAR:
        return (
          <StudentEventsModal
            isOpen={true}
            onClose={closeModal}
            studentId={props.studentId || ''}
            activeTab="calendar"
          />
        );

      case StudentModalType.REGISTER_EVENT:
        return (
          <StudentEventsModal
            isOpen={true}
            onClose={closeModal}
            studentId={props.studentId || ''}
            eventId={props.eventId}
            showRegistrationForm={true}
            onEventRegister={onConfirm}
          />
        );

      // Performance Modals
      case StudentModalType.VIEW_PROGRESS_REPORT:
        return (
          <StudentProgressModal
            isOpen={true}
            onClose={closeModal}
            studentId={props.studentId || ''}
            reportType="progress"
          />
        );

      case StudentModalType.VIEW_ANALYTICS:
        return (
          <StudentProgressModal
            isOpen={true}
            onClose={closeModal}
            studentId={props.studentId || ''}
            reportType="analytics"
          />
        );

      case StudentModalType.SET_GOALS:
        return (
          <StudentProgressModal
            isOpen={true}
            onClose={closeModal}
            studentId={props.studentId || ''}
            reportType="goals"
            onGoalsSave={onConfirm}
          />
        );

      case StudentModalType.VIEW_ACHIEVEMENTS:
        return (
          <StudentProgressModal
            isOpen={true}
            onClose={closeModal}
            studentId={props.studentId || ''}
            reportType="achievements"
          />
        );

      // Help & Support Modals
      case StudentModalType.HELP_SUPPORT:
        return (
          <StudentHelpSupportModal
            isOpen={true}
            onClose={closeModal}
            studentId={props.studentId || ''}
          />
        );

      case StudentModalType.REPORT_ISSUE:
        return (
          <StudentHelpSupportModal
            isOpen={true}
            onClose={closeModal}
            studentId={props.studentId || ''}
            activeTab="report"
            onIssueSubmit={onConfirm}
          />
        );

      case StudentModalType.FEEDBACK:
        return (
          <StudentHelpSupportModal
            isOpen={true}
            onClose={closeModal}
            studentId={props.studentId || ''}
            activeTab="feedback"
            onFeedbackSubmit={onConfirm}
          />
        );

      default:
        // Fallback placeholder for unimplemented modals
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold mb-4">Student Modal: {type}</h3>
              <p className="text-gray-600 mb-4">This modal is currently under development.</p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    if (onConfirm) onConfirm();
                    closeModal();
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return <>{renderModal()}</>;
};

export default StudentDashboardModalManager;