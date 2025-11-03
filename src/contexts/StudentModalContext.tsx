"use client";

import * as React from "react";
import { useAuth } from '@/contexts/AuthContext';

// Student-specific modal types
export enum StudentModalType {
  // Academic Modals
  VIEW_GRADES = "STUDENT_VIEW_GRADES",
  VIEW_ASSIGNMENTS = "STUDENT_VIEW_ASSIGNMENTS",
  SUBMIT_ASSIGNMENT = "STUDENT_SUBMIT_ASSIGNMENT",
  VIEW_EXAM_SCHEDULE = "STUDENT_VIEW_EXAM_SCHEDULE",
  VIEW_TIMETABLE = "STUDENT_VIEW_TIMETABLE",
  VIEW_SUBJECTS = "STUDENT_VIEW_SUBJECTS",
  
  // Attendance Modals
  VIEW_ATTENDANCE = "STUDENT_VIEW_ATTENDANCE",
  REQUEST_LEAVE = "STUDENT_REQUEST_LEAVE",
  VIEW_LEAVE_STATUS = "STUDENT_VIEW_LEAVE_STATUS",
  
  // Fee Management Modals
  VIEW_FEE_DETAILS = "STUDENT_VIEW_FEE_DETAILS",
  PAY_FEES = "STUDENT_PAY_FEES",
  VIEW_PAYMENT_HISTORY = "STUDENT_VIEW_PAYMENT_HISTORY",
  DOWNLOAD_RECEIPT = "STUDENT_DOWNLOAD_RECEIPT",
  
  // Communication Modals
  MESSAGE_TEACHER = "STUDENT_MESSAGE_TEACHER",
  VIEW_ANNOUNCEMENTS = "STUDENT_VIEW_ANNOUNCEMENTS",
  VIEW_NOTIFICATIONS = "STUDENT_VIEW_NOTIFICATIONS",
  PARENT_COMMUNICATION = "STUDENT_PARENT_COMMUNICATION",
  
  // Profile & Settings Modals
  VIEW_PROFILE = "STUDENT_VIEW_PROFILE",
  EDIT_PROFILE = "STUDENT_EDIT_PROFILE",
  CHANGE_PASSWORD = "STUDENT_CHANGE_PASSWORD",
  PREFERENCES = "STUDENT_PREFERENCES",
  
  // Resource Modals
  VIEW_LIBRARY_BOOKS = "STUDENT_VIEW_LIBRARY_BOOKS",
  REQUEST_BOOK = "STUDENT_REQUEST_BOOK",
  VIEW_DOWNLOADS = "STUDENT_VIEW_DOWNLOADS",
  VIEW_STUDY_MATERIALS = "STUDENT_VIEW_STUDY_MATERIALS",
  
  // Event & Calendar Modals
  VIEW_EVENTS = "STUDENT_VIEW_EVENTS",
  VIEW_CALENDAR = "STUDENT_VIEW_CALENDAR",
  REGISTER_EVENT = "STUDENT_REGISTER_EVENT",
  
  // Performance Modals
  VIEW_PROGRESS_REPORT = "STUDENT_VIEW_PROGRESS_REPORT",
  VIEW_ANALYTICS = "STUDENT_VIEW_ANALYTICS",
  SET_GOALS = "STUDENT_SET_GOALS",
  VIEW_ACHIEVEMENTS = "STUDENT_VIEW_ACHIEVEMENTS",
  
  // Help & Support Modals
  HELP_SUPPORT = "STUDENT_HELP_SUPPORT",
  REPORT_ISSUE = "STUDENT_REPORT_ISSUE",
  FEEDBACK = "STUDENT_FEEDBACK",
}

