"use client";

import React, { useEffect } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { NotificationsProvider } from '@/contexts/NotificationsContext';

interface AppProvidersProps {
  children: React.ReactNode;
}

/**
 * Main provider component that wraps the entire application with all necessary context providers
 */
export function AppProviders({ children }: AppProvidersProps) {
  // Fix for button click events not working
  useEffect(() => {
    // This ensures that event handlers are properly attached
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Handle both uppercase and lowercase button elements
      if (target && 
          (target.tagName === 'BUTTON' || 
           target.tagName === 'button' || 
           target.closest('button') || 
           target.closest('.btn') || 
           target.getAttribute('role') === 'button')) {
        
        // Prevent default behavior and stop propagation
        e.stopPropagation();
        
        // Ensure the click event is properly handled
        const clickEvent = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window
        });
        
        // Dispatch a new click event if needed
        if (!e.defaultPrevented) {
          target.dispatchEvent(clickEvent);
        }
      }
    };

    // Add the event listener with capture phase to ensure it runs first
    document.addEventListener('click', handleGlobalClick, true);
    
    return () => {
      // Clean up event listeners when component unmounts
      document.removeEventListener('click', handleGlobalClick, true);
    };
  }, []);

  return (
    <AuthProvider>
      <NotificationsProvider>
        {children}
      </NotificationsProvider>
    </AuthProvider>
  );
}

// Export individual providers for more granular usage if needed
export { AuthProvider, NotificationsProvider };