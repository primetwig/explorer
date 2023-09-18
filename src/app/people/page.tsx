import { redirect } from 'next/navigation'
import { routes } from '@/constants'

export default function Page() {
  redirect(routes.root())
}
