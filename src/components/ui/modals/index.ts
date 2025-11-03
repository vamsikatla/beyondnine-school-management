// Base Modal Components
export { Modal, ModalHeader, ModalTitle, ModalDescription, ModalContent, ModalFooter } from "../Modal";

// Form Modal Components
export {
  UserFormModal,
  ClassFormModal,
  ExamFormModal,
  QuickAddModal
} from "../FormModals";

// Confirmation Modal Components
export {
  ConfirmationModal,
  DeleteConfirmationModal,
  BulkDeleteConfirmationModal,
  StatusChangeConfirmationModal,
  ActionConfirmationModal,
  LogoutConfirmationModal,
  PasswordResetConfirmationModal,
  AccountToggleConfirmationModal,
  DataExportConfirmationModal
} from "../ConfirmationModals";

// Detail/View Modal Components
export {
  UserDetailModal,
  ReportDetailModal,
  ExamDetailModal,
  ItemDetailModal
} from "../DetailModals";

// Notification Modal Components
export {
  ToastNotification,
  NotificationModal,
  SystemNotificationModal,
  ActivityNotificationModal
} from "../NotificationModals";

// File Upload & Media Modal Components
export {
  FileUploadModal,
  ImageGalleryModal
} from "../FileUploadModals";

// Calendar Modal Components
export {
  CalendarModal,
  EventSchedulingModal,
  TimeSlotModal
} from "../CalendarModals";

// Modal Manager
export { ModalManager } from "../ModalManager";

// Modal Context & Hooks
export {
  ModalProvider,
  ModalType,
  useModal,
  useTypedModal,
  useConfirmationModal,
  useNotificationModal,
  useFormModal,
  useFileModal,
  useCalendarModal
} from "../../../contexts/ModalContext";

// Re-export the context for advanced usage
export { ModalContext } from "../../../contexts/ModalContext";