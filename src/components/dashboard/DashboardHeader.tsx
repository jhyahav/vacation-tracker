import type { ChangeEventHandler, KeyboardEvent } from "react"
import { useState } from "react"
import { toast } from "react-toastify"

import { Box, Button, TextField } from "@mui/material"
import { styled } from "@mui/material/styles"
import AddIcon from "@mui/icons-material/Add"

import { useDashboard } from "../../global-state/DashboardContext"
import { sanitizeCityName } from "../../utils/sanitizeCityName"
import { LogOutButton } from "../auth/LogOutButton"
import { capitalize } from "../../utils/capitalize"

const StyledHeaderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  width: "100%",
  position: "sticky",
  top: 0,
  zIndex: 10,
}))

const StyledAddCityContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginRight: theme.spacing(4),
}))

const DashboardHeader = () => {
  const { createDestination, readDestinations } = useDashboard()
  const [cityName, setCityName] = useState("")

  const existingDestinations = readDestinations().map((dest) => dest.cityName)

  const handleAddDestination = () => {
    const processedCityName = sanitizeCityName(cityName)
    const isDuplicateCity = existingDestinations.includes(processedCityName)

    if (isDuplicateCity) {
      toast.error(
        `${capitalize(processedCityName)} is already on your dashboard.`
      )
    }

    if (processedCityName && !isDuplicateCity) {
      createDestination({ cityName: processedCityName })
      setCityName("")
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddDestination()
    }
  }

  const handleCityNameChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setCityName(e.target.value)

  return (
    <StyledHeaderContainer>
      <StyledAddCityContainer>
        <TextField
          label="City Name"
          size="small"
          type="search"
          value={cityName}
          variant="outlined"
          onChange={handleCityNameChange}
          onKeyDown={handleKeyDown}
        />
        <Button
          color="primary"
          variant="contained"
          onClick={handleAddDestination}
        >
          <AddIcon />
        </Button>
      </StyledAddCityContainer>
      <LogOutButton />
    </StyledHeaderContainer>
  )
}

export default DashboardHeader
