import type { Person } from '@/mock/user'
import {
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable'
import type { Table } from '@tanstack/react-table'
import { memo } from 'react'
import { TableBody, TableRow } from '../ui/table'
import DraggableTableCell from './draggable-table-cell'

export const DraggableTableBody = ({
  table,
  columnOrder,
}: {
  table: Table<Person>
  columnOrder: string[]
}) => {
  return (
    <TableBody>
      {table.getRowModel().rows.map((row) => (
        <TableRow key={row.id} className='flex w-fit'>
          {row.getVisibleCells().map((cell) => (
            <SortableContext
              key={cell.id}
              items={columnOrder}
              strategy={horizontalListSortingStrategy}
            >
              <DraggableTableCell cell={cell} />
            </SortableContext>
          ))}
        </TableRow>
      ))}
    </TableBody>
  )
}

export const MemoriedDraggableTableBody =  memo(
  DraggableTableBody,
  (prev, next) => prev.table.options.data === next.table.options.data,
)
