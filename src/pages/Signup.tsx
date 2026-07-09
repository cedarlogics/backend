import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Loader2, User, Building2, Zap } from 'lucide-react';
import { useAuthStore } from '@/store';

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { signup, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.company) newErrors.company = 'Company name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const success = await signup(formData);
    if (success) {
      navigate('/dashboard');
    }
  };

  const updateField = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="text-center mb-8 lg:hidden">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff0088] to-[#ff69b4] shadow-lg shadow-[#ff0088]/30 mb-4">
          <Zap className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white">CedarLogics Console</h1>
      </div>

      <div className="rounded-3xl bg-[#151021]/80 backdrop-blur-xl border border-white/10 p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Create your account</h2>
          <p className="text-white/50">Start your enterprise AI journey today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">First Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => updateField('firstName', e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 rounded-2xl bg-white/5 border ${
                    errors.firstName ? 'border-rose-400' : 'border-white/10 focus:border-[#ff0088]/50'
                  } text-white placeholder-white/30 outline-none transition-colors`}
                  placeholder="John"
                />
              </div>
              {errors.firstName && <p className="text-rose-400 text-xs mt-1">{errors.firstName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Last Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => updateField('lastName', e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 rounded-2xl bg-white/5 border ${
                    errors.lastName ? 'border-rose-400' : 'border-white/10 focus:border-[#ff0088]/50'
                  } text-white placeholder-white/30 outline-none transition-colors`}
                  placeholder="Smith"
                />
              </div>
              {errors.lastName && <p className="text-rose-400 text-xs mt-1">{errors.lastName}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Company</label>
            <div className="relative">
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <input
                type="text"
                value={formData.company}
                onChange={(e) => updateField('company', e.target.value)}
                className={`w-full pl-12 pr-4 py-3 rounded-2xl bg-white/5 border ${
                  errors.company ? 'border-rose-400' : 'border-white/10 focus:border-[#ff0088]/50'
                } text-white placeholder-white/30 outline-none transition-colors`}
                placeholder="Acme Inc."
              />
            </div>
            {errors.company && <p className="text-rose-400 text-xs mt-1">{errors.company}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                className={`w-full pl-12 pr-4 py-3 rounded-2xl bg-white/5 border ${
                  errors.email ? 'border-rose-400' : 'border-white/10 focus:border-[#ff0088]/50'
                } text-white placeholder-white/30 outline-none transition-colors`}
                placeholder="you@company.com"
              />
            </div>
            {errors.email && <p className="text-rose-400 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => updateField('password', e.target.value)}
                className={`w-full pl-12 pr-12 py-3 rounded-2xl bg-white/5 border ${
                  errors.password ? 'border-rose-400' : 'border-white/10 focus:border-[#ff0088]/50'
                } text-white placeholder-white/30 outline-none transition-colors`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && <p className="text-rose-400 text-xs mt-1">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => updateField('confirmPassword', e.target.value)}
                className={`w-full pl-12 pr-4 py-3 rounded-2xl bg-white/5 border ${
                  errors.confirmPassword ? 'border-rose-400' : 'border-white/10 focus:border-[#ff0088]/50'
                } text-white placeholder-white/30 outline-none transition-colors`}
                placeholder="••••••••"
              />
            </div>
            {errors.confirmPassword && <p className="text-rose-400 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.agreeToTerms}
              onChange={(e) => updateField('agreeToTerms', e.target.checked)}
              className="w-4 h-4 mt-1 rounded border-white/20 bg-white/5 text-[#ff0088] focus:ring-[#ff0088]/50"
            />
            <span className="text-sm text-white/60">
              I agree to the{' '}
              <button type="button" className="text-[#ff0088] hover:text-[#ff1493]">
                Terms of Service
              </button>{' '}
              and{' '}
              <button type="button" className="text-[#ff0088] hover:text-[#ff1493]">
                Privacy Policy
              </button>
            </span>
          </label>
          {errors.agreeToTerms && <p className="text-rose-400 text-xs">{errors.agreeToTerms}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#ff0088] to-[#ff69b4] text-white font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Creating account...</span>
              </>
            ) : (
              'Create account'
            )}
          </button>
        </form>

        <p className="text-center text-sm text-white/50 mt-6">
          Already have an account?{' '}
          <Link to="/" className="text-[#ff0088] hover:text-[#ff1493] font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
