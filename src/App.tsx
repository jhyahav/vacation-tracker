import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "./App.css"
import { SkylinePhoto } from "./components/SkylinePhoto"
import { AuthProvider } from "./global-state/AuthContext"

const queryClient = new QueryClient()

const App = () => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <div>Placeholder</div>
        <SkylinePhoto cityName="Tokyo" />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
