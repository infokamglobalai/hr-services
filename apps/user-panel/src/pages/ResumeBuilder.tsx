import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Layout, Save, Download, Sparkles, ChevronRight, ChevronLeft, Trash2, Plus } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { aiApi } from '@/api/client'

import ClassicTemplate from '@/components/resume/templates/Classic'
import EssentialTemplate from '@/components/resume/templates/Essential'
import ModernTemplate from '@/components/resume/templates/Modern'
import ExecutiveTemplate from '@/components/resume/templates/Executive'
import TechTemplate from '@/components/resume/templates/Tech'

const printStyles = `
  @media print {
    body * { visibility: hidden; background: white !important; }
    #resume-preview, #resume-preview * { visibility: visible; }
    #resume-preview { 
      position: absolute; 
      left: 0; 
      top: 0; 
      width: 100%; 
      margin: 0; 
      padding: 0; 
      box-shadow: none !important;
    }
    .no-print { display: none !important; }
  }
`

// Templates
const TEMPLATES = [
  { id: 'classic', name: 'Classic', tier: 'free', color: 'bg-slate-700', component: ClassicTemplate },
  { id: 'essential', name: 'Essential', tier: 'free', color: 'bg-blue-700', component: EssentialTemplate },
  { id: 'modern', name: 'Modern', tier: 'premium', color: 'bg-purple-700', component: ModernTemplate },
  { id: 'executive', name: 'Executive', tier: 'premium', color: 'bg-emerald-700', component: ExecutiveTemplate },
  { id: 'tech', name: 'Tech', tier: 'premium', color: 'bg-cyan-700', component: TechTemplate },
]

