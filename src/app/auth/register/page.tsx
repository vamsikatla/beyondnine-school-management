"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  GraduationCap, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  School,
  User,
  Phone,
  MapPin,
  CheckCircle,
  Building
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

const RegisterPage = () => {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    
    // School Information
    schoolName: '',
    schoolAddress: '',
    schoolCity: '',
    schoolState: '',
    principalName: '',
    
    // Preferences
    subscriptionPlan: 'BASIC',
    agreeTerms: false,
    agreeMarketing: false
  });
  
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [step, setStep] = React.useState(1);
  const [validationErrors, setValidationErrors] = React.useState<Record<string, string>>({});

  const subscriptionPlans = [
    {
      id: 'BASIC',
      name: 'Basic',
      price: '₹2,999/month',
      features: ['Up to 500 students', 'Basic features', 'Email support'],
      color: 'from-gray-500 to-gray-600'
    },
    {
      id: 'STANDARD',
      name: 'Standard',
      price: '₹5,999/month',
      features: ['Up to 1,500 students', 'Advanced features', 'Priority support'],
      color: 'from-blue-500 to-blue-600',
      popular: true
    },
    {
      id: 'PREMIUM',
      name: 'Premium',
      price: '₹9,999/month',
      features: ['Up to 5,000 students', 'All features', '24/7 support'],
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    setError('');
  };

  const validateStep = (stepNumber: number): boolean => {
    const errors: Record<string, string> = {};

    if (stepNumber === 1) {
      if (!formData.firstName) errors.firstName = 'First name is required';
      if (!formData.lastName) errors.lastName = 'Last name is required';
      if (!formData.email) errors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'Please enter a valid email address';
      }
      if (!formData.phone) errors.phone = 'Phone number is required';
      else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ''))) {
        errors.phone = 'Please enter a valid 10-digit phone number';
      }
      if (!formData.password) errors.password = 'Password is required';
      else if (formData.password.length < 8) {
        errors.password = 'Password must be at least 8 characters long';
      }
      if (!formData.confirmPassword) errors.confirmPassword = 'Please confirm your password';
      else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }

    if (stepNumber === 2) {
      if (!formData.schoolName) errors.schoolName = 'School name is required';
      if (!formData.schoolAddress) errors.schoolAddress = 'School address is required';
      if (!formData.schoolCity) errors.schoolCity = 'City is required';
      if (!formData.schoolState) errors.schoolState = 'State is required';
      if (!formData.principalName) errors.principalName = 'Principal name is required';
    }

    if (stepNumber === 3) {
      if (!formData.agreeTerms) errors.agreeTerms = 'You must agree to the terms and conditions';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(3)) return;
    
    setLoading(true);
    setError('');

    try {
      // Simulate API call for registration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock registration success
      router.push('/auth/login?registered=true');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <React.Fragment key={stepNumber}>
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                  step >= stepNumber 
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" 
                    : "bg-white text-slate-400 border-2 border-slate-200"
                )}>
                  {step > stepNumber ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    stepNumber
                  )}
                </div>
                {stepNumber < 3 && (
                  <div className={cn(
                    "w-16 h-1 transition-all",
                    step > stepNumber ? "bg-gradient-to-r from-blue-600 to-purple-600" : "bg-slate-200"
                  )} />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="flex justify-center mt-2">
            <div className="flex space-x-20 text-sm text-slate-600 dark:text-slate-400">
              <span className={step >= 1 ? "text-blue-600 font-medium" : ""}>Personal Info</span>
              <span className={step >= 2 ? "text-blue-600 font-medium" : ""}>School Details</span>
              <span className={step >= 3 ? "text-blue-600 font-medium" : ""}>Plan & Confirm</span>
            </div>
          </div>
        </div>

        <Card variant="elevated" className="shadow-2xl">
          <CardHeader className="text-center pb-2">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="h-7 w-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  BeyondNine ERP
                </span>
                <p className="text-sm text-slate-600">Complete School Management</p>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
              Create Your Account
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400">
              {step === 1 && "Let's start with your personal information"}
              {step === 2 && "Tell us about your school"}
              {step === 3 && "Choose your plan and finalize"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Step 1: Personal Information */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="First Name"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter your first name"
                      leftIcon={<User className="h-4 w-4" />}
                      error={validationErrors.firstName}
                      required
                    />
                    <Input
                      label="Last Name"
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter your last name"
                      leftIcon={<User className="h-4 w-4" />}
                      error={validationErrors.lastName}
                      required
                    />
                  </div>

                  <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    leftIcon={<Mail className="h-4 w-4" />}
                    error={validationErrors.email}
                    required
                  />

                  <Input
                    label="Phone Number"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    leftIcon={<Phone className="h-4 w-4" />}
                    error={validationErrors.phone}
                    required
                  />

                  <Input
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create a strong password"
                    leftIcon={<Lock className="h-4 w-4" />}
                    rightIcon={
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    }
                    error={validationErrors.password}
                    helperText="At least 8 characters with uppercase, lowercase, numbers"
                    required
                  />

                  <Input
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    leftIcon={<Lock className="h-4 w-4" />}
                    rightIcon={
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="text-slate-400 hover:text-slate-600"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    }
                    error={validationErrors.confirmPassword}
                    required
                  />
                </div>
              )}

              {/* Step 2: School Information */}
              {step === 2 && (
                <div className="space-y-4">
                  <Input
                    label="School Name"
                    type="text"
                    name="schoolName"
                    value={formData.schoolName}
                    onChange={handleInputChange}
                    placeholder="Enter your school name"
                    leftIcon={<School className="h-4 w-4" />}
                    error={validationErrors.schoolName}
                    required
                  />

                  <Input
                    label="School Address"
                    type="text"
                    name="schoolAddress"
                    value={formData.schoolAddress}
                    onChange={handleInputChange}
                    placeholder="Enter complete school address"
                    leftIcon={<MapPin className="h-4 w-4" />}
                    error={validationErrors.schoolAddress}
                    required
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="City"
                      type="text"
                      name="schoolCity"
                      value={formData.schoolCity}
                      onChange={handleInputChange}
                      placeholder="Enter city"
                      leftIcon={<Building className="h-4 w-4" />}
                      error={validationErrors.schoolCity}
                      required
                    />
                    <Input
                      label="State"
                      type="text"
                      name="schoolState"
                      value={formData.schoolState}
                      onChange={handleInputChange}
                      placeholder="Enter state"
                      leftIcon={<Building className="h-4 w-4" />}
                      error={validationErrors.schoolState}
                      required
                    />
                  </div>

                  <Input
                    label="Principal Name"
                    type="text"
                    name="principalName"
                    value={formData.principalName}
                    onChange={handleInputChange}
                    placeholder="Enter principal's name"
                    leftIcon={<User className="h-4 w-4" />}
                    error={validationErrors.principalName}
                    required
                  />
                </div>
              )}

              {/* Step 3: Plan Selection */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                      Choose Your Subscription Plan
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {subscriptionPlans.map((plan) => (
                        <div
                          key={plan.id}
                          className={cn(
                            "relative p-4 rounded-lg border-2 cursor-pointer transition-all",
                            formData.subscriptionPlan === plan.id
                              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                              : "border-slate-200 hover:border-slate-300"
                          )}
                          onClick={() => setFormData(prev => ({ ...prev, subscriptionPlan: plan.id }))}
                        >
                          {plan.popular && (
                            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                              <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                                Most Popular
                              </span>
                            </div>
                          )}
                          
                          <div className="text-center">
                            <h4 className="font-semibold text-slate-900 dark:text-white">{plan.name}</h4>
                            <p className="text-lg font-bold text-slate-900 dark:text-white mt-2">{plan.price}</p>
                            <ul className="text-sm text-slate-600 dark:text-slate-400 mt-3 space-y-1">
                              {plan.features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                              ))}
                            </ul>
                          </div>
                          
                          {formData.subscriptionPlan === plan.id && (
                            <CheckCircle className="absolute top-2 right-2 h-5 w-5 text-blue-600" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleInputChange}
                        className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-slate-700 dark:text-slate-300">
                        I agree to the{' '}
                        <Link href="/terms" className="text-blue-600 hover:text-blue-500 underline">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy" className="text-blue-600 hover:text-blue-500 underline">
                          Privacy Policy
                        </Link>
                      </span>
                    </label>
                    {validationErrors.agreeTerms && (
                      <p className="text-sm text-red-600">{validationErrors.agreeTerms}</p>
                    )}

                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="agreeMarketing"
                        checked={formData.agreeMarketing}
                        onChange={handleInputChange}
                        className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-slate-700 dark:text-slate-300">
                        I want to receive updates about new features and educational content
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between space-x-4">
                {step > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevious}
                    className="flex-1"
                  >
                    Previous
                  </Button>
                ) : (
                  <div />
                )}

                {step < 3 ? (
                  <Button
                    type="button"
                    variant="gradient"
                    onClick={handleNext}
                    className="flex-1"
                  >
                    Next Step
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="gradient"
                    className="flex-1"
                    loading={loading}
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                    {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                )}
              </div>
            </form>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Already have an account?{' '}
                <Link 
                  href="/auth/login" 
                  className="text-blue-600 hover:text-blue-500 dark:text-blue-400 font-medium"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;