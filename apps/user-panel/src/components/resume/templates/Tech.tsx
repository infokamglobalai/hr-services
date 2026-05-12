import type { TemplateProps } from './types'

export default function TechTemplate({ data }: TemplateProps) {
  const { basics, experience, education, skills } = data
  return (
    <div className="bg-[#f8fafc] text-slate-900 h-full p-12 font-mono text-[13px] leading-relaxed flex flex-col">
      {/* Code Header */}
      <div className="bg-[#0f172a] text-emerald-400 p-8 rounded-t-2xl border-b-4 border-emerald-500 shadow-2xl shrink-0">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-slate-500 font-bold">const</span> <span className="text-white font-bold">developer</span> = {'{'}
            <div className="pl-6 space-y-1 mt-2">
              <div><span className="text-slate-400">name:</span> <span className="text-emerald-300">"{basics.fullName}"</span>,</div>
              <div><span className="text-slate-400">role:</span> <span className="text-emerald-300">"{experience[0]?.role || 'Engineer'}"</span>,</div>
              <div><span className="text-slate-400">email:</span> <span className="text-emerald-300">"{basics.email}"</span>,</div>
              <div><span className="text-slate-400">location:</span> <span className="text-emerald-300">"{basics.location}"</span></div>
            </div>
            {'}'}
          </div>
          <div className="text-right text-[10px] text-slate-500 uppercase font-black">Build v2.4.0</div>
        </div>
      </div>

      <div className="bg-white border-x border-b border-slate-200 p-10 rounded-b-2xl shadow-sm flex-1 overflow-y-auto">
        <div className="space-y-8">
          {/* Experience */}
          <section>
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-4">
              <span className="text-emerald-500">#</span> Experience
              <div className="h-px bg-slate-100 flex-1" />
            </h2>
            <div className="space-y-8">
              {experience.map(exp => (
                <div key={exp.id} className="group">
                  <div className="flex justify-between items-baseline mb-2">
                    <h4 className="font-black text-slate-900 text-sm group-hover:text-emerald-600 transition-colors">
                      <span className="text-slate-300 mr-2">{'>'}</span> {exp.role}
                    </h4>
                    <span className="text-[11px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">{exp.duration}</span>
                  </div>
                  <div className="text-xs font-bold text-slate-600 mb-2 pl-6">@ {exp.company}</div>
                  <p className="text-slate-500 pl-6 border-l-2 border-slate-50 ml-6">{exp.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Skills Grid */}
          <section>
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-4">
              <span className="text-emerald-500">#</span> Tech_Stack
              <div className="h-px bg-slate-100 flex-1" />
            </h2>
            <div className="grid grid-cols-3 gap-3 pl-6">
              {skills.map(s => (
                <div key={s} className="flex items-center gap-2 group">
                  <span className="text-emerald-500 font-black group-hover:translate-x-1 transition-transform">{'>'}</span>
                  <span className="font-bold text-slate-700">{s}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-4">
              <span className="text-emerald-500">#</span> Education
              <div className="h-px bg-slate-100 flex-1" />
            </h2>
            <div className="space-y-4 pl-6">
              {education.map(edu => (
                <div key={edu.id} className="flex justify-between items-baseline">
                   <div className="font-bold text-slate-800">{edu.degree} <span className="text-slate-400 font-normal">at</span> {edu.school}</div>
                   <div className="text-xs text-slate-400">{edu.year}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
