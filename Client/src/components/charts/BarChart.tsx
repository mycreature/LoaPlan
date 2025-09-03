import { BarChart, CartesianGrid, XAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts'
import { expeditionGoldData } from '../../types/Types'

interface PieChartComponentProps {
  data: expeditionGoldData[]
  colors?: string[]
  dataKey?: string
  color?: string[]
  legend?: boolean
}

const BarChartComponent = ({
  data,
  dataKey = 'name',
  color = ['#8884d8', '#4BD66E'],
  legend = true,
}: PieChartComponentProps) => {
  return (
    <ResponsiveContainer width='100%' height='100%' aspect={1.5}>
      <BarChart data={data.slice(0, 6)} margin={{ right: 0, left: 0, bottom: -10, top: 0 }}>
        <CartesianGrid strokeDasharray='3 3' strokeWidth={3} />
        <XAxis dataKey={dataKey} interval={0} fontSize={12} fontFamily='SUIT' fontWeight={600} />

        <Tooltip
          itemStyle={{ color: '#000', fontSize: 14, fontFamily: 'SUIT', fontWeight: 500 }}
          contentStyle={{
            border: '2px solid #BEBEBE',
            borderRadius: '10px',
            padding: '0px 12px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.5)', // 그림자 추가
          }}
          labelStyle={{
            color: '#000',
            fontSize: 14,
            fontFamily: 'SUIT',
            fontWeight: 700,

            marginBottom: '4px',
            marginTop: '8px',
          }}
          formatter={(value, name) => {
            if (name === 'raidGold') return [value, '레이드 골드']
            if (name === 'otherGold') return [value, '기타 골드']
            return [value, name]
          }}
        />
        {legend && (
          <Legend
            payload={[
              { value: '레이드 골드', type: 'square', id: 'raidGold', color: color[0] },
              { value: '기타 골드', type: 'square', id: 'otherGold', color: color[1] },
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
                }}
              >
                {value}
              </span>
            )}
            iconType='square'
          />
        )}

        <Bar dataKey='raidGold' stackId='a' fill={color[0]} />
        <Bar dataKey='otherGold' stackId='a' fill={color[1]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default BarChartComponent
