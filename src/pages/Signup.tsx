import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  User,
  Building2,
  ShieldCheck,
  LayoutGrid,
  ArrowRight,
} from 'lucide-react';
import { useAuthStore } from '@/store';

// Brand tokens — shared with Login.tsx
const HOT = '#FF2D87';
const BRIGHT = '#FF5CA8';
const DEEP = '#7A1247';

const STAGES = [
  { id: 1, key: 'identity', label: 'IDENTITY', sub: 'Name on file', icon: User },
  { id: 2, key: 'organization', label: 'ORGANIZATION', sub: 'Company profile', icon: Building2 },
  { id: 3, key: 'credentials', label: 'CREDENTIALS', sub: 'Email + password', icon: Lock },
  { id: 4, key: 'consent', label: 'CONSENT', sub: 'Terms accepted', icon: ShieldCheck },
  { id: 5, key: 'workspace', label: 'WORKSPACE', sub: 'Provision account', icon: LayoutGrid },
] as const;

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
  const [success, setSuccess] = useState(false);
  const { signup, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const updateField = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Real progress readout — each group only counts once every field in it is valid.
  const identityDone = !!formData.firstName && !!formData.lastName;
  const orgDone = !!formData.company;
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const hasMinLength = formData.password.length >= 8;
  const hasUppercase = /[A-Z]/.test(formData.password);
  const hasLowercase = /[a-z]/.test(formData.password);
  const hasNumber = /[0-9]/.test(formData.password);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password);
  const passwordValid = hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecial;
  const passwordsMatch = formData.password.length > 0 && formData.password === formData.confirmPassword;
  const credentialsDone = emailValid && passwordValid && passwordsMatch;
  const consentDone = formData.agreeToTerms;

  const completedGroups = [identityDone, orgDone, credentialsDone, consentDone].filter(Boolean).length;
  const stage = success ? 5 : completedGroups; // 0–4 while filling, 5 once provisioned

  useEffect(() => {
    if (!success) return;
    const t = setTimeout(() => navigate('/dashboard'), 900);
    return () => clearTimeout(t);
  }, [success, navigate]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.company) newErrors.company = 'Company name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!emailValid) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (!passwordValid) newErrors.password = 'Password does not meet all requirements';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setErrors((prev) => ({ ...prev, auth: '' }));
    const ok = await signup(formData);
    if (ok) {
      setSuccess(true);
    } else {
      setErrors((prev) => ({ ...prev, auth: 'Email already in use or weak password' }));
    }
  };

  const statusLine = success
    ? 'node.status: workspace_ready → redirecting'
    : isLoading
    ? 'node.status: provisioning_account'
    : `node.status: ${completedGroups}/4 groups complete`;

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#0A0612]">
      {/* ============ LEFT: SIGNUP FORM ============ */}
      <div className="relative w-full lg:w-[520px] xl:w-[560px] flex flex-col justify-between px-6 sm:px-10 py-10 border-b lg:border-b-0 lg:border-r border-white/[0.06] overflow-y-auto">
        <div>
          <div className="mb-8">
            <div className="font-mono text-[11px] uppercase tracking-[0.25em] mb-3" style={{ color: BRIGHT }}>
              Sys.Auth // 01
            </div>
            <h1 className="text-3xl sm:text-[32px] font-semibold text-white tracking-tight leading-[1.1]">
              Provision your
              <br />
              workspace
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="grid grid-cols-2 gap-x-5 gap-y-5">
              <div>
                <label className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.15em] text-white/40 mb-2">
                  <span>First name</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => updateField('firstName', e.target.value)}
                    placeholder="John"
                    className="peer w-full bg-transparent border-0 border-b-2 border-white/10 focus:border-[#FF2D87] outline-none text-white placeholder-white/25 py-2.5 pl-7 transition-colors"
                  />
                  <User className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 peer-focus:text-[#FF5CA8]" />
                </div>
                {errors.firstName && <p className="text-rose-400 text-xs mt-1.5">{errors.firstName}</p>}
              </div>

              <div>
                <label className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.15em] text-white/40 mb-2">
                  <span>Last name</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => updateField('lastName', e.target.value)}
                    placeholder="Smith"
                    className="peer w-full bg-transparent border-0 border-b-2 border-white/10 focus:border-[#FF2D87] outline-none text-white placeholder-white/25 py-2.5 pl-7 transition-colors"
                  />
                  <User className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 peer-focus:text-[#FF5CA8]" />
                </div>
                {errors.lastName && <p className="text-rose-400 text-xs mt-1.5">{errors.lastName}</p>}
              </div>
            </div>

            <div>
              <label className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.15em] text-white/40 mb-2">
                <span>Company</span>
                {orgDone && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: BRIGHT }}>
                    ok
                  </motion.span>
                )}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => updateField('company', e.target.value)}
                  placeholder="Acme Inc."
                  className="peer w-full bg-transparent border-0 border-b-2 border-white/10 focus:border-[#FF2D87] outline-none text-white placeholder-white/25 py-2.5 pl-7 transition-colors"
                />
                <Building2 className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 peer-focus:text-[#FF5CA8]" />
              </div>
              {errors.company && <p className="text-rose-400 text-xs mt-1.5">{errors.company}</p>}
            </div>

            <div>
              <label className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.15em] text-white/40 mb-2">
                <span>Email</span>
                {emailValid && formData.email && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: BRIGHT }}>
                    ok
                  </motion.span>
                )}
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="you@company.com"
                  className="peer w-full bg-transparent border-0 border-b-2 border-white/10 focus:border-[#FF2D87] outline-none text-white placeholder-white/25 py-2.5 pl-7 transition-colors"
                />
                <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 peer-focus:text-[#FF5CA8]" />
              </div>
              {errors.email && <p className="text-rose-400 text-xs mt-1.5">{errors.email}</p>}
            </div>

            <div className="grid grid-cols-2 gap-x-5 gap-y-5">
              <div>
                <label className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.15em] text-white/40 mb-2">
                  <span>Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => updateField('password', e.target.value)}
                    placeholder="••••••••"
                    className="peer w-full bg-transparent border-0 border-b-2 border-white/10 focus:border-[#FF2D87] outline-none text-white placeholder-white/25 py-2.5 pl-7 pr-8 transition-colors"
                  />
                  <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 peer-focus:text-[#FF5CA8]" />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-white/25 hover:text-white transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-rose-400 text-xs mt-1.5">{errors.password}</p>}
                {formData.password.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {[
                      { label: 'At least 8 characters', met: hasMinLength },
                      { label: 'One uppercase letter', met: hasUppercase },
                      { label: 'One lowercase letter', met: hasLowercase },
                      { label: 'One number', met: hasNumber },
                      { label: 'One special character', met: hasSpecial },
                    ].map((rule) => (
                      <div key={rule.label} className="flex items-center gap-1.5 text-[11px]">
                        <span
                          className="w-3 h-3 rounded-full flex items-center justify-center text-[8px] font-bold shrink-0"
                          style={{
                            background: rule.met ? '#22c55e' : 'transparent',
                            border: rule.met ? 'none' : '1px solid rgba(255,255,255,0.15)',
                            color: rule.met ? '#fff' : 'transparent',
                          }}
                        >
                          ✓
                        </span>
                        <span style={{ color: rule.met ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.25)' }}>
                          {rule.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.15em] text-white/40 mb-2">
                  <span>Confirm</span>
                  {passwordsMatch && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: BRIGHT }}>
                      ok
                    </motion.span>
                  )}
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => updateField('confirmPassword', e.target.value)}
                    placeholder="••••••••"
                    className="peer w-full bg-transparent border-0 border-b-2 border-white/10 focus:border-[#FF2D87] outline-none text-white placeholder-white/25 py-2.5 pl-7 transition-colors"
                  />
                  <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 peer-focus:text-[#FF5CA8]" />
                </div>
                {errors.confirmPassword && <p className="text-rose-400 text-xs mt-1.5">{errors.confirmPassword}</p>}
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer select-none pt-1">
              <input
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={(e) => updateField('agreeToTerms', e.target.checked)}
                className="sr-only peer"
              />
              <span
                className="w-4 h-4 mt-0.5 rounded-sm border border-white/20 flex items-center justify-center shrink-0 transition-colors"
                style={{
                  background: formData.agreeToTerms ? HOT : 'transparent',
                  borderColor: formData.agreeToTerms ? HOT : undefined,
                }}
              >
                {formData.agreeToTerms && <span className="w-1.5 h-1.5 bg-white rounded-[1px]" />}
              </span>
              <span className="text-xs text-white/50 leading-relaxed">
                I agree to the{' '}
                <button type="button" className="font-medium" style={{ color: BRIGHT }}>
                  Terms of Service
                </button>{' '}
                and{' '}
                <button type="button" className="font-medium" style={{ color: BRIGHT }}>
                  Privacy Policy
                </button>
              </span>
            </label>
            {errors.agreeToTerms && <p className="text-rose-400 text-xs">{errors.agreeToTerms}</p>}

            {errors.auth && <p className="text-rose-400 text-xs">{errors.auth}</p>}

            <motion.button
              type="submit"
              disabled={isLoading || success}
              whileHover={{ x: 2 }}
              className="w-full py-3.5 mt-2 text-white font-medium flex items-center justify-center gap-2 disabled:opacity-60 relative overflow-hidden group"
              style={{ background: `linear-gradient(90deg, ${HOT}, ${DEEP})` }}
            >
              <span className="relative z-10 flex items-center gap-2">
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Provisioning…
                  </>
                ) : success ? (
                  <>Workspace ready</>
                ) : (
                  <>
                    Create account
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </span>
            </motion.button>
          </form>

          <p className="text-center text-xs text-white/40 mt-8">
            Already have an account?{' '}
            <Link to="/" className="font-medium" style={{ color: BRIGHT }}>
              Sign in
            </Link>
          </p>
        </div>

        <div className="font-mono text-[10px] text-white/30 pt-8 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: stage >= 1 ? BRIGHT : '#444' }} />
          {statusLine}
        </div>
      </div>

      {/* ============ RIGHT: LIVE PIPELINE VISUAL ============ */}
      <div
        className="relative flex-1 hidden lg:flex items-center justify-center overflow-hidden"
        style={{
          background: 'radial-gradient(circle at 30% 20%, rgba(122,18,71,0.35), transparent 55%), #05030A',
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '38px 38px',
          }}
        />

        <div className="absolute left-10 top-10 flex items-center gap-3 bg-white/5 p-3 rounded-xl">
          <img
            src="/Logo.png"
            alt="CedarLogics"
            className="w-12 h-12 rounded-md object-contain"
          />
          <div className="leading-tight">
            <div className="text-white font-semibold tracking-tight text-[16px]">CedarLogics</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">Console</div>
          </div>
        </div>

        <div className="relative w-full max-w-md px-10">
          <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/30 mb-10">
            Provisioning pipeline · live
          </div>

          <div className="relative">
            <div className="absolute left-[19px] top-4 bottom-4 w-px bg-white/10" />
            <motion.div
              className="absolute left-[19px] top-4 w-px"
              style={{ background: `linear-gradient(${DEEP}, ${HOT})` }}
              animate={{ height: `${(Math.min(stage, 5) / 5) * 100}%` }}
              transition={{ type: 'spring', stiffness: 90, damping: 18 }}
            />

            <motion.div
              className="absolute left-[16px] w-2 h-2 rounded-full"
              style={{ background: BRIGHT, boxShadow: `0 0 10px ${BRIGHT}` }}
              animate={{ top: ['4%', '96%'] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: 'linear' }}
            />

            <div className="flex flex-col gap-8">
              {STAGES.map((s) => {
                const isActive = stage >= s.id;
                const isCurrent = s.id === 5 ? (isLoading || success) : stage + 1 === s.id;
                const spinning = s.id === 5 && isLoading;
                const Icon = s.icon;
                return (
                  <div key={s.id} className="flex items-center gap-5">
                    <motion.div
                      className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 border"
                      animate={{
                        borderColor: isActive ? HOT : 'rgba(255,255,255,0.12)',
                        background: isActive ? 'rgba(255,45,135,0.12)' : '#0A0612',
                      }}
                    >
                      {spinning ? (
                        <Loader2 className="w-4 h-4 animate-spin" style={{ color: BRIGHT }} />
                      ) : (
                        <Icon className="w-4 h-4" style={{ color: isActive ? BRIGHT : 'rgba(255,255,255,0.3)' }} />
                      )}
                      {isCurrent && !spinning && (
                        <motion.span
                          className="absolute inset-0 rounded-full"
                          style={{ border: `1px solid ${HOT}` }}
                          animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
                          transition={{ duration: 1.4, repeat: Infinity }}
                        />
                      )}
                    </motion.div>
                    <div>
                      <div
                        className="font-mono text-[11px] tracking-[0.15em] transition-colors"
                        style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.35)' }}
                      >
                        {s.label}
                      </div>
                      <div className="text-[11px] text-white/30">{s.sub}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 font-mono text-[11px]"
                style={{ color: BRIGHT }}
              >
                → redirecting to dashboard
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}