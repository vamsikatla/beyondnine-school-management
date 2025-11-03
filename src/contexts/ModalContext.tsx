"use client";

import * as React from "react";

// Modal types enum
export enum ModalType {
  // Form Modals
  USER_FORM = "USER_FORM",
  CLASS_FORM = "CLASS_FORM",
  EXAM_FORM = "EXAM_FORM",
  QUICK_ADD = "QUICK_ADD",
  
  // Confirmation Modals
  DELETE_CONFIRMATION = "DELETE_CONFIRMATION",
  BULK_DELETE_CONFIRMATION = "BULK_DELETE_CONFIRMATION",
  STATUS_CHANGE_CONFIRMATION = "STATUS_CHANGE_CONFIRMATION",
  ACTION_CONFIRMATION = "ACTION_CONFIRMATION",
  LOGOUT_CONFIRMATION = "LOGOUT_CONFIRMATION",
  PASSWORD_RESET_CONFIRMATION = "PASSWORD_RESET_CONFIRMATION",
  ACCOUNT_TOGGLE_CONFIRMATION = "ACCOUNT_TOGGLE_CONFIRMATION",
  DATA_EXPORT_CONFIRMATION = "DATA_EXPORT_CONFIRMATION",
  
  // Detail/View Modals
  USER_DETAIL = "USER_DETAIL",
  REPORT_DETAIL = "REPORT_DETAIL",
  EXAM_DETAIL = "EXAM_DETAIL",
  ITEM_DETAIL = "ITEM_DETAIL",
  
  // Notification Modals
  TOAST_NOTIFICATION = "TOAST_NOTIFICATION",
  NOTIFICATION_MODAL = "NOTIFICATION_MODAL",
  SYSTEM_NOTIFICATION = "SYSTEM_NOTIFICATION",
  ACTIVITY_NOTIFICATION = "ACTIVITY_NOTIFICATION",
  
  // File & Media Modals
  FILE_UPLOAD = "FILE_UPLOAD",
  IMAGE_GALLERY = "IMAGE_GALLERY",
  
  // Calendar Modals
  CALENDAR = "CALENDAR",
  EVENT_SCHEDULING = "EVENT_SCHEDULING",
  TIME_SLOT = "TIME_SLOT",
  
  // Settings & Config Modals
  USER_SETTINGS = "USER_SETTINGS",
  SYSTEM_SETTINGS = "SYSTEM_SETTINGS",
  ROLE_PERMISSIONS = "ROLE_PERMISSIONS",
  
  // Data Export/Import Modals
  DATA_EXPORT = "DATA_EXPORT",
  DATA_IMPORT = "DATA_IMPORT",
  BULK_OPERATIONS = "BULK_OPERATIONS",
  
  // Search & Filter Modals
  ADVANCED_SEARCH = "ADVANCED_SEARCH",
  FILTER_OPTIONS = "FILTER_OPTIONS",
  
  // Fee Management Modals
  FEE_STRUCTURE = "FEE_STRUCTURE",
  PAYMENT_COLLECTION = "PAYMENT_COLLECTION",
  PAYMENT_HISTORY = "PAYMENT_HISTORY",
  FEE_REPORT = "FEE_REPORT",
  
  // Attendance Management Modals
  BULK_ATTENDANCE = "BULK_ATTENDANCE",
  INDIVIDUAL_ATTENDANCE = "INDIVIDUAL_ATTENDANCE",
  ATTENDANCE_REPORT = "ATTENDANCE_REPORT",
  MARK_ATTENDANCE = "MARK_ATTENDANCE",
  
  // Event Management Modals
  EVENT_CREATE = "EVENT_CREATE",
  EVENT_EDIT = "EVENT_EDIT",
  EVENT_DUPLICATE = "EVENT_DUPLICATE",
  EVENT_DETAIL = "EVENT_DETAIL",
  
  // Additional Settings Modals
  SCHOOL_SETTINGS = "SCHOOL_SETTINGS",
  USER_PREFERENCES = "USER_PREFERENCES",
  NOTIFICATION_SETTINGS = "NOTIFICATION_SETTINGS"
}

// Modal state interface
interface ModalState {
  type: ModalType | null;
  isOpen: boolean;
  props: any;
  onClose?: () => void;
  onConfirm?: (data?: any) => void;
}

