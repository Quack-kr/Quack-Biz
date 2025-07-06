export const SOCIAL_AUTH_CONFIG = {
  naver: {
    AUTH_URL: 'https://nid.naver.com/oauth2.0/authorize',
    CLIENT_ID: import.meta.env.VITE_NAVER_CLIENT_ID,
    REDIRECT_URI: import.meta.env.VITE_NAVER_REDIRECT_URI,
    EXTRA_PARAMS: ''
  },
  kakao: {
    AUTH_URL: 'https://kauth.kakao.com/oauth/authorize',
    CLIENT_ID: import.meta.env.VITE_KAKAO_CLIENT_ID,
    REDIRECT_URI: import.meta.env.VITE_KAKAO_REDIRECT_URI,
    EXTRA_PARAMS: ''
  },
  google: {
    AUTH_URL: 'https://accounts.google.com/o/oauth2/v2/auth',
    CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    REDIRECT_URI: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
    EXTRA_PARAMS: 'scope=openid%20email%20profile'
  }
} as const
