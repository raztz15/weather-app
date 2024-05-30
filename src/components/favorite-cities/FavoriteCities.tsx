import { useEffect, useState } from 'react'
import { FAVE_CITIES_LOCAL_STORAGE } from '../../constants/memory'
import { Box, Button, CircularProgress, Container, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { getCurrentWeather, getFiveDayForecast } from '../../api';
import { IFiveDayForecast, Suggestion, Weather } from '../../Utils';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightlightIcon from '@mui/icons-material/Nightlight';

export const FavoriteCities = () => {

    const [faveCities, setFaveCities] = useState<Suggestion[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const [currentWeather, setCurrentCityWeather] = useState<Weather[] | null>(null)
    const [fiveDaysForecast, setFiveDaysForecast] = useState<IFiveDayForecast | null>(null)

    useEffect(() => {
        const faveCitiesStorage = localStorage.getItem(FAVE_CITIES_LOCAL_STORAGE)
        if (faveCitiesStorage) {
            setFaveCities(JSON.parse(faveCitiesStorage))
            setLoading(false)
        }

    }, [])

    const handleRemoveCity = (selectedCity: Suggestion) => {
        const updatedFaveCitis = faveCities.filter(city => city.Key !== selectedCity.Key)
        setFaveCities(updatedFaveCitis)
        localStorage.setItem(FAVE_CITIES_LOCAL_STORAGE, JSON.stringify(updatedFaveCitis))
    }

    const handleCityClick = async (city: Suggestion) => {
        try {
            const selectedCityWeather = await getCurrentWeather(city.Key)
            if (selectedCityWeather) {
                setCurrentCityWeather(selectedCityWeather)
                const foreCast = await getFiveDayForecast(city.Key)
                foreCast && setFiveDaysForecast(foreCast)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Container sx={{ minWidth: "100%", p: 2 }}>
            <Typography sx={{ textAlign: "center" }} variant='h3'>Favorite Cities</Typography>
            <Box sx={{ display: "flex", gap: 20 }}>
                <Box sx={{ p: 2, my: 2, pl: 0 }}>
                    {
                        loading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <Paper sx={{ p: 2, mt: 2, width: "400px", backgroundColor: '#f5f5f5' }}>
                                {faveCities.length === 0 ? (
                                    <Typography variant="body1" sx={{ textAlign: 'center' }}>No favorite cities added yet.</Typography>
                                ) : (
                                    <List sx={{ display: "flex", flexDirection: "column" }}>
                                        {faveCities.map((city, index) => (
                                            <ListItem onClick={() => handleCityClick(city)} key={index} sx={{ display: "felx", justifyContent: "space-between" }}>
                                                <Typography sx={{ cursor: "pointer" }} variant="body1">{city.LocalizedName}</Typography>
                                                <Button color="secondary"
                                                    onClick={() => handleRemoveCity(city)}
                                                >Remove</Button>
                                            </ListItem>
                                        ))}
                                    </List>
                                )}
                            </Paper>
                        )
                    }
                </Box >
                <Box sx={{ p: 2, my: 2 }}>

                    {currentWeather &&
                        <Paper sx={{ p: 2, my: 2, backgroundColor: '#f5f9f9' }}>
                            <Typography variant='h6'>Current Weather</Typography>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <Typography>{currentWeather[0].IsDayTime ? <WbSunnyIcon style={{ color: "#DAA520    ", fontSize: 40 }} /> : <NightlightIcon />}</Typography>
                                <Typography>{currentWeather[0].WeatherText}</Typography>
                            </Box>
                            <Typography >Temperature: {`${currentWeather[0].Temperature.Metric.Value}` + ` °${currentWeather[0].Temperature.Metric.Unit}`} </Typography>
                        </Paper >
                    }
                    {fiveDaysForecast &&
                        <Paper sx={{ p: 2, my: 2 }}>
                            <Typography variant='h6'>
                                5-Day Forecast
                            </Typography>
                            <List>
                                {fiveDaysForecast.DailyForecasts.map(day =>
                                    <ListItem key={day.Date}>
                                        <ListItemText
                                            primary={`${new Date(day.Date).toDateString()}: ${day.Day.IconPhrase}`}
                                            secondary={`Min: ${day.Temperature.Minimum.Value} °${day.Temperature.Minimum.Unit}, 
                                        Max: ${day.Temperature.Maximum.Value} °${day.Temperature.Maximum.Unit}`}
                                        />

                                    </ListItem>
                                )}
                            </List>
                        </Paper>
                    }
                </Box>
            </Box>
        </Container>
    )
}


