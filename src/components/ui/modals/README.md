# Modal System Documentation

This comprehensive modal system provides a complete set of modal components for all dashboard features in the education management system. The system is built with TypeScript, React, and Tailwind CSS, offering full accessibility, animations, and global state management.

## Table of Contents

1. [Overview](#overview)
2. [Setup](#setup)
3. [Base Modal Component](#base-modal-component)
4. [Modal Types](#modal-types)
5. [Usage Examples](#usage-examples)
6. [Hooks and Context](#hooks-and-context)
7. [Best Practices](#best-practices)
8. [Customization](#customization)
9. [Accessibility](#accessibility)

## Overview

The modal system consists of:

- **Base Modal Component**: Core modal functionality with variants and animations
- **Specialized Modal Components**: Pre-built modals for common use cases
- **Modal Context & Provider**: Global state management for modals
- **Custom Hooks**: Easy-to-use hooks for different modal types
- **Modal Manager**: Centralized rendering of all modals

### Features

- ✅ Full TypeScript support
- ✅ Accessibility compliant (ARIA attributes, keyboard navigation)
- ✅ Smooth animations and transitions
- ✅ Global state management
- ✅ Modal stacking support
- ✅ Responsive design
- ✅ Customizable variants and sizes
- ✅ Drag and drop file uploads
- ✅ Calendar and date picker functionality
- ✅ Image gallery with zoom controls
- ✅ Toast notifications
- ✅ Form validation

## Setup

### 1. Add Modal Provider to Your App

```tsx
// app/layout.tsx or _app.tsx
import { ModalProvider, ModalManager } from '@/components/ui/modals';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <ModalProvider>
          {children}
          <ModalManager />
        </ModalProvider>
      </body>
    </html>
  );
}
```

### 2. Import Required Components and Hooks

```tsx
import {
  useModal,
  useConfirmationModal,
  useNotificationModal,
  useFormModal,
  ModalType
} from '@/components/ui/modals';
```

## Base Modal Component

The base `Modal` component provides core functionality:

```tsx
import { Modal, ModalFooter } from '@/components/ui/modals';

<Modal
  isOpen={isOpen}
  onClose={onClose}
  title="Modal Title"
  description="Optional description"
  size="lg"
  variant="elevated"
  icon="success"
  showCloseButton={true}
  closeOnOverlayClick={true}
  closeOnEscape={true}
  preventClose={false}
>
  <div>Modal content here</div>
  <ModalFooter>
    <Button variant="outline" onClick={onClose}>Cancel</Button>
    <Button onClick={onConfirm}>Confirm</Button>
  </ModalFooter>
</Modal>
```

### Props

- `size`: `"sm" | "default" | "lg" | "xl" | "2xl" | "full"`
- `variant`: `"default" | "elevated" | "glass" | "gradient"`
- `icon`: `"info" | "success" | "warning" | "error" | ReactNode`
- `overlayVariant`: `"default" | "blur" | "dark" | "glass"`

## Modal Types

### Form Modals

#### User Form Modal
```tsx
const { openUserForm } = useFormModal();

// Add new student
openUserForm('student', {
  mode: 'create',
  onSave: (data) => {
    console.log('Student data:', data);
  }
});

// Edit existing teacher
openUserForm('teacher', {
  mode: 'edit',
  initialData: existingTeacherData,
  onSave: (data) => {
    console.log('Updated teacher:', data);
  }
});
```

#### Class Form Modal
```tsx
const { openClassForm } = useFormModal();

openClassForm({
  mode: 'create',
  teachers: availableTeachers,
  subjects: availableSubjects,
  onSave: (classData) => {
    console.log('New class:', classData);
  }
});
```

#### Quick Add Modal
```tsx
const { openModal } = useModal();

openModal(ModalType.QUICK_ADD, {
  entity: 'announcement',
  title: 'Create Announcement'
}, {
  onConfirm: (data) => {
    console.log('Announcement:', data);
  }
});
```

### Confirmation Modals

#### Delete Confirmation
```tsx
const { confirmDelete } = useConfirmationModal();

const handleDelete = async () => {
  const confirmed = await confirmDelete('John Doe', 'Student', {
    additionalWarning: 'This will also remove all associated grades.',
    cascadeInfo: ['12 assignments', '8 exam results', '24 attendance records']
  });
  
  if (confirmed) {
    // Perform delete operation
  }
};
```

#### Status Change Confirmation
```tsx
const { openModal } = useModal();

openModal(ModalType.STATUS_CHANGE_CONFIRMATION, {
  entityName: 'John Doe',
  currentStatus: 'Active',
  newStatus: 'Suspended',
  entityType: 'Student',
  statusChangeDescription: 'The student will be temporarily suspended from all activities.'
});
```

### Notification Modals

#### Toast Notifications
```tsx
const { showSuccess, showError, showWarning, showInfo } = useNotificationModal();

// Success notification
showSuccess('Student Added', 'John Doe has been successfully added to the system.');

// Error notification
showError('Save Failed', 'Unable to save changes. Please try again.');

// Warning with custom duration
showWarning('Session Expiring', 'Your session will expire in 5 minutes.', {
  duration: 10000,
  position: 'top-center'
});

// Info with actions
showInfo('New Update Available', 'Version 2.0 is now available.', {
  actions: [
    {
      label: 'Update Now',
      onClick: () => console.log('Updating...'),
      variant: 'default'
    },
    {
      label: 'Later',
      onClick: () => console.log('Dismissed'),
      variant: 'ghost'
    }
  ]
});
```

#### System Notifications
```tsx
const { openModal } = useModal();

openModal(ModalType.SYSTEM_NOTIFICATION, {
  notification: {
    id: 'maint-001',
    type: 'maintenance',
    priority: 'high',
    title: 'Scheduled Maintenance',
    message: 'System will be down for maintenance from 2:00 AM to 4:00 AM EST.',
    timestamp: new Date(),
    metadata: {
      estimatedDuration: '2 hours',
      affectedServices: ['Gradebook', 'Attendance', 'Reports'],
      contactInfo: 'support@school.edu'
    }
  }
});
```

### File Upload Modals

#### File Upload
```tsx
const { openFileUpload } = useFileModal();

openFileUpload({
  title: 'Upload Assignment Files',
  acceptedFileTypes: ['.pdf', '.doc', '.docx', 'image/*'],
  maxFileSize: 25,
  maxFiles: 10,
  allowMultiple: true,
  onUpload: (files) => {
    console.log('Uploaded files:', files);
  }
});
```

#### Image Gallery
```tsx
const { openImageGallery } = useFileModal();

openImageGallery(studentPhotos, {
  initialImageIndex: 0,
  onDelete: (imageId) => {
    console.log('Delete image:', imageId);
  },
  onDownload: (imageId) => {
    console.log('Download image:', imageId);
  }
});
```

### Calendar Modals

#### Date Picker
```tsx
const { openCalendar } = useCalendarModal();

// Single date selection
openCalendar({
  mode: 'single',
  title: 'Select Assignment Due Date',
  onDateSelect: (date) => {
    console.log('Selected date:', date);
  }
});

// Date range selection
openCalendar({
  mode: 'range',
  title: 'Select Exam Period',
  onDateSelect: (dateRange) => {
    console.log('Date range:', dateRange);
  }
});

// With time slots
openCalendar({
  mode: 'single',
  showTime: true,
  availableTimeSlots: ['09:00', '10:30', '14:00', '15:30'],
  onDateSelect: (date) => console.log('Date:', date),
  onTimeSlotSelect: (time) => console.log('Time:', time)
});
```

#### Event Scheduling
```tsx
const { openEventScheduling } = useCalendarModal();

openEventScheduling({
  availableAttendees: teachers,
  categories: ['Class', 'Meeting', 'Exam', 'Event'],
  onSave: (eventData) => {
    console.log('New event:', eventData);
  }
});
```

#### Time Slot Selection
```tsx
const { openTimeSlotSelection } = useCalendarModal();

openTimeSlotSelection(availableSlots, {
  title: 'Book Parent-Teacher Meeting',
  selectedDate: new Date(),
  onSelectTimeSlot: (slot) => {
    console.log('Selected slot:', slot);
  }
});
```

### Detail/View Modals

#### User Detail Modal
```tsx
const { openModal } = useModal();

openModal(ModalType.USER_DETAIL, {
  title: 'Student Profile',
  user: studentData,
  onEdit: () => console.log('Edit student'),
  onDelete: () => console.log('Delete student'),
  actions: [
    {
      label: 'Send Message',
      onClick: () => console.log('Send message'),
      variant: 'outline',
      icon: <Mail className="w-4 h-4" />
    }
  ]
});
```

## Hooks and Context

### useModal Hook

The base hook for manual modal management:

```tsx
const { openModal, closeModal, currentModal, isModalOpen, updateModalProps } = useModal();

// Open any modal type
openModal(ModalType.USER_FORM, { userType: 'student' }, {
  onConfirm: (data) => console.log(data),
  onClose: () => console.log('Modal closed')
});

// Check if specific modal is open
const isUserFormOpen = isModalOpen(ModalType.USER_FORM);

// Update modal props dynamically
updateModalProps({ isLoading: true });

// Close current modal
closeModal();
```

### useTypedModal Hook

Type-safe hook for specific modal types:

```tsx
const userFormModal = useTypedModal<UserFormProps>(ModalType.USER_FORM);

userFormModal.openModal({
  userType: 'teacher',
  mode: 'create'
}, {
  onConfirm: (data) => console.log('Teacher data:', data)
});

console.log('Is open:', userFormModal.isOpen);
console.log('Current props:', userFormModal.props);
```

### Specialized Hooks

```tsx
// Confirmation modals
const { confirm, confirmDelete } = useConfirmationModal();

// Notifications
const { showSuccess, showError, showWarning, showInfo } = useNotificationModal();

// Form modals
const { openUserForm, openClassForm, openExamForm } = useFormModal();

// File modals
const { openFileUpload, openImageGallery } = useFileModal();

// Calendar modals
const { openCalendar, openEventScheduling, openTimeSlotSelection } = useCalendarModal();
```

## Best Practices

### 1. Use Appropriate Modal Types

```tsx
// ❌ Don't use generic modal for common actions
<Modal isOpen={isOpen} title="Delete Student">
  <p>Are you sure?</p>
</Modal>

// ✅ Use specialized confirmation modal
const { confirmDelete } = useConfirmationModal();
await confirmDelete('John Doe', 'Student');
```

### 2. Handle Loading States

```tsx
const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (data) => {
  setIsSubmitting(true);
  try {
    await saveStudent(data);
    showSuccess('Student saved successfully');
    closeModal();
  } catch (error) {
    showError('Failed to save student');
  } finally {
    setIsSubmitting(false);
  }
};

openUserForm('student', {
  onSave: handleSubmit,
  isLoading: isSubmitting
});
```

### 3. Provide Meaningful Feedback

```tsx
// ❌ Generic error
showError('Error occurred');

// ✅ Specific, actionable error
showError('Connection Failed', 'Unable to save changes. Check your internet connection and try again.');
```

### 4. Use Modal Stacking Appropriately

```tsx
// ✅ Good: Confirmation after form submission
const handleSave = async (data) => {
  const confirmed = await confirm('Save changes?', {
    title: 'Confirm Save',
    confirmText: 'Save',
    variant: 'info'
  });
  
  if (confirmed) {
    // Save data
  }
};
```

### 5. Cleanup on Unmount

```tsx
useEffect(() => {
  return () => {
    closeModal(); // Close any open modals when component unmounts
  };
}, [closeModal]);
```

## Customization

### Custom Modal Variants

```tsx
// Add custom variants to your tailwind.config.js
const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      variant: {
        // ... existing variants
        custom: "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none"
      }
    }
  }
);

<Modal variant="custom" {...props} />
```

### Custom Modal Sizes

```tsx
// Extend the size variants
const modalContentVariants = cva(
  "relative w-full max-h-[90vh] overflow-auto rounded-lg bg-background shadow-2xl",
  {
    variants: {
      size: {
        // ... existing sizes
        "3xl": "max-w-7xl",
        "mobile": "max-w-[95vw] max-h-[95vh] md:max-w-lg"
      }
    }
  }
);
```

## Accessibility

The modal system is built with accessibility in mind:

### Features

- ✅ Focus management (focus trap within modal)
- ✅ Keyboard navigation (Tab, Shift+Tab, Escape)
- ✅ Screen reader support (ARIA attributes)
- ✅ Color contrast compliance
- ✅ Reduced motion support

### ARIA Attributes

```tsx
<Modal
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <h2 id="modal-title">Modal Title</h2>
  <p id="modal-description">Modal description</p>
</Modal>
```

### Keyboard Shortcuts

- `Escape`: Close modal
- `Tab`: Navigate between focusable elements
- `Shift + Tab`: Navigate backwards
- `Enter/Space`: Activate buttons

### Screen Reader Support

```tsx
// Automatically announces modal opening
<Modal title="Form Submission" description="Please review your information">
  {/* Screen reader will announce: "Dialog: Form Submission. Please review your information" */}
</Modal>
```

## Browser Support

- ✅ Chrome/Chromium-based browsers
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

When adding new modal types:

1. Create the modal component in the appropriate file
2. Add the modal type to `ModalType` enum
3. Update `ModalManager` to handle the new type
4. Add specialized hooks if needed
5. Update this documentation

## Troubleshooting

### Common Issues

**Modal not appearing:**
- Ensure `ModalProvider` wraps your app
- Check that `ModalManager` is included in your layout
- Verify modal state with React DevTools

**Styling issues:**
- Make sure Tailwind CSS is properly configured
- Check for CSS specificity conflicts
- Verify all required CSS classes are available

**TypeScript errors:**
- Update modal props interface
- Ensure proper typing in `ModalType` enum
- Check generic type parameters in hooks

**Performance issues:**
- Use `React.memo` for heavy modal content
- Implement virtual scrolling for large lists
- Consider lazy loading for complex modals

For more help, check the component source code or create an issue in the project repository.