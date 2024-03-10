export const ProductsSectionTag = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <section
      className='flex flex-wrap gap-7 justify-evenly items-center p-10'
      style={{ minHeight: '88vh' }}
    >
      {children}
    </section>
  )
}
