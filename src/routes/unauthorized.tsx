import React from 'react'
import type { RouteObject } from 'react-router-dom'

import { Home } from 'pages'
import { PATH } from 'constants/path'

const unauthorizedApp: RouteObject = {
  children: [
    {
      path: PATH.home,
      element: <Home />
    }
  ]
}

export { unauthorizedApp }
