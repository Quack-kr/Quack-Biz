import React from 'react'
import { Outlet } from 'react-router-dom'
// import { UiComponent } from 'components' - 이슈 번호 4에서 진행

function Base() {
  return (
    <>
      {/* <UiComponent.Header /> */}
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default Base
