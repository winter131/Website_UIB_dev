"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import type { Editor } from "@tiptap/react"
import type { TableHandlesState } from "@/components/tiptap-node/table-node/extensions/table-handle"
import { useTiptapEditor } from "@/hooks/use-tiptap-editor"

export interface UseTableHandleStateConfig {
  editor?: Editor | null
  initialState?: TableHandlesState | null
  watchFields?: (keyof TableHandlesState)[]
  onStateChange?: (state: TableHandlesState | null) => void
}

export function useTableHandleState(config: UseTableHandleStateConfig = {}) {
  const {
    editor: providedEditor,
    initialState = null,
    watchFields,
    onStateChange,
  } = config

  const { editor } = useTiptapEditor(providedEditor)
  const [state, setState] = useState<TableHandlesState | null>(initialState)
  const prevStateRef = useRef<TableHandlesState | null>(initialState)

  const updateState = useCallback(
    (newState: TableHandlesState) => {
      if (watchFields && prevStateRef.current) {
        const shouldUpdate = watchFields.some(
          (field) => prevStateRef.current![field] !== newState[field]
        )
        if (!shouldUpdate) return
      }

      setState(newState)
      prevStateRef.current = newState
      onStateChange?.(newState)
    },
    [watchFields, onStateChange]
  )

  useEffect(() => {
    if (!editor) {
      setState(null)
      prevStateRef.current = null
      onStateChange?.(null)
      return
    }

    editor.on("tableHandleState", updateState)

    return () => {
      editor.off("tableHandleState", updateState)
    }
  }, [editor, onStateChange, updateState])

  return state
}