// Student modal permissions
export const STUDENT_MODAL_PERMISSIONS: Record<StudentModalType, string[]> = {
  // Academic permissions
  [StudentModalType.VIEW_GRADES]: ['view_grades'],
  [StudentModalType.VIEW_ASSIGNMENTS]: ['view_assignments'],
  [StudentModalType.SUBMIT_ASSIGNMENT]: ['submit_assignment'],
  [StudentModalType.VIEW_EXAM_SCHEDULE]: ['view_exam_schedule'],
  [StudentModalType.VIEW_TIMETABLE]: ['view_timetable'],
  [StudentModalType.VIEW_SUBJECTS]: ['view_subjects'],
  
  // Attendance permissions
  [StudentModalType.VIEW_ATTENDANCE]: ['view_attendance'],
  [StudentModalType.REQUEST_LEAVE]: ['request_leave'],
  [StudentModalType.VIEW_LEAVE_STATUS]: ['view_leave_status'],
  
  // Fee permissions
  [StudentModalType.VIEW_FEE_DETAILS]: ['view_fee_details'],
  [StudentModalType.PAY_FEES]: ['pay_fees'],
  [StudentModalType.VIEW_PAYMENT_HISTORY]: ['view_payment_history'],
  [StudentModalType.DOWNLOAD_RECEIPT]: ['download_receipt'],
  
  // Communication permissions
  [StudentModalType.MESSAGE_TEACHER]: ['message_teacher'],
  [StudentModalType.VIEW_ANNOUNCEMENTS]: ['view_announcements'],
  [StudentModalType.VIEW_NOTIFICATIONS]: ['view_notifications'],
  [StudentModalType.PARENT_COMMUNICATION]: ['parent_communication'],
  
  // Profile permissions
  [StudentModalType.VIEW_PROFILE]: ['view_profile'],
  [StudentModalType.EDIT_PROFILE]: ['edit_profile'],
  [StudentModalType.CHANGE_PASSWORD]: ['change_password'],
  [StudentModalType.PREFERENCES]: ['user_preferences'],
  
  // Resource permissions
  [StudentModalType.VIEW_LIBRARY_BOOKS]: ['view_library'],
  [StudentModalType.REQUEST_BOOK]: ['request_book'],
  [StudentModalType.VIEW_DOWNLOADS]: ['view_downloads'],
  [StudentModalType.VIEW_STUDY_MATERIALS]: ['view_study_materials'],
  
  // Event permissions
  [StudentModalType.VIEW_EVENTS]: ['view_events'],
  [StudentModalType.VIEW_CALENDAR]: ['view_calendar'],
  [StudentModalType.REGISTER_EVENT]: ['register_event'],
  
  // Performance permissions
  [StudentModalType.VIEW_PROGRESS_REPORT]: ['view_progress'],
  [StudentModalType.VIEW_ANALYTICS]: ['view_analytics'],
  [StudentModalType.SET_GOALS]: ['set_goals'],
  [StudentModalType.VIEW_ACHIEVEMENTS]: ['view_achievements'],
  
  // Support permissions
  [StudentModalType.HELP_SUPPORT]: ['help_support'],
  [StudentModalType.REPORT_ISSUE]: ['report_issue'],
  [StudentModalType.FEEDBACK]: ['feedback'],
};

// Student modal state interface
interface StudentModalState {
  type: StudentModalType | null;
  isOpen: boolean;
  props: any;
  onClose?: () => void;
  onConfirm?: (data?: any) => void;
}

// Student modal context interface
interface StudentModalContextType {
  currentModal: StudentModalState;
  openModal: (type: StudentModalType, props?: any, callbacks?: {
    onClose?: () => void;
    onConfirm?: (data?: any) => void;
  }) => void;
  closeModal: () => void;
  updateModalProps: (props: any) => void;
  isModalOpen: (type: StudentModalType) => boolean;
  hasModalPermission: (type: StudentModalType) => boolean;
}

// Create the context
const StudentModalContext = React.createContext<StudentModalContextType | undefined>(undefined);

// Student Modal Provider component
export const StudentModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, hasPermission } = useAuth();
  
  const [currentModal, setCurrentModal] = React.useState<StudentModalState>({
    type: null,
    isOpen: false,
    props: {},
    onClose: undefined,
    onConfirm: undefined
  });

  const [modalHistory, setModalHistory] = React.useState<StudentModalState[]>([]);

  const hasModalPermission = React.useCallback((type: StudentModalType): boolean => {
    if (!user || user.role !== 'student') return false;
    
    const requiredPermissions = STUDENT_MODAL_PERMISSIONS[type];
    if (!requiredPermissions) return false;
    
    return requiredPermissions.every(permission => hasPermission(permission));
  }, [user, hasPermission]);

  const openModal = React.useCallback((
    type: StudentModalType, 
    props: any = {}, 
    callbacks: {
      onClose?: () => void;
      onConfirm?: (data?: any) => void;
    } = {}
  ) => {
    // Check permissions before opening modal
    if (!hasModalPermission(type)) {
      console.warn(`Student does not have permission to open modal: ${type}`);
      return;
    }

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
  }, [currentModal, hasModalPermission]);

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

  const isModalOpen = React.useCallback((type: StudentModalType) => {
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
    isModalOpen,
    hasModalPermission
  }), [currentModal, openModal, closeModal, updateModalProps, isModalOpen, hasModalPermission]);

  return (
    <StudentModalContext.Provider value={value}>
      {children}
    </StudentModalContext.Provider>
  );
};

// Custom hook to use the student modal context
export const useStudentModal = () => {
  const context = React.useContext(StudentModalContext);
  
  if (!context) {
    throw new Error('useStudentModal must be used within a StudentModalProvider');
  }
  
  return context;
};

