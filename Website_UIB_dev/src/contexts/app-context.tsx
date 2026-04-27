"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react"

export type AppContextValue = {
  activeThread: string | null
  setActiveThread: (threadId: string | null) => void

  threadBubbles: Record<string, HTMLElement[]>

  addThreadBubble: (threadIds: string | string[], element: HTMLElement) => void

  removeThreadBubble: (threadIdOrElement: string | HTMLElement) => void
}

export const AppContext = createContext<AppContextValue>({
  activeThread: null,
  setActiveThread: () => {},
  threadBubbles: {},
  addThreadBubble: () => {},
  removeThreadBubble: () => {},
})

export const AppConsumer = AppContext.Consumer

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeThread, setActiveThread] = useState<string | null>(null)
  const [threadBubbles, setThreadBubbles] = useState<
    Record<string, HTMLElement[]>
  >({})
  const threadBubblesRef = useRef(threadBubbles)

  const addThreadBubble = useCallback(
    (threadIds: string | string[], element: HTMLElement) => {
      const ids = Array.isArray(threadIds) ? threadIds : [threadIds]

      ids.forEach((id) => {
        const hasThread = threadBubblesRef.current[id]
        const hasElement = threadBubblesRef.current[id]?.includes(element)

        if (hasThread && hasElement) {
          return
        }

        if (!threadBubblesRef.current[id]) {
          threadBubblesRef.current[id] = [element]
          return
        }

        threadBubblesRef.current[id] = [
          ...threadBubblesRef.current[id],
          element,
        ]
      })
      setThreadBubbles({ ...threadBubblesRef.current })
    },
    []
  )

  const removeThreadBubble = useCallback(
    (threadIdOrElement: string | HTMLElement) => {
      const isElement = typeof threadIdOrElement !== "string"
      const isString = typeof threadIdOrElement === "string"

      if (isString) {
        delete threadBubblesRef.current[threadIdOrElement]
        setThreadBubbles({ ...threadBubblesRef.current })
        return
      }

      if (isElement) {
        const element = threadIdOrElement as HTMLElement

        Object.keys(threadBubblesRef.current).forEach((id) => {
          const threadBubble = threadBubblesRef.current[id]

          if (threadBubble && threadBubble.includes(element)) {
            threadBubblesRef.current[id] = threadBubble.filter(
              (el) => el !== element
            )
          }

          if (
            threadBubblesRef.current[id] &&
            threadBubblesRef.current[id].length === 0
          ) {
            delete threadBubblesRef.current[id]
          }
        })
        setThreadBubbles({ ...threadBubblesRef.current })
        return
      }
    },
    []
  )

  threadBubblesRef.current = threadBubbles

  const providerValue = useMemo(
    () => ({
      activeThread,
      setActiveThread,
      threadBubbles,
      addThreadBubble,
      removeThreadBubble,
    }),
    [
      activeThread,
      setActiveThread,
      threadBubbles,
      addThreadBubble,
      removeThreadBubble,
    ]
  )

  return (
    <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>
  )
}


export const useAppState = (): AppContextValue => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppState must be used within an AppProvider")
  }
  return context
}