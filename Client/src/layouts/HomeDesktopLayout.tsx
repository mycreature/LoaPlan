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
          <Block width={250} height={360} darkColor='bg-[#15181D]' lightColor='bg-[#15181D]'>
            <MainCard />
          </Block>
        </div>
        <div className='캐릭터 정보'>
          <Block width={276} height={360}>
            <div className='flex h-full w-full flex-col gap-2 p-3'>
              <h3 className='font-extrabold text-black'> 메인 정보</h3>
              <MainInfo />
            </div>
          </Block>
        </div>
        <div className='배럭 리스트 (메인 캐릭터 제외)'>
          <Block width={458} height={360}>
            <BarrackList />
          </Block>
        </div>
      </div>
      {/* 두번째열 주간 골드 정보 */}
      <div className='flex justify-center'>
        <div className='justify-between'>
          <Block width={1004} height={270}>
            <SummaryPreview />
          </Block>
        </div>
      </div>
    </main>
  )
}

export default HomeDesktopLayout
