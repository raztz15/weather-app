import { Autocomplete, Box, Button, Container, IconButton, List, ListItem, ListItemText, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { IFiveDayForecast, Suggestion, Weather } from '../../Utils'
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightlightIcon from '@mui/icons-material/Nightlight';
import { Star, StarBorder } from '@mui/icons-material'
import { FAVE_CITIES_LOCAL_STORAGE } from '../../constants/memory'
import { getSuggestedQuery } from '@testing-library/react'
import { getCurrentWeather, getFiveDayForecast, getLocationSuggestions } from '../../api'

export const ForecastPage = () => {

    const [query, setQuery] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [locationSuggestions, setLocationSuggestions] = useState<Suggestion[]>([])
    const [currentWeather, setCurrentWeather] = useState<Weather[] | null>(null)
    const [fiveDaysForecast, setFiveDaysForecast] = useState<IFiveDayForecast | null>(null)
    const [favoriteCities, setFavoriteCities] = useState<Suggestion[]>(() => {
        const saved = localStorage.getItem(FAVE_CITIES_LOCAL_STORAGE)
        return saved ? JSON.parse(saved) : []
    })

    useEffect(() => {
        localStorage.setItem(FAVE_CITIES_LOCAL_STORAGE, JSON.stringify(favoriteCities))
    }, [favoriteCities])

    const handleInputChange = async (e: React.ChangeEvent<{}>, value: string) => {
        setQuery(value)
        if (value) {
            try {
                const suggestions = await getLocationSuggestions(value)
                setLocationSuggestions(suggestions)
            } catch (error) {
                setError(error as string)
            }
        } else {
            setLocationSuggestions([])
        }
    }

    const handleSearch = async () => {
        try {
            if (locationSuggestions.length > 0) {
                const locationKey = locationSuggestions[0].Key
                const weather = await getCurrentWeather(locationKey)
                setCurrentWeather(weather)
                const forecast = await getFiveDayForecast(locationKey)
                setFiveDaysForecast(forecast)
            }
        } catch (error) {
            setError(error as string)
        }
    }

    const handleStarClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, selectedCity: Suggestion) => {
        e.stopPropagation()
        console.log(selectedCity);

        const isFaveCity = favoriteCities.some(city => city.Key === selectedCity.Key)

        if (isFaveCity) {
            setFavoriteCities(prevFaveCities => prevFaveCities.filter(city => city.Key !== selectedCity.Key))
        } else {
            setFavoriteCities(prevFaveCities => [...prevFaveCities, selectedCity])
        }
    }

    return (
        <Container>
            <Box sx={{ textAlign: "center", my: 4 }}>
                <Typography variant="h4" sx={{ textAlign: "center", my: 4 }}>
                    Weather App
                </Typography>
                <Autocomplete
                    autoHighlight={true}
                    freeSolo
                    inputValue={query}
                    onInputChange={handleInputChange}
                    options={locationSuggestions}
                    getOptionLabel={(option) => (option as Suggestion).LocalizedName}
                    renderInput={(params) => (
                        <TextField {...params} label="Enter city name" variant="outlined" sx={{ mb: 2 }} />
                    )}
                    renderOption={(props, option) => {
                        return <li {...props} key={option.Key}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                <span>{option.LocalizedName}</span>
                                <IconButton
                                    onClick={(e) => handleStarClick(e, option)}
                                    color={favoriteCities.filter(city => city.Key === option.Key) ? 'primary' : 'default'}>
                                    {favoriteCities.some(city => city.Key === option.Key) ? <Star /> : <StarBorder />}
                                </IconButton>
                            </Box>
                        </li>
                    }}
                />
                <Button variant='contained' onClick={handleSearch}>
                    Search
                </Button>
            </Box>
            {currentWeather &&
                <Paper sx={{ p: 2, my: 2 }}>
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
        </Container >
    )
}

{/* <Container>
    <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h4" gutterBottom>
            Weather App
        </Typography>
        <Autocomplete
            autoHighlight={true}
            freeSolo
            inputValue={query}
            onInputChange={handleInputChange}
            options={locationSuggestions}
            getOptionLabel={(option) => (option as Suggestion).LocalizedName}
            renderInput={(params) => (
                <TextField {...params} label="Enter city name" variant="outlined" sx={{ mb: 2 }} />
            )}
            renderOption={(props, option) => (
                <li {...props}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                        <span>{option.LocalizedName}</span>
                        <IconButton
                            onClick={(e) => toggleFavorite(e, option.LocalizedName)}
                            color={favoriteCities.includes(option.LocalizedName) ? 'primary' : 'default'}
                            edge="end"
                        >
                            {favoriteCities.includes(option.LocalizedName) ? <Star /> : <StarBorder />}
                        </IconButton>
                    </Box>

                </li>
            )}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
        </Button>
    </Box>
    {currentWeather && (
        <Paper sx={{ p: 2, my: 2 }}>
            <Typography variant="h6">Current Weather</Typography>
            <Typography variant="body1">{currentWeather[0].WeatherText}</Typography>
            <Typography variant="body1">
                Temperature: {currentWeather[0].Temperature.Metric.Value} °C
            </Typography>
            <Typography>
                {currentWeather[0].IsDayTime ? <WbSunnyIcon /> : <NightlightIcon />}
            </Typography>
        </Paper>
    )
    }
    {
        fiveDayForecast && (
            <Paper sx={{ p: 2, my: 2 }}>
                <Typography variant="h6">5-Day Forecast</Typography>
                <List>
                    {fiveDayForecast.DailyForecasts.map((day) => (
                        <ListItem key={day.Date}>
                            <ListItemText
                                primary={`${new Date(day.Date).toDateString()}: ${day.Day.IconPhrase}`}
                                secondary={`Min: ${day.Temperature.Minimum.Value} °C, Max: ${day.Temperature.Maximum.Value} °C`}
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        )
    }
    <ForecastPage />
</Container > */}
