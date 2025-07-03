import api from 'lib/axios'

export async function refreshAccessToken() {
  const res = await api.post(
    '/v1/auth/token',
    { grant_type: 'refresh_token' },
    { withCredentials: true }
  )
  if (res.status === 200) {
    return res.data.data.access_token
  } else {
    throw new Error('Failed to refresh token')
  }
}
