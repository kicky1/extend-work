import Link from 'next/link'

interface MarketingCTAProps {
  title?: string
  description?: string
  buttonText?: string
  buttonHref?: string
}

export function MarketingCTA({
  title = 'Ready to transform your job search?',
  description = 'Join thousands who\'ve streamlined their career journey with Extend Career.',
  buttonText = 'Start for free',
  buttonHref = '/signup',
}: MarketingCTAProps) {
  return (
    <section className="px-6 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <div className="relative p-12 sm:p-16 rounded-3xl bg-[#1a4a4a] overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" className="absolute inset-0">
              <defs>
                <pattern
                  id="cta-grid"
                  width="32"
                  height="32"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="1" cy="1" r="1" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cta-grid)" />
            </svg>
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {title}
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-lg mx-auto">
              {description}
            </p>
            <Link
              href={buttonHref}
              className="inline-flex items-center justify-center bg-white text-[#1a4a4a] hover:bg-white/90 px-8 h-12 text-base font-semibold rounded-lg transition-colors"
            >
              {buttonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
