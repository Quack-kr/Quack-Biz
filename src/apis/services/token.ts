import api from 'lib/axios'
import type { RefreshTokenResponse } from 'types/token'

export async function refreshAccessToken(): Promise<string> {
  const res = await api.post<RefreshTokenResponse>(
    '/v1/auth/token',
    { grant_type: 'refresh_token' },
    { withCredentials: true }
  )
  if ('access_token' in res.data.data) {
    return res.data.data.access_token
  }
  throw new Error('Failed to refresh token')
}
