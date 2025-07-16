import { useSearchParams } from 'react-router-dom'

import { myPageTabMap } from '@/constants/my-page'

type MyPageTabType = keyof typeof myPageTabMap

export function MyPageRouter() {
  const [searchParams] = useSearchParams()
  const currentPage = (searchParams.get('tab') ?? 'alarm') as MyPageTabType

  switch (currentPage) {
    case 'alarm':
      return <span>알림이 없어요.</span>
    case 'billing':
      return <span>구독내역이 없어요.</span>
    case 'account':
      return <span>계정이 없어요.</span>
  }
}
