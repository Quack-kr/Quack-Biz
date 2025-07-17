import React, { Suspense, useReducer } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAtomValue } from 'jotai'

import { PATH } from '@/constants/path'
import { accessTokenAtom } from '@/atoms/auth-atom'

import { UiComponent } from '..'
import { DashboardComponent } from '../pages/dashboard'
import { LoadingCard } from '../ui'

function Private() {
  const auth = useAtomValue(accessTokenAtom)
  const [isSidebarOpen, toggleSidebar] = useReducer((open) => !open, false)

  if (auth) {
    return (
      <div className="container relative flex h-full items-start justify-between px-5 xl:w-3/4 xl:px-0 xl:pt-[120px]">
        <UiComponent.Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
        <main className="flex-1">
          <div className="flex flex-col xl:mb-[120px]">
            <Suspense
              fallback={
                <LoadingCard
                  title=""
                  className={
                    'my-14 ml-10 justify-start rounded-[8px] border-none bg-quack-black'
                  }
                  contentAlign="start"
                />
              }
            >
              <DashboardComponent.MyStores />
            </Suspense>
            <Suspense
              fallback={
                <div className="mb-6 flex items-start gap-4 border-b border-b-quack-gray py-5 xl:mb-10 xl:ml-10 xl:p-0 xl:pb-4" />
              }
            >
              <Outlet />
            </Suspense>
          </div>
        </main>
      </div>
    )
  }

  return <Navigate to={PATH.login} />
}

export default Private
