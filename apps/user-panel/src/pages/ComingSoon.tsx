import { Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export default function ComingSoon({
  title,
  subtitle,
  icon: Icon = Sparkles,
}: {
  title: string
  subtitle?: string
  icon?: LucideIcon
}) {
  return (
    <div className="p-10 max-w-3xl mx-auto">
      <div className="bg-[#0D1120] border border-white/8 rounded-3xl p-10 text-center relative overflow-hidden">
        <div className="absolute -top-28 -right-28 w-72 h-72 bg-purple-500/10 blur-[110px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-28 -left-28 w-72 h-72 bg-cyan-500/10 blur-[110px] rounded-full pointer-events-none" />

        <div className="relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-white/4 border border-white/6 mx-auto flex items-center justify-center mb-4">
            <Icon size={24} className="text-purple-300" />
          </div>
          <h1 className="text-3xl font-bold font-['Space_Grotesk'] mb-2">{title}</h1>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            {subtitle || 'This section is under construction. Check back soon.'}
          </p>
        </div>
      </div>
    </div>
  )
}

