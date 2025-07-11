import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

import { LayoutComponent } from 'components'
import { PATH } from 'constants/path'

const StoreOnboarding = lazy(() => import('pages/store-onboarding'))
const Dashboard = lazy(() => import('pages/dashboard'))

const privateApp: RouteObject = {
  element: <LayoutComponent.Private />,
  children: [
    {
      children: [
        {
          path: PATH.storeOnboarding,
          element: <StoreOnboarding />
        },
        {
          path: PATH.dashboard,
          element: <Dashboard />
        }
      ]
    }
  ]
}

export { privateApp }
