import type { FC } from "react"
import { SkylinePhoto } from "./SkylinePhoto"
import { WeatherWidget } from "./WeatherWidget"
import { useCityData } from "../../hooks/useCityData"
import { Skeleton } from "@mui/material"
import { ClockWidget } from "./ClockWidget"

type Props = { cityName: string }

export const Destination: FC<Props> = ({ cityName }) => {
  const {
    conditions,
    countryName,
    getTime,
    isLoading,
    name,
    temp,
    weatherDescription,
    weatherIcon,
  } = useCityData(cityName)

  return (
    <div>
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          <h1>
            {name}, {countryName}
          </h1>

          {name ? <SkylinePhoto cityName={name} /> : null}
          <WeatherWidget
            conditions={conditions}
            description={weatherDescription}
            icon={weatherIcon}
            isLoading={isLoading}
            temp={temp}
          />
          <ClockWidget getTime={getTime} />
        </>
      )}
    </div>
  )
}
