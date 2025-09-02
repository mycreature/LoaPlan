import Block from '../components/ui/Block'
import MainInfo from '../components/character/MainInfo'
import BarrackList from '../components/barracks/BarrackList'
import SummaryPreview from '../components/Summary/SummaryPreview'
import MainCard from '../components/character/MainCard'

const HomeDesktopLayout = () => {
  return (
    <main className='flex flex-col space-y-[10px]'>
      {/* 첫번째열 원정대 간략 정보 */}
      <div className='flex justify-center gap-x-[10px] gap-y-[10px]'>
        <div className='메인 정보'>
          <Block width={536} height={387}>
            <div className='flex h-full w-full flex-col gap-5 p-4'>
              <h3 className='leading-none font-extrabold text-black'> 메인 정보</h3>
              <div className='flex gap-7'>
                <MainCard width={258} height={254} />
                <MainInfo />
              </div>
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
            <div className='flex h-full w-full flex-col gap-5 p-4'>
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
