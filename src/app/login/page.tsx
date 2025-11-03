"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/NotificationsContext';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { 
  Mail, Lock, Eye, EyeOff, GraduationCap, Users, User, 
  Crown, UserCheck, Loader2, ArrowRight
} from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const { login, isLoading, error, isAuthenticated, clearError } = useAuth();
  const toast = useToast();
  const router = useRouter();

  // Demo users for easy testing
  const demoUsers = [
    {
      role: 'student',
      email: 'student@test.com',
      password: 'password',
      name: 'Aarav Sharma',
      description: 'Grade 12 Student',
      icon: GraduationCap,
      color: 'from-blue-500 to-blue-600',
      dashboard: '/student/dashboard'
    },
    {
      role: 'teacher',
      email: 'teacher@test.com',
      password: 'password',
      name: 'Dr. Priya Gupta',
      description: 'Mathematics Teacher',
      icon: UserCheck,
      color: 'from-green-500 to-green-600',
      dashboard: '/teacher/dashboard'
    },
    {
      role: 'parent',
      email: 'parent@test.com',
      password: 'password',
      name: 'Rajesh Sharma',
      description: 'Parent of Aarav',
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      dashboard: '/parent/dashboard'
    },
    {
      role: 'admin',
      email: 'admin@test.com',
      password: 'password',
      name: 'School Administrator',
      description: 'School Admin',
      icon: User,
      color: 'from-orange-500 to-orange-600',
      dashboard: '/admin/dashboard'
    },
    {
      role: 'super_admin',
      email: 'superadmin@test.com',
      password: 'password',
      name: 'Super Administrator',
      description: 'System Admin',
      icon: Crown,
      color: 'from-red-500 to-red-600',
      dashboard: '/admin/dashboard'
    }
  ];

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/student/dashboard');
    }
  }, [isAuthenticated, router]);

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Validation Error', 'Please fill in all fields');
      return;
    }

    try {
      await login(email, password);
      toast.success('Login Successful', 'Welcome back!');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleDemoLogin = (user: typeof demoUsers[0]) => {
    setEmail(user.email);
    setPassword(user.password);
    setSelectedRole(user.role);
  };

  const handleQuickLogin = async (user: typeof demoUsers[0]) => {
    try {
      await login(user.email, user.password);
      toast.success('Quick Login', `Logged in as ${user.name}`);
    } catch (error) {
      console.error('Quick login failed:', error);
    }
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Login Form */}
        <Card className="w-full max-w-md mx-auto lg:mx-0">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Welcome to EduSphere</CardTitle>
            <CardDescription>
              Sign in to access your school management dashboard
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Error Alert */}
              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                  {error}
                </div>
              )}

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full"
                variant="gradient"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            {/* Demo Info */}
            <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-700 font-medium mb-2">Demo Credentials:</p>
              <div className="text-xs text-blue-600 space-y-1">
                <div>📧 Email: student@test.com, teacher@test.com, parent@test.com, admin@test.com</div>
                <div>🔒 Password: password</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Demo Users */}
        <div className="space-y-4">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Quick Demo Access
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Click on any role below to explore different dashboards
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {demoUsers.map((user) => {
              const IconComponent = user.icon;
              return (
                <Card 
                  key={user.role} 
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1 ${
                    selectedRole === user.role ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => handleDemoLogin(user)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${user.color}`}>
                        <IconComponent className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 dark:text-white">
                          {user.name}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {user.description}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuickLogin(user);
                        }}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          'Login'
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Feature Highlights */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
                🚀 Features Available:
              </h3>
              <div className="grid grid-cols-2 gap-2 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs">✓</Badge>
                  <span>Role-based Dashboards</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs">✓</Badge>
                  <span>Real-time Notifications</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs">✓</Badge>
                  <span>CRUD Operations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs">✓</Badge>
                  <span>Analytics & Reports</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs">✓</Badge>
                  <span>Responsive Design</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs">✓</Badge>
                  <span>Modern UI/UX</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;