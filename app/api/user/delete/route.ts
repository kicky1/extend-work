import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function DELETE() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Delete user's avatar files from storage
    const { data: files } = await supabaseAdmin.storage
      .from('avatars')
      .list(user.id);

    if (files && files.length > 0) {
      const filePaths = files.map(f => `${user.id}/${f.name}`);
      await supabaseAdmin.storage.from('avatars').remove(filePaths);
    }

    // Delete the user (cascades to user_profiles, cvs, ai_usage due to ON DELETE CASCADE)
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(user.id);

    if (deleteError) {
      console.error('User deletion error:', deleteError);
      return NextResponse.json({ error: 'Failed to delete account' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Account deletion error:', error);
    const message = error instanceof Error ? error.message : 'Failed to delete account';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
