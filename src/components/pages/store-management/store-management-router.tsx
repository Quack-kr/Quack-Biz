import { useSearchParams } from 'react-router-dom'

import { StoreManagementComponent } from '@/components/pages'
import { storeManagementTabMap } from '@/constants/store-management'
import { useRestaurant } from '@/queries/restaurant'

type StoreManagementTabType = keyof typeof storeManagementTabMap

export function StoreManagementRouter({
  restaurantId
}: {
  restaurantId: number
}) {
  const [searchParams] = useSearchParams()
  const currentPage = (searchParams.get('tab') ??
    'basic') as StoreManagementTabType

  useRestaurant(restaurantId)

  switch (currentPage) {
    case 'basic':
      return <StoreManagementComponent.BasicForm />
    case 'business':
      return <StoreManagementComponent.BusinessForm />
  }
}
