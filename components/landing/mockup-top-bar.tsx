import type { ReactNode } from 'react'

export function MockupTopBar({
  leftContent,
  rightContent,
}: {
  leftContent?: ReactNode
  rightContent?: ReactNode
}) {
  return (
    <div className="flex items-center border-b border-[#e8e4df] bg-[#faf9f7]">
      <div className="flex gap-0.5 px-2 py-1.5 flex-1 overflow-hidden">
        {leftContent}
      </div>
      <div className="flex items-center gap-1.5 px-2 py-1.5 h-8">
        {rightContent}
      </div>
    </div>
  )
}
