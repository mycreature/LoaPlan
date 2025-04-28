import Block from '../components/Block'

const Home = () => {
  return (
    <div className='min-h-screen bg-gray-600'>
      <main className='mx-[10px] pt-[10px] pb-5'>
        <div className='flex items-center justify-center space-x-[10px] text-center'>
          <Block width={250} height={300} />
          <Block width={276} height={300} />
          <Block width={458} height={300} />
        </div>
        <div className='flex items-center justify-center space-x-[10px] pt-[10px] text-center'>
          <div className='grid min-w-[735px] grid-cols-2 gap-[10px]'>
            <div className='col-span-2'>
              <Block width={735} height={70} />
            </div>
            <Block width={362.5} height={500} />
            <Block width={362.5} height={500} />
          </div>
          <div className='w-[259px]'>
            <Block width={259} height={580} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
