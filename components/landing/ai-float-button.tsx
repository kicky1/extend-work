import { Sparkles } from 'lucide-react'

export function AIFloatButton() {
  return (
    <div className="absolute bottom-5 right-5 sm:bottom-2 sm:right-2 w-7 h-7 rounded-full bg-gradient-to-br from-[#1a4a4a] to-[#2a6a6a] shadow-lg flex items-center justify-center">
      <Sparkles className="w-3.5 h-3.5 text-white" />
    </div>
  )
}
