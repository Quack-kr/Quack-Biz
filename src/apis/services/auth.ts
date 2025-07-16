import api from '@/lib/axios'
import type { SocialProvider, SocialLoginResponse } from '@/types/auth'

export async function socialCallback(
  provider: SocialProvider,
  code: string,
  state: string
): Promise<SocialLoginResponse> {
  const res = await api.post<SocialLoginResponse>(
    `/v1/auth/${provider}/login`,
    { code, state },
    { withCredentials: true }
  )
  return res.data
}
