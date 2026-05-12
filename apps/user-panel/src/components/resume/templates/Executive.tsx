import type { TemplateProps } from './types'

export default function ExecutiveTemplate({ data }: TemplateProps) {
  const { basics, experience, education, skills } = data
  return (
    <div className="bg-white text-slate-800 h-full font-serif flex flex-col">
      {/* Header */}
      <div className="bg-[#0f172a] text-white p-12 shrink-0">
        <h1 className="text-4xl font-black tracking-tight mb-2 uppercase">{basics.fullName || 'YOUR NAME'}</h1>
        <p className="text-slate-400 font-bold tracking-widest uppercase text-xs mb-6">{experience[0]?.role || 'Executive Leadership'}</p>
        
        <div className="flex gap-6 text-[10px] font-bold text-slate-400 tracking-wider">
           <span className="flex items-center gap-2">{basics.email}</span>
           <span className="flex items-center gap-2">{basics.phone}</span>
           <span className="flex items-center gap-2">{basics.location}</span>
        </div>
      </div>

      <div className="flex-1 p-12 overflow-y-auto bg-white">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-8 space-y-10">
            {/* Experience */}
            <section>
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest border-b-2 border-slate-900 pb-2 mb-6">Professional Experience</h2>
              <div className="space-y-8">
                {experience.map(exp => (
                  <div key={exp.id} className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <h4 className="text-lg font-bold text-slate-900">{exp.role}</h4>
                      <span className="text-xs font-bold text-slate-500 italic">{exp.duration}</span>
                    </div>
                    <p className="text-sm font-bold text-blue-900 uppercase tracking-wide">{exp.company}</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{exp.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section>
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest border-b-2 border-slate-900 pb-2 mb-6">Education</h2>
              <div className="space-y-4">
                {education.map(edu => (
                  <div key={edu.id} className="flex justify-between items-baseline">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{edu.degree}</h4>
                      <p className="text-sm text-slate-600">{edu.school}</p>
                    </div>
                    <span className="text-xs font-bold italic">{edu.year}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="col-span-4 space-y-10">
            {/* Summary */}
            <section>
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest border-b-2 border-slate-900 pb-2 mb-4">Core Value</h2>
              <p className="text-sm text-slate-600 leading-relaxed italic">
                {basics.summary || 'Strategic leader with a focus on growth and innovation...'}
              </p>
            </section>

            {/* Skills */}
            <section>
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest border-b-2 border-slate-900 pb-2 mb-4">Expertise</h2>
              <div className="flex flex-col gap-2">
                {skills.map(s => (
                  <div key={s} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-900 rounded-full" />
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">{s}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
