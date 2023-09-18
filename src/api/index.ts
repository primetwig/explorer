import { GetPeopleParams, GetPeopleSuccess, GetPersonSuccess } from './types'

const API_BASE = 'https://swapi.dev/api'

const createQueryString = (params: Record<string, any>) => {
  return Object.keys(params)
    .filter(key => typeof params[key] !== undefined)
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

export const getPeople = (params?: GetPeopleParams) => {
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
  const url = `/api/avatar?name=${encodeURI(name)}`
  return fetch(url)
    .then(res => res.text())
    .then(html => {
      const div = document.createElement('div')

      // some sanitization is expected to be here in real project
      div.innerHTML = html

      // first image of search results
      const img = div.querySelector('.thumbnail img')

      const url = img?.getAttribute('src')

      if (url) return url

      throw new Error(`No url for the name: ${name}`)
    })
}
