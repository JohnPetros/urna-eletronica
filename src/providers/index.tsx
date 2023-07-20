'use client'
import { ReactNode } from 'react'
import { ModalProvider } from '@/hooks/useModal'
import { UserProvider } from '@/hooks/useUser'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <UserProvider>
      <ModalProvider>{children}</ModalProvider>
    </UserProvider>
  )
}
