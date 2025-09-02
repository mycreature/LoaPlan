import Block from '../components/ui/Block'
import MainInfo from '../components/character/MainInfo'
import BarrackList from '../components/barracks/BarrackList'
import SummaryPreview from '../components/Summary/WeeklyGoldPreview'

const HomeTabletLayout = () => {
  return (
    <main className='flex flex-col space-y-[10px]'>
      {/* 첫번째열 원정대 간략 정보 */}
      <div className='flex justify-center gap-x-[10px] gap-y-[10px]'>
        <div className='캐릭터 정보'>
          <Block width={276} height={387} title='메인 정보'>
            <MainInfo />
          </Block>
        </div>
        <div className='배럭 리스트 (메인 캐릭터 제외)'>
          <Block width={458} height={387} title='원정대 리스트'>
            <BarrackList />
          </Block>
        </div>
      </div>
      <div className='flex justify-center'>
        <div className='주간 골드 요약'>
          <Block width={748} height={270} title='주간 골드 요약'>
            <SummaryPreview viewport='tablet' />
          </Block>
        </div>
      </div>
    </main>
  )
}

export default HomeTabletLayout
