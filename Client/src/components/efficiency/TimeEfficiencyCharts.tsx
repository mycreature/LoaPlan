import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Legend, Bar, Cell } from 'recharts'

interface TimeEfficiencyChartsProps {
  data: any
  datakey: string
  colors?: Record<string, string>
  width?: number | string
  height?: number | string
  aspect?: number
  legend?: boolean
  fontFamily?: string
  fontSize?: number
  fontWeight?: number | string
}

const TimeEfficiencyCharts = ({
  data,
  datakey = '',
  colors = {
    노말: '#4BD66E',
    하드: '#4BD66E',
    전선: '#F59E0B',
    가토: '#8884d8',
  },
  width = '100%',
  height = '100%',
  aspect = 1,
  legend = true,
  fontFamily: xAxisFontFamily = 'SUIT',
  fontSize: xAxisFontSize = 12,
  fontWeight: xAxisFontWeight = 600,
}: TimeEfficiencyChartsProps) => {
  return (
    <div className='flex'>
      <ResponsiveContainer width={width} height={height} aspect={aspect}>
        <BarChart data={data} margin={{ right: 20, left: 0, bottom: 20, top: 20 }}>
          <XAxis
            dataKey={datakey}
            interval={0}
            fontSize={xAxisFontSize}
            fontFamily={xAxisFontFamily}
            fontWeight={xAxisFontWeight}
            angle={-45}
            textAnchor='end'
          />
          <YAxis
            tickFormatter={(value) => new Intl.NumberFormat().format(value)}
            fontSize={xAxisFontSize}
            fontFamily={xAxisFontFamily}
            fontWeight={xAxisFontWeight}
          />

          <Tooltip
            itemStyle={{ color: '#000', fontSize: 14, fontFamily: 'SUIT', fontWeight: 500 }}
            contentStyle={{
              border: '2px solid #BEBEBE',
              borderRadius: '10px',
              padding: '0px 12px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.5)',
            }}
            labelStyle={{
              color: '#000',
              fontSize: 14,
              fontFamily: 'SUIT',
              fontWeight: 700,
              marginBottom: '4px',
              marginTop: '8px',
            }}
            formatter={(value) => [`시간당 : ${new Intl.NumberFormat().format(Number(value))} G`]}
          />

          {legend && (
            <Legend
              payload={Object.keys(colors).map((key) => ({
                value: key,
                type: 'square',
                id: key,
                color: colors[key],
              }))}
              formatter={(value) => (
                <span
                  style={{
                    color: '#000',
                    fontFamily: 'SUIT',
                    fontWeight: 500,
                    fontSize: 14,
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

          <Bar dataKey='Gold' stackId='a'>
            {data.map((entry: any, index: number) => (
              <Cell key={`cell-${index}`} fill={colors[entry.type] || '#8884d8'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default TimeEfficiencyCharts
