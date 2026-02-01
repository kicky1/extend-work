import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

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
        scope: 'openid email Mail.Send offline_access',
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

// Send email via Gmail API
async function sendGmailEmail(
  accessToken: string,
  to: string,
  subject: string,
  body: string,
  attachments?: { filename: string; content: string; mimeType: string }[]
) {
  // Build MIME message
  let mimeMessage = `To: ${to}\r\n`
  mimeMessage += `Subject: ${subject}\r\n`
  mimeMessage += 'MIME-Version: 1.0\r\n'

  if (attachments && attachments.length > 0) {
    const boundary = `boundary_${Date.now()}`
    mimeMessage += `Content-Type: multipart/mixed; boundary="${boundary}"\r\n\r\n`

    // Body part
    mimeMessage += `--${boundary}\r\n`
    mimeMessage += 'Content-Type: text/html; charset="UTF-8"\r\n\r\n'
    mimeMessage += `${body}\r\n\r\n`

    // Attachments
    for (const attachment of attachments) {
      mimeMessage += `--${boundary}\r\n`
      mimeMessage += `Content-Type: ${attachment.mimeType}; name="${attachment.filename}"\r\n`
      mimeMessage += 'Content-Transfer-Encoding: base64\r\n'
      mimeMessage += `Content-Disposition: attachment; filename="${attachment.filename}"\r\n\r\n`
      mimeMessage += `${attachment.content}\r\n\r\n`
    }

    mimeMessage += `--${boundary}--`
  } else {
    mimeMessage += 'Content-Type: text/html; charset="UTF-8"\r\n\r\n'
    mimeMessage += body
  }

  // Base64 encode
  const encodedMessage = Buffer.from(mimeMessage)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')

  const response = await fetch('https://www.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ raw: encodedMessage }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Gmail send failed: ${error}`)
  }

  return await response.json()
}

// Send email via Microsoft Graph API
async function sendOutlookEmail(
  accessToken: string,
  to: string,
  subject: string,
  body: string,
  attachments?: { filename: string; content: string; mimeType: string }[]
) {
  const message: any = {
    message: {
      subject,
      body: {
        contentType: 'HTML',
        content: body,
      },
      toRecipients: [
        {
          emailAddress: { address: to },
        },
      ],
    },
    saveToSentItems: true,
  }

  if (attachments && attachments.length > 0) {
    message.message.attachments = attachments.map((att) => ({
      '@odata.type': '#microsoft.graph.fileAttachment',
      name: att.filename,
      contentBytes: att.content,
      contentType: att.mimeType,
    }))
  }

  const response = await fetch('https://graph.microsoft.com/v1.0/me/sendMail', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Outlook send failed: ${error}`)
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { emailAccountId, to, subject, htmlBody, attachments } = body

    if (!emailAccountId || !to || !subject || !htmlBody) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Get email account
    const { data: account, error: accountError } = await supabase
      .from('user_email_accounts')
      .select('*')
      .eq('id', emailAccountId)
      .eq('user_id', user.id)
      .single()

    if (accountError || !account) {
      return NextResponse.json({ error: 'Email account not found' }, { status: 404 })
    }

    if (!account.is_active) {
      return NextResponse.json({ error: 'Email account is not active' }, { status: 400 })
    }

    // Refresh token if needed
    const accessToken = await refreshTokenIfNeeded(account)

    // Send email based on provider
    let messageId: string | undefined
    if (account.provider === 'gmail') {
      const result = await sendGmailEmail(accessToken, to, subject, htmlBody, attachments)
      messageId = result.id
    } else {
      await sendOutlookEmail(accessToken, to, subject, htmlBody, attachments)
    }

    // Save sent email to database
    const now = new Date().toISOString()
    const threadId = crypto.randomUUID()

    // Build proper participant objects
    const fromParticipant = { email: account.email, name: account.email.split('@')[0] }
    const toParticipant = { email: to }

    // Create email thread for sent email
    await supabase.from('email_threads').insert({
      id: threadId,
      user_id: user.id,
      email_account_id: emailAccountId,
      provider_thread_id: messageId || threadId,
      subject,
      snippet: htmlBody.replace(/<[^>]*>/g, '').substring(0, 200),
      participants: [fromParticipant, toParticipant],
      message_count: 1,
      is_read: true,
      is_starred: false,
      is_archived: false,
      is_draft: false,
      is_sent: true,
      last_message_at: now,
      created_at: now,
      updated_at: now,
    })

    // Create email message
    await supabase.from('email_messages').insert({
      id: crypto.randomUUID(),
      user_id: user.id,
      thread_id: threadId,
      provider_message_id: messageId || crypto.randomUUID(),
      from_address: fromParticipant,
      to_addresses: [toParticipant],
      cc_addresses: [],
      bcc_addresses: [],
      subject,
      body_text: htmlBody.replace(/<[^>]*>/g, ''),
      body_html: htmlBody,
      received_at: now,
      created_at: now,
      updated_at: now,
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('[Email Send] Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
