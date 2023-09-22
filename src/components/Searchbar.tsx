import { useCallback } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Pagination from '@mui/material/Pagination'
import i18n from '@/i18n'
import { ITEMS_ON_PAGE } from '@/constants'

export interface Search {
  keyword: string
  page: number
}

export interface Props {
  search: Search
  onSearch: (search: Search) => void
  entriesCount: number
}

export default function Searchbar({ search, onSearch, entriesCount }: Props) {
  const pagesCount = Math.ceil(entriesCount / ITEMS_ON_PAGE)

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch({ ...search, keyword: e.target.value })
  }, [search, onSearch])

  const handlePageChange = useCallback((e: React.ChangeEvent<unknown>, value: number) => {
    onSearch({ ...search, page: value })
  }, [search, onSearch])

  return (
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
  )
}
