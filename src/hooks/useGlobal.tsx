import { GlobalContext } from "components/ui/global"
import { useContext } from "react"

export const useGlobal = () => useContext(GlobalContext)
