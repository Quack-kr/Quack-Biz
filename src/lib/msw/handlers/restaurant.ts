import { http } from 'msw'
import type { GetRestaurantResponse } from '@/types/restaurant'
import { mockRestaurantData } from '../data/restaurant'

const API_BASE = '/api/v1'

export const restaurantHandlers = [
  http.get(`${API_BASE}/restaurants`, async ({ request }) => {
    const url = new URL(request.url)
    const idParam = url.searchParams.get('restaurant_id')

    const restaurantId = idParam ? Number(idParam) : null

    if (!restaurantId || !mockRestaurantData[restaurantId]) {
      return new Response(
        JSON.stringify({
          message: '해당 레스토랑 정보를 찾을 수 없습니다.',
          data: null
        } satisfies GetRestaurantResponse),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    return new Response(
      JSON.stringify({
        message: '레스토랑 정보 조회 성공',
        data: mockRestaurantData[restaurantId]
      } satisfies GetRestaurantResponse),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  })
]
