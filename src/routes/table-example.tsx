import TTable from '@/components/t-table'
import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute('/table-example')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col justify-center items-center h-full gap-2 overflow-x-scroll">
      <div className="text-2xl font-semibold">
        🚀使用Tanstack Table、Shadcn/ui、DnD-kit实现一个功能较为齐全的表格
      </div>
      <div className="w-1/2">
        本示例参考官网example进行结合，各个功能的具体实现请参考官网示例。目前支持列拖拽排序、列过滤、列可见性调整、列宽调整、前端分页、可编辑单元格。
      </div>
      <TTable />
    </div>
  )
}
