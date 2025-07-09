import { useSortable } from '@dnd-kit/sortable'
import { Grip } from 'lucide-react'

const DraggableTableRowHandleCell = ({ rowId }: { rowId: string }) => {
  const { attributes, listeners } = useSortable({
    id: rowId,
  })
  return (
    // Alternatively, you could set these attributes on the rows themselves
    <button
      {...attributes}
      {...listeners}
      className="cursor-grab active:cursor-grabbing"
    >
      <Grip size={16} />
    </button>
  )
}

export default DraggableTableRowHandleCell
