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
