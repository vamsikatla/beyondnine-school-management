"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Shield, 
  School,
  GraduationCap,
  CheckCircle,
  User,
  Building
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

const DebugLoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    schoolCode: '',
    rememberMe: false
  });
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState('');
  const [debugInfo, setDebugInfo] = React.useState<any>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setDebugInfo(null);

    try {
      console.log('=== Debug Login Start ===');
      console.log('Form data:', formData);
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          schoolCode: formData.schoolCode
        })
      });

      console.log('API response status:', response.status);
      
      const data = await response.json();
      console.log('API response data:', data);
      
      setDebugInfo({
        timestamp: new Date().toISOString(),
        requestData: formData,
        apiResponse: data,
        apiStatus: response.status
      });

      if (data.success) {
        console.log('Login successful, setting localStorage');
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('authToken', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        localStorage.setItem('school', JSON.stringify(data.data.school));
        
        const userRole = data.data.user.role;
        console.log('User role:', userRole);
        
        // Use router.push instead of window.location.assign for better state management
        switch (userRole) {
          case 'SUPER_ADMIN':
            console.log('Redirecting to admin dashboard');
            router.push('/admin/dashboard');
            break;
          case 'SCHOOL_ADMIN':
            console.log('Redirecting to school admin dashboard');
            router.push('/school-admin/dashboard');
            break;
          case 'TEACHER':
            console.log('Redirecting to teacher dashboard');
            router.push('/teacher/dashboard');
            break;
          case 'STUDENT':
            console.log('Redirecting to student dashboard');
            router.push('/student/dashboard');
            break;
          case 'PARENT':
            console.log('Redirecting to parent dashboard');
            router.push('/parent/dashboard');
            break;
          default:
            console.log('Redirecting to default dashboard');
            router.push('/dashboard');
            break;
        }
      } else {
        console.log('Login failed:', data.error);
        setError(data.error || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setDebugInfo({
        timestamp: new Date().toISOString(),
        requestData: formData,
        error: err instanceof Error ? err.message : 'Unknown error'
      });
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
      console.log('=== Debug Login End ===');
    }
  };

  const quickLogins = [
    {
      role: 'Super Admin',
      email: 'admin@beyondnine.com',
      password: 'admin123',
      icon: Shield,
      color: 'from-red-500 to-pink-500'
    },
    {
      role: 'School Admin',
      email: 'school@beyondnine.com',
      password: 'school123',
      icon: School,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      role: 'Teacher',
      email: 'teacher@beyondnine.com',
      password: 'teacher123',
      icon: GraduationCap,
      color: 'from-green-500 to-emerald-500'
    },
    {
      role: 'Student',
      email: 'student@beyondnine.com',
      password: 'student123',
      icon: User,
      color: 'from-purple-500 to-indigo-500'
    },
    {
      role: 'Parent',
      email: 'parent@beyondnine.com',
      password: 'parent123',
      icon: User,
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const handleQuickLogin = async (email: string, password: string) => {
    console.log('=== Quick Login Start ===');
    console.log('Quick login credentials:', { email, password });
    
    setFormData({
      email,
      password,
      schoolCode: '',
      rememberMe: false
    });
    
    setLoading(true);
    setError('');
    setDebugInfo(null);
    
    try {
      console.log('Attempting login with:', { email, password });
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      console.log('Login response:', data);
      
      setDebugInfo({
        timestamp: new Date().toISOString(),
        requestData: { email, password },
        apiResponse: data,
        apiStatus: response.status
      });
      
      if (data.success) {
        // Set authentication data in localStorage
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('authToken', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        localStorage.setItem('school', JSON.stringify(data.data.school));
        
        // Update the authentication context
        const userRole = data.data.user.role;
        console.log('Redirecting user with role:', userRole);
        
        // Add a small delay to ensure authentication state is properly set
        setTimeout(() => {
          // Use router.push instead of window.location.assign for better state management
          switch (userRole) {
            case 'SUPER_ADMIN':
              console.log('Redirecting to admin dashboard');
              router.push('/admin/dashboard');
              break;
            case 'SCHOOL_ADMIN':
              console.log('Redirecting to school admin dashboard');
              router.push('/school-admin/dashboard');
              break;
            case 'TEACHER':
              console.log('Redirecting to teacher dashboard');
              router.push('/teacher/dashboard');
              break;
            case 'STUDENT':
              console.log('Redirecting to student dashboard');
              router.push('/student/dashboard');
              break;
            case 'PARENT':
              console.log('Redirecting to parent dashboard');
              router.push('/parent/dashboard');
              break;
            default:
              console.log('Redirecting to default dashboard');
              router.push('/dashboard');
              break;
          }
        }, 200);
      } else {
        console.log('Quick login failed:', data.error);
        setError(data.error || 'Login failed.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setDebugInfo({
        timestamp: new Date().toISOString(),
        requestData: { email, password },
        error: err instanceof Error ? err.message : 'Unknown error'
      });
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
      console.log('=== Quick Login End ===');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Debug Login</CardTitle>
            <CardDescription>
              Test login functionality with detailed debugging
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                loading={loading}
                variant="gradient"
              >
                Sign In
              </Button>
            </form>

            <div className="my-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400">
                    Or use demo accounts
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {quickLogins.map((login, index) => {
                const Icon = login.icon;
                return (
                  <button
                    key={index}
                    onClick={() => handleQuickLogin(login.email, login.password)}
                    disabled={loading}
                    className={cn(
                      "p-3 rounded-lg border text-center transition-all hover:shadow-md disabled:opacity-50",
                      "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700",
                      "hover:border-slate-300 dark:hover:border-slate-600"
                    )}
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-full bg-gradient-to-r flex items-center justify-center mx-auto mb-2",
                      login.color
                    )}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-xs font-medium text-slate-900 dark:text-white">
                      {login.role}
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {debugInfo && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Debug Information</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-xs text-gray-800 whitespace-pre-wrap bg-gray-100 p-3 rounded">
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}

        <div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
          <p>Check browser console for detailed logs</p>
        </div>
      </div>
    </div>
  );
};

export default DebugLoginPage;