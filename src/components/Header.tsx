import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import RocketIcon from '@mui/icons-material/Rocket'
import i18n from '@/i18n'
import { routes } from '@/constants'

const pages = [
  { title: i18n('header.nav.about'), route: routes.about() },
  { title: i18n('header.nav.blog'), route: routes.blog() },
  { title: i18n('header.nav.contacts'), route: routes.contacts() },
]

export default function Header() {
  const router = useRouter()
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)

  const handleOpenNavMenu = useCallback((e: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(e.currentTarget)
  }, [])

  const handleCloseNavMenu = useCallback(() => setAnchorElNav(null), [])

  const handleClickNavMenuItem = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const route = e.currentTarget.getAttribute('data-route')
    if (route) router.push(route)
  }, [router])

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href={routes.root()}>
            <RocketIcon sx={{ mr: 1 }} />
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label={i18n('header.burger.label')}
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map(({ title, route }) => (
                <MenuItem key={route} href={route} LinkComponent={Link} data-route={route} onClick={handleClickNavMenuItem}>
                  <Typography textAlign="center">{title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(({ title, route }) => (
              <Button
                key={route}
                href={route}
                LinkComponent={Link}
                data-route={route}
                onClick={handleClickNavMenuItem}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
