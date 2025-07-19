import api from '@/lib/axios'
import { BasicOkResponse } from '@/types/common'
import type {
  GetSummaryReportResponse,
  GetMenuEvaluationResponse,
  MenuEvaluationByItemResponse,
  GetHesitationReasonsResponse,
  CatchphraseRequest
} from '@/types/dashboard'

export async function getSummaryReport(
  restaurantId: number
): Promise<GetSummaryReportResponse> {
  const res = await api.get<GetSummaryReportResponse>(
    `/v1/dashboard/restaurant/report/summary`,
    { params: { restaurant_id: restaurantId } }
  )
  return res.data
}

export async function getMenuEvaluation(
  restaurantId: number
): Promise<GetMenuEvaluationResponse> {
  const res = await api.get<GetMenuEvaluationResponse>(
    `/v1/dashboard/restaurant/report/menu-evaluation`,
    { params: { restaurant_id: restaurantId } }
  )
  return res.data
}

export async function getMenuEvaluationByItem(
  restaurant_id: number
): Promise<MenuEvaluationByItemResponse> {
  const res = await api.get<MenuEvaluationByItemResponse>(
    '/v1/dashboard/restaurant/report/menu-evaluation-by-item',
    { params: { restaurant_id } }
  )
  return res.data
}

export async function getHesitationReasons(
  restaurantId: number
): Promise<GetHesitationReasonsResponse> {
  const res = await api.get<GetHesitationReasonsResponse>(
    `/v1/dashboard/restaurant/report/hesitation-reasons`,
    { params: { restaurant_id: restaurantId } }
  )
  return res.data
}

export async function updateCatchphrase(
  restaurantId: number,
  body: CatchphraseRequest
): Promise<BasicOkResponse> {
  const res = await api.post<BasicOkResponse>(
    `/v1/restaurants/${restaurantId}/catchphrase`,
    body
  )
  return res.data
}
