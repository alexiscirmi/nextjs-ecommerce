'use client'

import { useParams } from 'next/navigation'

export default function ProductDetails() {
  const params = useParams<{ id: string }>()
  return <section>{params.id}</section>
}
