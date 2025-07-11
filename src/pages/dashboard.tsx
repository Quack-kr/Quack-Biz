import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, Clock, Phone } from 'lucide-react'

export default function DashboardPage() {
  const storeCards = [
    {
      title: '나가이 우동 1호점',
      subtitle: '주소: 광진구 자양로 31길 9호',
      status: '영업준비중',
      statusColor: 'bg-yellow-500'
    },
    {
      title: '나가이 우동 2호점',
      subtitle: '주소: 광진구 자양로 31길 9호',
      status: '영업중',
      statusColor: 'bg-green-500'
    },
    {
      title: '나가이 우동 3호점',
      subtitle: '주소: 광진구 자양로 31길 9호',
      status: '노출차단',
      statusColor: 'bg-red-500'
    },
    {
      title: '나가이 우동 4호점',
      subtitle: '주소: 광진구 자양로 31길 9호',
      status: '노출차단',
      statusColor: 'bg-red-500'
    }
  ]

  return (
    <div className="flex flex-col xl:mb-[120px]">
      {/* 내 가게 섹션 */}
      <div className="mb-6 py-5 xl:mb-0 xl:px-10 xl:py-14">
        <h2 className="mb-4 text-xl font-bold text-quack-white">내 가게</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {storeCards.map((store, index) => (
            <Card key={index} className="border-[#A8A7A1]/20 bg-[#2A2A26]">
              <CardContent className="p-4">
                <div>
                  <h3 className="mb-2 text-sm font-medium text-quack-white">
                    {store.title}
                  </h3>
                  <p className="mb-4 text-xs text-quack-white">
                    {store.subtitle}
                  </p>
                  <div className="flex items-center gap-2">
                    <div
                      className={`size-2 rounded-full ${store.statusColor}`}
                    ></div>
                    <span className="text-xs text-white">{store.status}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 기본정보 섹션 */}
      <div className="mb-6 flex items-start gap-4 border-b border-b-quack-gray py-5 xl:mb-10 xl:ml-10 xl:p-0 xl:pb-4">
        <button className="text-lg font-semibold text-quack-white">
          기본정보
        </button>
        <button className="text-lg font-semibold text-quack-gray">
          영업정보
        </button>
      </div>

      {/* 메인 콘텐츠 그리드 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_375px] md:gap-[111px] xl:pl-10 xl:pr-0">
        {/* 왼쪽 컬럼 - 가게 정보 */}
        <div className="space-y-6">
          {/* 가게명 */}
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-medium text-white">가게명</span>
                <span className="text-xs text-[#EFD800]">
                  수정시 심사를 진행중이에요
                </span>
              </div>
              <div className="text-sm text-[#A8A7A1]">백설식당 1호</div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="rounded-[8px] border-none bg-[#21211D] text-xs text-white"
            >
              수정하기
            </Button>
          </div>

          {/* 주소 */}
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-medium text-white">주소</span>
                <span className="text-xs text-[#EFD800]">
                  수정시 심사를 진행중이에요
                </span>
              </div>
              <div className="text-sm text-[#A8A7A1]">
                서울특별시 광진구 자양로 31길 9호
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="rounded-[8px] border-none bg-[#21211D] text-xs text-white"
            >
              수정하기
            </Button>
          </div>

          {/* 노출지역 */}
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <span className="font-medium text-white">노출지역</span>
              <div className="text-sm text-[#A8A7A1]">광진구/건대</div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="rounded-[8px] border-none bg-[#21211D] text-xs text-white"
            >
              수정하기
            </Button>
          </div>

          {/* 업종 */}
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <span className="font-medium text-white">업종</span>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🍜</span>
                <span className="text-sm text-[#A8A7A1]">냉면</span>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="rounded-[8px] border-none bg-[#21211D] text-xs text-white"
            >
              수정하기
            </Button>
          </div>

          {/* 연락사항 */}
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <span className="font-medium text-white">연락사항</span>
              <span className="ml-2 text-sm text-[#A8A7A1]">최대 5개</span>
              <div className="flex items-center gap-2">
                <Phone className="size-4 text-quack-gray" />
                <span className="text-sm text-[#A8A7A1]">전화번호</span>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="rounded-[8px] border-none bg-[#21211D] text-xs text-white"
            >
              수정하기
            </Button>
          </div>

          {/* 한 줄 소개 */}
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <span className="font-medium text-white">한 줄 소개</span>
              <span className="ml-2 text-sm text-[#A8A7A1]">최대 40자</span>
              <div className="text-sm text-[#A8A7A1]">등록된 내용이 없어요</div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="rounded-[8px] border-none bg-[#21211D] text-xs text-white"
            >
              등록하기
            </Button>
          </div>

          {/* 상세소개 */}
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <span className="font-medium text-white">상세소개</span>
              <span className="ml-2 text-sm text-[#A8A7A1]">
                최대 150자 (엔터최대 400x150)
              </span>
              <div className="text-sm text-[#A8A7A1]">등록된 내용이 없어요</div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="rounded-[8px] border-none bg-[#21211D] text-xs text-white"
            >
              등록하기
            </Button>
          </div>

          {/* 서비스 및 환경 */}
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <span className="font-medium text-white">서비스 및 환경</span>
              <div className="text-sm text-[#A8A7A1]">고기 구워드려요</div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="rounded-[8px] border-none bg-[#21211D] text-xs text-white"
            >
              수정하기
            </Button>
          </div>
        </div>

        {/* 오른쪽 컬럼 - 이미지 및 지도 */}
        <div className="space-y-6 border-t border-t-quack-gray pb-8 pt-6 md:border-t-0 md:py-0">
          {/* 가게 미리보기 */}
          <div>
            <h3 className="mb-4 font-medium text-white">가게 미리보기</h3>
            <Card className="rounded-none border-[#A8A7A1]/20 bg-[#2A2A26]">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src="/placeholder.png"
                    alt="백설식당 1호"
                    className="h-[350px] w-full rounded-t-lg object-cover"
                  />
                  <div className="absolute left-2 top-2">
                    <Badge className="text-white">9:41</Badge>
                  </div>
                  <div className="absolute inset-x-4 bottom-4">
                    <div className="rounded-lg bg-[#21211D] p-3 text-white">
                      <h4 className="font-medium">백설식당 1호</h4>
                      <p className="text-sm text-gray-300">
                        한식 • 냉면 • 1.8km
                      </p>
                      <p className="mt-2 text-sm">
                        부산에서 서울까지 진출해버린 연남동 맛집
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardContent className="p-4">
                <div className="flex h-[139px] items-center justify-center rounded-lg bg-gray-200">
                  <img
                    src="/map-placeholder.png"
                    alt="지도"
                    className="size-full rounded-lg object-cover"
                  />
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="size-4 text-[#A8A7A1]" />
                    <span className="text-[#A8A7A1]">
                      서울 광진구 광나루로 11길 26
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="size-4 text-[#A8A7A1]" />
                    <span className="text-[#A8A7A1]">
                      영업시간 • 매일 10:00~23:00
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
