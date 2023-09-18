import { useState } from 'react'
import Link from 'next/link'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import CircularProgress from '@mui/material/CircularProgress'
import i18n from '@/i18n'
import { routes } from '@/constants'
import { useGetPeople } from '@/hooks/useGetPeople'
import { getPersonId } from '@/helpers'

import Searchbar, { Search } from './Searchbar'
import Avatar from './Avatar'
import PersonInfo from './PersonInfo'

export default function People() {
  const [search, setSearch] = useState<Search>({ keyword: '', page: 1 })
  const { people, pagesCount, loading: isLoading, error: isError } = useGetPeople({
    search: search.keyword || undefined, // do not send an empty string
    page: search.page,
  })

  return (
    <Container maxWidth="xl">
      <Searchbar search={search} onSearch={setSearch} pagesCount={pagesCount} />

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {isLoading ? (
          <CircularProgress />
        ) : isError ? (
          <Alert severity="error">
            {i18n('people.error.no_data')}
          </Alert>
        ) : (
          <ImageList>
            {people.slice(0, 3).map(person => (
              <ImageListItem
                key={person.url}
                component={Link}
                href={routes.person(getPersonId(person))}
              >
                <Avatar name={person.name} />
                <Box sx={{ p: 2, pt: 1 }}>
                  <PersonInfo person={person} short />
                </Box>
              </ImageListItem>
            ))}
          </ImageList>
        )}
      </Box>
    </Container>
  )
}
