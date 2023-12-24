import Image from 'next/image'
import main1 from '@/public/img/main1.webp'

export default function Home() {
  return (
    <main className='h-full w-full mt-20'>
      <section className='p-4'>
        <Image
          src={main1}
          alt='Banner'
          width='4050'
          height='2700'
          placeholder='blur'
          priority
          className='object-cover object-top'
          style={{ maxHeight: '80vh' }}
        />
      </section>
    </main>
  )
}
