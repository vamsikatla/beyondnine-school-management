// Re-export the modal hooks from ModalContext for convenience
export { 
  useModal, 
  useTypedModal, 
  useConfirmationModal, 
  useNotificationModal, 
  useFormModal, 
  useFileModal, 
  useCalendarModal,
  ModalType 
} from '../contexts/ModalContext';

// Additional utility hooks for common patterns
import { useModal as useModalCore, ModalType } from '../contexts/ModalContext';
import { useCallback } from 'react';

// Hook for data management modals
export const useDataModal = () => {
  const { openModal, closeModal } = useModalCore();

  const openDataExport = useCallback((options: {
    dataType?: string;
    onExport?: (options: any) => Promise<void>;
  } = {}) => {
    openModal(ModalType.DATA_EXPORT, {
      dataType: options.dataType,
    }, {
      onConfirm: options.onExport
    });
  }, [openModal]);

  const openDataImport = useCallback((options: {
    dataType?: string;
    onImport?: (file: File, options: any) => Promise<any>;
  } = {}) => {
    openModal(ModalType.DATA_IMPORT, {
      dataType: options.dataType,
    }, {
      onConfirm: options.onImport
    });
  }, [openModal]);

  const openBulkOperations = useCallback((
    selectedItems: any[],
    dataType: string,
    options: {
      onExecute?: (operation: string, data: any) => Promise<void>;
    } = {}
  ) => {
    openModal(ModalType.BULK_OPERATIONS, {
      selectedItems,
      dataType,
    }, {
      onConfirm: options.onExecute
    });
  }, [openModal]);

  return {
    openDataExport,
    openDataImport,
    openBulkOperations,
    closeModal
  };
};

// Hook for search and filter modals
export const useSearchFilterModal = () => {
  const { openModal, closeModal } = useModalCore();

  const openAdvancedSearch = useCallback((
    searchFields: any[],
    options: {
      initialCriteria?: any[];
      initialSearchText?: string;
      onSearch?: (criteria: any[], searchText: string) => void;
    } = {}
  ) => {
    openModal(ModalType.ADVANCED_SEARCH, {
      searchFields,
      initialCriteria: options.initialCriteria || [],
      initialSearchText: options.initialSearchText || ''
    }, {
      onConfirm: options.onSearch
    });
  }, [openModal]);

  const openFilterOptions = useCallback((
    filterOptions: any[],
    currentFilters: any = {},
    options: {
      onApplyFilters?: (filters: any) => void;
      onClearFilters?: () => void;
    } = {}
  ) => {
    openModal(ModalType.FILTER_OPTIONS, {
      filterOptions,
      currentFilters,
      onClearFilters: options.onClearFilters
    }, {
      onConfirm: options.onApplyFilters
    });
  }, [openModal]);

  return {
    openAdvancedSearch,
    openFilterOptions,
    closeModal
  };
};

// Hook for settings modals
export const useSettingsModal = () => {
  const { openModal, closeModal } = useModalCore();

  const openUserSettings = useCallback((
    currentSettings: any = {},
    options: {
      onSave?: (settings: any) => void;
    } = {}
  ) => {
    openModal(ModalType.USER_SETTINGS, {
      currentSettings
    }, {
      onConfirm: options.onSave
    });
  }, [openModal]);

  const openSystemSettings = useCallback((
    currentSettings: any,
    options: {
      onSave?: (settings: any) => void;
    } = {}
  ) => {
    openModal(ModalType.SYSTEM_SETTINGS, {
      currentSettings
    }, {
      onConfirm: options.onSave
    });
  }, [openModal]);

  const openRolePermissions = useCallback((
    roles: any[],
    permissions: any[],
    options: {
      onSave?: (roles: any[]) => void;
    } = {}
  ) => {
    openModal(ModalType.ROLE_PERMISSIONS, {
      roles,
      permissions
    }, {
      onConfirm: options.onSave
    });
  }, [openModal]);

  return {
    openUserSettings,
    openSystemSettings,
    openRolePermissions,
    closeModal
  };
};

