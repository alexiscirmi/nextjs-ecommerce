interface ProductInterface {
  name: string
}

export const Product = ({ name }: ProductInterface) => {
  return (
    <div>
      <h2>{name}</h2>
    </div>
  )
}
