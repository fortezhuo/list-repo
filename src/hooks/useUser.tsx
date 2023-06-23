import { services } from "services"
import { useQuery } from "@tanstack/react-query"
import { useErrorHandler } from "./useErrorHandler"
import { useEffect } from "react"

export function useUser(name: string) {
  const { setError } = useErrorHandler()

  const { isError, error, ...rest } = useQuery(["user", name], async () => {
    const res = await services.getUserInfo(name)
    return res.data
  })

  useEffect(() => {
    if (error || isError) {
      setError(error)
    }
  }, [error, isError, setError])

  return rest
}
