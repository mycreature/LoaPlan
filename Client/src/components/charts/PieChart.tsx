// components/charts/PieChartComponent.tsx
import React from 'react'
import { PieChart, Pie, Cell } from 'recharts'

const RADIAN = Math.PI / 180

// 📌 커스텀 라벨 렌더 함수
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text x={x} y={y} fill='white' textAnchor={x > cx ? 'start' : 'end'} dominantBaseline='central'>
      {`${(percent * 100).toFixed(0)}%`}
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
}

const PieChartComponent: React.FC<PieChartComponentProps> = ({
  data,
  colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
  width = 200,
  height = 200,
  outerRadius = 90,
  dataKey = 'totalGold',
}) => {
  return (
    <PieChart width={width} height={height}>
      <Pie
        data={data}
        cx={width / 2}
        cy={height / 2}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={outerRadius - 5}
        fill='#8884d8'
        dataKey={dataKey}
      >
        {data.map((_entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
    </PieChart>
  )
}

export default PieChartComponent
