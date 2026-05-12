import { Link } from 'react-router-dom'
import { FileText, Map, Zap, Cpu, ArrowRight, ShieldCheck } from 'lucide-react'

const AI_TOOLS = [
  {
    id: 'resume',
    title: 'AI Resume Builder',
    description: 'Create an ATS-friendly, professional resume with AI-powered suggestions and premium templates.',
    icon: FileText,
    color: 'bg-purple-500/10 text-purple-400',
    link: '/resume-builder',
    tag: 'Popular'
  },
  {
    id: 'roadmap',
    title: 'Career Roadmap',
    description: 'Generate a personalized step-by-step plan to reach your target role based on your current skills.',
    icon: Map,
    color: 'bg-cyan-500/10 text-cyan-400',
    link: '/career-roadmap',
    tag: 'AI Core'
  },
  {
    id: 'interview',
    title: 'Mock Interviewer',
    description: 'Practice with our AI interviewer to get real-time feedback on your answers and body language.',
    icon: Zap,
    color: 'bg-amber-500/10 text-amber-400',
    link: '/mock-interview',
    tag: 'Ready'
  },
  {
    id: 'skills',
    title: 'Skill Assessment',
    description: 'Test your knowledge and get a verified badge for your profile to stand out to recruiters.',
    icon: ShieldCheck,
    color: 'bg-emerald-500/10 text-emerald-400',
    link: '#',
    tag: 'Beta'
  }
]

export default function AiToolkit() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-['Space_Grotesk'] mb-2 flex items-center gap-3">
          <Cpu className="text-purple-500" />
          AI Toolkit
        </h1>
        <p className="text-slate-400 max-w-2xl">
          Supercharge your career journey with our suite of AI-powered tools. 
          From building resumes to preparing for your next big interview.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {AI_TOOLS.map((tool) => (
          <Link 
            key={tool.id} 
            to={tool.link}
            className="group bg-[#0D1120] border border-white/5 rounded-2xl p-6 hover:border-purple-500/30 transition-all relative overflow-hidden"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${tool.color}`}>
                <tool.icon size={24} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-white/5 rounded-md text-slate-500 group-hover:text-purple-400 transition-colors">
                {tool.tag}
              </span>
            </div>
            
            <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">{tool.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              {tool.description}
            </p>
            
            <div className="flex items-center gap-2 text-sm font-semibold text-purple-400 group-hover:translate-x-1 transition-transform">
              Get Started <ArrowRight size={16} />
            </div>

            {/* Subtle background glow */}
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-purple-500/5 blur-[40px] rounded-full group-hover:bg-purple-500/10 transition-colors" />
          </Link>
        ))}
      </div>

      {/* Stats/Promo section */}
      <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-purple-600/10 to-cyan-600/10 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <h4 className="text-lg font-bold">Want even better AI suggestions?</h4>
          <p className="text-sm text-slate-400">Complete your profile to give the AI more context about your background.</p>
        </div>
        <button className="px-6 py-2.5 bg-white text-black text-sm font-bold rounded-xl hover:bg-slate-200 transition-colors whitespace-nowrap">
          Complete Profile
        </button>
      </div>
    </div>
  )
}
