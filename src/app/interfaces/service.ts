import {Category} from "./category";

export interface Service {
  id?: number
  name?: string,
  thumbnail?: any
  category?: Category,
  plans?: Array<Plan>
}

interface Plan {
  id?: number
  name?: string
  description?: string
  price?: number,
  usersNumber?: number
}
