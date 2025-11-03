import type { Metadata, Viewport } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { AuthProvider } from '@/contexts/AuthContext';
import { NotificationsProvider } from '@/contexts/NotificationsContext';
import { UserManagementProvider } from '@/contexts/UserManagementContext';
import { DataProvider } from '@/contexts/DataContext';
import { RealTimeProvider } from '@/contexts/RealTimeContext';
import { ModalProvider } from '@/contexts/ModalContext';
import ModalManager from '@/components/ModalManager';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
});

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: 'BeyondNine ERP - Complete School Management System',
  description: 'Enterprise-grade School ERP System with integrated LMS and EdTech features. Manage students, teachers, fees, attendance, exams, and more.',
  keywords: 'School ERP, Learning Management System, Educational Software, Student Management, Teacher Portal, Parent Portal',
  authors: [{ name: 'BeyondNine Team' }],
  robots: 'index, follow',
  openGraph: {
    title: 'BeyondNine ERP - Complete School Management System',
    description: 'Enterprise-grade School ERP System with integrated LMS and EdTech features',
    type: 'website',
    locale: 'en_US'
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#667eea' },
    { media: '(prefers-color-scheme: dark)', color: '#764ba2' }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body 
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.variable,
          poppins.variable
        )}
        suppressHydrationWarning
      >
        <AuthProvider>
          <NotificationsProvider>
            <UserManagementProvider>
              <DataProvider>
                <ModalProvider>
                  <RealTimeProvider>
                    <div id="app-root" className="relative flex min-h-screen flex-col">
                      {children}
                    </div>
                    <ModalManager />
                    <div id="modal-root" />
                    <div id="toast-root" />
                  </RealTimeProvider>
                </ModalProvider>
              </DataProvider>
            </UserManagementProvider>
          </NotificationsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}