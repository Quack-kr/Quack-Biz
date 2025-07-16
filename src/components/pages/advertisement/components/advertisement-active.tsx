import { Check } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

import type { Advertisement } from '@/types/advertisement'
import { advertisements } from '@/constants/advertisement'

const getAdvertisementStatusColor = (status: Advertisement['status']) => {
  switch (status) {
    case '진행중':
      return 'bg-green-500'
    case '일시중지':
      return 'bg-yellow-500'
    case '완료':
      return 'bg-gray-500'
    default:
      return 'bg-gray-500'
  }
}

export function AdvertisementActive() {
  if (advertisements.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-lg text-[#A8A7A1]">진행중인 광고가 없어요</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 text-[#A8A7A1] md:grid-cols-[1fr_375px] md:gap-[111px] xl:pl-10 xl:pr-0">
      <div className="space-y-4">
        {/* 헤더 */}
        <div className="flex items-center gap-4 border-b border-[#3A3A36] pb-2 text-sm text-[#A8A7A1]">
          <div className="flex items-center gap-2">
            <span>수정하기</span>
            <span>삭제</span>
          </div>
        </div>

        {/* 테이블 헤더 */}
        <div className="grid grid-cols-[1fr_100px_150px_100px] gap-4 border-b border-[#3A3A36] pb-2 text-sm text-[#A8A7A1]">
          <span>광고 제목</span>
          <span>잔여수</span>
          <span>광고기간</span>
          <span>상태</span>
        </div>

        {/* 광고 목록 */}
        <div className="space-y-3">
          {advertisements.map((ad) => (
            <Card
              key={ad.id}
              className="border-none bg-[#21211D] transition-colors hover:bg-[#2A2A26]"
            >
              <CardContent className="p-4">
                <div className="grid grid-cols-[1fr_100px_150px_100px] items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-6 items-center justify-center rounded border-2 border-[#3A3A36]">
                      <Check className="size-4 text-[#EFD800]" />
                    </div>
                    <span className="font-medium text-white">{ad.title}</span>
                  </div>

                  <span className="text-white">{ad.remaining}</span>

                  <span className="text-[#A8A7A1]">{ad.period}</span>

                  <div className="flex items-center gap-2">
                    <div
                      className={`size-2 rounded-full ${getAdvertisementStatusColor(
                        ad.status
                      )}`}
                    />
                    <span className="text-sm text-[#A8A7A1]">{ad.status}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
