import { services } from "services"
import { useQuery } from "@tanstack/react-query"
import { useGlobal } from "./useGlobal"
import { useEffect } from "react"
import { useErrorHandler } from "./useErrorHandler"

export function useListUser() {
  const { state } = useGlobal()
  const { setError } = useErrorHandler()

  const { isError, error, ...rest } = useQuery(
    ["listUser", state.search],
    async () => {
      if (state.search === "") return []

      const res = await services.getListUser(state.search)
      return res.data
    }
  )

  useEffect(() => {
    if (isError) {
      setError(error)
    }
  }, [isError, error, setError])

  return rest
}
