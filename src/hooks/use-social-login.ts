import { useCallback } from 'react'

import type { SocialProvider } from '@/types/auth'
import { SOCIAL_AUTH_CONFIG } from '@/constants/auth'

function generateState() {
  return crypto.randomUUID()
}

export function useSocialLogin() {
  const login = useCallback((provider: SocialProvider) => {
    const config = SOCIAL_AUTH_CONFIG[provider]
    if (!config) throw new Error('지원하지 않는 소셜 로그인입니다.')

    const state = generateState()

    const params = [
      `response_type=code`,
      `client_id=${config.CLIENT_ID}`,
      `redirect_uri=${encodeURIComponent(config.REDIRECT_URI)}`,
      `state=${state}`,
      config.EXTRA_PARAMS
    ]
      .filter(Boolean)
      .join('&')

    const url = `${config.AUTH_URL}?${params}`
    window.location.href = url
  }, [])

  return { login }
}
