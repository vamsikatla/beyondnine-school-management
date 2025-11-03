import * as React from "react";
import { useModal, ModalType } from "@/contexts/ModalContext";

// Import all modal components
import { Modal } from "./Modal";
import { 
  UserFormModal, 
  ClassFormModal, 
  ExamFormModal, 
  QuickAddModal 
} from "./FormModals";
import { 
  ConfirmationModal,
  DeleteConfirmationModal,
  BulkDeleteConfirmationModal,
  StatusChangeConfirmationModal,
  ActionConfirmationModal,
  LogoutConfirmationModal,
  PasswordResetConfirmationModal,
  AccountToggleConfirmationModal,
  DataExportConfirmationModal
} from "./ConfirmationModals";
import {
  UserDetailModal,
  ReportDetailModal,
  ExamDetailModal,
  ItemDetailModal
} from "./DetailModals";
import {
  ToastNotification,
  NotificationModal,
  SystemNotificationModal,
  ActivityNotificationModal
} from "./NotificationModals";
import {
  FileUploadModal,
  ImageGalleryModal
} from "./FileUploadModals";
import {
  CalendarModal,
  EventSchedulingModal,
  TimeSlotModal
} from "./CalendarModals";

/**
 * ModalManager component that handles rendering all modals based on the global modal state
 * This should be placed at the root level of your application, typically in the layout
 */
