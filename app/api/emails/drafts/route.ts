import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { emailThreadFromRow } from '@/lib/types/email'
import type { EmailParticipant } from '@/lib/types/email'

// POST - Save draft
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { accountId, to, cc, bcc, subject, body: emailBody, replyToThreadId } = body

    if (!accountId) {
      return NextResponse.json({ error: 'Account ID required' }, { status: 400 })
    }

    // Get account email for from address
    const { data: account, error: accountError } = await supabase
      .from('user_email_accounts')
      .select('email')
      .eq('id', accountId)
      .eq('user_id', user.id)
      .single()

    if (accountError || !account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 })
    }

    let threadId = replyToThreadId

    // If not replying, create a new draft thread
    if (!threadId) {
      const participants: EmailParticipant[] = [{ email: account.email }]
      if (to?.length) {
        to.forEach((email: string) => participants.push({ email }))
      }

      const { data: thread, error: threadError } = await supabase
        .from('email_threads')
        .insert({
          user_id: user.id,
          email_account_id: accountId,
          provider_thread_id: `draft_${Date.now()}`,
          subject: subject || '(No Subject)',
          snippet: emailBody?.substring(0, 100) || '',
          participants,
          is_draft: true,
          is_read: true,
          message_count: 1,
        })
        .select()
        .single()

      if (threadError) throw threadError
      threadId = thread.id
    }

    // Create draft message
    const toAddresses: EmailParticipant[] = (to || []).map((email: string) => ({ email }))
    const ccAddresses: EmailParticipant[] = (cc || []).map((email: string) => ({ email }))
    const bccAddresses: EmailParticipant[] = (bcc || []).map((email: string) => ({ email }))

    const { data: message, error: messageError } = await supabase
      .from('email_messages')
      .insert({
        thread_id: threadId,
        provider_message_id: `draft_msg_${Date.now()}`,
        from_address: { email: account.email },
        to_addresses: toAddresses,
        cc_addresses: ccAddresses,
        bcc_addresses: bccAddresses,
        subject,
        body_html: emailBody,
        is_draft: true,
        is_sent: false,
      })
      .select()
      .single()

    if (messageError) throw messageError

    // Get updated thread
    const { data: thread } = await supabase
      .from('email_threads')
      .select('id, user_id, email_account_id, provider_thread_id, subject, snippet, participants, last_message_at, is_read, is_starred, is_archived, is_draft, is_sent, labels, message_count, created_at, updated_at')
      .eq('id', threadId)
      .single()

    return NextResponse.json({
      thread: thread ? emailThreadFromRow(thread) : null,
      messageId: message.id,
    })
  } catch (error: any) {
    console.error('[Email Drafts] Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// PATCH - Update draft
export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const messageId = searchParams.get('messageId')

    if (!messageId) {
      return NextResponse.json({ error: 'Message ID required' }, { status: 400 })
    }

    const body = await request.json()
    const { to, cc, bcc, subject, body: emailBody } = body

    const updates: Record<string, any> = {
      updated_at: new Date().toISOString(),
    }

    if (to !== undefined) {
      updates.to_addresses = to.map((email: string) => ({ email }))
    }
    if (cc !== undefined) {
      updates.cc_addresses = cc.map((email: string) => ({ email }))
    }
    if (bcc !== undefined) {
      updates.bcc_addresses = bcc.map((email: string) => ({ email }))
    }
    if (subject !== undefined) updates.subject = subject
    if (emailBody !== undefined) updates.body_html = emailBody

    // Verify ownership through thread
    const { data: message, error: msgError } = await supabase
      .from('email_messages')
      .select('thread_id')
      .eq('id', messageId)
      .single()

    if (msgError || !message) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 })
    }

    const { data: thread } = await supabase
      .from('email_threads')
      .select('user_id')
      .eq('id', message.thread_id)
      .single()

    if (!thread || thread.user_id !== user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { error } = await supabase
      .from('email_messages')
      .update(updates)
      .eq('id', messageId)

    if (error) throw error

    // Update thread snippet
    if (emailBody) {
      await supabase
        .from('email_threads')
        .update({
          snippet: emailBody.substring(0, 100),
          subject: subject || undefined,
          updated_at: new Date().toISOString(),
        })
        .eq('id', message.thread_id)
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('[Email Drafts] Update error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// DELETE - Delete draft
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const threadId = searchParams.get('threadId')

    if (!threadId) {
      return NextResponse.json({ error: 'Thread ID required' }, { status: 400 })
    }

    // Delete thread (messages cascade)
    const { error } = await supabase
      .from('email_threads')
      .delete()
      .eq('id', threadId)
      .eq('user_id', user.id)
      .eq('is_draft', true)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('[Email Drafts] Delete error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
