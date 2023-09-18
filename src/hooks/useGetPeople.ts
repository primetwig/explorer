import { useCallback, useEffect, useState } from 'react'
import { getPeople } from '@/api'
import { Person, GetPeopleParams, GetPeopleSuccess } from '@/api/types'

interface State {
  people: Person[]
  pagesCount: number
  loading: boolean
  error: boolean
}

export const useGetPeople = (params: GetPeopleParams) => {
  const [state, setState] = useState<State>({ people: [], pagesCount: 0, loading: true, error: false })
  const mainHookDeps = Object.values(params).join()

  const handleGetPeopleSuccess = useCallback((response: GetPeopleSuccess) => {
    setState(prev => ({
      ...prev,
      people: response.results,
      pagesCount: response.count,
      loading: false,
      error: false,
    }))
  }, [])

  const handleGetPeopleError = useCallback(() => {
    setState(prev => ({
      ...prev,
      people: [],
      loading: false,
      error: true,
    }))
  }, [])

  useEffect(() => {
    setState(prev => ({ ...prev, loading: true }))

    const to = setTimeout(() => {
      getPeople(params)
        .then(handleGetPeopleSuccess)
        .catch(handleGetPeopleError)
    }, 500)

    return () => clearTimeout(to)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainHookDeps])

  return state
}
