'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import AvatarUpload from '@/components/settings/avatar-upload';
import ProfileForm from '@/components/settings/profile-form';
import EmailForm from '@/components/settings/email-form';
import PasswordForm from '@/components/settings/password-form';
import DeleteAccountSection from '@/components/settings/delete-account-section';
import { Loader2 } from 'lucide-react';

interface Profile {
  displayName: string | null;
  avatarUrl: string | null;
  email: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    try {
      const response = await fetch('/api/user/profile');
      if (!response.ok) {
        throw new Error('Failed to load profile');
      }
      const data = await response.json();
      setProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleSaveProfile = async (displayName: string) => {
    const response = await fetch('/api/user/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ displayName }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Failed to save profile');
    }

    setProfile(prev => prev ? { ...prev, displayName } : null);
  };

  const handleAvatarUpload = (url: string) => {
    setProfile(prev => prev ? { ...prev, avatarUrl: url } : null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-lg bg-red-50 text-red-800 border border-red-200">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1a2a2a]">Profile Settings</h1>
        <p className="text-[#5a6a6a] mt-1">Manage your account settings and preferences.</p>
      </div>

      {/* Avatar & Display Name */}
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Your public profile information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <AvatarUpload
            currentAvatarUrl={profile?.avatarUrl ?? null}
            displayName={profile?.displayName ?? null}
            email={profile?.email ?? ''}
            onUpload={handleAvatarUpload}
          />
          <ProfileForm
            displayName={profile?.displayName ?? ''}
            email={profile?.email ?? ''}
            onSave={handleSaveProfile}
          />
        </CardContent>
      </Card>

      {/* Email */}
      <Card>
        <CardHeader>
          <CardTitle>Email Address</CardTitle>
          <CardDescription>Change the email address associated with your account</CardDescription>
        </CardHeader>
        <CardContent>
          <EmailForm currentEmail={profile?.email ?? ''} />
        </CardContent>
      </Card>

      {/* Password */}
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>Update your password to keep your account secure</CardDescription>
        </CardHeader>
        <CardContent>
          <PasswordForm />
        </CardContent>
      </Card>

      {/* Delete Account */}
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive">Delete Account</CardTitle>
          <CardDescription>Permanently delete your account and all data</CardDescription>
        </CardHeader>
        <CardContent>
          <DeleteAccountSection />
        </CardContent>
      </Card>
    </div>
  );
}
