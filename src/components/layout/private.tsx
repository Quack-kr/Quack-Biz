import React, { useReducer } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAtomValue } from 'jotai'

import { PATH } from 'constants/path'
import { accessTokenAtom } from 'atoms/auth-atom'

import { UiComponent } from '..'

function Private() {
  const auth = useAtomValue(accessTokenAtom)
  const [isSidebarOpen, toggleSidebar] = useReducer((open) => !open, false)

  if (auth) {
    return (
      <div className="container flex h-full items-start justify-between px-5 xl:w-3/4 xl:px-0 xl:pt-[120px]">
        <UiComponent.Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    )
  }

  return <Navigate to={PATH.login} />
}

export default Private
