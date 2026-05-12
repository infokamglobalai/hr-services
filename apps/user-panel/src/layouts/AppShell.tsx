import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuthStore } from '@/stores/auth.store'
import { authApi } from '@/api/client'
import {
  Home, Briefcase, User, MessageSquare, Bell,
  FileText, Settings, LogOut, ChevronRight, Zap,
  BookOpen, Users, Trophy, Search, Menu, X, LayoutGrid, Cpu
} from 'lucide-react'

const NAV = [
  { to: '/',              icon: LayoutGrid,    label: 'Feed' },
  { to: '/ai-toolkit',    icon: Cpu,           label: 'AI Toolkit' },
  { to: '/jobs',          icon: Briefcase,     label: 'Jobs' },
  { to: '/applications',  icon: FileText,      label: 'Applications' },
  { to: '/chat',          icon: MessageSquare, label: 'Messages' },
  { to: '/notifications', icon: Bell,          label: 'Notifications' },
]

const BOTTOM_NAV = [
  { to: '/profile',  icon: User,     label: 'Profile' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export default function AppShell() {
  const { user, clearAuth } = useAuthStore()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await authApi.logout()
    } catch {
      // ignore network errors; still clear local session
    } finally {
      clearAuth()
      navigate('/login')
    }
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-white/5">
        <NavLink to="/" className="flex items-center gap-2">
          <span className="text-xl drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]">⚡</span>
          <span className="font-['Space_Grotesk'] font-bold text-lg bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Futurestick
          </span>
        </NavLink>
      </div>

      {/* Search */}
      <div className="px-3 py-3 border-b border-white/5">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/8 group hover:border-white/15 transition-colors cursor-pointer">
          <Search size={14} className="text-slate-500" />
          <span className="text-sm text-slate-500">Search...</span>
          <span className="ml-auto text-[10px] text-slate-600 border border-white/10 rounded px-1">⌘K</span>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
        {NAV.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-purple-500/15 text-purple-300 border border-purple-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={18} className={isActive ? 'text-purple-400' : 'group-hover:text-slate-300'} />
                <span>{label}</span>
                {isActive && <ChevronRight size={14} className="ml-auto text-purple-400/60" />}
              </>
            )}
          </NavLink>
        ))}

        {/* Divider */}
        <div className="my-3 border-t border-white/5" />
        <p className="px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-slate-600">Discover</p>

        {[
          { to: '/learning',     icon: BookOpen, label: 'Learning Hub' },
          { to: '/competitions', icon: Trophy,   label: 'Competitions' },
          { to: '/connections',  icon: Users,    label: 'Connections' },
        ].map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-purple-500/15 text-purple-300 border border-purple-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={18} className={isActive ? 'text-purple-400' : 'group-hover:text-slate-300'} />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}

        {/* AI Tools */}
        <div className="my-3 border-t border-white/5" />
        <p className="px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-slate-600">AI Tools</p>
        <div className="px-3 py-2.5 rounded-xl bg-gradient-to-br from-purple-500/10 to-cyan-500/5 border border-purple-500/15 cursor-pointer hover:border-purple-500/30 transition-all">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={14} className="text-purple-400" />
            <span className="text-xs font-semibold text-purple-300">8 AI Tools</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {['Matcher','Counselor','Resume','Auto-Apply'].map(t => (
              <span key={t} className="text-[10px] px-1.5 py-0.5 bg-white/5 rounded text-slate-400">{t}</span>
            ))}
          </div>
        </div>
      </nav>

      {/* Bottom */}
      <div className="px-3 py-3 border-t border-white/5 space-y-0.5">
        {BOTTOM_NAV.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive ? 'bg-purple-500/15 text-purple-300' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={18} className={isActive ? 'text-purple-400' : ''} />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}

        {/* User Card */}
        <div className="mt-2 px-3 py-2.5 rounded-xl bg-white/4 border border-white/6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-xs font-bold flex-shrink-0">
            {user?.firstName?.[0]}{user?.lastName?.[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-200 truncate">{user?.firstName} {user?.lastName}</p>
            <p className="text-xs text-slate-500 truncate">@{user?.handle}</p>
          </div>
          <button
            onClick={handleLogout}
            title="Logout"
            className="p-1.5 rounded-lg hover:bg-red-500/15 text-slate-500 hover:text-red-400 transition-colors"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-[#080B14] overflow-hidden">

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 flex-shrink-0 bg-[#0D1120] border-r border-white/5 h-full">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className="relative z-10 w-72 bg-[#0D1120] border-r border-white/5 h-full flex flex-col">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
            >
              <X size={18} />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Topbar */}
        <header className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-white/5 bg-[#0D1120]">
          <button onClick={() => setSidebarOpen(true)} className="p-1.5 rounded-lg text-slate-400 hover:text-white">
            <Menu size={20} />
          </button>
          <span className="font-['Space_Grotesk'] font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            ⚡ Futurestick
          </span>
          <div className="ml-auto flex items-center gap-2">
            <NavLink to="/notifications" className="p-1.5 rounded-lg text-slate-400 hover:text-white relative">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-purple-500 rounded-full" />
            </NavLink>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
