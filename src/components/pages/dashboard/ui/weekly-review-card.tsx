import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const COLORS = {
  bg: '#181816',
  card: '#2A2A26',
  cardAlt: '#2A2A26',
  yellow: '#EFD800',
  yellowDeep: '#EFD800',
  grayText: '#525250',
  border: '#393937'
}

const reviewData = [
  { day: '월', last: 10, current: 15 },
  { day: '화', last: 30, current: 40 },
  { day: '수', last: 20, current: 60 },
  { day: '목', last: 15, current: 35 },
  { day: '금', last: 25, current: 50 },
  { day: '토', last: 5, current: 45 },
  { day: '일', last: 8, current: 0 }
]

export function WeeklyReviewCard() {
  return (
    <Card className="rounded-[8px] border-none bg-[#21211D]">
      <CardHeader>
        <CardTitle className="text-lg text-white">주간 리뷰수</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={reviewData} barSize={10}>
            <CartesianGrid stroke={COLORS.grayText} vertical={false} />
            <XAxis dataKey="day" stroke={COLORS.grayText} fontSize={12} />
            <YAxis stroke={COLORS.grayText} fontSize={12} />
            <Tooltip
              contentStyle={{
                background: COLORS.card,
                color: COLORS.yellow,
                border: 'none'
              }}
              labelStyle={{ color: COLORS.yellow, background: 'transparent' }}
              wrapperStyle={{ background: 'transparent' }}
            />
            <Bar dataKey="last" fill={COLORS.border} name="지난주" />
            <Bar dataKey="current" fill={COLORS.yellow} name="이번주" />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-2 text-right text-sm text-[#FFE066]">56건</div>
      </CardContent>
    </Card>
  )
}
