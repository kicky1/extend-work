export default function Loading() {
  return (
    <>
      {/* Header skeleton */}
      <div className="bg-white border-b border-[#e8e4df]">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between animate-pulse">
            <div className="flex items-center gap-3">
              <div className="h-6 w-24 bg-muted rounded" />
              <div className="h-6 w-32 bg-muted rounded" />
            </div>
            <div className="h-9 w-44 bg-muted rounded" />
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex flex-col lg:grid lg:grid-cols-[280px_1fr] gap-4 lg:gap-6 animate-pulse">
          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-[#e8e4df] p-4 space-y-3">
              <div className="h-5 w-36 bg-muted rounded" />
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-16 bg-muted rounded" />
              ))}
            </div>
          </div>
          {/* Calendar grid */}
          <div className="bg-white rounded-lg border border-[#e8e4df] p-4">
            <div className="h-8 w-40 bg-muted rounded mx-auto mb-4" />
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 35 }).map((_, i) => (
                <div key={i} className="h-20 bg-muted/50 rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