// Hook for detail/view modals
export const useDetailModal = () => {
  const { openModal, closeModal } = useModalCore();

  const openUserDetail = useCallback((
    user: any,
    userType: string,
    options: {
      onEdit?: () => void;
      onDelete?: () => void;
    } = {}
  ) => {
    openModal(ModalType.USER_DETAIL, {
      user,
      userType,
      onEdit: options.onEdit,
      onDelete: options.onDelete
    });
  }, [openModal]);

  const openExamDetail = useCallback((
    exam: any,
    options: {
      onEdit?: () => void;
      onDelete?: () => void;
      onViewResults?: () => void;
    } = {}
  ) => {
    openModal(ModalType.EXAM_DETAIL, {
      exam,
      onEdit: options.onEdit,
      onDelete: options.onDelete,
      onViewResults: options.onViewResults
    });
  }, [openModal]);

  const openReportDetail = useCallback((
    report: any,
    options: {
      onExport?: () => void;
      onShare?: () => void;
    } = {}
  ) => {
    openModal(ModalType.REPORT_DETAIL, {
      report,
      onExport: options.onExport,
      onShare: options.onShare
    });
  }, [openModal]);

  const openItemDetail = useCallback((
    item: any,
    itemType: string,
    fields: any[] = [],
    options: {
      onEdit?: () => void;
      onDelete?: () => void;
    } = {}
  ) => {
    openModal(ModalType.ITEM_DETAIL, {
      item,
      itemType,
      fields,
      onEdit: options.onEdit,
      onDelete: options.onDelete
    });
  }, [openModal]);

  return {
    openUserDetail,
    openExamDetail,
    openReportDetail,
    openItemDetail,
    closeModal
  };
};

// Hook for class management
export const useClassModal = () => {
  const { openModal, closeModal } = useModalCore();

  const openClassForm = useCallback((
    mode: 'create' | 'edit' = 'create',
    options: {
      initialData?: any;
      teachers?: any[];
      onSave?: (classData: any) => Promise<void>;
    } = {}
  ) => {
    openModal(ModalType.CLASS_FORM, {
      mode,
      initialData: options.initialData,
      teachers: options.teachers || []
    }, {
      onConfirm: options.onSave
    });
  }, [openModal]);

  return {
    openClassForm,
    closeModal
  };
};

// Hook for fee management modals
export const useFeeModal = () => {
  const { openModal, closeModal } = useModalCore();

  const openFeeStructure = useCallback((
    options: {
      initialData?: any;
      students?: any[];
      onSave?: (feeData: any) => Promise<void>;
    } = {}
  ) => {
    openModal(ModalType.FEE_STRUCTURE, {
      initialData: options.initialData,
      students: options.students || []
    }, {
      onConfirm: options.onSave
    });
  }, [openModal]);

  const openPaymentCollection = useCallback((
    options: {
      initialData?: any;
      students?: any[];
      existingPayments?: any[];
      onSave?: (paymentData: any) => Promise<void>;
    } = {}
  ) => {
    openModal(ModalType.PAYMENT_COLLECTION, {
      initialData: options.initialData,
      students: options.students || [],
      existingPayments: options.existingPayments || []
    }, {
      onConfirm: options.onSave
    });
  }, [openModal]);

  const openPaymentHistory = useCallback((
    options: {
      initialData?: any;
      students?: any[];
      existingPayments?: any[];
      onGenerate?: (data: any) => Promise<void>;
    } = {}
  ) => {
    openModal(ModalType.PAYMENT_HISTORY, {
      initialData: options.initialData,
      students: options.students || [],
      existingPayments: options.existingPayments || []
    }, {
      onConfirm: options.onGenerate
    });
  }, [openModal]);

  const openFeeReport = useCallback((
    options: {
      initialData?: any;
      students?: any[];
      existingPayments?: any[];
      onGenerate?: (reportData: any) => Promise<void>;
    } = {}
  ) => {
    openModal(ModalType.FEE_REPORT, {
      initialData: options.initialData,
      students: options.students || [],
      existingPayments: options.existingPayments || []
    }, {
      onConfirm: options.onGenerate
    });
  }, [openModal]);

  return {
    openFeeStructure,
    openPaymentCollection,
    openPaymentHistory,
    openFeeReport,
    closeModal
  };
};

