export interface ProductInterface {
  id: string
  category: string
  description: string
  image: string
  name: string
  price: number
  stock: number
}

export interface CartInterface {
  quantity: number
  image: string
  name: undefined | string
  id: string
  price: undefined | number
}
