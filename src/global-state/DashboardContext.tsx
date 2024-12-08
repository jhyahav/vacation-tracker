import type { FC, ReactNode } from "react"
import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  //   useState,
} from "react"

import type { DashboardData, DashboardFunction } from "../types"
import { dashboardReducer } from "./dashboard-reducer/dashboardReducer"
import {
  dashboardInitialState,
  localStorageInitializer,
} from "./dashboard-reducer/dashboardInitialState"
import { DashboardActions } from "./dashboard-reducer/dashboardActions"
import { saveToLocalStorage } from "../utils/localStorage"

type DashboardContextProps = {
  //   updateEmail: (email: string) => void
  createDestination: DashboardFunction
  readDestinations: (email: string) => DashboardData
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

  //   const [email, setEmail] = useState<string | null>(null)

  //   const updateEmail = (newEmail: string) => {
  //     if (newEmail !== email) setEmail(newEmail)
  //   }

  useEffect(() => {
    saveToLocalStorage("vacation-destinations", state)
  }, [state])

  const createDestination: DashboardFunction = (params) =>
    dispatch({ type: DashboardActions.CREATE_DESTINATION, payload: params })

  const readDestinations = (email: string) => state[email] ?? []

  const updateDestination: DashboardFunction = (params) =>
    dispatch({ type: DashboardActions.UPDATE_DESTINATION, payload: params })

  const deleteDestination: DashboardFunction = (params) =>
    dispatch({ type: DashboardActions.DELETE_DESTINATION, payload: params })

  return (
    <DashboardContext.Provider
      value={{
        // updateEmail,
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
