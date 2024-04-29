'use server'

import { Client } from 'square'
import { randomUUID } from 'crypto'
import { db } from '@/lib/firebase/firebase'
import { doc, getDoc } from 'firebase/firestore'

BigInt.prototype.toJSON = function () {
  return this.toString()
}

const { paymentsApi } = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: 'sandbox'
})

export async function submitPayment(sourceId, cartProducts) {
  try {
    let cartTotal = 0

    for (const product of cartProducts) {
      const docRef = doc(db, 'items', product.id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const productData = docSnap.data()
        if (productData.price) {
          cartTotal += productData.price * product.quantity
        }
      }
    }

    const { result } = await paymentsApi.createPayment({
      idempotencyKey: randomUUID(),
      sourceId,
      amountMoney: {
        currency: 'USD',
        amount: cartTotal
      }
    })
    return result
  } catch (error) {
    console.log(error)
  }
}
