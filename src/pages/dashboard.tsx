import React from 'react'

import { OwnerNote } from '@/components/pages/dashboard/ui/owner-note'
import { MenuEvaluation } from '@/components/pages/dashboard/ui/menu-evaluation'
import { WeeklySaveCard } from '@/components/pages/dashboard/ui/weekly-save-card'
import { WeeklyReviewCard } from '@/components/pages/dashboard/ui/weekly-review-card'
import { MenuEvaluationByItem } from '@/components/pages/dashboard/ui/menu-evaluation-by-item'
import { VisitHesitationReasons } from '@/components/pages/dashboard/ui/visit-hesitation-reasons'
import { useRestaurants } from '@/queries/dashboard'

export default function DashboardPage() {
  const { data } = useRestaurants()

  if (!data?.data?.[0]?.id)
    return (
      <div className="py-5 text-[#A8A7A1] xl:mb-10 xl:ml-10 xl:p-0 xl:pb-4">
        <span>사용자의 상점이 없습니다.</span>
      </div>
    )

  return <Inner restaurantId={data.data[0].id} />
}

const Inner = ({ restaurantId }: { restaurantId: number }) => {
  return (
    <>
      {/* 상단 타이틀 */}
      <div className="py-5 xl:mb-10 xl:ml-10 xl:p-0 xl:pb-4">
        <h1 className="mb-3 text-xl font-bold text-white">가게 현황</h1>
        {/* 메인 그리드 */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* 1열: 주간 리뷰, 주간 저장 */}
          <div className="space-y-6">
            <WeeklyReviewCard restaurantId={restaurantId} />
            <MenuEvaluation restaurantId={restaurantId} />
            <VisitHesitationReasons restaurantId={restaurantId} />
          </div>
          {/* 2열: 메뉴 평가, 방문 망설임 사유 */}
          <div className="space-y-6">
            <WeeklySaveCard restaurantId={restaurantId} />
            <MenuEvaluationByItem restaurantId={restaurantId} />
            <OwnerNote />
          </div>
        </div>
      </div>
    </>
  )
}
