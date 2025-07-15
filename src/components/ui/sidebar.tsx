import { ChevronRight } from 'lucide-react'
import { NavLink } from 'react-router-dom'

import { cn } from '@/lib/utils'
import { PATH } from '@/constants/path'

const menuItems = [
  { id: 'dashboard', label: '가게현황', path: PATH.dashboard },
  {
    id: 'store-management',
    label: '가게관리',
    path: PATH.storeManagement
  },
  { id: 'menu', label: '메뉴', path: '/dashboard/menu' },
  { id: 'advertisement', label: '광고', path: '/dashboard/advertisement' },
  { id: 'mypage', label: '마이페이지', path: '/dashboard/mypage' }
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* 모바일 오버레이 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 xl:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* 사이드바 */}
      <aside
        className={cn(
          'fixed top-16 left-0 bottom-0 w-[180px] bg-quack-black z-40 transform transition-transform duration-300 ease-in-out',
          'xl:translate-x-0 xl:static xl:top-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <nav className="space-y-4 pt-10">
          {menuItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group',
                  isActive
                    ? 'bg-[#EFD800]/10 text-[#EFD800] rounded-[8px]'
                    : 'text-[#EFEEDF] hover:text-[#EFD800]'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span className="text-lg font-medium">{item.label}</span>
                  <ChevronRight
                    size={20}
                    className={cn(
                      'transition-colors duration-200',
                      isActive
                        ? 'text-[#EFD800]'
                        : 'text-[#A8A7A1] group-hover:text-[#EFD800]'
                    )}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}
