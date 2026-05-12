import { useState, useEffect, useRef } from 'react'
import { Send, User, Search, MoreVertical, Phone, Video, Zap, Hash, Globe, Shield } from 'lucide-react'
import { io, Socket } from 'socket.io-client'
import { useAuthStore } from '@/stores/auth.store'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: number
  senderId: number
  content: string
  createdAt: string | Date
}

interface Conversation {
  id: number
  lastMessage: string
  user: {
    id: number
    firstName: string
    lastName: string
    avatar: string | null
  }
}

export default function Chat() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [socket, setSocket] = useState<Socket | null>(null)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const { user, accessToken } = useAuthStore()

  useEffect(() => {
    // Fetch conversations
    const fetchConvs = async () => {
      try {
        const res = await fetch('http://localhost:3005/api/v1/chat/conversations', {
          headers: { Authorization: `Bearer ${accessToken}` }
        })
        const data = await res.json()
        setConversations(data)
        if (data.length > 0 && !selectedConv) setSelectedConv(data[0])
      } catch (err) { console.error(err) }
    }
    fetchConvs()

    const newSocket = io('http://localhost:3005', {
      auth: { token: accessToken }
    })
    setSocket(newSocket)

    newSocket.on('new_message', (msg: Message) => {
      // Only add to messages if it's for the selected conversation
      setMessages(prev => {
        // Find if message already exists (to avoid double adds on sender side)
        if (prev.find(m => m.id === msg.id)) return prev
        return [...prev, msg]
      })
    })

    newSocket.on('sidebar_update', (update: { conversationId: number; lastMessage: string }) => {
      setConversations(prev => prev.map(c => 
        c.id === update.conversationId ? { ...c, lastMessage: update.lastMessage } : c
      ))
    })

    return () => { newSocket.close() }
  }, [accessToken])

  useEffect(() => {
    if (!selectedConv) return
    const fetchMessages = async () => {
      try {
        const res = await fetch(`http://localhost:3005/api/v1/chat/conversations/${selectedConv.id}/messages`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        })
        const data = await res.json()
        setMessages(data)
      } catch (err) { console.error(err) }
    }
    fetchMessages()
  }, [selectedConv, accessToken])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !socket || !selectedConv) return

    socket.emit('send_message', {
      conversationId: selectedConv.id,
      content: newMessage,
      receiverId: selectedConv.user.id
    })
    setNewMessage('')
  }

  return (
    <div className="h-full flex overflow-hidden bg-[#080B14]">
      {/* Sidebar: Conversations */}
      <aside className="w-80 border-r border-white/5 bg-[#0D1120]/50 flex flex-col shrink-0">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold font-['Space_Grotesk']">Messages</h1>
            <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg">
              <Zap size={16} />
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text" 
              placeholder="Search contacts..." 
              className="w-full bg-white/5 border border-white/5 rounded-xl pl-10 pr-4 py-2 text-sm focus:border-purple-500/30 outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {conversations.map(conv => (
            <motion.button
              key={conv.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setSelectedConv(conv)}
              className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all ${
                selectedConv?.id === conv.id ? 'bg-purple-600/10 border border-purple-500/20' : 'hover:bg-white/5 border border-transparent'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center font-bold text-white shadow-lg shrink-0">
                {conv.user.firstName[0]}{conv.user.lastName[0]}
              </div>
              <div className="flex-1 text-left">
                <div className="flex justify-between items-center mb-0.5">
                  <h3 className="font-bold text-sm text-slate-200">{conv.user.firstName} {conv.user.lastName}</h3>
                  <span className="text-[10px] text-slate-500">12:45 PM</span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-1">{conv.lastMessage}</p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Online Status */}
        <div className="p-6 border-t border-white/5">
          <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             <div>
               <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Recruiters Online</p>
               <p className="text-xs text-slate-400">14 agents ready to chat</p>
             </div>
          </div>
        </div>
      </aside>

      {/* Main: Chat Area */}
      {selectedConv ? (
        <main className="flex-1 flex flex-col relative overflow-hidden">
          {/* Background Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/5 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/5 blur-[120px] pointer-events-none" />

          {/* Chat Header */}
          <header className="h-20 border-b border-white/5 bg-[#0D1120]/30 backdrop-blur-xl px-8 flex items-center justify-between shrink-0 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
                <User size={20} className="text-slate-400" />
              </div>
              <div>
                <h2 className="font-bold text-lg leading-tight">{selectedConv.user.firstName} {selectedConv.user.lastName}</h2>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Active Now</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-slate-400 transition-colors"><Phone size={18} /></button>
              <button className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-slate-400 transition-colors"><Video size={18} /></button>
              <div className="w-px h-6 bg-white/10 mx-1" />
              <button className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-slate-400 transition-colors"><MoreVertical size={18} /></button>
            </div>
          </header>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6 relative z-10 no-scrollbar">
            <AnimatePresence initial={false}>
              {messages.map((msg, idx) => {
                const isMe = msg.senderId === user?.id || msg.senderId === 1
                return (
                  <motion.div 
                    key={msg.id}
                    initial={{ opacity: 0, scale: 0.9, y: 10, x: isMe ? 20 : -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] group`}>
                      <div className={`p-4 rounded-3xl ${
                        isMe 
                        ? 'bg-gradient-to-br from-purple-600 to-purple-800 text-white rounded-tr-none shadow-xl shadow-purple-600/10' 
                        : 'bg-white/5 border border-white/10 text-slate-200 rounded-tl-none backdrop-blur-md'
                      }`}>
                        <p className="text-sm leading-relaxed">{msg.content}</p>
                      </div>
                      <p className={`text-[10px] mt-1.5 font-medium text-slate-600 ${isMe ? 'text-right' : 'text-left'}`}>
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-8 bg-gradient-to-t from-[#080B14] to-transparent relative z-10">
            <form 
              onSubmit={handleSendMessage}
              className="bg-[#0D1120] border border-white/10 rounded-3xl p-2 flex items-center gap-2 shadow-2xl focus-within:border-purple-500/50 transition-all"
            >
              <button type="button" className="p-3 text-slate-500 hover:text-slate-300 transition-colors"><Zap size={20} /></button>
              <input 
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                placeholder="Type your message..." 
                className="flex-1 bg-transparent border-none outline-none text-sm px-2 text-slate-200 placeholder:text-slate-600"
              />
              <button 
                type="submit"
                className="p-3 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl transition-all shadow-lg active:scale-95"
              >
                <Send size={20} />
              </button>
            </form>
            <div className="flex items-center justify-center gap-6 mt-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">
              <span className="flex items-center gap-1"><Hash size={10} /> Encryption Active</span>
              <span className="flex items-center gap-1"><Globe size={10} /> Edge Delivery</span>
              <span className="flex items-center gap-1"><Shield size={10} /> Secure Node</span>
            </div>
          </div>
        </main>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center opacity-50 grayscale">
           <div className="w-24 h-24 rounded-full bg-slate-800 flex items-center justify-center mb-6">
              <Zap size={48} className="text-slate-600" />
           </div>
           <h2 className="text-2xl font-bold mb-2">Select a conversation</h2>
           <p className="max-w-xs text-sm">Pick a contact from the sidebar to start a secure real-time session.</p>
        </div>
      )}
    </div>
  )
}
