import React from 'react'
import type { RouteObject } from 'react-router-dom'

import { Profile, StoreOnboarding } from 'pages'
import { LayoutComponent } from 'components'
import { PATH } from 'constants/path'

const privateApp: RouteObject = {
  element: <LayoutComponent.Private />,
  children: [
    {
      children: [
        {
          path: PATH.profile,
          element: <Profile />
        },
        {
          path: PATH.storeOnboarding,
          element: <StoreOnboarding />
        }
      ]
    }
  ]
}

export { privateApp }
