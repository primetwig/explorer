'use client'

import Header from '@/components/Header'

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Header />
      {children}
    </main>
  )
}
