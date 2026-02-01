import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { emailTemplateFromRow } from '@/lib/types/email'

// GET - List email templates
export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data, error } = await supabase
      .from('email_templates')
      .select('*')
      .eq('user_id', user.id)
      .order('use_count', { ascending: false })
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({
      templates: (data || []).map(emailTemplateFromRow),
    })
  } catch (error: any) {
    console.error('[Email Templates] Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// POST - Create email template
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, subject, body: templateBody, variables, category } = body

    if (!name || !subject || !templateBody) {
      return NextResponse.json({ error: 'Name, subject, and body are required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('email_templates')
      .insert({
        user_id: user.id,
        name,
        subject,
        body: templateBody,
        variables: variables || [],
        category: category || null,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ template: emailTemplateFromRow(data) })
  } catch (error: any) {
    console.error('[Email Templates] Create error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// PATCH - Update email template
export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Template ID required' }, { status: 400 })
    }

    const body = await request.json()
    const { name, subject, body: templateBody, variables, category, incrementUse } = body

    const updates: Record<string, any> = {
      updated_at: new Date().toISOString(),
    }

    if (name !== undefined) updates.name = name
    if (subject !== undefined) updates.subject = subject
    if (templateBody !== undefined) updates.body = templateBody
    if (variables !== undefined) updates.variables = variables
    if (category !== undefined) updates.category = category

    // Handle increment use count
    if (incrementUse) {
      const { data: current } = await supabase
        .from('email_templates')
        .select('use_count')
        .eq('id', id)
        .eq('user_id', user.id)
        .single()

      if (current) {
        updates.use_count = (current.use_count || 0) + 1
      }
    }

    const { data, error } = await supabase
      .from('email_templates')
      .update(updates)
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ template: emailTemplateFromRow(data) })
  } catch (error: any) {
    console.error('[Email Templates] Update error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// DELETE - Delete email template
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Template ID required' }, { status: 400 })
    }

    const { error } = await supabase
      .from('email_templates')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('[Email Templates] Delete error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
