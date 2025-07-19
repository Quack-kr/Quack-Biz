/** 가게 목록 조회 */
export interface BusinessHour {
  day: string
  openTime: string | null
  closeTime: string | null
  breakTime: string | null
  lastOrderTime: string | null
}

export interface Restaurant {
  id: number
  status: 'APPROVED' | 'PENDING'
  name: string
  foodCategory: string
  region: string
  locationAddress: string
  latitude: number
  longitude: number
  simpleIntroduction: string
  detailIntroduction: string
  businessHours: BusinessHour[]
  businessNotes: string | null
  businessNumber: string
  parking: string
  toilet: string
  visitCount: number
  reviewCount: number
  createdDate: string
  modifiedDate: string
  catchphrase: string
}

export interface GetRestaurantsResponse {
  message: string
  data: Restaurant[]
}

/** 레스토랑 정보 API */
export interface RestaurantImage {
  order: string
  image_url: string
  alt: string
}

export interface RestaurantInfo {
  id: number
  name: string
  applyName?: string | null
  foodCategory: string
  region: string
  locationAddress: string
  applyLocationAddress?: string | null
  latitude: number
  longitude: number
  simpleIntroduction: string
  detailIntroduction: string
  businessHours: string[]
  businessNotes: string
  businessNumber: string
  parking: string
  toilet: string
  visitCount: number
  reviewCount: number
  createdDate: string
  modifiedDate: string
  catchphrase: string
  restaurantImages: RestaurantImage[]
  allowReview: boolean
}

export interface GetRestaurantResponse {
  message: string
  data: RestaurantInfo | null
}

/** 레스토랑 정보 수정 및 상태 변경 */
export interface UpdateBusinessStatus {
  isTemporarilyClosed: boolean
  isSoldOut: boolean
}

export type DayOfWeek = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'

export interface BusinessHours {
  status: 'same_every_day' | 'different_each_day'
  sameEveryDay?: { open: string; close: string }
  differentEachDay?: Record<DayOfWeek, { open: string; close: string }>
}

export interface RegularHolidays {
  status: 'exists' | 'none'
  days?: DayOfWeek[]
}

export interface BreakTime {
  status: 'none' | 'same_every_day' | 'different_each_day'
  sameEveryDay?: { start: string; end: string }
  differentEachDay?: Record<DayOfWeek, { start: string; end: string }>
}

export interface LastOrderTime {
  status: 'exists' | 'none'
  times?: { day: DayOfWeek; time: string }[]
}

export interface UpdateRestaurantRequest {
  restaurantId: number
  businessStatus?: UpdateBusinessStatus
  businessHours?: BusinessHours
  regularHolidays?: RegularHolidays
  breakTime?: BreakTime
  lastOrder?: LastOrderTime
  notes?: string
}

export interface BasicApiResponse {
  message: string
  data: string
}

/** 레스토랑 프로필 업데이트 */
export interface UpdateRestaurantProfileRequest {
  region: string
  foodCategory: string
  imageUrls: string[]
  simpleIntroduction: string
  detailIntroduction: string
  parking: string
  toilet: string
}

/** 상호명 변경 (POST) */
export interface UpdateNameRequest {
  name: string
  reason: string
}

/** 주소(위치) 변경 (POST) */
export interface UpdateLocationAddressRequest {
  locationAddress: string
  longitude: string
  latitude: string
  reason: string
}
