'use client'
import { ReactNode } from 'react'
import { ModalProvider } from '@/hooks/useModal'
import { UserProvider } from '@/hooks/useUser'
import { usePathname } from 'next/navigation'

import { PrivateRoute } from '@/components/PrivateRoute'
import { Header } from '@/app/components/Header'

import { checkIsPublicRoute } from '@/functions'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  const pathname = usePathname()

  const isPublicRoute = checkIsPublicRoute(pathname)

  console.log({isPublicRoute})

  return (
    <UserProvider>
      <ModalProvider>
        <Header />
        {isPublicRoute ? children : <PrivateRoute>{children}</PrivateRoute>}
      </ModalProvider>
    </UserProvider>
  )
}
