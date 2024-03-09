export const MainTag = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='w-full text-center' style={{ minHeight: '88vh' }}>
      {children}
    </main>
  )
}
