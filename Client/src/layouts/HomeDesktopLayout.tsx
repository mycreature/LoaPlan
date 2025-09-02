import Block from '../components/ui/Block'
import MainInfo from '../components/character/MainInfo'
import BarrackList from '../components/barracks/BarrackList'
import SummaryPreview from '../components/Summary/SummaryPreview'
import MainCard from '../components/character/MainCard'

const HomeDesktopLayout = () => {
  return (
    <main className='flex flex-col gap-[10px]'>
      <div className='flex gap-[10px]'>
        <Block title='메인 정보' height={387}>
          <div className='flex gap-7'>
            <MainCard height={254} width={258} />
            <MainInfo />
          </div>
        </Block>
        <Block title='원정대 리스트' width={458} height={387}>
          <BarrackList />
        </Block>
      </div>
      <Block height={270} title='주간 골드 요약' className='col-span-2'>
        <SummaryPreview />
      </Block>
    </main>
  )
}

export default HomeDesktopLayout
