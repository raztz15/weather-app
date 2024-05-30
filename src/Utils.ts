export type Suggestion = {
    AdministrativeArea: {
        ID: string
        LocalizedName: string
    }
    Country: {
        ID: string
        LocalizedName: string
    }
    Key: string
    LocalizedName: string
    Rank: number
    Type: string
    Version: number
}

export type Weather = {
    EpochTime: number
    HasPrecipitation: boolean
    IsDayTime: boolean
    Link: string
    LocalObservationDateTime: string
    MobileLink: string
    PrecipitationType: null
    Temperature: {
        Imperial: {
            Unit: string
            UnitType: number
            Value: number
        },
        Metric: {
            Unit: string
            UnitType: number
            Value: number
        }
    }
    WeatherIcon: number
    WeatherText: string
}

export interface IFiveDayForecast {
    DailyForecasts: Forecast[]
    Headline: {
        Category: string
        EffectiveDate: string
        EffectiveEpochDate: number
        EndDate: string
        EndEpochDate: number
        Link: string
        MobileLink: string
        Severity: number
        Text: string
    }
}

export type Forecast = {
    Date: string
    Day: {
        HasPrecipitation: boolean
        Icon: number
        IconPhrase: string
    }
    EpochDate: number
    Link: string
    MobileLink: string
    Night: {
        HasPrecipitation: boolean
        Icon: number
        IconPhrase: string
    }
    Sources: string[]
    Temperature: {
        Maximum: {
            Unit: string
            UnitType: number
            Value: number
        },
        Minimum: {
            Unit: string
            UnitType: number
            Value: number
        }
    }
}