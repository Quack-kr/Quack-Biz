import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAtomValue } from 'jotai'

import { accessTokenAtom } from 'atoms/auth-atom'
import { PATH } from '@/constants/path'

function HomePage() {
  const auth = useAtomValue(accessTokenAtom)
  const navigate = useNavigate()
  useEffect(
    () => navigate(auth ? PATH.dashboard : PATH.login),
    [auth, navigate]
  )
  return null
}

export default HomePage
