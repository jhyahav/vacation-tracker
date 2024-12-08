import { useEffect, useMemo } from "react"

import { useDashboard } from "../../global-state/DashboardContext"
import { useAuth } from "../../global-state/AuthContext"

import { Destination } from "./Destination"

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
    <div>Add your first destination above!</div>
  )
}
