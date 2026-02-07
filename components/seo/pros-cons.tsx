import { ThumbsUp, ThumbsDown } from 'lucide-react'

interface ProsConsProps {
  name: string
  pros: string[]
  cons: string[]
}

export function ProsCons({ name, pros, cons }: ProsConsProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="p-6 rounded-2xl bg-green-50/50 border border-green-200/50">
        <div className="flex items-center gap-2 mb-4">
          <ThumbsUp className="w-5 h-5 text-green-600" />
          <h3 className="font-semibold text-[#1a2a2a]">{name} Pros</h3>
        </div>
        <ul className="space-y-2.5">
          {pros.map((pro, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-[#3a4a4a]">
              <span className="text-green-600 mt-0.5">+</span>
              {pro}
            </li>
          ))}
        </ul>
      </div>
      <div className="p-6 rounded-2xl bg-red-50/50 border border-red-200/50">
        <div className="flex items-center gap-2 mb-4">
          <ThumbsDown className="w-5 h-5 text-red-500" />
          <h3 className="font-semibold text-[#1a2a2a]">{name} Cons</h3>
        </div>
        <ul className="space-y-2.5">
          {cons.map((con, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-[#3a4a4a]">
              <span className="text-red-500 mt-0.5">&minus;</span>
              {con}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
