"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  Calculator, 
  Bus, 
  Building, 
  Shield, 
  Globe,
  ArrowRight,
  CheckCircle,
  Star,
  Play,
  Zap,
  Target,
  Award,
  TrendingUp,
  User,
  School,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

const HomePage = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  // Demo login function
  const handleDemoLogin = async (email: string, password: string, role: string) => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
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
              router.push('/dashboard');
              break;
          }
        }, 200);
      } else {
        alert('Demo login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const demoAccounts = [
    {
      role: 'Super Admin',
      email: 'admin@beyondnine.com',
      password: 'admin123',
      icon: Shield,
      color: 'from-red-500 to-pink-500',
      description: 'Full system access'
    },
    {
      role: 'School Admin',
      email: 'school@beyondnine.com',
      password: 'school123',
      icon: School,
      color: 'from-blue-500 to-cyan-500',
      description: 'School management'
    },
    {
      role: 'Teacher',
      email: 'teacher@beyondnine.com',
      password: 'teacher123',
      icon: GraduationCap,
      color: 'from-green-500 to-emerald-500',
      description: 'Teaching portal'
    },
    {
      role: 'Student',
      email: 'student@beyondnine.com',
      password: 'student123',
      icon: User,
      color: 'from-purple-500 to-indigo-500',
      description: 'Student dashboard'
    },
    {
      role: 'Parent',
      email: 'parent@beyondnine.com',
      password: 'parent123',
      icon: User,
      color: 'from-indigo-500 to-purple-500',
      description: 'Parent portal'
    }
  ];

  const features = [
    {
      icon: Users,
      title: "Multi-Role Management",
      description: "Comprehensive user management for Super Admin, School Admin, Teachers, Students, and Parents with role-based access control.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: GraduationCap,
      title: "Complete Student Lifecycle",
      description: "From admission to graduation - manage student records, academic progress, attendance, and alumni database.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: BookOpen,
      title: "Integrated LMS",
      description: "Advanced Learning Management System with courses, assignments, quizzes, progress tracking, and certificates.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Calculator,
      title: "Smart Fee Management",
      description: "Automated fee collection, online payments, invoices, receipts, and comprehensive financial reporting.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Bus,
      title: "Transport & Hostel",
      description: "GPS tracking, route management, hostel allocation, and comprehensive facility management.",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Advanced security with encryption, audit logs, GDPR compliance, and role-based permissions.",
      gradient: "from-teal-500 to-blue-500"
    }
  ];

  const stats = [
    { number: "50K+", label: "Students Managed", icon: Users },
    { number: "2K+", label: "Teachers Onboarded", icon: GraduationCap },
    { number: "100+", label: "Schools Connected", icon: Building },
    { number: "99.9%", label: "Uptime Guarantee", icon: Shield }
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Principal, Green Valley School",
      content: "BeyondNine transformed our school management completely. The integrated LMS and comprehensive reporting have improved our efficiency by 300%.",
      rating: 5,
      avatar: "👩‍🎓"
    },
    {
      name: "Michael Chen",
      role: "IT Director, Education Group",
      content: "The multi-tenant architecture allows us to manage 15 schools seamlessly. The role-based dashboards are intuitive and powerful.",
      rating: 5,
      avatar: "👨‍💼"
    },
    {
      name: "Priya Sharma",
      role: "Parent",
      content: "As a parent, I love the real-time updates on my child's progress, attendance alerts, and the easy fee payment system.",
      rating: 5,
      avatar: "👩‍👧"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                BeyondNine ERP
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-slate-600 hover:text-blue-600 transition-colors">Features</Link>
              <Link href="#pricing" className="text-slate-600 hover:text-blue-600 transition-colors">Pricing</Link>
              <Link href="#contact" className="text-slate-600 hover:text-blue-600 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className={cn(
            "transition-all duration-1000 transform",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}>
            <div className="inline-block p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                🚀 Enterprise-Grade School ERP System
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight">
              Complete School Management
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Comprehensive ERP system with integrated LMS, advanced EdTech features, multi-tenant architecture, 
              and role-based dashboards. Transform your educational institution with cutting-edge technology.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <Link href="/student/dashboard">
                <Button size="xl" variant="gradient" className="min-w-[200px]">
                  Student Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/teacher/dashboard">
                <Button size="xl" variant="gradient" className="min-w-[200px]">
                  Teacher Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/school-admin/dashboard">
                <Button size="xl" variant="gradient" className="min-w-[200px]">
                  School Admin
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <Link href="/parent/dashboard">
                <Button size="xl" variant="gradient" className="min-w-[200px]">
                  Parent Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/admin/dashboard">
                <Button size="xl" variant="gradient" className="min-w-[200px]">
                  Super Admin
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            
            <div className="flex justify-center mb-12">
              <Link href="/setup-test">
                <Button variant="outline" size="lg">
                  Setup Test Environment
                </Button>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mb-2">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                    {stat.number}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Demo Login Section - kept for testing but can be removed if needed */}
      <section id="demo" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-100 to-blue-100 dark:from-slate-800 dark:to-blue-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block p-2 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
              <Eye className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-green-800 bg-clip-text text-transparent">
              Try Live Demo
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">
              Experience our comprehensive ERP system with different user roles. Click any button below to login instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {demoAccounts.map((account, index) => (
              <Card key={index} variant="elevated" className="text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6">
                  <div className={cn(
                    "w-16 h-16 rounded-full bg-gradient-to-r flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300",
                    account.color
                  )}>
                    <account.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    {account.role}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    {account.description}
                  </p>
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3 mb-4 text-xs">
                    <div className="font-mono text-slate-600 dark:text-slate-400">
                      Email: {account.email}<br/>
                      Pass: {account.password}
                    </div>
                  </div>
                  <Button 
                    variant="gradient" 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleDemoLogin(account.email, account.password, account.role)}
                    loading={loading}
                  >
                    Login as {account.role}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              💡 <strong>Tip:</strong> Each role has different features and permissions. Try them all to see the complete system!
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
              <Zap className="h-6 w-6 text-purple-600" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-purple-800 bg-clip-text text-transparent">
              Powerful Features
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Everything you need to manage your educational institution efficiently and effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                variant="elevated"
                className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <CardHeader>
                  <div className={cn(
                    "w-14 h-14 rounded-lg bg-gradient-to-r flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300",
                    feature.gradient
                  )}>
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block p-2 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
              <Award className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-green-800 bg-clip-text text-transparent">
              Trusted by Educators
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              See what school administrators, teachers, and parents are saying about BeyondNine ERP.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} variant="glass" className="p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-3">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-blue-200">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-white/90 leading-relaxed">"{testimonial.content}"</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <TrendingUp className="h-16 w-16 text-white mx-auto mb-4" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your School?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of educational institutions that trust BeyondNine ERP for their complete school management needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/test-all-roles">
              <Button size="xl" variant="secondary" className="min-w-[200px] bg-white text-blue-600 hover:bg-blue-50">
                Test All Roles
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/setup-test">
              <Button size="xl" variant="outline" className="min-w-[200px] border-white text-white hover:bg-white/10">
                Setup Test Environment
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold">BeyondNine ERP</span>
              </div>
              <p className="text-slate-400 text-sm">
                Comprehensive school management system with integrated LMS and advanced EdTech features.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="#" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Security</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Updates</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="#" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Training</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
            <p>&copy; 2024 BeyondNine ERP. All rights reserved. Built with ❤️ for Education.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;