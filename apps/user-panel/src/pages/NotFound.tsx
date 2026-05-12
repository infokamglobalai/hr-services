import { Link } from 'react-router-dom'
import { AlertCircle, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
        <AlertCircle size={32} className="text-red-400" />
      </div>
      <h1 className="text-4xl font-bold font-['Space_Grotesk'] mb-2">404</h1>
      <p className="text-xl text-slate-300 mb-6">Page not found</p>
      <p className="text-slate-500 max-w-md mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
      >
        <ArrowLeft size={18} />
        Back to Home
      </Link>
    </div>
  )
}
