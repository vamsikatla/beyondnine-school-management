import * as React from "react";
import { createPortal } from "react-dom";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { X, AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";
import { Button } from "./Button";

const modalOverlayVariants = cva(
  "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-black/50",
        blur: "bg-black/30 backdrop-blur-md",
        dark: "bg-black/70",
        glass: "bg-white/10 backdrop-blur-lg"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

const modalContentVariants = cva(
  "relative w-full max-h-[90vh] overflow-auto rounded-lg bg-background shadow-2xl transition-all duration-300 animate-in fade-in-0 zoom-in-95",
  {
    variants: {
      size: {
        sm: "max-w-md",
        default: "max-w-lg",
        lg: "max-w-2xl",
        xl: "max-w-4xl",
        "2xl": "max-w-6xl",
        full: "max-w-[95vw] max-h-[95vh]"
      },
      variant: {
        default: "border border-border",
        elevated: "shadow-2xl border-none",
        glass: "glass border-white/20 backdrop-blur-lg",
        gradient: "bg-gradient-to-br from-background to-muted/50"
      }
    },
    defaultVariants: {
      size: "default",
      variant: "default"
    }
  }
);

export interface ModalProps extends VariantProps<typeof modalContentVariants> {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  description?: string;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  overlayVariant?: VariantProps<typeof modalOverlayVariants>["variant"];
  className?: string;
  overlayClassName?: string;
  preventClose?: boolean;
  icon?: "info" | "success" | "warning" | "error" | React.ReactNode;
}

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({
    isOpen,
    onClose,
    children,
    title,
    description,
    showCloseButton = true,
    closeOnOverlayClick = true,
    closeOnEscape = true,
    size,
    variant,
    overlayVariant = "default",
    className,
    overlayClassName,
    preventClose = false,
    icon,
    ...props
  }, ref) => {
    const [mounted, setMounted] = React.useState(false);
    
    React.useEffect(() => {
      setMounted(true);
    }, []);

    React.useEffect(() => {
      if (!isOpen) return;

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape" && closeOnEscape && !preventClose) {
          onClose();
        }
      };

      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";

      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = "unset";
      };
    }, [isOpen, closeOnEscape, onClose, preventClose]);

    const handleOverlayClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget && closeOnOverlayClick && !preventClose) {
        onClose();
      }
    };

    const handleClose = () => {
      if (!preventClose) {
        onClose();
      }
    };

    const renderIcon = () => {
      if (!icon) return null;
      
      if (typeof icon === "string") {
        const iconMap = {
          info: <Info className="h-6 w-6 text-blue-500" />,
          success: <CheckCircle className="h-6 w-6 text-green-500" />,
          warning: <AlertTriangle className="h-6 w-6 text-yellow-500" />,
          error: <XCircle className="h-6 w-6 text-red-500" />
        };
        return iconMap[icon];
      }
      
      return icon;
    };

    if (!mounted || !isOpen) return null;

    return createPortal(
      <div
        className={cn(modalOverlayVariants({ variant: overlayVariant }), overlayClassName)}
        onClick={handleOverlayClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        aria-describedby={description ? "modal-description" : undefined}
      >
        <div
          ref={ref}
          className={cn(modalContentVariants({ size, variant }), className)}
          onClick={(e) => e.stopPropagation()}
          {...props}
        >
          {(title || description || showCloseButton) && (
            <div className="flex items-start justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3 flex-1">
                {renderIcon()}
                <div className="flex-1">
                  {title && (
                    <h2
                      id="modal-title"
                      className="text-xl font-semibold leading-none tracking-tight"
                    >
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p
                      id="modal-description"
                      className="text-sm text-muted-foreground mt-1"
                    >
                      {description}
                    </p>
                  )}
                </div>
              </div>
              {showCloseButton && (
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={handleClose}
                  disabled={preventClose}
                  className="ml-4 shrink-0"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              )}
            </div>
          )}
          
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>,
      document.body
    );
  }
);

Modal.displayName = "Modal";

// Modal Header Component
export const ModalHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
    {...props}
  />
));
ModalHeader.displayName = "ModalHeader";

// Modal Title Component
export const ModalTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
ModalTitle.displayName = "ModalTitle";

// Modal Description Component
export const ModalDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
ModalDescription.displayName = "ModalDescription";

// Modal Content Component
export const ModalContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("", className)}
    {...props}
  />
));
ModalContent.displayName = "ModalContent";

// Modal Footer Component
export const ModalFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 gap-2 pt-4 border-t border-border mt-6",
      className
    )}
    {...props}
  />
));
ModalFooter.displayName = "ModalFooter";

export { Modal, modalContentVariants, modalOverlayVariants };