export const SectionContainer = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <section
      className='flex flex-wrap justify-evenly py-3 md:py-10 px-10'
      style={{ minHeight: '88vh' }}
    >
      {children}
    </section>
  )
}
