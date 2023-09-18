import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import CircularProgress from '@mui/material/CircularProgress'
import i18n from '@/i18n'
import { useGetPersonDetails } from '@/hooks/useGetPersonDetails'
import { formatDate } from '@/helpers'
import { Person } from '@/api/types'

export interface Props {
  person: Person
  short?: boolean
}

export default function PersonInfo({ person, short = false }: Props) {
  const { details, loading: isLoading, error: isError } = useGetPersonDetails(person, { skip: short })

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (isError) {
    return (
      <Alert severity="error">
        {i18n('person_info.error.no_data')}
      </Alert>
    )
  }

  return (
    <>
      {short && (
        <Typography>{i18n("person_info.name", { name: person.name })}</Typography>
      )}
      {!short && details && (
        <>
          <Typography>{i18n("person_info.gender", { gender: person.gender })}</Typography>
          <Typography>{i18n("person_info.homeworld", { homeworld: details.homeworld })}</Typography>
          <Typography>{i18n("person_info.average_lifespan", { average_lifespan: details.averageLifespan || i18n("person_info.n_a") })}</Typography>
          <Typography>{i18n("person_info.classification", { classification: details.classification || i18n("person_info.n_a") })}</Typography>
          <Typography>{i18n("person_info.language", { language: details.language || i18n("person_info.n_a") })}</Typography>
        </>
      )}
      <Typography>{i18n("person_info.birth_year", { birth_year: person.birth_year })}</Typography>
      <Typography>{i18n("person_info.height", { height: person.height })}</Typography>
      {!short && (
        <Typography>{i18n("person_info.mass", { mass: person.mass })}</Typography>
      )}
      {!short && details && (
        <>
          <Typography>{i18n("person_info.hair_color", { hair_color: person.hair_color })}</Typography>
          <Typography>{i18n("person_info.eye_color", { eye_color: person.eye_color })}</Typography>
          <Typography>{i18n("person_info.skin_color", { skin_color: person.skin_color })}</Typography>
          {details.starships.length > 0 && (
            <>
              <Typography>{i18n("person_info.starships")}</Typography>
              <List sx={{ listStyleType: 'disc', m: 0, p: 0, pl: 2 }}>
                {details.starships.map(starship => {
                  const info = {
                    model: starship.model,
                    passengers: starship.passengers,
                  }
                  return (
                    <ListItem key={starship.name} sx={{ display: 'list-item', p: 0 }}>
                      <ListItemText
                        sx={{ m: 0 }}
                        primary={starship.name}
                        secondary={i18n("person_info.starship_info", info)}
                      />
                    </ListItem>
                )
                })}
              </List>
            </>
          )}
        </>
      )}
      <Typography>{i18n("person_info.created", { created: formatDate(person.created) })}</Typography>
    </>
  )
}
