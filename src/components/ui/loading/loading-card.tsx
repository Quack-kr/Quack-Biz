import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import clsx from 'clsx'

interface LoadingCardProps {
  title: string
  height?: number | string // 예: 180, '260px', '18rem' 등
  className?: string
  /**
   * contentAlign='center' | 'start'
   * flex justify-content 조절 (default: center)
   */
  contentAlign?: 'center' | 'start'
}

export default function LoadingCard({
  title,
  height = 260,
  className,
  contentAlign = 'center'
}: LoadingCardProps) {
  const cardStyle =
    typeof height === 'number'
      ? { minHeight: `${height}px` }
      : { minHeight: height }

  const justifyClass =
    contentAlign === 'start' ? 'justify-start' : 'justify-center'

  return (
    <Card
      className={clsx('rounded-[8px] border-none bg-[#21211D]', className)}
      style={cardStyle}
    >
      <CardHeader>
        <CardTitle className="text-lg text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={clsx('flex items-center', justifyClass)}
          style={{ height: '100%' }}
        >
          <div className="size-5 animate-spin rounded-full border-2 border-yellow-300 border-t-transparent" />
        </div>
      </CardContent>
    </Card>
  )
}
