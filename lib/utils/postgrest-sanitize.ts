/**
 * Sanitize user input for safe interpolation into PostgREST filter strings.
 *
 * PostgREST uses `.` (column separator), `,` (OR separator), `(` / `)` (grouping),
 * and `%` (wildcard) as control characters. Injecting these can manipulate query logic.
 *
 * This escapes/removes those characters before use in `.or()` or `.ilike()` filter strings.
 */
export function sanitizePostgrestValue(value: string): string {
  // Remove PostgREST control characters that could break out of filter patterns
  return value.replace(/[.,()\\]/g, '')
}