// Hook for attendance management modals
export const useAttendanceModal = () => {
  const { openModal, closeModal } = useModalCore();

  const openBulkAttendance = useCallback((
    options: {
      initialData?: any;
      classes?: any[];
      students?: any[];
      existingAttendance?: any[];
      onSave?: (attendanceData: any) => Promise<void>;
    } = {}
  ) => {
    openModal(ModalType.BULK_ATTENDANCE, {
      initialData: options.initialData,
      classes: options.classes || [],
      students: options.students || [],
      existingAttendance: options.existingAttendance || []
    }, {
      onConfirm: options.onSave
    });
  }, [openModal]);

  const openIndividualAttendance = useCallback((
    options: {
      initialData?: any;
      classes?: any[];
      students?: any[];
      existingAttendance?: any[];
      onSave?: (attendanceData: any) => Promise<void>;
    } = {}
  ) => {
    openModal(ModalType.INDIVIDUAL_ATTENDANCE, {
      initialData: options.initialData,
      classes: options.classes || [],
      students: options.students || [],
      existingAttendance: options.existingAttendance || []
    }, {
      onConfirm: options.onSave
    });
  }, [openModal]);

  const openMarkAttendance = useCallback((
    options: {
      initialData?: any;
      classes?: any[];
      students?: any[];
      existingAttendance?: any[];
      onSave?: (attendanceData: any) => Promise<void>;
    } = {}
  ) => {
    openModal(ModalType.MARK_ATTENDANCE, {
      initialData: options.initialData,
      classes: options.classes || [],
      students: options.students || [],
      existingAttendance: options.existingAttendance || []
    }, {
      onConfirm: options.onSave
    });
  }, [openModal]);

  const openAttendanceReport = useCallback((
    options: {
      initialData?: any;
      classes?: any[];
      students?: any[];
      existingAttendance?: any[];
      onGenerate?: (reportData: any) => Promise<void>;
    } = {}
  ) => {
    openModal(ModalType.ATTENDANCE_REPORT, {
      initialData: options.initialData,
      classes: options.classes || [],
      students: options.students || [],
      existingAttendance: options.existingAttendance || []
    }, {
      onConfirm: options.onGenerate
    });
  }, [openModal]);

  return {
    openBulkAttendance,
    openIndividualAttendance,
    openMarkAttendance,
    openAttendanceReport,
    closeModal
  };
};

// Hook for event management modals
export const useEventModal = () => {
  const { openModal, closeModal } = useModalCore();

  const openEventCreate = useCallback((
    options: {
      initialData?: any;
      classes?: any[];
      teachers?: any[];
      students?: any[];
      onSave?: (eventData: any) => Promise<void>;
    } = {}
  ) => {
    openModal(ModalType.EVENT_CREATE, {
      initialData: options.initialData,
      classes: options.classes || [],
      teachers: options.teachers || [],
      students: options.students || []
    }, {
      onConfirm: options.onSave
    });
  }, [openModal]);

  const openEventEdit = useCallback((
    options: {
      initialData?: any;
      classes?: any[];
      teachers?: any[];
      students?: any[];
      onSave?: (eventData: any) => Promise<void>;
    } = {}
  ) => {
    openModal(ModalType.EVENT_EDIT, {
      initialData: options.initialData,
      classes: options.classes || [],
      teachers: options.teachers || [],
      students: options.students || []
    }, {
      onConfirm: options.onSave
    });
  }, [openModal]);

  const openEventDuplicate = useCallback((
    options: {
      initialData?: any;
      classes?: any[];
      teachers?: any[];
      students?: any[];
      onSave?: (eventData: any) => Promise<void>;
    } = {}
  ) => {
    openModal(ModalType.EVENT_DUPLICATE, {
      initialData: options.initialData,
      classes: options.classes || [],
      teachers: options.teachers || [],
      students: options.students || []
    }, {
      onConfirm: options.onSave
    });
  }, [openModal]);

  return {
    openEventCreate,
    openEventEdit,
    openEventDuplicate,
    closeModal
  };
};

