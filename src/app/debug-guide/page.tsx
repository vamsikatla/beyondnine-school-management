"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function DebugGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Redirection Debugging Guide</h1>
          
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Common Issues and Solutions</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">1. Authentication State Not Syncing Properly</h3>
            <p className="text-gray-700 mb-4">
              The most common issue is that the authentication state in the AuthProvider context doesn't immediately 
              reflect the localStorage data after a redirect. This causes the ProtectedRoute to redirect back to login.
            </p>
            
            <h4 className="text-lg font-medium text-gray-800 mb-2">Solution:</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Ensure the AuthProvider's checkAuthStatus function properly parses localStorage data</li>
              <li>Add a small delay after setting localStorage before redirecting</li>
              <li>Force a re-render of the AuthProvider after login</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">2. Role-Based Redirection Not Working</h3>
            <p className="text-gray-700 mb-4">
              The ProtectedRoute component might not be correctly matching user roles with required roles.
            </p>
            
            <h4 className="text-lg font-medium text-gray-800 mb-2">Solution:</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Verify that user.role exactly matches requiredRole (case-sensitive)</li>
              <li>Check that the role constants are consistent across the application</li>
              <li>Add console.log statements to trace the role checking logic</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">3. Dashboard Pages Not Properly Protected</h3>
            <p className="text-gray-700 mb-4">
              Dashboard pages might not be using the correct ProtectedRoute component or requiredRole prop.
            </p>
            
            <h4 className="text-lg font-medium text-gray-800 mb-2">Solution:</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Verify each dashboard page uses ProtectedRoute with the correct requiredRole</li>
              <li>Check that the role values match exactly (SUPER_ADMIN, SCHOOL_ADMIN, TEACHER, STUDENT, PARENT)</li>
              <li>Ensure ProtectedRoute component is correctly implemented</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Debugging Steps</h2>
            
            <ol className="list-decimal list-inside space-y-4 text-gray-700">
              <li>
                <strong>Check Browser Console:</strong> Open developer tools and check for any errors or log messages
              </li>
              <li>
                <strong>Verify localStorage:</strong> Check if authentication data is properly stored after login
              </li>
              <li>
                <strong>Test API Endpoint:</strong> Use the API test page to verify login endpoint returns correct data
              </li>
              <li>
                <strong>Check Auth Context:</strong> Use the auth debug page to verify authentication state
              </li>
              <li>
                <strong>Test Direct Navigation:</strong> Try navigating directly to dashboard URLs after login
              </li>
            </ol>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Available Debugging Tools</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Link href="/api-test">
                <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-center">
                  <span className="font-medium">API Test</span>
                  <span className="text-sm text-gray-600 mt-1">Test authentication endpoints</span>
                </Button>
              </Link>
              
              <Link href="/auth-debug">
                <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-center">
                  <span className="font-medium">Auth Debug</span>
                  <span className="text-sm text-gray-600 mt-1">Check authentication state</span>
                </Button>
              </Link>
              
              <Link href="/debug-login">
                <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-center">
                  <span className="font-medium">Debug Login</span>
                  <span className="text-sm text-gray-600 mt-1">Login with detailed logging</span>
                </Button>
              </Link>
              
              <Link href="/comprehensive-role-test">
                <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-center">
                  <span className="font-medium">Role Test</span>
                  <span className="text-sm text-gray-600 mt-1">Test all role redirections</span>
                </Button>
              </Link>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Expected Redirections</h2>
            
            <div className="bg-gray-100 rounded-lg p-4 mt-4">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="pb-2 font-medium">Role</th>
                    <th className="pb-2 font-medium">Login Credentials</th>
                    <th className="pb-2 font-medium">Redirect URL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">Super Admin</td>
                    <td className="py-2">admin@beyondnine.com / admin123</td>
                    <td className="py-2">/admin/dashboard</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">School Admin</td>
                    <td className="py-2">school@beyondnine.com / school123</td>
                    <td className="py-2">/school-admin/dashboard</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Teacher</td>
                    <td className="py-2">teacher@beyondnine.com / teacher123</td>
                    <td className="py-2">/teacher/dashboard</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Student</td>
                    <td className="py-2">student@beyondnine.com / student123</td>
                    <td className="py-2">/student/dashboard</td>
                  </tr>
                  <tr>
                    <td className="py-2">Parent</td>
                    <td className="py-2">parent@beyondnine.com / parent123</td>
                    <td className="py-2">/parent/dashboard</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}