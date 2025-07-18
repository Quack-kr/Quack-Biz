import { lazy, Suspense } from 'react'
import type { RouteObject } from 'react-router-dom'

import { LayoutComponent, UiComponent } from '@/components'
import { PATH } from '@/constants/path'

const Dashboard = lazy(() => import('pages/dashboard'))
const StoreManagement = lazy(() => import('pages/store-management'))
const MenuManagement = lazy(() => import('pages/store-menu-management'))
const Advertisement = lazy(() => import('pages/advertisement'))
const My = lazy(() => import('pages/my-page'))

const SuspensedDashboardPage = () => {
  return (
    <Suspense fallback={<UiComponent.OverlayLoadingSpinner />}>
      <Dashboard />
    </Suspense>
  )
}

const privateApp: RouteObject = {
  element: <LayoutComponent.Private />,
  children: [
    {
      children: [
        {
          path: PATH.dashboard,
          element: <SuspensedDashboardPage />
        },
        {
          path: PATH.storeManagement,
          element: <StoreManagement />
        },
        {
          path: PATH.menuManagement,
          element: <MenuManagement />
        },
        {
          path: PATH.advertisement,
          element: <Advertisement />
        },
        {
          path: PATH.myPage,
          element: <My />
        }
      ]
    }
  ]
}

export { privateApp }
