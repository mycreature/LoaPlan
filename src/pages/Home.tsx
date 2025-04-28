import Block from '../components/Block'

const Home = () => {
  return (
    <div className='min-h-screen bg-gray-600'>
      <main className='px-[10px] pt-[10px] pb-5'>
        <div className='grid grid-cols-1 place-items-center items-center justify-center space-y-[10px] pb-[10px] md:flex md:justify-center md:space-x-[10px] md:pb-0 md:text-center'>
          {/* 캐릭터 이미지 */}
          <div className='hidden lg:block'>
            <Block width={250} height={300} />
          </div>
          {/* 캐릭터 정보 */}
          <div className='hidden md:block'>
            <Block width={276} height={300} />
          </div>
          {/* 캐릭터 정보 (모바일) */}
          <div className='block md:hidden'>
            <Block width={370} height={300} />
          </div>
          {/* 배럭 리스트 */}
          <div className='hidden md:block'>
            <Block width={458} height={300} />
          </div>
          {/* 배럭 리스트 (모바일) */}
          <div className='block md:hidden'>
            <Block width={370} height={300} />
          </div>
        </div>
        <div className='flex items-center justify-center space-x-[10px] text-center'>
          <div className='grid min-w-[735px] grid-cols-2 gap-[10px]'>
            {/* 보석 리스트 */}
            <div className='col-span-2'>
              <Block width={735} height={70} />
            </div>
            {/* 장비 리스트 */}
            <Block width={362.5} height={500} />
            {/* 장비 리스트 2 */}
            <Block width={362.5} height={500} />
          </div>
          {/* 아크패시브 */}
          <div className='w-[259px]'>
            <Block width={259} height={580} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
