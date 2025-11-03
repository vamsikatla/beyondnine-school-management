import * as React from "react";
import { Modal, ModalFooter } from "./Modal";
import { Button } from "./Button";
import { cn } from "@/lib/utils";
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Info, 
  Bell,
  X,
  Copy,
  ExternalLink,
  Share2,
  Download,
  RefreshCw,
  Clock,
  User,
  Users,
  Activity,
  FileText,
  Star
} from "lucide-react";

// Toast-style notification that appears and auto-dismisses
interface ToastNotificationProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message?: string;
  variant: "success" | "error" | "warning" | "info";
  duration?: number; // in milliseconds, 0 means no auto-dismiss
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
  showCloseButton?: boolean;
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant?: "default" | "outline" | "ghost";
  }>;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({
  isOpen,
  onClose,
  title,
  message,
  variant,
  duration = 5000,
  position = "top-right",
  showCloseButton = true,
  actions = []
}) => {
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!isOpen || duration === 0) return;
    
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    
    return () => clearTimeout(timer);
  }, [isOpen, duration, onClose]);

  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return {
          icon: <CheckCircle className="h-5 w-5 text-green-500" />,
          borderColor: "border-green-200 dark:border-green-800",
          bgColor: "bg-green-50 dark:bg-green-950/50",
          textColor: "text-green-800 dark:text-green-200"
        };
      case "error":
        return {
          icon: <XCircle className="h-5 w-5 text-red-500" />,
          borderColor: "border-red-200 dark:border-red-800",
          bgColor: "bg-red-50 dark:bg-red-950/50",
          textColor: "text-red-800 dark:text-red-200"
        };
      case "warning":
        return {
          icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
          borderColor: "border-yellow-200 dark:border-yellow-800",
          bgColor: "bg-yellow-50 dark:bg-yellow-950/50",
          textColor: "text-yellow-800 dark:text-yellow-200"
        };
      case "info":
      default:
        return {
          icon: <Info className="h-5 w-5 text-blue-500" />,
          borderColor: "border-blue-200 dark:border-blue-800",
          bgColor: "bg-blue-50 dark:bg-blue-950/50",
          textColor: "text-blue-800 dark:text-blue-200"
        };
    }
  };

  const getPositionStyles = () => {
    switch (position) {
      case "top-left":
        return "top-4 left-4";
      case "top-center":
        return "top-4 left-1/2 transform -translate-x-1/2";
      case "top-right":
        return "top-4 right-4";
      case "bottom-left":
        return "bottom-4 left-4";
      case "bottom-center":
        return "bottom-4 left-1/2 transform -translate-x-1/2";
      case "bottom-right":
        return "bottom-4 right-4";
      default:
        return "top-4 right-4";
    }
  };

  if (!mounted || !isOpen) return null;

  const variantStyles = getVariantStyles();

  return (
    <div className={cn(
      "fixed z-50 w-full max-w-sm p-4 rounded-lg border shadow-lg transition-all duration-300",
      variantStyles.bgColor,
      variantStyles.borderColor,
      getPositionStyles(),
      isOpen ? "animate-in slide-in-from-top-2 fade-in-0" : "animate-out slide-out-to-top-2 fade-out-0"
    )}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          {variantStyles.icon}
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className={cn("text-sm font-medium", variantStyles.textColor)}>
            {title}
          </h4>
          
          {message && (
            <p className={cn("text-sm mt-1", variantStyles.textColor, "opacity-90")}>
              {message}
            </p>
          )}
          
          {actions.length > 0 && (
            <div className="flex items-center gap-2 mt-3">
              {actions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.onClick}
                  className={cn(
                    "text-xs px-2 py-1 rounded font-medium transition-colors",
                    action.variant === "outline" 
                      ? `border ${variantStyles.borderColor} ${variantStyles.textColor} hover:opacity-80`
                      : action.variant === "ghost"
                      ? `${variantStyles.textColor} hover:opacity-80`
                      : `bg-white/20 ${variantStyles.textColor} hover:bg-white/30`
                  )}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {showCloseButton && (
          <button
            onClick={onClose}
            className={cn(
              "flex-shrink-0 p-1 rounded-md transition-colors",
              variantStyles.textColor,
              "hover:bg-white/20"
            )}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

// Modal-style notification for more complex notifications
interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message?: string;
  variant: "success" | "error" | "warning" | "info";
  details?: string[];
  primaryAction?: {
    label: string;
    onClick: () => void;
    variant?: "default" | "destructive" | "outline";
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  showCloseButton?: boolean;
  children?: React.ReactNode;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  variant,
  details = [],
  primaryAction,
  secondaryAction,
  showCloseButton = true,
  children
}) => {
  const getVariantIcon = () => {
    switch (variant) {
      case "success":
        return "success";
      case "error":
        return "error";
      case "warning":
        return "warning";
      case "info":
      default:
        return "info";
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      icon={getVariantIcon()}
      size="default"
      showCloseButton={showCloseButton}
    >
      <div className="space-y-4">
        {message && (
          <p className="text-sm text-muted-foreground">
            {message}
          </p>
        )}
        
        {details.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Details:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {details.map((detail, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-muted-foreground rounded-full"></span>
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {children && (
          <div className="mt-4">
            {children}
          </div>
        )}
      </div>

      <ModalFooter>
        <div className="flex justify-end gap-2">
          {secondaryAction && (
            <Button 
              variant="outline" 
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </Button>
          )}
          
          {primaryAction ? (
            <Button 
              variant={primaryAction.variant || "default"}
              onClick={primaryAction.onClick}
            >
              {primaryAction.label}
            </Button>
          ) : (
            <Button variant="default" onClick={onClose}>
              OK
            </Button>
          )}
        </div>
      </ModalFooter>
    </Modal>
  );
};

// System Notification Modal for important system messages
interface SystemNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notification: {
    id: string;
    type: "maintenance" | "update" | "announcement" | "alert";
    priority: "low" | "medium" | "high" | "critical";
    title: string;
    message: string;
    timestamp: Date;
    expiresAt?: Date;
    actions?: Array<{
      label: string;
      url?: string;
      action?: () => void;
      variant?: "default" | "outline" | "destructive";
    }>;
    metadata?: {
      version?: string;
      affectedServices?: string[];
      estimatedDuration?: string;
      contactInfo?: string;
    };
  };
  onMarkAsRead?: () => void;
  onDismiss?: () => void;
}

export const SystemNotificationModal: React.FC<SystemNotificationModalProps> = ({
  isOpen,
  onClose,
  notification,
  onMarkAsRead,
  onDismiss
}) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "maintenance":
        return <RefreshCw className="h-6 w-6 text-orange-500" />;
      case "update":
        return <Download className="h-6 w-6 text-blue-500" />;
      case "announcement":
        return <Bell className="h-6 w-6 text-green-500" />;
      case "alert":
        return <AlertTriangle className="h-6 w-6 text-red-500" />;
      default:
        return <Info className="h-6 w-6 text-blue-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "text-red-600 bg-red-100 dark:bg-red-900/50";
      case "high":
        return "text-orange-600 bg-orange-100 dark:bg-orange-900/50";
      case "medium":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/50";
      case "low":
        return "text-green-600 bg-green-100 dark:bg-green-900/50";
      default:
        return "text-blue-600 bg-blue-100 dark:bg-blue-900/50";
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={notification.title}
      size="lg"
      icon={getTypeIcon(notification.type)}
    >
      <div className="space-y-6">
        {/* Header with priority and timestamp */}
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className={cn("px-2 py-1 rounded-full text-xs font-medium capitalize", getPriorityColor(notification.priority))}>
              {notification.priority} Priority
            </div>
            <div className={cn("px-2 py-1 rounded-full text-xs font-medium capitalize", "text-muted-foreground bg-muted")}>
              {notification.type}
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {notification.timestamp.toLocaleString()}
          </div>
        </div>

        {/* Message */}
        <div className="prose prose-sm max-w-none">
          <p className="text-muted-foreground whitespace-pre-wrap">
            {notification.message}
          </p>
        </div>

        {/* Metadata */}
        {notification.metadata && (
          <div className="space-y-4">
            {notification.metadata.version && (
              <div className="p-3 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Version:</strong> {notification.metadata.version}
                </p>
              </div>
            )}

            {notification.metadata.affectedServices && notification.metadata.affectedServices.length > 0 && (
              <div className="p-3 bg-yellow-50 dark:bg-yellow-950/50 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-200 font-medium mb-2">
                  Affected Services:
                </p>
                <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                  {notification.metadata.affectedServices.map((service, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-yellow-400 rounded-full"></span>
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {notification.metadata.estimatedDuration && (
              <div className="p-3 bg-orange-50 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800 rounded-lg">
                <p className="text-sm text-orange-800 dark:text-orange-200">
                  <strong>Estimated Duration:</strong> {notification.metadata.estimatedDuration}
                </p>
              </div>
            )}

            {notification.metadata.contactInfo && (
              <div className="p-3 bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-sm text-green-800 dark:text-green-200">
                  <strong>Contact:</strong> {notification.metadata.contactInfo}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Expiration notice */}
        {notification.expiresAt && (
          <div className="p-3 bg-gray-50 dark:bg-gray-950/50 border border-gray-200 dark:border-gray-800 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This notification expires on {notification.expiresAt.toLocaleString()}
            </p>
          </div>
        )}

        {/* Custom Actions */}
        {notification.actions && notification.actions.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Available Actions:</h4>
            <div className="flex flex-wrap gap-2">
              {notification.actions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant || "outline"}
                  size="sm"
                  onClick={action.action || (() => action.url && window.open(action.url, '_blank'))}
                >
                  {action.url && <ExternalLink className="w-4 h-4 mr-2" />}
                  {action.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>

      <ModalFooter>
        <div className="flex justify-between w-full">
          <div className="flex gap-2">
            {onDismiss && (
              <Button variant="outline" onClick={onDismiss}>
                Dismiss
              </Button>
            )}
            
            <Button variant="outline" onClick={() => {
              navigator.clipboard.writeText(`${notification.title}\n\n${notification.message}`);
            }}>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </div>
          
          <div className="flex gap-2">
            {onMarkAsRead && (
              <Button variant="outline" onClick={onMarkAsRead}>
                Mark as Read
              </Button>
            )}
            
            <Button variant="default" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </ModalFooter>
    </Modal>
  );
};

// Activity Notification Modal for user activity notifications
interface ActivityNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  activities: Array<{
    id: string;
    type: "login" | "assignment" | "grade" | "announcement" | "message" | "system";
    title: string;
    description: string;
    timestamp: Date;
    user?: { name: string; avatar?: string };
    metadata?: any;
    isRead: boolean;
  }>;
  onMarkAsRead?: (activityId: string) => void;
  onMarkAllAsRead?: () => void;
  onClearAll?: () => void;
}

export const ActivityNotificationModal: React.FC<ActivityNotificationModalProps> = ({
  isOpen,
  onClose,
  activities,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAll
}) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "login":
        return <User className="h-4 w-4 text-green-500" />;
      case "assignment":
        return <FileText className="h-4 w-4 text-blue-500" />;
      case "grade":
        return <Star className="h-4 w-4 text-yellow-500" />;
      case "announcement":
        return <Bell className="h-4 w-4 text-purple-500" />;
      case "message":
        return <Users className="h-4 w-4 text-pink-500" />;
      case "system":
        return <Activity className="h-4 w-4 text-gray-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const unreadCount = activities.filter(activity => !activity.isRead).length;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Activity Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
      size="lg"
      icon={<Bell className="h-6 w-6 text-blue-500" />}
    >
      <div className="space-y-4">
        {/* Header Actions */}
        {activities.length > 0 && (
          <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              {activities.length} notification{activities.length !== 1 ? 's' : ''}
            </p>
            
            <div className="flex gap-2">
              {onMarkAllAsRead && unreadCount > 0 && (
                <Button variant="outline" size="sm" onClick={onMarkAllAsRead}>
                  Mark All Read
                </Button>
              )}
              
              {onClearAll && (
                <Button variant="outline" size="sm" onClick={onClearAll}>
                  Clear All
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Activities List */}
        <div className="max-h-96 overflow-y-auto space-y-3">
          {activities.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No notifications yet</p>
            </div>
          ) : (
            activities.map((activity) => (
              <div
                key={activity.id}
                className={cn(
                  "p-4 rounded-lg border transition-all duration-200",
                  activity.isRead 
                    ? "bg-background border-border opacity-75" 
                    : "bg-muted/50 border-primary/20 shadow-sm"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {getActivityIcon(activity.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className={cn(
                          "text-sm font-medium",
                          !activity.isRead && "text-foreground"
                        )}>
                          {activity.title}
                        </h4>
                        
                        <p className={cn(
                          "text-sm mt-1",
                          activity.isRead ? "text-muted-foreground" : "text-muted-foreground"
                        )}>
                          {activity.description}
                        </p>
                        
                        {activity.user && (
                          <div className="flex items-center gap-2 mt-2">
                            {activity.user.avatar ? (
                              <img 
                                src={activity.user.avatar} 
                                alt={activity.user.name}
                                className="w-4 h-4 rounded-full"
                              />
                            ) : (
                              <User className="h-4 w-4 text-muted-foreground" />
                            )}
                            <span className="text-xs text-muted-foreground">
                              {activity.user.name}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-muted-foreground whitespace-nowrap">
                          {activity.timestamp.toLocaleString()}
                        </p>
                        
                        {!activity.isRead && onMarkAsRead && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onMarkAsRead(activity.id)}
                            className="p-1 h-auto"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <ModalFooter>
        <Button variant="default" onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};