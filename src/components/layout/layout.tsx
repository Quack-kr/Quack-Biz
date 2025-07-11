import React, { useState } from 'react'

import Sidebar from './sidebar'
import Header from './header/header'
import { LayoutComponent } from '..'

interface DashboardLayoutProps {
  footer?: boolean
  children: React.ReactNode
}

export function DashboardLayout({ footer, children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-quack-black">
      {/* 헤더 */}
      <Header />

      <div className="container flex h-full items-start justify-between px-5 xl:w-3/4 xl:px-0 xl:pt-[120px]">
        {/* 사이드바 */}
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

        {/* 메인 콘텐츠 */}
        <main className="flex-1">{children}</main>
      </div>
      {footer && <LayoutComponent.Footer />}
    </div>
  )
}
