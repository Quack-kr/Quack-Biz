import { useSearchParams } from 'react-router-dom'

import KakaoIcon from 'assets/icons/ic_kakao.svg'
import NaverIcon from 'assets/icons/ic_naver.svg'

<<<<<<< HEAD
import { getAuthText } from 'utils/auth'
import { useSocialLogin } from 'hooks/use-social-login'
=======
>>>>>>> develop
import type { AuthMode } from 'types/auth'
import { useSocialLogin } from 'hooks/use-social-login'
import { getAuthText } from 'utils/auth'

export default function LoginOrSignupPage() {
  const { login } = useSocialLogin()
  const [searchParams, setSearchParams] = useSearchParams()
  const mode = (searchParams.get('mode') as AuthMode) || 'login'
  const text = getAuthText(mode)

  const handleToggle = () => {
    setSearchParams({ mode: mode === 'login' ? 'signup' : 'login' })
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-quack-black">
      <div className="flex w-full max-w-xs flex-col items-center">
        <h1 className="mb-2 text-4xl font-semibold text-quack-white">
          {text.title}
        </h1>
        <p className="mb-10 text-[20px] text-[#A8A7A1]">{text.subtitle}</p>

        <button
          type="button"
          className="mb-3 flex h-[58px] w-full min-w-[380px] items-center justify-center gap-2 rounded-lg bg-[#EFD800] text-base font-bold text-quack-black transition hover:brightness-95"
          onClick={() => login('kakao')}
        >
          <img src={KakaoIcon} alt="카카오 아이콘" />
          카카오로 계속하기
        </button>

        <button
          type="button"
          className="mb-10 flex h-[58px] w-full min-w-[380px] items-center justify-center gap-2 rounded-lg bg-quack-white text-base font-bold text-quack-black transition hover:bg-gray-50"
          onClick={() => login('naver')}
        >
          <img src={NaverIcon} alt="네이버 아이콘" />
          네이버로 계속하기
        </button>

        <div className="flex flex-col gap-1 text-base text-quack-white">
          {text.toggle}{' '}
          <button
            className="text-base font-bold text-quack-white underline transition hover:text-[#FEE500]"
            onClick={handleToggle}
          >
            {text.toggleBtn}
          </button>
        </div>
      </div>
    </div>
  )
}
