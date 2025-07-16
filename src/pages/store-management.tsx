import LnbComponent from '@/components/ui/lnb/lnb'
import { StoreManagementComponent } from '@/components/pages'

import { storeManagementTabList } from '@/constants/store-management'

export default function StoreManagementPage() {
  return (
    <>
      <div className="py-5 pb-6 xl:pb-10 xl:pl-10 xl:pt-0">
        <LnbComponent tabList={storeManagementTabList} />
      </div>
      <StoreManagementComponent.StoreManagementRouter />
    </>
  )
}
