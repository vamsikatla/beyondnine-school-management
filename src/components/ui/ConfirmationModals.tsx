import * as React from "react";
import { Modal, ModalFooter } from "./Modal";
import { Button } from "./Button";
import { cn } from "@/lib/utils";
import { 
  AlertTriangle, 
  Trash2, 
  UserX, 
  AlertCircle, 
  CheckCircle, 
  XCircle,
  Users,
  UserCheck,
  Lock,
  Unlock,
  RefreshCw,
  Download,
  Upload,
  Send,
  Archive,
  Eye,
  EyeOff
} from "lucide-react";

// Base Confirmation Modal Interface
interface BaseConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info" | "success";
  icon?: React.ReactNode;
  isLoading?: boolean;
}

// Generic Confirmation Modal
export const ConfirmationModal: React.FC<BaseConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "warning",
  icon,
  isLoading = false
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "danger":
        return {
          confirmButtonVariant: "destructive" as const,
          iconColor: "text-red-500",
          defaultIcon: <AlertTriangle className="h-6 w-6" />
        };
      case "warning":
        return {
          confirmButtonVariant: "warning" as const,
          iconColor: "text-yellow-500",
          defaultIcon: <AlertCircle className="h-6 w-6" />
        };
      case "success":
        return {
          confirmButtonVariant: "success" as const,
          iconColor: "text-green-500",
          defaultIcon: <CheckCircle className="h-6 w-6" />
        };
      case "info":
      default:
        return {
          confirmButtonVariant: "default" as const,
          iconColor: "text-blue-500",
          defaultIcon: <AlertCircle className="h-6 w-6" />
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      closeOnOverlayClick={!isLoading}
      closeOnEscape={!isLoading}
      preventClose={isLoading}
      icon={
        <div className={cn(variantStyles.iconColor)}>
          {icon || variantStyles.defaultIcon}
        </div>
      }
    >
      {message && (
        <div className="mb-6">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {message}
          </p>
        </div>
      )}

      <ModalFooter>
        <Button 
          type="button" 
          variant="outline" 
          onClick={onClose}
          disabled={isLoading}
        >
          {cancelText}
        </Button>
        <Button 
          type="button" 
          variant={variantStyles.confirmButtonVariant}
          onClick={onConfirm}
          loading={isLoading}
        >
          {confirmText}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

// Delete Confirmation Modal
interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  entityName: string;
  entityType: string;
  isLoading?: boolean;
  additionalWarning?: string;
  cascadeInfo?: string[];
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  entityName,
  entityType,
  isLoading = false,
  additionalWarning,
  cascadeInfo = []
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Delete ${entityType}`}
      size="default"
      closeOnOverlayClick={!isLoading}
      closeOnEscape={!isLoading}
      preventClose={isLoading}
      icon={<Trash2 className="h-6 w-6 text-red-500" />}
    >
      <div className="space-y-4">
        <div className="p-4 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-800 dark:text-red-200">
            Are you sure you want to delete <strong>"{entityName}"</strong>?
          </p>
          <p className="text-xs text-red-600 dark:text-red-300 mt-1">
            This action cannot be undone.
          </p>
        </div>

        {additionalWarning && (
          <div className="p-3 bg-yellow-50 dark:bg-yellow-950/50 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <AlertTriangle className="h-4 w-4 inline mr-2" />
              {additionalWarning}
            </p>
          </div>
        )}

        {cascadeInfo.length > 0 && (
          <div className="p-3 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200 font-medium mb-2">
              This will also delete:
            </p>
            <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
              {cascadeInfo.map((item, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-1 h-1 bg-blue-400 rounded-full mr-2"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <ModalFooter>
        <Button 
          type="button" 
          variant="outline" 
          onClick={onClose}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button 
          type="button" 
          variant="destructive"
          onClick={onConfirm}
          loading={isLoading}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete {entityType}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

// Bulk Delete Confirmation Modal
interface BulkDeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  selectedCount: number;
  entityType: string;
  isLoading?: boolean;
  selectedItems?: string[];
}

export const BulkDeleteConfirmationModal: React.FC<BulkDeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  selectedCount,
  entityType,
  isLoading = false,
  selectedItems = []
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Delete ${selectedCount} ${entityType}${selectedCount > 1 ? 's' : ''}`}
      size="default"
      closeOnOverlayClick={!isLoading}
      closeOnEscape={!isLoading}
      preventClose={isLoading}
      icon={<Trash2 className="h-6 w-6 text-red-500" />}
    >
      <div className="space-y-4">
        <div className="p-4 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-800 dark:text-red-200">
            Are you sure you want to delete <strong>{selectedCount}</strong> {entityType}{selectedCount > 1 ? 's' : ''}?
          </p>
          <p className="text-xs text-red-600 dark:text-red-300 mt-1">
            This action cannot be undone.
          </p>
        </div>

        {selectedItems.length > 0 && selectedItems.length <= 10 && (
          <div className="max-h-32 overflow-y-auto">
            <p className="text-sm font-medium mb-2">Selected items:</p>
            <ul className="text-sm space-y-1">
              {selectedItems.map((item, index) => (
                <li key={index} className="flex items-center text-muted-foreground">
                  <span className="w-1 h-1 bg-muted-foreground rounded-full mr-2"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <ModalFooter>
        <Button 
          type="button" 
          variant="outline" 
          onClick={onClose}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button 
          type="button" 
          variant="destructive"
          onClick={onConfirm}
          loading={isLoading}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete All
        </Button>
      </ModalFooter>
    </Modal>
  );
};

// Status Change Confirmation Modal
interface StatusChangeConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  entityName: string;
  currentStatus: string;
  newStatus: string;
  entityType: string;
  isLoading?: boolean;
  statusChangeDescription?: string;
}

export const StatusChangeConfirmationModal: React.FC<StatusChangeConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  entityName,
  currentStatus,
  newStatus,
  entityType,
  isLoading = false,
  statusChangeDescription
}) => {
  const getStatusIcon = (status: string) => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes('active') || lowerStatus.includes('enable')) {
      return <UserCheck className="h-5 w-5 text-green-500" />;
    } else if (lowerStatus.includes('inactive') || lowerStatus.includes('disable')) {
      return <UserX className="h-5 w-5 text-red-500" />;
    } else if (lowerStatus.includes('suspend')) {
      return <Lock className="h-5 w-5 text-yellow-500" />;
    } else if (lowerStatus.includes('archive')) {
      return <Archive className="h-5 w-5 text-gray-500" />;
    }
    return <RefreshCw className="h-5 w-5 text-blue-500" />;
  };

  const getStatusColor = (status: string) => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes('active') || lowerStatus.includes('enable')) {
      return 'text-green-600 bg-green-100 dark:bg-green-900/50';
    } else if (lowerStatus.includes('inactive') || lowerStatus.includes('disable')) {
      return 'text-red-600 bg-red-100 dark:bg-red-900/50';
    } else if (lowerStatus.includes('suspend')) {
      return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/50';
    } else if (lowerStatus.includes('archive')) {
      return 'text-gray-600 bg-gray-100 dark:bg-gray-900/50';
    }
    return 'text-blue-600 bg-blue-100 dark:bg-blue-900/50';
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Change ${entityType} Status`}
      size="default"
      closeOnOverlayClick={!isLoading}
      closeOnEscape={!isLoading}
      preventClose={isLoading}
      icon={getStatusIcon(newStatus)}
    >
      <div className="space-y-4">
        <div className="p-4 border rounded-lg">
          <p className="text-sm mb-3">
            Change status of <strong>"{entityName}"</strong>:
          </p>
          
          <div className="flex items-center justify-center space-x-4">
            <div className={cn("px-3 py-1 rounded-full text-xs font-medium", getStatusColor(currentStatus))}>
              {currentStatus}
            </div>
            <div className="text-muted-foreground">→</div>
            <div className={cn("px-3 py-1 rounded-full text-xs font-medium", getStatusColor(newStatus))}>
              {newStatus}
            </div>
          </div>
        </div>

        {statusChangeDescription && (
          <div className="p-3 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              {statusChangeDescription}
            </p>
          </div>
        )}
      </div>

      <ModalFooter>
        <Button 
          type="button" 
          variant="outline" 
          onClick={onClose}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button 
          type="button" 
          variant="default"
          onClick={onConfirm}
          loading={isLoading}
        >
          {getStatusIcon(newStatus)}
          <span className="ml-2">Change Status</span>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

// Action Confirmation Modal
interface ActionConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  action: string;
  entityName?: string;
  description?: string;
  isLoading?: boolean;
  variant?: "default" | "warning" | "danger";
  icon?: React.ReactNode;
  confirmText?: string;
}

export const ActionConfirmationModal: React.FC<ActionConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  action,
  entityName,
  description,
  isLoading = false,
  variant = "default",
  icon,
  confirmText
}) => {
  const getActionIcon = (action: string) => {
    const lowerAction = action.toLowerCase();
    if (lowerAction.includes('send') || lowerAction.includes('email')) {
      return <Send className="h-6 w-6 text-blue-500" />;
    } else if (lowerAction.includes('export') || lowerAction.includes('download')) {
      return <Download className="h-6 w-6 text-green-500" />;
    } else if (lowerAction.includes('import') || lowerAction.includes('upload')) {
      return <Upload className="h-6 w-6 text-blue-500" />;
    } else if (lowerAction.includes('reset') || lowerAction.includes('refresh')) {
      return <RefreshCw className="h-6 w-6 text-yellow-500" />;
    } else if (lowerAction.includes('archive')) {
      return <Archive className="h-6 w-6 text-gray-500" />;
    }
    return <CheckCircle className="h-6 w-6 text-blue-500" />;
  };

  const getVariantButton = () => {
    switch (variant) {
      case "danger":
        return "destructive" as const;
      case "warning":
        return "warning" as const;
      default:
        return "default" as const;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Confirm ${action}`}
      size="default"
      closeOnOverlayClick={!isLoading}
      closeOnEscape={!isLoading}
      preventClose={isLoading}
      icon={icon || getActionIcon(action)}
    >
      <div className="space-y-4">
        <p className="text-sm">
          Are you sure you want to <strong>{action.toLowerCase()}</strong>
          {entityName && (
            <>
              {' '}<strong>"{entityName}"</strong>
            </>
          )}?
        </p>

        {description && (
          <div className="p-3 bg-muted/50 border rounded-lg">
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          </div>
        )}
      </div>

      <ModalFooter>
        <Button 
          type="button" 
          variant="outline" 
          onClick={onClose}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button 
          type="button" 
          variant={getVariantButton()}
          onClick={onConfirm}
          loading={isLoading}
        >
          {confirmText || action}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

