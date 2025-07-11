import type { RouteObject } from 'react-router-dom'

import { Home, NotFound } from 'pages'
import { PATH } from 'constants/path'

const unauthorizedApp: RouteObject = {
  children: [
    {
      path: PATH.home,
      element: <Home />
    },
    {
      path: '*',
      element: <NotFound />
    }
  ]
}

export { unauthorizedApp }
