import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { EmailParticipant } from '@/lib/types/email'
import { encryptEmailFields } from '@/lib/utils/encryption'
import { getUserEncryptionKey } from '@/lib/utils/user-encryption-key'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const MICROSOFT_CLIENT_ID = process.env.MICROSOFT_CLIENT_ID
const MICROSOFT_CLIENT_SECRET = process.env.MICROSOFT_CLIENT_SECRET

// Refresh access token if expired
async function refreshTokenIfNeeded(account: {
  id: string
  provider: 'gmail' | 'outlook'
  access_token: string
  refresh_token: string
  token_expires_at: string
}): Promise<string> {
  const expiresAt = new Date(account.token_expires_at)
  const now = new Date()

  // If token expires in more than 5 minutes, use existing token
  if (expiresAt.getTime() - now.getTime() > 5 * 60 * 1000) {
    return account.access_token
  }

  // Refresh the token
  let newTokens: { access_token: string; expires_in: number }

  if (account.provider === 'gmail') {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: GOOGLE_CLIENT_ID!,
        client_secret: GOOGLE_CLIENT_SECRET!,
        refresh_token: account.refresh_token,
        grant_type: 'refresh_token',
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to refresh Google token')
    }

    newTokens = await response.json()
  } else {
    const response = await fetch('https://login.microsoftonline.com/common/oauth2/v2.0/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: MICROSOFT_CLIENT_ID!,
        client_secret: MICROSOFT_CLIENT_SECRET!,
        refresh_token: account.refresh_token,
        grant_type: 'refresh_token',
        scope: 'openid email Mail.Read Mail.Send offline_access',
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to refresh Microsoft token')
    }

    newTokens = await response.json()
  }

  // Update token in database
  const supabase = await createClient()
  const newExpiresAt = new Date(Date.now() + newTokens.expires_in * 1000)

  await supabase
    .from('user_email_accounts')
    .update({
      access_token: newTokens.access_token,
      token_expires_at: newExpiresAt.toISOString(),
    })
    .eq('id', account.id)

  return newTokens.access_token
}

// Parse email address from Gmail format
function parseEmailAddress(raw: string): EmailParticipant {
  const match = raw.match(/^(?:"?([^"]*)"?\s)?<?([^>]+)>?$/)
  if (match) {
    return {
      name: match[1]?.trim() || undefined,
      email: match[2].trim(),
    }
  }
  return { email: raw.trim() }
}

