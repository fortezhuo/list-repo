import { Icons } from "components/ui/icons"
import { Skeleton } from "components/ui/skeleton"
import { useMemo } from "react"
import { InfoProps } from "./type"

export function Info({ name, data, isLoading }: InfoProps) {
  const Icon = useMemo(() => Icons[name], [name])
  const value = useMemo(() => (data ? data[name] : null), [data, name])
  return (
    <Skeleton isLoading={isLoading} className="w-10 h-4 md:w-20">
      {value && (
        <span className="flex flex-row items-center text-sm">
          <Icon className="w-4 h-4 mr-1" />
          <span>{value}</span>
          <span className="hidden ml-1 md:inline-block">
            {name === "public_repos" && "repo(s)"}
          </span>
        </span>
      )}
    </Skeleton>
  )
}