// Modal context interface
interface ModalContextType {
  currentModal: ModalState;
  openModal: (type: ModalType, props?: any, callbacks?: {
    onClose?: () => void;
    onConfirm?: (data?: any) => void;
  }) => void;
  closeModal: () => void;
  updateModalProps: (props: any) => void;
  isModalOpen: (type: ModalType) => boolean;
}

// Create the context
const ModalContext = React.createContext<ModalContextType | undefined>(undefined);

// Modal Provider component
export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentModal, setCurrentModal] = React.useState<ModalState>({
    type: null,
    isOpen: false,
    props: {},
    onClose: undefined,
    onConfirm: undefined
  });

  const [modalHistory, setModalHistory] = React.useState<ModalState[]>([]);

  const openModal = React.useCallback((
    type: ModalType, 
    props: any = {}, 
    callbacks: {
      onClose?: () => void;
      onConfirm?: (data?: any) => void;
    } = {}
  ) => {
    // Save current modal to history if one is already open
    if (currentModal.isOpen && currentModal.type) {
      setModalHistory(prev => [...prev, currentModal]);
    }

    setCurrentModal({
      type,
      isOpen: true,
      props,
      onClose: callbacks.onClose,
      onConfirm: callbacks.onConfirm
    });
  }, [currentModal]);

  const closeModal = React.useCallback(() => {
    // Call the onClose callback if it exists
    if (currentModal.onClose) {
      currentModal.onClose();
    }

    // Check if there's a previous modal in history
    if (modalHistory.length > 0) {
      const previousModal = modalHistory[modalHistory.length - 1];
      setModalHistory(prev => prev.slice(0, -1));
      setCurrentModal(previousModal);
    } else {
      setCurrentModal({
        type: null,
        isOpen: false,
        props: {},
        onClose: undefined,
        onConfirm: undefined
      });
    }
  }, [currentModal.onClose, modalHistory]);

  const updateModalProps = React.useCallback((props: any) => {
    setCurrentModal(prev => ({
      ...prev,
      props: { ...prev.props, ...props }
    }));
  }, []);

  const isModalOpen = React.useCallback((type: ModalType) => {
    return currentModal.isOpen && currentModal.type === type;
  }, [currentModal]);

  // Handle escape key globally
  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && currentModal.isOpen) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [currentModal.isOpen, closeModal]);

  const value = React.useMemo(() => ({
    currentModal,
    openModal,
    closeModal,
    updateModalProps,
    isModalOpen
  }), [currentModal, openModal, closeModal, updateModalProps, isModalOpen]);

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};

// Custom hook to use the modal context
export const useModal = () => {
  const context = React.useContext(ModalContext);
  
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  
  return context;
};

// Hook for specific modal types with type safety
export const useTypedModal = <T = any>(modalType: ModalType) => {
  const { openModal, closeModal, isModalOpen, currentModal, updateModalProps } = useModal();
  
  const openTypedModal = React.useCallback((
    props?: T,
    callbacks?: {
      onClose?: () => void;
      onConfirm?: (data?: any) => void;
    }
  ) => {
    openModal(modalType, props, callbacks);
  }, [openModal, modalType]);
  
  const isThisModalOpen = React.useCallback(() => {
    return isModalOpen(modalType);
  }, [isModalOpen, modalType]);
  
  const getCurrentModalProps = React.useCallback((): T | null => {
    return isModalOpen(modalType) ? currentModal.props : null;
  }, [isModalOpen, modalType, currentModal.props]);
  
  return {
    openModal: openTypedModal,
    closeModal,
    isOpen: isThisModalOpen(),
    props: getCurrentModalProps(),
    updateProps: updateModalProps
  };
};

