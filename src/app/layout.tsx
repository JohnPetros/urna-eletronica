import './styles/global.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { Providers } from '@/providers'

const roboto = Roboto({ weight: ['400', '500', '700', '900'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Urna eletrônica',
  description: 'Simulador de urna eletrônica eleitoral',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={`${roboto.className} w-screen h-screen`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
