interface ProductInterface {
  name: string
}

export const Product = ({ name }: ProductInterface) => {
  return (
    <div className='border w-72 h-96'>
      <h2>{name}</h2>
    </div>
  )
}
