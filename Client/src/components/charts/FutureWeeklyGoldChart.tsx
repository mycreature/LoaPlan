import { ResponsiveContainer, CartesianGrid, XAxis, Tooltip, Legend, BarChart, Bar } from 'recharts'
import { expeditionGoldData } from '../../types/Types'

interface BarChartProps {
  data: expeditionGoldData[]
  color?: string
  aspect?: number
}

const FutureWeeklyGoldChart = ({ data, aspect = 0, color = '#F59E0B' }: BarChartProps) => {
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
    <ResponsiveContainer width='100%' height='100%' aspect={aspect}>
      <BarChart data={chartData} margin={{ right: 15, left: 15 }}>
        <CartesianGrid strokeDasharray='3 3' strokeWidth={2.5} />
        <XAxis dataKey='week' fontSize={12} fontFamily='SUIT' fontWeight={600} interval={0} />
        <Tooltip
          itemStyle={{ color: '#000', fontSize: 14, fontFamily: 'SUIT', fontWeight: 500 }}
          contentStyle={{
            border: '2px solid #BEBEBE',
            borderRadius: '10px',
            padding: '8px 12px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.5)',
          }}
          labelStyle={{
            color: '#000',
            fontSize: 14,
            fontFamily: 'SUIT',
            fontWeight: 700,

            marginBottom: '4px',
            marginTop: '4px',
          }}
          formatter={(value, name) => {
            if (name === 'totalGold')
              return [`${new Intl.NumberFormat().format(Number(value))}G`, '종합 골드']
            return [value, name]
          }}
        />
        <Legend
          payload={[
            {
              value: '종합 골드',
              id: 'totalGold',
              type: 'square',
              color: color,
            },
          ]}
          formatter={(value) => (
            <span
              style={{
                color: '#000',
                fontFamily: 'SUIT',
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '14px',
                verticalAlign: 'middle',
                display: 'inline-block',
              }}
            >
              {value}
            </span>
          )}
          iconType='square'
        />
        <Bar type='monotone' dataKey='totalGold' fill={color} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default FutureWeeklyGoldChart
