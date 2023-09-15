export const routes = {
  root: () => '/',
  about: () => '/about',
  blog: () => '/blog',
  contacts: () => '/contacts',
  person: (id: string) => `/people/${id}`,
}
