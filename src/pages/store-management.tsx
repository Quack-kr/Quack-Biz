import LnbComponent from '@/components/ui/lnb/lnb'
import { StoreManagementComponent } from '@/components/pages'

import { storeManagementTabList } from '@/constants/store-management'
import { useRestaurants } from '@/queries/restaurant'

export default function StoreManagementPage() {
  const { data } = useRestaurants()

  const restaurantId = data?.data?.[0]?.id

  if (!restaurantId) {
    return (
      <div className="py-5 text-[#A8A7A1] xl:mb-10 xl:ml-10 xl:p-0 xl:pb-4">
        <span>사용자의 상점이 없습니다.</span>
      </div>
    )
  }

  return (
    <>
      <div className="py-5 pb-6 xl:pb-10 xl:pl-10 xl:pt-0">
        <LnbComponent tabList={storeManagementTabList} />
      </div>
      <StoreManagementComponent.StoreManagementRouter
        restaurantId={restaurantId}
      />
    </>
  )
}
