import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { emailThreadFromRow, emailMessageFromRow } from '@/lib/types/email'
import { decryptEmailFields } from '@/lib/utils/encryption'
import { getUserEncryptionKey } from '@/lib/utils/user-encryption-key'

// GET - Get thread detail with messages
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    // Get thread
    const { data: thread, error: threadError } = await supabase
      .from('email_threads')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single()

    if (threadError || !thread) {
      return NextResponse.json({ error: 'Thread not found' }, { status: 404 })
    }

    // Get messages
    const { data: messages, error: messagesError } = await supabase
      .from('email_messages')
      .select('*')
      .eq('thread_id', id)
      .order('received_at', { ascending: true, nullsFirst: false })
      .order('sent_at', { ascending: true, nullsFirst: false })

    if (messagesError) throw messagesError

    // Decrypt if needed
    let decryptedThread = thread
    let decryptedMessages = messages || []

    // Check if encryption is used (encrypted columns have data)
    const hasEncryptedData = thread.subject_encrypted || thread.snippet_encrypted

    if (hasEncryptedData) {
      try {
        const encryptionKey = await getUserEncryptionKey(supabase, user.id)

        // Decrypt thread fields
        const threadDecrypted = decryptEmailFields({
          subjectEncrypted: thread.subject_encrypted,
          snippetEncrypted: thread.snippet_encrypted,
        }, encryptionKey)

        decryptedThread = {
          ...thread,
          subject: threadDecrypted.subject || thread.subject,
          snippet: threadDecrypted.snippet || thread.snippet,
        }

        // Decrypt message fields
        decryptedMessages = (messages || []).map((msg: any) => {
          if (!msg.subject_encrypted && !msg.body_text_encrypted && !msg.body_html_encrypted) {
            return msg
          }

          const msgDecrypted = decryptEmailFields({
            subjectEncrypted: msg.subject_encrypted,
            bodyTextEncrypted: msg.body_text_encrypted,
            bodyHtmlEncrypted: msg.body_html_encrypted,
          }, encryptionKey)

          return {
            ...msg,
            subject: msgDecrypted.subject || msg.subject,
            body_text: msgDecrypted.bodyText || msg.body_text,
            body_html: msgDecrypted.bodyHtml || msg.body_html,
          }
        })
      } catch (error) {
        console.error('[Email Thread Detail] Decryption error:', error)
        // Continue with encrypted/empty data rather than failing
      }
    }

    return NextResponse.json({
      thread: emailThreadFromRow(decryptedThread),
      messages: decryptedMessages.map(emailMessageFromRow),
    })
  } catch (error: any) {
    console.error('[Email Thread Detail] Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// PATCH - Update thread (read status, starred, archived)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const { isRead, isStarred, isArchived } = body

    const updates: Record<string, any> = {
      updated_at: new Date().toISOString(),
    }

    if (isRead !== undefined) updates.is_read = isRead
    if (isStarred !== undefined) updates.is_starred = isStarred
    if (isArchived !== undefined) updates.is_archived = isArchived

    const { data, error } = await supabase
      .from('email_threads')
      .update(updates)
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ thread: emailThreadFromRow(data) })
  } catch (error: any) {
    console.error('[Email Thread Update] Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// DELETE - Delete thread
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const { error } = await supabase
      .from('email_threads')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('[Email Thread Delete] Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
