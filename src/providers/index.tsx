'use client'
import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

import { ModalProvider } from '@/hooks/useModal'
import { UserProvider } from '@/hooks/useUser'
import { RoleProvider } from '@/hooks/useRole'

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
        <RoleProvider>
          {isPublicRoute ? children : <PrivateRoute>{children}</PrivateRoute>}
        </RoleProvider>
      </ModalProvider>
    </UserProvider>
  )
}
