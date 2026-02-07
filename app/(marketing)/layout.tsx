import { MarketingNav } from '@/components/seo/marketing-nav'
import { MarketingFooter } from '@/components/seo/marketing-footer'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <MarketingNav />
      <main>{children}</main>
      <MarketingFooter />
    </div>
  )
}
