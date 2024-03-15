'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { type ProductInterface } from '@/types'
import { SectionContainer } from '@/app/components/section-container/section-container'
import { Spinner } from '@/app/components/spinner/spinner'

interface ParamsInterface {
  params: {
    id: string
  }
}

export default function ProductDetails({ params }: ParamsInterface) {
  const [product, setProduct] = useState<ProductInterface | undefined>(
    undefined
  )
  const [loading, setLoading] = useState(true)
  const { id } = params

  useEffect(() => {
    const getProduct = async () => {
      const docRef = doc(db, 'items', id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const productData = docSnap.data() as ProductInterface
        setProduct(productData)
      }

      setLoading(true)
    }
    getProduct()
  }, [id])

  return (
    <SectionContainer>
      {!product ? <Spinner loadingScreen={true} /> : product.name}
    </SectionContainer>
  )
}
