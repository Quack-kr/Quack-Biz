import api from '@/lib/axios'
import type {
  GetMenuResponse,
  PostMenuRequest,
  BasicMenuUpdateResponse
} from '@/types/menu'

export async function getMenu(restaurantId: number): Promise<GetMenuResponse> {
  const res = await api.get<GetMenuResponse>(
    `/v1/restaurants/${restaurantId}/menu`
  )
  return res.data
}

export async function postMenu(
  restaurantId: number,
  body: PostMenuRequest
): Promise<BasicMenuUpdateResponse> {
  const res = await api.post<BasicMenuUpdateResponse>(
    `/v1/restaurants/${restaurantId}/menu`,
    body
  )
  return res.data
}
