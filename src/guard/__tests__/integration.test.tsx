import { useState } from 'react'
import {
  describe,
  it,
  expect,
  vi,
  beforeAll,
  afterAll,
  beforeEach
} from 'vitest'
import { render, screen, fireEvent, waitFor } from '@/test/utils'
import { AppGuardians, useNetworkState } from '..'

// console.error 모킹
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

beforeEach(() => {
  // 각 테스트 전에 온라인 상태로 초기화
  Object.defineProperty(window.navigator, 'onLine', {
    writable: true,
    value: true
  })
})

// 훅을 사용하는 테스트 컴포넌트
const 네트워크상태컴포넌트 = () => {
  const { isOnline, isOffline } = useNetworkState()

  return (
    <div>
      <div>상태: {isOnline ? '온라인' : '오프라인'}</div>
      <div>온라인 여부: {isOnline.toString()}</div>
      <div>오프라인 여부: {isOffline.toString()}</div>
    </div>
  )
}

// 에러를 발생시킬 수 있는 테스트 컴포넌트
const 에러트리거컴포넌트 = () => {
  const [에러발생여부, 에러발생설정] = useState(false)

  if (에러발생여부) {
    throw new Error('Integration Test Error')
  }

  return (
    <div>
      <div>앱이 정상 작동 중입니다</div>
      <button onClick={() => 에러발생설정(true)}>에러 발생시키기</button>
      <네트워크상태컴포넌트 />
    </div>
  )
}

