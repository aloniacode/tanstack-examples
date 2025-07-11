import TForm from '@/components/t-form'
import { Button } from '@/components/ui/button'
import { useQueryClient } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/form-example')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  return (
    <div className="flex relative flex-col h-full gap-2">
      <div className="absolute top-4 left-4 flex items-center gap-2">
        Tanstack Form <code className="bg-accent px-1 rounded">v1.14.1</code>
      </div>
      <div className="text-center text-2xl font-semibold mt-10">
        🚀{t('form-example.title')}
      </div>
      <div className="flex justify-center">
        <Button
          onClick={() =>
            queryClient.refetchQueries({
              queryKey: ['formData'],
              exact: true,
            })
          }
        >
          {t('form-example.refetch')}
        </Button>
      </div>
      <TForm />
    </div>
  )
}
