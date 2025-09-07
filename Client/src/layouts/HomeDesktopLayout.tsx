import Block from '../components/ui/Block'
import MainInfo from '../components/character/MainInfo'
import BarrackList from '../components/barracks/BarrackList'
import WeeklyGoldPreview from '../components/Summary/WeeklyGoldPreview'
import MainCard from '../components/character/MainCard'
import GoldDistribution from '../components/Summary/GoldDistribution'

const HomeDesktopLayout = () => {
  return (
    <main className='flex flex-col gap-[10px]'>
      <div className='flex gap-[10px]'>
        <Block title='메인 정보' height={387} width={536}>
          <div className='flex gap-7'>
            <MainCard height={254} width={258} />
            <MainInfo />
          </div>
        </Block>
        <Block title='원정대 리스트' width={458} height={387}>
          <BarrackList />
        </Block>
      </div>

      <div className='flex gap-[10px]'>
        <Block height={270} width={370} title='골드 분포'>
          <GoldDistribution />
        </Block>
        <Block height={270} width={624} title='주간 골드'>
          <WeeklyGoldPreview type={'desktop'} />
        </Block>
      </div>
    </main>
  )
}

export default HomeDesktopLayout
