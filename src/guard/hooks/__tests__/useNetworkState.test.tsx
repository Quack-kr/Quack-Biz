import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@/test/utils'
import { useNetworkState } from '../use-network-state'

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

describe('네트워크 상태 훅', () => {
  it('초기 온라인 상태를 반환한다', () => {
    const { result } = renderHook(() => useNetworkState())

    expect(result.current.isOnline).toBe(true)
    expect(result.current.isOffline).toBe(false)
  })

  it('오프라인이 될 때 상태를 업데이트한다', async () => {
    const { result } = renderHook(() => useNetworkState())

    // 이벤트 리스너가 등록되었는지 확인
    expect(mockAddEventListener).toHaveBeenCalledWith(
      'offline',
      expect.any(Function)
    )

    // navigator.onLine을 false로 설정
    Object.defineProperty(window.navigator, 'onLine', {
      writable: true,
      value: false
    })

    // 오프라인 이벤트 핸들러 직접 호출
    act(() => {
      if (offlineHandler) {
        offlineHandler()
      }
    })

    expect(result.current.isOnline).toBe(false)
    expect(result.current.isOffline).toBe(true)
  })

  it('온라인이 될 때 상태를 업데이트한다', async () => {
    // 오프라인으로 시작
    Object.defineProperty(window.navigator, 'onLine', {
      writable: true,
      value: false
    })

    const { result } = renderHook(() => useNetworkState())

    // 처음에는 navigator.onLine 값을 따라감
    expect(result.current.isOnline).toBe(false)
    expect(result.current.isOffline).toBe(true)

    // navigator.onLine을 true로 설정
    Object.defineProperty(window.navigator, 'onLine', {
      writable: true,
      value: true
    })

    // 온라인 이벤트 핸들러 직접 호출
    act(() => {
      if (onlineHandler) {
        onlineHandler()
      }
    })

    expect(result.current.isOnline).toBe(true)
    expect(result.current.isOffline).toBe(false)
  })

  it('여러 상태 변경을 처리한다', () => {
    const { result } = renderHook(() => useNetworkState())

    // 오프라인으로 전환
    act(() => {
      if (offlineHandler) {
        offlineHandler()
      }
    })
    expect(result.current.isOnline).toBe(false)

    // 온라인으로 전환
    act(() => {
      if (onlineHandler) {
        onlineHandler()
      }
    })
    expect(result.current.isOnline).toBe(true)

    // 다시 오프라인으로 전환
    act(() => {
      if (offlineHandler) {
        offlineHandler()
      }
    })
    expect(result.current.isOnline).toBe(false)
  })

  it('SSR 환경을 처리한다', () => {
    // navigator를 undefined로 모킹
    const originalNavigator = global.navigator
    // @ts-expect-error: __
    delete global.navigator

    const { result } = renderHook(() => useNetworkState())

    // SSR에서는 기본적으로 온라인이어야 함
    expect(result.current.isOnline).toBe(true)
    expect(result.current.isOffline).toBe(false)

    // navigator 복원
    global.navigator = originalNavigator
  })

  it('언마운트 시 이벤트 리스너를 정리한다', () => {
    const { unmount } = renderHook(() => useNetworkState())

    // 이벤트 리스너가 등록되었는지 확인
    expect(mockAddEventListener).toHaveBeenCalledWith(
      'online',
      expect.any(Function)
    )
    expect(mockAddEventListener).toHaveBeenCalledWith(
      'offline',
      expect.any(Function)
    )

    unmount()

    expect(mockRemoveEventListener).toHaveBeenCalledWith(
      'online',
      expect.any(Function)
    )
    expect(mockRemoveEventListener).toHaveBeenCalledWith(
      'offline',
      expect.any(Function)
    )
  })
})
