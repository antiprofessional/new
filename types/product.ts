export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  verified?: boolean
  rating?: number
  reviews?: number
}
