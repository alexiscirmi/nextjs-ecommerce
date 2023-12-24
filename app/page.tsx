import Image from 'next/image'

export default function Home() {
  return (
    <main className='h-full w-full mt-20'>
      <section className='p-4'>
        <Image
          src='https://firebasestorage.googleapis.com/v0/b/anverso-45437.appspot.com/o/main1.webp?alt=media&token=feacd094-47f9-4e3e-b2ed-291c36b65c3d'
          alt='Banner'
          width='1920'
          height='1280'
          placeholder='empty'
          className='object-cover'
          style={{ maxHeight: '80vh' }}
        />
      </section>
    </main>
  )
}
