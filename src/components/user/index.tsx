import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "components/ui/accordion"
import { useListRepository } from "hooks/useListRepository"
import { Repository, RepositoryProps } from "../repository"
import { useCallback, useEffect, useRef } from "react"
import { UserProps } from "./type"
import { Title } from "./title"
import { LoaderRepository } from "components/loader/repository"

export type { UserProps } from "./type"

export function User({ login, avatar_url, html_url, repos_url }: UserProps) {
  const observerElem = useRef(null)
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useListRepository(login, repos_url)

  const handleObserver = useCallback(
    (entries: any) => {
      const [target] = entries
      if (target.isIntersecting && hasNextPage) {
        fetchNextPage()
      }
    },
    [fetchNextPage, hasNextPage]
  )

  useEffect(() => {
    const element = observerElem.current
    const option = { threshold: 0 }
    const observer = new IntersectionObserver(handleObserver, option)

    if (element) observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [fetchNextPage, hasNextPage, handleObserver])

  return (
    <AccordionItem value={login} className="border rounded shadow">
      <AccordionTrigger className="px-4 hover:no-underline">
        <Title {...{ avatar_url, html_url, login }} />
      </AccordionTrigger>
      <AccordionContent>
        <div className="grid grid-cols-1 gap-2 p-2 md:grid-cols-2">
          {isLoading ? (
            <LoaderRepository />
          ) : (
            (data?.pages || []).map((page: any) =>
              (page?.data || []).map((item: RepositoryProps) => (
                <Repository {...item} key={item.id} />
              ))
            )
          )}
          {isFetchingNextPage && hasNextPage && <LoaderRepository />}
        </div>
        <div ref={observerElem}></div>
      </AccordionContent>
    </AccordionItem>
  )
}