// Convenience hooks for common modals
export const useConfirmationModal = () => {
  const { openModal, closeModal } = useModal();
  
  const confirm = React.useCallback((
    message: string,
    options: {
      title?: string;
      confirmText?: string;
      cancelText?: string;
      variant?: "danger" | "warning" | "info" | "success";
      onConfirm?: () => void;
      onCancel?: () => void;
    } = {}
  ) => {
    return new Promise<boolean>((resolve) => {
      openModal(ModalType.ACTION_CONFIRMATION, {
        title: options.title || "Confirm Action",
        message,
        confirmText: options.confirmText || "Confirm",
        cancelText: options.cancelText || "Cancel",
        variant: options.variant || "warning"
      }, {
        onConfirm: () => {
          if (options.onConfirm) options.onConfirm();
          resolve(true);
          closeModal();
        },
        onClose: () => {
          if (options.onCancel) options.onCancel();
          resolve(false);
          closeModal();
        }
      });
    });
  }, [openModal, closeModal]);
  
  const confirmDelete = React.useCallback((
    entityName: string,
    entityType: string,
    options: {
      additionalWarning?: string;
      cascadeInfo?: string[];
      onConfirm?: () => void;
      onCancel?: () => void;
    } = {}
  ) => {
    return new Promise<boolean>((resolve) => {
      openModal(ModalType.DELETE_CONFIRMATION, {
        entityName,
        entityType,
        additionalWarning: options.additionalWarning,
        cascadeInfo: options.cascadeInfo
      }, {
        onConfirm: () => {
          if (options.onConfirm) options.onConfirm();
          resolve(true);
          closeModal();
        },
        onClose: () => {
          if (options.onCancel) options.onCancel();
          resolve(false);
          closeModal();
        }
      });
    });
  }, [openModal, closeModal]);
  
  return { confirm, confirmDelete };
};

export const useNotificationModal = () => {
  const { openModal, closeModal } = useModal();
  
  const showNotification = React.useCallback((
    type: "success" | "error" | "warning" | "info",
    title: string,
    message?: string,
    options: {
      duration?: number;
      position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
      actions?: Array<{
        label: string;
        onClick: () => void;
        variant?: "default" | "outline" | "ghost";
      }>;
    } = {}
  ) => {
    openModal(ModalType.TOAST_NOTIFICATION, {
      variant: type,
      title,
      message,
      duration: options.duration || 5000,
      position: options.position || "top-right",
      actions: options.actions || []
    });
    
    // Auto-close after duration
    if (options.duration !== 0) {
      setTimeout(() => {
        closeModal();
      }, options.duration || 5000);
    }
  }, [openModal, closeModal]);
  
  const showSuccess = React.useCallback((title: string, message?: string, options?: Parameters<typeof showNotification>[3]) => {
    showNotification("success", title, message, options);
  }, [showNotification]);
  
  const showError = React.useCallback((title: string, message?: string, options?: Parameters<typeof showNotification>[3]) => {
    showNotification("error", title, message, options);
  }, [showNotification]);
  
  const showWarning = React.useCallback((title: string, message?: string, options?: Parameters<typeof showNotification>[3]) => {
    showNotification("warning", title, message, options);
  }, [showNotification]);
  
  const showInfo = React.useCallback((title: string, message?: string, options?: Parameters<typeof showNotification>[3]) => {
    showNotification("info", title, message, options);
  }, [showNotification]);
  
  return {
    showNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };
};

export const useFormModal = () => {
  const { openModal, closeModal } = useModal();
  
  const openUserForm = React.useCallback((
    userType: "student" | "teacher" | "parent" | "school-admin" | "staff",
    options: {
      mode?: "create" | "edit";
      initialData?: any;
      onSave?: (data: any) => void;
      onCancel?: () => void;
    } = {}
  ) => {
    openModal(ModalType.USER_FORM, {
      userType,
      mode: options.mode || "create",
      initialData: options.initialData,
      title: `${options.mode === "edit" ? "Edit" : "Add"} ${userType.charAt(0).toUpperCase() + userType.slice(1)}`
    }, {
      onConfirm: options.onSave,
      onClose: options.onCancel
    });
  }, [openModal]);
  
  const openClassForm = React.useCallback((options: {
    mode?: "create" | "edit";
    initialData?: any;
    onSave?: (data: any) => void;
    onCancel?: () => void;
  } = {}) => {
    openModal(ModalType.CLASS_FORM, {
      mode: options.mode || "create",
      initialData: options.initialData,
      title: `${options.mode === "edit" ? "Edit" : "Create"} Class`
    }, {
      onConfirm: options.onSave,
      onClose: options.onCancel
    });
  }, [openModal]);
  
  const openExamForm = React.useCallback((options: {
    mode?: "create" | "edit";
    initialData?: any;
    onSave?: (data: any) => void;
    onCancel?: () => void;
  } = {}) => {
    openModal(ModalType.EXAM_FORM, {
      mode: options.mode || "create",
      initialData: options.initialData,
      title: `${options.mode === "edit" ? "Edit" : "Create"} Exam`
    }, {
      onConfirm: options.onSave,
      onClose: options.onCancel
    });
  }, [openModal]);
  
  return {
    openUserForm,
    openClassForm,
    openExamForm,
    closeModal
  };
};

