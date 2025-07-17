import {
  Line,
  LineChart,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useSummaryReport } from '@/queries/dashboard'
import { transformWeeklyData } from '@/utils/dayjs'

const CHART_COLORS = {
  grayText: '#525250',
  border: '#393937',
  yellow: '#EFD800',
  card: '#2A2A26'
}

export function WeeklySaveCard({ restaurantId }: { restaurantId: number }) {
  const { data, isLoading, error } = useSummaryReport(restaurantId)

  if (isLoading) return <div>로딩 중...</div>
  if (error || !data) return <div>데이터를 불러오는데 실패하였습니다.</div>

  const saveData = transformWeeklyData(
    data.data.bookmark_counts.week1,
    data.data.bookmark_counts.week2
  )

  const totalThisWeek = saveData.reduce((acc, cur) => acc + cur.current, 0)

  return (
    <Card className="rounded-[8px] border-none bg-[#21211D]">
      <CardHeader>
        <CardTitle className="text-lg text-white">주간 저장수</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={saveData}>
            <CartesianGrid stroke={CHART_COLORS.grayText} vertical={false} />
            <XAxis dataKey="day" stroke={CHART_COLORS.grayText} fontSize={12} />
            <YAxis stroke={CHART_COLORS.grayText} fontSize={12} />
            <Tooltip
              contentStyle={{
                background: CHART_COLORS.card,
                color: CHART_COLORS.yellow,
                border: 'none'
              }}
              labelStyle={{ color: CHART_COLORS.yellow }}
            />
            <Line
              type="linear"
              dataKey="last"
              stroke={CHART_COLORS.border}
              name="지난주"
            />
            <Line
              type="linear"
              dataKey="current"
              stroke={CHART_COLORS.yellow}
              name="이번주"
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-2 text-right text-sm text-[#FFE066]">
          {totalThisWeek}건
        </div>
      </CardContent>
    </Card>
  )
}
