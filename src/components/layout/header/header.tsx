import React, { useReducer } from 'react'

import { MobileMenuDialog } from './components/mobile-menu'
import { DescktopInquiryDialog } from './components/inquiry-dialog'

export default function Header() {
  const [showMenuDialog, toggleMenuDialog] = useReducer((open) => !open, false)
  const [showInquiryDialog, toggleInquiryDialog] = useReducer(
    (open) => !open,
    false
  )

  return (
    <>
      <header className="z-40 h-[56px] w-full border-b-[0.5px] border-b-[#21211D] xl:fixed xl:left-0 xl:top-0 xl:z-50 xl:h-[120px] xl:bg-quack-black">
        <div className="container flex h-full items-center justify-between px-5 xl:w-3/4 xl:px-0">
          <a href="/">
            <img
              src="/logo.svg"
              alt="꽥 플레이스"
              className="relative left-[-18px] h-[56px] w-[60px] xl:h-[100px] xl:w-[110px]"
            />
          </a>
          <div className="hidden items-center xl:flex">
            <nav className="hidden items-center space-x-8 xl:flex">
              <a
                href="https://quack.io.kr/"
                className="font-medium text-quack-gray hover:text-white/70"
              >
                서비스 소개
              </a>
              <a
                href="/dashboard"
                className="font-medium text-quack-white hover:text-white"
              >
                사업자 가게관리
              </a>
              <button
                className="font-medium text-quack-gray hover:text-white/70"
                onClick={toggleInquiryDialog}
              >
                문의하기
              </button>
              <button
                className="font-medium text-quack-gray hover:text-white/70"
                onClick={toggleInquiryDialog}
              >
                로그아웃
              </button>
            </nav>
          </div>
          <button className="flex xl:hidden" onClick={toggleMenuDialog}>
            <img
              src="/hamburger-menu.svg"
              alt="hamburger-menu"
              className="size-[20px]"
            />
          </button>
        </div>
      </header>
      <DescktopInquiryDialog
        open={showInquiryDialog}
        onClose={toggleInquiryDialog}
      />
      {showMenuDialog && (
        <MobileMenuDialog toggleMenuDialog={toggleMenuDialog} />
      )}
    </>
  )
}
