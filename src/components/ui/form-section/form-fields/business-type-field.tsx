import { Label } from '@/components/ui/label'

interface BusinessType {
  emoji: string
  name: string
}

interface BusinessTypeFieldProps {
  options: BusinessType[]
  value: BusinessType
  onChange: (value: BusinessType) => void
}

export function BusinessTypeField({
  options,
  value,
  onChange
}: BusinessTypeFieldProps) {
  return (
    <div className="space-y-4">
      <Label className="text-white">업종을 선택해주세요</Label>
      <div className="grid grid-cols-3 gap-3">
        {options.map((type) => (
          <button
            key={type.name}
            type="button"
            onClick={() => onChange(type)}
            className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-colors ${
              value.name === type.name
                ? 'border-[#EFD800] bg-[#EFD800]/10'
                : 'border-[#3A3A36] bg-[#2A2A26] hover:border-[#4A4A46]'
            }`}
          >
            <span className="text-2xl">{type.emoji}</span>
            <span className="text-sm text-white">{type.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
