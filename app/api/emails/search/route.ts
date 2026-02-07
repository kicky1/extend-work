import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { emailThreadFromRow } from '@/lib/types/email'

// GET - Search email threads
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const accountId = searchParams.get('accountId')
    const limit = parseInt(searchParams.get('limit') || '20')

    if (!query) {
      return NextResponse.json({ error: 'Search query required' }, { status: 400 })
    }

    // Build search query
    let dbQuery = supabase
      .from('email_threads')
      .select('id, user_id, email_account_id, provider_thread_id, subject, snippet, participants, last_message_at, is_read, is_starred, is_archived, is_draft, is_sent, labels, message_count, created_at, updated_at')
      .eq('user_id', user.id)

    if (accountId) {
      dbQuery = dbQuery.eq('email_account_id', accountId)
    }

    // Search in subject and snippet using ilike
    dbQuery = dbQuery.or(`subject.ilike.%${query}%,snippet.ilike.%${query}%`)

    const { data, error } = await dbQuery
      .order('last_message_at', { ascending: false, nullsFirst: false })
      .limit(limit)

    if (error) throw error

    return NextResponse.json({
      threads: (data || []).map(emailThreadFromRow),
      query,
    })
  } catch (error: any) {
    console.error('[Email Search] Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
