import { db } from '@/lib/firebase/firebase'
import { doc, getDoc } from 'firebase/firestore'

interface ItemInterface {
  id: string
  quantity: number
}

export const Item = ({ id, quantity }: ItemInterface) => {
  // const docRef = doc(db, 'items', product.id)
  // const docSnap = await getDoc(docRef)

  return <li>{id}</li>
}
