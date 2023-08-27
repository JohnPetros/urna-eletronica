import './styles/global.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import { Providers } from '@/providers'

const roboto = Inter({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Simulador de urna eletrônica',
  description: 'Simulador de uma urna eletrônica eleitoral',  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={`${roboto.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
