import Block from '../components/ui/Block'
import MainInfo from '../components/character/MainInfo'
import BarrackList from '../components/barracks/BarrackList'
import WeeklyGoldPreview from '../components/Summary/WeeklyGoldPreview'
import MainCard from '../components/character/MainCard'

const HomeTabletLayout = () => {
  return (
    <main className='flex gap-[10px]'>
      <Block width={252} height={698} title='메인 정보' className='row-span-2'>
        <div className='flex flex-col gap-6'>
          <MainCard width={220} height={254} />
          <MainInfo />
        </div>
      </Block>
      <div className='flex flex-col gap-[10px]'>
        <Block width={487} height={387} title='원정대 리스트'>
          <BarrackList />
        </Block>
        <Block width={487} height={301} title='주간 골드 요약'>
          <WeeklyGoldPreview viewport='tablet' />
        </Block>
      </div>
    </main>
  )
}

export default HomeTabletLayout
