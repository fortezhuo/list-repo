import { useUser } from "hooks/useUser"
import { TitleProps, InfoProps } from "./type"
import { Info } from "./info"
import { ExternalLink } from "lucide-react"

const fields: InfoProps["name"][] = ["location", "public_repos"]

export function Title({ login, avatar_url, html_url }: TitleProps) {
  const { isLoading, data } = useUser(login)

  return (
    <div className="flex flex-row space-x-4">
      <img src={avatar_url} className="w-10 h-10 rounded-full" />
      <div className="flex flex-col">
        <div className="flex flex-row items-center flex-1">
          <span className="mr-2">{login}</span>
          <a href={html_url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
        <div className="flex flex-row mt-1 space-x-4">
          {fields.map((name) => (
            <Info {...{ key: name, name, data, isLoading }} />
          ))}
        </div>
      </div>
    </div>
  )
}
