import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Camera } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { FormSection } from '@/components/ui/form-section/form-section'
import { TextField } from '@/components/ui/form-section/form-fields/text-field'
import { TextareaField } from '@/components/ui/form-section/form-fields/textarea-field'
import { PhotoGridField } from '@/components/ui/form-section/form-fields/photo-grid-field'
import { MenuItemsField } from '@/components/ui/form-section/form-fields/menu-items-field'
import { SingleSelect } from '@/components/ui/select/single-select'
import {
  MenuManagementSchema,
  MenuItemSchema,
  type MenuManagementFormValues,
  type MenuItemFormValues
} from './validators/menu-management-schema'
import { useMenu } from '@/queries/menu'

type OpenSection = 'menuPhotos' | 'menuItem' | 'addMenuItem' | null

export function MenuManagementForm({ restaurantId }: { restaurantId: number }) {
  useMenu(restaurantId)

  const form = useForm<MenuManagementFormValues>({
    resolver: zodResolver(MenuManagementSchema),
    defaultValues: {
      menuPhotos: [],
      menuItems: [
        {
          id: '1',
          name: '타코야끼',
          price: 10000,
          description:
            '일본 전통 타코야끼를 한국인 입맛에 맞게 재해석한 메뉴입니다',
          category: '메인메뉴',
          photos: ['/placeholder.svg?height=100&width=100'],
          isAvailable: true
        },
        {
          id: '2',
          name: '타코야끼',
          price: 10000,
          description: '',
          category: '메인메뉴',
          photos: [],
          isAvailable: true
        },
        {
          id: '3',
          name: '타코야끼',
          price: 10000,
          description: '',
          category: '메인메뉴',
          photos: [],
          isAvailable: true
        }
      ],
      categories: ['메인메뉴', '사이드메뉴', '음료']
    }
  })

  const { handleSubmit, setValue, watch } = form
  const formData = watch()
  const [open, setOpen] = useState<OpenSection>(null)
  const [editingMenuItem, setEditingMenuItem] =
    useState<MenuItemFormValues | null>(null)

  // 메뉴 아이템 폼
  const menuItemForm = useForm<MenuItemFormValues>({
    resolver: zodResolver(MenuItemSchema),
    defaultValues: {
      id: '',
      name: '',
      price: 0,
      description: '',
      category: '메인메뉴',
      photos: [],
      isAvailable: true
    }
  })

  const handleEditMenuItem = (item: MenuItemFormValues) => {
    setEditingMenuItem(item)
    menuItemForm.reset(item)
    setOpen('menuItem')
  }

  const handleAddMenuItem = () => {
    setEditingMenuItem(null)
    menuItemForm.reset({
      id: Date.now().toString(),
      name: '',
      price: 0,
      description: '',
      category: '메인메뉴',
      photos: [],
      isAvailable: true
    })
    setOpen('addMenuItem')
  }

  const handleSaveMenuItem = (data: MenuItemFormValues) => {
    const currentItems = formData.menuItems
    if (editingMenuItem) {
      const updatedItems = currentItems.map((item) =>
        item.id === editingMenuItem.id ? data : item
      )
      setValue('menuItems', updatedItems)
    } else {
      setValue('menuItems', [...currentItems, data])
    }
    setOpen(null)
    setEditingMenuItem(null)
  }

  const handleDeleteMenuItem = (id: string) => {
    const updatedItems = formData.menuItems.filter((item) => item.id !== id)
    setValue('menuItems', updatedItems)
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_375px] md:gap-[111px] xl:pl-10 xl:pr-0">
      {/* 왼쪽 컬럼 - 메뉴 관리 */}
      <div className="space-y-6">
        {/* 메뉴 가져오기 */}
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <span className="font-medium text-white">메뉴 가져오기</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="rounded-[8px] border-none bg-[#21211D] text-xs text-white"
          >
            가져오기
          </Button>
        </div>

        {/* 메뉴판 사진 등록 */}
        <FormSection
          title="메뉴판 사진 등록"
          subtitle="최대 10장"
          value={
            <div className="flex items-center gap-2">
              <Camera className="size-4 text-quack-gray" />
              <span>
                {formData.menuPhotos.length > 0
                  ? `${formData.menuPhotos.length}장 등록됨`
                  : '등록된 사진이 없어요'}
              </span>
            </div>
          }
          isOpen={open === 'menuPhotos'}
          onOpenChange={(isOpen) => setOpen(isOpen ? 'menuPhotos' : null)}
          onSubmit={handleSubmit(() => setOpen(null))}
        >
          <PhotoGridField
            photos={formData.menuPhotos}
            maxPhotos={10}
            onPhotosChange={(photos) => setValue('menuPhotos', photos)}
            label="메뉴판 사진"
          />
        </FormSection>

        {/* 메뉴 */}
        <MenuItemsField
          menuItems={formData.menuItems}
          onEditItem={handleEditMenuItem}
          onDeleteItem={handleDeleteMenuItem}
          onAddItem={handleAddMenuItem}
        />

        {/* 메뉴 아이템 추가/수정 다이얼로그 */}
        <Dialog
          open={open === 'menuItem' || open === 'addMenuItem'}
          onOpenChange={(o) => setOpen(o ? open : null)}
        >
          <DialogContent className="min-w-[784px] !rounded-[20px] border-none bg-quack-black px-[120px] py-[60px]">
            <DialogHeader>
              <DialogTitle className="text-[32px] text-quack-white">
                {editingMenuItem ? '메뉴 수정' : '메뉴 추가'}
              </DialogTitle>
            </DialogHeader>
            <form
              onSubmit={menuItemForm.handleSubmit(handleSaveMenuItem)}
              className="mt-6 flex flex-col gap-6"
            >
              <div className="grid grid-cols-2 gap-6">
                <TextField
                  id="name"
                  label="메뉴명 *"
                  value={menuItemForm.watch('name')}
                  onChange={(value) => menuItemForm.setValue('name', value)}
                  placeholder="메뉴명을 입력해주세요"
                />
                <TextField
                  id="price"
                  label="가격 *"
                  value={menuItemForm.watch('price').toString()}
                  onChange={(value) =>
                    menuItemForm.setValue('price', Number.parseInt(value) || 0)
                  }
                  placeholder="가격을 입력해주세요"
                />
              </div>

              <div className="space-y-2">
                <label className="text-white">카테고리 *</label>
                <SingleSelect
                  options={formData.categories}
                  defaultValue={menuItemForm.watch('category')}
                  onValueChange={(value) =>
                    menuItemForm.setValue('category', value)
                  }
                />
              </div>

              <TextareaField
                id="description"
                label="메뉴 설명"
                value={menuItemForm.watch('description') || ''}
                onChange={(value) =>
                  menuItemForm.setValue('description', value)
                }
                placeholder="메뉴에 대한 설명을 입력해주세요"
                minHeight="100px"
              />

              <PhotoGridField
                photos={menuItemForm.watch('photos')}
                maxPhotos={4}
                onPhotosChange={(photos) =>
                  menuItemForm.setValue('photos', photos)
                }
                label="메뉴 사진"
              />

              <DialogFooter>
                <Button
                  type="submit"
                  className="mx-auto mt-4 h-14 w-[380px] rounded-[8px] bg-[#EFD800] font-pretendard text-base font-bold text-quack-black transition hover:bg-[#FFD600]"
                >
                  {editingMenuItem ? '수정하기' : '추가하기'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* 오른쪽 컬럼 - 메뉴판 미리보기 */}
      <div className="space-y-6 border-t border-t-quack-gray pb-8 pt-6 md:border-t-0 md:py-0">
        <div>
          <h3 className="mb-4 font-medium text-white">메뉴판 미리보기</h3>
          <Card className="rounded-none border-none bg-[#2A2A26]">
            <CardContent className="p-0">
              <div className="relative">
                <div className="rounded-t-lg bg-black p-4 text-white">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">9:41</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="flex gap-1">
                        <div className="size-1 rounded-full bg-white"></div>
                        <div className="size-1 rounded-full bg-white"></div>
                        <div className="size-1 rounded-full bg-white"></div>
                        <div className="size-1 rounded-full bg-white"></div>
                      </div>
                      <div className="text-xs">100%</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium">메뉴판</span>
                    <div className="text-sm text-gray-300">
                      메뉴판 사진으로 보기 &gt;
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardContent className="bg-black p-4 text-white">
              {formData.menuPhotos.length > 0 && (
                <div className="mb-4">
                  <div className="flex gap-2 overflow-x-auto">
                    {formData.menuPhotos.slice(0, 4).map((photo, index) => (
                      <img
                        key={index}
                        src={photo || '/placeholder.svg'}
                        alt={`메뉴판 ${index + 1}`}
                        className="size-20 shrink-0 rounded-lg object-cover"
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {formData.categories.map((category) => {
                  const categoryItems = formData.menuItems.filter(
                    (item) => item.category === category
                  )
                  if (categoryItems.length === 0) return null

                  return (
                    <div key={category}>
                      <h4 className="mb-3 text-lg font-medium text-[#EFD800]">
                        {category}
                      </h4>
                      <div className="space-y-3">
                        {categoryItems.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-3 rounded-lg bg-gray-900 p-3"
                          >
                            <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-700">
                              {item.photos.length > 0 ? (
                                <img
                                  src={item.photos[0] || '/placeholder.svg'}
                                  alt={item.name}
                                  className="size-full object-cover"
                                />
                              ) : (
                                <Camera className="size-6 text-gray-400" />
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <h5 className="truncate font-medium text-white">
                                {item.name}
                              </h5>
                              {item.description && (
                                <p className="mt-1 line-clamp-2 text-sm text-gray-300">
                                  {item.description}
                                </p>
                              )}
                              <p className="mt-1 font-medium text-[#EFD800]">
                                {item.price.toLocaleString()}원
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
