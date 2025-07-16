import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAtomValue } from 'jotai'

import { PATH } from '@/constants/path'
import { accessTokenAtom } from '@/atoms/auth-atom'

function Protected() {
  const auth = useAtomValue(accessTokenAtom)

  if (!auth) {
    return <Outlet />
  }

  return <Navigate to={PATH.dashboard} />
}

export default Protected
