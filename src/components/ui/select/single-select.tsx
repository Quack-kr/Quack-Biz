import { useState } from 'react'

import { cn } from '@/lib/utils'

interface SingleSelectProps {
  options: string[]
  defaultValue?: string
  onValueChange?: (value: string) => void
  className?: string
}

export function SingleSelect({
  options,
  defaultValue,
  onValueChange,
  className
}: SingleSelectProps) {
  const [selectedValue, setSelectedValue] = useState(defaultValue || '')

  const handleSelect = (value: string) => {
    setSelectedValue(value)
    onValueChange?.(value)
  }

  return (
    <div className={cn('flex gap-1', className)}>
      {options.map((option) => (
        <button
          key={option}
          onClick={() => handleSelect(option)}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-medium transition-colors',
            'hover:bg-gray-100 dark:hover:bg-gray-800',
            selectedValue === option
              ? 'bg-amber-100 text-gray-900 dark:bg-amber-200 dark:text-gray-900'
              : 'bg-gray-800 text-white dark:bg-gray-700 dark:text-gray-200'
          )}
        >
          {option}
        </button>
      ))}
    </div>
  )
}
