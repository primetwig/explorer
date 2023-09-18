import { useState } from 'react'
import Link from 'next/link'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Typography from '@mui/material/Typography'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import CircularProgress from '@mui/material/CircularProgress';
import i18n from '@/i18n'
import { routes } from '@/constants'
import { useGetPeople } from '@/hooks/useGetPeople'
import { getPersonId, formatDate } from '@/helpers'

import Searchbar, { Search } from './Searchbar'
import Avatar from './Avatar'

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
                  <Typography>{i18n("people.label.name", { name: person.name })}</Typography>
                  <Typography>{i18n("people.label.birth", { birth: person.birth_year })}</Typography>
                  <Typography>{i18n("people.label.height", { height: person.height })}</Typography>
                  <Typography>{i18n("people.label.created", { created: formatDate(person.created) })}</Typography>
                </Box>
              </ImageListItem>
            ))}
          </ImageList>
        )}
      </Box>
    </Container>
  )
}
