import { Skeleton } from "components/ui/skeleton"

function Loader() {
  return (
    <div className="flex flex-row w-full h-24 p-4 border rounded-md">
      <Skeleton isLoading className="w-10 h-10 mr-4 rounded-full" />
      <div className="flex flex-col space-y-2">
        <Skeleton isLoading className="w-56 h-4 rounded-md" />
        <div className="flex flex-row space-x-2">
          <Skeleton isLoading className="w-20 h-4 rounded-md" />
          <Skeleton isLoading className="w-20 h-4 rounded-md" />
        </div>
      </div>
    </div>
  )
}

export function LoaderMain() {
  return (
    <div className="flex flex-col w-full m-4 space-y-2">
      {[...Array(5)].map((_, i) => (
        <Loader key={`main_${i}`} />
      ))}
    </div>
  )
}
