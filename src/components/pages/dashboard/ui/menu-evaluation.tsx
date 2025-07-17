import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useMenuEvaluation } from '@/queries/dashboard'

const labelMap: Record<string, string> = {
  michin_mat_count: '미친맛',
  delicious_mat_count: '맛있어요',
  normal_mat_count: '평범해요',
  not_good_mat_count: '아쉬워요',
  hack_nomat_count: '핵노맛'
}

export function MenuEvaluation({ restaurantId }: { restaurantId: number }) {
  const { data, isLoading, error } = useMenuEvaluation(restaurantId)

  if (isLoading) return <div>로딩 중...</div>
  if (error) return <div>데이터 로드 실패</div>
  if (!data || !data.data?.evaluation) return <div>데이터가 없습니다.</div>

  // 아래는 모든 key값을 돌며 카운트 값 가져오기
  const menuStats = Object.entries(data.data.evaluation).map(
    ([key, count]) => ({
      label: labelMap[key] ?? key,
      count: count as number
    })
  )

  return (
    <Card className="rounded-[8px] border-none bg-[#21211D]">
      <CardHeader>
        <CardTitle className="text-lg text-white">메뉴평가</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-5 gap-4">
        {menuStats.map((s) => (
          <div key={s.label} className="flex flex-col items-center">
            <Badge className="mb-1 bg-[#FFE066] font-bold text-[#181816]">
              {s.count}건
            </Badge>
            <span className="text-xs text-[#A8A7A1]">{s.label}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
