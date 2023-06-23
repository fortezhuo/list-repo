import { Header } from "components/header"
import { Main } from "components/main"
import { GlobalProvider } from "components/ui/global"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ErrorHandler } from "components/ui/error"
import { Toaster } from "components/ui/toaster"

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorHandler>
        <GlobalProvider>
          <Header />
          <Main />
          <Toaster />
        </GlobalProvider>
      </ErrorHandler>
    </QueryClientProvider>
  )
}
