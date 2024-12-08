import type { EmailToDashboardData } from "../types"

export const saveToLocalStorage = (
  key: string,
  value: EmailToDashboardData
) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getFromLocalStorage = (key: string) => {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : null
}
