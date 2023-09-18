import { useCallback, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import PersonIcon from '@mui/icons-material/Person'
import { getAvatarUrl } from '@/api'

export interface Props {
  name: string
}

const cache: Record<string, string> = {}

export default function Avatar({ name }: Props) {
  const [state, setState] = useState({ url: '', error: false })

  const handleUrl = useCallback((url: string) => {
    cache[name] = url
    setState(() => ({ url, error: false }))
  }, [name])

  const handleError = useCallback(() => {
    setState(prevState => ({ ...prevState, error: true }))
  }, [])

  useEffect(() => {
    if (cache[name]) {
      setState({ url: cache[name], error: false })
      return
    }

    setState({ url: '', error: false })
    const to = setTimeout(() => {
      getAvatarUrl(name).then(handleUrl).catch(handleError)
    }, 500)
    return () => clearTimeout(to)
  }, [name])

  const isError = state.error
  const isLoading = !isError && !state.url

  return (
    <Box>
      {isError ? (
        <PersonIcon />
      ) : isLoading ? (
        <CircularProgress />
      ) : (
        <Box
          component="img"
          alt={name}
          src={state.url}
          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )}
    </Box>
  )
}
