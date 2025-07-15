import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function OwnerNote() {
  return (
    <Card className="h-[200px] rounded-[8px] border-none bg-[#21211D]">
      <CardHeader>
        <CardTitle className="text-lg text-white">
          사장님은 이렇게 노력중!
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="예) 망설이는 고객을 사로잡을 한마디가 필요해요!"
          className="mb-2 border-none bg-[#2A2A26] text-[#FFE066]"
        />
      </CardContent>
    </Card>
  )
}
