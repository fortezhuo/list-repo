import { ReactNode, createContext, useCallback, useReducer } from "react"

type State = {
  search: string
  selected: string
}

type StateKey = keyof State
type Value = string

type GlobalProps = {
  state: State
  set: (name: StateKey, value: Value) => void
  clear: (name: StateKey) => void
}

type ActionType = keyof Omit<GlobalProps, "state">

type Action = {
  type: ActionType
  name: StateKey
  value: Value
}

const initialState: State = { search: "", selected: "" }

export const GlobalContext = createContext<GlobalProps>({
  state: initialState,
  set: (name: StateKey, value: Value) => {
    if (!name && !value) throw new Error("Please provide name and value")
  },
  clear: (name: StateKey) => {
    if (!name) throw new Error("Please provide name and value")
  },
})

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "set": {
      return {
        ...state,
        [action.name]: action.value,
      }
    }

    case "clear": {
      return {
        ...state,
        [action.name]: initialState[action.name],
      }
    }

    default:
      return state
  }
}

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const set = useCallback(
    (name: StateKey, value: Value) => {
      dispatch({
        type: "set",
        name,
        value,
      })
    },
    [dispatch]
  )

  const clear = useCallback(
    (name: StateKey) => {
      return dispatch({
        type: "clear",
        value: "",
        name,
      })
    },
    [dispatch]
  )

  return (
    <GlobalContext.Provider value={{ state, set, clear }}>
      {children}
    </GlobalContext.Provider>
  )
}
