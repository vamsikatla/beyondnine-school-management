import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected routes and their required roles
const protectedRoutes: Record<string, string[]> = {
  '/admin': ['SUPER_ADMIN'],
  '/school-admin': ['SCHOOL_ADMIN'],
  '/teacher': ['TEACHER'],
  '/student': ['STUDENT'],
  '/parent': ['PARENT']
};

// Public routes that don't require authentication
const publicRoutes = [
  '/', 
  '/auth/login', 
  '/auth/register', 
  '/api/auth/login', 
  '/test-all-roles',
  '/setup-test',
  '/student/dashboard',
  '/teacher/dashboard',
  '/school-admin/dashboard',
  '/parent/dashboard',
  '/admin/dashboard'
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Allow access to public routes
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }
  
  // Check if the route is protected
  const protectedRoute = Object.keys(protectedRoutes).find(route => 
    pathname.startsWith(route)
  );
  
  if (protectedRoute) {
    // For client-side checking, we'll allow the request to proceed
    // The actual authentication will be handled in the client components
    return NextResponse.next();
  }
  
  // Allow access to other routes
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};