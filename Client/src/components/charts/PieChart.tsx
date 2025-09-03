import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { expeditionColors } from '../../styles/colors'

const RADIAN = Math.PI / 180

// 📌 커스텀 라벨 렌더 함수
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill='white'
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline='central'
      style={{ fontSize: 14 }}
    >
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  )
}

interface PieChartComponentProps {
  data: { levelRange: number; totalGold: number }[]
  colors?: string[]
  width?: number
  height?: number
  outerRadius?: number
  dataKey?: string
  labelLine?: boolean
  animationDuration?: number
}

const PieChartComponent = ({
  data,
  colors = expeditionColors,
  height = 200,
  dataKey = 'totalGold',
  animationDuration = 600,
}: PieChartComponentProps) => {
  return (
    <ResponsiveContainer width='100%' height={height}>
      <PieChart>
        <Pie
          data={data}
          cx='50%'
          cy='50%'
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={height / 2 - 2}
          fill='#8884d8'
          dataKey={dataKey}
          animationDuration={animationDuration}
        >
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}

export default PieChartComponent
