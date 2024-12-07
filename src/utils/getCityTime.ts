export const getCityTime = (openWeatherTimezone: number | undefined = 0) => {
  const x = new Date()
  const localTime =
    x.getTime() + x.getTimezoneOffset() * 60 * 1000 + openWeatherTimezone * 1000

  return new Date(localTime)
}
