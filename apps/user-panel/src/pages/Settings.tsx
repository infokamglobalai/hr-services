import { useAuthStore } from '@/stores/auth.store'
import { authApi } from '@/api/client'
import { useNavigate } from 'react-router-dom'
import { LogOut, Shield, KeyRound } from 'lucide-react'

export default function Settings() {
  const navigate = useNavigate()
  const { user, clearAuth } = useAuthStore()

  const logout = async () => {
    try {
      await authApi.logout()
    } catch {
      // ignore
    } finally {
      clearAuth()
      navigate('/login')
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold font-['Space_Grotesk'] mb-1">Settings</h1>
      <p className="text-slate-400 text-sm mb-6">Manage your account and session.</p>

      <div className="space-y-4">
        <div className="bg-[#0D1120] border border-white/8 rounded-3xl p-6">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
            <Shield size={14} className="text-slate-500" /> Account
          </div>
          <div className="text-sm text-slate-300 space-y-1">
            <p><span className="text-slate-500">Signed in as:</span> {user?.email}</p>
            <p><span className="text-slate-500">Handle:</span> @{user?.handle}</p>
            <p><span className="text-slate-500">Role:</span> {user?.role}</p>
          </div>
        </div>

        <div className="bg-[#0D1120] border border-white/8 rounded-3xl p-6">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
            <KeyRound size={14} className="text-slate-500" /> Security
          </div>
          <p className="text-sm text-slate-400">
            Password reset and MFA are not wired yet.
          </p>
        </div>

        <div className="bg-[#0D1120] border border-white/8 rounded-3xl p-6 flex items-center justify-between gap-4">
          <div>
            <p className="font-semibold">Logout</p>
            <p className="text-sm text-slate-500">End your current session on this device.</p>
          </div>
          <button
            onClick={logout}
            className="px-5 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 hover:bg-red-500/15 hover:border-red-500/30 transition-all inline-flex items-center gap-2"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>
    </div>
  )
}

