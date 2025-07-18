import {
  render,
  type RenderOptions,
  type RenderResult
} from '@testing-library/react'
import type { ReactElement } from 'react'

// 필요시 프로바이더를 포함하는 커스텀 렌더 함수
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
): RenderResult => {
  return render(ui, {
    ...options
  })
}

export * from '@testing-library/react'
export { customRender as render }

// 네트워크 이벤트를 시뮬레이션하는 헬퍼 함수
export const simulateNetworkEvent = (type: 'online' | 'offline'): void => {
  // navigator.onLine 업데이트
  if (typeof window !== 'undefined') {
    Object.defineProperty(window.navigator, 'onLine', {
      writable: true,
      value: type === 'online'
    })

    // 이벤트 생성 및 발생
    const event = new Event(type)
    window.dispatchEvent(event)
  }
}
