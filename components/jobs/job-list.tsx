'use client'

import { useEffect } from 'react'
import { Loader2, SearchX, LayoutGrid, List } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { JobCard } from './job-card'
import useJobStore from '@/lib/stores/job-store'
import type { JobListing } from '@/lib/types/job'
import { cn } from '@/lib/utils'

interface JobListProps {
  onJobClick?: (job: JobListing) => void
}

export function JobList({ onJobClick }: JobListProps) {
  const {
    searchResults,
    isSearching,
    searchError,
    viewMode,
    setViewMode,
    search,
  } = useJobStore()

  const handleLoadMore = () => {
    if (searchResults?.hasMore) {
      search(searchResults.page + 1)
    }
  }

  // Empty state
  if (!isSearching && !searchResults && !searchError) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <SearchX className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">Start your job search</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Enter keywords and location to find matching jobs
        </p>
      </div>
    )
  }

  // Error state
  if (searchError) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="rounded-full bg-destructive/10 p-3 mb-4">
          <SearchX className="h-6 w-6 text-destructive" />
        </div>
        <h3 className="text-lg font-medium">Search failed</h3>
        <p className="text-sm text-muted-foreground mt-1">{searchError}</p>
        <Button variant="outline" className="mt-4" onClick={() => search(1)}>
          Try again
        </Button>
      </div>
    )
  }

  // Loading state
  if (isSearching && !searchResults) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground mt-4">Searching across job boards...</p>
      </div>
    )
  }

  // No results
  if (searchResults && searchResults.jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <SearchX className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No jobs found</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Try adjusting your search filters or keywords
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header with count and view toggle */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {searchResults?.cached && (
            <span className="mr-2 text-xs bg-muted px-2 py-0.5 rounded">Cached</span>
          )}
          Found <span className="font-medium text-foreground">{searchResults?.totalCount}</span> jobs
        </div>

        <div className="flex items-center gap-1 border rounded-lg p-0.5">
          <Button
            variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
            size="sm"
            className="h-7 px-2"
            onClick={() => setViewMode('grid')}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'secondary' : 'ghost'}
            size="sm"
            className="h-7 px-2"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Job grid/list */}
      <div
        className={cn(
          'gap-4',
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            : 'flex flex-col'
        )}
      >
        {searchResults?.jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onClick={() => onJobClick?.(job)}
            compact={viewMode === 'list'}
          />
        ))}
      </div>

      {/* Load more */}
      {searchResults?.hasMore && (
        <div className="flex justify-center pt-4">
          <Button
            variant="outline"
            onClick={handleLoadMore}
            disabled={isSearching}
          >
            {isSearching ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              'Load more jobs'
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
