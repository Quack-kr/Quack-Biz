/** 메뉴 조회 */
export interface MenuItem {
  category: string
  name: string
  price: string
  description: string
  imageUrl: string
  order: string
}
export interface GetMenuResponse {
  message: string
  data: {
    restaurantId: number
    restaurantName: string
    menus: MenuItem[]
    categories: string[]
  } | null
}

/** 메뉴 등록 */
export interface PostMenuRequest {
  restaurant_id: number
  menus: MenuItem[]
}
export interface BasicMenuUpdateResponse {
  message: string
  data: string
}
