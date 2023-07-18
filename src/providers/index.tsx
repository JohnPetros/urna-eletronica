'use client'
import { ReactNode } from 'react'
import { ModalProvider } from '@/hooks/useModal'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return <ModalProvider>{children}</ModalProvider>
}
