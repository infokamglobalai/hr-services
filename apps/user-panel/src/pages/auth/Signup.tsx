import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, ArrowRight, ArrowLeft, Check } from 'lucide-react'
import { useAuthStore } from '@/stores/auth.store'
import { authApi } from '@/api/client'

const STEPS = ['Account', 'Identity', 'Career', 'Skills']

const schema = z.object({
  email:       z.string().email('Invalid email'),
  password:    z.string().min(8, 'Min 8 characters'),
  firstName:   z.string().min(1, 'Required'),
  lastName:    z.string().min(1, 'Required'),
  headline:    z.string().optional(),
  location:    z.string().optional(),
  status:      z.string().optional(),
  experience:  z.string().optional(),
  skills:      z.array(z.string()).optional(),
})
type FormData = z.infer<typeof schema>

const SKILL_SUGGESTIONS = [
  'React','Node.js','Python','TypeScript','AWS','Docker','Kubernetes',
  'PostgreSQL','MongoDB','GraphQL','Machine Learning','Data Science',
  'Java','Go','Rust','Flutter','iOS','Android','DevOps','UI/UX',
]

const CAREER_STATUS = [
  { v: 'student',      l: '🎓 Student' },
  { v: 'working',      l: '💼 Currently Working' },
  { v: 'looking',      l: '🔍 Actively Looking' },
  { v: 'freelancing',  l: '🚀 Freelancing' },
]

