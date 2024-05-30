import { AppBar, Box, Button, Container, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom';
import { PAGES } from '../../constants/navbar';

export const Navbar = () => {

    const pages = [{ name: "Forecast", route: '/forecast' }, { name: 'Favorite Cities', route: '/favorite-cities' }]

    return (
        <AppBar position="static">
            <Toolbar >
                <Box sx={{ display: "flex", gap: 5 }}>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Weather App
                    </Typography>
                    <Box >
                        {pages.map(page => <Button key={page.name} color='inherit' component={RouterLink} to={page.route}>{page.name}</Button>)}
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
