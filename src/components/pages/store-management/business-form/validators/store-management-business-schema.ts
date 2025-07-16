import { z } from 'zod'

export const StoreManagementBusinessSchema = z.object({
  status: z.enum(['영업중', '임시휴무', '재료소진', '준비중']),
  openType: z.enum(['매일같아요', '요일별로달라요']),
  openTime: z.object({
    same: z.object({
      start: z.string(),
      end: z.string()
    }),
    different: z.object({
      월: z.object({ start: z.string(), end: z.string(), closed: z.boolean() }),
      화: z.object({ start: z.string(), end: z.string(), closed: z.boolean() }),
      수: z.object({ start: z.string(), end: z.string(), closed: z.boolean() }),
      목: z.object({ start: z.string(), end: z.string(), closed: z.boolean() }),
      금: z.object({ start: z.string(), end: z.string(), closed: z.boolean() }),
      토: z.object({ start: z.string(), end: z.string(), closed: z.boolean() }),
      일: z.object({ start: z.string(), end: z.string(), closed: z.boolean() })
    })
  }),
  breakTime: z.object({
    hasBreak: z.boolean(),
    start: z.string(),
    end: z.string()
  }),
  holiday: z.array(z.enum(['월', '화', '수', '목', '금', '토', '일'])),
  lastOrder: z.object({
    hasLast: z.boolean(),
    time: z.string()
  }),
  note: z.string()
})

export type StoreManagementBusinessFormValues = z.infer<
  typeof StoreManagementBusinessSchema
>
