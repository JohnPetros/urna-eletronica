'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

import { ModalProvider } from '@/hooks/useModal'
import { UserProvider } from '@/hooks/useUser'
import { UrnProvider } from '@/hooks/useUrn'

import { PrivateRoute } from '@/components/PrivateRoute'

import { checkIsPublicRoute } from '@/functions'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  const pathname = usePathname()
  const isPublicRoute = checkIsPublicRoute(pathname)

  return (
    <UserProvider>
      <ModalProvider>
        <UrnProvider>
          {isPublicRoute ? children : <PrivateRoute>{children}</PrivateRoute>}
        </UrnProvider>
      </ModalProvider>
    </UserProvider>
  )
}
