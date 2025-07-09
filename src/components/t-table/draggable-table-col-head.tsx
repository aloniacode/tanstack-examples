import { cn } from '@/lib/utils'
import type { Person } from '@/mock/user'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { flexRender, type Header } from '@tanstack/react-table'
import type { CSSProperties } from 'react'

import { Grip, ListFilter } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import Filter from './filter'
const sortIconMap: Record<string, string> = {
  asc: ' 🔼',
  desc: ' 🔽',
}
const DraggableTableColHead = ({
  header,
}: {
  header: Header<Person, unknown>
}) => {
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useSortable({
      id: header.id,
    })
  const isFixedColumn = header.column.columnDef.meta?.isFixedColumn && true
  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: 'relative',
    transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
    transition: 'width transform 0.2s ease-in-out',
    whiteSpace: 'nowrap',
    width: `calc(var(--header-${header?.id}-size) * 1px)`,
    zIndex: isDragging ? 999 : 0,
    background: isDragging ? 'var(--ring)' : 'unset',
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="p-2 inline-flex justify-center items-center"
    >
      {header.isPlaceholder ? null : (
        <>
          {!isFixedColumn && (
            <button
              {...attributes}
              {...listeners}
              className="cursor-grab active:cursor-grabbing mr-2"
            >
              <Grip size={16} />
            </button>
          )}

          <div
            {...{
              className: header.column.getCanSort()
                ? 'cursor-pointer select-none'
                : '',
              onClick: header.column.getToggleSortingHandler(),
            }}
            className="flex-1 truncate text-center relative"
          >
            {flexRender(header.column.columnDef.header, header.getContext())}
            {!isFixedColumn && (
              <span>
                {sortIconMap[header.column.getIsSorted() as string] ?? null}
              </span>
            )}
          </div>
          {header.column.getCanFilter() ? (
            <Popover>
              <PopoverTrigger asChild>
                <ListFilter size={16} className="cursor-pointer" />
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-2">
                <Filter column={header.column} />
              </PopoverContent>
            </Popover>
          ) : null}
        </>
      )}
      {!isFixedColumn && (
        <div
          {...{
            onDoubleClick: () => header.column.resetSize(),
            onMouseDown: header.getResizeHandler(),
            onTouchStart: header.getResizeHandler(),
            className: cn(
              'z-20 h-2/3 ml-2 w-0.5 bg-gray-300 cursor-col-resize select-none touch-none',
              header.column.getIsResizing() ? 'bg-purple-800' : '',
            ),
          }}
        />
      )}
    </div>
  )
}

export default DraggableTableColHead
