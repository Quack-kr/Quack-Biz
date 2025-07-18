import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest'
import { render, screen, waitFor, act } from '@/test/utils'
import AppGuardians from '../app-guardians'

// 에러를 발생시키는 테스트 컴포넌트
const ErrorThrowingComponent = ({
  shouldThrow = false
}: {
  shouldThrow?: boolean
}) => {
  if (shouldThrow) {
    throw new Error('Test Error')
  }
  return <div>에러 없음</div>
}

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

// 테스트 출력에서 노이즈를 피하기 위해 console 모킹
const originalError = console.error
const originalWarn = console.warn

beforeAll(() => {
  console.error = vi.fn()
  console.warn = vi.fn()
})

afterAll(() => {
  console.error = originalError
  console.warn = originalWarn
})

describe('앱 가디언즈', () => {
  it('모든 것이 정상일 때 자식 컴포넌트를 렌더링한다', () => {
    render(
      <AppGuardians>
        <div>앱 콘텐츠</div>
      </AppGuardians>
    )

    expect(screen.getByText('앱 콘텐츠')).toBeInTheDocument()
  })

  it('기본 에러 바운더리로 에러를 처리한다', () => {
    render(
      <AppGuardians>
        <ErrorThrowingComponent shouldThrow={true} />
      </AppGuardians>
    )

    expect(
      screen.getByText('알 수 없는 오류가 발생했습니다.')
    ).toBeInTheDocument()
  })

  it('기본 폴백으로 오프라인 상태를 처리한다', () => {
    Object.defineProperty(window.navigator, 'onLine', {
      writable: true,
      value: false
    })

    render(
      <AppGuardians>
        <div>앱 콘텐츠</div>
      </AppGuardians>
    )

    expect(screen.getByText('인터넷 연결이 끊어졌습니다')).toBeInTheDocument()
  })

  it('onReset과 함께 커스텀 에러 바운더리 설정을 사용한다', () => {
    const 에러핸들러 = vi.fn()
    const 리셋핸들러 = vi.fn()
    const 커스텀에러폴백 = <div>커스텀 에러 UI</div>

    render(
      <AppGuardians
        config={{
          errorBoundary: {
            fallback: 커스텀에러폴백,
            onError: 에러핸들러,
            onReset: 리셋핸들러
          }
        }}
      >
        <ErrorThrowingComponent shouldThrow={true} />
      </AppGuardians>
    )

    expect(screen.getByText('커스텀 에러 UI')).toBeInTheDocument()
    expect(에러핸들러).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({
        componentStack: expect.any(String)
      })
    )
  })

  it('커스텀 네트워크 상태 설정을 사용한다', async () => {
    const 온라인핸들러 = vi.fn()
    const 오프라인핸들러 = vi.fn()
    const 커스텀오프라인폴백 = <div>커스텀 오프라인 UI</div>

    Object.defineProperty(window.navigator, 'onLine', {
      writable: true,
      value: false
    })

    render(
      <AppGuardians
        config={{
          networkState: {
            offlineFallback: 커스텀오프라인폴백,
            onOnline: 온라인핸들러,
            onOffline: 오프라인핸들러
          }
        }}
      >
        <div>앱 콘텐츠</div>
      </AppGuardians>
    )

    expect(screen.getByText('커스텀 오프라인 UI')).toBeInTheDocument()

    // 온라인 콜백 테스트
    Object.defineProperty(window.navigator, 'onLine', {
      writable: true,
      value: true
    })

    act(() => {
      if (onlineHandler) {
        onlineHandler()
      }
    })

    await waitFor(() => {
      expect(온라인핸들러).toHaveBeenCalled()
    })

    // 오프라인 콜백 테스트
    Object.defineProperty(window.navigator, 'onLine', {
      writable: true,
      value: false
    })

    act(() => {
      if (offlineHandler) {
        offlineHandler()
      }
    })

    await waitFor(() => {
      expect(오프라인핸들러).toHaveBeenCalled()
    })
  })

  it('에러와 네트워크 상태를 함께 처리한다', async () => {
    const 에러핸들러 = vi.fn()
    const 오프라인핸들러 = vi.fn()

    render(
      <AppGuardians
        config={{
          errorBoundary: { onError: 에러핸들러 },
          networkState: { onOffline: 오프라인핸들러 }
        }}
      >
        <div>앱 콘텐츠</div>
      </AppGuardians>
    )

    // 네트워크 상태 테스트
    Object.defineProperty(window.navigator, 'onLine', {
      writable: true,
      value: false
    })

    act(() => {
      if (offlineHandler) {
        offlineHandler()
      }
    })

    await waitFor(() => {
      expect(오프라인핸들러).toHaveBeenCalled()
    })

    // 다시 온라인으로 전환하여 앱 콘텐츠 확인
    Object.defineProperty(window.navigator, 'onLine', {
      writable: true,
      value: true
    })

    act(() => {
      if (onlineHandler) {
        onlineHandler()
      }
    })

    await waitFor(() => {
      expect(screen.getByText('앱 콘텐츠')).toBeInTheDocument()
    })
  })

  it('네트워크 상태가 에러 바운더리보다 우선시된다', () => {
    // 오프라인 상태로 설정
    Object.defineProperty(window.navigator, 'onLine', {
      writable: true,
      value: false
    })

    render(
      <AppGuardians>
        <ErrorThrowingComponent shouldThrow={true} />
      </AppGuardians>
    )

    // AppGuardians의 구조상 NetworkStateCatcher가 먼저 오프라인을 감지하므로
    // 오프라인 폴백이 표시되고 에러는 발생하지 않음
    expect(screen.getByText('인터넷 연결이 끊어졌습니다')).toBeInTheDocument()
    expect(
      screen.queryByText('알 수 없는 오류가 발생했습니다.')
    ).not.toBeInTheDocument()
  })

  it('온라인 상태에서는 에러 바운더리가 작동한다', () => {
    // 온라인 상태로 설정
    Object.defineProperty(window.navigator, 'onLine', {
      writable: true,
      value: true
    })

    render(
      <AppGuardians>
        <ErrorThrowingComponent shouldThrow={true} />
      </AppGuardians>
    )

    // 온라인 상태에서는 에러 바운더리가 작동
    expect(
      screen.getByText('알 수 없는 오류가 발생했습니다.')
    ).toBeInTheDocument()
    expect(
      screen.queryByText('인터넷 연결이 끊어졌습니다')
    ).not.toBeInTheDocument()
  })

  it('onReset이 제공되지 않으면 기본 페이지 새로고침을 사용한다', () => {
    const 새로고침모킹 = vi.fn()
    Object.defineProperty(window, 'location', {
      value: { reload: 새로고침모킹 },
      writable: true
    })

    render(
      <AppGuardians>
        <ErrorThrowingComponent shouldThrow={true} />
      </AppGuardians>
    )

    const 다시시도버튼 = screen.getByText('다시 시도')
    다시시도버튼.click()

    expect(새로고침모킹).toHaveBeenCalled()
  })

  it('커스텀 onReset이 제공되면 사용한다', () => {
    const 리셋핸들러 = vi.fn()
    const 새로고침모킹 = vi.fn()

    Object.defineProperty(window, 'location', {
      value: { reload: 새로고침모킹 },
      writable: true
    })

    render(
      <AppGuardians
        config={{
          errorBoundary: { onReset: 리셋핸들러 }
        }}
      >
        <ErrorThrowingComponent shouldThrow={true} />
      </AppGuardians>
    )

    const 다시시도버튼 = screen.getByText('다시 시도')
    다시시도버튼.click()

    expect(리셋핸들러).toHaveBeenCalled()
    expect(새로고침모킹).not.toHaveBeenCalled()
  })
})
