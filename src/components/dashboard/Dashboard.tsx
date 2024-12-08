import { useEffect, useMemo } from "react"

import { Box, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

import { useDashboard } from "../../global-state/DashboardContext"
import { useAuth } from "../../global-state/AuthContext"

import { Destination } from "./Destination"

const StyledEmptyDashboardBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  padding: "1rem",
  height: "80vh",
})

export const Dashboard = () => {
  const { user } = useAuth()
  const { email, updateEmail, readDestinations } = useDashboard()

  // handle refresh, cases where email is not immediately available
  useEffect(() => {
    if (user && !email) {
      updateEmail(user.email)
    }
  }, [email, updateEmail, user])

  const destinations = useMemo(() => readDestinations(), [readDestinations])

  return destinations.length ? (
    destinations.map((dest) => (
      <Destination
        key={dest.cityName}
        cityName={dest.cityName}
        notes={dest.notes}
      />
    ))
  ) : (
    <StyledEmptyDashboardBox>
      <Typography variant="h3">Add your first destination above!</Typography>
    </StyledEmptyDashboardBox>
  )
}
