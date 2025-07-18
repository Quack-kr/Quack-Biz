import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from '@/components/App'
import 'tailwindcss/tailwind.css'
import { AppGuardians } from './guard'
import { OfflineFallback, UnPredictableErrorFallback } from '@/components/error'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppGuardians
        config={{
          errorBoundary: {
            fallback: <UnPredictableErrorFallback />,
            onError: (error, errorInfo) => {
              console.error('에러 발생:', error)
              console.error('에러 정보:', errorInfo)
              // 에러 리포팅 서비스로 전송
            },
            onReset: () => {
              console.log('커스텀 리셋 로직 실행!')
              window.location.reload()
            }
          },
          networkState: {
            offlineFallback: <OfflineFallback />,
            onOnline: () => {
              console.log('온라인 상태로 변경됨!')
              // 데이터 동기화, 알림 표시 등
            },
            onOffline: () => {
              console.log('오프라인 상태로 변경됨!')
              // 오프라인 알림, 동기화 중단 등
            }
          }
        }}
      >
        <App />
      </AppGuardians>
    </QueryClientProvider>
  </React.StrictMode>
)
