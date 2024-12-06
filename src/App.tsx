import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "./App.css"
import { SkylinePhoto } from "./components/SkylinePhoto"

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div>Placeholder</div>
      <SkylinePhoto cityName="Tokyo" />
    </QueryClientProvider>
  )
}

export default App
