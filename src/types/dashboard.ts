export type DestinationData = {
  cityName: string
  notes?: string
}

export type EmailToDashboardData = { [key: string]: DestinationData[] }

export type DashboardFunctionParams = {
  cityName: string
  notes?: string
}

export type DashboardFunction = (params: DashboardFunctionParams) => void
