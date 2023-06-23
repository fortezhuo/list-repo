import { services } from "services"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useGlobal } from "./useGlobal"
import { useEffect, useMemo } from "react"
import { useErrorHandler } from "./useErrorHandler"

export function useListRepository(login: string, url: string) {
  const { state } = useGlobal()
  const { setError } = useErrorHandler()

  const isOpen = useMemo(
    () => state.selected === login,
    [state.selected, login]
  )

  const { isError, error, ...rest } = useInfiniteQuery(
    ["repository", url, isOpen],
    async ({ pageParam = 1 }) => {
      return !isOpen ? [] : await services.getListRepository(url, pageParam)
    },
    {
      getNextPageParam: (lastPage: any, allPages) => {
        const nextPage = allPages.length + 1
        return (lastPage?.data || []).length !== 0 ? nextPage : undefined
      },
    }
  )

  useEffect(() => {
    if (isError) {
      setError(error)
    }
  }, [isError, error, setError])

  return rest
}
