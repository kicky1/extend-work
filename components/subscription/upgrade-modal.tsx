'use client';

import { useState } from 'react';
import { X, Check, Sparkles, Loader2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PRICING } from '@/lib/config/subscription-tiers';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  reason?: 'not_pro' | 'limit_exceeded';
}

export default function UpgradeModal({ isOpen, onClose, reason }: UpgradeModalProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const monthlyPrice = PRICING.pro_monthly / 100;
  const yearlyPrice = PRICING.pro_yearly / 100;
  const yearlyMonthly = yearlyPrice / 12;
  const savings = Math.round((1 - yearlyPrice / (monthlyPrice * 12)) * 100);

  const handleCheckout = async () => {
    setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-gray-900">Upgrade to Pro</h2>
          </div>
          <Button variant="ghost" size="icon-sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Description */}
          <p className="text-sm text-muted-foreground mb-5">
            {reason === 'limit_exceeded'
              ? "You've reached your monthly AI request limit. Upgrade to continue using AI features."
              : 'Unlock AI-powered features to supercharge your CV creation.'}
          </p>

          {/* Pricing Toggle */}
          <div className="flex items-center justify-center gap-1 p-1 bg-muted rounded-lg mb-5">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white shadow-sm text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-white shadow-sm text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Yearly
              <span className="ml-1 text-xs text-primary font-semibold">
                Save {savings}%
              </span>
            </button>
          </div>

          {/* Price */}
          <div className="text-center mb-5">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-3xl font-bold text-foreground">
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
          <ul className="space-y-2.5 mb-5">
            {[
              '500 AI requests per month',
              'AI-powered CV chat assistant',
              'Smart content generation',
              'CV evaluation & scoring',
              'Auto-fix issues with AI',
              'Priority support',
            ].map((feature) => (
              <li key={feature} className="flex items-center gap-2.5">
                <div className="p-0.5 bg-primary/10 rounded-full">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-sm text-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-3 px-5 py-4 border-t border-gray-200 bg-gray-50">
          <Button
            onClick={handleCheckout}
            disabled={isLoading}
            size="lg"
            className="w-full"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Zap className="w-4 h-4" />
            )}
            {isLoading ? 'Processing...' : 'Start Pro Now'}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Cancel anytime. 7-day money-back guarantee.
          </p>
        </div>
      </div>
    </div>
  );
}
