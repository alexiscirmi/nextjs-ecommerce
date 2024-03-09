'use client'

import { db } from '@/lib/firebase/firebase'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { Product } from './product/product'
import { Spinner } from '@/app/components/spinner/spinner'

interface Product {
  id: string
  name: string
}

interface Params {
  params: {
    category: string
  }
}

export const ProductsContainer = ({ params }: Params) => {
  const [loading, setLoading] = useState(true)
  const [list, setList] = useState<Product[]>([])

  useEffect(() => {
    const getProducts = async () => {
      try {
        if (params.category === '') {
          const querySnapshot = await getDocs(
            query(collection(db, 'items'), orderBy('name', 'asc'))
          )
          const products = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
            ...doc.data()
          }))
          setList(products)
          setLoading(false)
        } else {
          const querySnapshot = await getDocs(
            query(
              collection(db, 'items'),
              where('categoryId', '==', params.category),
              orderBy('name', 'asc')
            )
          )
          const products = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
            ...doc.data()
          }))
          setList(products)
          setLoading(false)
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
    getProducts()
  }, [params.category])

  if (loading) {
    return <Spinner />
  } else {
    return list.map((doc) => <Product key={doc.id} name={doc.name} />)
  }
}
