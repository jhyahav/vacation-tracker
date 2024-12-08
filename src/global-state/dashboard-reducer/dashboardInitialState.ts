import type { EmailToDashboardData } from "../../types"
import { getFromLocalStorage } from "../../utils/localStorage"

export const dashboardInitialState: EmailToDashboardData = {}

export const localStorageInitializer = (initial: EmailToDashboardData) => {
  const persisted = getFromLocalStorage(
    "vacation-destinations"
  ) as EmailToDashboardData | null
  return persisted || initial
}
