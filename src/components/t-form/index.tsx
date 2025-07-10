import { fetchFormData, type CarColor, type FormData } from '@/mock/form'
import { Field, useForm } from '@tanstack/react-form'
import { useQuery } from '@tanstack/react-query'
import { Loader2Icon, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import * as zod from 'zod'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { ScrollArea } from '../ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
const TForm: React.FC = () => {
  const { t } = useTranslation()
  const { data, isFetching } = useQuery({
    queryKey: ['formData'],
    queryFn: fetchFormData,
  })
  const [dataInfo, setDataInfo] = useState<Partial<FormData>>(data || {})

  const form = useForm({
    defaultValues: {
      name: data?.name || '',
      age: data?.age || 16,
      email: data?.email || '',
      cars: data?.cars || [],
    },
    // simulate async validation
    onSubmit: async (values) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          setDataInfo(values.value)
          resolve('Validation success!')
        }, 2000)
      })
    },
  })

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    form.handleSubmit()
    form.handleSubmit()
  }

  useEffect(() => {
    if (data) {
      setDataInfo(data)
      form.setFieldValue('name', data.name || '')
      form.setFieldValue('age', data.age || 16)
      form.setFieldValue('email', data.email || '')
      form.setFieldValue('cars', data.cars || [])
    }
  }, [data])
  return (
    <div className="h-full flex gap-2 p-2 overflow-hidden">
      <ScrollArea className="flex-1 min-h-0 border relative shadow p-4 rounded-md">
        <form onSubmit={handleFormSubmit}>
          {isFetching && (
            <div className="absolute flex justify-center items-center top-0 left-0 right-0 h-full bg-accent opacity-50">
              Loading
            </div>
          )}
          <form.Field
            name="name"
            validators={{
              onChange: zod
                .string()
                .min(3, { message: 'Name must be at least 3 characters long' })
                .regex(/^[a-zA-Z]+$/, {
                  message: 'Name can only contain letters',
                }),
            }}
          >
            {(field) => (
              <div className="flex flex-col gap-2 mb-2">
                <label htmlFor="name" className="font-bold">
                  Name
                </label>
                <Input
                  id={field.name}
                  name={Field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors.length > 0 &&
                  field.state.meta.errors.map((errorObj, index) => (
                    <span key={index} className="text-red-500">
                      {errorObj!.message}
                    </span>
                  ))}
              </div>
            )}
          </form.Field>
          <form.Field name="age">
            {(field) => (
              <div className="flex flex-col gap-2 mb-2">
                <label htmlFor="age" className="font-bold">
                  Age
                </label>
                <Input
                  id={field.name}
                  name={Field.name}
                  value={field.state.value}
                  type="number"
                  min={16}
                  max={120}
                  onChange={(e) => field.handleChange(parseInt(e.target.value))}
                />
              </div>
            )}
          </form.Field>
          <form.Field
            name="email"
            validators={{ onChange: zod.email({ error: 'Invalid email' }) }}
          >
            {(field) => (
              <div className="flex flex-col gap-2 mb-2">
                <label htmlFor="email" className="font-bold">
                  Email
                </label>
                <Input
                  id={field.name}
                  name={Field.name}
                  value={field.state.value}
                  type="email"
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors.length > 0 &&
                  field.state.meta.errors.map((errorObj, index) => (
                    <span key={index} className="text-red-500">
                      {errorObj!.message}
                    </span>
                  ))}
              </div>
            )}
          </form.Field>
          <form.Field name="cars" mode="array">
            {(field) => (
              <div className="flex flex-col gap-2 mb-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="cars" className="font-bold">
                    Cars
                  </label>
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      e.preventDefault()
                      field.pushValue({ color: 'red', model: '' })
                    }}
                  >
                    <Plus size={16} /> Add Car
                  </Button>
                </div>
                {field.state.value.map((_car, index) => (
                  <div
                    key={index}
                    className="flex p-2 border rounded-md shadow border-dashed border-foreground flex-col gap-2 mb-2"
                  >
                    <form.Field name={`cars[${index}].color`}>
                      {(subField) => (
                        <div className="flex flex-col gap-2">
                          <label htmlFor={subField.name} className="font-bold">
                            Color
                          </label>
                          <Select
                            name={subField.name}
                            value={subField.state.value}
                            onValueChange={(v) =>
                              subField.handleChange(v as CarColor)
                            }
                          >
                            <SelectTrigger className="w-1/4">
                              <SelectValue
                                id={subField.name}
                                placeholder="Select a color"
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="red">Red</SelectItem>
                              <SelectItem value="blue">Blue</SelectItem>
                              <SelectItem value="green">Green</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </form.Field>
                    <form.Field
                      name={`cars[${index}].model`}
                      validators={{
                        onChange: zod
                          .string({ error: 'Model is required' })
                          .min(3, {
                            message: 'Model must be at least 3 characters long',
                          }),
                      }}
                    >
                      {(subField) => (
                        <div className="flex flex-col gap-2">
                          <label htmlFor={subField.name} className="font-bold">
                            Model
                          </label>
                          <Input
                            id={subField.name}
                            name={subField.name}
                            value={subField.state.value}
                            onChange={(e) =>
                              subField.handleChange(e.target.value)
                            }
                          />
                          {subField.state.meta.errors.length > 0 &&
                            subField.state.meta.errors.map(
                              (errorObj, index) => (
                                <span key={index} className="text-red-500">
                                  {errorObj!.message}
                                </span>
                              ),
                            )}
                        </div>
                      )}
                    </form.Field>
                    <Button
                      variant="destructive"
                      onClick={(e) => {
                        e.preventDefault()
                        field.removeValue(index)
                      }}
                      className="mt-2"
                    >
                      Remove Car
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </form.Field>
          <div className="flex justify-end gap-4 mt-2">
            <Button
              variant="outline"
              onClick={(e) => {
                e.preventDefault()
                form.reset()
              }}
            >
              Reset
            </Button>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button
                  disabled={!canSubmit}
                  aria-disabled={!canSubmit}
                  onClick={() => form.handleSubmit()}
                >
                  {isSubmitting && <Loader2Icon className="animate-spin" />}
                  Submit
                </Button>
              )}
            </form.Subscribe>
          </div>
        </form>
      </ScrollArea>
      <div className="flex-1">
        <div className="font-bold mb-2">{t('form-example.data-title')}:</div>
        <pre className="flex-1 p-2 bg-secondary rounded-md">
          <code>{JSON.stringify(dataInfo, null, 2)}</code>
        </pre>
      </div>
    </div>
  )
}
export default TForm
