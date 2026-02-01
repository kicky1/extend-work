'use client';

import { Zap } from 'lucide-react';

interface UsageIndicatorProps {
  current: number;
  limit: number;
  compact?: boolean;
}

export default function UsageIndicator({ current, limit, compact = false }: UsageIndicatorProps) {
  const percentage = limit > 0 ? Math.round((current / limit) * 100) : 0;
  const remaining = limit - current;

  const getColor = () => {
    if (percentage >= 90) return 'text-red-600 bg-red-100';
    if (percentage >= 70) return 'text-amber-600 bg-amber-100';
    return 'text-[#1a4a4a] bg-[#1a4a4a]/10';
  };

  const getBarColor = () => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 70) return 'bg-amber-500';
    return 'bg-[#1a4a4a]';
  };

  if (compact) {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${getColor()}`}>
        <Zap className="w-3 h-3" />
        <span>{remaining}/{limit}</span>
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-[#5a6a6a]">AI Requests</span>
        <span className={`font-medium ${percentage >= 90 ? 'text-red-600' : 'text-[#1a2a2a]'}`}>
          {current} / {limit}
        </span>
      </div>
      <div className="h-1.5 bg-[#e8e4df] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${getBarColor()}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      {percentage >= 90 && (
        <p className="text-xs text-red-600">
          {remaining === 0 ? 'Limit reached' : `Only ${remaining} requests left`}
        </p>
      )}
    </div>
  );
}
