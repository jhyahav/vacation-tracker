import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "./App.css"
import { AuthProvider } from "./global-state/AuthContext"
import { AppPageContent } from "./AppPageContent"

const queryClient = new QueryClient()

const App = () => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <AppPageContent />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
