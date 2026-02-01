import { SupabaseClient } from '@supabase/supabase-js'
import { generateEncryptionKey, keyFromHex, keyToHex } from './encryption'

// In-memory cache for encryption keys during a request
const keyCache = new Map<string, Buffer>()

/**
 * Gets or creates an encryption key for a user.
 * Keys are stored in user_profiles.encryption_key_id (which stores the hex key directly for now).
 * In production, you'd use Supabase Vault for key storage.
 *
 * @param supabase - Supabase client instance
 * @param userId - User ID to get/create key for
 * @returns Buffer containing the 256-bit encryption key
 */
export async function getUserEncryptionKey(
  supabase: SupabaseClient,
  userId: string
): Promise<Buffer> {
  // Check cache first
  const cached = keyCache.get(userId)
  if (cached) return cached

  // Get existing key from user_profiles
  const { data: profile, error } = await supabase
    .from('user_profiles')
    .select('encryption_key_id')
    .eq('id', userId)
    .single()

  if (error && error.code !== 'PGRST116') {
    // PGRST116 = row not found
    throw new Error(`Failed to get user profile: ${error.message}`)
  }

  // If key exists, decode and return it
  if (profile?.encryption_key_id) {
    const key = keyFromHex(profile.encryption_key_id)
    keyCache.set(userId, key)
    return key
  }

  // Generate new key
  const newKey = generateEncryptionKey()
  const keyHex = keyToHex(newKey)

  // Store key in user_profiles
  const { error: updateError } = await supabase
    .from('user_profiles')
    .update({ encryption_key_id: keyHex })
    .eq('id', userId)

  if (updateError) {
    throw new Error(`Failed to store encryption key: ${updateError.message}`)
  }

  keyCache.set(userId, newKey)
  return newKey
}

/**
 * Clears the key cache (useful for testing or when keys are rotated)
 */
export function clearKeyCache(): void {
  keyCache.clear()
}
