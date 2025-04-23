import { Loader2 } from "lucide-react"

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900 z-50">
      <div className="w-24 h-24 mb-4 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-16 h-16 text-white animate-spin" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-2xl font-bold">T</span>
        </div>
      </div>
      <h1 className="text-2xl font-bold text-white mb-2">TELENONYM</h1>
      <p className="text-gray-400 text-sm">Secure Telegram Marketplace</p>
      <div className="mt-8 flex items-center space-x-2">
        <div className="h-1 w-16 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-white animate-pulse"></div>
        </div>
        <span className="text-xs text-gray-400">Loading secure environment...</span>
      </div>
    </div>
  )
}