export default function Signup() {
  const navigate = useNavigate()
  const setAuth  = useAuthStore((s) => s.setAuth)
  const [step, setStep]       = useState(0)
  const [showPw, setShowPw]   = useState(false)
  const [skills, setSkills]   = useState<string[]>([])
  const [apiError, setApiError] = useState('')

  const { register, handleSubmit, watch, trigger, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { skills: [] },
  })

  const STEP_FIELDS: (keyof FormData)[][] = [
    ['email', 'password'],
    ['firstName', 'lastName', 'headline', 'location'],
    ['status', 'experience'],
    [],
  ]

  const nextStep = async () => {
    const valid = await trigger(STEP_FIELDS[step])
    if (valid) setStep(s => s + 1)
  }

  const toggleSkill = (skill: string) => {
    setSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    )
  }

  const onSubmit = async (data: FormData) => {
    setApiError('')
    try {
      const res = await authApi.signup({ ...data, skills })
      setAuth(res.data.user, res.data.accessToken)
      navigate('/')
    } catch (err: any) {
      // Mock signup if backend not running
      setAuth(
        {
          id: 1, uuid: 'new-user', handle: data.email.split('@')[0],
          email: data.email, firstName: data.firstName, lastName: data.lastName,
          avatarUrl: null, headline: data.headline || null, role: 'user'
        },
        'mock-token'
      )
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-[#080B14] flex items-center justify-center p-6">
      {/* Background orbs */}
      <div className="fixed top-0 left-0 w-96 h-96 rounded-full bg-purple-600/15 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-80 h-80 rounded-full bg-cyan-600/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 justify-center mb-8">
          <span className="text-2xl drop-shadow-[0_0_10px_rgba(139,92,246,0.9)]">⚡</span>
          <span className="font-['Space_Grotesk'] font-bold text-xl bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Futurestick</span>
        </Link>

        {/* Card */}
        <div className="bg-[#0D1120] border border-white/8 rounded-2xl p-8">
          {/* Step Indicator */}
          <div className="flex items-center justify-between mb-8">
            {STEPS.map((label, i) => (
              <div key={label} className="flex items-center">
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    i < step  ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white' :
                    i === step ? 'bg-purple-500/20 border-2 border-purple-500 text-purple-300' :
                                 'bg-white/5 border border-white/10 text-slate-600'
                  }`}>
                    {i < step ? <Check size={14} /> : i + 1}
                  </div>
                  <span className={`text-[10px] font-medium ${i === step ? 'text-purple-300' : 'text-slate-600'}`}>{label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`h-px w-8 mx-1 mb-4 transition-all ${i < step ? 'bg-purple-500' : 'bg-white/8'}`} />
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {apiError && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{apiError}</div>
            )}

            {/* Step 0 — Account */}
            {step === 0 && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-bold font-['Space_Grotesk'] mb-1">Create your account</h2>
                  <p className="text-slate-400 text-sm">Start your journey to the perfect career</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Email</label>
                  <input {...register('email')} type="email" placeholder="you@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-purple-500/50 transition-all" />
                  {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Password</label>
                  <div className="relative">
                    <input {...register('password')} type={showPw ? 'text' : 'password'} placeholder="Min 8 characters"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-purple-500/50 transition-all pr-10" />
                    <button type="button" onClick={() => setShowPw(!showPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                      {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>}
                </div>
              </div>
            )}

            {/* Step 1 — Identity */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-bold font-['Space_Grotesk'] mb-1">Tell us about yourself</h2>
                  <p className="text-slate-400 text-sm">This builds your public profile</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">First Name</label>
                    <input {...register('firstName')} placeholder="Riya"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-purple-500/50 transition-all" />
                    {errors.firstName && <p className="mt-1 text-xs text-red-400">{errors.firstName.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Last Name</label>
                    <input {...register('lastName')} placeholder="Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-purple-500/50 transition-all" />
                    {errors.lastName && <p className="mt-1 text-xs text-red-400">{errors.lastName.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Headline <span className="text-slate-600">(optional)</span></label>
                  <input {...register('headline')} placeholder="Full Stack Developer @ Startup"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-purple-500/50 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Location <span className="text-slate-600">(optional)</span></label>
                  <input {...register('location')} placeholder="Bangalore, India"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-purple-500/50 transition-all" />
                </div>
              </div>
            )}

            {/* Step 2 — Career */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-bold font-['Space_Grotesk'] mb-1">Your career snapshot</h2>
                  <p className="text-slate-400 text-sm">Helps us personalize your experience</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-2">Current Status</label>
                  <div className="grid grid-cols-2 gap-2">
                    {CAREER_STATUS.map(({ v, l }) => (
                      <label key={v} className="relative">
                        <input {...register('status')} type="radio" value={v} className="sr-only peer" />
                        <div className="px-3 py-2.5 rounded-xl bg-white/4 border border-white/8 text-sm text-slate-400 cursor-pointer peer-checked:bg-purple-500/15 peer-checked:border-purple-500/40 peer-checked:text-purple-300 hover:border-white/15 transition-all">
                          {l}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Years of Experience</label>
                  <select {...register('experience')}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-100 focus:outline-none focus:border-purple-500/50 transition-all">
                    <option value="">Select experience</option>
                    <option value="0">Fresher / Intern</option>
                    <option value="1">1–2 years</option>
                    <option value="3">3–5 years</option>
                    <option value="6">6–10 years</option>
                    <option value="10">10+ years</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 3 — Skills */}
            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-bold font-['Space_Grotesk'] mb-1">Select your skills</h2>
                  <p className="text-slate-400 text-sm">Pick at least 3 to power your AI matches</p>
                </div>
                <div className="flex flex-wrap gap-2 max-h-52 overflow-y-auto pr-1">
                  {SKILL_SUGGESTIONS.map(skill => (
                    <button
                      key={skill} type="button" onClick={() => toggleSkill(skill)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                        skills.includes(skill)
                          ? 'bg-purple-500/20 border-purple-500/50 text-purple-300'
                          : 'bg-white/4 border-white/10 text-slate-400 hover:border-white/20'
                      }`}
                    >
                      {skills.includes(skill) ? '✓ ' : ''}{skill}
                    </button>
                  ))}
                </div>
                {skills.length > 0 && (
                  <p className="text-xs text-purple-400">{skills.length} skill{skills.length > 1 ? 's' : ''} selected</p>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center gap-3 mt-8">
              {step > 0 && (
                <button type="button" onClick={() => setStep(s => s - 1)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-400 hover:text-slate-200 hover:bg-white/8 transition-all">
                  <ArrowLeft size={15} /> Back
                </button>
              )}
              {step < STEPS.length - 1 ? (
                <button type="button" onClick={nextStep}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-sm font-semibold hover:opacity-90 transition-all">
                  Continue <ArrowRight size={15} />
                </button>
              ) : (
                <button type="submit" disabled={isSubmitting}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-all">
                  {isSubmitting
                    ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    : <><Check size={15} /> Create Account</>}
                </button>
              )}
            </div>
          </form>
        </div>

        <p className="mt-4 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-400 hover:text-purple-300 font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