// Specialized hooks for different student modal categories
export const useStudentAcademicModals = () => {
  const { openModal, closeModal, hasModalPermission } = useStudentModal();
  
  const viewGrades = React.useCallback((options: {
    subjectId?: string;
    termId?: string;
    onViewDetails?: (grade: any) => void;
  } = {}) => {
    if (!hasModalPermission(StudentModalType.VIEW_GRADES)) return;
    
    openModal(StudentModalType.VIEW_GRADES, {
      subjectId: options.subjectId,
      termId: options.termId,
      title: "My Grades"
    }, {
      onConfirm: options.onViewDetails
    });
  }, [openModal, hasModalPermission]);

  const viewAssignments = React.useCallback((options: {
    subjectId?: string;
    status?: 'pending' | 'submitted' | 'graded';
    onSubmitAssignment?: (assignmentId: string) => void;
  } = {}) => {
    if (!hasModalPermission(StudentModalType.VIEW_ASSIGNMENTS)) return;
    
    openModal(StudentModalType.VIEW_ASSIGNMENTS, {
      subjectId: options.subjectId,
      status: options.status,
      title: "My Assignments"
    }, {
      onConfirm: options.onSubmitAssignment
    });
  }, [openModal, hasModalPermission]);

  const submitAssignment = React.useCallback((assignmentId: string, options: {
    onSubmit?: (submissionData: any) => void;
    onCancel?: () => void;
  } = {}) => {
    if (!hasModalPermission(StudentModalType.SUBMIT_ASSIGNMENT)) return;
    
    openModal(StudentModalType.SUBMIT_ASSIGNMENT, {
      assignmentId,
      title: "Submit Assignment"
    }, {
      onConfirm: options.onSubmit,
      onClose: options.onCancel
    });
  }, [openModal, hasModalPermission]);

  const viewExamSchedule = React.useCallback((options: {
    upcomingOnly?: boolean;
    onViewExamDetails?: (exam: any) => void;
  } = {}) => {
    if (!hasModalPermission(StudentModalType.VIEW_EXAM_SCHEDULE)) return;
    
    openModal(StudentModalType.VIEW_EXAM_SCHEDULE, {
      upcomingOnly: options.upcomingOnly !== false,
      title: "Exam Schedule"
    }, {
      onConfirm: options.onViewExamDetails
    });
  }, [openModal, hasModalPermission]);

  return {
    viewGrades,
    viewAssignments,
    submitAssignment,
    viewExamSchedule,
    closeModal
  };
};

export const useStudentAttendanceModals = () => {
  const { openModal, closeModal, hasModalPermission } = useStudentModal();
  
  const viewAttendance = React.useCallback((options: {
    dateRange?: { startDate: Date; endDate: Date };
    subjectId?: string;
  } = {}) => {
    if (!hasModalPermission(StudentModalType.VIEW_ATTENDANCE)) return;
    
    openModal(StudentModalType.VIEW_ATTENDANCE, {
      dateRange: options.dateRange,
      subjectId: options.subjectId,
      title: "My Attendance"
    });
  }, [openModal, hasModalPermission]);

  const requestLeave = React.useCallback((options: {
    onSubmit?: (leaveData: any) => void;
    onCancel?: () => void;
  } = {}) => {
    if (!hasModalPermission(StudentModalType.REQUEST_LEAVE)) return;
    
    openModal(StudentModalType.REQUEST_LEAVE, {
      title: "Request Leave"
    }, {
      onConfirm: options.onSubmit,
      onClose: options.onCancel
    });
  }, [openModal, hasModalPermission]);

  return {
    viewAttendance,
    requestLeave,
    closeModal
  };
};

export const useStudentFeeModals = () => {
  const { openModal, closeModal, hasModalPermission } = useStudentModal();
  
  const viewFeeDetails = React.useCallback(() => {
    if (!hasModalPermission(StudentModalType.VIEW_FEE_DETAILS)) return;
    
    openModal(StudentModalType.VIEW_FEE_DETAILS, {
      title: "Fee Details"
    });
  }, [openModal, hasModalPermission]);

  const payFees = React.useCallback((options: {
    feeId?: string;
    onPaymentSuccess?: (paymentData: any) => void;
    onPaymentFailure?: (error: any) => void;
  } = {}) => {
    if (!hasModalPermission(StudentModalType.PAY_FEES)) return;
    
    openModal(StudentModalType.PAY_FEES, {
      feeId: options.feeId,
      title: "Pay Fees"
    }, {
      onConfirm: options.onPaymentSuccess
    });
  }, [openModal, hasModalPermission]);

  return {
    viewFeeDetails,
    payFees,
    closeModal
  };
};

// Export the context for advanced usage
export { StudentModalContext };