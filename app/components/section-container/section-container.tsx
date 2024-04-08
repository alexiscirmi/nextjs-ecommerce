export const SectionContainer = ({
  children,
  className
}: {
  children: React.ReactNode
  className: string
}) => {
  return (
    <section
      className={`flex flex-wrap justify-evenly py-3 md:pt-10 pb-20 px-10 lg:px-28 xl:px-40 ${className}`}
      style={{ minHeight: '88vh' }}
    >
      {children}
    </section>
  )
}
