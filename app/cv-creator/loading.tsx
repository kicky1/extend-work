export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar skeleton */}
      <div className="h-16 border-b border-border bg-card" />

      <main className="max-w-screen-2xl mx-auto h-[calc(100vh-64px)]">
        <div className="hidden lg:flex h-full">
          {/* Editor skeleton */}
          <div className="w-1/2 border-r border-border p-6 space-y-4 animate-pulse">
            <div className="h-8 w-48 bg-muted rounded" />
            <div className="space-y-3">
              <div className="h-4 w-full bg-muted rounded" />
              <div className="h-4 w-3/4 bg-muted rounded" />
              <div className="h-4 w-5/6 bg-muted rounded" />
            </div>
            <div className="h-8 w-48 bg-muted rounded mt-8" />
            <div className="space-y-3">
              <div className="h-4 w-full bg-muted rounded" />
              <div className="h-4 w-2/3 bg-muted rounded" />
            </div>
          </div>
          {/* Preview skeleton */}
          <div className="w-1/2 bg-muted/50 p-8 animate-pulse">
            <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
              <div className="text-center space-y-3 pb-4">
                <div className="h-8 w-48 bg-gray-100 rounded mx-auto" />
                <div className="h-4 w-64 bg-gray-100 rounded mx-auto" />
              </div>
              <div className="space-y-2">
                <div className="h-5 w-24 bg-gray-100 rounded" />
                <div className="h-3 w-full bg-gray-100 rounded" />
                <div className="h-3 w-3/4 bg-gray-100 rounded" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