// Hook for quick actions
export const useQuickActions = () => {
  const { openModal } = useModalCore();
  const { confirm, confirmDelete } = useConfirmationModal();
  const { showSuccess, showError, showWarning, showInfo } = useNotificationModal();

  // Quick confirmation wrapper
  const quickConfirm = useCallback(async (
    message: string,
    action: () => Promise<void> | void,
    options: {
      title?: string;
      confirmText?: string;
      variant?: "danger" | "warning" | "info" | "success";
    } = {}
  ): Promise<boolean> => {
    try {
      const confirmed = await confirm(message, {
        title: options.title,
        confirmText: options.confirmText,
        variant: options.variant || "warning"
      });
      
      if (confirmed) {
        await action();
        return true;
      }
      return false;
    } catch (error) {
      showError('Action Failed', error instanceof Error ? error.message : 'An unexpected error occurred');
      return false;
    }
  }, [confirm, showError]);

  // Quick delete wrapper
  const quickDelete = useCallback(async (
    itemName: string,
    itemType: string,
    action: () => Promise<void> | void,
    options: {
      additionalWarning?: string;
      cascadeInfo?: string[];
    } = {}
  ): Promise<boolean> => {
    try {
      const confirmed = await confirmDelete(itemName, itemType, {
        additionalWarning: options.additionalWarning,
        cascadeInfo: options.cascadeInfo
      });
      
      if (confirmed) {
        await action();
        showSuccess('Deleted Successfully', `${itemType} "${itemName}" has been deleted.`);
        return true;
      }
      return false;
    } catch (error) {
      showError('Delete Failed', error instanceof Error ? error.message : 'Failed to delete item');
      return false;
    }
  }, [confirmDelete, showSuccess, showError]);

  // Quick save wrapper
  const quickSave = useCallback(async (
    action: () => Promise<void> | void,
    itemType: string = 'Item',
    options: {
      successMessage?: string;
      errorMessage?: string;
    } = {}
  ): Promise<boolean> => {
    try {
      await action();
      showSuccess(
        'Saved Successfully', 
        options.successMessage || `${itemType} has been saved successfully.`
      );
      return true;
    } catch (error) {
      showError(
        'Save Failed', 
        options.errorMessage || error instanceof Error ? error.message : 'Failed to save item'
      );
      return false;
    }
  }, [showSuccess, showError]);

  return {
    quickConfirm,
    quickDelete,
    quickSave,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };
};

// Master hook that combines all modal functionality
export const useAllModals = () => {
  const core = useModalCore();
  const confirmation = useConfirmationModal();
  const notification = useNotificationModal();
  const form = useFormModal();
  const file = useFileModal();
  const calendar = useCalendarModal();
  const data = useDataModal();
  const searchFilter = useSearchFilterModal();
  const settings = useSettingsModal();
  const detail = useDetailModal();
  const classModal = useClassModal();
  const feeModal = useFeeModal();
  const attendanceModal = useAttendanceModal();
  const eventModal = useEventModal();
  const quickActions = useQuickActions();

  return {
    // Core functionality
    ...core,
    
    // Specialized hooks
    confirmation,
    notification,
    form,
    file,
    calendar,
    data,
    searchFilter,
    settings,
    detail,
    classModal,
    feeModal,
    attendanceModal,
    eventModal,
    quickActions
  };
};