import { useMutation } from '@tanstack/react-query'
import { updateReviewSetting, withdraw } from '@/apis/services/etc'
import type { ReviewSettingRequest } from '@/types/etc'

export function useWithdraw() {
  return useMutation({ mutationFn: withdraw })
}

export function useUpdateReviewSetting(restaurantId: number) {
  return useMutation({
    mutationFn: (body: ReviewSettingRequest) =>
      updateReviewSetting(restaurantId, body)
  })
}
