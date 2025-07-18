import '@testing-library/jest-dom'
import { vi, beforeEach, beforeAll, afterAll } from 'vitest'

// console.error를 완전히 모킹 (에러 바운더리 테스트용)
const originalError = console.error
const originalWarn = console.warn

beforeAll(() => {
  // React 에러 바운더리 관련 에러와 경고를 모두 억제
  console.error = vi.fn()
  console.warn = vi.fn()
})

afterAll(() => {
  console.error = originalError
  console.warn = originalWarn
})

// window.navigator.onLine 모킹
Object.defineProperty(window.navigator, 'onLine', {
  writable: true,
  value: true
})

// window 이벤트 모킹
const mockAddEventListener = vi.fn()
const mockRemoveEventListener = vi.fn()

Object.defineProperty(window, 'addEventListener', {
  writable: true,
  value: mockAddEventListener
})

Object.defineProperty(window, 'removeEventListener', {
  writable: true,
  value: mockRemoveEventListener
})

// 각 테스트 전에 모킹 초기화
beforeEach(() => {
  vi.clearAllMocks()
  // window가 존재할 때만 navigator.onLine을 true로 리셋
  if (typeof window !== 'undefined') {
    Object.defineProperty(window.navigator, 'onLine', {
      writable: true,
      value: true
    })
  }
})

// unhandled promise rejection 처리
// eslint-disable-next-line @typescript-eslint/no-unused-vars
process.on('unhandledRejection', (_reason) => {
  // 테스트 환경에서는 무시
})

// uncaught exception 처리 (에러 바운더리 테스트용)
const originalListeners = process.listeners('uncaughtException')
process.removeAllListeners('uncaughtException')
process.on('uncaughtException', (error, _origin) => {
  // 테스트 에러는 무시, 실제 에러만 처리
  if (
    !error.message.includes('Test Error') &&
    !error.message.includes('Integration Test Error') &&
    !error.message.includes('테스트 에러') &&
    !error.message.includes('통합 테스트 에러')
  ) {
    originalListeners.forEach((listener) => {
      if (typeof listener === 'function') {
        listener(error, _origin)
      }
    })
  }
})
