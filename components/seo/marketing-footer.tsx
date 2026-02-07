import Link from 'next/link'
import { toolItems } from '@/lib/marketing-nav-data'

export function MarketingFooter() {
  return (
    <footer className="px-6 py-12 border-t border-[#e8e4df]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded bg-[#1a4a4a] flex items-center justify-center">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                </svg>
              </div>
              <span className="text-sm font-medium text-[#1a2a2a]">Extend Career</span>
            </div>
            <p className="text-sm text-[#8a9a9a] max-w-xs">
              AI-powered career management platform. Resumes, jobs, emails, and
              interviews in one place.
            </p>
          </div>
          <div className="flex gap-8 flex-wrap">
            <div>
              <h4 className="text-sm font-medium text-[#1a2a2a] mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-[#5a6a6a]">
                {toolItems.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:text-[#1a2a2a] transition-colors">{item.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-[#1a2a2a] mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-[#5a6a6a]">
                <li>
                  <Link href="/compare" className="hover:text-[#1a2a2a] transition-colors">Comparisons</Link>
                </li>
                <li>
                  <Link href="/best" className="hover:text-[#1a2a2a] transition-colors">Best Tools</Link>
                </li>
                <li>
                  <Link href="/alternatives" className="hover:text-[#1a2a2a] transition-colors">Alternatives</Link>
                </li>
                <li>
                  <Link href="/guides" className="hover:text-[#1a2a2a] transition-colors">Career Guides</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-[#1a2a2a] mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-[#5a6a6a]">
                <li>
                  <Link href="/privacy" className="hover:text-[#1a2a2a] transition-colors">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-[#1a2a2a] transition-colors">Terms of Service</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-[#e8e4df] text-center text-xs text-[#8a9a9a]">
          &copy; {new Date().getFullYear()} Extend Career. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
