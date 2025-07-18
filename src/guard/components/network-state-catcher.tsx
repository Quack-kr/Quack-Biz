import { useEffect, useState } from 'react'
import type { StrictPropsWithChildren, NetworkStateConfig } from '../types'

interface NetworkStateCatcherProps extends StrictPropsWithChildren {
  config?: NetworkStateConfig
}

const DefaultOfflineFallback = () => (
  <div>
    <h2>인터넷 연결이 끊어졌습니다</h2>
    <p>네트워크 연결을 확인하고 다시 시도해주세요.</p>
  </div>
)

const NetworkStateCatcher = ({
  children,
  config = {}
}: NetworkStateCatcherProps) => {
  const { offlineFallback, onOnline, onOffline } = config
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    // SSR 환경에서는 기본값으로 true 반환
    /* c8 ignore next 2 */
    if (typeof navigator === 'undefined') return true
    return navigator.onLine
  })

  useEffect(() => {
    // 브라우저 환경에서만 실행
    /* c8 ignore next */
    if (typeof window === 'undefined') return

    const handleOnline = () => {
      setIsOnline(true)
      onOnline?.()
    }

    const handleOffline = () => {
      setIsOnline(false)
      onOffline?.()
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [onOnline, onOffline])

  if (!isOnline) {
    return offlineFallback ?? <DefaultOfflineFallback />
  }

  return <>{children}</>
}

export default NetworkStateCatcher
