export const SectionContainer = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <section
      className='flex flex-wrap justify-evenly p-10'
      style={{ minHeight: '88vh' }}
    >
      {children}
    </section>
  )
}
