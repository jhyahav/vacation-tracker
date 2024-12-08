export type DestinationData = {
  cityName: string
  notes?: string
}

export type DashboardData = DestinationData[]

export type EmailToDashboardData = { [key: string]: DashboardData }

export type DashboardFunctionParams = {
  cityName: string
  notes?: string
}

export type DashboardFunction = (params: DashboardFunctionParams) => void
