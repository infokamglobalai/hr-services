import { useParams, Link, useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query'
import { jobsApi } from '@/api/client'
import { ArrowLeft, MapPin, DollarSign, Clock, Briefcase, CheckCircle2, ShieldCheck, Sparkles, Send } from 'lucide-react'
import { useState } from 'react'

export default function JobDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isApplied, setIsApplied] = useState(false)

  const { data: job, isLoading } = useQuery({
    queryKey: ['job', id],
    queryFn: async () => {
      const res = await jobsApi.getJob(id!)
      return res.data
    },
    enabled: !!id
  })

  const applyMutation = useMutation({
    mutationFn: () => jobsApi.applyToJob(id!),
    onSuccess: () => {
      setIsApplied(true)
    }
  })

  if (isLoading) return (
    <div className="p-12 flex justify-center">
      <div className="w-8 h-8 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
    </div>
  )

  if (!job) return <div className="p-12 text-center text-slate-500">Job not found</div>

  return (
    <div className="max-w-5xl mx-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Link to="/jobs" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group">
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Job Board
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Main Info */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-[#0D1120] border border-white/5 rounded-3xl p-8 relative overflow-hidden">
             {/* Header */}
             <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8 relative z-10">
                <div className="flex gap-6 items-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center border border-white/5 shadow-xl">
                    <Briefcase size={40} className="text-purple-400" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold mb-1 leading-tight">{job.title}</h1>
                    <p className="text-lg text-slate-400 font-medium">{job.company}</p>
                  </div>
                </div>
             </div>

             <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-white/5">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Location</p>
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-300">
                    <MapPin size={16} className="text-slate-600" /> {job.location}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Salary</p>
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-300">
                    <DollarSign size={16} className="text-slate-600" /> {job.salary}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Type</p>
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-300">
                    <Clock size={16} className="text-slate-600" /> {job.type}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Posted</p>
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-300">
                    <CheckCircle2 size={16} className="text-emerald-500" /> 2d ago
                  </div>
                </div>
             </div>

             <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Job Description</h3>
                <p className="text-slate-400 leading-relaxed whitespace-pre-wrap mb-8">
                  {job.description}
                </p>

                <h3 className="text-xl font-bold mb-4">Requirements</h3>
                <ul className="space-y-3">
                  {job.requirements.map((req: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-400 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
             </div>

             {/* Background Glow */}
             <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/5 blur-[100px] rounded-full pointer-events-none" />
          </div>
        </div>

        {/* Right: Actions & AI Analysis */}
        <div className="space-y-6">
          {/* AI Matcher Card */}
          <div className="bg-gradient-to-br from-purple-600/10 to-cyan-600/10 border border-purple-500/20 rounded-3xl p-6 shadow-xl relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                  <Sparkles size={20} />
                </div>
                <h3 className="font-bold">AI Match Analysis</h3>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-3xl font-black font-['Space_Grotesk'] text-white">98%</span>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">Excellent Match</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 w-[98%]" />
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <ShieldCheck size={14} className="text-emerald-500" /> Skills highly relevant
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <ShieldCheck size={14} className="text-emerald-500" /> Career path alignment
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <ShieldCheck size={14} className="text-emerald-500" /> Experience matches level
                </div>
              </div>

              <button 
                onClick={() => applyMutation.mutate()}
                disabled={isApplied || applyMutation.isPending}
                className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl active:scale-95 ${
                  isApplied 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 cursor-default'
                  : 'bg-white text-black hover:bg-slate-200 shadow-purple-500/10'
                }`}
              >
                {applyMutation.isPending ? 'Sending...' : isApplied ? <><CheckCircle2 size={18} /> Applied</> : <><Send size={18} /> Apply Now</>}
              </button>
            </div>
            
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </div>

          <div className="bg-[#0D1120] border border-white/5 rounded-3xl p-6">
            <h4 className="text-sm font-bold mb-4 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
              Similar Opportunities
            </h4>
            <div className="space-y-4">
              {[1, 2].map(i => (
                <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors cursor-pointer">
                  <p className="text-xs font-bold text-slate-300 mb-1">Lead Backend Engineer</p>
                  <p className="text-[10px] text-slate-500">ScaleUp • Remote</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
