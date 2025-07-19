import { setupWorker } from 'msw/browser'
import { menuHandlers } from '../handlers/menu'
import { restaurantHandlers } from '../handlers/restaurant'

export const worker = setupWorker(
  ...[
    // =================================
    // 메뉴 관리 API Mocks
    // =================================
    ...menuHandlers,
    // =================================
    // 가게 관리 API Mocks
    // =================================
    ...restaurantHandlers
  ]
)
