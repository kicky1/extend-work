export const TIER_LIMITS = {
  free: {
    requests_per_month: 0,
    max_tokens_per_request: 0,
  },
  pro: {
    requests_per_month: 500,
    max_tokens_per_request: 4000,
  },
} as const;

export const PRICING = {
  pro_monthly: 1999, // $19.99 in cents
  pro_yearly: 19990, // $199.90 in cents (2 months free)
} as const;

export type SubscriptionTier = keyof typeof TIER_LIMITS;
