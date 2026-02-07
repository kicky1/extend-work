export default function Loading() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-4 sm:py-6 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center justify-between mb-6">
        <div className="h-8 w-32 bg-muted rounded" />
        <div className="h-9 w-28 bg-muted rounded" />
      </div>

      {/* Email list skeleton */}
      <div className="bg-card rounded-lg border border-border divide-y divide-border">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="p-4 flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-muted shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <div className="h-4 w-40 bg-muted rounded" />
                <div className="h-3 w-16 bg-muted rounded" />
              </div>
              <div className="h-4 w-3/4 bg-muted rounded" />
              <div className="h-3 w-full bg-muted rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
