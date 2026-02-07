'use client'

import { useState, useEffect, useMemo } from 'react'
import { JobCard, JobCardSkeletonGrid, RecommendationsProgress } from '@/components/jobs'
import type { JobListing } from '@/lib/types/job'
import { useSubscription } from '@/lib/hooks/use-subscription'
import useCVStore from '@/lib/stores/cv-store'
import useJobStore from '@/lib/stores/job-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Combobox, ComboboxInput, ComboboxContent, ComboboxList, ComboboxItem, ComboboxEmpty } from '@/components/ui/combobox'
import { Sparkles, Search, Loader2, AlertCircle, Crown, SlidersHorizontal, DollarSign, X, Bookmark, Home, Briefcase, ArrowUpDown, FileWarning, MapPin } from 'lucide-react'
import Link from 'next/link'

// Check if CV has minimum required data for generating recommendations
function isCVComplete(cvData: any): boolean {
  if (!cvData) return false

  const hasName = Boolean(cvData.personalInfo?.fullName?.trim())
  const hasSkills = cvData.skills?.some((s: any) => s.name?.trim())
  const hasExperience = cvData.workExperience?.some((w: any) => w.company?.trim() || w.position?.trim())
  const hasEducation = cvData.education?.some((e: any) => e.institution?.trim() || e.degree?.trim())

  // Require name + skills + (experience OR education)
  return hasName && hasSkills && (hasExperience || hasEducation)
}

// Extended type for scored recommendations
interface ScoredJob extends JobListing {
  compatibilityScore?: number
}

type SortOption = 'score' | 'date' | 'salary'
type ViewMode = 'recommendations' | 'saved'

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'score', label: 'Match score' },
  { value: 'date', label: 'Date posted' },
  { value: 'salary', label: 'Salary' },
]

const savedSortOptions: { value: SortOption; label: string }[] = [
  { value: 'date', label: 'Date posted' },
  { value: 'salary', label: 'Salary' },
]

const JOBS_PER_PAGE_OPTIONS = [12, 24, 36, 48]

const employmentTypeOptions: { value: string; label: string }[] = [
  { value: 'any', label: 'All' },
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'contractor', label: 'Contractor' },
  { value: 'temporary', label: 'Temporary' },
]

