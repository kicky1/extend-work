'use client';

import { useState, useEffect, useCallback } from 'react';
import { SubscriptionTier } from '@/lib/config/subscription-tiers';

interface SubscriptionData {
  tier: SubscriptionTier;
  status: string;
  periodEnd: string | null;
  usage: {
    current: number;
    limit: number;
    periodEnd: string;
  };
}

interface UseSubscriptionReturn {
  subscription: SubscriptionData | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  isPro: boolean;
  canUseAI: boolean;
  usagePercentage: number;
}

export function useSubscription(): UseSubscriptionReturn {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscription = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/user/subscription');
      if (!response.ok) {
        throw new Error('Failed to fetch subscription');
      }

      const data = await response.json();
      setSubscription(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  const isPro = subscription?.tier === 'pro';
  const canUseAI = isPro && (subscription?.usage.current ?? 0) < (subscription?.usage.limit ?? 0);
  const usagePercentage = subscription
    ? Math.round((subscription.usage.current / subscription.usage.limit) * 100) || 0
    : 0;

  return {
    subscription,
    isLoading,
    error,
    refetch: fetchSubscription,
    isPro,
    canUseAI,
    usagePercentage,
  };
}
