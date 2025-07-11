import { cn } from '@/lib/utils'
import fetchServerPage from '@/mock/list'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useVirtualizer } from '@tanstack/react-virtual'
import { RefreshCcw } from 'lucide-react'
import { useEffect, useRef } from 'react'

interface Props {
  orientation?: 'horizontal' | 'vertical'
  overscan?: number
}
const TList: React.FC<Props> = ({
  orientation = 'vertical',
  overscan = 10,
}) => {
  const {
    status,
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['list-data-fetch'],
    queryFn: (ctx) => fetchServerPage(10, ctx.pageParam),
    getNextPageParam: (lastGroup) => lastGroup.nextOffset,
    initialPageParam: 0,
  })
  const allData = data ? data.pages.flatMap((d) => d.data) : []
  const parentRef = useRef<HTMLDivElement>(null)
  const virtualizer = useVirtualizer({
    count: hasNextPage ? allData.length + 1 : allData.length,
    getScrollElement: () => parentRef.current,
    estimateSize: (i) => {
      if (i === allData.length) {
        return 150 // Loader item size
      }
      return allData.length > 0 ? allData[i].size : 150
    },
    overscan,
    horizontal: orientation === 'horizontal',
    paddingStart: 10,
    paddingEnd: 10,
  })

  useEffect(() => {
    const items = virtualizer.getVirtualItems()
    if (!items.length) return
    const lastItem = [...items][items.length - 1]
    if (
      lastItem.index >= allData.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage()
    }
  }, [
    virtualizer.getVirtualItems(),
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    allData.length,
  ])
  return (
    <>
      <div className="border rounded-md">
        <div className="border-b p-2 flex items-center gap-4">
          <span>Data num: {allData.length}</span>
          {status === 'error' && (
            <span className="text-red-500 truncate flex-1">
              {error.message}
            </span>
          )}
          {isFetchingNextPage && 'Loading next page data...'}
          {isFetching && (
            <RefreshCcw size={16} className="animate-spin ml-auto" />
          )}
        </div>
        <div ref={parentRef} className="h-100 w-200 overflow-auto">
          <div
            className="relative"
            style={{
              height:
                orientation === 'vertical'
                  ? `${virtualizer.getTotalSize()}px`
                  : '100%',
              width:
                orientation === 'horizontal'
                  ? `${virtualizer.getTotalSize()}px`
                  : '100%',
            }}
          >
            {virtualizer.getVirtualItems().map((virtualRow) => {
              const isLoaderItem = virtualRow.index > allData.length - 1
              const item = allData[virtualRow.index]
              if (isLoaderItem) {
                return (
                  <div
                    key="loaderItem"
                    className="text-center font-bold z-50"
                    style={{ height: '150px' }}
                  >
                    Loading more data...
                  </div>
                )
              }
              return (
                <div
                  key={item.id}
                  className={cn(
                    'absolute flex items-center gap-4 left-0 p-2 overflow-hidden right-0',
                    virtualRow.index % 2 === 0 ? 'bg-gray-100' : 'bg-white',
                  )}
                  style={{
                    height:
                      orientation === 'vertical' ? `${item.size}px` : '100%',
                    width:
                      orientation === 'vertical' ? '100%' : `${item.size}px`,
                    transform:
                      orientation === 'vertical'
                        ? `translateY(${virtualRow.start}px)`
                        : `translateX(${virtualRow.start}px)`,
                  }}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="rounded-md"
                    style={{
                      width: item.imageSize,
                      height: item.imageSize,
                    }}
                    loading="lazy"
                  />
                  <div>
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-sm text-gray-500">
                      {orientation === 'vertical' ? 'Height' : 'Width'}:{' '}
                      {item.size}
                      px
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
export default TList
