import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { emailThreadFromRow } from '@/lib/types/email'
import type { EmailFilter } from '@/lib/types/email'
import { decryptEmailFields } from '@/lib/utils/encryption'
import { getUserEncryptionKey } from '@/lib/utils/user-encryption-key'

// GET - List email threads
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const accountId = searchParams.get('accountId')
    const filter = (searchParams.get('filter') || 'inbox') as EmailFilter
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = (page - 1) * limit

    if (!accountId) {
      return NextResponse.json({ error: 'Account ID required' }, { status: 400 })
    }

    // Build query based on filter
    let query = supabase
      .from('email_threads')
      .select('*', { count: 'exact' })
      .eq('user_id', user.id)
      .eq('email_account_id', accountId)

    switch (filter) {
      case 'inbox':
        query = query.eq('is_archived', false).eq('is_draft', false).eq('is_sent', false)
        break
      case 'sent':
        query = query.eq('is_sent', true).eq('is_draft', false)
        break
      case 'starred':
        query = query.eq('is_starred', true)
        break
    }

    const { data, error, count } = await query
      .order('last_message_at', { ascending: false, nullsFirst: false })
      .range(offset, offset + limit - 1)

    if (error) throw error

    // Check if any threads have encrypted data
    const hasEncryptedData = (data || []).some(
      (t: any) => t.subject_encrypted || t.snippet_encrypted
    )

    let decryptedThreads = data || []

    if (hasEncryptedData) {
      try {
        const encryptionKey = await getUserEncryptionKey(supabase, user.id)

        decryptedThreads = (data || []).map((thread: any) => {
          if (!thread.subject_encrypted && !thread.snippet_encrypted) {
            return thread
          }

          const decrypted = decryptEmailFields({
            subjectEncrypted: thread.subject_encrypted,
            snippetEncrypted: thread.snippet_encrypted,
          }, encryptionKey)

          return {
            ...thread,
            subject: decrypted.subject || thread.subject,
            snippet: decrypted.snippet || thread.snippet,
          }
        })
      } catch (err) {
        console.error('[Email Threads] Decryption error:', err)
        // Continue with encrypted/empty data rather than failing
      }
    }

    return NextResponse.json({
      threads: decryptedThreads.map(emailThreadFromRow),
      total: count || 0,
      page,
      limit,
      hasMore: (count || 0) > offset + limit,
    })
  } catch (error: any) {
    console.error('[Email Threads] Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
