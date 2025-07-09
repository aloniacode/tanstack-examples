import type { Person } from '@/mock/user'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { flexRender, type Cell } from '@tanstack/react-table'
import type { CSSProperties } from 'react'
import { TableCell } from '../ui/table'

const DragAlongCell = ({ cell }: { cell: Cell<Person, unknown> }) => {
  const { isDragging, setNodeRef, transform } = useSortable({
    id: cell.column.id,
  })

  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: 'relative',
    transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
    transition: 'width transform 0.2s ease-in-out',
    width: `calc(var(--col-${cell.column.id}-size) * 1px)`,
    zIndex: isDragging ? 999 : 0,
    background: isDragging ? 'var(--ring)' : 'unset',
  }

  return (
    <TableCell style={style} ref={setNodeRef} className="p-2 truncate">
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </TableCell>
  )
}

export default DragAlongCell
