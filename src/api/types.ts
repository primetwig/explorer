interface ResponseSuccess {}

interface ResponseError {
  detail: string // "Not found"
}

interface PaginatedResponseSuccess extends ResponseSuccess {
  count: number // 82
	next: string | null // "https://swapi.dev/api/people/?page=2"
	previous: string | null // "https://swapi.dev/api/people/?page=2"
}

interface Item {
  created: string // "2014-12-09T13:50:51.644000Z"
  edited: string // "2014-12-20T21:17:56.891000Z"
  url: string // "https://swapi.dev/api/people/1/"
}

export interface Person extends Item {
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
}

export interface GetPeopleParams {
  search?: string
  page?: number
}

export interface GetPeopleSuccess extends PaginatedResponseSuccess {
  results: Person[]
}

export interface GetPersonParams {
  id: string
}

export interface GetPersonSuccess extends ResponseSuccess, Person {}

export interface Planet extends Item {
  name: string // "Tatooine"
  rotation_period: string // "23"
  orbital_period: string // "304"
  diameter: string // "10465"
  climate: string // "arid"
  gravity: string // "1 standard"
  terrain: string // "desert"
  surface_water: string // "1"
  population: string // "200000"
  residents: string[] // ["https://swapi.dev/api/people/1/"]
  films: string[] // ["https://swapi.dev/api/films/1/"]
}

export interface GetPlanetParams {
  id: string
}

export interface GetPlanetSuccess extends ResponseSuccess, Planet {}

export interface Specie extends Item {
  name: string // "Human"
  classification: string // "mammal"
  designation: string // "sentient"
  average_height: string // "180"
  skin_colors: string // "caucasian, black, asian, hispanic"
  hair_colors: string // "blonde, brown, black, red"
  eye_colors: string // "brown, blue, green, hazel, grey, amber"
  average_lifespan: string // "120"
  homeworld: string // "https://swapi.dev/api/planets/9/"
  language: string // "Galactic Basic"
  people: string[] // ["https://swapi.dev/api/people/66/"]
  films: string[] // ["https://swapi.dev/api/films/1/"]
}

export interface GetSpecieParams {
  id: string
}

export interface GetSpecieSuccess extends ResponseSuccess, Specie {}

export interface Starship extends Item {
  name: string // "X-wing"
  model: string // "T-65 X-wing"
  manufacturer: string // "Incom Corporation"
  cost_in_credits: string // "149999"
  length: string // "12.5"
  max_atmosphering_speed: string // "1050"
  crew: string // "1"
  passengers: string // "0"
  cargo_capacity: string // "110"
  consumables: string // "1 week"
  hyperdrive_rating: string // "1.0"
  MGLT: string // "100"
  starship_class: string // "Starfighter"
  pilots: string[] // ["https://swapi.dev/api/people/1/"]
  films: string[] // ["https://swapi.dev/api/films/1/"]
}

export interface GetStarshipParams {
  id: string
}

export interface GetStarshipSuccess extends ResponseSuccess, Starship {}
