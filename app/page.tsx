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
          style={{ height: '80vh' }}
        />
      </section>
      <section className='md:grid md:grid-cols-2'>
        <div className='p-4'>
          <Image
            src={main1}
            alt=''
            width='4050'
            height='2700'
            className='object-cover object-top'
          />
        </div>
        <div className='p-4'>
          <Image
            src={main1}
            alt=''
            width='4050'
            height='2700'
            className='object-cover object-top'
          />
        </div>
      </section>
    </main>
  )
}
