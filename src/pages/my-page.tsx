import LnbComponent from '@/components/ui/lnb/lnb'
import { MyPageComponent } from '@/components/pages'
import { myPageTabList } from '@/constants/my-page'

export default function MyPage() {
  return (
    <>
      <div className="py-5 pb-6 xl:pb-10 xl:pl-10 xl:pt-0">
        <LnbComponent tabList={myPageTabList} />
      </div>
      <div className="grid grid-cols-1 gap-6 text-[#A8A7A1] md:grid-cols-[1fr_375px] md:gap-[111px] xl:pl-10 xl:pr-0">
        <MyPageComponent.MyPageRouter />
      </div>
    </>
  )
}
