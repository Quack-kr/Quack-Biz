import { z } from 'zod'

import { BUSINESS_NUMBER_REGEX, PHONE_NUMBER_REGEX } from '@/utils/regex'

export const StoreOnboardingSchema = z.object({
  businessNumber: z
    .string()
    .regex(
      BUSINESS_NUMBER_REGEX,
      '올바른 사업자등록번호 형식(예: 123-45-67890)을 입력해주세요.'
    ),
  ceoName: z.string().min(1, '대표자명을 입력해주세요.'),
  ceoPhone: z
    .string()
    .regex(PHONE_NUMBER_REGEX, '올바른 휴대폰 번호를 입력해주세요.'),
  storeName: z.string().min(1, '가게명을 입력해주세요.'),
  businessFile: z.instanceof(File).optional(),
  agree: z.boolean()
})

export type StoreOnboardingFormValues = z.infer<typeof StoreOnboardingSchema>
