import type { FC } from "react"
import { SkylinePhoto } from "./SkylinePhoto"
import { useWeatherQuery } from "../hooks/queries/useWeatherQuery"
import { WeatherWidget } from "./WeatherWidget"

type Props = { cityName: string }

export const Destination: FC<Props> = ({ cityName }) => {
  const { data, isLoading } = useWeatherQuery(cityName)

  const {
    main: { temp } = {},
    weather: [{ main: conditions, description, icon }] = [{}],
    sys: { country: countryCode } = {},
    name,
  } = data ?? {}

  const regionNames = new Intl.DisplayNames(["en"], { type: "region" })
  const countryName = countryCode ? regionNames.of(countryCode) : undefined

  return (
    <div>
      {!isLoading ? (
        <h1>
          {name}, {countryName}
        </h1>
      ) : null}

      <SkylinePhoto cityName={cityName} />
      <WeatherWidget
        conditions={conditions}
        description={description}
        icon={icon}
        isLoading={isLoading}
        temp={temp}
      />
    </div>
  )
}
