import type { FC, ReactNode } from "react"
import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react"

import type { DashboardFunction, DestinationData } from "../types"
import { dashboardReducer } from "./dashboard-reducer/dashboardReducer"
import {
  dashboardInitialState,
  localStorageInitializer,
} from "./dashboard-reducer/dashboardInitialState"
import { DashboardActions } from "./dashboard-reducer/dashboardActions"
import { saveToLocalStorage } from "../utils/localStorage"

type DashboardContextProps = {
  email: string | null
  updateEmail: (email: string | null) => void
  createDestination: DashboardFunction
  readDestinations: () => DestinationData[]
  updateDestination: DashboardFunction
  deleteDestination: DashboardFunction
}

const DashboardContext = createContext<DashboardContextProps | undefined>(
  undefined
)

type Props = { children: ReactNode }

export const DashboardProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(
    dashboardReducer,
    dashboardInitialState,
    localStorageInitializer
  )

  const [email, setEmail] = useState<string | null>(null)

  const updateEmail = (newEmail: string | null) => {
    if (newEmail !== email) setEmail(newEmail)
  }

  useEffect(() => {
    saveToLocalStorage("vacation-destinations", state)
  }, [state])

  const createDestination: DashboardFunction = ({ cityName, notes }) =>
    email
      ? dispatch({
          type: DashboardActions.CREATE_DESTINATION,
          payload: { email, cityName, notes },
        })
      : null

  const readDestinations = () => (email ? (state[email] ?? []) : [])

  const updateDestination: DashboardFunction = ({ cityName, notes }) =>
    email
      ? dispatch({
          type: DashboardActions.UPDATE_DESTINATION,
          payload: { email, cityName, notes },
        })
      : null

  const deleteDestination: DashboardFunction = ({ cityName }) =>
    email
      ? dispatch({
          type: DashboardActions.DELETE_DESTINATION,
          payload: { email, cityName },
        })
      : null

  return (
    <DashboardContext.Provider
      value={{
        email,
        updateEmail,
        createDestination,
        readDestinations,
        updateDestination,
        deleteDestination,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

export const useDashboard = (): DashboardContextProps => {
  const context = useContext(DashboardContext)
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider")
  }

  return context
}
