export interface GetMeSuccess {
  message: '로그인이 연장되었습니다.'
  data: {
    access_token: string
  }
}

export interface GetMeUnauthorized {
  message: '로그인이 필요합니다.'
  data: {
    refresh_token: string
  }
}

export interface GetMeBlocked {
  message: '관리자에게 문의해주시기 바랍니다.'
  data: {
    error_code: string
    message: string
  }
}

export type GetMeResponse = GetMeSuccess | GetMeUnauthorized | GetMeBlocked
