import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

import { LayoutComponent } from '@/components'
import { PATH } from '@/constants/path'

const Login = lazy(() => import('pages/login'))
const NaverCallback = lazy(() => import('pages/auth/naver/callback'))
const KakaoCallback = lazy(() => import('pages/auth/kakao/callback'))

const protectedApp: RouteObject = {
  element: <LayoutComponent.Protected />,
  children: [
    {
      children: [
        {
          path: PATH.login,
          element: <Login />
        },
        {
          path: PATH.authNaverCallback,
          element: <NaverCallback />
        },
        {
          path: PATH.authKakaoCallback,
          element: <KakaoCallback />
        }
      ]
    }
  ]
}

export { protectedApp }
