import {
  createContext,
  useEffect,
  createElement,
  Component,
  type PropsWithRef,
  type PropsWithChildren,
} from "react"
import { ToastAction } from "components/ui/toast"
import { useToast } from "components/ui/use-toast"

type ErrorToastProps = {
  error: any
  reset: () => void
}
type ErrorState = { didCatch: boolean; error: any }
type ErrorContextType = {
  didCatch: boolean
  error: any
  setError: (error: any) => void
  reset: () => void
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined)
const initialState: ErrorState = {
  didCatch: false,
  error: null,
}

function ErrorToast({ error, reset }: ErrorToastProps) {
  const { toast } = useToast()
  useEffect(() => {
    void (async () => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `${error.message}`,
        action: <ToastAction altText="">OK</ToastAction>,
      })
    })()
  }, [error, toast, reset])

  return <></>
}

export class ErrorHandler extends Component<
  PropsWithRef<PropsWithChildren<any>>,
  ErrorState
> {
  state = initialState

  static getDerivedStateFromError(error: Error) {
    return { didCatch: true, error }
  }

  setError = (error: any) => {
    this.setState(() => ({ error, didCatch: true }))
  }

  reset = () => {
    const { error } = this.state
    if (error !== null) {
      this.setState(initialState)
    }
  }

  componentDidUpdate(_: any, prevState: ErrorState) {
    const { didCatch } = this.state

    if (didCatch && prevState.error !== null) {
      this.setState(initialState)
    }
  }

  render() {
    const { didCatch, error } = this.state

    let errorToast
    const children = this.props.children

    if (didCatch) {
      errorToast = createElement(ErrorToast, {
        error,
        reset: this.reset,
      })
    }
    return (
      <ErrorContext.Provider
        value={{
          didCatch,
          error,
          setError: this.setError,
          reset: this.reset,
        }}
      >
        {children}
        {errorToast}
      </ErrorContext.Provider>
    )
  }
}

export { ErrorContext }
