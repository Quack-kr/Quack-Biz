import { z } from 'zod'

export const MenuItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, '메뉴명을 입력해주세요'),
  price: z.number().min(0, '가격을 입력해주세요'),
  description: z.string().optional(),
  category: z.string().min(1, '카테고리를 선택해주세요'),
  photos: z.array(z.string()).max(10, '사진은 최대 10장까지 등록 가능합니다'),
  isAvailable: z.boolean()
})

export const MenuManagementSchema = z.object({
  menuPhotos: z
    .array(z.string())
    .max(10, '메뉴판 사진은 최대 10장까지 등록 가능합니다'),
  menuItems: z.array(MenuItemSchema),
  categories: z.array(z.string())
})

export type MenuItemFormValues = z.infer<typeof MenuItemSchema>
export type MenuManagementFormValues = z.infer<typeof MenuManagementSchema>
