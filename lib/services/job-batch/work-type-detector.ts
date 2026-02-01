import type { RemotePreference } from '@/lib/types/job'

// False positive patterns - these contain "remote" but aren't about remote work
const FALSE_POSITIVE_PATTERNS = [
  /remote\s+sens(ing|or)/i,
  /remote\s+control/i,
  /remote\s+desktop/i,
  /remote\s+access/i,
  /remote\s+server/i,
  /remote\s+support/i,
  /remote\s+monitoring/i,
  /remote\s+management/i,
]

// Keyword patterns by work type (priority: onsite > hybrid > remote)
const PATTERNS = {
  onsite: {
    high: [
      /\bon[- ]?site\b/i,
      /\bin[- ]?office\b/i,
      /\boffice[- ]?based\b/i,
      /\bin[- ]?person\b/i,
      /\bno\s+remote\b/i,
      /\bstacjonarn[aey]\b/i, // Polish: stacjonarna/stacjonarne/stacjonarny
      /\bpraca\s+stacjonarn/i, // Polish: praca stacjonarna
    ],
  },
  hybrid: {
    high: [
      /\bhybrid\b/i,
      /\bflex[- ]?work\b/i,
      /\bflexible\s+work(ing)?\s+(arrangement|location|model)/i,
      /\b\d+\s*days?\s+(in\s+)?(office|on[- ]?site)/i, // "2 days in office", "3 days onsite"
      /\b(office|on[- ]?site)\s+\d+\s*days?/i, // "office 2 days"
      /\bhybrydow[aey]\b/i, // Polish: hybrydowa/hybrydowe/hybrydowy
      /\bpraca\s+hybrydow/i, // Polish: praca hybrydowa
    ],
  },
  remote: {
    high: [
      /\bfully\s+remote\b/i,
      /\b100\s*%\s*remote\b/i,
      /\bwork\s+from\s+anywhere\b/i,
      /\bremote[- ]?first\b/i,
      /\bremote[- ]?only\b/i,
      /\bw\s*pe[łl]ni\s+zdaln/i, // Polish: w pełni zdalna
      /\bcałkowicie\s+zdaln/i, // Polish: całkowicie zdalna
    ],
    medium: [
      /\bremote\b/i,
      /\bwfh\b/i,
      /\bwork\s+from\s+home\b/i,
      /\bhome[- ]?office\b/i,
      /\btelecommut/i,
      /\bzdaln[aey]\b/i, // Polish: zdalna/zdalne/zdalny
      /\bpraca\s+zdaln/i, // Polish: praca zdalna
    ],
  },
}

export interface WorkTypeDetectionResult {
  type: RemotePreference
  matchedKeyword?: string
  confidence: 'high' | 'medium' | 'low'
}

/**
 * Detects work type (remote/hybrid/onsite) from job title and description.
 * Priority: onsite > hybrid > remote (explicit patterns override generic ones)
 */
export function detectWorkType(
  title: string,
  description?: string,
  isRemoteFromApi?: boolean
): RemotePreference {
  const result = detectWorkTypeWithDetails(title, description, isRemoteFromApi)
  return result.type
}

/**
 * Detects work type with additional details about the match.
 * Useful for debugging and storing matched keywords in metadata.
 */
export function detectWorkTypeWithDetails(
  title: string,
  description?: string,
  isRemoteFromApi?: boolean
): WorkTypeDetectionResult {
  const text = `${title} ${description || ''}`.toLowerCase()

  // Check for false positives first
  for (const pattern of FALSE_POSITIVE_PATTERNS) {
    if (pattern.test(text)) {
      // If we find a false positive, remove it before continuing
      // This prevents "remote sensing engineer" from being marked as remote
    }
  }

  // Helper to check patterns and track matched keyword
  const checkPatterns = (
    patterns: RegExp[],
    textToCheck: string
  ): string | null => {
    for (const pattern of patterns) {
      const match = textToCheck.match(pattern)
      if (match) {
        // Verify it's not a false positive
        const matchedText = match[0].toLowerCase()
        const isFalsePositive = FALSE_POSITIVE_PATTERNS.some((fp) =>
          fp.test(matchedText)
        )
        if (!isFalsePositive) {
          return match[0]
        }
      }
    }
    return null
  }

  // Priority 1: Check onsite patterns (highest priority - if job says "in office", it's onsite)
  const onsiteMatch = checkPatterns(PATTERNS.onsite.high, text)
  if (onsiteMatch) {
    return { type: 'onsite', matchedKeyword: onsiteMatch, confidence: 'high' }
  }

  // Priority 2: Check hybrid patterns
  const hybridMatch = checkPatterns(PATTERNS.hybrid.high, text)
  if (hybridMatch) {
    return { type: 'hybrid', matchedKeyword: hybridMatch, confidence: 'high' }
  }

  // Priority 3: Check remote patterns (high confidence first)
  const remoteHighMatch = checkPatterns(PATTERNS.remote.high, text)
  if (remoteHighMatch) {
    return {
      type: 'remote',
      matchedKeyword: remoteHighMatch,
      confidence: 'high',
    }
  }

  // Priority 4: Check remote patterns (medium confidence)
  const remoteMediumMatch = checkPatterns(PATTERNS.remote.medium, text)
  if (remoteMediumMatch) {
    // Double-check against false positives for the whole context
    const contextStart = Math.max(
      0,
      text.indexOf(remoteMediumMatch.toLowerCase()) - 20
    )
    const contextEnd = Math.min(
      text.length,
      text.indexOf(remoteMediumMatch.toLowerCase()) + remoteMediumMatch.length + 20
    )
    const context = text.slice(contextStart, contextEnd)

    const isFalsePositive = FALSE_POSITIVE_PATTERNS.some((fp) => fp.test(context))
    if (!isFalsePositive) {
      return {
        type: 'remote',
        matchedKeyword: remoteMediumMatch,
        confidence: 'medium',
      }
    }
  }

  // Fallback to API data
  if (isRemoteFromApi === true) {
    return { type: 'remote', confidence: 'low' }
  }

  // Default: unknown
  return { type: 'any', confidence: 'low' }
}
