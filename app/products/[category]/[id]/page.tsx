interface ParamsInterface {
  params: {
    id: string
  }
}

export default function ProductDetails({ params }: ParamsInterface) {
  const { id } = params
  return <section>{id}</section>
}
