import Block from '../../components/ui/Block'
import MainInfo from '../../components/character/MainInfo'
import BarrackList from '../../components/barracks/BarrackList'
import WeeklyGoldPreview from '../../components/Summary/WeeklyGoldPreview'
import MainCard from '../../components/character/MainCard'
import GoldDistribution from '../../components/Summary/GoldDistribution'

const HomeTabletLayout = () => {
  return (
    <main className='grid w-full grid-cols-[252px_1fr_198px] gap-[10px]'>
      <Block width={252} height={698} title='메인 정보' className='row-span-2'>
        <div className='flex flex-col gap-6'>
          <MainCard width={220} height={254} />
          <MainInfo />
        </div>
      </Block>

      <div className='md-lg:col-span-1 col-span-2'>
        <Block height={387} title='원정대 리스트'>
          <BarrackList />
        </Block>
      </div>

      <Block
        height={387}
        width={198}
        title='골드 분포'
        className='md-lg:static md-lg:visible invisible absolute'
      >
        <GoldDistribution type={'tablet'} />
      </Block>

      <div className='col-span-2'>
        <Block height={301} title='주간 골드 요약'>
          <WeeklyGoldPreview type={'tablet'} />
        </Block>
      </div>
    </main>
  )
}

export default HomeTabletLayout
