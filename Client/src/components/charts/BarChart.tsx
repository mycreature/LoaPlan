import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, Tooltip, Legend, Bar } from 'recharts'
import { expeditionGoldData } from '../../types/Types'

interface PieChartComponentProps {
  data: expeditionGoldData[]
  colors?: string[]
  width?: number
  height?: number
  dataKey?: string
  color?: string[]
}

const BarChartComponent = ({
  data,
  dataKey = 'name',
  width = 200,
  height = 200,
  color = ['#8884d8', '#4BD66E'],
}: PieChartComponentProps) => {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <BarChart width={width} height={height} data={data.slice(0, 6)}>
        <CartesianGrid strokeDasharray='3 3' strokeWidth={3} />
        <XAxis dataKey={dataKey} interval={0} fontSize={12} fontFamily='SUIT' fontWeight={600} />

        <Tooltip
          itemStyle={{ color: '#000', fontSize: 16, fontFamily: 'SUIT', fontWeight: 500 }}
          contentStyle={{
            border: '2px solid #BEBEBE',
            borderRadius: '10px',
            padding: '8px 12px', // 안쪽 여백
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)', // 시각적 보강
          }}
          formatter={(value, name) => {
            if (name === 'raidGold') return [value, '레이드 골드']
            if (name === 'otherGold') return [value, '기타 골드']
            return [value, name]
          }}
        />
        <Legend
          payload={[
            { value: '레이드 골드', type: 'square', id: 'raidGold', color: color[0] },
            { value: '기타 골드', type: 'square', id: 'otherGold', color: color[1] },
          ]}
        />

        <Bar dataKey='raidGold' stackId='a' fill={color[0]} />
        <Bar dataKey='otherGold' stackId='a' fill={color[1]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default BarChartComponent
