'use client'

import { useState } from 'react'
import { X, CheckCircle2, Target, FileSearch, Briefcase, RefreshCw, Loader2, Wand2, TrendingUp, Lock, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import useEvaluationStore from '@/lib/stores/evaluation-store'
import useCVStore from '@/lib/stores/cv-store'
import ScoreBadge, { SectionScoreBar } from './score-badge'
import IssueCard from './issue-card'
import FixPreviewModal from './fix-preview-modal'
import UpgradeModal from '@/components/subscription/upgrade-modal'
import { useSubscription } from '@/lib/hooks/use-subscription'
import type { CVIssue, IssueSeverity } from '@/lib/types/cv-evaluation'

// Tooltip component for score explanations
function ScoreTooltip({ children, tooltip }: { children: React.ReactNode; tooltip: string }) {
  return (
    <div className="relative group inline-flex items-center gap-1">
      {children}
      <HelpCircle className="w-3 h-3 text-muted-foreground/50 cursor-help" />
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-foreground text-background text-xs rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
        {tooltip}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
      </div>
    </div>
  )
}

// Score tooltips explanations
const SCORE_TOOLTIPS = {
  overall: 'Combined score based on completeness, content quality, and formatting',
  ats: 'How well your CV will be parsed by Applicant Tracking Systems (automated screening)',
  keyword: 'Measures relevant industry keywords, action verbs, and technical terms',
  jobMatch: 'How closely your experience matches the job requirements',
}

export default function EvaluationPanel() {
  const {
    evaluation,
    baselineEvaluation,
    isPanelOpen,
    closePanel,
    jobDescription,
    setJobDescription,
    fixedIssueIds,
    pendingReEvaluate,
    evaluate,
    isEvaluating,
    isFixingAll,
    setIsFixingAll,
    markIssueFixed,
  } = useEvaluationStore()
  const { cvData } = useCVStore()
  const { isPro, refetch } = useSubscription()
  const [fixingIssue, setFixingIssue] = useState<CVIssue | null>(null)
  const [fixAllProgress, setFixAllProgress] = useState({ current: 0, total: 0 })
  const [showAllFoundKeywords, setShowAllFoundKeywords] = useState(false)
  const [showAllSuggestedKeywords, setShowAllSuggestedKeywords] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [upgradeReason, setUpgradeReason] = useState<'not_pro' | 'limit_exceeded'>('not_pro')
  const [showFixAllConfirm, setShowFixAllConfirm] = useState(false)

  if (!isPanelOpen || !evaluation) return null

  // Group issues by severity, excluding fixed ones
  const remainingIssues = evaluation.issues.filter(i => !fixedIssueIds.includes(i.id))
  const issuesBySeverity = remainingIssues.reduce(
    (acc, issue) => {
      acc[issue.severity].push(issue)
      return acc
    },
    { critical: [], warning: [], suggestion: [] } as Record<IssueSeverity, typeof evaluation.issues>
  )

  const severityOrder: IssueSeverity[] = ['critical', 'warning', 'suggestion']

  // Get baseline scores for comparison
  const baselineOverall = baselineEvaluation?.overallScore
  const baselineAts = baselineEvaluation?.atsScore
  const baselineKeyword = baselineEvaluation?.keywordAnalysis.score

  const getBaselineSectionScore = (section: string) => {
    return baselineEvaluation?.sectionScores.find(s => s.section === section)?.score
  }

  const handleReEvaluate = async () => {
    if (!isPro) {
      setUpgradeReason('not_pro')
      setShowUpgradeModal(true)
      return
    }
    // Pass isReEvaluation=true to trigger anchored scoring based on baseline
    await evaluate(cvData, jobDescription || undefined, true)
    refetch()
  }

  const handleFixIssue = (issue: CVIssue) => {
    if (!isPro) {
      setUpgradeReason('not_pro')
      setShowUpgradeModal(true)
      return
    }
    setFixingIssue(issue)
  }

  const handleFixApplied = (issueId: string) => {
    markIssueFixed(issueId)
    setFixingIssue(null)
    refetch()
  }

  // Show confirmation dialog before fixing all
  const handleFixAllClick = () => {
    if (!isPro) {
      setUpgradeReason('not_pro')
      setShowUpgradeModal(true)
      return
    }
    if (remainingIssues.length === 0) return
    setShowFixAllConfirm(true)
  }

  // Actually fix all issues after confirmation
  const handleFixAllConfirmed = async () => {
    setShowFixAllConfirm(false)
    setIsFixingAll(true)
    setFixAllProgress({ current: 0, total: remainingIssues.length })

    for (let i = 0; i < remainingIssues.length; i++) {
      const issue = remainingIssues[i]
      setFixAllProgress({ current: i + 1, total: remainingIssues.length })

      try {
        // Fetch fix
        const response = await fetch('/api/cv/fix-issue', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ issue, cvData }),
        })

        if (!response.ok) {
          const data = await response.json()
          if (data.code === 'NOT_PRO' || data.code === 'LIMIT_EXCEEDED') {
            setUpgradeReason(data.code === 'NOT_PRO' ? 'not_pro' : 'limit_exceeded')
            setShowUpgradeModal(true)
            break
          }
          continue
        }

        const data = await response.json()
        if (data.toolResults && data.toolResults.length > 0) {
          // Apply tool results - import dynamically to avoid circular deps
          const { applyToolResults } = await import('@/lib/utils/apply-tool-results')
          applyToolResults(data.toolResults)
          markIssueFixed(issue.id)
        }
      } catch {
        // Continue to next issue on error
        console.error(`Failed to fix issue: ${issue.title}`)
      }
    }

    setIsFixingAll(false)
    setFixAllProgress({ current: 0, total: 0 })
    refetch()
  }

  // Calculate score delta for re-evaluation display
  const scoreDelta = baselineEvaluation
    ? evaluation.overallScore - baselineEvaluation.overallScore
    : 0

  return (
    <>
    <div className="fixed top-0 right-0 h-full w-96 bg-white border-l border-gray-200 shadow-xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
        <h2 className="font-semibold text-gray-900">CV Evaluation</h2>
        <Button variant="ghost" size="icon-sm" onClick={closePanel}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Re-evaluate notification */}
        {(pendingReEvaluate || fixedIssueIds.length > 0) && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-800">
                  {fixedIssueIds.length} fix{fixedIssueIds.length !== 1 ? 'es' : ''} applied
                </p>
                <p className="text-xs text-blue-600 mt-0.5">
                  Re-evaluate to see your updated score
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReEvaluate}
                disabled={isEvaluating}
                className="bg-white"
              >
                {isEvaluating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-1.5" />
                )}
                Re-evaluate
              </Button>
            </div>
          </div>
        )}

        {/* Job Description Input */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            <Briefcase className="w-4 h-4 inline mr-1.5" />
            Job Description (optional)
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste a job description to evaluate CV relevance..."
            className="w-full h-20 p-2 text-xs border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {jobDescription && (
            <p className="text-xs text-gray-500 mt-1">Re-evaluate to see job match score</p>
          )}
        </div>

        {/* Overall Score */}
        <div className={`flex items-center gap-4 p-4 rounded-lg ${scoreDelta > 0 ? 'bg-emerald-50 border border-emerald-200' : 'bg-gray-50'}`}>
          <ScoreBadge
            score={evaluation.overallScore}
            size="lg"
            showLabel
            previousScore={baselineOverall}
          />
          <div className="flex-1">
            <ScoreTooltip tooltip={SCORE_TOOLTIPS.overall}>
              <p className="text-sm text-gray-600">Overall Score</p>
            </ScoreTooltip>
            {scoreDelta > 0 ? (
              <div className="flex items-center gap-1.5 mt-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-xs font-medium text-emerald-600">
                  +{scoreDelta} points since fixes!
                </span>
              </div>
            ) : (
              <p className="text-xs text-gray-500 mt-1">
                Based on completeness, quality, and ATS-friendliness
              </p>
            )}
          </div>
        </div>

        {/* Additional Scores Row */}
        <div className="grid grid-cols-2 gap-3">
          {/* ATS Score */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <FileSearch className="w-4 h-4 text-gray-500" />
              <ScoreTooltip tooltip={SCORE_TOOLTIPS.ats}>
                <span className="text-xs font-medium text-gray-600">ATS Score</span>
              </ScoreTooltip>
            </div>
            <div className="flex items-center gap-2">
              <ScoreBadge score={evaluation.atsScore} size="sm" previousScore={baselineAts} />
              <span className="text-xs text-gray-500">
                {evaluation.atsScore >= 80 ? 'ATS-friendly' : evaluation.atsScore >= 60 ? 'Needs work' : 'Poor'}
              </span>
            </div>
          </div>

          {/* Job Match Score (if available) */}
          {evaluation.jobMatchScore !== undefined && (
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-blue-500" />
                <ScoreTooltip tooltip={SCORE_TOOLTIPS.jobMatch}>
                  <span className="text-xs font-medium text-blue-600">Job Match</span>
                </ScoreTooltip>
              </div>
              <div className="flex items-center gap-2">
                <ScoreBadge score={evaluation.jobMatchScore} size="sm" />
                <span className="text-xs text-blue-500">
                  {evaluation.jobMatchScore >= 80 ? 'Strong match' : evaluation.jobMatchScore >= 60 ? 'Partial match' : 'Weak match'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Keyword Analysis */}
        <div>
          <ScoreTooltip tooltip={SCORE_TOOLTIPS.keyword}>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Keyword Analysis</h3>
          </ScoreTooltip>
          <div className="space-y-2">
            <SectionScoreBar
              label="Keyword Score"
              score={evaluation.keywordAnalysis.score}
              previousScore={baselineKeyword}
            />
            {evaluation.keywordAnalysis.found.length > 0 && (
              <div className="mt-2">
                <p className="text-xs text-gray-500 mb-1">Found keywords:</p>
                <div className="flex flex-wrap gap-1">
                  {(showAllFoundKeywords
                    ? evaluation.keywordAnalysis.found
                    : evaluation.keywordAnalysis.found.slice(0, 8)
                  ).map((kw, i) => (
                    <span key={i} className="px-1.5 py-0.5 bg-emerald-100 text-emerald-700 text-xs rounded">
                      {kw}
                    </span>
                  ))}
                  {evaluation.keywordAnalysis.found.length > 8 && (
                    <button
                      onClick={() => setShowAllFoundKeywords(!showAllFoundKeywords)}
                      className="text-xs text-emerald-600 hover:text-emerald-700 hover:underline"
                    >
                      {showAllFoundKeywords
                        ? 'Show less'
                        : `+${evaluation.keywordAnalysis.found.length - 8} more`}
                    </button>
                  )}
                </div>
              </div>
            )}
            {evaluation.keywordAnalysis.missing.length > 0 && (
              <div className="mt-2">
                <p className="text-xs text-gray-500 mb-1">Suggested keywords:</p>
                <div className="flex flex-wrap gap-1">
                  {(showAllSuggestedKeywords
                    ? evaluation.keywordAnalysis.missing
                    : evaluation.keywordAnalysis.missing.slice(0, 6)
                  ).map((kw, i) => (
                    <span key={i} className="px-1.5 py-0.5 bg-amber-100 text-amber-700 text-xs rounded">
                      {kw}
                    </span>
                  ))}
                  {evaluation.keywordAnalysis.missing.length > 6 && (
                    <button
                      onClick={() => setShowAllSuggestedKeywords(!showAllSuggestedKeywords)}
                      className="text-xs text-amber-600 hover:text-amber-700 hover:underline"
                    >
                      {showAllSuggestedKeywords
                        ? 'Show less'
                        : `+${evaluation.keywordAnalysis.missing.length - 6} more`}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section Scores */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Section Scores</h3>
          <div className="space-y-3">
            {evaluation.sectionScores.map((section) => (
              <SectionScoreBar
                key={section.section}
                label={section.section.replace(/([A-Z])/g, ' $1').trim()}
                score={section.score}
                previousScore={getBaselineSectionScore(section.section)}
              />
            ))}
          </div>
        </div>

        {/* Strengths */}
        {evaluation.strengths.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Strengths</h3>
            <div className="space-y-2">
              {evaluation.strengths.map((strength, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 p-2 bg-emerald-50 rounded-lg border border-emerald-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <p className="text-sm text-emerald-700">{strength}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Issues */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-700">
              Issues ({remainingIssues.length})
              {fixedIssueIds.length > 0 && (
                <span className="text-emerald-600 font-normal ml-2">
                  ({fixedIssueIds.length} fixed)
                </span>
              )}
            </h3>
            {remainingIssues.length > 0 && (
              <Button
                variant="outline"
                size="xs"
                onClick={handleFixAllClick}
                disabled={isFixingAll}
              >
                {isFixingAll ? (
                  <>
                    <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                    Fixing {fixAllProgress.current}/{fixAllProgress.total}
                  </>
                ) : (
                  <>
                    <Wand2 className="w-3 h-3 mr-1" />
                    Fix All Issues
                    {!isPro && <Lock className="w-3 h-3 ml-1" />}
                  </>
                )}
              </Button>
            )}
          </div>
          <div className="space-y-3">
            {severityOrder.map((severity) => {
              const issues = issuesBySeverity[severity]
              if (issues.length === 0) return null
              return issues.map((issue) => (
                <IssueCard
                  key={issue.id}
                  issue={issue}
                  onFixIssue={handleFixIssue}
                />
              ))
            })}
            {remainingIssues.length === 0 && (
              <div className="text-center py-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <p className="text-sm text-gray-700 font-medium">
                  {fixedIssueIds.length > 0 ? 'All issues fixed!' : 'No issues found.'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {fixedIssueIds.length > 0
                    ? 'Re-evaluate to see your improved score.'
                    : 'Your CV looks great!'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>

    {/* Fix Preview Modal */}
    {fixingIssue && (
      <FixPreviewModal
        issue={fixingIssue}
        onClose={() => setFixingIssue(null)}
        onFixApplied={handleFixApplied}
      />
    )}

    {/* Upgrade Modal */}
    <UpgradeModal
      isOpen={showUpgradeModal}
      onClose={() => setShowUpgradeModal(false)}
      reason={upgradeReason}
    />

    {/* Fix All Confirmation Dialog */}
    <AlertDialog open={showFixAllConfirm} onOpenChange={setShowFixAllConfirm}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Fix All Issues?</AlertDialogTitle>
          <AlertDialogDescription>
            This will automatically apply AI-suggested fixes to {remainingIssues.length} issue{remainingIssues.length !== 1 ? 's' : ''} in your CV:
            <ul className="mt-2 text-xs space-y-1">
              {remainingIssues.slice(0, 5).map((issue) => (
                <li key={issue.id} className="flex items-center gap-1">
                  <span className={
                    issue.severity === 'critical' ? 'text-red-600' :
                    issue.severity === 'warning' ? 'text-amber-600' : 'text-blue-600'
                  }>•</span>
                  {issue.title}
                </li>
              ))}
              {remainingIssues.length > 5 && (
                <li className="text-muted-foreground">...and {remainingIssues.length - 5} more</li>
              )}
            </ul>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleFixAllConfirmed}>
            Fix All Issues
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  )
}
