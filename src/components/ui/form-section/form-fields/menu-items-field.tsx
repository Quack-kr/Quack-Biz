import { Camera, Edit, Plus, X } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface MenuItem {
  id: string
  name: string
  price: number
  description?: string
  category: string
  photos: string[]
  isAvailable: boolean
}

interface MenuItemsFieldProps {
  menuItems: MenuItem[]
  onEditItem: (item: MenuItem) => void
  onDeleteItem: (id: string) => void
  onAddItem: () => void
}

export function MenuItemsField({
  menuItems,
  onEditItem,
  onDeleteItem,
  onAddItem
}: MenuItemsFieldProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="font-medium text-white">메뉴</span>
        <Button
          onClick={onAddItem}
          variant="outline"
          size="sm"
          className="rounded-[8px] border-none bg-[#21211D] text-xs text-white hover:bg-[#2A2A26]"
        >
          <Plus className="mr-1 size-4" />
          메뉴 추가
        </Button>
      </div>

      {menuItems.length === 0 ? (
        <div className="py-8 text-center text-sm text-[#A8A7A1]">
          등록된 메뉴가 없어요
        </div>
      ) : (
        <div className="space-y-3">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-lg bg-[#2A2A26] p-4"
            >
              <div className="flex items-center gap-4">
                <div className="flex size-16 items-center justify-center overflow-hidden rounded-lg bg-[#3A3A36]">
                  {item.photos.length > 0 ? (
                    <img
                      src={item.photos[0] || '/placeholder.svg'}
                      alt={item.name}
                      className="size-full object-cover"
                    />
                  ) : (
                    <Camera className="size-6 text-[#A8A7A1]" />
                  )}
                </div>
                <div className="space-y-1">
                  <h4 className="font-medium text-white">{item.name}</h4>
                  <p className="font-medium text-[#EFD800]">
                    {item.price.toLocaleString()}원
                  </p>
                  {item.description && (
                    <p className="max-w-md text-sm text-[#A8A7A1]">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => onEditItem(item)}
                  variant="outline"
                  size="sm"
                  className="rounded-[8px] border-none bg-[#21211D] text-xs text-white"
                >
                  <Edit className="mr-1 size-3" />
                  수정
                </Button>
                <Button
                  onClick={() => onDeleteItem(item.id)}
                  variant="outline"
                  size="sm"
                  className="rounded-[8px] border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                >
                  <X className="size-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
