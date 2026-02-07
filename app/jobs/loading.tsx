export default function Loading() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-4 sm:py-6 animate-pulse">
      {/* Search bar skeleton */}
      <div className="flex gap-3 mb-6">
        <div className="h-10 flex-1 bg-muted rounded" />
        <div className="h-10 w-32 bg-muted rounded" />
      </div>

      {/* Job cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-card rounded-lg border border-border p-4 space-y-3">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-lg bg-muted" />
              <div className="flex-1 space-y-2">
                <div className="h-5 w-3/4 bg-muted rounded" />
                <div className="h-4 w-1/2 bg-muted rounded" />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="h-5 w-20 bg-muted rounded" />
              <div className="h-5 w-16 bg-muted rounded" />
            </div>
            <div className="h-5 w-32 bg-muted rounded" />
            <div className="flex gap-1.5">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="h-6 w-14 bg-muted rounded-full" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
