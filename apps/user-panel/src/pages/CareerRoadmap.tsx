import { useState } from 'react'
import { Map, Target, ChevronRight, CheckCircle2, Circle, Clock, Sparkles } from 'lucide-react'
import { aiApi } from '@/api/client'

const MOCK_ROADMAP = {
  role: 'Senior Fullstack Engineer',
  milestones: [
    {
      id: 1,
      title: 'Master Frontend Architecture',
      description: 'Deep dive into Design Systems, Micro-frontends, and performance optimization in React.',
      status: 'completed',
      duration: '4 weeks',
      skills: ['Module Federation', 'Performance Audit', 'Advanced Patterns']
    },
    {
      id: 2,
      title: 'Scalable Backend Systems',
      description: 'Mastering distributed systems, Caching strategies with Redis, and Kafka for event-driven architecture.',
      status: 'current',
      duration: '6 weeks',
      skills: ['Redis', 'Kafka', 'System Design']
    },
    {
      id: 3,
      title: 'Cloud Native & DevOps',
      description: 'Container orchestration with Kubernetes and CI/CD pipeline automation.',
      status: 'pending',
      duration: '8 weeks',
      skills: ['Kubernetes', 'Docker', 'GitHub Actions']
    },
    {
      id: 4,
      title: 'Leadership & Soft Skills',
      description: 'Managing teams, agile methodologies, and effective communication for senior roles.',
      status: 'pending',
      duration: '4 weeks',
      skills: ['Agile', 'Mentorship', 'Technical Writing']
    }
  ]
}

export default function CareerRoadmap() {
  const [targetRole, setTargetRole] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [roadmap, setRoadmap] = useState<any>(null)

  const handleGenerate = async () => {
    if (!targetRole) return
    setIsGenerating(true)
    try {
      const res = await aiApi.generateRoadmap(targetRole)
      setRoadmap(res.data)
    } catch (err) {
      console.error('Failed to generate roadmap', err)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-10 text-center">
        <div className="inline-flex p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 mb-4 shadow-lg shadow-cyan-500/10">
          <Map size={32} />
        </div>
        <h1 className="text-3xl font-bold font-['Space_Grotesk'] mb-2">AI Career Roadmap</h1>
        <p className="text-slate-400">Where do you want to be in 2 years? We'll map out exactly how to get there.</p>
      </div>

      {!roadmap ? (
        <div className="bg-[#0D1120] border border-white/5 rounded-3xl p-10 text-center max-w-xl mx-auto shadow-2xl">
          <div className="mb-8">
            <label className="text-sm font-medium text-slate-400 block mb-3">Your Target Dream Role</label>
            <div className="relative">
              <Target className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={20} />
              <input 
                type="text"
                placeholder="e.g. Senior DevOps Engineer @ Google"
                value={targetRole}
                onChange={e => setTargetRole(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-lg focus:border-cyan-500/50 outline-none transition-all placeholder:text-slate-600"
              />
            </div>
          </div>
          <button 
            onClick={handleGenerate}
            disabled={!targetRole || isGenerating}
            className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all shadow-xl shadow-cyan-600/20"
          >
            {isGenerating ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                Analyzing Skill Gaps...
              </div>
            ) : (
              <>Generate Roadmap <Sparkles size={20} /></>
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-center justify-between p-6 bg-cyan-500/5 border border-cyan-500/20 rounded-2xl">
            <div>
              <p className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1">Target Role</p>
              <h2 className="text-2xl font-bold">{roadmap.role}</h2>
            </div>
            <button onClick={() => setRoadmap(null)} className="text-xs text-slate-500 hover:text-slate-300 font-medium">Reset</button>
          </div>

          <div className="relative space-y-12">
            {/* Timeline Line */}
            <div className="absolute left-6 top-4 bottom-4 w-px bg-slate-800" />

            {roadmap.milestones.map((m: any, idx: number) => (
              <div key={m.id} className="relative pl-16 group">
                {/* Status Icon */}
                <div className={`absolute left-0 top-0 w-12 h-12 rounded-full border-4 border-[#080B14] flex items-center justify-center z-10 transition-all ${
                  m.status === 'completed' ? 'bg-emerald-500 text-[#080B14]' : 
                  m.status === 'current' ? 'bg-cyan-500 text-[#080B14] shadow-lg shadow-cyan-500/40 animate-pulse' :
                  'bg-slate-800 text-slate-500'
                }`}>
                  {m.status === 'completed' ? <CheckCircle2 size={24} /> : m.status === 'current' ? <Clock size={24} /> : <Circle size={24} />}
                </div>

                <div className={`p-6 rounded-3xl border transition-all ${
                  m.status === 'current' ? 'bg-[#0D1120] border-cyan-500/30' : 'bg-[#0D1120]/50 border-white/5 group-hover:border-white/10'
                }`}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1 block">Milestone {idx + 1}</span>
                      <h3 className="text-xl font-bold">{m.title}</h3>
                    </div>
                    <span className="px-3 py-1 bg-white/5 rounded-full text-xs font-medium text-slate-400 whitespace-nowrap">{m.duration}</span>
                  </div>
                  
                  <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                    {m.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {m.skills.map((s: string) => (
                      <span key={s} className="px-2 py-1 bg-white/5 rounded text-[10px] font-bold text-slate-300 uppercase tracking-wider group-hover:text-cyan-400 transition-colors">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
