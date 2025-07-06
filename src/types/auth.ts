export type SocialProvider = 'naver' | 'kakao' | 'google'

export type AuthMode = 'login' | 'signup'

export interface SocialLoginSuccess {
  message: '로그인되었습니다.'
  data: {
    access_token: string
  }
}

export interface SocialLoginMissingCodeOrState {
  message: '잠시 후 다시 시도해주세요.'
  data: {
    code?: string
    state?: string
  }
}

export interface SocialLoginNaverAuthFail {
  message: '네이버 인증에 실패했습니다.'
  data: {
    code: string
  }
}

export interface SocialLoginNaverUserInfoFail {
  message: '네이버 유저 정보 조회에 실패했습니다.'
  data: {
    code: string
  }
}

export type SocialLoginResponse =
  | SocialLoginSuccess
  | SocialLoginMissingCodeOrState
  | SocialLoginNaverAuthFail
  | SocialLoginNaverUserInfoFail
