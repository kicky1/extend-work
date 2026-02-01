'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import { Camera, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AvatarUploadProps {
  currentAvatarUrl: string | null;
  displayName: string | null;
  email: string;
  onUpload: (url: string) => void;
}

export default function AvatarUpload({
  currentAvatarUrl,
  displayName,
  email,
  onUpload,
}: AvatarUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getInitials = () => {
    if (displayName) {
      return displayName
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return email?.[0]?.toUpperCase() || 'U';
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type)) {
      toast.error('Invalid file type. Please use JPEG, PNG, GIF, or WebP.');
      return;
    }

    // Validate file size (2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('File too large. Maximum size is 2MB.');
      return;
    }

    setPreviewUrl(URL.createObjectURL(file));
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/user/avatar', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload avatar');
      }

      onUpload(data.avatarUrl);
      setPreviewUrl(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to upload avatar');
      setPreviewUrl(null);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const displayUrl = previewUrl || currentAvatarUrl;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative group">
        {displayUrl ? (
          <Image
            src={displayUrl}
            alt="Avatar"
            width={96}
            height={96}
            className="w-24 h-24 rounded-full object-cover ring-4 ring-border"
            unoptimized
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-semibold text-primary ring-4 ring-border">
            {getInitials()}
          </div>
        )}
        {isUploading && (
          <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-white animate-spin" />
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp"
        onChange={handleFileSelect}
        className="hidden"
      />

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
      >
        <Camera className="w-4 h-4 mr-2" />
        {isUploading ? 'Uploading...' : 'Change Photo'}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        JPEG, PNG, GIF, or WebP. Max 2MB.
      </p>
    </div>
  );
}
