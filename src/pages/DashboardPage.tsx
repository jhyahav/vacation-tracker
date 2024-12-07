import { Destination } from "../components/Destination"

export const DashboardPage = () => {
  return (
    <>
      {/* TODO: improve error handling */}
      {/* <Destination cityName="thiscitydoesntexit" /> */}
      <Destination cityName="Rome,US" />
      <Destination cityName="Damascus" />
      <Destination cityName="Miami" />
      <Destination cityName="Jerusalem" />
    </>
  )
}
