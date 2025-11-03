import { ReactNode } from 'react';

export default function ParentLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-background">{children}</div>;
}