import { useCallback } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Pagination from '@mui/material/Pagination'
import Container from '@mui/material/Container'
import i18n from '@/i18n'

export interface Search {
  keyword: string
  page: number
}

export interface Props {
  search: Search
  onSearch: (search: Search) => void
  pagesCount: number
}

export default function Searchbar({ search, onSearch, pagesCount }: Props) {
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch({ ...search, keyword: e.target.value })
  }, [search])

  const handlePageChange = useCallback((e: React.ChangeEvent<unknown>, value: number) => {
    onSearch({ ...search, page: value })
  }, [search])

  return (
    <Container maxWidth="xl">
      <Box sx={{ m: 2 }} autoComplete="off" component="form" noValidate>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <TextField
            label={i18n('search.placeholder')}
            variant="outlined"
            value={search.keyword}
            onChange={handleSearch}
          />
          {pagesCount > 0 && (
            <Pagination
              count={pagesCount}
              page={search.page}
              onChange={handlePageChange}
            />
          )}
        </Box>
      </Box>
    </Container>
  )
}
