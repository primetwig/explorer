import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import i18n from '@/i18n'

export default function About() {
  return (
    <Container maxWidth="xl">
      <Box sx={{ p: 2 }}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          {i18n('about.title')}
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" paragraph>
          {i18n('about.description')}
        </Typography>
      </Box>
    </Container>
  )
}