// Sync Gmail threads
async function syncGmailThreads(
  supabase: any,
  userId: string,
  accountId: string,
  accessToken: string,
  accountEmail: string,
  syncLabel?: string,
  encryptionKey?: Buffer,
  pageToken?: string
): Promise<{ nextPageToken?: string }> {
  // Use custom label if provided, otherwise default to INBOX
  const labelId = syncLabel || 'INBOX'

  // Build URL with optional pageToken for pagination
  let url = `https://www.googleapis.com/gmail/v1/users/me/threads?maxResults=50&labelIds=${labelId}`
  if (pageToken) {
    url += `&pageToken=${pageToken}`
  }

  // Fetch recent threads
  const threadsResponse = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  if (!threadsResponse.ok) {
    const error = await threadsResponse.text()
    throw new Error(`Gmail API error: ${error}`)
  }

  const gmailResponse = await threadsResponse.json()
  const { threads: threadList, nextPageToken: gmailNextPageToken } = gmailResponse
  if (!threadList || threadList.length === 0) return { nextPageToken: undefined }

  // Fetch each thread's details
  for (const threadItem of threadList) {
    const threadResponse = await fetch(
      `https://www.googleapis.com/gmail/v1/users/me/threads/${threadItem.id}?format=full`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    )

    if (!threadResponse.ok) continue

    const thread = await threadResponse.json()
    const messages = thread.messages || []
    if (messages.length === 0) continue

    // Parse thread data
    const firstMessage = messages[0]
    const lastMessage = messages[messages.length - 1]

    const headers = firstMessage.payload?.headers || []
    const getHeader = (name: string) =>
      headers.find((h: any) => h.name.toLowerCase() === name.toLowerCase())?.value

    const subject = getHeader('Subject') || '(No Subject)'
    const fromRaw = getHeader('From') || ''
    const toRaw = getHeader('To') || ''

    const participants: EmailParticipant[] = []
    if (fromRaw) participants.push(parseEmailAddress(fromRaw))
    if (toRaw) {
      toRaw.split(',').forEach((addr: string) => {
        const parsed = parseEmailAddress(addr)
        if (!participants.some(p => p.email === parsed.email)) {
          participants.push(parsed)
        }
      })
    }

    const labelIds = firstMessage.labelIds || []
    const isRead = !labelIds.includes('UNREAD')
    const isStarred = labelIds.includes('STARRED')
    const isDraft = labelIds.includes('DRAFT')
    const isArchived = !labelIds.includes('INBOX') && !labelIds.includes('SENT')

    // Check if any message in thread was sent by the account owner
    const isSent = messages.some((msg: any) => {
      const msgFrom = msg.payload?.headers?.find((h: any) => h.name.toLowerCase() === 'from')?.value || ''
      const parsed = parseEmailAddress(msgFrom)
      return parsed.email.toLowerCase() === accountEmail.toLowerCase()
    })

    // Encrypt thread fields if encryption key is provided
    const threadEncrypted = encryptionKey
      ? encryptEmailFields({ subject, snippet: thread.snippet }, encryptionKey)
      : { subjectEncrypted: null, snippetEncrypted: null }

    // Upsert thread
    const { data: threadData, error: threadError } = await supabase
      .from('email_threads')
      .upsert({
        user_id: userId,
        email_account_id: accountId,
        provider_thread_id: thread.id,
        subject: encryptionKey ? null : subject, // Clear plaintext if encrypted
        snippet: encryptionKey ? null : thread.snippet,
        subject_encrypted: threadEncrypted.subjectEncrypted,
        snippet_encrypted: threadEncrypted.snippetEncrypted,
        participants,
        last_message_at: new Date(parseInt(lastMessage.internalDate)).toISOString(),
        is_read: isRead,
        is_starred: isStarred,
        is_archived: isArchived,
        is_draft: isDraft,
        is_sent: isSent,
        labels: labelIds,
        message_count: messages.length,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'email_account_id,provider_thread_id' })
      .select('id')
      .single()

    if (threadError) {
      console.error('[Sync] Thread upsert error:', threadError)
      continue
    }

    // Batch upsert all messages for this thread
    const messageRows = messages.map((message: any) => {
      const msgHeaders = message.payload?.headers || []
      const getMsgHeader = (name: string) =>
        msgHeaders.find((h: any) => h.name.toLowerCase() === name.toLowerCase())?.value

      // Extract body
      let bodyText = ''
      let bodyHtml = ''

      function extractBody(part: any) {
        if (part.mimeType === 'text/plain' && part.body?.data) {
          bodyText = Buffer.from(part.body.data, 'base64').toString('utf-8')
        } else if (part.mimeType === 'text/html' && part.body?.data) {
          bodyHtml = Buffer.from(part.body.data, 'base64').toString('utf-8')
        } else if (part.parts) {
          part.parts.forEach(extractBody)
        }
      }

      extractBody(message.payload)

      const fromAddr = parseEmailAddress(getMsgHeader('From') || '')
      const toAddrs = (getMsgHeader('To') || '').split(',').filter(Boolean).map(parseEmailAddress)
      const ccAddrs = (getMsgHeader('Cc') || '').split(',').filter(Boolean).map(parseEmailAddress)

      const msgLabelIds = message.labelIds || []
      const msgIsSent = msgLabelIds.includes('SENT')
      const msgSubject = getMsgHeader('Subject')

      const msgEncrypted = encryptionKey
        ? encryptEmailFields({ subject: msgSubject, bodyText, bodyHtml }, encryptionKey)
        : { subjectEncrypted: null, bodyTextEncrypted: null, bodyHtmlEncrypted: null }

      return {
        thread_id: threadData.id,
        provider_message_id: message.id,
        from_address: fromAddr,
        to_addresses: toAddrs,
        cc_addresses: ccAddrs,
        bcc_addresses: [],
        subject: encryptionKey ? null : msgSubject,
        body_text: encryptionKey ? null : (bodyText || null),
        body_html: encryptionKey ? null : (bodyHtml || null),
        subject_encrypted: msgEncrypted.subjectEncrypted,
        body_text_encrypted: msgEncrypted.bodyTextEncrypted,
        body_html_encrypted: msgEncrypted.bodyHtmlEncrypted,
        attachments: [],
        is_draft: msgLabelIds.includes('DRAFT'),
        is_sent: msgIsSent,
        sent_at: msgIsSent ? new Date(parseInt(message.internalDate)).toISOString() : null,
        received_at: !msgIsSent ? new Date(parseInt(message.internalDate)).toISOString() : null,
        updated_at: new Date().toISOString(),
      }
    })

    if (messageRows.length > 0) {
      const { error: msgError } = await supabase
        .from('email_messages')
        .upsert(messageRows, { onConflict: 'thread_id,provider_message_id' })
      if (msgError) {
        console.error('[Sync] Message batch upsert error:', msgError)
      }
    }
  }

  return { nextPageToken: gmailNextPageToken }
}

