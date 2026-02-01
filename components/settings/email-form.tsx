'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createClient } from '@/lib/supabase/client';

interface EmailFormProps {
  currentEmail: string;
}

export default function EmailForm({ currentEmail }: EmailFormProps) {
  const [newEmail, setNewEmail] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newEmail || newEmail === currentEmail) {
      toast.error('Please enter a different email address.');
      return;
    }

    setIsUpdating(true);

    try {
      const { error } = await supabase.auth.updateUser({ email: newEmail });

      if (error) {
        throw error;
      }

      toast.success('Verification email sent! Check both your current and new email addresses to confirm the change.');
      setNewEmail('');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to update email');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="currentEmail">Current Email</Label>
        <Input
          id="currentEmail"
          type="email"
          value={currentEmail}
          disabled
          className="bg-muted"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="newEmail">New Email</Label>
        <Input
          id="newEmail"
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          placeholder="Enter new email address"
        />
      </div>

      <Button type="submit" disabled={isUpdating || !newEmail}>
        {isUpdating ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          'Update Email'
        )}
      </Button>
    </form>
  );
}
