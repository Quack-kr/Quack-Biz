import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useHesitationReasons } from '@/queries/dashboard'
import type { HesitationReason } from '@/types/dashboard'

export function VisitHesitationReasons({
  restaurantId
}: {
  restaurantId: number
}) {
  const { data, isLoading, error } = useHesitationReasons(restaurantId)

  if (isLoading) return <div>로딩 중...</div>
  if (error) return <div>데이터를 불러오는데 실패했습니다.</div>
  if (!data || !data.data?.negative_review_tags?.length)
    return <div>망설이는 이유 데이터가 없습니다.</div>

  // order 기준 오름차순 정렬 (필요시)
  const sortedReasons = [...data.data.negative_review_tags].sort(
    (a, b) => a.order - b.order
  )

  return (
    <Card className="h-[200px] rounded-[8px] border-none bg-[#21211D]">
      <CardHeader>
        <CardTitle className="text-lg text-white">
          방문 망설이는 이유는?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {sortedReasons.map((reason: HesitationReason) => (
            <li
              key={reason.tag_key}
              className="flex justify-between text-[#A8A7A1]"
            >
              <span>{reason.tag_value}</span>
              <span className="font-semibold text-[#FFE066]">
                {reason.count}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
