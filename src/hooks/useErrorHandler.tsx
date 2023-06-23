import { ErrorContext } from "components/ui/error"
import { useContext } from "react"

export function useErrorHandler(givenError?: unknown) {
  if (givenError != null) throw givenError
  const { setError } = useContext(ErrorContext) || {
    setError: (error: any) => {
      console.log(error)
      throw new Error("setError is not defined")
    },
  }
  return { setError }
}