export const ModalManager: React.FC = () => {
  const { currentModal, closeModal } = useModal();

  if (!currentModal.isOpen || !currentModal.type) {
    return null;
  }

  const { type, props } = currentModal;

  // Render the appropriate modal based on the type
  switch (type) {
    // Form Modals
    case ModalType.USER_FORM:
      return (
        <UserFormModal
          isOpen={true}
          onClose={closeModal}
          onSubmit={currentModal.onConfirm || (() => {})}
          {...props}
        />
      );

    case ModalType.CLASS_FORM:
      return (
        <ClassFormModal
          isOpen={true}
          onClose={closeModal}
          onSubmit={currentModal.onConfirm || (() => {})}
          {...props}
        />
      );

    case ModalType.EXAM_FORM:
      return (
        <ExamFormModal
          isOpen={true}
          onClose={closeModal}
          onSubmit={currentModal.onConfirm || (() => {})}
          {...props}
        />
      );

    case ModalType.QUICK_ADD:
      return (
        <QuickAddModal
          isOpen={true}
          onClose={closeModal}
          onSubmit={currentModal.onConfirm || (() => {})}
          {...props}
        />
      );

    // Confirmation Modals
    case ModalType.DELETE_CONFIRMATION:
      return (
        <DeleteConfirmationModal
          isOpen={true}
          onClose={closeModal}
          onConfirm={currentModal.onConfirm || (() => {})}
          {...props}
        />
      );

    case ModalType.BULK_DELETE_CONFIRMATION:
      return (
        <BulkDeleteConfirmationModal
          isOpen={true}
          onClose={closeModal}
          onConfirm={currentModal.onConfirm || (() => {})}
          {...props}
        />
      );

    case ModalType.STATUS_CHANGE_CONFIRMATION:
      return (
        <StatusChangeConfirmationModal
          isOpen={true}
          onClose={closeModal}
          onConfirm={currentModal.onConfirm || (() => {})}
          {...props}
        />
      );

    case ModalType.ACTION_CONFIRMATION:
      return (
        <ActionConfirmationModal
          isOpen={true}
          onClose={closeModal}
          onConfirm={currentModal.onConfirm || (() => {})}
          {...props}
        />
      );

    case ModalType.LOGOUT_CONFIRMATION:
      return (
        <LogoutConfirmationModal
          isOpen={true}
          onClose={closeModal}
          onConfirm={currentModal.onConfirm || (() => {})}
          {...props}
        />
      );

    case ModalType.PASSWORD_RESET_CONFIRMATION:
      return (
        <PasswordResetConfirmationModal
          isOpen={true}
          onClose={closeModal}
          onConfirm={currentModal.onConfirm || (() => {})}
          {...props}
        />
      );

    case ModalType.ACCOUNT_TOGGLE_CONFIRMATION:
      return (
        <AccountToggleConfirmationModal
          isOpen={true}
          onClose={closeModal}
          onConfirm={currentModal.onConfirm || (() => {})}
          {...props}
        />
      );

    case ModalType.DATA_EXPORT_CONFIRMATION:
      return (
        <DataExportConfirmationModal
          isOpen={true}
          onClose={closeModal}
          onConfirm={currentModal.onConfirm || (() => {})}
          {...props}
        />
      );

    // Detail/View Modals
    case ModalType.USER_DETAIL:
      return (
        <UserDetailModal
          isOpen={true}
          onClose={closeModal}
          {...props}
        />
      );

    case ModalType.REPORT_DETAIL:
      return (
        <ReportDetailModal
          isOpen={true}
          onClose={closeModal}
          {...props}
        />
      );

    case ModalType.EXAM_DETAIL:
      return (
        <ExamDetailModal
          isOpen={true}
          onClose={closeModal}
          {...props}
        />
      );

    case ModalType.ITEM_DETAIL:
      return (
        <ItemDetailModal
          isOpen={true}
          onClose={closeModal}
          {...props}
        />
      );

    // Notification Modals
    case ModalType.TOAST_NOTIFICATION:
      return (
        <ToastNotification
          isOpen={true}
          onClose={closeModal}
          {...props}
        />
      );

    case ModalType.NOTIFICATION_MODAL:
      return (
        <NotificationModal
          isOpen={true}
          onClose={closeModal}
          {...props}
        />
      );

    case ModalType.SYSTEM_NOTIFICATION:
      return (
        <SystemNotificationModal
          isOpen={true}
          onClose={closeModal}
          {...props}
        />
      );

    case ModalType.ACTIVITY_NOTIFICATION:
      return (
        <ActivityNotificationModal
          isOpen={true}
          onClose={closeModal}
          {...props}
        />
      );

    // File & Media Modals
    case ModalType.FILE_UPLOAD:
      return (
        <FileUploadModal
          isOpen={true}
          onClose={closeModal}
          onUpload={currentModal.onConfirm || (() => {})}
          {...props}
        />
      );

    case ModalType.IMAGE_GALLERY:
      return (
        <ImageGalleryModal
          isOpen={true}
          onClose={closeModal}
          {...props}
        />
      );

    // Calendar Modals
    case ModalType.CALENDAR:
      return (
        <CalendarModal
          isOpen={true}
          onClose={closeModal}
          onDateSelect={currentModal.onConfirm || (() => {})}
          {...props}
        />
      );

    case ModalType.EVENT_SCHEDULING:
      return (
        <EventSchedulingModal
          isOpen={true}
          onClose={closeModal}
          onSave={currentModal.onConfirm || (() => {})}
          {...props}
        />
      );

    case ModalType.TIME_SLOT:
      return (
        <TimeSlotModal
          isOpen={true}
          onClose={closeModal}
          onSelectTimeSlot={currentModal.onConfirm || (() => {})}
          {...props}
        />
      );

    // Settings & Configuration Modals
    case ModalType.USER_SETTINGS:
      return (
        <Modal
          isOpen={true}
          onClose={closeModal}
          title="User Settings"
          size="lg"
        >
          <div className="p-4">
            <p>User Settings Modal - To be implemented based on specific requirements</p>
          </div>
        </Modal>
      );

    case ModalType.SYSTEM_SETTINGS:
      return (
        <Modal
          isOpen={true}
          onClose={closeModal}
          title="System Settings"
          size="xl"
        >
          <div className="p-4">
            <p>System Settings Modal - To be implemented based on specific requirements</p>
          </div>
        </Modal>
      );

    case ModalType.ROLE_PERMISSIONS:
      return (
        <Modal
          isOpen={true}
          onClose={closeModal}
          title="Role Permissions"
          size="lg"
        >
          <div className="p-4">
            <p>Role Permissions Modal - To be implemented based on specific requirements</p>
          </div>
        </Modal>
      );

    // Data Export/Import Modals
    case ModalType.DATA_EXPORT:
      return (
        <Modal
          isOpen={true}
          onClose={closeModal}
          title="Export Data"
          size="lg"
        >
          <div className="p-4">
            <p>Data Export Modal - To be implemented based on specific requirements</p>
          </div>
        </Modal>
      );

    case ModalType.DATA_IMPORT:
      return (
        <Modal
          isOpen={true}
          onClose={closeModal}
          title="Import Data"
          size="lg"
        >
          <div className="p-4">
            <p>Data Import Modal - To be implemented based on specific requirements</p>
          </div>
        </Modal>
      );

    case ModalType.BULK_OPERATIONS:
      return (
        <Modal
          isOpen={true}
          onClose={closeModal}
          title="Bulk Operations"
          size="lg"
        >
          <div className="p-4">
            <p>Bulk Operations Modal - To be implemented based on specific requirements</p>
          </div>
        </Modal>
      );

    // Search & Filter Modals
    case ModalType.ADVANCED_SEARCH:
      return (
        <Modal
          isOpen={true}
          onClose={closeModal}
          title="Advanced Search"
          size="lg"
        >
          <div className="p-4">
            <p>Advanced Search Modal - To be implemented based on specific requirements</p>
          </div>
        </Modal>
      );

    case ModalType.FILTER_OPTIONS:
      return (
        <Modal
          isOpen={true}
          onClose={closeModal}
          title="Filter Options"
          size="default"
        >
          <div className="p-4">
            <p>Filter Options Modal - To be implemented based on specific requirements</p>
          </div>
        </Modal>
      );

    default:
      // Fallback for unknown modal types
      console.warn(`Unknown modal type: ${type}`);
      return (
        <Modal
          isOpen={true}
          onClose={closeModal}
          title="Unknown Modal"
          size="default"
        >
          <div className="p-4">
            <p>Unknown modal type: {type}</p>
          </div>
        </Modal>
      );
  }
};

export default ModalManager;