import { useMemo, useState } from 'react'
import { Bell, CheckCircle2, Trash2, Sparkles } from 'lucide-react'

type NotificationItem = {
  id: string
  title: string
  body: string
  time: string
  read: boolean
  kind?: 'ai' | 'job' | 'social' | 'system'
}

const seed: NotificationItem[] = [
  {
    id: 'n1',
    title: 'Welcome to Futurestick',
    body: 'Try the AI Toolkit to generate a roadmap, then explore matched jobs on the board.',
    time: 'Just now',
    read: false,
    kind: 'system',
  },
  {
    id: 'n2',
    title: 'AI roadmap ready (demo)',
    body: 'Generate a roadmap for your target role to unlock personalized matches.',
    time: '2h ago',
    read: true,
    kind: 'ai',
  },
]

function badge(kind?: NotificationItem['kind']) {
  switch (kind) {
    case 'ai': return 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20'
    case 'job': return 'bg-purple-500/10 text-purple-300 border-purple-500/20'
    case 'social': return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
    default: return 'bg-white/5 text-slate-300 border-white/10'
  }
}

export default function Notifications() {
  const [items, setItems] = useState<NotificationItem[]>(seed)

  const unread = useMemo(() => items.filter(i => !i.read).length, [items])

  const markAllRead = () => setItems(prev => prev.map(i => ({ ...i, read: true })))
  const clearAll = () => setItems([])

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold font-['Space_Grotesk'] mb-1">Notifications</h1>
          <p className="text-slate-400 text-sm">
            {unread > 0 ? `${unread} unread` : 'You’re all caught up.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={markAllRead}
            disabled={items.length === 0 || unread === 0}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-300 hover:bg-white/8 hover:border-white/15 transition-all disabled:opacity-50"
          >
            Mark all read
          </button>
          <button
            onClick={clearAll}
            disabled={items.length === 0}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-300 hover:bg-white/8 hover:border-white/15 transition-all disabled:opacity-50 inline-flex items-center gap-2"
          >
            <Trash2 size={16} /> Clear
          </button>
        </div>
      </div>

      <div className="bg-[#0D1120] border border-white/8 rounded-3xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5 flex items-center gap-2">
          <Bell size={16} className="text-purple-400" />
          <p className="text-sm font-semibold text-slate-200">Inbox</p>
          <span className="ml-auto text-xs text-slate-500">{items.length} total</span>
        </div>

        {items.length === 0 ? (
          <div className="p-10 text-center">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 mx-auto flex items-center justify-center mb-4">
              <CheckCircle2 size={22} className="text-cyan-300" />
            </div>
            <p className="text-slate-200 font-semibold mb-1">No notifications</p>
            <p className="text-slate-500 text-sm">When something needs your attention, it’ll show up here.</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {items.map((n) => (
              <div key={n.id} className={`px-6 py-5 ${n.read ? 'opacity-80' : ''}`}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-white/4 border border-white/6 flex items-center justify-center shrink-0">
                    <Sparkles size={18} className={n.kind === 'ai' ? 'text-cyan-300' : 'text-slate-300'} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-slate-200 truncate">{n.title}</p>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${badge(n.kind)}`}>
                        {n.kind || 'update'}
                      </span>
                      {!n.read && <span className="ml-auto w-2 h-2 rounded-full bg-purple-500" />}
                    </div>
                    <p className="text-sm text-slate-400">{n.body}</p>
                    <p className="text-xs text-slate-600 mt-2">{n.time}</p>
                  </div>
                  <button
                    onClick={() => setItems(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x))}
                    className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 hover:bg-white/8 hover:border-white/15 transition-all"
                  >
                    Mark read
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="mt-4 text-xs text-slate-600">
        Notifications API isn’t implemented server-side yet, so this page uses demo items.
      </p>
    </div>
  )
}
