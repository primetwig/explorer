'use client'

import Person from '@/components/Person'

export default function Page({ params }: { params: { id: string } }) {
  return (
    <Person id={params.id} />
  )
}
