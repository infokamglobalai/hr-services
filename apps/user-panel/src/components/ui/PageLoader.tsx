export default function PageLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#080B14] z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-2 border-purple-500/20 border-t-purple-500 animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg">⚡</span>
          </div>
        </div>
        <p className="text-sm text-slate-500 font-medium tracking-wide">Loading...</p>
      </div>
    </div>
  )
}
