import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface TextFieldProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  maxLength?: number
}

export function TextField({
  id,
  label,
  value,
  onChange,
  placeholder,
  maxLength
}: TextFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-white">
        {label}
      </Label>
      <Input
        id={id}
        value={value}
        maxLength={maxLength}
        className="border-[#3A3A36] bg-[#2A2A26] text-white"
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  )
}
