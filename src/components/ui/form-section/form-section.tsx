import type { ReactNode } from 'react'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface FormSectionProps {
  title: string
  subtitle?: string
  value: ReactNode
  buttonText?: string
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: () => void
  children: ReactNode
  dialogTitle?: string
}

export function FormSection({
  title,
  subtitle,
  value,
  buttonText = '수정하기',
  isOpen,
  onOpenChange,
  onSubmit,
  children,
  dialogTitle
}: FormSectionProps) {
  return (
    <div className="flex items-start justify-between">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-medium text-white">{title}</span>
          {subtitle && (
            <span className="text-xs text-[#EFD800]">{subtitle}</span>
          )}
        </div>
        <div className="text-sm text-[#A8A7A1]">{value}</div>
      </div>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="rounded-[8px] border-none bg-[#21211D] text-xs text-white"
          >
            {buttonText}
          </Button>
        </DialogTrigger>
        <DialogContent className="min-w-[784px] !rounded-[20px] border-none bg-quack-black px-[120px] py-[60px]">
          <DialogHeader>
            <DialogTitle className="text-[32px] text-quack-white">
              {dialogTitle || title}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
            {children}
            <DialogFooter>
              <Button
                type="submit"
                className="mx-auto mt-4 h-14 w-[380px] rounded-[8px] bg-[#EFD800] font-pretendard text-base font-bold text-quack-black transition hover:bg-[#FFD600]"
              >
                저장하기
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
