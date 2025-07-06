import type { AuthMode } from 'types/auth'

export function getAuthText(mode: AuthMode) {
  if (mode === 'login') {
    return {
      title: '로그인',
      subtitle: '간편하게 소셜로그인으로 시작해 보세요',
      action: '계속하기',
      toggle: '아직 가입하지 않으셨다면?',
      toggleBtn: '회원가입'
    }
  }
  return {
    title: '회원가입',
    subtitle: '간편하게 소셜로그인으로 가입해 보세요',
    action: '계속하기',
    toggle: '이미 계정이 있으시다면?',
    toggleBtn: '로그인'
  }
}
