import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import i18n from '@/i18n'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: i18n('page.title'),
  description: i18n('page.description'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang={i18n.get()}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
