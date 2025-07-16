import { useSearchParams } from 'react-router-dom'

import { StoreManagementComponent } from '@/components/pages'
import { storeManagementTabMap } from '@/constants/store-management'

type StoreManagementTabType = keyof typeof storeManagementTabMap

export function StoreManagementRouter() {
  const [searchParams] = useSearchParams()
  const currentPage = (searchParams.get('tab') ??
    'basic') as StoreManagementTabType

  switch (currentPage) {
    case 'basic':
      return <StoreManagementComponent.BasicForm />
    case 'business':
      return <StoreManagementComponent.BusinessForm />
  }
}
