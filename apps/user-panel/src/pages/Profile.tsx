import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthStore } from '@/stores/auth.store'
import { User, MapPin, Briefcase, Mail, PencilLine, Save, X } from 'lucide-react'

export default function Profile() {
  const { handle } = useParams()
  const { user, updateUser } = useAuthStore()
  const isMe = !handle || handle === user?.handle

  const displayUser = useMemo(() => {
    // No backend profile endpoint exists yet; for now only support viewing your own profile.
    return user
  }, [user])

  const [editing, setEditing] = useState(false)
  const [draftFirst, setDraftFirst] = useState(user?.firstName || '')
  const [draftLast, setDraftLast] = useState(user?.lastName || '')
  const [draftHeadline, setDraftHeadline] = useState(user?.headline || '')

  const initials = `${displayUser?.firstName?.[0] || ''}${displayUser?.lastName?.[0] || ''}`.trim() || 'U'

  const saveLocal = () => {
    updateUser({
      firstName: draftFirst.trim() || user?.firstName,
      lastName: draftLast.trim() || user?.lastName,
      headline: draftHeadline.trim() || null,
    })
    setEditing(false)
  }

  if (!displayUser) {
    return (
      <div className="p-10 text-center text-slate-500">
        No profile data available.
      </div>
    )
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold font-['Space_Grotesk'] mb-1">Profile</h1>
          <p className="text-slate-400 text-sm">Your public identity inside Futurestick.</p>
        </div>

        {isMe && (
          <button
            onClick={() => {
              setDraftFirst(user?.firstName || '')
              setDraftLast(user?.lastName || '')
              setDraftHeadline(user?.headline || '')
              setEditing(true)
            }}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-300 hover:bg-white/8 hover:border-white/15 transition-all inline-flex items-center gap-2"
          >
            <PencilLine size={16} /> Edit
          </button>
        )}
      </div>

      <div className="bg-[#0D1120] border border-white/8 rounded-3xl overflow-hidden">
        <div className="p-8 border-b border-white/5 relative overflow-hidden">
          <div className="absolute -top-28 -right-28 w-72 h-72 bg-purple-500/10 blur-[110px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-28 -left-28 w-72 h-72 bg-cyan-500/10 blur-[110px] rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-xl font-black shadow-xl">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-2xl font-bold truncate">
                {displayUser.firstName} {displayUser.lastName}
              </p>
              <p className="text-slate-400 text-sm truncate">
                @{displayUser.handle}
              </p>
              <p className="mt-2 text-slate-300 text-sm">
                {displayUser.headline || 'Add a headline to tell people what you do.'}
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-white/4 border border-white/6">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
              <User size={14} className="text-slate-500" /> Account
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-slate-300">
                <Mail size={16} className="text-slate-600" />
                <span className="truncate">{displayUser.email}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Briefcase size={16} className="text-slate-600" />
                <span className="truncate">{displayUser.role}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin size={16} className="text-slate-600" />
                <span className="truncate">Location not set</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/4 border border-white/6">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
              <Briefcase size={14} className="text-slate-500" /> Quick actions
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href="/resume-builder"
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-300 hover:bg-white/8 hover:border-white/15 transition-all"
              >
                Resume builder
              </a>
              <a
                href="/applications"
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-300 hover:bg-white/8 hover:border-white/15 transition-all"
              >
                Applications
              </a>
              <a
                href="/ai-toolkit"
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-300 hover:bg-white/8 hover:border-white/15 transition-all"
              >
                AI Toolkit
              </a>
            </div>
          </div>
        </div>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setEditing(false)} />
          <div className="relative z-10 w-full max-w-lg bg-[#0D1120] border border-white/10 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-lg font-bold">Edit profile</p>
              <button
                onClick={() => setEditing(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5"
                title="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">First name</label>
                <input
                  value={draftFirst}
                  onChange={(e) => setDraftFirst(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-100 focus:outline-none focus:border-purple-500/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Last name</label>
                <input
                  value={draftLast}
                  onChange={(e) => setDraftLast(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-100 focus:outline-none focus:border-purple-500/50 transition-all"
                />
              </div>
            </div>

            <div className="mt-3">
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Headline</label>
              <input
                value={draftHeadline}
                onChange={(e) => setDraftHeadline(e.target.value)}
                placeholder="e.g. Frontend Engineer • React • TypeScript"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-purple-500/50 transition-all"
              />
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={() => setEditing(false)}
                className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-300 hover:bg-white/8 hover:border-white/15 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={saveLocal}
                className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-sm font-semibold hover:opacity-95 transition-all inline-flex items-center justify-center gap-2"
              >
                <Save size={16} /> Save
              </button>
            </div>
            <p className="mt-3 text-xs text-slate-500">
              Changes are saved locally for now (no profile API yet).
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
