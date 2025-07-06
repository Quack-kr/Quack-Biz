// 1. 사업자등록번호 조회
export interface LookupBusinessNumberSuccess {
  message: '조회되었습니다.'
  data: 'OK'
}

export interface LookupBusinessNumberError {
  message: '해당 사업자 번호를 찾을 수 없습니다.'
  data: { number: string }
}

export type LookupBusinessNumberResponse =
  | LookupBusinessNumberSuccess
  | LookupBusinessNumberError

// 2. 사업자등록증 업로드
export interface UploadBusinessLicenseSuccess {
  message: '파일이 첨부되었습니다.'
  data: string
}

export interface UploadBusinessLicenseError {
  message: string
  data: { file?: string; businessNumber?: string }
}

export type UploadBusinessLicenseResponse =
  | UploadBusinessLicenseSuccess
  | UploadBusinessLicenseError

export interface StoreApplyRequest {
  businessNumber: string
  representativeName: string
  phone: string
  shopName: string
  fileKey?: string
  agreeToPrivacy: boolean
}

export interface StoreApplySuccess {
  message: '접수되었습니다.'
  data: 'OK'
}

export interface StoreApplyValidationError {
  message: '입력 형식이 올바르지 않습니다.'
  data: {
    businessNumber?: string
    representativeName?: string
    phone?: string
    shopName?: string
    fileKey?: string
    agreeToPrivacy?: string
  }
}

export interface StoreApplyBusinessNumberError {
  message: '사업자번호를 확인해주세요.'
  data: {
    businessNumber: string
  }
}

export interface StoreApplyFileKeyError {
  message: '파일을 다시 첨부해주세요.'
  data: {
    fileKey: string
  }
}

export interface StoreApplyServerError {
  message: string
  data: []
}

export type StoreApplyResponse =
  | StoreApplySuccess
  | StoreApplyValidationError
  | StoreApplyBusinessNumberError
  | StoreApplyFileKeyError
  | StoreApplyServerError
