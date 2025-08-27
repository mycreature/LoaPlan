import BarrackList from '../components/barracks/BarrackList'
import SingleBarChartComponent from '../components/charts/SingleBarChart'
import BarChartComponent from '../components/charts/BarChart'
import GoldDashboard from '../components/GoldDashboard'
import RaidSelector from '../components/selector/RaidSelector'
import Block from '../components/ui/Block'
import { useExpeditionGoldData } from '../hook/useExpeditionGoldData'
import { useCharacterSelectionStore } from '../stores/selections/CharacterSelectionStore'

const WeeklyTabletLayout = () => {
  const expeditionGoldData = useExpeditionGoldData() || []
  const SelectedCharacterInfo = useCharacterSelectionStore((state) => state.SelectedCharacterInfo)

  return (
    <div className='min-h-screen bg-gray-600'>
      <main className='flex flex-col items-center justify-center gap-[10px] p-[10px]'>
        <Block width={748} height={299}>
          <div className='flex h-full w-full flex-col gap-5 px-[43px] pt-4 pb-2'>
            <h3 className='leading-none font-extrabold text-black'> 주간 골드 선택</h3>
            <div className='flex h-full w-[662px] flex-col'>
              {expeditionGoldData.length !== 0 && SelectedCharacterInfo ? (
                <RaidSelector SelectedCharacterInfo={SelectedCharacterInfo} />
              ) : (
                <div className='flex h-full w-full flex-col items-center justify-center gap-1'>
                  <h3 className='text-black'>원정대 리스트를 선택해주세요</h3>
                  <h4 className='text-black opacity-60'>
                    (또는 장기 미접속으로 인한 정보 불러오기 실패)
                  </h4>
                </div>
              )}
            </div>
          </div>
        </Block>
        <div className='flex gap-[10px]'>
          <div className='flex flex-col gap-[10px]'>
            <Block width={300} height={387}>
              <div className='flex h-full w-full flex-col gap-5 p-4'>
                <h3 className='leading-none font-extrabold text-black'> 원정대 리스트</h3>
                <BarrackList />
              </div>
            </Block>
            <Block width={300} height={270}>
              <div className='flex h-full w-full flex-col gap-5 p-4'>
                <h3 className='leading-none font-extrabold text-black'> 주간 골드</h3>
                <GoldDashboard width={268} height={250} GoldData={expeditionGoldData} />
              </div>
            </Block>
          </div>
          <div className='flex flex-col gap-[10px]'>
            <Block width={439} height={329}>
              <div className='flex h-full w-full flex-col gap-5 p-4'>
                <h3 className='leading-none font-extrabold text-black'> 골드 차트</h3>
                <BarChartComponent data={expeditionGoldData} />
              </div>
            </Block>
            <Block width={439} height={328}>
              <div className='flex h-full w-full flex-col gap-5 p-4'>
                <h3 className='leading-none font-extrabold text-black'> 주차별 골드 예상치</h3>
                <SingleBarChartComponent data={expeditionGoldData} />
              </div>
            </Block>
          </div>
        </div>
      </main>
    </div>
  )
}

export default WeeklyTabletLayout
