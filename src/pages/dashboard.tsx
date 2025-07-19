import { OwnerNote } from '@/components/pages/dashboard/ui/owner-note'
import { MenuEvaluation } from '@/components/pages/dashboard/ui/menu-evaluation'
import { WeeklySaveCard } from '@/components/pages/dashboard/ui/weekly-save-card'
import { WeeklyReviewCard } from '@/components/pages/dashboard/ui/weekly-review-card'
import { MenuEvaluationByItem } from '@/components/pages/dashboard/ui/menu-evaluation-by-item'
import { VisitHesitationReasons } from '@/components/pages/dashboard/ui/visit-hesitation-reasons'
import { useRestaurants } from '@/queries/restaurant'
import { Suspense } from 'react'
import { LoadingCard } from '@/components/ui'

export default function DashboardPage() {
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
    <div className="py-5 xl:mb-10 xl:ml-10 xl:p-0 xl:pb-4">
      <h1 className="mb-3 text-xl font-bold text-white">가게 현황</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-6">
          <Suspense fallback={<LoadingCard title="로딩중" />}>
            <WeeklyReviewCard restaurantId={restaurantId} />
          </Suspense>
          <Suspense fallback={<LoadingCard title="로딩중" height={142} />}>
            <MenuEvaluation restaurantId={restaurantId} />
          </Suspense>
          <Suspense fallback={<LoadingCard title="로딩중" height={200} />}>
            <VisitHesitationReasons restaurantId={restaurantId} />
          </Suspense>
        </div>
        <div className="space-y-6">
          <Suspense fallback={<LoadingCard title="로딩중" />}>
            <WeeklySaveCard restaurantId={restaurantId} />
          </Suspense>
          <Suspense fallback={<LoadingCard title="로딩중" height={142} />}>
            <MenuEvaluationByItem restaurantId={restaurantId} />
          </Suspense>
          <Suspense fallback={<LoadingCard title="로딩중" height={200} />}>
            <OwnerNote />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
