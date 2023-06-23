import { useEffect } from "react"
import { Theme } from "components/header/themeToggle"

export function useTheme() {
  const isDOM =
    typeof window !== "undefined" &&
    window.document &&
    window.document.documentElement

  useEffect(() => {
    if (isDOM) {
      const html = document.querySelector("html")
      if (html) {
        const defaultTheme = html.classList.contains("dark") ? "dark" : "light"
        const theme = (window.localStorage.getItem("theme") ||
          defaultTheme) as Theme
        if (theme === "dark") {
          html.classList.add("dark")
        } else {
          html.classList.remove("dark")
        }
      }
    }
  }, [isDOM])
}
