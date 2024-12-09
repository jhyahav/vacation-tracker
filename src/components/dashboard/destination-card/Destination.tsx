import type { FC } from "react"
import { toast } from "react-toastify"

import { Card } from "@mui/material"
import { styled } from "@mui/material/styles"

import { DestinationCardContent } from "./DestinationCardContent"
import { DestinationCardHeader } from "./DestinationCardHeader"
import { SkylinePhoto } from "./widgets/SkylinePhoto"
import { useCityData } from "../../../hooks/useCityData"
import { useDashboard } from "../../../global-state/DashboardContext"

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  borderRadius: theme.shape.borderRadius * 2,
  minHeight: 482,
}))

type Props = { cityName: string }

export const Destination: FC<Props> = ({ cityName }) => {
  const {
    conditions,
    countryName,
    getTime,
    isLoading,
    isError,
    error,
    name,
    temp,
    weatherDescription,
    weatherIcon,
  } = useCityData(cityName)

  const { deleteDestination } = useDashboard()

  const handleDelete = () => deleteDestination({ cityName })

  if (isError) {
    toast.error(`${cityName}: ${error?.message}`, {
      toastId: `${error?.message}-${cityName}`,
    })
    handleDelete()
  }

  return (
    <StyledCard sx={{ width: 345 }} variant="outlined">
      <DestinationCardHeader
        countryName={countryName}
        handleDelete={handleDelete}
        name={name}
      />
      <SkylinePhoto cityName={name} />
      <DestinationCardContent
        conditions={conditions}
        getTime={getTime}
        isLoading={isLoading}
        name={name}
        temp={temp}
        weatherDescription={weatherDescription}
        weatherIcon={weatherIcon}
      />
    </StyledCard>
  )
}
