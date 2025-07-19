/** 회원 탈퇴 */
export interface WithdrawRequest {
  userId: number
  reason: string
}

export interface WithdrawResponse {
  message: string
  data: string // 탈퇴 예정일시 (ISO8601)
}

/** 리뷰 허용 설정 */
export interface ReviewSettingRequest {
  allowReview: boolean
}

export interface ReviewSettingResponse {
  message: string
  data: {
    restaurantId: number
    allowReview: boolean
    updatedAt: string // ISO8601
  }
}
