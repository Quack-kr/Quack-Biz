import { Check } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import { advertisementTypes } from '@/constants/advertisement'

export function AdvertisementCreate() {
  return (
    <div className="grid grid-cols-1 gap-6 text-[#A8A7A1] md:grid-cols-[1fr_375px] md:gap-[111px] xl:pl-10 xl:pr-0">
      <div className="space-y-6">
        {advertisementTypes.map((ad) => (
          <Card
            key={ad.id}
            className={`border-none ${
              ad.highlighted ? 'bg-[#2A2A26]' : 'bg-[#21211D]'
            } `}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-2">
                  <h3 className="text-lg font-medium text-white">{ad.title}</h3>
                  <p className="text-sm text-[#A8A7A1]">{ad.description}</p>

                  {ad.price && (
                    <div className="mt-4">
                      <p className="text-xl font-medium text-white">
                        {ad.price}
                      </p>
                    </div>
                  )}

                  {ad.features && (
                    <div className="mt-4 space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        {ad.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            {feature.startsWith('O') ? (
                              <Check className="size-4 text-green-500" />
                            ) : (
                              <span className="text-sm text-red-500">✕</span>
                            )}
                            <span className="text-sm text-[#A8A7A1]">
                              {feature.substring(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {ad.note && (
                    <div className="mt-4">
                      <p className="text-xs text-[#A8A7A1]">{ad.note}</p>
                    </div>
                  )}
                </div>

                <div className="ml-6">
                  {ad.highlighted ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-[#EFD800] px-8 font-medium text-black hover:bg-[#FFD600]">
                          {ad.buttonText}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="min-w-[500px] border-none bg-quack-black">
                        <DialogHeader>
                          <DialogTitle className="text-xl text-white">
                            {ad.title}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="py-4">
                          <p className="mb-4 text-[#A8A7A1]">
                            광고를 시작하시겠습니까?
                          </p>
                          <div className="rounded-lg bg-[#2A2A26] p-4">
                            <p className="font-medium text-white">{ad.price}</p>
                            <p className="mt-2 text-sm text-[#A8A7A1]">
                              첫 달은 무료로 체험하실 수 있습니다.
                            </p>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button className="bg-[#EFD800] text-black hover:bg-[#FFD600]">
                            확인
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <Button
                      variant="outline"
                      className="border-[#3A3A36] bg-transparent text-white hover:bg-[#2A2A26]"
                    >
                      {ad.buttonText}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
