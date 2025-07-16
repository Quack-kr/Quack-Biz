import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

interface SwitchTimeFieldProps {
  label: string
  hasTime: boolean
  startTime?: string
  endTime?: string // 라스트 오더의 경우 종료 시간이 없을 수 있음
  onHasTimeChange: (hasTime: boolean) => void
  onStartTimeChange: (time: string) => void
  onEndTimeChange?: (time: string) => void
  enabledText?: string
  disabledText?: string
  singleTime?: boolean // 단일 시간 입력 모드
}

export function SwitchTimeField({
  label,
  hasTime,
  startTime = '',
  endTime = '',
  onHasTimeChange,
  onStartTimeChange,
  onEndTimeChange,
  enabledText = '있어요',
  disabledText = '없어요',
  singleTime = false
}: SwitchTimeFieldProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Label className="text-white">{label}</Label>
        <Switch checked={hasTime} onCheckedChange={onHasTimeChange} />
        <span className="text-sm text-[#A8A7A1]">
          {hasTime ? enabledText : disabledText}
        </span>
      </div>

      {hasTime && (
        <div className="space-y-2">
          {singleTime ? (
            <>
              <Label className="text-white">{label} 시간</Label>
              <Input
                type="time"
                value={startTime}
                onChange={(e) => onStartTimeChange(e.target.value)}
                className="border-[#3A3A36] bg-[#2A2A26] text-white"
              />
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Input
                type="time"
                value={startTime}
                onChange={(e) => onStartTimeChange(e.target.value)}
                className="border-[#3A3A36] bg-[#2A2A26] text-white"
              />
              <span className="text-white">~</span>
              <Input
                type="time"
                value={endTime}
                onChange={(e) => onEndTimeChange?.(e.target.value)}
                className="border-[#3A3A36] bg-[#2A2A26] text-white"
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
