import api from '@/lib/axios'
import type {
  WithdrawRequest,
  WithdrawResponse,
  ReviewSettingRequest,
  ReviewSettingResponse
} from '@/types/etc'

export async function withdraw(
  body: WithdrawRequest
): Promise<WithdrawResponse> {
  const res = await api.post<WithdrawResponse>('/v1/auth/withdraw', body)
  return res.data
}

export async function updateReviewSetting(
  restaurantId: number,
  body: ReviewSettingRequest
): Promise<ReviewSettingResponse> {
  const res = await api.post<ReviewSettingResponse>(
    `/v1/restaurants/${restaurantId}/review-setting`,
    body
  )
  return res.data
}
