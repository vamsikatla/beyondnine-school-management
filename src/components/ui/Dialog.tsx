import React from 'react';
import { Modal, ModalHeader, ModalTitle, ModalContent } from './Modal';

interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ open = false, onOpenChange, children }) => {
  return (
    <Modal
      isOpen={open}
      onClose={() => onOpenChange?.(false)}
      showCloseButton={false}
      closeOnOverlayClick={true}
      closeOnEscape={true}
    >
      {children}
    </Modal>
  );
};

const DialogContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={className} {...props}>
    {children}
  </div>
));
DialogContent.displayName = "DialogContent";

const DialogHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <ModalHeader ref={ref} className={className} {...props} />
));
DialogHeader.displayName = "DialogHeader";

const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <ModalTitle ref={ref} className={className} {...props} />
));
DialogTitle.displayName = "DialogTitle";

export { Dialog, DialogContent, DialogHeader, DialogTitle };