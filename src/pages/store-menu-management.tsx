import { MenuManagementForm } from '@/components/pages/store-menu-management/menu-management-form'
import { useRestaurants } from '@/queries/restaurant'

export default function StoreMenuManagementPage() {
  const { data } = useRestaurants()

  const restaurantId = data?.data?.[0]?.id

  if (!restaurantId) {
    return (
      <div className="py-5 text-[#A8A7A1] xl:mb-10 xl:ml-10 xl:p-0 xl:pb-4">
        <span>사용자의 상점이 없습니다.</span>
      </div>
    )
  }

  return <MenuManagementForm restaurantId={restaurantId} />
}
