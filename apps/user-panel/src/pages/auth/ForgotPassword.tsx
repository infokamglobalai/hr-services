import { Link } from 'react-router-dom'
import { ArrowLeft, Mail, Shield } from 'lucide-react'
import { useState } from 'react'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  return (
    <div className="min-h-screen bg-[#080B14] flex items-center justify-center p-6">
      <div className="fixed top-0 left-0 w-96 h-96 rounded-full bg-purple-600/15 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-80 h-80 rounded-full bg-cyan-600/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <Link to="/login" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4">
          <ArrowLeft size={16} /> Back to login
        </Link>

        <div className="bg-[#0D1120] border border-white/8 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-white/4 border border-white/6 flex items-center justify-center">
              <Shield size={18} className="text-purple-300" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-['Space_Grotesk']">Reset password</h1>
              <p className="text-slate-400 text-sm">This flow isn’t wired to backend yet.</p>
            </div>
          </div>

          {sent ? (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm">
              If an account exists for <span className="font-semibold">{email}</span>, we sent reset instructions.
            </div>
          ) : (
            <>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-purple-500/50 transition-all"
                />
              </div>

              <button
                onClick={() => setSent(true)}
                disabled={!email}
                className="w-full mt-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-sm font-semibold hover:opacity-90 transition-all disabled:opacity-50"
              >
                Send reset link
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

