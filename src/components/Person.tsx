import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import i18n from '@/i18n'
import { useGetPerson } from '@/hooks/useGetPerson'

import Avatar from './Avatar'
import PersonInfo from './PersonInfo'

export interface Props {
  id: string
}

export default function Person({ id }: Props) {
  const { person, loading: isLoading, error: isError } = useGetPerson({ id })

  return (
    <Container maxWidth="xl">
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {isLoading ? (
          <CircularProgress />
        ) : (isError || !person) ? (
          <Alert severity="error">
            {i18n('person.error.no_data')}
          </Alert>
        ) : (
          <Card>
            <CardContent>
              <Avatar name={person.name} />
              <Box sx={{ pt: 2, pb: 2 }}>
                <Typography variant="h5">
                  {person.name}
                </Typography>
              </Box>
              <PersonInfo person={person} />
            </CardContent>
          </Card>
        )}
      </Box>
    </Container>
  )
}
