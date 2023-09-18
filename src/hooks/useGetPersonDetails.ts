import { useCallback, useEffect, useState } from 'react'
import {
  getHomeworld,
  getSpecie,
  getStarship,
} from '@/api'
import {
  Person,
  GetPlanetSuccess,
  GetSpecieSuccess,
  GetStarshipSuccess,
} from '@/api/types'
import {
  getPersonId,
  getHomeworldId,
  getSpeciesId,
  getStarshipIds,
} from '@/helpers'

interface Starship {
  name: string
  model: string
  passengers: string
}

interface State {
  details: null | {
    homeworld: string
    averageLifespan: string | null
    classification: string | null
    language: string | null
    starships: Starship[]
  }
  loading: boolean
  error: boolean
}

export const useGetPersonDetails = (person: Person, options: { skip?: boolean } = {}) => {
  const [state, setState] = useState<State>({ details: null, loading: !options.skip, error: false })

  const handleSuccess = useCallback((
    [
      planet,
      specie,
      starships,
    ]: [
      GetPlanetSuccess,
      GetSpecieSuccess | null,
      GetStarshipSuccess[],
    ],
  ) => {
    setState(prev => ({
      ...prev,
      details: {
        homeworld: planet.name,
        averageLifespan: specie?.average_lifespan || null,
        classification: specie?.classification || null,
        language: specie?.language || null,
        starships: starships.map(starship => ({
          name: starship.name,
          model: starship.model,
          passengers: starship.passengers,
        })),
      },
      loading: false,
      error: false,
    }))
  }, [])

  const handleError = useCallback(() => {
    setState(prev => ({
      ...prev,
      person: null,
      loading: false,
      error: true,
    }))
  }, [])

  useEffect(() => {
    if (options.skip) return

    setState(prev => ({ ...prev, loading: true }))

    const to = setTimeout(() => {
      const speciesId = getSpeciesId(person)

      Promise.all([
        getHomeworld({ id: getHomeworldId(person) }),
        speciesId ? getSpecie({ id: speciesId }) : Promise.resolve(null),
        Promise.all(getStarshipIds(person).map(id => getStarship({ id })))
      ])
      .then(handleSuccess)
      .catch(handleError)
    }, 500)

    return () => clearTimeout(to)
  }, [getPersonId(person), Object.values(options).join()])

  return state
}
