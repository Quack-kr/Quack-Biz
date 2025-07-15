import type { RouteObject } from 'react-router-dom'

import { Home, NotFound, StoreOnboarding } from 'pages'
import { PATH } from 'constants/path'

const unauthorizedApp: RouteObject = {
  children: [
    {
      path: PATH.home,
      element: <Home />
    },
    {
      path: PATH.storeOnboarding,
      element: <StoreOnboarding />
    },
    {
      path: '*',
      element: <NotFound />
    }
  ]
}

export { unauthorizedApp }
