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
import { useSummaryReport } from '@/queries/dashboard'
import { transformWeeklyData } from '@/utils/dayjs'

const CHART_COLORS = {
  grayText: '#525250',
  border: '#393937',
  yellow: '#EFD800',
  card: '#2A2A26'
}

export function WeeklyReviewCard({ restaurantId }: { restaurantId: number }) {
  const { data, isLoading, error } = useSummaryReport(restaurantId)

  if (isLoading) return <div>로딩 중...</div>
  if (error || !data) return <div>데이터를 불러오는데 실패하였습니다.</div>

  const reviewData = transformWeeklyData(
    data.data.review_counts.week1,
    data.data.review_counts.week2
  )

  // 총 리뷰수 이번주 합
  const totalThisWeek = reviewData.reduce((acc, cur) => acc + cur.current, 0)

  return (
    <Card className="rounded-[8px] border-none bg-[#21211D]">
      <CardHeader>
        <CardTitle className="text-lg text-white">주간 리뷰수</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={reviewData} barSize={10}>
            <CartesianGrid stroke={CHART_COLORS.grayText} vertical={false} />
            <XAxis dataKey="day" stroke={CHART_COLORS.grayText} fontSize={12} />
            <YAxis stroke={CHART_COLORS.grayText} fontSize={12} />
            <Tooltip
              contentStyle={{
                background: CHART_COLORS.card,
                color: CHART_COLORS.yellow,
                border: 'none'
              }}
              labelStyle={{
                color: CHART_COLORS.yellow,
                background: 'transparent'
              }}
              wrapperStyle={{ background: 'transparent' }}
            />
            <Bar dataKey="last" fill={CHART_COLORS.border} name="지난주" />
            <Bar dataKey="current" fill={CHART_COLORS.yellow} name="이번주" />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-2 text-right text-sm text-[#FFE066]">
          {totalThisWeek}건
        </div>
      </CardContent>
    </Card>
  )
}
