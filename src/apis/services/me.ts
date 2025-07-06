import api from 'lib/axios'
import type { GetMeResponse } from 'types/me'

export async function getMe(): Promise<GetMeResponse> {
  const res = await api.post<GetMeResponse>('/v1/me')
  return res.data
}
