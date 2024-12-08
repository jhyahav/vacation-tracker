import type { FC } from "react"
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  cardHeaderClasses,
  IconButton,
  Skeleton,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import CloseIcon from "@mui/icons-material/Close"

import { useCityData } from "../../hooks/useCityData"
import { SkylinePhoto } from "./SkylinePhoto"
import { WeatherWidget } from "./WeatherWidget"
import { ClockWidget } from "./ClockWidget"
import { useDashboard } from "../../global-state/DashboardContext"

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  borderRadius: theme.shape.borderRadius * 2,
  minHeight: 482,
}))

const StyledCardHeader = styled(CardHeader)({
  [` .${cardHeaderClasses.content}`]: {
    marginLeft: 40,
  },
})

const StyledWeatherTime = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
})

type Props = { cityName: string; notes?: string }

export const Destination: FC<Props> = ({ cityName, notes }) => {
  const {
    conditions,
    countryName,
    getTime,
    isLoading,
    isError,
    name,
    temp,
    weatherDescription,
    weatherIcon,
  } = useCityData(cityName)

  const { deleteDestination } = useDashboard()

  const handleDelete = () => deleteDestination({ cityName })

  if (isError) {
    console.error(`Error fetching data for ${cityName}.`)
    handleDelete()
    // TODO: add toast notification
  }

  return (
    <StyledCard sx={{ maxWidth: 345 }} variant="outlined">
      <StyledCardHeader
        action={
          <IconButton aria-label="delete" onClick={handleDelete}>
            <CloseIcon />
          </IconButton>
        }
        subheader={countryName ?? <Skeleton animation="wave" />}
        title={name ?? <Skeleton animation="wave" />}
      />

      <SkylinePhoto cityName={name} />
      {name ? (
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
          {notes}
        </CardContent>
      ) : null}
    </StyledCard>
  )
}
