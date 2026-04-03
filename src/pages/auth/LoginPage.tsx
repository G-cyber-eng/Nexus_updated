// src/pages/auth/LoginPage.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, CircleDollarSign, LogIn, AlertCircle, Mail } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { UserRole } from '../../types';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('entrepreneur');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login(email, password, role);

      localStorage.setItem("tempEmail", email);
      localStorage.setItem("tempRole", role);

      navigate("/auth/otp");
    } catch (err: any) {
      setError(err?.message || "Login failed. Please try again.");
      setIsLoading(false);
    }
  };

  const fillDemoCredentials = (userRole: UserRole) => {
    if (userRole === 'entrepreneur') {
      setEmail('sarah@techwave.io');
      setPassword('password123');
    } else {
      setEmail('michael@vcinnovate.com');
      setPassword('password123');
    }
    setRole(userRole);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo & Header */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white text-3xl font-bold">BN</span>
          </div>
          <h1 className="mt-6 text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-500 mt-2">Sign in to continue to Business Nexus</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl flex items-start gap-3">
              <AlertCircle size={20} className="mt-0.5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                I am signing in as
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('entrepreneur')}
                  className={`flex items-center justify-center gap-2 py-4 px-5 border rounded-2xl transition-all ${
                    role === 'entrepreneur'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <Building2 size={20} />
                  <span className="font-medium">Entrepreneur</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('investor')}
                  className={`flex items-center justify-center gap-2 py-4 px-5 border rounded-2xl transition-all ${
                    role === 'investor'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <CircleDollarSign size={20} />
                  <span className="font-medium">Investor</span>
                </button>
              </div>
            </div>

            {/* Email - leftIcon yahan Mail component pass ho raha hai */}
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              leftIcon={Mail}
            />

            {/* Password */}
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />

            <Button
              type="submit"
              fullWidth
              isLoading={isLoading}
              size="lg"
              leftIcon={<LogIn size={20} />}
              className="mt-2"
            >
              Continue with OTP
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-3 text-center">Demo Credentials</p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => fillDemoCredentials('entrepreneur')}
                className="flex-1 text-xs py-2 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Entrepreneur Demo
              </button>
              <button
                type="button"
                onClick={() => fillDemoCredentials('investor')}
                className="flex-1 text-xs py-2 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Investor Demo
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link 
              to="/register" 
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Don't have an account? Create one
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          © 2026 Business Nexus • Secure Login
        </p>
      </div>
    </div>
  );
};