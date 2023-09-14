interface ResponseSuccess {}

interface ResponseError {
  detail: string // "Not found"
}

interface PaginatedResponseSuccess extends ResponseSuccess {
  count: number // 82
	next: string | null // "https://swapi.dev/api/people/?page=2"
	previous: string | null // "https://swapi.dev/api/people/?page=2"
}

export interface Person {
  name: string // "Luke Skywalker"
  height: string // "172"
  mass: string // "77"
  hair_color: string // "blond"
  skin_color: string // "fair"
  eye_color: string // "blue"
  birth_year: string // "19BBY"
  gender: string // "male"
  homeworld: string // "https://swapi.dev/api/planets/1/"
  films: string[] // ["https://swapi.dev/api/films/1/"]
  species: string[] // ["https://swapi.dev/api/species/2/"]
  vehicles: string[] // ["https://swapi.dev/api/vehicles/14/"]
  starships: string[] // ["https://swapi.dev/api/starships/12/"]
  created: string // "2014-12-09T13:50:51.644000Z"
  edited: string // "2014-12-20T21:17:56.891000Z"
  url: string // "https://swapi.dev/api/people/1/"
}

export interface GetPeopleSuccess extends PaginatedResponseSuccess {
  results: Person[]
}

export interface GetPersonSuccess extends ResponseSuccess, Person {}
