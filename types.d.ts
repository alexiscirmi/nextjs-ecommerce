export interface ProductInterface {
  id: string
  category: string
  description: string
  image: string
  name: string
  price: number
  stock: number
}

export interface ModalInterface {
  isOn: boolean
}

export interface OrdersInterface {
  date: string
  email: string
  id: string
  order: {
    map(
      arg0: (item: any) => import('react').JSX.Element
    ): import('react').ReactNode
    id: string
    quantity: number
  }
  paymentId: string
  total: number
  uid: string
}
