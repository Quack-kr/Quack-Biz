import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const hesitationReasons = [
  { label: '웨이팅이 길어요', count: 119 },
  { label: '조리시간이 길어요', count: 83 },
  { label: '서비스가 아쉬웠어요', count: 33 }
]

export function VisitHesitationReasons() {
  return (
    <Card className="h-[200px] rounded-[8px] border-none bg-[#21211D]">
      <CardHeader>
        <CardTitle className="text-lg text-white">
          방문 망설이는 이유는?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {hesitationReasons.map((r) => (
            <li key={r.label} className="flex justify-between text-[#A8A7A1]">
              <span>{r.label}</span>
              <span className="font-semibold text-[#FFE066]">{r.count}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