export const useFileModal = () => {
  const { openModal, closeModal } = useModal();
  
  const openFileUpload = React.useCallback((options: {
    title?: string;
    acceptedFileTypes?: string[];
    maxFileSize?: number;
    maxFiles?: number;
    allowMultiple?: boolean;
    onUpload?: (files: File[]) => void;
    onCancel?: () => void;
  } = {}) => {
    openModal(ModalType.FILE_UPLOAD, {
      title: options.title || "Upload Files",
      acceptedFileTypes: options.acceptedFileTypes || [],
      maxFileSize: options.maxFileSize || 10,
      maxFiles: options.maxFiles || 5,
      allowMultiple: options.allowMultiple !== false
    }, {
      onConfirm: options.onUpload,
      onClose: options.onCancel
    });
  }, [openModal]);
  
  const openImageGallery = React.useCallback((
    images: Array<{
      id: string;
      src: string;
      thumbnail?: string;
      title?: string;
      description?: string;
      uploadedBy?: string;
      uploadedAt?: Date;
      size?: number;
    }>,
    options: {
      initialImageIndex?: number;
      onDelete?: (imageId: string) => void;
      onDownload?: (imageId: string) => void;
      onShare?: (imageId: string) => void;
    } = {}
  ) => {
    openModal(ModalType.IMAGE_GALLERY, {
      images,
      initialImageIndex: options.initialImageIndex || 0,
      onDelete: options.onDelete,
      onDownload: options.onDownload,
      onShare: options.onShare
    });
  }, [openModal]);
  
  return {
    openFileUpload,
    openImageGallery,
    closeModal
  };
};

export const useCalendarModal = () => {
  const { openModal, closeModal } = useModal();
  
  const openCalendar = React.useCallback((options: {
    mode?: "single" | "multiple" | "range";
    selectedDate?: Date | Date[];
    minDate?: Date;
    maxDate?: Date;
    disabledDates?: Date[];
    title?: string;
    showTime?: boolean;
    availableTimeSlots?: string[];
    onDateSelect?: (date: Date | Date[]) => void;
    onTimeSlotSelect?: (timeSlot: string) => void;
  } = {}) => {
    openModal(ModalType.CALENDAR, {
      mode: options.mode || "single",
      selectedDate: options.selectedDate,
      minDate: options.minDate,
      maxDate: options.maxDate,
      disabledDates: options.disabledDates || [],
      title: options.title || "Select Date",
      showTime: options.showTime || false,
      availableTimeSlots: options.availableTimeSlots || [],
      onTimeSlotSelect: options.onTimeSlotSelect
    }, {
      onConfirm: options.onDateSelect
    });
  }, [openModal]);
  
  const openEventScheduling = React.useCallback((options: {
    initialEvent?: any;
    availableAttendees?: Array<{ id: string; name: string; email: string }>;
    categories?: string[];
    onSave?: (event: any) => void;
    onCancel?: () => void;
  } = {}) => {
    openModal(ModalType.EVENT_SCHEDULING, {
      initialEvent: options.initialEvent,
      availableAttendees: options.availableAttendees || [],
      categories: options.categories || ["Meeting", "Class", "Assignment", "Exam", "Holiday", "Other"]
    }, {
      onConfirm: options.onSave,
      onClose: options.onCancel
    });
  }, [openModal]);
  
  const openTimeSlotSelection = React.useCallback((
    availableSlots: Array<{
      date: Date;
      startTime: string;
      endTime: string;
      duration: number;
      isBooked?: boolean;
      bookedBy?: string;
    }>,
    options: {
      title?: string;
      selectedDate?: Date;
      onSelectTimeSlot?: (timeSlot: { date: Date; startTime: string; endTime: string; duration: number }) => void;
    } = {}
  ) => {
    openModal(ModalType.TIME_SLOT, {
      availableSlots,
      title: options.title || "Select Time Slot",
      selectedDate: options.selectedDate
    }, {
      onConfirm: options.onSelectTimeSlot
    });
  }, [openModal]);
  
  return {
    openCalendar,
    openEventScheduling,
    openTimeSlotSelection,
    closeModal
  };
};

// Export the context for advanced usage
export { ModalContext };