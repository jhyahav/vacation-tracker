import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { Destination } from "../components/dashboard/Destination"
import { useAuth } from "../global-state/AuthContext"
import { LogOutButton } from "../components/auth/LogOutButton"

export const DashboardPage = () => {
  const navigate = useNavigate()

  const { user } = useAuth()

  useEffect(() => {
    if (!user) navigate("/login")
  }, [navigate, user])

  return user ? (
    <>
      <LogOutButton />
      {/* TODO: improve error handling */}
      {/* <Destination cityName="thiscitydoesntexit" /> */}
      <Destination cityName="Rome,US" />
      <Destination cityName="Damascus" />
      <Destination cityName="Miami" />
      <Destination cityName="Jerusalem" />
    </>
  ) : null
}
