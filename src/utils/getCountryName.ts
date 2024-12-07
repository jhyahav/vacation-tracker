export const getCountryName = (countryCode: string | undefined) => {
  const regionNames = new Intl.DisplayNames(["en"], { type: "region" })
  const countryName = countryCode ? regionNames.of(countryCode) : undefined

  return countryName
}
