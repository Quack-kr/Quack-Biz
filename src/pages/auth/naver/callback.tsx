import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSetAtom } from 'jotai'

import { socialCallback } from 'apis/services/auth'
import { accessTokenWithStorageAtom } from 'atoms/auth-atom'

export default function NaverCallback() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const setAccessToken = useSetAtom(accessTokenWithStorageAtom)

  useEffect(() => {
    const code = searchParams.get('code')
    const state = searchParams.get('state')

    if (!code || !state) {
      alert('인증 코드가 없습니다.')
      navigate('/')
      return
    }

    socialCallback('naver', code, state)
      .then((res) => {
        if ('access_token' in res.data) {
          setAccessToken(res.data.access_token)
          navigate('/')
        } else {
          alert(res.message)
          navigate('/')
        }
      })
      .catch((err) => {
        alert(err?.response?.data?.message || '로그인 실패')
        navigate('/')
      })
  }, [searchParams, navigate, setAccessToken])

  return <div>로그인 처리 중...</div>
}
