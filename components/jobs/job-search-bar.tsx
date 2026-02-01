'use client'

import { useState } from 'react'
import { Search, MapPin, Filter, X, DollarSign, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import useJobStore from '@/lib/stores/job-store'
import type { RemotePreference, ExperienceLevel, EmploymentType, JobSource, JobSearchFilters } from '@/lib/types/job'

const remoteOptions: { value: RemotePreference; label: string }[] = [
  { value: 'any', label: 'Any' },
  { value: 'remote', label: 'Remote' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'onsite', label: 'On-site' },
]

const experienceOptions: { value: ExperienceLevel; label: string }[] = [
  { value: 'any', label: 'Any level' },
  { value: 'junior', label: 'Junior' },
  { value: 'mid', label: 'Mid' },
  { value: 'senior', label: 'Senior' },
]

const datePostedOptions: { value: JobSearchFilters['postedWithin']; label: string }[] = [
  { value: 'any', label: 'Any time' },
  { value: 'day', label: 'Today' },
  { value: 'week', label: 'Past week' },
  { value: '2weeks', label: 'Past 2 weeks' },
]

const employmentOptions: { value: EmploymentType; label: string }[] = [
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'contract', label: 'Contract' },
  { value: 'b2b', label: 'B2B' },
]

const sourceOptions: { value: JobSource; label: string }[] = [
  { value: 'justjoin', label: 'Just Join IT' },
  { value: 'nofluffjobs', label: 'No Fluff Jobs' },
  { value: 'pracuj', label: 'Pracuj.pl' },
  { value: 'praca', label: 'Praca.pl' },
  { value: 'olx', label: 'OLX' },
  { value: 'indeed', label: 'Indeed' },
]

export function JobSearchBar() {
  const [showFilters, setShowFilters] = useState(false)
  const { searchFilters, setSearchFilters, search, isSearching, resetSearchFilters } = useJobStore()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    search(1)
  }

  const activeFilterCount = [
    searchFilters.remoteType && searchFilters.remoteType !== 'any',
    searchFilters.experienceLevel && searchFilters.experienceLevel !== 'any',
    searchFilters.employmentTypes && searchFilters.employmentTypes.length > 0,
    searchFilters.sources && searchFilters.sources.length > 0,
    searchFilters.hasSalary,
    searchFilters.postedWithin && searchFilters.postedWithin !== 'any',
  ].filter(Boolean).length

  return (
    <div className="w-full space-y-4">
      {/* Main search form */}
      <form onSubmit={handleSearch} className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Job title, keywords, or company..."
            value={searchFilters.query || ''}
            onChange={(e) => setSearchFilters({ query: e.target.value })}
            className="pl-10"
          />
        </div>

        <div className="relative flex-1 sm:max-w-[200px]">
          <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Location..."
            value={searchFilters.location || ''}
            onChange={(e) => setSearchFilters({ location: e.target.value })}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="relative"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <Badge variant="default" className="ml-2 h-5 w-5 rounded-full p-0">
                {activeFilterCount}
              </Badge>
            )}
          </Button>

          <Button type="submit" disabled={isSearching}>
            {isSearching ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Searching...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Search
              </>
            )}
          </Button>
        </div>
      </form>

      {/* Filters panel */}
      {showFilters && (
        <div className="rounded-lg border bg-card p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Filters</h3>
            <Button variant="ghost" size="sm" onClick={resetSearchFilters}>
              <X className="mr-1 h-3 w-3" />
              Clear all
            </Button>
          </div>

          {/* Remote type */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">
                Work type: {remoteOptions.find(o => o.value === searchFilters.remoteType)?.label || 'Any'}
              </label>
              {searchFilters.remoteType && searchFilters.remoteType !== 'any' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchFilters({ remoteType: 'any' })}
                  className="h-6 px-2 text-xs"
                >
                  Reset
                </Button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {remoteOptions.map((option) => (
                <Badge
                  key={option.value}
                  variant={searchFilters.remoteType === option.value ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setSearchFilters({ remoteType: option.value })}
                >
                  {option.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Date posted */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                Date posted: {datePostedOptions.find(o => o.value === searchFilters.postedWithin)?.label || 'Any time'}
              </label>
              {searchFilters.postedWithin && searchFilters.postedWithin !== 'any' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchFilters({ postedWithin: 'any' })}
                  className="h-6 px-2 text-xs"
                >
                  Reset
                </Button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {datePostedOptions.map((option) => (
                <Badge
                  key={option.value}
                  variant={searchFilters.postedWithin === option.value ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setSearchFilters({ postedWithin: option.value })}
                >
                  {option.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Has salary toggle */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium flex items-center gap-1.5">
                <DollarSign className="h-3.5 w-3.5" />
                Salary: {searchFilters.hasSalary ? 'Required' : 'Any'}
              </label>
              {searchFilters.hasSalary && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchFilters({ hasSalary: false })}
                  className="h-6 px-2 text-xs"
                >
                  Reset
                </Button>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Switch
                id="has-salary"
                checked={searchFilters.hasSalary || false}
                onCheckedChange={(checked) => setSearchFilters({ hasSalary: checked })}
              />
              <label htmlFor="has-salary" className="text-sm cursor-pointer select-none">
                Only show jobs with salary info
              </label>
            </div>
          </div>

          {/* Experience level */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">
                Experience: {experienceOptions.find(o => o.value === searchFilters.experienceLevel)?.label || 'Any level'}
              </label>
              {searchFilters.experienceLevel && searchFilters.experienceLevel !== 'any' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchFilters({ experienceLevel: 'any' })}
                  className="h-6 px-2 text-xs"
                >
                  Reset
                </Button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {experienceOptions.map((option) => (
                <Badge
                  key={option.value}
                  variant={searchFilters.experienceLevel === option.value ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setSearchFilters({ experienceLevel: option.value })}
                >
                  {option.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Employment type */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">
                Employment: {searchFilters.employmentTypes?.length
                  ? `${searchFilters.employmentTypes.length} selected`
                  : 'Any'}
              </label>
              {searchFilters.employmentTypes && searchFilters.employmentTypes.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchFilters({ employmentTypes: [] })}
                  className="h-6 px-2 text-xs"
                >
                  Reset
                </Button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {employmentOptions.map((option) => {
                const isSelected = searchFilters.employmentTypes?.includes(option.value)
                return (
                  <Badge
                    key={option.value}
                    variant={isSelected ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => {
                      const current = searchFilters.employmentTypes || []
                      const updated = isSelected
                        ? current.filter((t) => t !== option.value)
                        : [...current, option.value]
                      setSearchFilters({ employmentTypes: updated })
                    }}
                  >
                    {option.label}
                  </Badge>
                )
              })}
            </div>
          </div>

          {/* Job sources */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">
                Sources: {searchFilters.sources?.length
                  ? `${searchFilters.sources.length} selected`
                  : 'All'}
              </label>
              {searchFilters.sources && searchFilters.sources.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchFilters({ sources: [] })}
                  className="h-6 px-2 text-xs"
                >
                  Reset
                </Button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {sourceOptions.map((option) => {
                const isSelected = searchFilters.sources?.includes(option.value)
                return (
                  <Badge
                    key={option.value}
                    variant={isSelected ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => {
                      const current = searchFilters.sources || []
                      const updated = isSelected
                        ? current.filter((s) => s !== option.value)
                        : [...current, option.value]
                      setSearchFilters({ sources: updated })
                    }}
                  >
                    {option.label}
                  </Badge>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
