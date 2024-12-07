import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "./App.css"
import { AuthProvider } from "./global-state/AuthContext"
import { AppPageContent } from "./AppContent"
import { createTheme, ThemeProvider } from "@mui/material"

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
        <QueryClientProvider client={queryClient}>
          <AppPageContent />
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
