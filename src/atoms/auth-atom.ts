import { atom } from 'jotai'

import { getAccessToken } from 'lib/token'

export const accessTokenAtom = atom<string | null>(getAccessToken())

export const accessTokenWithStorageAtom = atom(
  (get) => get(accessTokenAtom),
  (get, set, newToken: string | null) => {
    set(accessTokenAtom, newToken)
    if (typeof window !== 'undefined') {
      if (newToken) {
        localStorage.setItem('access_token', newToken)
      } else {
        localStorage.removeItem('access_token')
      }
    }
  }
)
