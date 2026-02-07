'use client'

import useCVStore from '@/lib/stores/cv-store'
import { Textarea } from '@/components/ui/textarea'
import { Field, FieldLabel } from '@/components/ui/field'
import { defaultFooter } from '@/lib/types/cv'
import { Button } from '@/components/ui/button'
import { RotateCcw } from 'lucide-react'

export default function FooterForm() {
  const { cvData, updateFooter } = useCVStore()
  const { footer } = cvData

  const handleReset = () => {
    updateFooter({ rodoConsent: defaultFooter.rodoConsent })
  }

  return (
    <div className="space-y-4">

      <Field>
        <FieldLabel htmlFor="rodo-consent">
          RODO/GDPR Consent Text
        </FieldLabel>
        <Textarea
          id="rodo-consent"
          value={footer.rodoConsent}
          onChange={(e) => updateFooter({ rodoConsent: e.target.value })}
          rows={4}
          placeholder="Enter your RODO/GDPR consent text..."
        />
      </Field>
      <div className="flex items-center justify-between">
        <div></div>
        <Button onClick={handleReset} variant="outline" size="sm">
          <RotateCcw data-icon="inline-start" className="w-4 h-4" />
          Reset to Default
        </Button>
      </div>

      {/* Help Section */}
      <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
        <h4 className="text-sm font-semibold text-foreground mb-2">
          About RODO/GDPR Consent
        </h4>
        <p className="text-sm text-muted-foreground">
          This text appears at the bottom of your CV. It&apos;s commonly required in European countries
          to comply with GDPR (General Data Protection Regulation) when sharing personal information
          with potential employers. The consent statement authorizes the processing of your personal
          data for recruitment purposes.
        </p>
      </div>
    </div>
  )
}
