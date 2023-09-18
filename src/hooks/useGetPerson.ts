import { useCallback, useEffect, useState } from 'react'
import { getPerson } from '@/api'
import { Person, GetPersonParams, GetPersonSuccess } from '@/api/types'

interface State {
  person: Person | null
  loading: boolean
  error: boolean
}

export const useGetPerson = (params: GetPersonParams) => {
  const [state, setState] = useState<State>({ person: null, loading: true, error: false })
  const mainHookDeps = Object.values(params).join()

  const handleGetPeopleSuccess = useCallback((response: GetPersonSuccess) => {
    setState(prev => ({
      ...prev,
      person: response,
      loading: false,
      error: false,
    }))
  }, [])

  const handleGetPeopleError = useCallback(() => {
    setState(prev => ({
      ...prev,
      person: null,
      loading: false,
      error: true,
    }))
  }, [])

  useEffect(() => {
    setState(prev => ({ ...prev, loading: true }))

    const to = setTimeout(() => {
      getPerson(params)
        .then(handleGetPeopleSuccess)
        .catch(handleGetPeopleError)
    }, 500)

    return () => clearTimeout(to)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainHookDeps])

  return state
}
