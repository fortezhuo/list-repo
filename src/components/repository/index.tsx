import { formatNumber } from "lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Circle, Star } from "lucide-react"

export type RepositoryProps = {
  id: string
  name: string
  stargazers_count: number
  description: string
  updated_at: string
  html_url: string
  topics: string[]
}

export function Repository({
  name,
  stargazers_count,
  description,
  updated_at,
  topics,
  html_url,
}: RepositoryProps) {
  return (
    <Card className="flex flex-col col-span-1">
      <CardHeader className="grid grid-cols-6 gap-4">
        <div className="col-span-4 space-y-3 md:col-span-5">
          <a
            href={html_url}
            target="_blank"
            className="hover:underline"
            rel="noopener noreferrer"
          >
            <CardTitle>{name}</CardTitle>
          </a>
          <CardDescription>{description}</CardDescription>
        </div>
        <div className="inline-flex items-center justify-center h-10 col-span-2 p-2 space-x-2 text-sm font-medium rounded-md md:col-span-1 bg-secondary text-secondary-foreground">
          <Star className="w-4 h-4 mr-1" />
          {formatNumber(stargazers_count)}
        </div>
      </CardHeader>
      <CardContent className="flex justify-between space-x-4 text-sm text-muted-foreground">
        <div className="flex items-center">
          {topics.length != 0 && (
            <>
              <Circle className="w-3 h-3 mr-1 fill-sky-400 text-sky-400" />
              {topics[0]}
            </>
          )}
        </div>
        <span>
          Updated :{" "}
          {new Date(updated_at).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      </CardContent>
    </Card>
  )
}
