"use client"

import { useCallback, useState } from "react"
import type { Editor } from "@tiptap/react"


import { useTiptapEditor } from "@/hooks/use-tiptap-editor"


import { isExtensionAvailable } from "@/lib/tiptap-utils"


import { TableIcon } from "@/components/tiptap-icons/table-icon"

const REQUIRED_EXTENSIONS = ["table"]


export interface UseTableTriggerButtonConfig {
  editor?: Editor | null
  hideWhenUnavailable?: boolean
  maxRows?: number
  maxCols?: number
  onInserted?: (rows: number, cols: number) => void
}


export function canInsertTable(editor: Editor | null): boolean {
  if (!editor || !editor.isEditable) return false
  return isExtensionAvailable(editor, REQUIRED_EXTENSIONS)
}


export function insertTable(
  editor: Editor | null,
  rows: number,
  cols: number
): boolean {
  if (!editor || !canInsertTable(editor)) return false

  try {
    return editor
      .chain()
      .focus()
      .insertTable({
        rows,
        cols,
        withHeaderRow: false,
      })
      .run()
  } catch (error) {
    console.error("Error inserting table:", error)
    return false
  }
}


export function shouldShowButton(
  editor: Editor | null,
  hideWhenUnavailable: boolean
): boolean {
  if (!editor || !editor.isEditable) return false

  const hasExtension = isExtensionAvailable(editor, REQUIRED_EXTENSIONS)
  if (!hasExtension) return false

  return !hideWhenUnavailable || canInsertTable(editor)
}


export function useTableTriggerButton(config?: UseTableTriggerButtonConfig) {
  const {
    editor: providedEditor,
    hideWhenUnavailable = false,
    onInserted,
  } = config || {}

  const { editor } = useTiptapEditor(providedEditor)
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredCell, setHoveredCell] = useState<{
    row: number
    col: number
  } | null>(null)

  const isVisible = shouldShowButton(editor, hideWhenUnavailable)
  const canInsert = canInsertTable(editor)

  const handleCellHover = useCallback((row: number, col: number) => {
    setHoveredCell({ row, col })
  }, [])

  const handleCellClick = useCallback(
    (row: number, col: number) => {
      const success = insertTable(editor, row + 1, col + 1)
      if (success) {
        setIsOpen(false)
        onInserted?.(row + 1, col + 1)
      }
    },
    [editor, onInserted]
  )

  const resetHoveredCell = useCallback(() => {
    setHoveredCell(null)
  }, [])

  return {
    isVisible,
    canInsert,
    isOpen,
    setIsOpen,
    hoveredCell,
    handleCellHover,
    handleCellClick,
    resetHoveredCell,
    label: "Insert table",
    Icon: TableIcon,
  }
}