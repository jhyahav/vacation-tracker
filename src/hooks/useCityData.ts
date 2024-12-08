import { getCityTime } from "../utils/getCityTime"
import { getCountryName } from "../utils/getCountryName"
import { useWeatherQuery } from "./queries/useWeatherQuery"

export const useCityData = (cityName: string) => {
  const { data, isLoading, isError, error } = useWeatherQuery(cityName)

  const {
    main: { temp } = {},
    weather: [
      { main: conditions, description: weatherDescription, icon: weatherIcon },
    ] = [{}],
    sys: { country: countryCode } = {},
    name,
    timezone,
  } = data ?? {}

  const countryName = getCountryName(countryCode)

  const getTime = () => getCityTime(timezone)

  return {
    conditions,
    countryName,
    getTime,
    isError,
    error,
    isLoading,
    name,
    temp,
    weatherDescription,
    weatherIcon,
  }
}
