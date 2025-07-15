import React from 'react'

import { MenuEvaluation } from '@/components/pages/dashboard/ui/menu-evaluation'
import { OwnerNote } from '@/components/pages/dashboard/ui/owner-note'
import { VisitHesitationReasons } from '@/components/pages/dashboard/ui/visit-hesitation-reasons'
import { WeeklyReviewCard } from '@/components/pages/dashboard/ui/weekly-review-card'
import { WeeklySaveCard } from '@/components/pages/dashboard/ui/weekly-save-card'

export default function DashboardPage() {
  return (
    <>
      {/* 상단 타이틀 */}
      <div className="py-5 xl:mb-10 xl:ml-10 xl:p-0 xl:pb-4">
        <h1 className="mb-3 text-xl font-bold text-white">가게 현황</h1>
        {/* 메인 그리드 */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* 1열: 주간 리뷰, 주간 저장 */}
          <div className="space-y-6">
            <WeeklyReviewCard />
            <MenuEvaluation />
            <VisitHesitationReasons />
          </div>
          {/* 2열: 메뉴 평가, 방문 망설임 사유 */}
          <div className="space-y-6">
            <WeeklySaveCard />
            <MenuEvaluation />
            <OwnerNote />
          </div>
        </div>
      </div>
    </>
  )
}
