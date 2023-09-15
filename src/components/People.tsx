import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import CircularProgress from '@mui/material/CircularProgress';
import i18n from '@/i18n'
import { routes } from '@/constants'
import { useGetPeople } from '@/hooks/useGetPeople'
import { getPersonId, formatDate } from '@/helpers'

import Searchbar, { Search } from './Searchbar'
import Avatar from './Avatar'

export default function People() {
  const router = useRouter()
  const [search, setSearch] = useState<Search>({ keyword: '', page: 1 })
  const { people, pagesCount, loading: isLoading, error: isError } = useGetPeople(search)

  const handleClickPerson = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.getAttribute('data-id')
    if (id) router.push(routes.person(id))
  }, [router])

  return (
    <Container maxWidth="xl">
      <Searchbar search={search} onSearch={setSearch} pagesCount={pagesCount} />

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <ImageList sx={{ width: 500 }}>
            {people.map(person => (
              <ImageListItem key={person.url} data-id={getPersonId(person)} onClick={handleClickPerson}>
                <Avatar name={person.name} />
                <p>Name: {person.name}</p>
                <p>Birth year: {person.birth_year}</p>
                <p>Height: {person.height}</p>
                <p>Created: {formatDate(person.created)}</p>
                {/* <ImageListItemBar
                  title={item.title}
                  subtitle={<span>by: {item.author}</span>}
                  position="below"
                /> */}
              </ImageListItem>
            ))}
          </ImageList>
        )}
      </Box>
    </Container>
  )
}
