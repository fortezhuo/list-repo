import { Input } from "components/ui/input"
import { useGlobal } from "hooks/useGlobal"
import { Button } from "components/ui/button"
import { Icons } from "../ui/icons"
import { KeyboardEventHandler, useCallback, useRef } from "react"

export function Search() {
  const ref = useRef<HTMLInputElement | null>(null)

  const { set } = useGlobal()

  const onSearch = useCallback(() => {
    const value = ref.current?.value
    set("search", value || "")
  }, [set])

  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (e.key === "Enter") onSearch()
    },
    [onSearch]
  )

  return (
    <div className="relative flex flex-row">
      <Input
        ref={ref}
        type="text"
        placeholder="Search ..."
        className="h-9 md:w-[100px] lg:w-[300px]"
        onKeyDown={onKeyDown}
      />
      <Button
        className="absolute right-0"
        variant="ghost"
        size="sm"
        onClick={onSearch}
      >
        <Icons.search />
      </Button>
    </div>
  )
}
