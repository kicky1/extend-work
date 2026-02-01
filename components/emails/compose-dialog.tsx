'use client'

import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog'
import useEmailStore from '@/lib/stores/email-store'
import { ComposeForm } from './compose-form'

export function ComposeDialog() {
  const { isComposing, closeCompose } = useEmailStore()

  return (
    <Dialog open={isComposing} onOpenChange={(open) => !open && closeCompose()}>
      <DialogContent className="max-w-2xl h-[80vh] p-0 overflow-hidden">
        <ComposeForm onClose={closeCompose} />
      </DialogContent>
    </Dialog>
  )
}
