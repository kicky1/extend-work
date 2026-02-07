import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// GET - List connected email accounts
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: accounts, error } = await supabase
      .from('user_email_accounts')
      .select('id, provider, email, is_active, is_default, sync_label, sync_page_token, created_at, updated_at')
      .eq('user_id', user.id)
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({
      accounts: accounts?.map((a: any) => ({
        id: a.id,
        userId: user.id,
        provider: a.provider,
        email: a.email,
        isActive: a.is_active,
        isDefault: a.is_default,
        syncLabel: a.sync_label,
        syncPageToken: a.sync_page_token || null,
        createdAt: a.created_at,
        updatedAt: a.updated_at,
      })) || [],
    })
  } catch (error: any) {
    console.error('[Email Accounts] Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// PATCH - Update account settings (sync_label, etc.)
export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const accountId = searchParams.get('id')

    if (!accountId) {
      return NextResponse.json({ error: 'Account ID required' }, { status: 400 })
    }

    const body = await request.json()
    const { syncLabel } = body

    const updates: Record<string, any> = {
      updated_at: new Date().toISOString(),
    }

    // Allow setting sync_label to null to clear it
    if (syncLabel !== undefined) {
      updates.sync_label = syncLabel || null
    }

    const { data, error } = await supabase
      .from('user_email_accounts')
      .update(updates)
      .eq('id', accountId)
      .eq('user_id', user.id)
      .select('id, provider, email, is_active, is_default, sync_label, created_at, updated_at')
      .single()

    if (error) throw error

    return NextResponse.json({
      account: {
        id: data.id,
        userId: user.id,
        provider: data.provider,
        email: data.email,
        isActive: data.is_active,
        isDefault: data.is_default,
        syncLabel: data.sync_label,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      },
    })
  } catch (error: any) {
    console.error('[Email Accounts] Update error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// DELETE - Remove an email account
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const accountId = searchParams.get('id')

    if (!accountId) {
      return NextResponse.json({ error: 'Account ID required' }, { status: 400 })
    }

    // Soft delete by setting is_active to false
    const { error } = await supabase
      .from('user_email_accounts')
      .update({ is_active: false, updated_at: new Date().toISOString() })
      .eq('id', accountId)
      .eq('user_id', user.id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('[Email Accounts] Delete error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
