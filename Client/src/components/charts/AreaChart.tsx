import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  Tooltip,
  AreaChart,
  Area,
  Legend,
} from 'recharts'
import { expeditionGoldData } from '../../types/Types'

interface AreaChartComponentProps {
  data: expeditionGoldData[]
  width?: number
  height?: number
}

const AreaChartComponent = ({ data, width = 200, height = 200 }: AreaChartComponentProps) => {
  // 최대 6주차까지 처리
  const totalBaseGold = data
    .slice(0, 6)
    .reduce((acc, item) => acc + item.raidGold + item.otherGold, 0)

  const chartData = Array.from({ length: 6 }, (_, idx) => {
    const index = idx + 1
    return {
      week: `${index}주차`,
      totalGold: totalBaseGold * index,
    }
  })

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <AreaChart width={width} height={height} data={chartData} margin={{ right: 15, left: 15 }}>
        <CartesianGrid strokeDasharray='3 3' strokeWidth={2.5} />
        <XAxis dataKey='week' fontSize={12} fontFamily='SUIT' fontWeight={600} interval={0} />
        <Tooltip
          itemStyle={{ color: '#000', fontSize: 16, fontFamily: 'SUIT', fontWeight: 500 }}
          formatter={(value, name) => {
            if (name === 'totalGold') return [value, '종합 골드']
            return [value, name]
          }}
        />
        <Legend
          payload={[
            {
              value: '종합 골드',
              id: 'totalGold',
              type: 'square', // ✅ 도형 타입 추가
              color: '#8884d8', // ✅ 색상 적용됨
            },
          ]}
        />
        <Area type='monotone' dataKey='totalGold' stackId='a' fill='#8884d8' />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default AreaChartComponent
