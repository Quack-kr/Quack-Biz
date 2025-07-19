export interface InquiryRequest {
  name: string
  email: string
  message: string
}

export interface InquiryErrorResponse {
  message: string
  data: {
    name?: string
    email?: string
    message?: string
  }
}

export interface InquirySuccessResponse {
  data: 'OK'
}

/**  이미지 업로드 */
export type ImageCategory = 'menu_board' | 'restaurant' | 'menu'

export interface UploadImageFormData {
  order: string
  category: ImageCategory
  image: File
}
export interface UploadImageResponse {
  message: string
  data: string // 이미지 URL
}

export interface BasicOkResponse {
  message: string
  data: string
}
