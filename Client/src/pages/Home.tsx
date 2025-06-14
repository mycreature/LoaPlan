import Block from '../components/ui/Block'
import CharTest from '../features/CharTest'

const Home = () => {
  return (
    <div className='min-h-screen bg-gray-600'>
      <main className='space-y-[10px] p-[10px]'>
        <div className='grid grid-cols-1 place-items-center gap-y-[10px] md:flex md:justify-center md:gap-x-[14px] lg:gap-x-[10px]'>
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
        <div className='hidden items-center justify-center gap-x-[10px] text-center md:flex'>
          <div className='grid grid-cols-2 gap-x-[23px] gap-y-[10px] lg:gap-x-[10px]'>
            {/* 보석 리스트 */}
            <div className='col-span-2 hidden lg:block'>
              <Block width={735} height={70} />
            </div>
            {/* 보석 리스트 (태블릿) */}
            <div className='col-span-2 hidden md:block lg:hidden'>
              <Block width={748} height={70} />
            </div>
            {/* 장비 리스트 */}
            <Block width={362.5} height={500} />
            {/* 장비 리스트 2 */}
            <Block width={362.5} height={500} />
          </div>
          {/* 아크패시브 */}
          <div className='hidden w-[259px] lg:block'>
            <Block width={259} height={580} />
          </div>
        </div>
        {/* 아크패시브 (태블릿) */}
        <div className='hidden w-full md:flex md:justify-center lg:hidden'>
          <Block width={748} height={240} />
        </div>
      </main>
    </div>
  )
}

export default Home
