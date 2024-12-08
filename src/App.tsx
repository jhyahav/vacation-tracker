import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createTheme, ThemeProvider } from "@mui/material"

import "./App.css"
import { AuthProvider } from "./global-state/AuthContext"
import { DashboardProvider } from "./global-state/DashboardContext"
import { AppContent } from "./AppContent"

const queryClient = new QueryClient()

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
})

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <AuthProvider>
        <DashboardProvider>
          <QueryClientProvider client={queryClient}>
            <AppContent />
          </QueryClientProvider>
        </DashboardProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
