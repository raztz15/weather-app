const API_KEY = process.env.REACT_APP_ACCUWEATHER_API_KEY;
const BASE_URL = 'http://dataservice.accuweather.com';

export const getLocationSuggestions = async (query: string) => {
    try {
        const response = await fetch(`${BASE_URL}/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${query}`);
        console.log(response);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching location suggestions:', error);
        throw error;
    }
};

export const getCurrentWeather = async (locationKey: string) => {
    try {
        const response = await fetch(`${BASE_URL}/currentconditions/v1/${locationKey}?apikey=${API_KEY}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching current weather:', error);
        throw error;
    }
};

export const getFiveDayForecast = async (locationKey: string) => {
    try {
        const response = await fetch(`${BASE_URL}/forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching 5-day forecast:', error);
        throw error;
    }
};