// Logout Confirmation Modal
export const LogoutConfirmationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  isLoading?: boolean;
}> = ({ isOpen, onClose, onConfirm, isLoading = false }) => {
  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Sign Out"
      message="Are you sure you want to sign out? You will need to sign in again to access your account."
      confirmText="Sign Out"
      variant="warning"
      icon={<UserX className="h-6 w-6" />}
      isLoading={isLoading}
    />
  );
};

// Password Reset Confirmation Modal
export const PasswordResetConfirmationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  userName: string;
  isLoading?: boolean;
}> = ({ isOpen, onClose, onConfirm, userName, isLoading = false }) => {
  return (
    <ActionConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      action="Reset Password"
      entityName={userName}
      description="A password reset email will be sent to the user's registered email address."
      variant="warning"
      icon={<RefreshCw className="h-6 w-6 text-yellow-500" />}
      isLoading={isLoading}
    />
  );
};

// Account Activation/Deactivation Confirmation
export const AccountToggleConfirmationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  userName: string;
  currentStatus: boolean;
  isLoading?: boolean;
}> = ({ isOpen, onClose, onConfirm, userName, currentStatus, isLoading = false }) => {
  const action = currentStatus ? "Deactivate" : "Activate";
  const description = currentStatus 
    ? "The user will no longer be able to access their account until it is reactivated."
    : "The user will be able to access their account and all associated features.";

  return (
    <ActionConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      action={`${action} Account`}
      entityName={userName}
      description={description}
      variant={currentStatus ? "warning" : "default"}
      icon={currentStatus ? <Lock className="h-6 w-6 text-yellow-500" /> : <Unlock className="h-6 w-6 text-green-500" />}
      confirmText={action}
      isLoading={isLoading}
    />
  );
};

