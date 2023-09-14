import { GetPeopleSuccess, GetPersonSuccess } from './types'

const API_BASE = 'https://swapi.dev/api'

const createQueryString = (params: Record<string, any>) => {
  return Object.keys(params)
    .map(key => {
      const value = params[key]
      const stringValue = Array.isArray(value)
        ? value.join(`&${key}=`)
        : String(value)
      return `${key}=${stringValue}`
    })
    .join('&')
}

const createUrl = (path: string, query?: Record<string, any>) => {
  let url = `${API_BASE}${path}`
  if (query) {
    const queryString = createQueryString(query)
    if (queryString) url += `?${queryString}`
  }
  return url
}

export const getPeople = (params?: { keyword?: string; page?: number }) => {
  const url = createUrl(`/people`, params)
  return fetch(url)
    .then(response => response.json() as Promise<GetPeopleSuccess>)
}

export const getPerson = (id: string) => {
  const url = createUrl(`/people/${id}`)
  return fetch(url)
    .then(response => response.json() as Promise<GetPersonSuccess>)
}

export const getAvatarUrl = (name: string) => {
  const q = name.split(' ').join('+')
  const url = `https://www.google.com/search?q=${q}&tbm=isch`
  return fetch(url)
    .then(response => response.text())
    .then(html => {
      console.log({ html })
      const div = document.createElement('div')
      div.innerHTML = html // yes, I trust google in this pet project
      const img = div.querySelector('h2 + * img') // first image of search results
      return img?.getAttribute('src') || ''
    })
}
