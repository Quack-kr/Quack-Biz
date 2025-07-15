import { Card, CardContent } from '@/components/ui/card'
import { mockStoreCards } from '@/constants/dashboard'

export const MyStores = () => {
  return (
    <div className="mb-6 py-5 xl:mb-0 xl:px-10 xl:py-14">
      <h2 className="mb-4 text-xl font-bold text-quack-white">내 가게</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {mockStoreCards.map((store, index) => (
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
  )
}
