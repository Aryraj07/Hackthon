import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Eye, EyeOff, Mail, Lock, GraduationCap } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface LoginProps {
  onLogin: (email: string, password: string) => void;
  isLoading: boolean;
}

export function Login({ onLogin, isLoading }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    // Email validation
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onLogin(email, password);
    }
  };

  const handleDemoLogin = () => {
    setEmail('priya.sharma@example.com');
    setPassword('demo123');
    // Clear any existing errors
    setErrors({});
    // Automatically submit with demo credentials
    setTimeout(() => {
      onLogin('priya.sharma@example.com', 'demo123');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-semibold text-foreground mb-2">Welcome to LearnHub</h1>
          <p className="text-muted-foreground">Sign in to continue your learning journey</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-xl border-0 bg-card/95 backdrop-blur">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to access your account
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="priya.sharma@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) {
                        setErrors(prev => ({ ...prev, email: undefined }));
                      }
                    }}
                    className={`pl-10 rounded-xl ${errors.email ? 'border-red-500' : ''}`}
                    disabled={isLoading}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) {
                        setErrors(prev => ({ ...prev, password: undefined }));
                      }
                    }}
                    className={`pl-10 pr-10 rounded-xl ${errors.password ? 'border-red-500' : ''}`}
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 px-2 py-1 h-8 hover:bg-transparent"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Remember Me and Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    id="remember"
                    type="checkbox"
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    disabled={isLoading}
                  />
                  <Label htmlFor="remember" className="text-sm text-muted-foreground">
                    Remember me
                  </Label>
                </div>
                <Button
                  type="button"
                  variant="link"
                  className="text-sm text-purple-600 hover:text-purple-500 p-0 h-auto"
                  disabled={isLoading}
                >
                  Forgot password?
                </Button>
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl py-2.5"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            {/* Separator */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or</span>
              </div>
            </div>

            {/* Demo Login Button */}
            <Button
              type="button"
              variant="outline"
              onClick={handleDemoLogin}
              className="w-full rounded-xl py-2.5 hover:bg-purple-50 border-purple-200 text-purple-600 hover:text-purple-700"
              disabled={isLoading}
            >
              Try Demo Account
            </Button>

            {/* Sign Up Link */}
            <div className="text-center pt-4">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Button
                  type="button"
                  variant="link"
                  className="text-purple-600 hover:text-purple-500 p-0 h-auto font-medium"
                  disabled={isLoading}
                >
                  Sign up here
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Demo Credentials Info */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">🚀 Demo Accounts Available:</h4>
          <div className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
            <div className="p-2 bg-white/50 dark:bg-black/20 rounded">
              <p><strong>Student Account:</strong></p>
              <p>Email: priya.sharma@example.com</p>
              <p>Password: demo123</p>
            </div>
            <div className="p-2 bg-white/50 dark:bg-black/20 rounded">
              <p><strong>Admin Account:</strong></p>
              <p>Email: admin@learnhub.com</p>
              <p>Password: admin123</p>
            </div>
            <p className="text-xs mt-2 opacity-75">
              💡 Click "Try Demo Account" for instant access with student credentials
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>© 2024 LearnHub. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}