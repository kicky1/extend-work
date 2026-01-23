import type { Footer, CVTheme } from '@/lib/types/cv'

interface FooterSectionProps {
  footer: Footer
  theme: CVTheme
}

export default function FooterSection({ footer, theme }: FooterSectionProps) {
  if (!footer.rodoConsent) return null

  return (
    <footer className="mt-8 pt-4 border-t border-gray-200">
      <p
        className="text-xs text-gray-500 italic leading-relaxed"
        style={{ fontFamily: theme.fonts.body }}
      >
        {footer.rodoConsent}
      </p>
    </footer>
  )
}