// Data Export Confirmation Modal
export const DataExportConfirmationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  dataType: string;
  format: string;
  recordCount?: number;
  isLoading?: boolean;
}> = ({ isOpen, onClose, onConfirm, dataType, format, recordCount, isLoading = false }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Export Data"
      size="default"
      closeOnOverlayClick={!isLoading}
      closeOnEscape={!isLoading}
      preventClose={isLoading}
      icon={<Download className="h-6 w-6 text-green-500" />}
    >
      <div className="space-y-4">
        <p className="text-sm">
          Export <strong>{dataType}</strong> data in <strong>{format.toUpperCase()}</strong> format.
        </p>

        {recordCount && (
          <div className="p-3 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>{recordCount.toLocaleString()}</strong> records will be exported.
            </p>
          </div>
        )}

        <div className="p-3 bg-yellow-50 dark:bg-yellow-950/50 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <p className="text-xs text-yellow-800 dark:text-yellow-200">
            <AlertTriangle className="h-4 w-4 inline mr-2" />
            Exported data may contain sensitive information. Please handle it securely.
          </p>
        </div>
      </div>

      <ModalFooter>
        <Button 
          type="button" 
          variant="outline" 
          onClick={onClose}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button 
          type="button" 
          variant="default"
          onClick={onConfirm}
          loading={isLoading}
        >
          <Download className="w-4 h-4 mr-2" />
          Export Data
        </Button>
      </ModalFooter>
    </Modal>
  );
};