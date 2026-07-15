import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  ShieldCheck,
  LayoutGrid,
  ArrowRight,
} from 'lucide-react';
import { useAuthStore } from '@/store';

// Brand tokens
const HOT = '#FF2D87';
const BRIGHT = '#FF5CA8';
const DEEP = '#7A1247';

const STAGES = [
  { id: 1, key: 'identify', label: 'IDENTIFY', sub: 'Read credentials', icon: Mail },
  { id: 2, key: 'verify', label: 'VERIFY', sub: 'Check password', icon: Lock },
  { id: 3, key: 'authorize', label: 'AUTHORIZE', sub: 'Confirm session', icon: ShieldCheck },
  { id: 4, key: 'workspace', label: 'WORKSPACE', sub: 'Open dashboard', icon: LayoutGrid },
] as const;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; auth?: string }>({});
  const [success, setSuccess] = useState(false);
  const { login, googleLogin, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordValid = password.length >= 6;

  // Derive which pipeline node is "live" from actual form state —
  // the diagram is a readout of real progress, not a decoration.
  const stage = success ? 4 : isLoading ? 3 : passwordValid && email ? 2 : emailValid ? 1 : 0;

  useEffect(() => {
    if (!success) return;
    const t = setTimeout(() => navigate('/dashboard'), 900);
    return () => clearTimeout(t);
  }, [success, navigate]);

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!emailValid) newErrors.email = 'Invalid email format';
    if (!password) newErrors.password = 'Password is required';
    else if (!passwordValid) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setErrors((prev) => ({ ...prev, auth: undefined }));
    const ok = await login(email, password);
    if (ok) {
      setSuccess(true);
    } else {
      setErrors((prev) => ({ ...prev, auth: 'Invalid email or password' }));
    }
  };

  const statusLine = success
    ? 'node.status: workspace_ready → redirecting'
    : isLoading
    ? 'node.status: authorize_pending'
    : stage === 2
    ? 'node.status: verify_ok, awaiting submit'
    : stage === 1
    ? 'node.status: identify_ok'
    : 'node.status: idle, awaiting input';

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#0A0612]">
      {/* ============ LEFT: AUTH PANEL ============ */}
      <div className="relative w-full lg:w-[460px] xl:w-[500px] flex flex-col justify-between px-6 sm:px-10 py-10 border-b lg:border-b-0 lg:border-r border-white/[0.06]">
        <div>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/Logo.png"
                alt="CedarLogics"
                className="w-10 h-10 rounded-md object-contain"
              />
              <div className="leading-tight">
                <div className="text-white font-semibold tracking-tight text-[15px]">CedarLogics</div>
                <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/50">Console</div>
              </div>
            </div>
            <div
              className="font-mono text-[11px] uppercase tracking-[0.25em] mb-3"
              style={{ color: BRIGHT }}
            >
              Sys.Auth // 02
            </div>
            <h1 className="text-3xl sm:text-[34px] font-semibold text-white tracking-tight leading-[1.1]">
              Sign in to your
              <br />
              workspace
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.15em] text-white/40 mb-2">
                <span>Email</span>
                {emailValid && email && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ color: BRIGHT }}
                  >
                    ok
                  </motion.span>
                )}
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="peer w-full bg-transparent border-0 border-b-2 border-white/10 focus:border-[#FF2D87] outline-none text-white placeholder-white/25 py-2.5 pl-8 transition-colors"
                />
                <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 peer-focus:text-[#FF5CA8]" />
              </div>
              {errors.email && <p className="text-rose-400 text-xs mt-1.5">{errors.email}</p>}
            </div>

            <div>
              <label className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.15em] text-white/40 mb-2">
                <span>Password</span>
                {passwordValid && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: BRIGHT }}>
                    ok
                  </motion.span>
                )}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="peer w-full bg-transparent border-0 border-b-2 border-white/10 focus:border-[#FF2D87] outline-none text-white placeholder-white/25 py-2.5 pl-8 pr-9 transition-colors"
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
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="sr-only peer"
                />
                <span
                  className="w-4 h-4 rounded-sm border border-white/20 flex items-center justify-center transition-colors"
                  style={{ background: rememberMe ? HOT : 'transparent', borderColor: rememberMe ? HOT : undefined }}
                >
                  {rememberMe && <span className="w-1.5 h-1.5 bg-white rounded-[1px]" />}
                </span>
                <span className="text-xs text-white/50">Remember me</span>
              </label>
              <button type="button" className="text-xs font-medium" style={{ color: BRIGHT }}>
                Forgot password?
              </button>
            </div>

            {errors.auth && <p className="text-rose-400 text-xs">{errors.auth}</p>}

            <motion.button
              type="submit"
              disabled={isLoading || success}
              whileHover={{ x: 2 }}
              className="w-full py-3.5 mt-2 rounded-none text-white font-medium flex items-center justify-center gap-2 disabled:opacity-60 relative overflow-hidden group"
              style={{ background: `linear-gradient(90deg, ${HOT}, ${DEEP})` }}
            >
              <span className="relative z-10 flex items-center gap-2">
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Authorizing…
                  </>
                ) : success ? (
                  <>Workspace ready</>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </span>
            </motion.button>
          </form>

          <div className="flex items-center gap-4 mt-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-white/30">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <button
            type="button"
            onClick={async () => {
              setErrors((prev) => ({ ...prev, auth: undefined }));
              const ok = await googleLogin();
              if (ok) {
                setSuccess(true);
              } else {
                setErrors((prev) => ({ ...prev, auth: 'Google sign-in was cancelled or failed' }));
              }
            }}
            disabled={isLoading || success}
            className="w-full py-3 mt-4 border border-white/15 bg-white/5 text-white/80 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-3 text-sm disabled:opacity-60"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </button>

          <p className="text-center text-xs text-white/40 mt-8">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium" style={{ color: BRIGHT }}>
              Create one
            </Link>
          </p>
        </div>

        {/* live status line, echoes the pipeline state on the right */}
        <div className="font-mono text-[10px] text-white/30 pt-8 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: stage >= 1 ? BRIGHT : '#444' }} />
          {statusLine}
        </div>
      </div>

      {/* ============ RIGHT: LIVE PIPELINE VISUAL ============ */}
      <div
        className="relative flex-1 hidden lg:flex items-center justify-center overflow-hidden"
        style={{
          background:
            'radial-gradient(circle at 30% 20%, rgba(122,18,71,0.35), transparent 55%), #05030A',
        }}
      >
        {/* faint grid */}
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
            Auth pipeline · live
          </div>

          <div className="relative">
            {/* connecting spine */}
            <div className="absolute left-[19px] top-4 bottom-4 w-px bg-white/10" />
            <motion.div
              className="absolute left-[19px] top-4 w-px"
              style={{ background: `linear-gradient(${DEEP}, ${HOT})` }}
              animate={{ height: `${(Math.min(stage, 4) / 4) * 100}%` }}
              transition={{ type: 'spring', stiffness: 90, damping: 18 }}
            />

            {/* ambient traveling particle, loops regardless of stage */}
            <motion.div
              className="absolute left-[16px] w-2 h-2 rounded-full"
              style={{ background: BRIGHT, boxShadow: `0 0 10px ${BRIGHT}` }}
              animate={{ top: ['4%', '96%'] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
            />

            <div className="flex flex-col gap-10">
              {STAGES.map((s) => {
                const isActive = stage >= s.id;
                const isCurrent = stage === s.id;
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
                      {isCurrent && (isLoading || success) && s.id === stage ? (
                        <Loader2 className="w-4 h-4 animate-spin" style={{ color: BRIGHT }} />
                      ) : (
                        <Icon className="w-4 h-4" style={{ color: isActive ? BRIGHT : 'rgba(255,255,255,0.3)' }} />
                      )}
                      {isCurrent && (
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
                className="mt-10 font-mono text-[11px]"
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