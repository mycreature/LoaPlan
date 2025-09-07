import TimeEfficiencyCharts from '../../components/efficiency/TimeEfficiencyCharts'
import Block from '../../components/ui/Block'
import { useEfficiencyData } from '../../hook/useEfficiencyData'
import useThemeStore from '../../stores/others/ThemeStore'

const DesktopLayout = () => {
  // 레이드 , 전선, 가토 골드 정보를 가져옴
  const { raidData, FrontlineData, GuardianData } = useEfficiencyData()
  const darkMode = useThemeStore((state) => state.darkMode)

  const totalData = [...raidData, ...FrontlineData, ...GuardianData]

  return (
    <main className='flex'>
      <Block width={1004} title='컨텐츠 시간효율'>
        <div className={`rounded-lg border-3 ${darkMode ? 'border-black/20' : 'border-gray'}`}>
          <TimeEfficiencyCharts data={totalData} datakey='name' legend={false} aspect={2} />
        </div>
      </Block>
    </main>
  )
}

export default DesktopLayout
