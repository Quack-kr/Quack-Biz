import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

import { LayoutComponent } from 'components'
import { PATH } from 'constants/path'

const Dashboard = lazy(() => import('pages/dashboard'))
const StoreManagement = lazy(() => import('pages/store-management'))

const privateApp: RouteObject = {
  element: <LayoutComponent.Private />,
  children: [
    {
      children: [
        {
          path: PATH.dashboard,
          element: <Dashboard />
        },
        {
          path: PATH.storeManagement,
          element: <StoreManagement />
        }
      ]
    }
  ]
}

export { privateApp }
