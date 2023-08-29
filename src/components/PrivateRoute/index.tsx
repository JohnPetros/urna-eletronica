'use client'
import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks/useUser'
import { getStoragedUser } from '@/functions'

interface PrivateRouteProps {
  children: ReactNode
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { registerUser } = useUser()
  const router = useRouter()
  const storagedUser = getStoragedUser()

  useEffect(() => {
    if (!storagedUser) {
      router.push('/')
      return
    }

    registerUser(storagedUser)
  }, [])

  return children
}
