export const sanitizeCityName = (name: string): string =>
  name
    .trim()
    .replace(/[^a-zA-Z ]+| {2,}/g, "")
    .toLowerCase()
