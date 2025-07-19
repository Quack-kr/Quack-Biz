import api from '@/lib/axios'
import type { BasicOkResponse, UploadImageResponse } from '@/types/common'
import type {
  GetRestaurantResponse,
  UpdateRestaurantRequest,
  BasicApiResponse,
  UpdateRestaurantProfileRequest,
  GetRestaurantsResponse,
  UpdateNameRequest,
  UpdateLocationAddressRequest
} from '@/types/restaurant'

export async function getRestaurants(): Promise<GetRestaurantsResponse> {
  const res = await api.get<GetRestaurantsResponse>('/v1/dashboard/restaurants')
  return res.data
}

export async function getRestaurant(
  restaurant_id: number
): Promise<GetRestaurantResponse> {
  const res = await api.get<GetRestaurantResponse>('/v1/restaurants', {
    params: { restaurant_id }
  })
  return res.data
}

export async function updateRestaurantInfo(
  body: UpdateRestaurantRequest
): Promise<BasicApiResponse> {
  const res = await api.post<BasicApiResponse>('/v1/restaurants', body)
  return res.data
}

export async function updateRestaurantProfile(
  restaurantId: number,
  body: UpdateRestaurantProfileRequest
): Promise<BasicOkResponse> {
  const res = await api.post<BasicOkResponse>(
    `/v1/dashboard/restaurants/${restaurantId}`,
    body
  )
  return res.data
}

export async function uploadRestaurantImage(
  restaurantId: number,
  formData: FormData
): Promise<UploadImageResponse> {
  const res = await api.post<UploadImageResponse>(
    `/v1/dashboard/restaurants/${restaurantId}/image`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
  )
  return res.data
}

export async function updateRestaurantName(
  restaurantId: number,
  body: UpdateNameRequest
): Promise<BasicOkResponse> {
  const res = await api.post<BasicOkResponse>(
    `/v1/restaurants/${restaurantId}/name`,
    body
  )
  return res.data
}

export async function updateLocationAddress(
  restaurantId: number,
  body: UpdateLocationAddressRequest
): Promise<BasicOkResponse> {
  const res = await api.post<BasicOkResponse>(
    `/v1/dashboard/restaurants/${restaurantId}/location-address`,
    body
  )
  return res.data
}
