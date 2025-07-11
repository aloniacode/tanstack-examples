import TTable from '@/components/t-table'
import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
export const Route = createFileRoute('/table-example')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation()
  return (
    <div className="flex relative flex-col justify-center items-center h-full gap-2 overflow-x-scroll">
      <div className="absolute top-4 left-4 flex items-center gap-2">
        Tanstack Table <code className="bg-accent px-1 rounded">v8.21.3</code>
      </div>
      <div className="text-3xl font-extrabold max-w-1/2">🚀{t('table-example.title')}</div>
      <div className="w-1/2">{t('table-example.subtitle')}</div>
      <TTable />
    </div>
  )
}
