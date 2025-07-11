import api from 'lib/axios'
import type { InquiryRequest, InquirySuccessResponse } from '@/types/common'

export async function postInquiry(
  body: InquiryRequest
): Promise<InquirySuccessResponse> {
  const { data } = await api.post<InquirySuccessResponse>(
    '/v1/landing/contact',
    body
  )
  return data
}
