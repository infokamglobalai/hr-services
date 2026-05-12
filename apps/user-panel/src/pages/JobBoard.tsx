import { useState } from 'react'
import { Briefcase, Search, Filter, MapPin, DollarSign, Clock } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { jobsApi } from '@/api/client'
import { Link } from 'react-router-dom'

export default function JobBoard() {
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState('All')

  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ['jobs', search, selectedType],
    queryFn: async () => {
      const res = await jobsApi.getJobs({ search, type: selectedType })
      return res.data
    }
  })

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-['Space_Grotesk'] mb-1">Job Board</h1>
          <p className="text-slate-400 text-sm">Discover opportunities that match your AI-generated roadmap</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Search jobs, skills, or companies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#0D1120] border border-white/10 rounded-xl text-sm focus:outline-none focus:border-purple-500/50 transition-all"
            />
          </div>
          <select 
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-[#0D1120] border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-purple-500/50 appearance-none cursor-pointer"
          >
            <option>All</option>
            <option>Full-time</option>
            <option>Remote</option>
            <option>Internship</option>
          </select>
        </div>
      </div>

      {/* Stats/Quick Filters */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2 no-scrollbar">
        {['All Jobs', 'Remote Only', 'Highest Paid', 'Most Recent'].map((f) => (
          <button key={f} className="whitespace-nowrap px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-xs font-bold text-slate-400 hover:bg-white/10 hover:text-white transition-all">
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          // Skeleton Loader
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-[#0D1120] border border-white/10 rounded-2xl p-6 h-64 animate-pulse">
              <div className="w-12 h-12 bg-white/5 rounded-xl mb-4" />
              <div className="h-4 bg-white/5 rounded w-3/4 mb-2" />
              <div className="h-3 bg-white/5 rounded w-1/2 mb-6" />
              <div className="flex gap-2">
                <div className="h-6 w-16 bg-white/5 rounded" />
                <div className="h-6 w-16 bg-white/5 rounded" />
              </div>
            </div>
          ))
        ) : (
          jobs.map((job: any) => (
            <div key={job.id} className="group bg-[#0D1120] border border-white/5 rounded-2xl p-6 hover:border-purple-500/30 transition-all hover:shadow-2xl hover:shadow-purple-500/5 relative overflow-hidden">
              {/* Badge */}
              <div className="absolute top-0 right-0 p-4">
                 <span className="px-2 py-1 rounded-md bg-purple-500/10 text-purple-400 text-[10px] font-black uppercase tracking-wider border border-purple-500/20">
                   98% Match
                 </span>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Briefcase size={28} className="text-purple-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg group-hover:text-purple-400 transition-colors leading-tight">{job.title}</h3>
                  <p className="text-sm text-slate-400">{job.company}</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <MapPin size={14} className="text-slate-600" /> {job.location}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <DollarSign size={14} className="text-slate-600" /> {job.salary}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Clock size={14} className="text-slate-600" /> Posted 2 days ago
                </div>
              </div>

              <div className="flex gap-2 flex-wrap mb-6">
                {job.tags.map((tag: string) => (
                  <span key={tag} className="px-2 py-1 rounded-lg bg-white/5 text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>

              <Link 
                to={`/jobs/${job.id}`}
                className="block w-full py-3 bg-white/5 group-hover:bg-purple-600 group-hover:text-white rounded-xl text-sm font-bold text-center transition-all shadow-lg active:scale-95"
              >
                View Job Details
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
