import { useEffect, useMemo } from "react"

import { Box } from "@mui/material"
import { styled } from "@mui/material/styles"

import { useDashboard } from "../../global-state/DashboardContext"
import { useAuth } from "../../global-state/AuthContext"
import { Destination } from "./destination-card/Destination"
import { EmptyDashboard } from "./EmptyDashboard"

const StyledDashboardContainer = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "1rem",
  margin: "1rem",
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

  const destinations = useMemo(
    () => [...readDestinations()].reverse(),
    [readDestinations]
  )

  return destinations.length ? (
    <StyledDashboardContainer>
      {destinations.map((dest) => (
        <Destination key={dest.cityName} cityName={dest.cityName} />
      ))}
    </StyledDashboardContainer>
  ) : (
    <EmptyDashboard />
  )
}
