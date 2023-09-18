import { Person } from '@/api/types'

const getIdOfResourse = (url: string) => {
  return (url || '').split('/').filter(Boolean).pop()
}

export const getPersonId = (person: Person) => getIdOfResourse(person.url)!

export const getHomeworldId = (person: Person) => getIdOfResourse(person.homeworld)!

export const getSpeciesId = (person: Person) => getIdOfResourse(person.species[0])

export const padZero = (n: number) => {
  return n > 9 ? String(n) : `0${n}`
}

export const formatDate = (date: string) => {
  // or we can use date-fns instead
  const d = new Date(date)
  const DD = padZero(d.getDate())
  const MM = padZero(d.getMonth() + 1)
  const YYYY = d.getFullYear()
  const HH = padZero(d.getHours())
  const mm = padZero(d.getMinutes())
  return `${DD}/${MM}/${YYYY} ${HH}:${mm}`
}
