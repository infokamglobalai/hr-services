import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Video, Mic, MessageSquare, Zap, Play, Square, ChevronRight, User } from 'lucide-react'

const MOCK_QUESTIONS = [
  "Tell me about yourself and your background in software engineering.",
  "What is the most challenging technical project you've worked on recently?",
  "How do you handle conflict in a technical team?",
  "Explain the difference between SQL and NoSQL databases.",
  "Where do you see yourself in 5 years?"
]

export default function MockInterview() {
  const [isStarted, setIsStarted] = useState(false)
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState<string[]>([])
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (isStarted && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          if (videoRef.current) videoRef.current.srcObject = stream
        })
        .catch(err => console.error("Camera error:", err))
    }
  }, [isStarted])

  const startInterview = () => setIsStarted(true)
  
  const nextQuestion = () => {
    if (currentQuestionIdx < MOCK_QUESTIONS.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1)
    } else {
      // End interview
      setIsStarted(false)
      alert("Interview Completed! AI Feedback will be generated shortly.")
    }
  }

  return (
    <div className="h-screen bg-[#080B14] flex flex-col overflow-hidden text-slate-200">
      {/* Header */}
      <header className="h-16 border-b border-white/5 bg-[#0D1120] px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link to="/ai-toolkit" className="p-2 hover:bg-white/5 rounded-lg text-slate-400">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-lg font-bold font-['Space_Grotesk']">AI Mock Interview</h1>
        </div>
        
        {isStarted && (
          <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 text-red-400 rounded-full text-xs font-bold animate-pulse">
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            LIVE INTERVIEW
          </div>
        )}
      </header>

      <main className="flex-1 flex overflow-hidden p-6 gap-6">
        {/* Left: Video Feed */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="relative flex-1 bg-[#0D1120] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
            {!isStarted ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
                <div className="w-20 h-20 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6">
                  <Video size={40} />
                </div>
                <h2 className="text-2xl font-bold mb-4">Ready to practice?</h2>
                <p className="text-slate-400 max-w-sm mb-8">
                  Our AI will ask you technical and behavioral questions. Your responses will be analyzed for content, confidence, and clarity.
                </p>
                <button 
                  onClick={startInterview}
                  className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-purple-600/20 transition-all active:scale-95"
                >
                  Start Practice Session <Play size={18} />
                </button>
              </div>
            ) : (
              <video 
                ref={videoRef} 
                autoPlay 
                muted 
                playsInline
                className="w-full h-full object-cover grayscale-[30%]"
              />
            )}

            {/* AI Avatar Overlay */}
            {isStarted && (
              <div className="absolute top-6 right-6 w-32 h-44 bg-[#0D1120]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden flex flex-col items-center justify-center shadow-2xl">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center mb-2 shadow-lg shadow-purple-500/20">
                  <Zap size={24} className="text-white" />
                </div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">AI Interviewer</p>
              </div>
            )}

            {/* Controls Overlay */}
            {isStarted && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-3 bg-[#0D1120]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
                <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-slate-400 transition-colors">
                  <Mic size={20} />
                </button>
                <button 
                  onClick={() => setIsRecording(!isRecording)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
                    isRecording ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'bg-white text-black'
                  }`}
                >
                  {isRecording ? <><Square size={16} /> Stop</> : <><Mic size={16} /> Record Answer</>}
                </button>
                <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-slate-400 transition-colors">
                  <MessageSquare size={20} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Interview Flow / Chat */}
        <div className="w-[400px] flex flex-col gap-6 shrink-0">
          <div className="flex-1 bg-[#0D1120] border border-white/5 rounded-3xl flex flex-col overflow-hidden shadow-xl">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h3 className="font-bold">Interview Progress</h3>
              <span className="text-xs font-bold text-slate-500">{currentQuestionIdx + 1} / {MOCK_QUESTIONS.length}</span>
            </div>

            <div className="flex-1 p-6 space-y-6 overflow-y-auto">
              {!isStarted ? (
                <div className="space-y-4">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Upcoming Session</p>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-sm font-semibold mb-2">Technical Round: Fullstack Engineer</p>
                    <p className="text-xs text-slate-400">Focus on System Design, React, and Agile workflows.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* AI Question */}
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500 flex-shrink-0 flex items-center justify-center">
                      <Zap size={16} />
                    </div>
                    <div className="p-4 bg-purple-600/10 border border-purple-500/20 rounded-2xl rounded-tl-none">
                      <p className="text-sm font-medium leading-relaxed italic">
                        "{MOCK_QUESTIONS[currentQuestionIdx]}"
                      </p>
                    </div>
                  </div>

                  {/* User Answer (Placeholder) */}
                  <div className="flex gap-3 flex-row-reverse">
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex-shrink-0 flex items-center justify-center">
                      <User size={16} />
                    </div>
                    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl rounded-tr-none">
                      <p className="text-xs text-slate-500 italic">Listening for your answer...</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {isStarted && (
              <div className="p-6 bg-[#080B14]/50 border-t border-white/5">
                <button 
                  onClick={nextQuestion}
                  className="w-full py-4 bg-white text-black rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-all shadow-xl"
                >
                  {currentQuestionIdx === MOCK_QUESTIONS.length - 1 ? 'Finish Interview' : 'Next Question'} <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>

          <div className="p-6 bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-3xl flex items-center gap-4 shadow-lg shadow-amber-500/5">
            <div className="w-12 h-12 bg-amber-500/20 text-amber-500 rounded-2xl flex items-center justify-center">
              <Zap size={24} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-500">Pro Tip</h4>
              <p className="text-xs text-slate-400">Remember to use the STAR method for behavioral questions.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
