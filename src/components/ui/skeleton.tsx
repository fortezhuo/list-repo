import { cn } from "lib/utils"

function Skeleton({
  className,
  isLoading,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { isLoading?: boolean }) {
  return isLoading ? (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  ) : (
    props.children
  )
}

export { Skeleton }
