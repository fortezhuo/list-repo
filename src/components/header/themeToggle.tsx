import { Button } from "components/ui/button"
import { Icons } from "components/ui/icons"
import { useCallback, useEffect, useState } from "react"
import { useIsClient } from "hooks/useIsClient"

export type Theme = "dark" | "light" | undefined

export function ThemeToggle() {
  const stored = window.localStorage.getItem("theme") as Theme
  const [theme, setTheme] = useState<Theme>(stored || "light")

  const isClient = useIsClient()

  const toggleTheme = useCallback(() => {
    setTheme((prev: Theme) => (prev === "light" ? "dark" : "light"))
  }, [])

  useEffect(() => {
    if (isClient) {
      window.localStorage.setItem("theme", theme || "light")
      const html = document.querySelector("html")
      if (html) {
        if (theme === "dark") {
          html.classList.add("dark")
        } else {
          html.classList.remove("dark")
        }
      }
    }
  }, [isClient, theme])

  return (
    <Button variant="ghost" size="sm" onClick={toggleTheme}>
      <Icons.sun className="transition-all scale-100 rotate-0 dark:-rotate-90 dark:scale-0" />
      <Icons.moon className="absolute transition-all scale-0 rotate-90 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
