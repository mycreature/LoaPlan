import BarrackList from '../components/barracks/BarrackList'
import GoldDashboard from '../components/GoldDashboard'
import RaidSelector from '../components/selector/RaidSelector'
import Block from '../components/ui/Block'
import { useExpeditionGoldData } from '../hook/useExpeditionGoldData'
import useLoaData from '../hook/useLoaData'
import { useCharacterSelectionStore } from '../stores/selections/CharacterSelectionStore'

const WeeklyGold = () => {
  useLoaData()
  const expeditionGoldData = useExpeditionGoldData() || []
  const SelectedCharacterInfo = useCharacterSelectionStore((state) => state.SelectedCharacterInfo)

  return (
    <div className='min-h-screen bg-gray-600 pt-[50px]'>
      <main className='space-y-[10px] p-[10px]'>
        <div className='flex justify-center gap-x-[10px]'>
          <Block width={300} height={385}>
            <div className='h-full w-full p-3'>
              <BarrackList islevel={false} />
            </div>
          </Block>
          <Block width={694} height={300}>
            <div className='h-full w-full gap-2 p-3'>
              <div className='flex h-full w-full flex-col gap-2'>
                <h3 className='font-extrabold text-black'>주간 골드 선택</h3>
                {expeditionGoldData.length !== 0 && SelectedCharacterInfo ? (
                  <RaidSelector SelectedCharacterInfo={SelectedCharacterInfo} />
                ) : (
                  <div className='flex h-full w-full flex-col items-center justify-center gap-1'>
                    <h3 className='text-black'>원정대 리스트를 선택해주세요</h3>
                    <h4 className='text-black opacity-60'>
                      (선택을 했었으면 장기 미접속으로 인한 정보 불러오기 실패)
                    </h4>
                  </div>
                )}
              </div>
            </div>
          </Block>
        </div>
        <div className='flex justify-center gap-x-[10px]'>
          <Block width={300} height={270}>
            <GoldDashboard width={270} height={250} GoldData={expeditionGoldData} />
          </Block>
          <Block width={694} height={270}></Block>
        </div>
      </main>
    </div>
  )
}

export default WeeklyGold
