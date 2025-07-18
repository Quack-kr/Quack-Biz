import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor, act } from '@/test/utils'
import NetworkStateCatcher from '../network-state-catcher'

// 실제 이벤트 리스너를 저장할 변수들
let onlineHandler: (() => void) | null = null
let offlineHandler: (() => void) | null = null

// window.addEventListener 모킹
const mockAddEventListener = vi.fn((event: string, handler: () => void) => {
  if (event === 'online') onlineHandler = handler
  if (event === 'offline') offlineHandler = handler
})

const mockRemoveEventListener = vi.fn()

// window 객체 모킹
Object.defineProperty(window, 'addEventListener', {
  value: mockAddEventListener
})

Object.defineProperty(window, 'removeEventListener', {
  value: mockRemoveEventListener
})

describe('네트워크 상태 캐처', () => {
  it('온라인일 때 자식 컴포넌트를 렌더링한다', () => {
    render(
      <NetworkStateCatcher>
        <div>온라인 콘텐츠</div>
      </NetworkStateCatcher>
    )

    expect(screen.getByText('온라인 콘텐츠')).toBeInTheDocument()
  })

  it('오프라인일 때 기본 오프라인 폴백을 렌더링한다', async () => {
    // 오프라인 상태로 시작
    Object.defineProperty(window.navigator, 'onLine', {
      writable: true,
      value: false
    })

    render(
      <NetworkStateCatcher>
        <div>온라인 콘텐츠</div>
      </NetworkStateCatcher>
    )

    expect(screen.getByText('인터넷 연결이 끊어졌습니다')).toBeInTheDocument()
    expect(
      screen.getByText('네트워크 연결을 확인하고 다시 시도해주세요.')
    ).toBeInTheDocument()
  })

  it('커스텀 오프라인 폴백이 제공되면 렌더링한다', () => {
    Object.defineProperty(window.navigator, 'onLine', {
      writable: true,
      value: false
    })

    const 커스텀폴백 = <div>커스텀 오프라인 메시지</div>

    render(
      <NetworkStateCatcher config={{ offlineFallback: 커스텀폴백 }}>
        <div>온라인 콘텐츠</div>
      </NetworkStateCatcher>
    )

    expect(screen.getByText('커스텀 오프라인 메시지')).toBeInTheDocument()
  })

  it('온라인이 될 때 onOnline 콜백을 호출한다', async () => {
    const 온라인핸들러 = vi.fn()

    render(
      <NetworkStateCatcher config={{ onOnline: 온라인핸들러 }}>
        <div>콘텐츠</div>
      </NetworkStateCatcher>
    )

    // 온라인 이벤트 핸들러 직접 호출
    act(() => {
      if (onlineHandler) {
        onlineHandler()
      }
    })

    expect(온라인핸들러).toHaveBeenCalled()
  })

  it('오프라인이 될 때 onOffline 콜백을 호출한다', async () => {
    const 오프라인핸들러 = vi.fn()

    render(
      <NetworkStateCatcher config={{ onOffline: 오프라인핸들러 }}>
        <div>콘텐츠</div>
      </NetworkStateCatcher>
    )

    // 오프라인 이벤트 핸들러 직접 호출
    act(() => {
      if (offlineHandler) {
        offlineHandler()
      }
    })

    expect(오프라인핸들러).toHaveBeenCalled()
  })

  it('온라인과 오프라인 상태를 전환한다', async () => {
    // 먼저 컴포넌트를 렌더링
    render(
      <NetworkStateCatcher>
        <div>온라인 콘텐츠</div>
      </NetworkStateCatcher>
    )

    // 처음에는 온라인
    expect(screen.getByText('온라인 콘텐츠')).toBeInTheDocument()

    // 오프라인으로 전환
    act(() => {
      if (offlineHandler) {
        offlineHandler()
      }
    })

    await waitFor(() => {
      expect(screen.getByText('인터넷 연결이 끊어졌습니다')).toBeInTheDocument()
    })

    // 다시 온라인으로 전환
    act(() => {
      if (onlineHandler) {
        onlineHandler()
      }
    })

    await waitFor(() => {
      expect(screen.getByText('온라인 콘텐츠')).toBeInTheDocument()
    })
  })

  it('SSR 환경을 우아하게 처리한다', () => {
    // navigator를 undefined로 모킹 (SSR 환경)
    const 원본네비게이터 = global.navigator
    // @ts-expect-error: __
    delete global.navigator

    expect(() => {
      render(
        <NetworkStateCatcher>
          <div>콘텐츠</div>
        </NetworkStateCatcher>
      )
    }).not.toThrow()

    // 기본적으로 온라인 콘텐츠를 보여야 함
    expect(screen.getByText('콘텐츠')).toBeInTheDocument()

    // navigator 복원
    global.navigator = 원본네비게이터
  })
})
