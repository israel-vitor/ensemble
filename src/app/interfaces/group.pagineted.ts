export interface GroupPagineted {
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
    price: number,
    usersLeft: number
}
  