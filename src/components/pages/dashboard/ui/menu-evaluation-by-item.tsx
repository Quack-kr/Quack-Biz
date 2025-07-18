import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { MenuItemEval, MenuEvaluationByItem } from '@/types/dashboard'
import { useMenuEvaluationByItem } from '@/queries/dashboard'

const MENU_EVALUATION_CATEGORIES = {
  EXCELLENT: 'michin_mat',
  GOOD: 'delicious_mat',
  AVERAGE: 'normal_mat',
  BELOW_AVERAGE: 'not_good_mat',
  POOR: 'hack_nomat'
} as const

const categoryMap: { key: keyof MenuEvaluationByItem; label: string }[] = [
  { key: MENU_EVALUATION_CATEGORIES.EXCELLENT, label: '미친맛' },
  { key: MENU_EVALUATION_CATEGORIES.GOOD, label: '맛있어요' },
  { key: MENU_EVALUATION_CATEGORIES.AVERAGE, label: '평범해요' },
  { key: MENU_EVALUATION_CATEGORIES.BELOW_AVERAGE, label: '아쉬워요' },
  { key: MENU_EVALUATION_CATEGORIES.POOR, label: '핵노맛' }
]

export function MenuEvaluationByItem({
  restaurantId
}: {
  restaurantId: number
}) {
  const { data } = useMenuEvaluationByItem(restaurantId)

  if (!data || !data.data?.menu_evaluation_by_item)
    return <div>데이터가 없습니다.</div>

  const { menu_evaluation_by_item } = data.data

  return (
    <Card className="rounded-[8px] border-none bg-[#21211D]">
      <CardHeader>
        <CardTitle className="text-lg text-white">메뉴평가</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-5 gap-4">
        {categoryMap.map(({ key, label }) => {
          // 해당 카테고리 배열이 존재하지 않으면 빈 배열 디폴트
          const items: MenuItemEval[] = menu_evaluation_by_item[key] ?? []

          // order 기준 정렬 (오름차순)
          items.sort((a, b) => a.order - b.order)

          return (
            <div key={key} className="flex flex-col items-center">
              <Badge className="mb-1 bg-[#FFE066] font-bold text-[#181816]">
                {items.reduce((acc, cur) => acc + cur.count, 0)}건
              </Badge>
              <span className="whitespace-nowrap text-xs text-[#A8A7A1]">
                {label}
              </span>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
