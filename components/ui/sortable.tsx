'use client'

import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
import { restrictToParentElement } from '@dnd-kit/modifiers'
import { GripVertical } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SortableItemProps {
  id: string
  children: React.ReactNode
  className?: string
}

export function SortableItem({ id, children, className }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        isDragging && 'opacity-50 z-50',
        className
      )}
    >
      {typeof children === 'function'
        ? (children as (props: { attributes: typeof attributes; listeners: typeof listeners; isDragging: boolean }) => React.ReactNode)({ attributes, listeners, isDragging })
        : children}
    </div>
  )
}

interface SortableHandleProps {
  attributes: Record<string, unknown>
  listeners: Record<string, unknown> | undefined
  className?: string
}

export function SortableHandle({ attributes, listeners, className }: SortableHandleProps) {
  return (
    <button
      {...attributes}
      {...listeners}
      className={cn(
        'cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded transition-colors touch-none',
        className
      )}
      type="button"
    >
      <GripVertical className="w-4 h-4 text-muted-foreground" />
    </button>
  )
}

interface SortableListProps<T extends { id: string }> {
  items: T[]
  onReorder: (items: T[]) => void
  children: React.ReactNode
  strategy?: 'vertical' | 'grid'
  className?: string
}

export function SortableList<T extends { id: string }>({
  items,
  onReorder,
  children,
  strategy = 'vertical',
  className,
}: SortableListProps<T>) {
  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Require 8px movement before drag starts
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    setActiveId(null)

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id)
      const newIndex = items.findIndex((item) => item.id === over.id)
      onReorder(arrayMove(items, oldIndex, newIndex))
    }
  }

  const sortingStrategy = strategy === 'grid' ? rectSortingStrategy : verticalListSortingStrategy

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToParentElement]}
    >
      <SortableContext items={items.map(i => i.id)} strategy={sortingStrategy}>
        <div className={className}>{children}</div>
      </SortableContext>
      <DragOverlay>
        {activeId ? (
          <div className="opacity-80 shadow-lg rounded-lg ring-2 ring-primary/50">
            {/* Placeholder for dragged item visual */}
            <div className="bg-muted/80 h-16 rounded-lg flex items-center justify-center text-muted-foreground text-sm">
              Dragging...
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
