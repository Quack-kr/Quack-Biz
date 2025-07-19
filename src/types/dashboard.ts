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
