import LnbComponent from '@/components/ui/lnb/lnb'
import { AdvertisementComponent } from '@/components/pages'
import { advertisementTabList } from '@/constants/advertisement'

export default function AdvertisementPage() {
  return (
    <>
      <div className="py-5 pb-6 xl:pb-10 xl:pl-10 xl:pt-0">
        <LnbComponent tabList={advertisementTabList} />
      </div>
      <AdvertisementComponent.AdvertisementRouter />
    </>
  )
}
