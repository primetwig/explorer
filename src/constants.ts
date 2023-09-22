export const routes = {
  root: () => '/',
  about: () => '/about',
  blog: () => '/blog',
  contacts: () => '/contacts',
  person: (id: string) => `/people/${id}`,
}

export const ITEMS_ON_PAGE = 10
