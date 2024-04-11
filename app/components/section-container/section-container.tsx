export const SectionContainer = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <section
      className='flex flex-wrap py-3 md:pt-10 pb-20 px-10 lg:px-28 xl:px-40 justify-evenly'
      style={{ minHeight: '88vh' }}
    >
      {children}
    </section>
  )
}
