import Block from '../../components/ui/Block'
import MainInfo from '../../components/character/MainInfo'
import BarrackList from '../../components/barracks/BarrackList'
import MainCard from '../../components/character/MainCard'
import WeeklyGoldPreview from '../../components/Summary/WeeklyGoldPreview'
import GoldDistribution from '../../components/Summary/GoldDistribution'

const HomeMobileLayout = () => {
  return (
    <main className='grid w-full grid-cols-[1fr] space-y-[10px]'>
      <Block height={374} title='메인 정보'>
        <div className='grid grid-cols-[1fr_195px] items-center gap-6'>
          <MainCard height={254} />
          <MainInfo />
        </div>
      </Block>
      <Block height={387} title='원정대 리스트'>
        <BarrackList />
      </Block>
      <Block title='주간 골드 요약'>
        <WeeklyGoldPreview type={'mobile'} />
      </Block>
      <Block title='골드 분포'>
        <GoldDistribution type={'mobile'} />
      </Block>
    </main>
  )
}

export default HomeMobileLayout