export default function JobsPage() {
  const { isPro, isLoading: isSubscriptionLoading } = useSubscription()
  const { cvData, isInitialized, getOrCreateCV } = useCVStore()
  const {
    loadSavedJobs,
    savedJobs,
    isSavedJobsLoading,
    recommendations,
    isRecommendationsLoading,
    recommendationsError,
    recommendationsFetchedAt,
    recommendationsProgress,
    loadRecommendations,
  } = useJobStore()

  const [searchTerm, setSearchTerm] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [minScore, setMinScore] = useState(0)
  const [hasSalary, setHasSalary] = useState(false)
  const [remoteOnly, setRemoteOnly] = useState(false)
  const [employmentType, setEmploymentType] = useState<string>('any')
  const [sortBy, setSortBy] = useState<SortOption>('score')
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<ViewMode>('recommendations')
  const [jobsPerPage, setJobsPerPage] = useState(12)

  // Derived state
  const isLoading = isRecommendationsLoading
  const error = recommendationsError
  const hasFetched = recommendationsFetchedAt !== null

  const fetchRecommendations = async (force = false) => {
    await loadRecommendations(cvData, force)
  }

  // Load CV from DB if not initialized + load saved jobs immediately (parallel)
  useEffect(() => {
    // Always load saved jobs immediately - no dependency on subscription
    loadSavedJobs()

    if (!isInitialized) {
      getOrCreateCV()
    }
  }, [isInitialized, getOrCreateCV, loadSavedJobs])

  // Auto-fetch recommendations on page load (will use cache if available)
  // IMPORTANT: Wait for CV to be initialized (loaded from DB) before fetching
  // Also check that CV has required data for generating recommendations
  useEffect(() => {
    if (isPro && !isSubscriptionLoading && isInitialized && cvData && isCVComplete(cvData)) {
      loadRecommendations(cvData)
    }
  }, [isPro, isSubscriptionLoading, isInitialized, cvData, loadRecommendations])

  // Handle view mode toggle
  const handleToggleView = () => {
    const newMode = viewMode === 'recommendations' ? 'saved' : 'recommendations'
    setViewMode(newMode)
    setSearchTerm('')
    setCurrentPage(1)
    // Reset sort to appropriate default
    setSortBy(newMode === 'saved' ? 'date' : 'score')
    // Reset minScore when switching to saved view
    if (newMode === 'saved') {
      setMinScore(0)
    }
  }

  // Count active filters (minScore only applies in recommendations view)
  const activeFilterCount = [
    viewMode === 'recommendations' && minScore > 0,
    hasSalary,
    remoteOnly,
    employmentType !== 'any',
    locationFilter.length > 0,
  ].filter(Boolean).length

  // Get current sort options based on view mode
  const currentSortOptions = viewMode === 'recommendations' ? sortOptions : savedSortOptions

  // Unique locations from current job list for combobox
  const uniqueLocations = useMemo(() => {
    const baseJobs = viewMode === 'recommendations'
      ? recommendations
      : savedJobs.filter(s => s.jobListing).map(s => s.jobListing!)
    const locations = new Set<string>()
    for (const job of baseJobs) {
      if (job.location) locations.add(job.location)
    }
    return Array.from(locations).sort((a, b) => a.localeCompare(b))
  }, [recommendations, savedJobs, viewMode])

  // Filter and sort jobs based on view mode
  const filteredJobs = useMemo(() => {
    // Get base list based on view mode
    const baseJobs: ScoredJob[] = viewMode === 'recommendations'
      ? recommendations
      : savedJobs
          .filter(saved => saved.jobListing)
          .map(saved => saved.jobListing as ScoredJob)

    let result = baseJobs.filter((job) => {
      // Filter by location
      if (locationFilter && !job.location?.toLowerCase().includes(locationFilter.toLowerCase())) {
        return false
      }
      // Filter by minimum score (only for recommendations)
      if (viewMode === 'recommendations' && minScore > 0 && (job.compatibilityScore ?? 0) < minScore) {
        return false
      }
      // Filter by has salary
      if (hasSalary && !job.salary?.min && !job.salary?.max) {
        return false
      }
      // Filter by remote only
      if (remoteOnly && job.remoteType !== 'remote') {
        return false
      }
      // Filter by employment type (case-insensitive, includes combined types)
      if (employmentType !== 'any') {
        const jobType = job.employmentType?.toLowerCase() || ''
        if (!jobType.includes(employmentType)) {
          return false
        }
      }
      // Filter by search term
      const searchLower = searchTerm.toLowerCase()
      return (
        job.title.toLowerCase().includes(searchLower) ||
        job.company.toLowerCase().includes(searchLower) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchLower))
      )
    })

    // Sort results
    result.sort((a, b) => {
      if (sortBy === 'score' && viewMode === 'recommendations') {
        return (b.compatibilityScore ?? 0) - (a.compatibilityScore ?? 0)
      } else if (sortBy === 'date') {
        const dateA = a.postedAt ? new Date(a.postedAt).getTime() : 0
        const dateB = b.postedAt ? new Date(b.postedAt).getTime() : 0
        return dateB - dateA
      } else if (sortBy === 'salary') {
        const salaryA = a.salary?.max ?? a.salary?.min ?? 0
        const salaryB = b.salary?.max ?? b.salary?.min ?? 0
        return salaryB - salaryA
      }
      return 0
    })

    return result
  }, [recommendations, savedJobs, viewMode, minScore, hasSalary, remoteOnly, employmentType, locationFilter, searchTerm, sortBy])

  // Paginate filtered results
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage)
  const startIndex = (currentPage - 1) * jobsPerPage
  const paginatedJobs = filteredJobs.slice(startIndex, startIndex + jobsPerPage)

  // Determine what to show in the content area
  const showUpgradePrompt = !isSubscriptionLoading && !isPro && viewMode === 'recommendations'
  const cvComplete = isCVComplete(cvData)
  const showIncompleteCVPrompt = !isSubscriptionLoading && isPro && viewMode === 'recommendations' && isInitialized && !cvComplete
  // Show loading during: actual fetch, subscription check, or CV initialization (before fetch can start)
  const isWaitingToLoad = isSubscriptionLoading || !isInitialized
  const showRecommendationsLoading = viewMode === 'recommendations' && (isLoading || isWaitingToLoad) && recommendations.length === 0 && !showUpgradePrompt && !showIncompleteCVPrompt
  const showSavedJobsLoading = viewMode === 'saved' && isSavedJobsLoading
  const showEmptyRecommendations = viewMode === 'recommendations' && !isLoading && !isWaitingToLoad && recommendations.length === 0 && hasFetched && !showUpgradePrompt && !showIncompleteCVPrompt
  const showEmptySavedJobs = viewMode === 'saved' && !isSavedJobsLoading && savedJobs.length === 0

  // Render job content based on current state
  const renderJobContent = () => {
    // Upgrade prompt for non-Pro users
    if (showUpgradePrompt) {
      return (
        <Card className="border-[#1a4a4a]/20">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#1a4a4a]/10">
              <Crown className="h-6 w-6 text-[#1a4a4a]" />
            </div>
            <CardTitle className="text-2xl">AI Job Recommendations</CardTitle>
            <CardDescription className="text-base mt-2">
              Upgrade to Pro to unlock AI-powered job recommendations tailored to your CV
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-[#5a6a6a] mb-6">
              Get personalized job matches based on your skills, experience, and career goals
            </p>
            <Link href="/settings/billing">
              <Button size="lg">
                <Crown className="mr-2 h-4 w-4" />
                Upgrade to Pro
              </Button>
            </Link>
          </CardContent>
        </Card>
      )
    }

    // Incomplete CV prompt - need more data to generate recommendations
    if (showIncompleteCVPrompt) {
      const missingItems: string[] = []
      if (!cvData?.personalInfo?.fullName?.trim()) missingItems.push('Full name')
      if (!cvData?.skills?.some((s: any) => s.name?.trim())) missingItems.push('Skills')
      const hasExp = cvData?.workExperience?.some((w: any) => w.company?.trim() || w.position?.trim())
      const hasEdu = cvData?.education?.some((e: any) => e.institution?.trim() || e.degree?.trim())
      if (!hasExp && !hasEdu) missingItems.push('Work experience or Education')

      return (
        <Card className="border-[#1a4a4a]/20">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#1a4a4a]/10">
              <FileWarning className="h-6 w-6 text-[#1a4a4a]" />
            </div>
            <CardTitle className="text-2xl">Complete Your CV First</CardTitle>
            <CardDescription className="text-base mt-2">
              We need more information from your CV to generate personalized job recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="text-sm text-[#5a6a6a]">
              <p className="font-medium mb-2">Missing required information:</p>
              <ul className="space-y-1">
                {missingItems.map((item) => (
                  <li key={item} className="flex items-center justify-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1a4a4a]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-sm text-[#5a6a6a]">
              Add these details to your CV and we&apos;ll find the best job matches for you
            </p>
          </CardContent>
        </Card>
      )
    }

    // Recommendations loading with progress + skeletons
    if (showRecommendationsLoading) {
      return (
        <div className="space-y-6">
          <RecommendationsProgress progress={recommendationsProgress} />
          <JobCardSkeletonGrid count={6} />
        </div>
      )
    }

    // Saved jobs loading with skeletons
    if (showSavedJobsLoading) {
      return <JobCardSkeletonGrid count={4} />
    }

    // Empty recommendations state
    if (showEmptyRecommendations) {
      return (
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#1a4a4a]/10">
              <Search className="h-6 w-6 text-[#1a4a4a]" />
            </div>
            <CardTitle className="text-2xl">No Matching Jobs Found</CardTitle>
            <CardDescription className="text-base mt-2">
              We couldn&apos;t find any jobs matching your CV and preferences right now
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            {error && (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}
            <p className="text-sm text-[#5a6a6a]">
              Try updating your job preferences or check back later for new listings
            </p>
            <Button
              onClick={() => fetchRecommendations(true)}
              disabled={isLoading}
              variant="outline"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      )
    }

    // Empty saved jobs state
    if (showEmptySavedJobs) {
      return (
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#1a4a4a]/10">
              <Bookmark className="h-6 w-6 text-[#1a4a4a]" />
            </div>
            <CardTitle className="text-xl">No saved jobs yet</CardTitle>
            <CardDescription className="text-base mt-2">
              Click the bookmark icon on any job to save it for later
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={handleToggleView}>Browse Jobs</Button>
          </CardContent>
        </Card>
      )
    }

    // No results after filtering
    if (paginatedJobs.length === 0) {
      return (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-[#5a6a6a]">No jobs found matching your filters</p>
          </CardContent>
        </Card>
      )
    }

    // Job cards grid
    return (
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        {paginatedJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            compatibilityScore={(job as ScoredJob).compatibilityScore}
            onClick={() => window.open(job.sourceUrl, '_blank')}
          />
        ))}
      </div>
    )
  }

  // Show jobs list with search - always render header/tabs
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1a2a2a]">
            {viewMode === 'recommendations' ? 'AI Job Recommendations' : 'Saved Jobs'}
          </h1>
          <p className="text-[#5a6a6a] mt-1">
            {viewMode === 'recommendations'
              ? (isLoading ? 'Finding matches...' : `${recommendations.length} jobs matched to your profile`)
              : (isSavedJobsLoading ? 'Loading...' : `${savedJobs.length} job${savedJobs.length !== 1 ? 's' : ''} saved`)}
          </p>
        </div>
        <Button
          variant={viewMode === 'saved' ? 'default' : 'outline'}
          className="gap-2"
          onClick={handleToggleView}
        >
          <Bookmark className={`h-4 w-4 ${viewMode === 'saved' ? 'fill-current' : ''}`} />
          {viewMode === 'saved' ? 'Back to Recommendations' : 'Saved'}
          {viewMode === 'recommendations' && savedJobs.length > 0 && (
            <span className="ml-1 text-xs bg-[#1a4a4a] text-white px-1.5 py-0.5 rounded-full">
              {savedJobs.length}
            </span>
          )}
        </Button>
      </div>

      {/* Search and sort row */}
      <div className="flex gap-3">
        <div className="relative flex-1 max-w-[280px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5a6a6a]" />
          <Input
            type="text"
            placeholder="Search by title, company, or skills..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            className="pl-10 bg-card"
          />
        </div>
      </div>

      {/* Main content with sidebar */}
      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className="w-64 shrink-0 hidden md:block">
          <div className="sticky top-4 space-y-4">
            {/* Sort section */}
            <div className="rounded-lg border bg-card p-4 space-y-3">
              <h3 className="font-medium flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4" />
                Sort
              </h3>
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                <SelectTrigger className="w-full bg-card">
                  <SelectValue>
                    {currentSortOptions.find(o => o.value === sortBy)?.label}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {currentSortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Filters section */}
            <div className="rounded-lg border bg-card p-4 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-medium flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </h3>
                {activeFilterCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setMinScore(0)
                      setHasSalary(false)
                      setRemoteOnly(false)
                      setEmploymentType('any')
                      setLocationFilter('')
                      setCurrentPage(1)
                    }}
                    className="h-6 px-2 text-xs"
                  >
                    Clear all
                  </Button>
                )}
              </div>

              {/* Match score - only show for recommendations */}
              {viewMode === 'recommendations' && (
                <div className="space-y-3">
                  <label className="text-sm font-medium">
                    Match score: {minScore > 0 ? `${minScore}%+` : 'Any'}
                  </label>
                  <Slider
                    value={[minScore]}
                    onValueChange={(value) => {
                      const newValue = Array.isArray(value) ? value[0] : value
                      setMinScore(newValue)
                      setCurrentPage(1)
                    }}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <p className="text-xs text-[#5a6a6a]">
                    {minScore}% or higher
                  </p>
                </div>
              )}

              {/* Salary toggle */}
              <div className="space-y-3">
                <label className="text-sm font-medium flex items-center gap-1.5">
                  <DollarSign className="h-3.5 w-3.5" />
                  Salary
                </label>
                <div className="flex items-center gap-3">
                  <Switch
                    id="has-salary-rec"
                    checked={hasSalary}
                    onCheckedChange={(checked) => {
                      setHasSalary(checked)
                      setCurrentPage(1)
                    }}
                  />
                  <label htmlFor="has-salary-rec" className="text-sm cursor-pointer select-none">
                    Show only with salary
                  </label>
                </div>
              </div>

              {/* Remote only */}
              <div className="space-y-3">
                <label className="text-sm font-medium flex items-center gap-1.5">
                  <Home className="h-3.5 w-3.5" />
                  Work type
                </label>
                <div className="flex items-center gap-2">
                  <Switch
                    id="remote-only"
                    checked={remoteOnly}
                    onCheckedChange={(checked) => {
                      setRemoteOnly(checked)
                      setCurrentPage(1)
                    }}
                  />
                  <label htmlFor="remote-only" className="text-sm cursor-pointer select-none">
                    Remote only
                  </label>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-3">
                <label className="text-sm font-medium flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  Location
                </label>
                <Combobox
                  value={locationFilter}
                  onValueChange={(val) => {
                    setLocationFilter(val ?? '')
                    setCurrentPage(1)
                  }}
                >
                  <ComboboxInput placeholder="Filter by location..." showClear className="w-full" />
                  <ComboboxContent>
                    <ComboboxList>
                      {uniqueLocations.map((loc) => (
                        <ComboboxItem key={loc} value={loc}>
                          <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                          {loc}
                        </ComboboxItem>
                      ))}
                    </ComboboxList>
                    <ComboboxEmpty>No locations found</ComboboxEmpty>
                  </ComboboxContent>
                </Combobox>
              </div>

              {/* Employment type */}
              <div className="space-y-3">
                <label className="text-sm font-medium flex items-center gap-1.5">
                  <Briefcase className="h-3.5 w-3.5" />
                  Job type
                </label>
                <Select value={employmentType} onValueChange={(v) => { setEmploymentType(v ?? 'any'); setCurrentPage(1) }}>
                  <SelectTrigger className="w-full bg-card">
                    <SelectValue placeholder="All">
                      {employmentTypeOptions.find(o => o.value === employmentType)?.label}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {employmentTypeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile filters toggle */}
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden fixed bottom-4 right-4 z-10 shadow-lg"
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
          {activeFilterCount > 0 && (
            <span className="ml-1.5 text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </Button>

        {/* Mobile filters drawer */}
        {showFilters && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)} />
            <div className="absolute bottom-0 left-0 right-0 bg-background rounded-t-xl p-4 space-y-6 animate-in slide-in-from-bottom">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Filters</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {viewMode === 'recommendations' && (
                <div className="space-y-3">
                  <label className="text-sm font-medium">
                    Match score: {minScore > 0 ? `${minScore}%+` : 'Any'}
                  </label>
                  <Slider
                    value={[minScore]}
                    onValueChange={(value) => {
                      const newValue = Array.isArray(value) ? value[0] : value
                      setMinScore(newValue)
                      setCurrentPage(1)
                    }}
                    max={100}
                    step={1}
                  />
                </div>
              )}

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Show only with salary</label>
                <Switch
                  checked={hasSalary}
                  onCheckedChange={(checked) => {
                    setHasSalary(checked)
                    setCurrentPage(1)
                  }}
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Remote only</label>
                <Switch
                  checked={remoteOnly}
                  onCheckedChange={(checked) => {
                    setRemoteOnly(checked)
                    setCurrentPage(1)
                  }}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Combobox
                  value={locationFilter}
                  onValueChange={(val) => {
                    setLocationFilter(val ?? '')
                    setCurrentPage(1)
                  }}
                >
                  <ComboboxInput placeholder="Filter by location..." showClear className="w-full" />
                  <ComboboxContent>
                    <ComboboxList>
                      {uniqueLocations.map((loc) => (
                        <ComboboxItem key={loc} value={loc}>
                          <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                          {loc}
                        </ComboboxItem>
                      ))}
                    </ComboboxList>
                    <ComboboxEmpty>No locations found</ComboboxEmpty>
                  </ComboboxContent>
                </Combobox>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Job type</label>
                <Select value={employmentType} onValueChange={(v) => { setEmploymentType(v ?? 'any'); setCurrentPage(1) }}>
                  <SelectTrigger className="w-full bg-card">
                    <SelectValue placeholder="All">
                      {employmentTypeOptions.find(o => o.value === employmentType)?.label}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {employmentTypeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full" onClick={() => setShowFilters(false)}>
                Apply filters
              </Button>
            </div>
          </div>
        )}

        {/* Job results */}
        <div className="flex-1 min-w-0">
          {/* Results count - hide during loading states */}
          {!showRecommendationsLoading && !showSavedJobsLoading && !showUpgradePrompt && (
            <p className="text-sm text-[#5a6a6a] mb-4">
              {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
            </p>
          )}

          {/* Job content */}
          {renderJobContent()}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center mt-6">
              <div className="flex-1" />
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="text-sm text-[#5a6a6a]">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
              <div className="flex-1 flex justify-end">
                <Select value={String(jobsPerPage)} onValueChange={(v) => { setJobsPerPage(Number(v)); setCurrentPage(1) }}>
                  <SelectTrigger className="w-[60px] bg-card">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="w-[80px] min-w-[80px]">
                    {JOBS_PER_PAGE_OPTIONS.map(n => (
                      <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
