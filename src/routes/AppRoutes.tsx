import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

const Home = lazy(() => import('pages/home'))
const Login = lazy(() => import('pages/login'))
const NaverCallback = lazy(() => import('pages/auth/naver/callback'))
const KakaoCallback = lazy(() => import('pages/auth/kakao/callback'))
const NotFound = lazy(() => import('pages/404'))

function AppRoutes() {
  return (
    <Suspense fallback={<div className="mt-20 text-center">로딩 중...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/naver/callback" element={<NaverCallback />} />
        <Route path="/auth/kakao/callback" element={<KakaoCallback />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
