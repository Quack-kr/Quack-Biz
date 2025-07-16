import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { SingleSelect } from '@/components/ui/select/single-select'

// 스키마와 정확히 일치하는 타입 정의
interface BusinessHours {
  same: { start: string; end: string }
  different: {
    월: { start: string; end: string; closed: boolean }
    화: { start: string; end: string; closed: boolean }
    수: { start: string; end: string; closed: boolean }
    목: { start: string; end: string; closed: boolean }
    금: { start: string; end: string; closed: boolean }
    토: { start: string; end: string; closed: boolean }
    일: { start: string; end: string; closed: boolean }
  }
}

interface BusinessHoursFieldProps {
  openType: string
  openTime: BusinessHours
  onOpenTypeChange: (type: string) => void
  onOpenTimeChange: (openTime: BusinessHours) => void
}

export function BusinessHoursField({
  openType,
  openTime,
  onOpenTypeChange,
  onOpenTimeChange
}: BusinessHoursFieldProps) {
  const weekDays = ['월', '화', '수', '목', '금', '토', '일'] as const
  type WeekDay = (typeof weekDays)[number]

  const handleSameTimeChange = (field: 'start' | 'end', value: string) => {
    onOpenTimeChange({
      ...openTime,
      same: { ...openTime.same, [field]: value }
    })
  }

  const handleDifferentTimeChange = (
    day: WeekDay,
    field: 'start' | 'end' | 'closed',
    value: string | boolean
  ) => {
    onOpenTimeChange({
      ...openTime,
      different: {
        ...openTime.different,
        [day]: { ...openTime.different[day], [field]: value }
      }
    })
  }

  return (
    <div className="space-y-4">
      <SingleSelect
        options={['매일같아요', '요일별로달라요']}
        defaultValue={openType}
        onValueChange={onOpenTypeChange}
      />

      {openType === '매일같아요' ? (
        <div className="space-y-4">
          <Label className="text-white">영업시간</Label>
          <div className="flex items-center gap-4">
            <Input
              type="time"
              value={openTime.same.start}
              onChange={(e) => handleSameTimeChange('start', e.target.value)}
              className="border-[#3A3A36] bg-[#2A2A26] text-white"
            />
            <span className="text-white">~</span>
            <Input
              type="time"
              value={openTime.same.end}
              onChange={(e) => handleSameTimeChange('end', e.target.value)}
              className="border-[#3A3A36] bg-[#2A2A26] text-white"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <Label className="text-white">요일별 영업시간</Label>
          {weekDays.map((day) => (
            <div key={day} className="flex items-center gap-4">
              <span className="w-8 text-white">{day}</span>
              <div className="flex items-center gap-2">
                <Switch
                  checked={!openTime.different[day].closed}
                  onCheckedChange={(checked) =>
                    handleDifferentTimeChange(day, 'closed', !checked)
                  }
                />
                {!openTime.different[day].closed && (
                  <>
                    <Input
                      type="time"
                      value={openTime.different[day].start}
                      onChange={(e) =>
                        handleDifferentTimeChange(day, 'start', e.target.value)
                      }
                      className="w-32 border-[#3A3A36] bg-[#2A2A26] text-white"
                    />
                    <span className="text-white">~</span>
                    <Input
                      type="time"
                      value={openTime.different[day].end}
                      onChange={(e) =>
                        handleDifferentTimeChange(day, 'end', e.target.value)
                      }
                      className="w-32 border-[#3A3A36] bg-[#2A2A26] text-white"
                    />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
