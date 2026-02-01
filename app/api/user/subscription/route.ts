import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getUserUsage } from '@/lib/ai/usage-guard';

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get subscription profile
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('subscription_tier, subscription_status, subscription_period_end')
      .eq('id', user.id)
      .single();

    // Get usage stats
    const usage = await getUserUsage(user.id);

    return NextResponse.json({
      tier: profile?.subscription_tier ?? 'free',
      status: profile?.subscription_status ?? 'inactive',
      periodEnd: profile?.subscription_period_end,
      usage: {
        current: usage.current,
        limit: usage.limit,
        periodEnd: usage.periodEnd.toISOString(),
      },
    });
  } catch (error: unknown) {
    console.error('Subscription fetch error:', error);
    const message = error instanceof Error ? error.message : 'Failed to fetch subscription';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
