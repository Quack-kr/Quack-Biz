import { useSocialLogin } from 'hooks/useSocialLogin'

import KakaoIcon from 'assets/icons/ic_kakao.svg'
import NaverIcon from 'assets/icons/ic_naver.svg'

export default function Login() {
  const { login } = useSocialLogin()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#191914]">
      <div className="flex w-full max-w-xs flex-col items-center">
        <h1 className="mb-2 text-2xl font-bold text-white">로그인</h1>
        <p className="mb-8 text-gray-400">
          간편하게 소셜로그인으로 시작해 보세요
        </p>

        <button
          type="button"
          className="mb-3 flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#FEE500] text-base font-semibold text-[#191600] transition hover:brightness-95"
          onClick={() => login('kakao')}
        >
          <img src={KakaoIcon} alt="카카오 아이콘" className="size-6" />
          카카오로 계속하기
        </button>

        <button
          type="button"
          className="mb-6 flex h-12 w-full items-center justify-center gap-2 rounded-md border border-gray-200 bg-white text-base font-semibold text-[#03C75A] transition hover:bg-gray-50"
          onClick={() => login('naver')}
        >
          <img src={NaverIcon} alt="네이버 아이콘" className="size-6" />
          네이버로 계속하기
        </button>

        <div className="text-sm text-gray-400">
          아직 가입하지 않으셨다면!{' '}
          <button className="text-white underline transition hover:text-[#FEE500]">
            회원가입
          </button>
        </div>
      </div>
    </div>
  )
}
