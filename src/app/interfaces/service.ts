import {Category} from "./category";
import {Plan} from "./plan";

export interface Service {
  id?: number
  name?: string
  thumbnail?: any
  categoryId?: number
  category?: Category
  plans?: Array<Plan>
}
