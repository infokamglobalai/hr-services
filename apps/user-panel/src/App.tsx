import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { lazy, Suspense } from 'react'
import AuthGuard from '@/components/AuthGuard'
import AppShell from '@/layouts/AppShell'
import PageLoader from '@/components/ui/PageLoader'

const Login        = lazy(() => import('@/pages/auth/Login'))
const Signup       = lazy(() => import('@/pages/auth/Signup'))
const ForgotPassword = lazy(() => import('@/pages/auth/ForgotPassword'))
const Feed         = lazy(() => import('@/pages/Feed'))
const JobBoard     = lazy(() => import('@/pages/JobBoard'))
const JobDetail    = lazy(() => import('@/pages/JobDetail'))
const Profile      = lazy(() => import('@/pages/Profile'))
const Applications = lazy(() => import('@/pages/Applications'))
const Notifications = lazy(() => import('@/pages/Notifications'))
const Chat         = lazy(() => import('@/pages/Chat'))
const AiToolkit    = lazy(() => import('@/pages/AiToolkit'))
const ResumeBuilder = lazy(() => import('@/pages/ResumeBuilder'))
const CareerRoadmap = lazy(() => import('@/pages/CareerRoadmap'))
const MockInterview = lazy(() => import('@/pages/MockInterview'))
const Settings     = lazy(() => import('@/pages/Settings'))
const ComingSoon   = lazy(() => import('@/pages/ComingSoon'))
const NotFound     = lazy(() => import('@/pages/NotFound'))

const router = createBrowserRouter([
  { path: '/login',  element: <Suspense fallback={<PageLoader />}><Login /></Suspense> },
  { path: '/signup', element: <Suspense fallback={<PageLoader />}><Signup /></Suspense> },
  { path: '/forgot-password', element: <Suspense fallback={<PageLoader />}><ForgotPassword /></Suspense> },
  {
    element: (
      <AuthGuard>
        <AppShell />
      </AuthGuard>
    ),
    children: [
      { path: '/',               element: <Suspense fallback={<PageLoader />}><Feed /></Suspense> },
      { path: '/ai-toolkit',     element: <Suspense fallback={<PageLoader />}><AiToolkit /></Suspense> },
      { path: '/resume-builder', element: <Suspense fallback={<PageLoader />}><ResumeBuilder /></Suspense> },
      { path: '/career-roadmap', element: <Suspense fallback={<PageLoader />}><CareerRoadmap /></Suspense> },
      { path: '/mock-interview', element: <Suspense fallback={<PageLoader />}><MockInterview /></Suspense> },
      { path: '/jobs',           element: <Suspense fallback={<PageLoader />}><JobBoard /></Suspense> },
      { path: '/jobs/:id',       element: <Suspense fallback={<PageLoader />}><JobDetail /></Suspense> },
      { path: '/profile/:handle?', element: <Suspense fallback={<PageLoader />}><Profile /></Suspense> },
      { path: '/applications',   element: <Suspense fallback={<PageLoader />}><Applications /></Suspense> },
      { path: '/notifications',  element: <Suspense fallback={<PageLoader />}><Notifications /></Suspense> },
      { path: '/chat',           element: <Suspense fallback={<PageLoader />}><Chat /></Suspense> },
      { path: '/settings',       element: <Suspense fallback={<PageLoader />}><Settings /></Suspense> },

      { path: '/learning', element: <Suspense fallback={<PageLoader />}><ComingSoon title="Learning Hub" subtitle="Curated learning paths and skill tracking are coming soon." /></Suspense> },
      { path: '/competitions', element: <Suspense fallback={<PageLoader />}><ComingSoon title="Competitions" subtitle="Coding contests and leaderboards are coming soon." /></Suspense> },
      { path: '/connections', element: <Suspense fallback={<PageLoader />}><ComingSoon title="Connections" subtitle="Build your network and manage connections here soon." /></Suspense> },
    ],
  },
  { path: '*', element: <Suspense fallback={<PageLoader />}><NotFound /></Suspense> },
])

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 60_000, retry: 1 },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
