'use client';

import Link from 'next/link';
import { Sparkles, CreditCard, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import UsageIndicator from '@/components/subscription/usage-indicator';

interface SubscriptionSummaryProps {
  subscription: {
    tier: 'free' | 'pro';
    status: string;
    periodEnd: string | null;
    usage: {
      current: number;
      limit: number;
      periodEnd: string;
    };
  } | null;
  isLoading: boolean;
}

export default function SubscriptionSummary({ subscription, isLoading }: SubscriptionSummaryProps) {
  if (isLoading) {
    return (
      <div className="animate-pulse space-y-3">
        <div className="h-6 bg-[#e8e4df] rounded w-24"></div>
        <div className="h-4 bg-[#e8e4df] rounded w-48"></div>
      </div>
    );
  }

  const isPro = subscription?.tier === 'pro';

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${isPro ? 'bg-[#1a4a4a]/10' : 'bg-[#1a4a4a]/5'}`}>
          {isPro ? (
            <Sparkles className="w-5 h-5 text-[#1a4a4a]" />
          ) : (
            <CreditCard className="w-5 h-5 text-[#5a6a6a]" />
          )}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-[#1a2a2a]">{isPro ? 'Pro Plan' : 'Free Plan'}</span>
            <Badge className={isPro ? 'bg-[#1a4a4a] text-white' : 'bg-[#e8e4df] text-[#5a6a6a]'}>
              {isPro ? 'Active' : 'Free'}
            </Badge>
          </div>
          {isPro && subscription?.periodEnd && (
            <p className="text-sm text-[#5a6a6a]">
              Renews {new Date(subscription.periodEnd).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>

      {isPro && subscription && (
        <div>
          <p className="text-sm text-[#5a6a6a] mb-2">AI Usage This Month</p>
          <UsageIndicator
            current={subscription.usage.current}
            limit={subscription.usage.limit}
          />
        </div>
      )}

      <Link href="/settings/billing">
        <Button variant="outline" className="w-full justify-between border-[#e8e4df] text-[#1a4a4a] hover:bg-[#1a4a4a]/5 hover:border-[#1a4a4a]/30">
          {isPro ? 'Manage Subscription' : 'Upgrade to Pro'}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </Link>
    </div>
  );
}
