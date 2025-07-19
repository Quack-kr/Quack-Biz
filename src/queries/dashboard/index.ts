import { useMutation, useSuspenseQuery } from '@tanstack/react-query'

import {
  getSummaryReport,
  getMenuEvaluation,
  getMenuEvaluationByItem,
  getHesitationReasons,
  updateCatchphrase
} from '@/apis/services/dashboard'
import type { CatchphraseRequest } from '@/types/dashboard'

export function useSummaryReport(restaurantId: number) {
  return useSuspenseQuery({
    queryKey: ['summaryReport', restaurantId],
    queryFn: () => getSummaryReport(restaurantId)
  })
}

export function useMenuEvaluation(restaurantId: number) {
  return useSuspenseQuery({
    queryKey: ['menuEvaluation', restaurantId],
    queryFn: () => getMenuEvaluation(restaurantId)
  })
}

export function useMenuEvaluationByItem(restaurantId: number) {
  return useSuspenseQuery({
    queryKey: ['menuEvaluationByItem', restaurantId],
    queryFn: () => getMenuEvaluationByItem(restaurantId)
  })
}

export function useHesitationReasons(restaurantId: number) {
  return useSuspenseQuery({
    queryKey: ['hesitationReasons', restaurantId],
    queryFn: () => getHesitationReasons(restaurantId)
  })
}

export function useUpdateCatchphrase(restaurantId: number) {
  return useMutation({
    mutationFn: (body: CatchphraseRequest) =>
      updateCatchphrase(restaurantId, body)
  })
}
