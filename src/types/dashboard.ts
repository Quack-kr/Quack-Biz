/** 가게 목록 조회 */
export interface Restaurant {
  id: number
  status: 'approved' | 'pending'
  name: string
  foodCategory: string
  region: string
  locationAddress: string
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
}

export interface GetRestaurantsResponse {
  message: string
  data: Restaurant[]
}

/** 주간 리뷰/북마크 리포트 조회 */
export interface WeeklyCounts {
  mon: number
  tue: number
  wed: number
  thu: number
  fri: number
  sat: number
  sun: number
}

export interface RestaurantSummaryReport {
  restaurant_id: string
  business_number: string
  review_counts: {
    week1: WeeklyCounts
    week2: WeeklyCounts
  }
  bookmark_counts: {
    week1: WeeklyCounts
    week2: WeeklyCounts
  }
}

export interface GetSummaryReportResponse {
  message: string
  data: RestaurantSummaryReport
}

/** 메뉴 평가 리포트 조회 */
export interface MenuEvaluation {
  delicious_mat_count: number
  hack_nomat_count: number
  michin_mat_count: number
  normal_mat_count: number
  not_good_mat_count: number
}

export interface GetMenuEvaluationResponse {
  message: string
  data: {
    restaurant_id: string
    evaluation: MenuEvaluation
  }
}

/** 메뉴별 평가 리포트 */
export interface MenuItemEval {
  menu_id: number
  menu_name: string
  count: number
  order: number
}

export interface MenuEvaluationByItem {
  delicious_mat: MenuItemEval[]
  hack_nomat: MenuItemEval[]
  michin_mat: MenuItemEval[]
  normal_mat: MenuItemEval[]
  not_good_mat: MenuItemEval[]
}

export interface MenuEvaluationByItemResponse {
  message: string
  data: {
    restaurant_id: string
    menu_evaluation_by_item: MenuEvaluationByItem
  }
}

/** 방문 망설이는 이유 조회 */
export interface HesitationReason {
  tag_key: string
  tag_value: string
  count: number
  order: number
}

export interface GetHesitationReasonsResponse {
  message: string
  data: {
    restaurant_id: string
    negative_review_tags: HesitationReason[]
  }
}

/** 캐치프레이즈 수정 (POST) */
export interface CatchphraseRequest {
  catchphrase: string
}

export interface BasicOkResponse {
  message: string
  data: string
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

/** 가게 이미지 업로드 */
export type ImageCategory = 'menu_board' | 'restaurant' | 'menu'

export interface UploadImageFormData {
  order: string
  category: ImageCategory
  image: File
}
export interface UploadImageResponse {
  message: string
  data: string
}
