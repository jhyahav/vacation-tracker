import type { EmailToDashboardData } from "../../types"
import type { DashboardAction } from "./dashboardActions"
import { DashboardActions } from "./dashboardActions"

export const dashboardReducer = (
  state: EmailToDashboardData,
  action: DashboardAction
) => {
  const { email, cityName, notes } = action.payload
  const userDestinations = state[action.payload.email] ?? []

  switch (action.type) {
    case DashboardActions.CREATE_DESTINATION:
      // expects city names to be unique (also enforced by UI)
      if (userDestinations.some((dest) => dest.cityName === cityName)) {
        return state
      }
      return { ...state, [email]: [...userDestinations, { cityName }] }

    case DashboardActions.UPDATE_DESTINATION:
      return {
        ...state,
        [email]: userDestinations.map((dest) =>
          dest.cityName === cityName ? { cityName, notes } : dest
        ),
      }

    case DashboardActions.DELETE_DESTINATION:
      return {
        ...state,
        [email]: userDestinations.filter((dest) => dest.cityName !== cityName),
      }
    default:
      return state
  }
}
