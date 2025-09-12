import { ContentsTime } from '../../components/efficiency/ContentsTime'
import TimeEfficiencyCharts from '../../components/efficiency/TimeEfficiencyCharts'
import Block from '../../components/ui/Block'
import { useEfficiencyData } from '../../hook/useEfficiencyData'
import useThemeStore from '../../stores/others/ThemeStore'

const TabletLayout = () => {
  // 레이드 , 전선, 가토 골드 정보를 가져옴
  const { raidData, FrontlineData, GuardianData } = useEfficiencyData()
  const darkMode = useThemeStore((state) => state.darkMode)

  const totalData = [...raidData, ...FrontlineData, ...GuardianData]

  return (
    <main className='grid w-full grid-cols-[1fr]'>
      <Block title='시간당 골드 획득량'>
        <div className='flex flex-col gap-3'>
          <ContentsTime />
          <div className={`rounded-lg border-3 ${darkMode ? 'border-black/20' : 'border-gray'}`}>
            <TimeEfficiencyCharts data={totalData} datakey='name' legend={false} aspect={2} />
          </div>
        </div>
      </Block>
    </main>
  )
}

export default TabletLayout
