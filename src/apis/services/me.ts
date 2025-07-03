import api from 'lib/axios'

export async function getMe() {
  const res = await api.get('/v1/me')
  return res.data
}
