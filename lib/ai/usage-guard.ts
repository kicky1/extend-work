import { createClient } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { TIER_LIMITS, SubscriptionTier } from '@/lib/config/subscription-tiers';

export type UsageCheckResult =
  | { allowed: true; tier: SubscriptionTier; usage: { current: number; limit: number } }
  | { allowed: false; reason: 'not_pro' | 'limit_exceeded'; tier: SubscriptionTier; usage?: { current: number; limit: number } };

export async function checkCanUseAI(userId: string): Promise<UsageCheckResult> {
  const supabase = await createClient();

  // Get user profile to check subscription tier
  const { data: profile, error: profileError } = await supabase
    .from('user_profiles')
    .select('subscription_tier')
    .eq('id', userId)
    .single();

  if (profileError || !profile) {
    return { allowed: false, reason: 'not_pro', tier: 'free' };
  }

  const tier = profile.subscription_tier as SubscriptionTier;

  // Free tier has no AI access
  if (tier === 'free') {
    return { allowed: false, reason: 'not_pro', tier };
  }

  // Get current period start (first day of current month)
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const periodStart = `${year}-${month}-01`;

  // Get or create usage record for current period
  const { data: usage, error: usageError } = await supabase
    .from('ai_usage')
    .select('request_count')
    .eq('user_id', userId)
    .eq('period_start', periodStart)
    .single();

  const currentUsage = usage?.request_count ?? 0;
  const limit = TIER_LIMITS[tier].requests_per_month;

  if (currentUsage >= limit) {
    return {
      allowed: false,
      reason: 'limit_exceeded',
      tier,
      usage: { current: currentUsage, limit },
    };
  }

  return {
    allowed: true,
    tier,
    usage: { current: currentUsage, limit },
  };
}

export async function recordAIUsage(
  userId: string,
  inputTokens: number,
  outputTokens: number
): Promise<void> {
  // Use admin client to bypass RLS (needed for onFinish callback context)
  const supabase = supabaseAdmin;

  // Get current period start (first day of current month)
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const periodStart = `${year}-${month}-01`;

  // Upsert usage record - increment counts
  const { error } = await supabase.rpc('increment_ai_usage', {
    p_user_id: userId,
    p_period_start: periodStart,
    p_input_tokens: inputTokens,
    p_output_tokens: outputTokens,
  });

  // If RPC doesn't exist, fall back to atomic upsert
  if (error) {
    console.error('[Usage Guard] RPC failed, falling back to upsert:', error.message);
    await supabase
      .from('ai_usage')
      .upsert({
        user_id: userId,
        period_start: periodStart,
        request_count: 1,
        total_input_tokens: inputTokens,
        total_output_tokens: outputTokens,
      }, { onConflict: 'user_id,period_start' });
  }
}

export function truncateToTokenLimit(text: string, tier: SubscriptionTier): string {
  const maxTokens = TIER_LIMITS[tier].max_tokens_per_request;
  if (maxTokens === 0) return text;

  // Rough estimate: 1 token ≈ 4 characters
  const maxChars = maxTokens * 4;
  if (text.length <= maxChars) return text;

  return text.slice(0, maxChars);
}

export async function getUserUsage(userId: string): Promise<{
  tier: SubscriptionTier;
  current: number;
  limit: number;
  periodEnd: Date;
}> {
  const supabase = await createClient();

  // Get user profile
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('subscription_tier')
    .eq('id', userId)
    .single();

  const tier = (profile?.subscription_tier ?? 'free') as SubscriptionTier;

  // Get current period
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const periodStart = `${year}-${month}-01`;
  const periodEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  // Get usage
  const { data: usage } = await supabase
    .from('ai_usage')
    .select('request_count')
    .eq('user_id', userId)
    .eq('period_start', periodStart)
    .single();

  return {
    tier,
    current: usage?.request_count ?? 0,
    limit: TIER_LIMITS[tier].requests_per_month,
    periodEnd,
  };
}
