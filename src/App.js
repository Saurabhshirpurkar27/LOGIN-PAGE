import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Lock, Mail, AlertCircle, CheckCircle, Github, Chrome, Apple, Fingerprint, Shield, Loader, Sparkles, Zap, Star } from 'lucide-react';

export default function AdvancedLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [mode, setMode] = useState('login');
  const [showSuccess, setShowSuccess] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 15 + 10
    }));
    setParticles(newParticles);
  }, []);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const calculatePasswordStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (pass.length >= 12) strength++;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) strength++;
    if (/\d/.test(pass)) strength++;
    if (/[^a-zA-Z0-9]/.test(pass)) strength++;
    return strength;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(calculatePasswordStrength(newPassword));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (mode === 'signup' && password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const handleSocialLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Animated Background Elements */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-white opacity-20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animation: `floatParticle ${particle.duration}s ease-in-out infinite`
          }}
        />
      ))}

      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 opacity-20 rounded-full filter blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 opacity-20 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-8 right-8 bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-50 animate-slideIn">
          <CheckCircle className="w-6 h-6" />
          <div>
            <div className="font-bold">Success!</div>
            <div className="text-sm">Welcome back</div>
          </div>
          <Sparkles className="w-5 h-5" />
        </div>
      )}

      {/* Main Login Card */}
      <div className="relative bg-white bg-opacity-10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white border-opacity-20">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg animate-bounce-slow">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-2">
            {mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Join Us' : 'Reset Password'}
          </h2>
          <p className="text-gray-300 flex items-center justify-center gap-2">
            {mode === 'login' ? 'Sign in to continue' : mode === 'signup' ? 'Create your account' : 'Recover your account'}
            <Star className="w-4 h-4 text-yellow-400 animate-spin-slow" />
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex gap-2 mb-6 bg-white bg-opacity-5 p-1 rounded-xl">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${
              mode === 'login' 
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105' 
                : 'text-gray-300 hover:bg-white hover:bg-opacity-10'
            }`}
          >
            Login {mode === 'login' && <Zap className="inline w-4 h-4 ml-1" />}
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${
              mode === 'signup' 
                ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg transform scale-105' 
                : 'text-gray-300 hover:bg-white hover:bg-opacity-10'
            }`}
          >
            Sign Up {mode === 'signup' && <Sparkles className="inline w-4 h-4 ml-1" />}
          </button>
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-200 mb-2 flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full pl-11 pr-4 py-3 bg-white bg-opacity-10 border-2 ${
                errors.email ? 'border-red-500' : 'border-white border-opacity-20 focus:border-blue-400'
              } rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300`}
              placeholder="Enter your email"
            />
          </div>
          {errors.email && (
            <div className="flex items-center gap-1 mt-2 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>{errors.email}</span>
            </div>
          )}
        </div>

        {/* Password Input */}
        {mode !== 'forgot' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-200 mb-2 flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                className={`w-full pl-11 pr-11 py-3 bg-white bg-opacity-10 border-2 ${
                  errors.password ? 'border-red-500' : 'border-white border-opacity-20 focus:border-purple-400'
                } rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <div className="flex items-center gap-1 mt-2 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.password}</span>
              </div>
            )}

            {/* Password Strength */}
            {mode === 'signup' && password && (
              <div className="mt-3">
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                        i < passwordStrength 
                          ? passwordStrength <= 1 ? 'bg-red-500' : passwordStrength <= 3 ? 'bg-yellow-500' : 'bg-green-500'
                          : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-300">
                  Strength: <span className={`font-bold ${
                    passwordStrength <= 1 ? 'text-red-400' : passwordStrength <= 3 ? 'text-yellow-400' : 'text-green-400'
                  }`}>
                    {passwordStrength <= 1 ? 'Weak' : passwordStrength <= 3 ? 'Medium' : 'Strong'}
                  </span>
                  {passwordStrength >= 4 && <CheckCircle className="inline w-4 h-4 ml-1 text-green-400" />}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Remember Me & Forgot Password */}
        {mode === 'login' && (
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <span className="text-sm">Remember me</span>
            </label>
            <button
              onClick={() => setMode('forgot')}
              className="text-sm text-blue-400 hover:text-blue-300 transition"
            >
              Forgot password?
            </button>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mb-6 relative overflow-hidden"
        >
          {isLoading ? (
            <Loader className="w-6 h-6 animate-spin mx-auto" />
          ) : (
            <span className="flex items-center justify-center gap-2">
              {mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Send Reset Link'}
              <Zap className="w-5 h-5" />
            </span>
          )}
        </button>

        {/* Social Login */}
        {mode !== 'forgot' && (
          <>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white via-opacity-30 to-transparent" />
              <span className="text-gray-400 text-sm">or continue with</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white via-opacity-30 to-transparent" />
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <button
                onClick={handleSocialLogin}
                className="flex items-center justify-center py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl hover:bg-opacity-20 transition-all duration-300 hover:scale-110"
              >
                <Chrome className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={handleSocialLogin}
                className="flex items-center justify-center py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl hover:bg-opacity-20 transition-all duration-300 hover:scale-110"
              >
                <Github className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={handleSocialLogin}
                className="flex items-center justify-center py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl hover:bg-opacity-20 transition-all duration-300 hover:scale-110"
              >
                <Apple className="w-6 h-6 text-white" />
              </button>
            </div>

            {mode === 'login' && (
              <button
                onClick={handleSocialLogin}
                className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <Fingerprint className="w-6 h-6" />
                Login with Biometrics
                <Shield className="w-5 h-5" />
              </button>
            )}
          </>
        )}

        {mode === 'forgot' && (
          <button
            onClick={() => setMode('login')}
            className="w-full text-gray-300 hover:text-white transition text-center"
          >
            ← Back to login
          </button>
        )}
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 text-center text-gray-400 text-sm">
        <p className="flex items-center gap-2">
          © 2026 SecureAuth. All rights reserved.
          <Star className="w-3 h-3 text-yellow-400" />
        </p>
      </div>

      <style>{`
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-15px) translateX(5px); }
        }
        
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-slideIn {
          animation: slideIn 0.5s ease-out;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
      `}</style>
    </div>
  );
}