import { Card, CardContent } from '@/components/ui/card'
import { useRestaurants } from '@/queries/restaurant'
import type { Restaurant } from '@/types/restaurant'

const statusMap = {
  APPROVED: { label: '영업중', color: 'bg-green-500' },
  PENDING: { label: '영업준비중', color: 'bg-yellow-500' },
  BLOCKED: { label: '노출차단', color: 'bg-red-500' }
}

export const MyStores = () => {
  const { data } = useRestaurants()

  if (!data || !data.data.length) return <div>등록된 가게가 없습니다.</div>

  return (
    <div className="mb-6 py-5 xl:mb-0 xl:px-10 xl:py-14">
      <h2 className="mb-4 text-xl font-bold text-quack-white">내 가게</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {data.data.map((store: Restaurant) => {
          // 없으면 디폴트
          const status = statusMap[store.status] || {
            label: store.status,
            color: 'bg-gray-500'
          }
          return (
            <Card key={store.id} className="border-[#A8A7A1]/20 bg-[#2A2A26]">
              <CardContent className="p-4">
                <div>
                  <h3 className="mb-2 text-sm font-medium text-quack-white">
                    {store.name}
                  </h3>
                  <p className="mb-4 text-xs text-quack-white">
                    {store.simpleIntroduction}
                  </p>
                  <div className="flex items-center gap-2">
                    <div
                      className={`size-2 rounded-full ${status.color}`}
                    ></div>
                    <span className="text-xs text-white">{status.label}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
