import { useSearchParams } from 'react-router-dom'
import clsx from 'clsx'

import { Button } from '@/components/ui/button'

export interface Lnb {
  key: string
  label: string
}

interface LnbComponentProps {
  tabList: Lnb[]
  className?: string
}

export default function LnbComponent({
  tabList,
  className
}: LnbComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const active = searchParams.get('tab') || tabList[0]?.key

  const handleTab = (key: string) => {
    setSearchParams({ ...Object.fromEntries(searchParams.entries()), tab: key })
  }

  return (
    <div
      className={clsx(
        'w-full border-b border-b-quack-gray bg-quack-black text-gray-100',
        className
      )}
    >
      <div className="flex gap-6 border-b border-[#222] pb-4">
        {tabList.map((tab) => (
          <Button
            key={tab.key}
            variant="ghost"
            className={clsx(
              'h-full rounded-none !p-0 px-4 text-xl font-bold tracking-tight transition-all',
              active === tab.key
                ? 'text-quack-white'
                : 'text-quack-gray hover:border-gray-400 hover:text-white'
            )}
            onClick={() => handleTab(tab.key)}
          >
            {tab.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
