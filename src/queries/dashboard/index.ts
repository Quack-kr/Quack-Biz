import { useMutation, useSuspenseQuery } from '@tanstack/react-query'

import {
  getRestaurants,
  getSummaryReport,
  getMenuEvaluation,
  getMenuEvaluationByItem,
  getHesitationReasons,
  updateCatchphrase,
  updateRestaurantName,
  updateLocationAddress,
  updateRestaurantProfile,
  uploadRestaurantImage
} from '@/apis/services/dashboard'
import type {
  CatchphraseRequest,
  UpdateLocationAddressRequest,
  UpdateNameRequest,
  UpdateRestaurantProfileRequest
} from '@/types/dashboard'

export function useRestaurants() {
  return useSuspenseQuery({
    queryKey: ['restaurants'],
    queryFn: getRestaurants
  })
}

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

export function useUpdateRestaurantName(restaurantId: number) {
  return useMutation({
    mutationFn: (body: UpdateNameRequest) =>
      updateRestaurantName(restaurantId, body)
  })
}

export function useUpdateLocationAddress(restaurantId: number) {
  return useMutation({
    mutationFn: (body: UpdateLocationAddressRequest) =>
      updateLocationAddress(restaurantId, body)
  })
}

export function useUpdateRestaurantProfile(restaurantId: number) {
  return useMutation({
    mutationFn: (body: UpdateRestaurantProfileRequest) =>
      updateRestaurantProfile(restaurantId, body)
  })
}

export function useUploadRestaurantImage(restaurantId: number) {
  return useMutation({
    mutationFn: (formData: FormData) =>
      uploadRestaurantImage(restaurantId, formData)
  })
}
