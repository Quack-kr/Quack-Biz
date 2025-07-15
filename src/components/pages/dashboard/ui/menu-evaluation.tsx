import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const menuStats = [
  { label: '미친맛', count: 13 },
  { label: '맛있어요', count: 12 },
  { label: '평범해요', count: 12 },
  { label: '아쉬워요', count: 12 },
  { label: '핵노맛', count: 0 }
]

export function MenuEvaluation() {
  return (
    <Card className="rounded-[8px] border-none bg-[#21211D]">
      <CardHeader>
        <CardTitle className="text-lg text-white">메뉴평가</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-5 gap-4 py-6">
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
