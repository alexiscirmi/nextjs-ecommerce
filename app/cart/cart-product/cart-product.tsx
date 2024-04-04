import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { Spinner } from '@/app/components/spinner/spinner'
import Image from 'next/image'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

interface ProductInterface {
  quantity: number
  image: string | StaticImport
  name: undefined | string
  id: string
  price: undefined | number
}

export const CartProduct: React.FC<ProductInterface> = ({ id, quantity }) => {
  const [product, setProduct] = useState<undefined | ProductInterface>(
    undefined
  )

  useEffect(() => {
    const getProduct = async () => {
      const docRef = doc(db, 'items', id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const productData = docSnap.data() as ProductInterface
        setProduct(productData)
      }
    }

    getProduct()
  }, [id])

  if (!product) {
    return (
      <div className='flex justify-center items-center'>
        <Spinner loadingScreen={false} />
      </div>
    )
  } else {
    return (
      <div className='grid grid-cols-5 items-center'>
        <Image
          src={product.image}
          height='144'
          width='144'
          alt={`${product.name} image`}
        />
        <h2>{product.name}</h2>
        <span>$ {product.price}</span>
        <span>{quantity}u</span>
        <span>$ {product.price && product.price * quantity}</span>
      </div>
    )
  }
}
