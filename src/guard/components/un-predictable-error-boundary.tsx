import { ErrorBoundary } from 'react-error-boundary'
import type { StrictPropsWithChildren, ErrorBoundaryConfig } from '../types'

interface UnPredictableErrorBoundaryProps extends StrictPropsWithChildren {
  config?: ErrorBoundaryConfig
}

const DefaultErrorFallback = ({
  error,
  resetErrorBoundary
}: {
  error: Error
  resetErrorBoundary: () => void
}) => (
  <div>
    <h1>알 수 없는 오류가 발생했습니다.</h1>
    <details>
      <summary>오류 세부사항</summary>
      <pre>{error.message}</pre>
    </details>
    <button onClick={resetErrorBoundary}>다시 시도</button>
  </div>
)

const UnPredictableErrorBoundary = ({
  children,
  config = {}
}: UnPredictableErrorBoundaryProps) => {
  const { fallback, onError, onReset } = config

  const handleReset = () => {
    if (onReset) {
      onReset()
    } else {
      window.location.reload()
    }
  }

  return (
    <ErrorBoundary
      FallbackComponent={fallback ? () => fallback : DefaultErrorFallback}
      onError={onError}
      onReset={handleReset}
    >
      {children}
    </ErrorBoundary>
  )
}

export default UnPredictableErrorBoundary
