'use client'

import { db } from '@/lib/firebase/firebase'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { Product } from './product/product'
import { Spinner } from '@/app/components/spinner/spinner'

interface ProductInterface {
  id: string
  name: string
  price: number
  image: string
  stock: number
}

interface ParamsInterface {
  params: {
    category: string
  }
}

export const ProductsContainer = ({ params }: ParamsInterface) => {
  const [loading, setLoading] = useState(true)
  const [list, setList] = useState<ProductInterface[]>([])

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
            price: doc.data().price,
            image: doc.data().image,
            stock: doc.data().stock,
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
            price: doc.data().price,
            image: doc.data().image,
            stock: doc.data().stock,
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
    if (list.length >= 3) {
      return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7'>
          {list.map((doc) => (
            <Product
              key={doc.id}
              id={doc.id}
              name={doc.name}
              price={doc.price}
              image={doc.image}
              stock={doc.stock}
            />
          ))}
        </div>
      )
    } else {
      return (
        <div className='flex flex-wrap gap-7'>
          {list.map((doc) => (
            <Product
              key={doc.id}
              id={doc.id}
              name={doc.name}
              price={doc.price}
              image={doc.image}
              stock={doc.stock}
            />
          ))}
        </div>
      )
    }
  }
}
