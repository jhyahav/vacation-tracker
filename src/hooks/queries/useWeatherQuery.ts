import { useQuery } from "@tanstack/react-query"
import type { WeatherResponse, WeatherUnits } from "../../types"

type Params = { cityName: string; units?: WeatherUnits }

const WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY

const fetchWeather = async ({
  cityName,
  units = "metric",
}: Params): Promise<WeatherResponse> => {
  const response = await fetch(
    `${WEATHER_BASE_URL}?q=${cityName}&units=${units}&appid=${API_KEY}`
  )

  if (response.status === 404) {
    throw new Error("City not found. Please try again with a valid city name.")
  }

  if (!response.ok) {
    throw new Error("Failed to fetch weather data")
  }
  return response.json() as Promise<WeatherResponse>
}

export const useWeather = (query: string) => {
  return useQuery({
    queryKey: ["weather", query],
    queryFn: () => fetchWeather({ cityName: query }),
    staleTime: 60 * 5 * 1000,
  })
}
