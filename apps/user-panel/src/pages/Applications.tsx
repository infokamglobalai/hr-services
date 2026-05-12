import { useQuery } from '@tanstack/react-query'
import { jobsApi } from '@/api/client'
import { Link } from 'react-router-dom'
import { FileText, ArrowUpRight, Clock, CheckCircle2, AlertTriangle } from 'lucide-react'

function formatDate(value: unknown) {
  const d = new Date(value as any)
  return Number.isNaN(d.getTime()) ? '—' : d.toLocaleDateString()
}

function statusPill(status: string) {
  const s = (status || '').toLowerCase()
  if (s.includes('review')) return 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20'
  if (s.includes('pending')) return 'bg-amber-500/10 text-amber-300 border-amber-500/20'
  if (s.includes('reject')) return 'bg-red-500/10 text-red-300 border-red-500/20'
  if (s.includes('accept')) return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
  return 'bg-white/5 text-slate-300 border-white/10'
}

export default function Applications() {
  const { data, isLoading, isError, refetch, error } = useQuery({
    queryKey: ['applications'],
    queryFn: async () => {
      const res = await jobsApi.getApplications()
      return res.data as any[]
    },
  })

  const apps = Array.isArray(data) ? data : []

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold font-['Space_Grotesk'] mb-1">Applications</h1>
          <p className="text-slate-400 text-sm">Track where you’ve applied and what’s next.</p>
        </div>

        <button
          onClick={() => refetch()}
          className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-300 hover:bg-white/8 hover:border-white/15 transition-all"
        >
          Refresh
        </button>
      </div>

      {isError && (
        <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-300 flex items-start gap-3">
          <AlertTriangle size={18} className="mt-0.5 text-red-400" />
          <div>
            <p className="font-semibold">Couldn’t load applications</p>
            <p className="text-sm text-red-300/80 mt-1">
              {(error as any)?.response?.data?.message || (error as any)?.message || 'Unknown error'}
            </p>
          </div>
        </div>
      )}

      <div className="bg-[#0D1120] border border-white/8 rounded-3xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5 flex items-center gap-2">
          <FileText size={16} className="text-purple-400" />
          <p className="text-sm font-semibold text-slate-200">Your applications</p>
          <span className="ml-auto text-xs text-slate-500">{apps.length} total</span>
        </div>

        {isLoading ? (
          <div className="p-6 space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/4 border border-white/6 animate-pulse">
                <div className="h-4 w-64 bg-white/5 rounded mb-2" />
                <div className="h-3 w-48 bg-white/5 rounded" />
              </div>
            ))}
          </div>
        ) : apps.length === 0 ? (
          <div className="p-10 text-center">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 mx-auto flex items-center justify-center mb-4">
              <CheckCircle2 size={22} className="text-purple-300" />
            </div>
            <p className="text-slate-200 font-semibold mb-1">No applications yet</p>
            <p className="text-slate-500 text-sm mb-5">Go to the job board and apply to start tracking.</p>
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-sm font-semibold hover:opacity-95 active:scale-[0.99] transition-all"
            >
              Browse jobs <ArrowUpRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {apps.map((a: any) => {
              const job = a?.job ?? {}
              const status = String(a?.status ?? 'Pending')
              return (
                <div key={a?.id ?? `${job?.id}-${status}`} className="px-6 py-5 hover:bg-white/[0.03] transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-200 font-semibold truncate">{job?.title ?? 'Unknown role'}</p>
                      <p className="text-slate-500 text-sm truncate">{job?.company ?? 'Unknown company'} • {job?.location ?? '—'}</p>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
                        <Clock size={14} className="text-slate-600" />
                        Applied {formatDate(a?.appliedAt)}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${statusPill(status)}`}>
                        {status}
                      </span>
                      {job?.id != null && (
                        <Link
                          to={`/jobs/${job.id}`}
                          className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-300 hover:bg-white/8 hover:border-white/15 transition-all"
                        >
                          View job
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
