import type { Person } from '@/mock/user'
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import type { Table } from '@tanstack/react-table'
import { memo, useMemo } from 'react'
import DraggableTableRow from './draggable-table-row'

export const DraggableTableBody = ({
  table,
  columnOrder,
  setData,
}: {
  table: Table<Person>
  columnOrder: string[]
  setData: (dispatch: Person[] | ((data: Person[]) => Person[])) => void
}) => {
  const dataIds = useMemo<UniqueIdentifier[]>(
    () => table.options.data.map(({ userId }) => userId),
    [table.options.data],
  )
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
  )
  // reorder columns after drag & drop
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      setData((data: Person[]) => {
        const oldIndex = dataIds.indexOf(active.id)
        const newIndex = dataIds.indexOf(over.id)
        return arrayMove(data, oldIndex, newIndex) //this is just a splice util
      })
    }
  }
  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
        {table.getRowModel().rows.map((row) => (
          <DraggableTableRow key={row.id} row={row} columnOrder={columnOrder} />
        ))}
      </SortableContext>
    </DndContext>
  )
}

export const MemoriedDraggableTableBody = memo(
  DraggableTableBody,
  (prev, next) => prev.table.options.data === next.table.options.data,
)
