import type { DashboardFunctionParams } from "../../types"

export const DashboardActions = {
  CREATE_DESTINATION: "CREATE",
  UPDATE_DESTINATION: "UPDATE",
  DELETE_DESTINATION: "DELETE",
} as const

type DashboardActionType =
  (typeof DashboardActions)[keyof typeof DashboardActions]

export type DashboardAction = {
  type: DashboardActionType
  payload: DashboardFunctionParams
}
