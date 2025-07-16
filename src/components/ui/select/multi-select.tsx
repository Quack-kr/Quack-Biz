import { useState } from 'react'

import { cn } from '@/lib/utils'

interface MultiSelectProps {
  options: string[]
  defaultValues?: string[]
  onValuesChange?: (values: string[]) => void
  className?: string
}

export function MultiSelect({
  options,
  defaultValues = [],
  onValuesChange,
  className
}: MultiSelectProps) {
  const [selectedValues, setSelectedValues] = useState<string[]>(defaultValues)

  const handleToggle = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value]

    setSelectedValues(newValues)
    onValuesChange?.(newValues)
  }

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {options.map((option) => (
        <button
          key={option}
          onClick={() => handleToggle(option)}
          className={cn(
            'px-6 py-3 rounded-full text-sm font-medium transition-all duration-200',
            'border-2 hover:scale-105',
            selectedValues.includes(option)
              ? 'bg-blue-500 text-white border-blue-500 shadow-lg'
              : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600'
          )}
        >
          {option}
        </button>
      ))}
    </div>
  )
}
