import { z } from 'zod'

export const StoreManagementBasicSchema = z.object({
  storeName: z.string().min(1, '가게명을 입력해주세요'),
  address: z.string().min(1, '주소를 입력해주세요'),
  exposureArea: z.string().min(1, '노출지역을 선택해주세요'),
  businessType: z.object({
    emoji: z.string(),
    name: z.string().min(1, '업종을 선택해주세요')
  }),
  contacts: z
    .array(
      z.object({
        type: z.enum(['phone', 'kakao', 'instagram']),
        value: z.string().min(1, '연락처를 입력해주세요')
      })
    )
    .max(5, '연락사항은 최대 5개까지 등록 가능합니다'),
  oneLineIntro: z.string(),
  detailedIntro: z.string(),
  services: z.array(z.string()),
  photos: z.array(z.string()).max(5, '사진은 최대 5장까지 등록 가능합니다')
})

export type StoreManagementBasicFormValues = z.infer<
  typeof StoreManagementBasicSchema
>
