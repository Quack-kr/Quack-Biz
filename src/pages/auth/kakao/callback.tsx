import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSetAtom } from 'jotai'

import { PATH } from '@/constants/path'
import { socialCallback } from '@/apis/services/auth'
import { accessTokenWithStorageAtom } from '@/atoms/auth-atom'

export default function KakaoCallback() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const setAccessToken = useSetAtom(accessTokenWithStorageAtom)

  useEffect(() => {
    const code = searchParams.get('code')
    const state = searchParams.get('state')

    if (!code || !state) {
      // 에러 처리 - 나중에 토스트로 대체합니다.
      alert('인증 코드가 없습니다.')
      navigate(PATH.login)
      return
    }

    console.log('hello')

    socialCallback('kakao', code, state)
      .then((res) => {
        if ('access_token' in res.data) {
          setAccessToken(res.data.access_token)
          navigate(PATH.dashboard)
        } else {
          alert(res.message)
          navigate(PATH.login)
        }
      })
      .catch((err) => {
        alert(err?.response?.data?.message || '로그인 실패')
        navigate(PATH.login)
      })
  }, [searchParams, navigate, setAccessToken])

  // 로딩 처리 - 나중에 로딩 화면으로 대체합니다.
  return <div>로그인 처리 중...</div>
}
