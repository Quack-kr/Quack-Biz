import { http } from 'msw'
import type {
  GetMenuResponse,
  PostMenuRequest,
  BasicMenuUpdateResponse
} from '@/types/menu'
import { mockMenuData } from '../data/menu'

const API_BASE = '/api/v1'

export const menuHandlers = [
  // GET: 메뉴 조회
  http.get(`${API_BASE}/restaurants/:restaurantId/menu`, async ({ params }) => {
    const restaurantId = Number(params.restaurantId)

    const data = mockMenuData[restaurantId]

    if (!data) {
      return new Response(
        JSON.stringify({
          message: '메뉴 정보를 찾을 수 없습니다.',
          data: null
        } satisfies GetMenuResponse),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    return new Response(
      JSON.stringify({
        message: '메뉴 조회 성공',
        data: data
      } satisfies GetMenuResponse),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }),

  // POST: 메뉴 등록
  http.post(
    `${API_BASE}/restaurants/:restaurantId/menu`,
    async ({ request, params }) => {
      const restaurantId = Number(params.restaurantId)
      const body = (await request.json()) as PostMenuRequest

      const { menus } = body

      const hasInvalidMenu = menus.some((menu) => !menu.name?.trim())
      if (hasInvalidMenu) {
        return new Response(
          JSON.stringify({
            message: '메뉴 이름이 비어있을 수 없습니다.',
            data: ''
          } satisfies BasicMenuUpdateResponse),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          }
        )
      }

      const newCategories = [...new Set(menus.map((m) => m.category))]

      mockMenuData[restaurantId] = {
        restaurantId,
        restaurantName: `레스토랑 ${restaurantId}번`,
        menus,
        categories: newCategories
      }

      return new Response(
        JSON.stringify({
          message: '메뉴 등록에 성공했습니다.',
          data: `restaurantId: ${restaurantId}, 메뉴 갯수: ${menus.length}`
        } satisfies BasicMenuUpdateResponse),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }
  )
]
