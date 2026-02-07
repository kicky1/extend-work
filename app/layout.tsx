import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const dmSans = DM_Sans({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Extend Career — AI-Powered Career Management Platform',
    template: '%s | Extend Career',
  },
  description:
    'Craft ATS-optimized resumes, discover AI-matched jobs, manage recruiter emails, and track interviews — all in one AI-powered platform.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Extend Career',
    title: 'Extend Career — AI-Powered Career Management Platform',
    description:
      'Craft ATS-optimized resumes, discover AI-matched jobs, manage recruiter emails, and track interviews — all in one AI-powered platform.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Extend Career — AI-Powered Career Management Platform',
    description:
      'Craft ATS-optimized resumes, discover AI-matched jobs, manage recruiter emails, and track interviews — all in one AI-powered platform.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
