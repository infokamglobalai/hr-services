import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Zap, ArrowRight } from 'lucide-react'
import { useAuthStore } from '@/stores/auth.store'
import { authApi } from '@/api/client'

const schema = z.object({
  email:    z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})
type FormData = z.infer<typeof schema>

export default function Login() {
  const navigate = useNavigate()
  const setAuth  = useAuthStore((s) => s.setAuth)
  const [showPw, setShowPw] = useState(false)
  const [apiError, setApiError] = useState('')

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setApiError('')
    try {
      const res = await authApi.login(data)
      setAuth(res.data.user, res.data.accessToken)
      navigate('/')
    } catch (err: any) {
      setApiError(err?.response?.data?.message || 'Invalid credentials. Try demo@futurestick.com / demo123')
    }
  }

  // Demo login
  const demoLogin = async () => {
    setApiError('')
    try {
      const res = await authApi.login({ email: 'demo@futurestick.com', password: 'demo123' })
      setAuth(res.data.user, res.data.accessToken)
      navigate('/')
    } catch {
      // If backend not running, set mock auth
      setAuth(
        { id: 1, uuid: 'demo', handle: 'demo_user', email: 'demo@futurestick.com',
          firstName: 'Demo', lastName: 'User', avatarUrl: null, headline: 'Software Engineer', role: 'user' },
        'mock-token-demo'
      )
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-[#080B14] flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-[#0D0625] via-[#0a1a3d] to-[#080B14] flex-col justify-between p-12">
        {/* Orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-purple-600/20 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-cyan-600/15 blur-[100px] pointer-events-none" />

        <Link to="/" className="flex items-center gap-2 relative z-10">
          <span className="text-2xl drop-shadow-[0_0_10px_rgba(139,92,246,0.9)]">⚡</span>
          <span className="font-['Space_Grotesk'] font-bold text-xl bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Futurestick</span>
        </Link>

        <div className="relative z-10">
          <blockquote className="text-2xl font-light text-slate-200 leading-relaxed mb-6">
            "Futurestick helped me land a <span className="font-semibold text-white">₹40 LPA offer</span> in 3 weeks. The AI matcher is insane."
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-sm font-bold">AK</div>
            <div>
              <p className="font-semibold text-white text-sm">Arjun Kumar</p>
              <p className="text-slate-400 text-xs">SDE-2 @ Razorpay • Found via AI Matcher</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-3 gap-4">
          {[
            { n: '50K+', l: 'Active Jobs' },
            { n: '120K+', l: 'Users' },
            { n: '98%', l: 'Placement Rate' },
          ].map(s => (
            <div key={s.l} className="p-4 rounded-xl bg-white/4 border border-white/8">
              <p className="text-xl font-bold font-['Space_Grotesk'] bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">{s.n}</p>
              <p className="text-xs text-slate-500 mt-0.5">{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-sm">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <span className="text-xl">⚡</span>
            <span className="font-['Space_Grotesk'] font-bold text-lg bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Futurestick</span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold font-['Space_Grotesk'] mb-1">Welcome back</h1>
            <p className="text-slate-400 text-sm">Sign in to your account to continue</p>
          </div>

          {/* Demo Banner */}
          <button
            onClick={demoLogin}
            className="w-full mb-6 py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-500/15 to-cyan-500/10 border border-purple-500/25 text-sm text-purple-300 hover:border-purple-500/50 transition-all flex items-center justify-center gap-2"
          >
            <Zap size={14} />
            Try Demo Account — No signup needed
          </button>

          {/* OAuth */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/4 border border-white/8 text-sm text-slate-300 hover:bg-white/7 hover:border-white/15 transition-all">
              <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/4 border border-white/8 text-sm text-slate-300 hover:bg-white/7 hover:border-white/15 transition-all">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[#0A66C2]"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              LinkedIn
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-white/8" />
            <span className="text-xs text-slate-600">or continue with email</span>
            <div className="flex-1 h-px bg-white/8" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {apiError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {apiError}
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Email</label>
              <input
                {...register('email')}
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/7 transition-all"
              />
              {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-slate-400">Password</label>
                <Link to="/forgot-password" className="text-xs text-purple-400 hover:text-purple-300">Forgot?</Link>
              </div>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPw ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/7 transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRight size={15} /></>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don't have an account?{' '}
            <Link to="/signup" className="text-purple-400 hover:text-purple-300 font-medium">Create one free</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
