'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useSubscription } from '@/lib/hooks/use-subscription';
import { CreditCard, LogOut, User, Sparkles, FileText, Briefcase, Mail, CalendarDays, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

interface UserProfile {
  displayName: string | null;
  avatarUrl: string | null;
  email: string;
}

export default function AppNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { subscription, isPro } = useSubscription();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/user/profile');
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  const getInitials = () => {
    if (profile?.displayName) {
      return profile.displayName
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    if (profile?.email) {
      return profile.email[0].toUpperCase();
    }
    return 'U';
  };

  const navLinks = [
    { href: '/cv-creator', label: 'CV Creator', icon: FileText, exact: true },
    { href: '/jobs', label: 'Jobs', icon: Briefcase },
    { href: '/emails', label: 'Emails', icon: Mail },
    { href: '/calendar', label: 'Calendar', icon: CalendarDays },
  ];

  const isActiveLink = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname?.startsWith(href);
  };

  return (
    <header className="bg-white border-b border-[#e8e4df] px-4 py-3">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4 md:gap-8">
          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 -ml-2 rounded-lg text-[#5a6a6a] hover:text-[#1a4a4a] hover:bg-[#1a4a4a]/5"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Logo */}
          <Link href="/cv-creator" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="font-semibold text-[#1a2a2a] text-lg tracking-tight hidden sm:inline">Extend Career</span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActiveLink(link.href, link.exact)
                      ? 'bg-[#1a4a4a]/10 text-[#1a4a4a]'
                      : 'text-[#5a6a6a] hover:text-[#1a4a4a] hover:bg-[#1a4a4a]/5'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <div className="flex items-center gap-2 cursor-pointer relative">
                {profile?.avatarUrl ? (
                  <Image
                    src={profile.avatarUrl}
                    alt="Avatar"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-[#e8e4df]"
                    unoptimized
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#1a4a4a]/10 flex items-center justify-center text-sm font-medium text-[#1a4a4a] ring-2 ring-[#e8e4df]">
                    {isLoading ? '...' : getInitials()}
                  </div>
                )}
                {isPro && (
                  <span className="absolute -bottom-1 -right-1 bg-[#1a4a4a] text-white text-[9px] font-bold px-1 py-0.5 rounded leading-none">
                    PRO
                  </span>
                )}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={8} className="w-48">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium text-[#1a2a2a]">
                  {profile?.displayName || 'User'}
                </p>
                <p className="text-xs text-[#5a6a6a] truncate max-w-[200px]">
                  {profile?.email}
                </p>
              </div>
              <DropdownMenuSeparator />
              {isPro && subscription && (
                <>
                  <div className="px-2 py-1.5 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#1a4a4a]" />
                    <span className="text-sm text-[#1a4a4a] font-medium">
                      {subscription.usage.limit - subscription.usage.current}
                    </span>
                    <span className="text-xs text-[#5a6a6a]">AI prompts left</span>
                  </div>
                  <DropdownMenuSeparator />
                </>
              )}
              <DropdownMenuItem>
                <Link href="/settings/profile" className="flex items-center gap-2 w-full">
                  <User className="w-4 h-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/settings/billing" className="flex items-center gap-2 w-full">
                  <CreditCard className="w-4 h-4" />
                  Billing
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} variant="destructive">
                <LogOut className="w-4 h-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile navigation menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-[#e8e4df] py-2">
          <div className="max-w-screen-2xl mx-auto px-4 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors',
                    isActiveLink(link.href, link.exact)
                      ? 'bg-[#1a4a4a]/10 text-[#1a4a4a]'
                      : 'text-[#5a6a6a] hover:text-[#1a4a4a] hover:bg-[#1a4a4a]/5'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
