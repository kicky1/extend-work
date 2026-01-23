'use client'

import { useEffect, useState, useRef } from 'react'
import useEvaluationStore from '@/lib/stores/evaluation-store'
import IndicatorDot from './indicator-dot'
import type { CVIssue, IssueSeverity } from '@/lib/types/cv-evaluation'
import { getSectionRefKey } from '@/lib/types/cv-evaluation'

interface IssuePosition {
  issue: CVIssue
  yPosition: number
  targetY: number
  targetX: number
}

interface IssueIndicatorsProps {
  containerRef: React.RefObject<HTMLElement | null>
  onApplyFix?: (issue: CVIssue) => void
}

const severityColors: Record<IssueSeverity, string> = {
  critical: '#ef4444',
  warning: '#f59e0b',
  suggestion: '#3b82f6',
}

export default function IssueIndicators({ containerRef, onApplyFix }: IssueIndicatorsProps) {
  const { evaluation, sectionRefs, hoveredIssueId } = useEvaluationStore()
  const [issuePositions, setIssuePositions] = useState<IssuePosition[]>([])
  const railRef = useRef<HTMLDivElement>(null)

  // Calculate positions for all issues
  useEffect(() => {
    if (!evaluation || !containerRef.current || !railRef.current) return

    const containerRect = containerRef.current.getBoundingClientRect()
    const railRect = railRef.current.getBoundingClientRect()
    const positions: IssuePosition[] = []
    const usedYPositions: number[] = []
    const DOT_HEIGHT = 28 // Height of dot + margin
    const MIN_GAP = 4

    evaluation.issues.forEach((issue) => {
      const refKey = getSectionRefKey(issue.ref)
      const sectionElement = sectionRefs.get(refKey)

      if (sectionElement) {
        const sectionRect = sectionElement.getBoundingClientRect()
        // Calculate target position relative to the indicator rail
        const targetY = sectionRect.top - containerRect.top + sectionRect.height / 2
        const targetX = sectionRect.right - containerRect.left

        // Find a Y position that doesn't overlap with existing dots
        let yPosition = targetY - DOT_HEIGHT / 2

        // Check for overlaps and adjust
        for (const usedY of usedYPositions) {
          if (Math.abs(yPosition - usedY) < DOT_HEIGHT + MIN_GAP) {
            yPosition = usedY + DOT_HEIGHT + MIN_GAP
          }
        }

        usedYPositions.push(yPosition)
        positions.push({ issue, yPosition, targetY, targetX })
      }
    })

    setIssuePositions(positions)
  }, [evaluation, sectionRefs, containerRef])

  // Re-calculate on scroll
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      // Trigger re-calculation
      setIssuePositions((prev) => [...prev])
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [containerRef])

  if (!evaluation || issuePositions.length === 0) return null

  // Find the hovered issue position for drawing the line
  const hoveredPosition = hoveredIssueId
    ? issuePositions.find((p) => p.issue.id === hoveredIssueId)
    : null

  return (
    <>
      {/* Indicator rail */}
      <div
        ref={railRef}
        className="absolute top-0 right-0 w-10 h-full pointer-events-auto"
        style={{ zIndex: 20 }}
      >
        {issuePositions.map(({ issue, yPosition }) => (
          <IndicatorDot
            key={issue.id}
            issue={issue}
            yPosition={yPosition}
            onApplyFix={onApplyFix}
          />
        ))}
      </div>

      {/* SVG overlay for connector lines */}
      {hoveredPosition && containerRef.current && (
        <svg
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 15 }}
          width="100%"
          height="100%"
        >
          <defs>
            <marker
              id={`arrowhead-${hoveredPosition.issue.severity}`}
              markerWidth="6"
              markerHeight="6"
              refX="5"
              refY="3"
              orient="auto"
            >
              <polygon
                points="0 0, 6 3, 0 6"
                fill={severityColors[hoveredPosition.issue.severity]}
              />
            </marker>
          </defs>
          <path
            d={`M ${hoveredPosition.targetX + 8} ${hoveredPosition.targetY}
                Q ${hoveredPosition.targetX + 40} ${hoveredPosition.targetY}
                  ${hoveredPosition.targetX + 40} ${hoveredPosition.yPosition + 12}
                L ${containerRef.current.offsetWidth - 52} ${hoveredPosition.yPosition + 12}`}
            fill="none"
            stroke={severityColors[hoveredPosition.issue.severity]}
            strokeWidth="2"
            strokeDasharray="4 2"
            markerEnd={`url(#arrowhead-${hoveredPosition.issue.severity})`}
            className="transition-all duration-200"
          />
          {/* Highlight circle on the section */}
          <circle
            cx={hoveredPosition.targetX + 8}
            cy={hoveredPosition.targetY}
            r="6"
            fill="none"
            stroke={severityColors[hoveredPosition.issue.severity]}
            strokeWidth="2"
            className="animate-pulse"
          />
        </svg>
      )}
    </>
  )
}
