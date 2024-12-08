import type { ChangeEventHandler, KeyboardEvent } from "react"
import { useState } from "react"

import { Box, Button, TextField } from "@mui/material"
import { styled } from "@mui/material/styles"

import { useDashboard } from "../../global-state/DashboardContext"
import { sanitizeCityName } from "../../utils/sanitizeCityName"
import { LogOutButton } from "../auth/LogOutButton"

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  width: "100%",
}))

const AddCityContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}))

const DashboardHeader = () => {
  const { createDestination, readDestinations } = useDashboard()
  const [cityName, setCityName] = useState("")

  const existingDestinations = readDestinations().map((dest) => dest.cityName)

  const handleAddDestination = () => {
    const processedCityName = sanitizeCityName(cityName)
    // TODO: toast notification or alert if city already exists
    const isDuplicateCity = existingDestinations.includes(processedCityName)

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
    <HeaderContainer>
      <AddCityContainer>
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
          Add City
        </Button>
      </AddCityContainer>
      <LogOutButton />
    </HeaderContainer>
  )
}

export default DashboardHeader
