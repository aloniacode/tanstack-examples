import { faker } from '@faker-js/faker'

export interface ListItem {
  id: string
  name: string
  imageUrl: string
  imageSize: number
  size: number
}

function makeNewListItem(): ListItem {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    imageUrl: faker.image.urlPicsumPhotos({ width: 300, height: 300 }),
    imageSize: 60,
    size: faker.number.int({ min: 150, max: 200 }),
  }
}

function generateItems(count: number): ListItem[] {
  return Array.from({ length: count }, makeNewListItem)
}

function fetchServerPage(
  limit: number,
  offset: number,
): Promise<{ data: ListItem[]; nextOffset: number }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const items = generateItems(limit).map((item, index) => ({
        ...item,
        id: `${item.id}-${offset + index}`,
      }))
      resolve({
        data: items,
        nextOffset: offset + limit,
      })
    }, 1000)
  })
}

export default fetchServerPage
