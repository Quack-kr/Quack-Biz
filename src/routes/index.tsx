import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import { LayoutComponent } from 'components'

import { privateApp } from './private'
import { protectedApp } from './protected'
import { unauthorizedApp } from './unauthorized'

const router = createBrowserRouter([
  {
    element: <LayoutComponent.Base />,
    children: [unauthorizedApp, protectedApp, privateApp]
  }
])

export default router
