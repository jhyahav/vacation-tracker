import { Destination } from "../components/dashboard/Destination"
import { useAuth } from "../global-state/AuthContext"
import { LogOutButton } from "../components/auth/LogOutButton"

export const DashboardPage = () => {
  const { user } = useAuth()

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
