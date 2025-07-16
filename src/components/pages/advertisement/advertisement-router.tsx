import { useSearchParams } from 'react-router-dom'

import type { advertisementTabMap } from '@/constants/advertisement'

import { AdvertisementCreate } from './components/advertisement-create'
import { AdvertisementActive } from './components/advertisement-active'

type AdvertisementTabType = keyof typeof advertisementTabMap

export function AdvertisementRouter() {
  const [searchParams] = useSearchParams()
  const currentPage = (searchParams.get('tab') ??
    'create') as AdvertisementTabType

  switch (currentPage) {
    case 'create':
      return <AdvertisementCreate />
    case 'active':
      return <AdvertisementActive />
  }
}
