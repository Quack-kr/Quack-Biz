export interface RefreshTokenSuccess {
  message: '로그인이 연장되었습니다.'
  data: {
    access_token: string
  }
}

export interface RefreshTokenInvalidGrant {
  message: 'Invalid grant type'
  data: {
    grant_type: string
  }
}

export interface RefreshTokenUnauthorized {
  message: '로그인이 필요합니다.'
  data: {
    refresh_token: string
  }
}

export interface RefreshTokenBlocked {
  message: '관리자에게 문의해주시기 바랍니다.'
  data: {
    error_code: string
    message: string
  }
}

export type RefreshTokenResponse =
  | RefreshTokenSuccess
  | RefreshTokenInvalidGrant
  | RefreshTokenUnauthorized
  | RefreshTokenBlocked
