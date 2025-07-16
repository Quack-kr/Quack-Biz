import api from '@/lib/axios'
import type {
  GetRestaurantsResponse,
  GetSummaryReportResponse,
  GetMenuEvaluationResponse,
  MenuEvaluationByItemResponse,
  GetHesitationReasonsResponse,
  CatchphraseRequest,
  BasicOkResponse,
  UpdateNameRequest,
  UpdateLocationAddressRequest,
  UpdateRestaurantProfileRequest,
  UploadImageResponse
} from '@/types/dashboard'

export async function getRestaurants(): Promise<GetRestaurantsResponse> {
  const res = await api.get<GetRestaurantsResponse>(
    '/api/v1/dashboard/restaurants'
  )
  return res.data
}

export async function getSummaryReport(
  restaurantId: number
): Promise<GetSummaryReportResponse> {
  const res = await api.get<GetSummaryReportResponse>(
    `/api/v1/dashboard/restaurant/report/summary`,
    { params: { restaurant_id: restaurantId } }
  )
  return res.data
}

export async function getMenuEvaluation(
  restaurantId: number
): Promise<GetMenuEvaluationResponse> {
  const res = await api.get<GetMenuEvaluationResponse>(
    `/api/v1/dashboard/restaurant/report/menu-evaluation`,
    { params: { restaurant_id: restaurantId } }
  )
  return res.data
}

export async function getMenuEvaluationByItem(
  restaurant_id: number
): Promise<MenuEvaluationByItemResponse> {
  const res = await api.get<MenuEvaluationByItemResponse>(
    '/api/v1/dashboard/restaurant/report/menu-evaluation-by-item',
    { params: { restaurant_id } }
  )
  return res.data
}

export async function getHesitationReasons(
  restaurantId: number
): Promise<GetHesitationReasonsResponse> {
  const res = await api.get<GetHesitationReasonsResponse>(
    `/api/v1/dashboard/restaurant/report/hesitation-reasons`,
    { params: { restaurant_id: restaurantId } }
  )
  return res.data
}

export async function updateCatchphrase(
  restaurantId: number,
  body: CatchphraseRequest
): Promise<BasicOkResponse> {
  const res = await api.post<BasicOkResponse>(
    `/api/v1/restaurants/${restaurantId}/catchphrase`,
    body
  )
  return res.data
}

export async function updateRestaurantName(
  restaurantId: number,
  body: UpdateNameRequest
): Promise<BasicOkResponse> {
  const res = await api.post<BasicOkResponse>(
    `/api/v1/restaurants/${restaurantId}/name`,
    body
  )
  return res.data
}

export async function updateLocationAddress(
  restaurantId: number,
  body: UpdateLocationAddressRequest
): Promise<BasicOkResponse> {
  const res = await api.post<BasicOkResponse>(
    `/api/v1/dashboard/restaurants/${restaurantId}/location-address`,
    body
  )
  return res.data
}

export async function updateRestaurantProfile(
  restaurantId: number,
  body: UpdateRestaurantProfileRequest
): Promise<BasicOkResponse> {
  const res = await api.post<BasicOkResponse>(
    `/api/v1/dashboard/restaurants/${restaurantId}`,
    body
  )
  return res.data
}

export async function uploadRestaurantImage(
  restaurantId: number,
  formData: FormData
): Promise<UploadImageResponse> {
  const res = await api.post<UploadImageResponse>(
    `/api/v1/dashboard/restaurants/${restaurantId}/image`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
  )
  return res.data
}
