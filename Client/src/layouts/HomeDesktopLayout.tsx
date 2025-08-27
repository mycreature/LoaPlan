import MainCard from '../components/character/MainCard'
import Block from '../components/ui/Block'
import MainInfo from '../components/character/MainInfo'
import BarrackList from '../components/barracks/BarrackList'
import SummaryPreview from '../components/Summary/SummaryPreview'

const HomeDesktopLayout = () => {
  return (
    <main className='space-y-[10px] p-[10px]'>
      {/* 첫번째열 원정대 간략 정보 */}
      <div className='flex justify-center gap-x-[10px] gap-y-[10px]'>
        <div className='대표 캐릭터 이미지'>
          <Block width={250} height={387} darkColor='bg-[#15181D]' lightColor='bg-[#15181D]'>
            <MainCard />
          </Block>
        </div>
        <div className='캐릭터 정보'>
          <Block width={276} height={387}>
            <div className='flex h-full w-full flex-col gap-5 p-4'>
              <h3 className='leading-none font-extrabold text-black'> 메인 정보</h3>
              <MainInfo />
            </div>
          </Block>
        </div>
        <div className='배럭 리스트 (메인 캐릭터 제외)'>
          <Block width={458} height={387}>
            <div className='flex h-full w-full flex-col gap-5 p-4'>
              <h3 className='leading-none font-extrabold text-black'>원정대 리스트</h3>
              <BarrackList />
            </div>
          </Block>
        </div>
      </div>
      <div className='flex justify-center'>
        <div className='주간 골드 요약'>
          <Block width={1004} height={270}>
            <div className='flex h-full w-full flex-col gap-4 px-13 pt-4 pb-5'>
              <h3 className='leading-none font-extrabold text-black'>주간 골드 요약</h3>
              <SummaryPreview />
            </div>
          </Block>
        </div>
      </div>
    </main>
  )
}

export default HomeDesktopLayout
