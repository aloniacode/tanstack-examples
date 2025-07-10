import { faker } from '@faker-js/faker'

export type CarColor = 'red' | 'blue' | 'green'

export interface Car {
  color: CarColor
  model: string
}

export interface FormData {
  name: string
  age: number
  email: string
  cars: Car[]
}

const makeNewFormData = (): FormData => ({
  name: faker.string.alpha(5),
  age: faker.number.int({ min: 18, max: 120 }),
  email: faker.internet.email(),
  cars: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => ({
    color: faker.helpers.arrayElement(['red', 'blue', 'green']),
    model: faker.vehicle.model(),
  })),
})

export async function fetchFormData(): Promise<FormData> {
  // Simulate fetching initial form data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(makeNewFormData())
    }, 1000)
  })
}
