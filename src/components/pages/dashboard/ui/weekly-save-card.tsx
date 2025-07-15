import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Line,
  LineChart,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

const COLORS = {
  bg: '#181816',
  card: '#21211D',
  cardAlt: '#2A2A26',
  yellow: '#EFD800',
  yellowDeep: '#EFD800',
  grayText: '#525250',
  border: '#393937'
}

const saveData = [
  { day: '월', last: 5, current: 10 },
  { day: '화', last: 10, current: 20 },
  { day: '수', last: 15, current: 15 },
  { day: '목', last: 8, current: 18 },
  { day: '금', last: 12, current: 25 },
  { day: '토', last: 9, current: 22 },
  { day: '일', last: 0, current: 0 }
]

export function WeeklySaveCard() {
  return (
    <Card className="rounded-[8px] border-none bg-[#21211D]">
      <CardHeader>
        <CardTitle className="text-lg text-white">주간 저장수</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={saveData}>
            <CartesianGrid stroke={COLORS.grayText} vertical={false} />
            <XAxis dataKey="day" stroke={COLORS.grayText} fontSize={12} />
            <YAxis stroke={COLORS.grayText} fontSize={12} />
            <Tooltip
              contentStyle={{
                background: COLORS.card,
                color: COLORS.yellow,
                border: 'none'
              }}
              labelStyle={{ color: COLORS.yellow }}
            />
            <Line
              type="linear"
              dataKey="last"
              stroke={COLORS.border}
              name="지난주"
            />
            <Line
              type="linear"
              dataKey="current"
              stroke={COLORS.yellow}
              name="이번주"
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-2 text-right text-sm text-[#FFE066]">68건</div>
      </CardContent>
    </Card>
  )
}
