export interface Group {
  id?: number
  name?: string
  description?: string
  ownerId?: number
  planId?: number
  serviceId?: number
  owner?: {
    name: string
    thumbnail: any
  }
  service?: {
    name: string
    thumbnail: any
  }
  createdAt?: string
  updatedAt?: string
}
