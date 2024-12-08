import type { FC } from "react"
import { IconButton, Skeleton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

import { useCityData } from "../../hooks/useCityData"
import { SkylinePhoto } from "./SkylinePhoto"
import { WeatherWidget } from "./WeatherWidget"
import { ClockWidget } from "./ClockWidget"
import { useDashboard } from "../../global-state/DashboardContext"

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
    <div>
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          <IconButton onClick={handleDelete}>
            <CloseIcon />
          </IconButton>
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
          {notes}
        </>
      )}
    </div>
  )
}
