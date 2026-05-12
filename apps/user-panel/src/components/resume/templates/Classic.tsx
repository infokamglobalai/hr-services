import type { TemplateProps } from './types'

export default function ClassicTemplate({ data }: TemplateProps) {
  const { basics, experience, education, skills } = data
  return (
    <div className="bg-white text-[#1a1a1a] p-12 h-full font-serif leading-relaxed">
      {/* Header */}
      <div className="border-b-2 border-black pb-4 mb-6 text-center">
        <h1 className="text-3xl font-bold uppercase tracking-tight mb-1">{basics.fullName || 'YOUR NAME'}</h1>
        <div className="text-xs space-x-2">
          <span>{basics.email}</span>
          <span>|</span>
          <span>{basics.phone}</span>
          <span>|</span>
          <span>{basics.location}</span>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-6">
        <h2 className="text-sm font-bold uppercase border-b border-black mb-2">Professional Summary</h2>
        <p className="text-sm">{basics.summary || 'Summary goes here...'}</p>
      </div>

      {/* Experience */}
      <div className="mb-6">
        <h2 className="text-sm font-bold uppercase border-b border-black mb-3">Experience</h2>
        <div className="space-y-4">
          {experience.map(exp => (
            <div key={exp.id}>
              <div className="flex justify-between font-bold text-sm">
                <span>{exp.role || 'Job Role'}</span>
                <span>{exp.duration || '2022 - Present'}</span>
              </div>
              <div className="italic text-sm mb-1">{exp.company || 'Company Name'}</div>
              <p className="text-xs">{exp.desc || 'Responsibilities and achievements...'}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="mb-6">
        <h2 className="text-sm font-bold uppercase border-b border-black mb-2">Education</h2>
        <div className="space-y-2">
          {education.map(edu => (
            <div key={edu.id} className="flex justify-between text-sm">
              <div>
                <span className="font-bold">{edu.school || 'University'}</span>, {edu.degree || 'Degree'}
              </div>
              <span className="font-bold">{edu.year || '2020'}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-sm font-bold uppercase border-b border-black mb-2">Technical Skills</h2>
        <p className="text-sm">{skills.join(', ') || 'Skills list...'}</p>
      </div>
    </div>
  )
}
