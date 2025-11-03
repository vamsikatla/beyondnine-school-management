"use client";

import React from 'react';
import { useModal, ModalType } from '@/contexts/ModalContext';
import UserFormModal from '@/components/ui/modals/UserFormModal';
import { ClassFormModal } from '@/components/ui/modals/ClassFormModal';
import { FeeManagementModal } from '@/components/ui/modals/FeeManagementModal';
import { AttendanceModal } from '@/components/ui/modals/AttendanceModal';
import { EventManagementModal } from '@/components/ui/modals/EventManagementModal';
import { UserPreferencesModal } from '@/components/ui/modals/SettingsModal';
import { ExamDetailModal } from '@/components/ui/modals/ExamDetailModal';

const ModalManager: React.FC = () => {
  const { currentModal, closeModal } = useModal();

  if (!currentModal.isOpen || !currentModal.type) {
    return null;
  }

  const { type, props, onConfirm } = currentModal;

  const renderModal = () => {
    switch (type) {
      case ModalType.USER_FORM:
        return (
          <UserFormModal
            isOpen={true}
            onClose={closeModal}
            onSave={(userData) => {
              if (onConfirm) onConfirm(userData);
              closeModal();
            }}
            userType={props.userType || 'student'}
            mode={props.mode || 'create'}
            initialData={props.initialData}
          />
        );

      case ModalType.CLASS_FORM:
        return (
          <ClassFormModal
            isOpen={true}
            onClose={closeModal}
            onSubmit={async (classData) => {
              if (onConfirm) await onConfirm(classData);
              closeModal();
            }}
            mode={props.mode || 'create'}
            initialData={props.initialData}
            teachers={props.teachers || []}
          />
        );

      // Fee Management Modals
      case ModalType.FEE_STRUCTURE:
        return (
          <FeeManagementModal
            isOpen={true}
            onClose={closeModal}
            mode="fee_structure"
            onSubmit={async (feeData) => {
              if (onConfirm) await onConfirm(feeData);
            }}
            initialData={props.initialData}
            students={props.students || []}
            existingPayments={props.existingPayments || []}
          />
        );

      case ModalType.PAYMENT_COLLECTION:
        return (
          <FeeManagementModal
            isOpen={true}
            onClose={closeModal}
            mode="payment_collection"
            onSubmit={async (paymentData) => {
              if (onConfirm) await onConfirm(paymentData);
            }}
            initialData={props.initialData}
            students={props.students || []}
            existingPayments={props.existingPayments || []}
          />
        );

      case ModalType.PAYMENT_HISTORY:
        return (
          <FeeManagementModal
            isOpen={true}
            onClose={closeModal}
            mode="payment_history"
            onSubmit={async (data) => {
              if (onConfirm) await onConfirm(data);
            }}
            initialData={props.initialData}
            students={props.students || []}
            existingPayments={props.existingPayments || []}
          />
        );

      case ModalType.FEE_REPORT:
        return (
          <FeeManagementModal
            isOpen={true}
            onClose={closeModal}
            mode="fee_report"
            onSubmit={async (reportData) => {
              if (onConfirm) await onConfirm(reportData);
            }}
            initialData={props.initialData}
            students={props.students || []}
            existingPayments={props.existingPayments || []}
          />
        );

      // Attendance Management Modals
      case ModalType.BULK_ATTENDANCE:
        return (
          <AttendanceModal
            isOpen={true}
            onClose={closeModal}
            mode="bulk_entry"
            onSubmit={async (attendanceData) => {
              if (onConfirm) await onConfirm(attendanceData);
            }}
            initialData={props.initialData}
            classes={props.classes || []}
            students={props.students || []}
            existingAttendance={props.existingAttendance || []}
          />
        );

      case ModalType.INDIVIDUAL_ATTENDANCE:
        return (
          <AttendanceModal
            isOpen={true}
            onClose={closeModal}
            mode="individual_entry"
            onSubmit={async (attendanceData) => {
              if (onConfirm) await onConfirm(attendanceData);
            }}
            initialData={props.initialData}
            classes={props.classes || []}
            students={props.students || []}
            existingAttendance={props.existingAttendance || []}
          />
        );

      case ModalType.MARK_ATTENDANCE:
        return (
          <AttendanceModal
            isOpen={true}
            onClose={closeModal}
            mode="mark_attendance"
            onSubmit={async (attendanceData) => {
              if (onConfirm) await onConfirm(attendanceData);
            }}
            initialData={props.initialData}
            classes={props.classes || []}
            students={props.students || []}
            existingAttendance={props.existingAttendance || []}
          />
        );

      case ModalType.ATTENDANCE_REPORT:
        return (
          <AttendanceModal
            isOpen={true}
            onClose={closeModal}
            mode="attendance_report"
            onSubmit={async (reportData) => {
              if (onConfirm) await onConfirm(reportData);
            }}
            initialData={props.initialData}
            classes={props.classes || []}
            students={props.students || []}
            existingAttendance={props.existingAttendance || []}
          />
        );

      // Event Management Modals
      case ModalType.EVENT_CREATE:
        return (
          <EventManagementModal
            isOpen={true}
            onClose={closeModal}
            mode="create"
            onSubmit={async (eventData) => {
              if (onConfirm) await onConfirm(eventData);
            }}
            initialData={props.initialData}
            classes={props.classes || []}
            teachers={props.teachers || []}
            students={props.students || []}
          />
        );

      case ModalType.EVENT_EDIT:
        return (
          <EventManagementModal
            isOpen={true}
            onClose={closeModal}
            mode="edit"
            onSubmit={async (eventData) => {
              if (onConfirm) await onConfirm(eventData);
            }}
            initialData={props.initialData}
            classes={props.classes || []}
            teachers={props.teachers || []}
            students={props.students || []}
          />
        );

      case ModalType.EVENT_DUPLICATE:
        return (
          <EventManagementModal
            isOpen={true}
            onClose={closeModal}
            mode="duplicate"
            onSubmit={async (eventData) => {
              if (onConfirm) await onConfirm(eventData);
            }}
            initialData={props.initialData}
            classes={props.classes || []}
            teachers={props.teachers || []}
            students={props.students || []}
          />
        );

      // Detail Modals
      case ModalType.EXAM_DETAIL:
        return (
          <ExamDetailModal
            isOpen={true}
            onClose={closeModal}
            exam={props.exam || {}}
            onEdit={props.onEdit}
            onDelete={props.onDelete}
            onViewResults={props.onViewResults}
            onDownloadReport={props.onDownloadReport}
            onShareExam={props.onShareExam}
          />
        );

      // Settings Modals
      case ModalType.USER_PREFERENCES:
      case ModalType.USER_SETTINGS:
      case ModalType.SCHOOL_SETTINGS:
      case ModalType.SYSTEM_SETTINGS:
        return (
          <UserPreferencesModal
            isOpen={true}
            onClose={closeModal}
            onSave={async (settingsData) => {
              if (onConfirm) await onConfirm(settingsData);
              closeModal();
            }}
            currentSettings={props.currentSettings || {}}
          />
        );

      default:
        // Fallback placeholder for other modal types
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold mb-4">Modal: {type}</h3>
              <p className="text-gray-600 mb-4">This modal type is not implemented yet.</p>
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
                  Confirm
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return <>{renderModal()}</>;

};

export default ModalManager;
