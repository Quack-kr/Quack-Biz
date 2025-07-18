import { useEffect, useState } from 'react'

export interface NetworkState {
  isOnline: boolean
  isOffline: boolean
}

export const useNetworkState = (): NetworkState => {
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

    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return {
    isOnline,
    isOffline: !isOnline
  }
}
