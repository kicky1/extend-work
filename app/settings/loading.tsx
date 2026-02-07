export default function Loading() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-4 sm:py-6 animate-pulse">
      <div className="h-8 w-32 bg-muted rounded mb-6" />

      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-card rounded-lg border border-border p-6 space-y-4">
            <div className="h-6 w-40 bg-muted rounded" />
            <div className="space-y-3">
              <div className="h-4 w-full bg-muted rounded" />
              <div className="h-4 w-2/3 bg-muted rounded" />
            </div>
            <div className="h-10 w-28 bg-muted rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}
