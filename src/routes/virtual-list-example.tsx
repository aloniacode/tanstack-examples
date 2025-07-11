import TList from '@/components/t-list'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/virtual-list-example')({
  component: RouteComponent,
})

function RouteComponent() {
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>(
    'vertical',
  )
  const [overscan, setOverscan] = useState<number>(10)
  const { t } = useTranslation()

  return (
    <div className="flex relative flex-col justify-center items-center h-full gap-4 overflow-x-scroll">
      <div className="absolute top-4 left-4 flex items-center gap-2">
        Tanstack Virtual
        <code className="bg-accent px-1 rounded">v3.13.12</code>
      </div>
      <div className="text-3xl font-extrabold max-w-1/2">
        🚀{t('virtual-list-example.title')}
      </div>
      <div className="flex items-center w-1/2">
        <Button
          className="ml-auto"
          variant="outline"
          onClick={() =>
            setOrientation((prev) =>
              prev === 'vertical' ? 'horizontal' : 'vertical',
            )
          }
        >
          Toggle Orientation
        </Button>
        <Select
          defaultValue="10"
          onValueChange={(value) => setOverscan(Number(value))}
        >
          <SelectTrigger className="ml-2">
            Overscan
            <SelectValue placeholder="Ovserscan" />
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 20, 50].map((value) => (
              <SelectItem key={value} value={String(value)}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <TList orientation={orientation} overscan={overscan} />
    </div>
  )
}
