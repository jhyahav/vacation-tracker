import type { FC } from "react"

import { Box, CardContent } from "@mui/material"
import { styled } from "@mui/material/styles"

import { ClockWidget } from "./ClockWidget"
import { WeatherWidget } from "./WeatherWidget"

const StyledWeatherTime = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
})

type Props = {
  conditions: string | undefined
  getTime: () => Date
  isLoading: boolean
  name: string | undefined
  temp: number | undefined
  weatherDescription: string | undefined
  weatherIcon: string | undefined
}

export const DestinationCardContent: FC<Props> = ({
  conditions,
  getTime,
  isLoading,
  name,
  temp,
  weatherDescription,
  weatherIcon,
}) => {
  return name ? (
    <CardContent>
      <StyledWeatherTime>
        <WeatherWidget
          conditions={conditions}
          description={weatherDescription}
          icon={weatherIcon}
          isLoading={isLoading}
          temp={temp}
        />
        <ClockWidget getTime={getTime} />
      </StyledWeatherTime>
    </CardContent>
  ) : null
}
