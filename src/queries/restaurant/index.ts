import { useQuery, useSuspenseQuery, useMutation } from '@tanstack/react-query'
import {
  getRestaurant,
  getRestaurants,
  updateLocationAddress,
  updateRestaurantInfo,
  updateRestaurantName,
  updateRestaurantProfile,
  uploadRestaurantImage
} from '@/apis/services/restaurant'
import type {
  UpdateLocationAddressRequest,
  UpdateNameRequest,
  UpdateRestaurantProfileRequest
} from '@/types/restaurant'

export function useRestaurants() {
  return useSuspenseQuery({
    queryKey: ['restaurants'],
    queryFn: getRestaurants
  })
}

export function useRestaurant(restaurantId: number) {
  return useQuery({
    queryKey: ['restaurant', restaurantId],
    queryFn: () => getRestaurant(restaurantId),
    enabled: !!restaurantId
  })
}

export function useUpdateRestaurantInfo() {
  return useMutation({
    mutationFn: updateRestaurantInfo
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
