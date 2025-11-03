"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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

const LoginPage = () => {
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
  const [loginType, setLoginType] = React.useState<'admin' | 'user'>('user');

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

    try {
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

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('authToken', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        localStorage.setItem('school', JSON.stringify(data.data.school));
        
        const userRole = data.data.user.role;
        // Add a small delay to ensure authentication state is properly set
        setTimeout(() => {
          switch (userRole) {
            case 'SUPER_ADMIN':
              router.push('/admin/dashboard');
              break;
            case 'SCHOOL_ADMIN':
              router.push('/school-admin/dashboard');
              break;
            case 'TEACHER':
              router.push('/teacher/dashboard');
              break;
            case 'STUDENT':
              router.push('/student/dashboard');
              break;
            case 'PARENT':
              router.push('/parent/dashboard');
              break;
            default:
              // Redirect to home page if role is not recognized
              router.push('/');
              break;
          }
        }, 200);
      } else {
        setError(data.error || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
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
    setLoading(true);
    setError('');
    
    try {
      console.log('Attempting login with:', { email, password });
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      console.log('Login response:', data);
      
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
              console.log('Redirecting to home page');
              router.push('/');
              break;
          }
        }, 200);
      } else {
        setError(data.error || 'Login failed.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - Branding & Features */}
        <div className="hidden lg:block space-y-8">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  BeyondNine ERP
                </h1>
                <p className="text-sm text-slate-600">Complete School Management</p>
              </div>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Welcome Back to Your
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Educational Hub
              </span>
            </h2>
            
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
              Access your comprehensive school management system with advanced features, 
              real-time analytics, and seamless user experience.
            </p>

            {/* Features List */}
            <div className="space-y-4">
              {[
                'Multi-role dashboard access',
                'Real-time data synchronization', 
                'Advanced security & encryption',
                'Mobile-responsive design'
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Login Options */}
          <div className="bg-white/50 dark:bg-slate-800/50 rounded-xl p-6 glass">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Quick Login (Demo)</h3>
            <div className="grid grid-cols-2 gap-3">
              {quickLogins.map((login, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickLogin(login.email, login.password)}
                  disabled={loading}
                  className={cn(
                    "p-3 rounded-lg text-left transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed",
                    "bg-gradient-to-r text-white shadow-md hover:shadow-lg",
                    login.color
                  )}
                >
                  <login.icon className="h-5 w-5 mb-1" />
                  <div className="text-sm font-medium">{login.role}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto">
          <Card variant="elevated" className="shadow-2xl">
            <CardHeader className="text-center pb-2">
              <div className="flex lg:hidden items-center justify-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  BeyondNine ERP
                </span>
              </div>
              <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
                Sign In
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Enter your credentials to access your dashboard
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Login Type Toggle */}
              <div className="flex rounded-lg bg-slate-100 dark:bg-slate-800 p-1">
                <button
                  type="button"
                  onClick={() => setLoginType('user')}
                  className={cn(
                    "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all",
                    loginType === 'user'
                      ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  User Login
                </button>
                <button
                  type="button"
                  onClick={() => setLoginType('admin')}
                  className={cn(
                    "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all",
                    loginType === 'admin'
                      ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  Admin Login
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  leftIcon={<Mail className="h-4 w-4" />}
                  required
                />

                {/* Password */}
                <div className="relative">
                  <Input
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    leftIcon={<Lock className="h-4 w-4" />}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-9 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                {/* School Code (for non-admin) */}
                {loginType !== 'admin' && (
                  <Input
                    label="School Code"
                    type="text"
                    name="schoolCode"
                    value={formData.schoolCode}
                    onChange={handleInputChange}
                    placeholder="Enter school code (optional)"
                    leftIcon={<Building className="h-4 w-4" />}
                  />
                )}

                {/* Remember Me */}
                <div className="flex items-center">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-400">Remember me</span>
                  </label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="gradient"
                  size="lg"
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>

              {/* Register Link */}
              <div className="text-center pt-4 border-t border-slate-200 dark:border-slate-700">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Don't have an account?{' '}
                  <Link 
                    href="/auth/register" 
                    className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
                  >
                    Sign up here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;