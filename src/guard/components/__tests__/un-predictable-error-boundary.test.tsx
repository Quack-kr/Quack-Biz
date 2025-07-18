import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest'
import { render, screen } from '@/test/utils'
import UnPredictableErrorBoundary from '../un-predictable-error-boundary'

// 에러를 발생시키는 테스트 컴포넌트
const ErrorThrowingComponent = ({
  shouldThrow = false
}: {
  shouldThrow?: boolean
}) => {
  if (shouldThrow) {
    throw new Error('테스트 에러')
  }
  return <div>에러 없음</div>
}

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

describe('예상하지 못한 에러 바운더리', () => {
  it('에러가 없을 때 자식 컴포넌트를 렌더링한다', () => {
    render(
      <UnPredictableErrorBoundary>
        <div>테스트 콘텐츠</div>
      </UnPredictableErrorBoundary>
    )

    expect(screen.getByText('테스트 콘텐츠')).toBeInTheDocument()
  })

  it('에러가 발생했을 때 기본 에러 폴백을 렌더링한다', () => {
    render(
      <UnPredictableErrorBoundary>
        <ErrorThrowingComponent shouldThrow={true} />
      </UnPredictableErrorBoundary>
    )

    expect(
      screen.getByText('알 수 없는 오류가 발생했습니다.')
    ).toBeInTheDocument()
    expect(screen.getByText('다시 시도')).toBeInTheDocument()
  })

  it('커스텀 폴백이 제공되면 커스텀 폴백을 렌더링한다', () => {
    const 커스텀폴백 = <div>커스텀 에러 메시지</div>

    render(
      <UnPredictableErrorBoundary config={{ fallback: 커스텀폴백 }}>
        <ErrorThrowingComponent shouldThrow={true} />
      </UnPredictableErrorBoundary>
    )

    expect(screen.getByText('커스텀 에러 메시지')).toBeInTheDocument()
  })

  it('에러가 발생했을 때 onError 콜백을 호출한다', () => {
    const 에러핸들러 = vi.fn()

    render(
      <UnPredictableErrorBoundary config={{ onError: 에러핸들러 }}>
        <ErrorThrowingComponent shouldThrow={true} />
      </UnPredictableErrorBoundary>
    )

    expect(에러핸들러).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({
        componentStack: expect.any(String)
      })
    )
  })

  it('기본 폴백에서 에러 세부사항을 보여준다', () => {
    render(
      <UnPredictableErrorBoundary>
        <ErrorThrowingComponent shouldThrow={true} />
      </UnPredictableErrorBoundary>
    )

    expect(screen.getByText('오류 세부사항')).toBeInTheDocument()
    expect(screen.getByText('테스트 에러')).toBeInTheDocument()
  })

  it('커스텀 onReset이 제공되면 호출한다', () => {
    const 리셋핸들러 = vi.fn()

    render(
      <UnPredictableErrorBoundary config={{ onReset: 리셋핸들러 }}>
        <ErrorThrowingComponent shouldThrow={true} />
      </UnPredictableErrorBoundary>
    )

    const 다시시도버튼 = screen.getByText('다시 시도')
    다시시도버튼.click()

    expect(리셋핸들러).toHaveBeenCalled()
  })

  it('커스텀 onReset이 없으면 페이지를 새로고침한다', () => {
    // window.location.reload 모킹
    const 새로고침모킹 = vi.fn()
    Object.defineProperty(window, 'location', {
      value: { reload: 새로고침모킹 },
      writable: true
    })

    render(
      <UnPredictableErrorBoundary>
        <ErrorThrowingComponent shouldThrow={true} />
      </UnPredictableErrorBoundary>
    )

    const 다시시도버튼 = screen.getByText('다시 시도')
    다시시도버튼.click()

    expect(새로고침모킹).toHaveBeenCalled()
  })

  it('커스텀 onReset이 제공되면 페이지를 새로고침하지 않는다', () => {
    const 새로고침모킹 = vi.fn()
    const 리셋핸들러 = vi.fn()

    Object.defineProperty(window, 'location', {
      value: { reload: 새로고침모킹 },
      writable: true
    })

    render(
      <UnPredictableErrorBoundary config={{ onReset: 리셋핸들러 }}>
        <ErrorThrowingComponent shouldThrow={true} />
      </UnPredictableErrorBoundary>
    )

    const 다시시도버튼 = screen.getByText('다시 시도')
    다시시도버튼.click()

    expect(리셋핸들러).toHaveBeenCalled()
    expect(새로고침모킹).not.toHaveBeenCalled()
  })

  it('에러 정보를 올바른 타입으로 처리한다', () => {
    const 에러핸들러 = vi.fn()

    render(
      <UnPredictableErrorBoundary config={{ onError: 에러핸들러 }}>
        <ErrorThrowingComponent shouldThrow={true} />
      </UnPredictableErrorBoundary>
    )

    expect(에러핸들러).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({
        componentStack: expect.any(String)
      })
    )

    // 콜백이 올바른 타입으로 호출되었는지 확인
    const [에러, 에러정보] = 에러핸들러.mock.calls[0]
    expect(에러).toBeInstanceOf(Error)
    expect(typeof 에러정보.componentStack).toBe('string')
  })

  it('모든 설정 옵션이 함께 작동한다', () => {
    const 에러핸들러 = vi.fn()
    const 리셋핸들러 = vi.fn()
    const 커스텀폴백 = <div>모든 옵션 테스트</div>

    render(
      <UnPredictableErrorBoundary
        config={{
          fallback: 커스텀폴백,
          onError: 에러핸들러,
          onReset: 리셋핸들러
        }}
      >
        <ErrorThrowingComponent shouldThrow={true} />
      </UnPredictableErrorBoundary>
    )

    expect(screen.getByText('모든 옵션 테스트')).toBeInTheDocument()
    expect(에러핸들러).toHaveBeenCalled()
  })
})
