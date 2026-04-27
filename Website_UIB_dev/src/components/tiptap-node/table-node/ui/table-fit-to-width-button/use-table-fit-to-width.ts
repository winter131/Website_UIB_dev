"use client"

import { useCallback } from "react"
import type { Editor } from "@tiptap/react"


import { useTiptapEditor } from "@/hooks/use-tiptap-editor"


import { isExtensionAvailable } from "@/lib/tiptap-utils"
import {
  getTable,
  RESIZE_MIN_WIDTH,
} from "@/components/tiptap-node/table-node/lib/tiptap-table-utils"


import { MoveHorizontalIcon } from "@/components/tiptap-icons/move-horizontal-icon"

export interface UseTableFitToWidthConfig {
  editor?: Editor | null
  hideWhenUnavailable?: boolean
  onWidthAdjusted?: () => void
}


const REQUIRED_EXTENSIONS = ["table", "tableHandleExtension"]


function canFitTableToWidth(editor: Editor | null): boolean {
  if (
    !editor ||
    !editor.isEditable ||
    !isExtensionAvailable(editor, REQUIRED_EXTENSIONS)
  ) {
    return false
  }

  try {
    return (
      editor.isActive("table") ||
      editor.isActive("tableCell") ||
      editor.isActive("tableHeader")
    )
  } catch {
    return false
  }
}


function setTableAutoWidth(editor: Editor | null): boolean {
  if (!canFitTableToWidth(editor) || !editor) return false

  try {
    const table = getTable(editor)
    if (!table) return false

    const editorElement = editor.view.dom as HTMLElement
    const style = getComputedStyle(editorElement)

    const paddingLeft = parseFloat(style.paddingLeft) || 0
    const paddingRight = parseFloat(style.paddingRight) || 0

    const editorWidth = editorElement.clientWidth - paddingLeft - paddingRight

    const columnCount = table.map.width
    if (columnCount === 0) return false

    let colWidth = 0
    const availableWidth = editorWidth - columnCount - 8
    colWidth = Math.floor(availableWidth / columnCount)

    const finalColWidth = Math.max(colWidth, RESIZE_MIN_WIDTH)

    const tr = editor.state.tr
    table.node.descendants((child, childPos) => {
      if (
        child.type.name === "tableCell" ||
        child.type.name === "tableHeader"
      ) {
        const absolutePos = table.start + childPos
        const colspan = child.attrs.colspan || 1

        const colwidthArray = Array(colspan).fill(finalColWidth)
        tr.setNodeMarkup(absolutePos, undefined, {
          ...child.attrs,
          colwidth: colwidthArray,
        })
      }
    })

    if (tr.docChanged) {
      editor.view.dispatch(tr)
    }

    return true
  } catch (error) {
    console.error("Error setting table auto width:", error)
    return false
  }
}


function tableFitToWidth({ editor }: { editor: Editor | null }) {
  if (!canFitTableToWidth(editor) || !editor) {
    return false
  }

  try {
    return setTableAutoWidth(editor)
  } catch (error) {
    console.error("Error adjusting table width:", error)
    return false
  }
}


function shouldShowButton({
  editor,
  hideWhenUnavailable,
}: {
  editor: Editor | null
  hideWhenUnavailable: boolean
}): boolean {
  if (!editor || !editor.isEditable) return false
  if (!isExtensionAvailable(editor, REQUIRED_EXTENSIONS)) return false

  return hideWhenUnavailable ? canFitTableToWidth(editor) : true
}


export function useTableFitToWidth(config: UseTableFitToWidthConfig = {}) {
  const {
    editor: providedEditor,
    hideWhenUnavailable = false,
    onWidthAdjusted,
  } = config

  const { editor } = useTiptapEditor(providedEditor)

  const isVisible = shouldShowButton({
    editor,
    hideWhenUnavailable,
  })

  const canPerformAction = canFitTableToWidth(editor)

  const handleFitToWidth = useCallback(() => {
    const success = tableFitToWidth({ editor })
    if (success) onWidthAdjusted?.()
    return success
  }, [editor, onWidthAdjusted])

  const label = "Fit to width"
  const Icon = MoveHorizontalIcon

  return {
    isVisible,
    canFitToWidth: canPerformAction,
    handleFitToWidth,
    label,
    Icon,
  }
}