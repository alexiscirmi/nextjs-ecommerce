export const SectionContainer = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <section
      className='flex flex-wrap justify-evenly py-3 md:pt-10 pb-20 px-10'
      style={{ minHeight: '88vh' }}
    >
      {children}
    </section>
  )
}
