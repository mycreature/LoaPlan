import BarrackList from '../components/barracks/BarrackList'
import GoldDashboard from '../components/GoldDashboard'
import RaidSelector from '../components/selector/RaidSelector'
import Block from '../components/ui/Block'
import { useExpeditionGoldData } from '../hook/useExpeditionGoldData'
import { useCharacterSelectionStore } from '../stores/selections/CharacterSelectionStore'

const WeeklyMobileLayout = () => {
  const expeditionGoldData = useExpeditionGoldData() || []
  const SelectedCharacterInfo = useCharacterSelectionStore((state) => state.SelectedCharacterInfo)

  return (
    <div className='min-h-screen bg-gray-600'>
      <main className='gap-[10px] p-[10px]'>
        <div className='grid grid-cols-1 place-items-center gap-y-[10px]'>
          <Block width={370} height={387}>
            <div className='flex h-full w-full flex-col gap-5 p-4'>
              <h3 className='leading-none font-extrabold text-black'> 원정대 리스트</h3>
              <BarrackList />
            </div>
          </Block>
          <Block width={370} height={299}>
            <div className='flex h-full w-full flex-col gap-5 px-4 pt-4 pb-2'>
              <h3 className='leading-none font-extrabold text-black'> 주간 골드 선택</h3>
              <div className='mx-auto flex h-full w-[322px] flex-col'>
                {expeditionGoldData.length !== 0 && SelectedCharacterInfo ? (
                  <RaidSelector SelectedCharacterInfo={SelectedCharacterInfo} slideWidth={338} />
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
          <Block width={370} height={270}>
            <div className='flex h-full w-full flex-col gap-5 p-4'>
              <h3 className='leading-none font-extrabold text-black'> 주간 골드</h3>
              <GoldDashboard width={338} height={196} GoldData={expeditionGoldData} />
            </div>
          </Block>
          <Block width={370} height={324}></Block>
          <Block width={370} height={324}></Block>
        </div>
      </main>
    </div>
  )
}

export default WeeklyMobileLayout
