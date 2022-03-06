export interface Group {
  id: number
  description: string
  ownerId: number
  owner: {
    name: string
    thumbnail: any
  }
  service: {
    name: string
    thumbnail: any
  }
  createdAt?: string
  updatedAt?: string
}
