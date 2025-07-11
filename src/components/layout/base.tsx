import React from 'react'
import { Outlet } from 'react-router-dom'

import { UiComponent } from '..'

function Base() {
  return (
    <div className="min-h-screen bg-quack-black">
      <UiComponent.Header />
      <Outlet />
    </div>
  )
}

export default Base
