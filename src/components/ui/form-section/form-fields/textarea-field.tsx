import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface TextareaFieldProps {
  id: string
  label: string
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  maxLength?: number
  minHeight?: string
}

export function TextareaField({
  id,
  label,
  value = '',
  onChange,
  placeholder,
  maxLength,
  minHeight = '104px'
}: TextareaFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-white">
        {label}
      </Label>
      <Textarea
        id={id}
        value={value}
        maxLength={maxLength}
        className={`border-[#3A3A36] bg-[#2A2A26] text-white`}
        style={{ minHeight }}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  )
}
