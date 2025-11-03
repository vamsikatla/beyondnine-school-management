import { redirect } from 'next/navigation';

export default function ParentPage() {
  // Redirect to dashboard by default
  redirect('/parent/dashboard');
}