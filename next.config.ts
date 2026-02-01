import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "frame-src https://checkout.stripe.com https://js.stripe.com https://hooks.stripe.com",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://checkout.stripe.com https://js.stripe.com",
              "connect-src 'self' https://*.supabase.co https://checkout.stripe.com https://api.stripe.com",
              "img-src 'self' data: https: blob:",
              "style-src 'self' 'unsafe-inline'",
            ].join('; '),
          },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

export default nextConfig;
