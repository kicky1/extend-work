'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import {
  CreditCard,
  Sparkles,
  Check,
  Loader2,
  Zap,
  Calendar,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useSubscription } from '@/lib/hooks/use-subscription';
import UsageIndicator from '@/components/subscription/usage-indicator';
import InvoiceList from '@/components/settings/invoice-list';
import { PRICING } from '@/lib/config/subscription-tiers';

export default function BillingPage() {
  const searchParams = useSearchParams();
  const { subscription, isLoading, refetch, isPro } = useSubscription();
  const [isPortalLoading, setIsPortalLoading] = useState(false);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  useEffect(() => {
    const success = searchParams.get('success');
    const canceled = searchParams.get('canceled');

    if (success === 'true') {
      toast.success('Subscription activated successfully!');
      refetch();
      window.history.replaceState({}, '', '/settings/billing');
    } else if (canceled === 'true') {
      toast.info('Checkout was canceled.');
      window.history.replaceState({}, '', '/settings/billing');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleManageSubscription = async () => {
    setIsPortalLoading(true);
    try {
      const response = await fetch('/api/stripe/create-portal', { method: 'POST' });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Portal error:', error);
    } finally {
      setIsPortalLoading(false);
    }
  };

  const handleCheckout = async () => {
    setIsCheckoutLoading(true);
    try {
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceType: billingCycle }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  const monthlyPrice = PRICING.pro_monthly / 100;
  const yearlyPrice = PRICING.pro_yearly / 100;
  const yearlyMonthly = yearlyPrice / 12;
  const savings = Math.round((1 - yearlyPrice / (monthlyPrice * 12)) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1a2a2a]">Billing & Subscription</h1>
        <p className="text-[#5a6a6a] mt-1">Manage your subscription and billing settings.</p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : isPro ? (
        /* Pro Subscription View */
        <div className="space-y-6">
          {/* Current Plan Card */}
          <Card className="overflow-hidden pt-0">
            <div className="bg-[#1a4a4a] px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">Pro Plan</h2>
                  <p className="text-white/80 text-sm">Active subscription</p>
                </div>
              </div>
            </div>

            <CardContent className="pt-6 space-y-6">
              {/* Usage */}
              {subscription && (
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-3">AI Usage This Month</h3>
                  <UsageIndicator
                    current={subscription.usage.current}
                    limit={subscription.usage.limit}
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Resets on {new Date(subscription.usage.periodEnd).toLocaleDateString()}
                  </p>
                </div>
              )}

              {/* Subscription Details */}
              {subscription?.periodEnd && (
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Next billing date</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(subscription.periodEnd).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}

              {/* Manage Subscription Button */}
              <Button
                onClick={handleManageSubscription}
                disabled={isPortalLoading}
                variant="outline"
                className="w-full"
              >
                {isPortalLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <CreditCard className="w-4 h-4 mr-2" />
                )}
                Manage Subscription
              </Button>
            </CardContent>
          </Card>

          {/* Invoice History */}
          <InvoiceList />
        </div>
      ) : (
        /* Free Plan - Upgrade View */
        <div className="space-y-6">
          {/* Current Plan */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-lg">
                  <CreditCard className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <CardTitle>Free Plan</CardTitle>
                  <CardDescription>Manual CV editing only</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Upgrade to Pro to unlock AI-powered features and supercharge your CV creation.
              </p>
            </CardContent>
          </Card>

          {/* Upgrade Card */}
          <Card className="overflow-hidden">
            <div className="bg-[#1a4a4a] px-6 py-6 text-white">
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="w-6 h-6" />
                <h2 className="text-xl font-bold">Upgrade to Pro</h2>
              </div>
              <p className="text-white/90">
                Get 500 AI requests per month to generate, optimize, and evaluate your CV.
              </p>
            </div>

            <CardContent className="pt-6">
              {/* Billing Toggle */}
              <div className="flex items-center justify-center gap-2 p-1 bg-muted rounded-lg mb-6">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                    billingCycle === 'monthly'
                      ? 'bg-card shadow text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle('yearly')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                    billingCycle === 'yearly'
                      ? 'bg-card shadow text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Yearly
                  <span className="ml-1 text-xs text-[#1a4a4a] font-semibold">
                    Save {savings}%
                  </span>
                </button>
              </div>

              {/* Price */}
              <div className="text-center mb-6">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold">
                    ${billingCycle === 'monthly' ? monthlyPrice.toFixed(2) : yearlyMonthly.toFixed(2)}
                  </span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                {billingCycle === 'yearly' && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Billed annually at ${yearlyPrice.toFixed(2)}
                  </p>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-6">
                {[
                  '500 AI requests per month',
                  'AI-powered CV chat assistant',
                  'Smart content generation',
                  'CV evaluation & scoring',
                  'Auto-fix issues with AI',
                  'Priority support',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="p-1 bg-[#1a4a4a]/10 rounded-full">
                      <Check className="w-3 h-3 text-[#1a4a4a]" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                onClick={handleCheckout}
                disabled={isCheckoutLoading}
                className="w-full py-6 text-lg bg-[#1a4a4a] hover:bg-[#0d3535]"
              >
                {isCheckoutLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                ) : (
                  <Zap className="w-5 h-5 mr-2" />
                )}
                {isCheckoutLoading ? 'Processing...' : 'Start Pro Now'}
              </Button>

              <p className="text-center text-xs text-muted-foreground mt-4">
                Cancel anytime. 7-day money-back guarantee.
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
