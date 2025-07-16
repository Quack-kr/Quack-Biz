import React from 'react'

import { useIsMobile } from '@/hooks/use-is-mobile'

export function Footer() {
  const isMobile = useIsMobile()

  return (
    <footer className="bg-quack-black py-10 font-pretendard xl:py-[119.5px]">
      <div className="container px-5 xl:px-0">
        <div className="grid grid-cols-1 gap-2 xl:grid-cols-2 xl:items-center">
          <div className="flex flex-col gap-2 xl:flex-row xl:items-center xl:gap-10">
            <div className="mb-4 xl:mb-0 xl:h-max">
              <img
                src="/logo-gray.svg"
                alt="footer-logo"
                width={isMobile ? 60 : 94.5}
                height={isMobile ? 56 : 90}
                style={{ display: 'block' }}
              />
            </div>
            <div className="space-y-1 text-quack-footer-mobile text-quack-gray xl:shrink-0 xl:text-quack-footer">
              <p>
                <span className="font-bold">꽥</span>
                <span className="mx-[4px] inline-block h-[6px] w-px bg-quack-gray xl:relative xl:top-[1.5px] xl:ml-1.5 xl:mr-1 xl:h-[13px] xl:w-[1.5px]" />
                <span>사업자 등록번호: 721-04-03645</span>
              </p>
              <p>통신판매업 신고번호: 2025-와부조안-0126</p>
              <p>
                주소: 경기도 남양주시 와부읍 수레로116번길 16, 402호
                -J186호(아이비타워-2)
              </p>
              <p>
                <span>문의사항: contact@quack.io.kr</span>
                <span className="mx-1 inline-block h-[6px] w-px bg-quack-gray xl:relative xl:top-[1.5px] xl:mx-1.5 xl:h-[13px]" />
                <span>대표: 김걸휘</span>
                <span className="mx-1 inline-block h-[6px] w-px bg-quack-gray xl:relative xl:top-[1.5px] xl:mx-1.5 xl:h-[13px]" />
                <span>대표전화: 070-8027-8350</span>
              </p>
            </div>
          </div>
          <div className="text-left xl:flex xl:flex-col xl:items-start xl:justify-self-end">
            <div className="text-quack-footer-mobile text-quack-gray xl:text-quack-footer">
              <div className="flex items-center gap-[4px] xl:gap-2">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://skitter-editor-255.notion.site/1c47fc0319a2809fa183dd63a900b5a3"
                  className="cursor-pointer font-bold"
                >
                  개인정보처리방침
                </a>
                <span className="inline-block h-[6px] w-[1.5px] bg-quack-gray xl:h-[13px] xl:w-[2px]" />
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://skitter-editor-255.notion.site/1c47fc0319a2809097cecd411bc8a674"
                  className="cursor-pointer font-bold"
                >
                  꽥 서비스 이용약관
                </a>
              </div>
              <p className="mt-2">Copyright © quack. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
