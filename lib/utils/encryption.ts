import { randomBytes, createCipheriv, createDecipheriv } from 'crypto'

const ALGORITHM = 'aes-256-gcm'
const IV_LENGTH = 12 // GCM recommended IV length
const TAG_LENGTH = 16 // GCM auth tag length

/**
 * Encrypts text using AES-256-GCM
 * Returns a hex string with \x prefix for Supabase bytea storage
 */
export function encryptForStorage(text: string, key: Buffer): string | null {
  if (!text) return null

  const iv = randomBytes(IV_LENGTH)
  const cipher = createCipheriv(ALGORITHM, key, iv)

  const encrypted = Buffer.concat([
    cipher.update(text, 'utf8'),
    cipher.final(),
  ])

  const authTag = cipher.getAuthTag()

  // Format: IV + Auth Tag + Ciphertext
  const combined = Buffer.concat([iv, authTag, encrypted])

  // Return as hex string with \x prefix for Supabase bytea
  return '\\x' + combined.toString('hex')
}

/**
 * Converts Supabase bytea data to Buffer
 * Supabase can return bytea as:
 * - hex string starting with \x
 * - base64 encoded string
 * - JSON serialized Buffer (legacy)
 */
function toBuffer(data: Buffer | string | null | undefined): Buffer | null {
  if (!data) return null
  if (Buffer.isBuffer(data)) return data
  if (typeof data === 'string') {
    // Check for hex format (Supabase bytea with \x prefix)
    if (data.startsWith('\\x')) {
      return Buffer.from(data.slice(2), 'hex')
    }
    // Check for JSON serialized Buffer (legacy format)
    if (data.startsWith('eyJ0eXBlIjoiQnVmZmVyIi') || data.includes('"type":"Buffer"')) {
      try {
        // It's base64 encoded JSON, decode first
        const jsonStr = data.startsWith('{') ? data : Buffer.from(data, 'base64').toString('utf8')
        const parsed = JSON.parse(jsonStr)
        if (parsed.type === 'Buffer' && Array.isArray(parsed.data)) {
          return Buffer.from(parsed.data)
        }
      } catch {
        // Fall through to base64
      }
    }
    // Default: try base64
    return Buffer.from(data, 'base64')
  }
  return null
}

/**
 * Decrypts data encrypted with encryptForStorage
 * Expects Buffer containing: IV (12 bytes) + Auth Tag (16 bytes) + Ciphertext
 * Also accepts base64 strings (as returned by Supabase for bytea columns)
 */
export function decryptFromStorage(data: Buffer | string, key: Buffer): string {
  const buffer = toBuffer(data)
  if (!buffer || buffer.length === 0) return ''

  // Minimum size: IV + Tag + at least 1 byte of ciphertext
  if (buffer.length < IV_LENGTH + TAG_LENGTH + 1) {
    throw new Error('Invalid encrypted data: too short')
  }

  const iv = buffer.subarray(0, IV_LENGTH)
  const authTag = buffer.subarray(IV_LENGTH, IV_LENGTH + TAG_LENGTH)
  const ciphertext = buffer.subarray(IV_LENGTH + TAG_LENGTH)

  const decipher = createDecipheriv(ALGORITHM, key, iv)
  decipher.setAuthTag(authTag)

  const decrypted = Buffer.concat([
    decipher.update(ciphertext),
    decipher.final(),
  ])

  return decrypted.toString('utf8')
}

/**
 * Generates a new 256-bit encryption key
 */
export function generateEncryptionKey(): Buffer {
  return randomBytes(32) // 256 bits
}

/**
 * Converts a hex string to a Buffer key
 */
export function keyFromHex(hexKey: string): Buffer {
  return Buffer.from(hexKey, 'hex')
}

/**
 * Converts a key Buffer to hex string for storage
 */
export function keyToHex(key: Buffer): string {
  return key.toString('hex')
}

/**
 * Encrypts multiple fields at once, returning hex strings for Supabase bytea storage
 */
export function encryptEmailFields(
  fields: { bodyText?: string; bodyHtml?: string; subject?: string; snippet?: string },
  key: Buffer
): {
  bodyTextEncrypted: string | null
  bodyHtmlEncrypted: string | null
  subjectEncrypted: string | null
  snippetEncrypted: string | null
} {
  return {
    bodyTextEncrypted: fields.bodyText ? encryptForStorage(fields.bodyText, key) : null,
    bodyHtmlEncrypted: fields.bodyHtml ? encryptForStorage(fields.bodyHtml, key) : null,
    subjectEncrypted: fields.subject ? encryptForStorage(fields.subject, key) : null,
    snippetEncrypted: fields.snippet ? encryptForStorage(fields.snippet, key) : null,
  }
}

/**
 * Decrypts multiple fields at once
 * Accepts both Buffer and base64 string (as returned by Supabase)
 */
export function decryptEmailFields(
  fields: {
    bodyTextEncrypted?: Buffer | string | null
    bodyHtmlEncrypted?: Buffer | string | null
    subjectEncrypted?: Buffer | string | null
    snippetEncrypted?: Buffer | string | null
  },
  key: Buffer
): {
  bodyText: string | null
  bodyHtml: string | null
  subject: string | null
  snippet: string | null
} {
  return {
    bodyText: fields.bodyTextEncrypted ? decryptFromStorage(fields.bodyTextEncrypted, key) : null,
    bodyHtml: fields.bodyHtmlEncrypted ? decryptFromStorage(fields.bodyHtmlEncrypted, key) : null,
    subject: fields.subjectEncrypted ? decryptFromStorage(fields.subjectEncrypted, key) : null,
    snippet: fields.snippetEncrypted ? decryptFromStorage(fields.snippetEncrypted, key) : null,
  }
}
