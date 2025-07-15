import { useSearchParams } from 'react-router-dom'

import KakaoIcon from 'assets/icons/ic_kakao.svg'
import NaverIcon from 'assets/icons/ic_naver.svg'

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
    <div className="flex h-[calc(100vh-56px)] flex-col items-center justify-center bg-quack-black px-4 sm:min-h-screen">
      <div
        className="
        flex w-full max-w-xs flex-col items-center
        rounded-xl
        bg-opacity-90 px-2
        py-6
        sm:max-w-[380px]
      "
      >
        <h1 className="mb-2 text-center text-3xl font-semibold text-quack-white sm:text-4xl">
          {text.title}
        </h1>
        <p className="mb-8 text-center text-base text-[#A8A7A1] sm:mb-10 sm:text-[20px]">
          {text.subtitle}
        </p>

        <button
          type="button"
          className="
            mb-3 flex h-[48px] w-full min-w-0 max-w-[380px] items-center
            justify-center gap-2 rounded-[8px]
            bg-[#EFD800] text-center
            text-base font-bold text-quack-black
            transition hover:brightness-95
            sm:h-[58px]
          "
          onClick={() => login('kakao')}
        >
          <img
            src={KakaoIcon}
            alt="카카오 아이콘"
            className="size-5 sm:size-6"
          />
          <span className="truncate">카카오로 계속하기</span>
        </button>

        <button
          type="button"
          className="
            mb-8 flex h-[48px] w-full min-w-0 max-w-[380px] items-center justify-center
            gap-2 rounded-[8px] bg-quack-white
            text-center text-base
            font-bold text-quack-black transition
            hover:bg-gray-50 sm:mb-10
            sm:h-[58px]
          "
          onClick={() => login('naver')}
        >
          <img
            src={NaverIcon}
            alt="네이버 아이콘"
            className="size-5 sm:size-6"
          />
          <span className="truncate">네이버로 계속하기</span>
        </button>

        <div className="flex flex-col items-center gap-1 text-base text-quack-white">
          <span>{text.toggle} </span>
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
