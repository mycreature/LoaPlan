import BarrackList from '../components/barracks/BarrackList'
import GoldDashboard from '../components/GoldDashboard'
import RaidSelector from '../components/selector/RaidSelector'
import Block from '../components/ui/Block'
import { useExpeditionGoldData } from '../hook/useExpeditionGoldData'
import { useCharacterSelectionStore } from '../stores/selections/CharacterSelectionStore'
import BarChartComponent from '../components/charts/BarChart'
import SingleBarChartComponent from '../components/charts/SingleBarChart'

const WeeklyDesktopLayout = () => {
  const expeditionGoldData = useExpeditionGoldData() || []
  const SelectedCharacterInfo = useCharacterSelectionStore((state) => state.SelectedCharacterInfo)

  return (
    <main className='flex justify-center gap-[10px] space-y-[10px]'>
      <div className='flex flex-col gap-[10px]'>
        <Block width={300} height={387} title='원정대 리스트'>
          <BarrackList />
        </Block>
        <Block width={300} height={270} title='주간 골드'>
          <GoldDashboard height={196} GoldData={expeditionGoldData} />
        </Block>
      </div>
      <div className='flex flex-col gap-[10px]'>
        <Block width={694} height={299} title='주간 골드 선택'>
          <div className='flex h-full w-full flex-col'>
            {expeditionGoldData.length !== 0 && SelectedCharacterInfo ? (
              <RaidSelector SelectedCharacterInfo={SelectedCharacterInfo} />
            ) : (
              <div className='flex h-full flex-col items-center justify-center gap-1'>
                <h3 className='text-black'>원정대 리스트를 선택해주세요</h3>
                <h4 className='text-black opacity-60'>
                  (또는 장기 미접속으로 인한 정보 불러오기 실패)
                </h4>
              </div>
            )}
          </div>
        </Block>
        <div className='flex gap-[10px]'>
          <Block width={342} height={358} title='골드 차트'>
            <BarChartComponent data={expeditionGoldData} />
          </Block>
          <Block width={342} height={358} title='주차별 골드 예상치'>
            <SingleBarChartComponent data={expeditionGoldData} />
          </Block>
        </div>
      </div>
    </main>
  )
}

export default WeeklyDesktopLayout