export default function ResumeBuilder() {
  const [selectedTemplate, setSelectedTemplate] = useState('classic')
  const [activeTab, setActiveTab] = useState('basics')
  const [isParsing, setIsParsing] = useState(false)
  
  const [basics, setBasics] = useState({ fullName: '', email: '', phone: '', location: '', summary: '' })
  const [experience, setExperience] = useState([{ id: 1, role: 'Software Engineer', company: 'Futurestick Inc.', duration: 'Jan 2022 - Present', desc: 'Developed responsive UI components using React and Tailwind. Implemented state management using Zustand for high performance.' }])
  const [education, setEducation] = useState([{ id: 1, school: 'University of Technology', degree: 'B.S. Computer Science', year: '2020' }])
  const [skills, setSkills] = useState(['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'])

  const SelectedTemplateComponent = TEMPLATES.find(t => t.id === selectedTemplate)?.component || ClassicTemplate

  const resumeData = { basics, experience, education, skills }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsParsing(true)
    const formData = new FormData()
    formData.append('resume', file)

    try {
      const res = await aiApi.parseResume(formData)
      const data = res.data
      setBasics({
        fullName: data.fullName || '',
        email: data.email || '',
        phone: data.phone || '',
        location: data.location || '',
        summary: data.summary || ''
      })
      if (data.experience) setExperience(data.experience.map((ex: any, i: number) => ({ ...ex, id: i + 1 })))
      if (data.education) setEducation(data.education.map((ed: any, i: number) => ({ ...ed, id: i + 1 })))
      if (data.skills) setSkills(data.skills)
    } catch (err) {
      console.error('Parsing failed', err)
    } finally {
      setIsParsing(false)
    }
  }

  const handleDownload = () => {
    window.print()
  }

  const addExp = () => setExperience([...experience, { id: Date.now(), role: '', company: '', duration: '', desc: '' }])
  const addEdu = () => setEducation([...education, { id: Date.now(), school: '', degree: '', year: '' }])

  const updateExp = (id: number, field: string, value: string) => {
    setExperience(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item))
  }

  const updateEdu = (id: number, field: string, value: string) => {
    setEducation(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item))
  }

  return (
    <div className="h-screen bg-[#080B14] flex flex-col overflow-hidden">
      <style>{printStyles}</style>
      {/* Header */}
      <header className="h-16 border-b border-white/5 bg-[#0D1120] px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link to="/ai-toolkit" className="p-2 hover:bg-white/5 rounded-lg text-slate-400">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-lg font-bold font-['Space_Grotesk']">AI Resume Builder</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-purple-600/10 text-purple-400 border border-purple-500/20 rounded-lg text-sm font-medium hover:bg-purple-600/20 transition-all">
            <Sparkles size={16} /> AI Improve
          </button>
          <div className="h-6 w-px bg-white/5 mx-1" />
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white/5 text-slate-300 rounded-lg text-sm font-medium hover:bg-white/10 transition-all">
            <Save size={16} /> Save
          </button>
          <button 
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-1.5 bg-white text-black rounded-lg text-sm font-bold hover:bg-slate-200 transition-all shadow-lg"
          >
            <Download size={16} /> Download
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <main className="flex-1 flex overflow-hidden">
        {/* Sidebar Tabs */}
        <aside className="w-16 border-r border-white/5 bg-[#0D1120] flex flex-col items-center py-6 gap-6 shrink-0">
          {[
            { id: 'basics', icon: '👤', label: 'Basics' },
            { id: 'exp', icon: '💼', label: 'Experience' },
            { id: 'edu', icon: '🎓', label: 'Education' },
            { id: 'skills', icon: '🛠️', label: 'Skills' },
            { id: 'templates', icon: '🎨', label: 'Design' },
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`group relative p-3 rounded-xl transition-all ${activeTab === tab.id ? 'bg-purple-600 text-white' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'}`}
            >
              <span className="text-xl">{tab.icon}</span>
              <span className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                {tab.label}
              </span>
            </button>
          ))}
        </aside>

        {/* Editor Pane */}
        <section className="w-[400px] border-r border-white/5 bg-[#080B14] overflow-y-auto p-6 shrink-0">
          <div className="space-y-6">
            {activeTab === 'basics' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Personal Details</h2>
                  <div className="relative">
                    <input 
                      type="file" 
                      accept=".pdf" 
                      onChange={handleFileUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <button className="px-3 py-1 bg-purple-600/10 text-purple-400 border border-purple-500/20 rounded-lg text-xs font-bold flex items-center gap-2">
                      {isParsing ? 'Parsing...' : <><Plus size={14} /> Upload PDF</>}
                    </button>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-slate-500 font-medium block mb-1.5">Full Name</label>
                    <input value={basics.fullName} onChange={e => setBasics({...basics, fullName: e.target.value})} className="w-full bg-[#0D1120] border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:border-purple-500/50 outline-none" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 font-medium block mb-1.5">Email</label>
                    <input value={basics.email} onChange={e => setBasics({...basics, email: e.target.value})} className="w-full bg-[#0D1120] border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:border-purple-500/50 outline-none" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 font-medium block mb-1.5">Phone</label>
                    <input value={basics.phone} onChange={e => setBasics({...basics, phone: e.target.value})} className="w-full bg-[#0D1120] border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:border-purple-500/50 outline-none" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 font-medium block mb-1.5">Summary</label>
                    <textarea rows={4} value={basics.summary} onChange={e => setBasics({...basics, summary: e.target.value})} className="w-full bg-[#0D1120] border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:border-purple-500/50 outline-none resize-none" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'exp' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold flex items-center justify-between">
                  Experience
                  <button onClick={addExp} className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-slate-400">
                    <Plus size={18} />
                  </button>
                </h2>
                {experience.map((item) => (
                  <div key={item.id} className="p-4 bg-[#0D1120] border border-white/5 rounded-xl space-y-3 relative group">
                    <button onClick={() => setExperience(prev => prev.filter(e => e.id !== item.id))} className="absolute top-2 right-2 p-1 text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 size={14} />
                    </button>
                    <input 
                      placeholder="Job Title" 
                      value={item.role} 
                      onChange={e => updateExp(item.id, 'role', e.target.value)}
                      className="w-full bg-transparent border-b border-white/10 pb-1 text-sm outline-none focus:border-purple-500" 
                    />
                    <input 
                      placeholder="Company" 
                      value={item.company}
                      onChange={e => updateExp(item.id, 'company', e.target.value)}
                      className="w-full bg-transparent border-b border-white/10 pb-1 text-sm outline-none focus:border-purple-500" 
                    />
                    <textarea 
                      placeholder="Key achievements..." 
                      rows={3} 
                      value={item.desc}
                      onChange={e => updateExp(item.id, 'desc', e.target.value)}
                      className="w-full bg-transparent border-b border-white/10 pb-1 text-sm outline-none focus:border-purple-500 resize-none" 
                    />
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'templates' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold mb-4">Choose Template</h2>
                <div className="grid grid-cols-2 gap-3">
                  {TEMPLATES.map(t => (
                    <button 
                      key={t.id}
                      onClick={() => setSelectedTemplate(t.id)}
                      className={`relative p-3 rounded-xl border-2 transition-all text-left ${selectedTemplate === t.id ? 'border-purple-500 bg-purple-500/5' : 'border-white/5 bg-[#0D1120] hover:border-white/10'}`}
                    >
                      <div className={`w-full aspect-[3/4] rounded-md mb-2 ${t.color} opacity-50`} />
                      <p className="text-xs font-bold">{t.name}</p>
                      {t.tier === 'premium' && (
                        <span className="absolute top-2 right-2 text-[8px] bg-amber-500/20 text-amber-500 px-1.5 py-0.5 rounded-full font-bold uppercase">Pro</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Preview Pane */}
        <section className="flex-1 bg-slate-900 overflow-y-auto p-12 flex justify-center no-print">
          {/* Paper Placeholder */}
          <div id="resume-preview" className="w-[595px] min-h-[842px] bg-white shadow-2xl shadow-black/50 overflow-hidden text-slate-900 origin-top scale-100">
             <SelectedTemplateComponent data={resumeData} />
          </div>
        </section>
      </main>
    </div>
  )
}
