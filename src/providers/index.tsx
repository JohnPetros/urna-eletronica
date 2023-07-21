'use client'
import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { ModalProvider } from '@/hooks/useModal'
import { UserProvider } from '@/hooks/useUser'

import { Header } from '@/app/components/Header'
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
        <Header />
        {isPublicRoute ? children : <PrivateRoute>{children}</PrivateRoute>}
      </ModalProvider>
    </UserProvider>
  )
}
