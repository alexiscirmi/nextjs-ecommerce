'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase/firebase'
import { doc, getDoc } from 'firebase/firestore'
import Image from 'next/image'
import { SectionContainer } from '@/app/components/section-container/section-container'
import { Spinner } from '@/app/components/spinner/spinner'
import { type ProductInterface } from '@/types'

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
      {!product ? (
        <Spinner loadingScreen={true} />
      ) : (
        <article className='w-full grid md:grid-cols-2 px-10'>
          <Image
            src={product.image}
            alt={`${product.name} image`}
            width='288'
            height='288'
            className='h-fit justify-self-center md:justify-self-start'
          />
          <div className='md:text-right pt-5 md:pt-0'>
            <h1 className='text-2xl pb-4'>{product.name}</h1>
            <p className='text-justify pb-4'>{product.description}</p>
            <p className='text-3xl font-bold pb-4'>U$S {product.price}</p>
          </div>
        </article>
      )}
    </SectionContainer>
  )
}
