import type { ReactNode, ReactElement } from 'react'
import type { ErrorInfo } from 'react'

export interface StrictPropsWithChildren {
  children: ReactNode
}

export interface ErrorBoundaryConfig {
  fallback?: ReactElement
  onError?: (error: Error, info: ErrorInfo) => void
  onReset?: () => void
}

export interface NetworkStateConfig {
  offlineFallback?: ReactElement
  onOnline?: () => void
  onOffline?: () => void
}

export interface AppGuardiansConfig {
  errorBoundary?: ErrorBoundaryConfig
  networkState?: NetworkStateConfig
}

export interface AppGuardiansProps extends StrictPropsWithChildren {
  config?: AppGuardiansConfig
}
