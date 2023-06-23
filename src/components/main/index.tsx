import { Accordion } from "components/ui/accordion"
import { useListUser } from "hooks/useListUser"
import { useMemo } from "react"
import { User, UserProps } from "../user"
import { useGlobal } from "hooks/useGlobal"
import { LoaderMain } from "../loader/main"
import { OctoCat } from "components/loader/octocat"

export function Main() {
  const { isLoading, data } = useListUser()
  const { set, state } = useGlobal()
  const items = useMemo(() => {
    return data?.items || []
  }, [data?.items])

  return state.search === "" ? (
    <OctoCat />
  ) : isLoading ? (
    <LoaderMain />
  ) : (
    <div className="p-4">
      <Accordion
        type="single"
        collapsible
        className="w-full space-y-2"
        onValueChange={(value) => {
          set("selected", value)
        }}
      >
        {items.map((item: UserProps) => {
          return <User {...item} key={item.id} />
        })}
      </Accordion>
    </div>
  )
}
