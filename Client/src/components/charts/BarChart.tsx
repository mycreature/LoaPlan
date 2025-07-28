import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, Tooltip, Legend, Bar } from 'recharts'
import { expeditionGoldData } from '../../types/Types'
import useThemeStore from '../../stores/others/ThemeStore'

interface PieChartComponentProps {
  data: expeditionGoldData[]
  colors?: string[]
  width?: number
  height?: number
  dataKey?: string
  darkColor?: string[]
  lightColor?: string[]
}

const BarChartComponent = ({
  data,
  dataKey = 'name',
  width = 200,
  height = 200,
  darkColor = ['#8884d8', '#F59E0B'],
  lightColor = ['#8884d8', '#82ca9d'],
}: PieChartComponentProps) => {
  const darkMode = useThemeStore((state) => state.darkMode)

  const colors = darkMode ? darkColor : lightColor

  return (
    <ResponsiveContainer width={width} height={height}>
      <BarChart width={width} height={height} data={data.slice(0, 6)}>
        <CartesianGrid strokeDasharray='3 3' strokeWidth={3} />
        <XAxis dataKey={dataKey} interval={0} fontSize={12} fontFamily='SUIT' fontWeight={600} />

        <Tooltip
          formatter={(value, name) => {
            if (name === 'raidGold') return [value, '레이드 골드']
            if (name === 'otherGold') return [value, '기타 골드']
            return [value, name]
          }}
        />
        <Legend
          payload={[
            { value: '레이드 골드', type: 'square', id: 'raidGold', color: colors[0] },
            { value: '기타 골드', type: 'square', id: 'otherGold', color: colors[1] },
          ]}
        />

        <Bar dataKey='raidGold' stackId='a' fill={colors[0]} />
        <Bar dataKey='otherGold' stackId='a' fill={colors[1]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default BarChartComponent
