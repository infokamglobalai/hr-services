import type { TemplateProps } from './types'

export default function ModernTemplate({ data }: TemplateProps) {
  const { basics, experience, education, skills } = data
  return (
    <div className="bg-white text-slate-800 h-full flex font-sans">
      {/* Sidebar */}
      <div className="w-1/3 bg-slate-50 p-8 border-r border-slate-100 flex flex-col">
        <div className="mb-10">
          <div className="w-20 h-20 bg-purple-600 rounded-2xl mb-4 flex items-center justify-center text-white text-3xl font-bold">
            {basics.fullName?.[0] || 'U'}
          </div>
          <h1 className="text-xl font-bold text-slate-900 leading-tight mb-1">{basics.fullName || 'YOUR NAME'}</h1>
          <p className="text-sm text-purple-600 font-semibold uppercase tracking-wider">{experience[0]?.role || 'Professional'}</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Contact</h3>
            <p className="text-xs break-all">{basics.email}</p>
            <p className="text-xs">{basics.phone}</p>
            <p className="text-xs">{basics.location}</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Skills</h3>
            <div className="flex flex-wrap gap-1.5">
              {skills.map(s => (
                <span key={s} className="px-2 py-1 bg-purple-100 text-purple-700 text-[10px] font-bold rounded">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Education</h3>
            {education.map(edu => (
              <div key={edu.id} className="space-y-0.5">
                <p className="text-xs font-bold text-slate-900">{edu.degree}</p>
                <p className="text-[10px] text-slate-500">{edu.school}</p>
                <p className="text-[10px] font-bold text-purple-600">{edu.year}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 overflow-y-auto">
        <div className="mb-10">
          <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-3">About Me</h2>
          <p className="text-sm text-slate-600 leading-relaxed italic">
            "{basics.summary || 'A brief professional summary...'}"
          </p>
        </div>

        <div>
          <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Work Experience</h2>
          <div className="space-y-8 relative before:absolute before:left-0 before:top-2 before:bottom-2 before:w-px before:bg-slate-100">
            {experience.map(exp => (
              <div key={exp.id} className="relative pl-6">
                <div className="absolute left-[-4.5px] top-1.5 w-2 h-2 rounded-full bg-purple-600 shadow-[0_0_0_4px_rgba(147,51,234,0.1)]" />
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-sm font-bold text-slate-900">{exp.role}</h4>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{exp.duration}</span>
                </div>
                <p className="text-xs font-bold text-purple-600 mb-2">{exp.company}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{exp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
