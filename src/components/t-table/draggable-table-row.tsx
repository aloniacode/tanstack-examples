import type { Person } from '@/mock/user'
import {
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { type Row } from '@tanstack/react-table'
import type { CSSProperties } from 'react'
import DraggableTableCell from './draggable-table-cell'

const DraggableTableRow = ({
  row,
  columnOrder,
}: {
  row: Row<Person>
  columnOrder: string[]
}) => {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.userId,
  })

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform), //let dnd-kit do its thing
    transition: transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : 0,
    position: 'relative',
  }
  return (
    // connect row ref to dnd-kit, apply important styles
    <div ref={setNodeRef} style={style} key={row.id} className="flex items-center hover:bg-accent w-fit">
      {row.getVisibleCells().map((cell) => (
        <SortableContext
          key={cell.id}
          items={columnOrder}
          strategy={horizontalListSortingStrategy}
        >
          <DraggableTableCell cell={cell} />
        </SortableContext>
      ))}
    </div>
  )
}

export default DraggableTableRow
