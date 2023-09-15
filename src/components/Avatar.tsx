import { useCallback, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress';
import PersonIcon from '@mui/icons-material/Person';
import { getAvatarUrl } from '@/api'

export interface Props {
  name: string
}

export default function Avatar({ name }: Props) {
  const [state, setState] = useState({ url: '', error: false })

  const handleUrl = useCallback((url: string) => {
    setState(() => ({ url, error: false }))
  }, [])

  const handleError = useCallback(() => {
    setState(prevState => ({ ...prevState, error: true }))
  }, [])

  useEffect(() => {
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
        />
      )}
    </Box>
  )
}
