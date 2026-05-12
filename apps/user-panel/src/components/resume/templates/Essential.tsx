import type { TemplateProps } from './types'

export default function EssentialTemplate({ data }: TemplateProps) {
  const { basics, experience, education, skills } = data
  return (
    <div className="bg-white text-slate-900 p-16 h-full font-sans max-w-[800px] mx-auto">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-light tracking-tight text-slate-800 mb-2">{basics.fullName || 'YOUR NAME'}</h1>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500 font-medium">
          <span>{basics.email}</span>
          <span>{basics.phone}</span>
          <span>{basics.location}</span>
        </div>
      </div>

      <div className="space-y-12">
        {/* Experience */}
        <section>
          <h2 className="text-xs font-black text-slate-300 uppercase tracking-[0.4em] mb-6">Experience</h2>
          <div className="space-y-10">
            {experience.map(exp => (
              <div key={exp.id} className="grid grid-cols-4 gap-4">
                <div className="col-span-1 text-sm font-bold text-slate-400">{exp.duration}</div>
                <div className="col-span-3 space-y-2">
                  <h4 className="text-base font-bold text-slate-800">{exp.role}</h4>
                  <p className="text-sm font-bold text-slate-600">{exp.company}</p>
                  <p className="text-sm text-slate-500 leading-relaxed">{exp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-xs font-black text-slate-300 uppercase tracking-[0.4em] mb-6">Skills</h2>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold text-slate-700 pl-[25%]">
            {skills.map(s => <span key={s}>{s}</span>)}
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-xs font-black text-slate-300 uppercase tracking-[0.4em] mb-6">Education</h2>
          <div className="space-y-6">
            {education.map(edu => (
              <div key={edu.id} className="grid grid-cols-4 gap-4">
                <div className="col-span-1 text-sm font-bold text-slate-400">{edu.year}</div>
                <div className="col-span-3">
                  <h4 className="text-sm font-bold text-slate-800">{edu.degree}</h4>
                  <p className="text-sm text-slate-500">{edu.school}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
