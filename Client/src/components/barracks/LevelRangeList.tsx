import { expeditionColors } from '../../styles/colors'
import Loading from '../ui/Loading'
import useThemeStore from '../../stores/others/ThemeStore'
import { useExpeditionStore } from '../../stores/api/ExpeditionStore'

const LevelRangeList = ({ levelRange }: any) => {
  const expeditionLoading = useExpeditionStore((state) => state.expeditionLoading)
  const expeditions = useExpeditionStore((state) => state.expeditions) || []
  const darkMode = useThemeStore((state) => state.darkMode)

  if (!levelRange || Object.keys(levelRange).length === 0) {
    return null
  }

  const levelData: Record<number, number> = {}

  Object.values(levelRange).forEach((item: any) => {
    levelData[item.levelRange] = item.count
  })

  if (expeditionLoading || expeditions.length === 0) {
    return <Loading />
  }

  return (
    <div className='mb-auto grid grid-cols-2 items-center gap-4'>
      {Object.entries(levelData)
        .filter(([_, count]) => count > 0)
        .reverse()
        .map(([range, count], index) => (
          <div
            key={index}
            className={`flex h-12 w-37 items-center justify-center gap-2 rounded-lg border ${
              darkMode ? 'border-black/30' : 'border-gray'
            }`}
          >
            <div
              className='h-4 w-4 rounded-sm'
              style={{ backgroundColor: expeditionColors[index % expeditionColors.length] }}
            ></div>
            <h4 className='text-black'>{range}+</h4>
            <h4 className='text-black'>{count}개</h4>
          </div>
        ))}
    </div>
  )
}

export default LevelRangeList