describe('통합 테스트', () => {
  it('모든 컴포넌트와 훅을 올바르게 내보낸다', () => {
    expect(AppGuardians).toBeDefined()
    expect(useNetworkState).toBeDefined()
  })

  it('실제 사용자 상호작용과 함께 작동한다', async () => {
    const 에러핸들러 = vi.fn()

    render(
      <AppGuardians
        config={{
          errorBoundary: { onError: 에러핸들러 }
        }}
      >
        <에러트리거컴포넌트 />
      </AppGuardians>
    )

    // 처음에는 앱 콘텐츠를 보여야 함
    expect(screen.getByText('앱이 정상 작동 중입니다')).toBeInTheDocument()
    expect(screen.getByText('상태: 온라인')).toBeInTheDocument()

    // 에러 바운더리 테스트
    const 에러버튼 = screen.getByText('에러 발생시키기')
    fireEvent.click(에러버튼)

    await waitFor(() => {
      expect(
        screen.getByText('알 수 없는 오류가 발생했습니다.')
      ).toBeInTheDocument()
      expect(에러핸들러).toHaveBeenCalledWith(
        expect.any(Error),
        expect.objectContaining({
          componentStack: expect.any(String)
        })
      )
    })

    // 에러 정보가 올바른 타입 구조를 가지는지 확인
    const [에러, 에러정보] = 에러핸들러.mock.calls[0]
    expect(에러.message).toBe('Integration Test Error')
    expect(에러정보).toHaveProperty('componentStack')
  })

  it('네트워크 상태 컴포넌트가 올바르게 작동한다', () => {
    // 온라인 상태 테스트
    render(
      <AppGuardians>
        <네트워크상태컴포넌트 />
      </AppGuardians>
    )

    expect(screen.getByText('상태: 온라인')).toBeInTheDocument()
    expect(screen.getByText('온라인 여부: true')).toBeInTheDocument()
    expect(screen.getByText('오프라인 여부: false')).toBeInTheDocument()
  })

  it('오프라인 상태에서 폴백을 표시한다', () => {
    // 오프라인 상태로 설정
    Object.defineProperty(window.navigator, 'onLine', {
      writable: true,
      value: false
    })

    render(
      <AppGuardians>
        <네트워크상태컴포넌트 />
      </AppGuardians>
    )

    expect(screen.getByText('인터넷 연결이 끊어졌습니다')).toBeInTheDocument()
    expect(
      screen.getByText('네트워크 연결을 확인하고 다시 시도해주세요.')
    ).toBeInTheDocument()
  })

  it('커스텀 설정이 모두 함께 작동한다', () => {
    const 에러핸들러 = vi.fn()
    const 커스텀에러폴백 = <div>커스텀 에러 UI</div>
    const 커스텀오프라인폴백 = <div>커스텀 오프라인 UI</div>

    // 오프라인 상태로 설정
    Object.defineProperty(window.navigator, 'onLine', {
      writable: true,
      value: false
    })

    render(
      <AppGuardians
        config={{
          errorBoundary: {
            fallback: 커스텀에러폴백,
            onError: 에러핸들러
          },
          networkState: {
            offlineFallback: 커스텀오프라인폴백
          }
        }}
      >
        <네트워크상태컴포넌트 />
      </AppGuardians>
    )

    // 오프라인 상태에서는 커스텀 오프라인 폴백이 표시되어야 함
    expect(screen.getByText('커스텀 오프라인 UI')).toBeInTheDocument()
  })

  it('에러와 네트워크 상태의 우선순위를 올바르게 처리한다', async () => {
    const 에러핸들러 = vi.fn()

    // 온라인 상태에서 시작
    Object.defineProperty(window.navigator, 'onLine', {
      writable: true,
      value: true
    })

    render(
      <AppGuardians
        config={{
          errorBoundary: { onError: 에러핸들러 }
        }}
      >
        <에러트리거컴포넌트 />
      </AppGuardians>
    )

    // 온라인 상태에서 에러 발생
    const 에러버튼 = screen.getByText('에러 발생시키기')
    fireEvent.click(에러버튼)

    await waitFor(() => {
      expect(
        screen.getByText('알 수 없는 오류가 발생했습니다.')
      ).toBeInTheDocument()
      expect(에러핸들러).toHaveBeenCalled()
    })
  })

  it('오프라인 상태에서는 에러가 발생하지 않는다', () => {
    // 오프라인 상태로 설정
    Object.defineProperty(window.navigator, 'onLine', {
      writable: true,
      value: false
    })

    const 에러핸들러 = vi.fn()

    render(
      <AppGuardians
        config={{
          errorBoundary: { onError: 에러핸들러 }
        }}
      >
        <에러트리거컴포넌트 />
      </AppGuardians>
    )

    // 오프라인 폴백이 표시되고 에러는 발생하지 않음
    expect(screen.getByText('인터넷 연결이 끊어졌습니다')).toBeInTheDocument()
    expect(에러핸들러).not.toHaveBeenCalled()
  })

  it('useNetworkState 훅이 올바른 초기값을 반환한다', () => {
    render(<네트워크상태컴포넌트 />)

    expect(screen.getByText('상태: 온라인')).toBeInTheDocument()
    expect(screen.getByText('온라인 여부: true')).toBeInTheDocument()
    expect(screen.getByText('오프라인 여부: false')).toBeInTheDocument()
  })

  it('복잡한 컴포넌트 구조에서도 안정적으로 작동한다', async () => {
    const 중첩컴포넌트 = () => (
      <div>
        <div>중첩된 컴포넌트</div>
        <네트워크상태컴포넌트 />
        <에러트리거컴포넌트 />
      </div>
    )

    const 에러핸들러 = vi.fn()

    render(
      <AppGuardians
        config={{
          errorBoundary: { onError: 에러핸들러 }
        }}
      >
        <중첩컴포넌트 />
      </AppGuardians>
    )

    expect(screen.getByText('중첩된 컴포넌트')).toBeInTheDocument()
    expect(screen.getByText('앱이 정상 작동 중입니다')).toBeInTheDocument()

    // 중복 텍스트가 있으므로 getAllByText 사용
    const 상태텍스트들 = screen.getAllByText('상태: 온라인')
    expect(상태텍스트들).toHaveLength(2) // 두 개의 네트워크상태컴포넌트

    // 에러 발생 테스트
    const 에러버튼 = screen.getByText('에러 발생시키기')
    fireEvent.click(에러버튼)

    await waitFor(() => {
      expect(
        screen.getByText('알 수 없는 오류가 발생했습니다.')
      ).toBeInTheDocument()
      expect(에러핸들러).toHaveBeenCalled()
    })
  })
})
