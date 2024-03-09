import Image from 'next/image'
import main1 from '@/public/img/main1.webp'
import main2 from '@/public/img/main2.webp'
import main3 from '@/public/img/main3.webp'

export default function Home() {
  return (
    <>
      <section className='p-4 pt-1'>
        <Image
          src={main1}
          alt='Fashion model banner'
          width='4050'
          height='2700'
          placeholder='blur'
          priority
          quality='90'
          className='object-cover object-top'
          style={{ height: '80vh' }}
        />
      </section>

      <section className='md:grid md:grid-cols-2'>
        <div className='p-4'>
          <Image
            src={main2}
            alt='Clothes photo'
            width='1024'
            height='1024'
            placeholder='blur'
            className='object-cover'
            style={{ height: '60vh' }}
          />
        </div>

        <div className='p-4'>
          <Image
            src={main3}
            alt='Clothes photo'
            width='2000'
            height='1333'
            placeholder='blur'
            className='object-cover object-top'
            style={{ height: '60vh' }}
          />
        </div>
      </section>
    </>
  )
}
