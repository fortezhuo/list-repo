import { Skeleton } from "components/ui/skeleton"

function Loader() {
  return (
    <div className="flex flex-col col-span-1 p-4 space-y-4 border rounded">
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-4 space-y-3 md:col-span-5">
          <Skeleton isLoading className="w-2/4 h-4" />
          <Skeleton isLoading className="w-full h-20" />
        </div>
        <Skeleton
          isLoading
          className="h-10 col-span-2 rounded-md md:col-span-1"
        />
      </div>

      <div className="flex justify-between">
        <Skeleton isLoading className="w-1/4 h-4 rounded-md" />
        <Skeleton isLoading className="w-1/4 h-4 rounded-md" />
      </div>
    </div>
  )
}

export function LoaderRepository() {
  return [...Array(2)].map((_, i) => <Loader key={`repo_${i}`} />)
}
