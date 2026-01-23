'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import useCVStore from '@/lib/stores/cv-store'
import { Plus, Trash2, ChevronDown, GripVertical } from 'lucide-react'
import type { Certificate } from '@/lib/types/cv'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Field, FieldLabel } from '@/components/ui/field'
import { SortableList } from '@/components/ui/sortable'

interface CertificateAccordionProps {
  id: string
  index: number
  name: string
  issuer: string
  defaultOpen?: boolean
  onRemove: () => void
  children: React.ReactNode
  dragHandleProps: Pick<ReturnType<typeof useSortable>, 'attributes' | 'listeners'>
}

function CertificateAccordion({ id, index, name, issuer, defaultOpen = false, onRemove, children, dragHandleProps }: CertificateAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const title = name && issuer ? `${name} - ${issuer}` : name || issuer || `Certificate ${index + 1}`

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="flex items-center bg-muted/30">
        <button
          {...dragHandleProps.attributes as React.HTMLAttributes<HTMLButtonElement>}
          {...dragHandleProps.listeners as React.DOMAttributes<HTMLButtonElement>}
          className="cursor-grab active:cursor-grabbing p-3 hover:bg-muted/50 transition-colors touch-none"
          type="button"
        >
          <GripVertical className="w-4 h-4 text-muted-foreground" />
        </button>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex-1 flex items-center justify-between px-2 py-3 hover:bg-muted/50 transition-colors"
        >
          <div className="text-left">
            <span className="text-sm font-medium text-foreground truncate">{title}</span>
            <span className="text-xs text-muted-foreground ml-2">#{index + 1}</span>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          </motion.div>
        </button>
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          className="mr-2"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4 space-y-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface DraggableCertificateItemProps {
  cert: Certificate
  index: number
  isLast: boolean
  onRemove: () => void
  children: React.ReactNode
}

function DraggableCertificateItem({ cert, index, isLast, onRemove, children }: DraggableCertificateItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: cert.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={isDragging ? 'opacity-50 z-50' : ''}
    >
      <CertificateAccordion
        id={cert.id}
        index={index}
        name={cert.name}
        issuer={cert.issuer}
        defaultOpen={isLast}
        onRemove={onRemove}
        dragHandleProps={{ attributes, listeners }}
      >
        {children}
      </CertificateAccordion>
    </div>
  )
}

export default function CertificatesForm() {
  const { cvData, addCertificate, updateCertificate, removeCertificate, reorderCertificates } = useCVStore()
  const { certificates } = cvData

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          Certificates
        </h3>
        <Button
          onClick={addCertificate}
          size="sm"
        >
          <Plus data-icon="inline-start" />
          Add Certificate
        </Button>
      </div>

      {certificates.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>No certificates added yet.</p>
          <p className="text-sm mt-1">Click "Add Certificate" to get started.</p>
        </div>
      ) : (
        <SortableList
          items={certificates}
          onReorder={reorderCertificates}
          strategy="vertical"
          className="space-y-3"
        >
          {certificates.map((cert, index) => (
            <DraggableCertificateItem
              key={cert.id}
              cert={cert}
              index={index}
              isLast={index === certificates.length - 1}
              onRemove={() => removeCertificate(cert.id)}
            >
              <Field>
                <FieldLabel htmlFor={`cert-name-${cert.id}`}>
                  Certificate Name *
                </FieldLabel>
                <Input
                  id={`cert-name-${cert.id}`}
                  type="text"
                  value={cert.name}
                  onChange={(e) =>
                    updateCertificate(cert.id, { name: e.target.value })
                  }
                  placeholder="AWS Solutions Architect"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor={`cert-issuer-${cert.id}`}>
                  Issuing Organization *
                </FieldLabel>
                <Input
                  id={`cert-issuer-${cert.id}`}
                  type="text"
                  value={cert.issuer}
                  onChange={(e) =>
                    updateCertificate(cert.id, { issuer: e.target.value })
                  }
                  placeholder="Amazon Web Services"
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor={`cert-issue-date-${cert.id}`}>
                    Issue Date
                  </FieldLabel>
                  <Input
                    id={`cert-issue-date-${cert.id}`}
                    type="month"
                    value={cert.issueDate}
                    onChange={(e) =>
                      updateCertificate(cert.id, { issueDate: e.target.value })
                    }
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor={`cert-expiry-date-${cert.id}`}>
                    Expiry Date (Optional)
                  </FieldLabel>
                  <Input
                    id={`cert-expiry-date-${cert.id}`}
                    type="month"
                    value={cert.expiryDate || ''}
                    onChange={(e) =>
                      updateCertificate(cert.id, { expiryDate: e.target.value })
                    }
                  />
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor={`cert-credential-id-${cert.id}`}>
                  Credential ID (Optional)
                </FieldLabel>
                <Input
                  id={`cert-credential-id-${cert.id}`}
                  type="text"
                  value={cert.credentialId || ''}
                  onChange={(e) =>
                    updateCertificate(cert.id, { credentialId: e.target.value })
                  }
                  placeholder="ABC123XYZ"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor={`cert-credential-url-${cert.id}`}>
                  Credential URL (Optional)
                </FieldLabel>
                <Input
                  id={`cert-credential-url-${cert.id}`}
                  type="url"
                  value={cert.credentialUrl || ''}
                  onChange={(e) =>
                    updateCertificate(cert.id, { credentialUrl: e.target.value })
                  }
                  placeholder="https://verify.example.com/..."
                />
              </Field>
            </DraggableCertificateItem>
          ))}
        </SortableList>
      )}
    </div>
  )
}
