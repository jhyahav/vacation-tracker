import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Bounce, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { createTheme, ThemeProvider } from "@mui/material"

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
            <ToastContainer
              closeOnClick
              draggable
              pauseOnFocusLoss
              pauseOnHover
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              position="top-right"
              rtl={false}
              theme="dark"
              transition={Bounce}
            />
          </QueryClientProvider>
        </DashboardProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
