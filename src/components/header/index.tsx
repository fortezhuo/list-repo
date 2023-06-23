import { ThemeToggle } from "./themeToggle"
import { Search } from "./search"

export function Header() {
  const url = import.meta.env.VITE_PATH

  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background">
      <div className="flex items-center h-16 px-4 space-x-4 md:px-6 sm:justify-between sm:space-x-0">
        <a href={url} className="flex items-center space-x-2">
          <span className="inline-block font-bold">List Repository</span>
        </a>

        <div className="flex items-center justify-end flex-1 space-x-1">
          <Search />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
