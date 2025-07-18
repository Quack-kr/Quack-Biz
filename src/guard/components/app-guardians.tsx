import UnPredictableErrorBoundary from './un-predictable-error-boundary'
import NetworkStateCatcher from './network-state-catcher'
import type { AppGuardiansProps } from '../types'

const AppGuardian = ({ children, config = {} }: AppGuardiansProps) => {
  const { errorBoundary, networkState } = config

  return (
    <UnPredictableErrorBoundary config={errorBoundary}>
      <NetworkStateCatcher config={networkState}>
        {children}
      </NetworkStateCatcher>
    </UnPredictableErrorBoundary>
  )
}

export default AppGuardian