// Sync Outlook threads
async function syncOutlookThreads(
  supabase: any,
  userId: string,
  accountId: string,
  accessToken: string,
  accountEmail: string,
  syncFolder?: string,
  encryptionKey?: Buffer,
  nextLink?: string
): Promise<{ nextPageToken?: string }> {
  // Use nextLink if provided (for pagination), otherwise build the URL
  let messagesUrl = nextLink

  if (!messagesUrl) {
    messagesUrl = 'https://graph.microsoft.com/v1.0/me/messages?$top=50&$orderby=receivedDateTime desc&$select=id,conversationId,subject,bodyPreview,from,toRecipients,ccRecipients,receivedDateTime,sentDateTime,isRead,isDraft,body'

    if (syncFolder) {
      messagesUrl = `https://graph.microsoft.com/v1.0/me/mailFolders/${syncFolder}/messages?$top=50&$orderby=receivedDateTime desc&$select=id,conversationId,subject,bodyPreview,from,toRecipients,ccRecipients,receivedDateTime,sentDateTime,isRead,isDraft,body`
    }
  }

  // Fetch recent messages
  const messagesResponse = await fetch(messagesUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  if (!messagesResponse.ok) {
    const error = await messagesResponse.text()
    throw new Error(`Outlook API error: ${error}`)
  }

  const outlookResponse = await messagesResponse.json()
  const { value: messages } = outlookResponse
  const outlookNextLink = outlookResponse['@odata.nextLink']
  if (!messages || messages.length === 0) return { nextPageToken: undefined }

  // Group by conversation
  const conversationMap = new Map<string, any[]>()
  for (const message of messages) {
    const convId = message.conversationId
    if (!conversationMap.has(convId)) {
      conversationMap.set(convId, [])
    }
    conversationMap.get(convId)!.push(message)
  }

  // Process each conversation as a thread
  for (const [convId, convMessages] of conversationMap) {
    const firstMessage = convMessages[convMessages.length - 1]
    const lastMessage = convMessages[0]

    const participants: EmailParticipant[] = []
    if (firstMessage.from?.emailAddress) {
      participants.push({
        name: firstMessage.from.emailAddress.name,
        email: firstMessage.from.emailAddress.address,
      })
    }
    for (const recipient of firstMessage.toRecipients || []) {
      if (recipient.emailAddress && !participants.some(p => p.email === recipient.emailAddress.address)) {
        participants.push({
          name: recipient.emailAddress.name,
          email: recipient.emailAddress.address,
        })
      }
    }

    const isRead = convMessages.every(m => m.isRead)
    const isDraft = convMessages.some(m => m.isDraft)

    // Check if any message in thread was sent by the account owner
    const isSent = convMessages.some((msg: any) => {
      const fromEmail = msg.from?.emailAddress?.address || ''
      return fromEmail.toLowerCase() === accountEmail.toLowerCase()
    })

    const threadSubject = firstMessage.subject || '(No Subject)'
    const threadSnippet = lastMessage.bodyPreview

    // Encrypt thread fields if encryption key is provided
    const threadEncrypted = encryptionKey
      ? encryptEmailFields({ subject: threadSubject, snippet: threadSnippet }, encryptionKey)
      : { subjectEncrypted: null, snippetEncrypted: null }

    // Upsert thread
    const { data: threadData, error: threadError } = await supabase
      .from('email_threads')
      .upsert({
        user_id: userId,
        email_account_id: accountId,
        provider_thread_id: convId,
        subject: encryptionKey ? null : threadSubject,
        snippet: encryptionKey ? null : threadSnippet,
        subject_encrypted: threadEncrypted.subjectEncrypted,
        snippet_encrypted: threadEncrypted.snippetEncrypted,
        participants,
        last_message_at: lastMessage.receivedDateTime || lastMessage.sentDateTime,
        is_read: isRead,
        is_starred: false,
        is_archived: false,
        is_draft: isDraft,
        is_sent: isSent,
        labels: [],
        message_count: convMessages.length,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'email_account_id,provider_thread_id' })
      .select('id')
      .single()

    if (threadError) {
      console.error('[Sync] Thread upsert error:', threadError)
      continue
    }

    // Batch upsert all messages for this thread
    const messageRows = convMessages.map((message: any) => {
      const fromAddr: EmailParticipant = message.from?.emailAddress
        ? { name: message.from.emailAddress.name, email: message.from.emailAddress.address }
        : { email: 'unknown' }

      const toAddrs = (message.toRecipients || []).map((r: any) => ({
        name: r.emailAddress?.name,
        email: r.emailAddress?.address,
      }))

      const ccAddrs = (message.ccRecipients || []).map((r: any) => ({
        name: r.emailAddress?.name,
        email: r.emailAddress?.address,
      }))

      const msgIsSent = !message.receivedDateTime
      const msgSubject = message.subject
      const bodyText = message.body?.contentType === 'text' ? message.body.content : null
      const bodyHtml = message.body?.contentType === 'html' ? message.body.content : null

      const msgEncrypted = encryptionKey
        ? encryptEmailFields({ subject: msgSubject, bodyText, bodyHtml }, encryptionKey)
        : { subjectEncrypted: null, bodyTextEncrypted: null, bodyHtmlEncrypted: null }

      return {
        thread_id: threadData.id,
        provider_message_id: message.id,
        from_address: fromAddr,
        to_addresses: toAddrs,
        cc_addresses: ccAddrs,
        bcc_addresses: [],
        subject: encryptionKey ? null : msgSubject,
        body_text: encryptionKey ? null : bodyText,
        body_html: encryptionKey ? null : bodyHtml,
        subject_encrypted: msgEncrypted.subjectEncrypted,
        body_text_encrypted: msgEncrypted.bodyTextEncrypted,
        body_html_encrypted: msgEncrypted.bodyHtmlEncrypted,
        attachments: [],
        is_draft: message.isDraft,
        is_sent: msgIsSent,
        sent_at: message.sentDateTime,
        received_at: message.receivedDateTime,
        updated_at: new Date().toISOString(),
      }
    })

    if (messageRows.length > 0) {
      const { error: msgError } = await supabase
        .from('email_messages')
        .upsert(messageRows, { onConflict: 'thread_id,provider_message_id' })
      if (msgError) {
        console.error('[Sync] Message batch upsert error:', msgError)
      }
    }
  }

  return { nextPageToken: outlookNextLink }
}

// POST - Sync emails from provider
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { accountId, pageToken } = body

    if (!accountId) {
      return NextResponse.json({ error: 'Account ID required' }, { status: 400 })
    }

    // Get email account — only select columns needed for sync
    const { data: account, error: accountError } = await supabase
      .from('user_email_accounts')
      .select('id,provider,email,access_token,refresh_token,token_expires_at,sync_label')
      .eq('id', accountId)
      .eq('user_id', user.id)
      .single()

    if (accountError || !account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 })
    }

    // Refresh token if needed
    const accessToken = await refreshTokenIfNeeded(account)

    // Get user's encryption key (creates one if it doesn't exist)
    const encryptionKey = await getUserEncryptionKey(supabase, user.id)

    // Sync based on provider
    let result: { nextPageToken?: string }
    if (account.provider === 'gmail') {
      result = await syncGmailThreads(supabase, user.id, accountId, accessToken, account.email, account.sync_label, encryptionKey, pageToken)
    } else {
      result = await syncOutlookThreads(supabase, user.id, accountId, accessToken, account.email, account.sync_label, encryptionKey, pageToken)
    }

    // Save the next page token to database for persistence (ignore errors if column doesn't exist)
    if (result.nextPageToken !== undefined) {
      try {
        await supabase
          .from('user_email_accounts')
          .update({ sync_page_token: result.nextPageToken || null })
          .eq('id', accountId)
      } catch {
        // Column might not exist yet, ignore
      }
    }

    return NextResponse.json({
      success: true,
      syncedAt: new Date().toISOString(),
      nextPageToken: result.nextPageToken,
    })
  } catch (error: any) {
    console.error('[Email Sync] Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
