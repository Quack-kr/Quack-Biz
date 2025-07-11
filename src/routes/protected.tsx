import React from 'react'
import type { RouteObject } from 'react-router-dom'

import { Login } from 'pages'
import { LayoutComponent } from 'components'
import { PATH } from 'constants/path'

const protectedApp: RouteObject = {
  element: <LayoutComponent.Protected />,
  children: [
    {
      children: [
        {
          path: PATH.login,
          element: <Login />
        }
      ]
    }
  ]
}

export { protectedApp }
