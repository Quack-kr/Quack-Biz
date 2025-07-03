import api from 'lib/axios'
import type { SocialProvider } from 'types/auth'

export async function socialCallback(
  provider: SocialProvider,
  code: string,
  state: string
) {
  const res = await api.post(
    `/v1/auth/${provider}/callback`,
    { code, state },
    { withCredentials: true }
  )
  return res.data.data.access_token
}
