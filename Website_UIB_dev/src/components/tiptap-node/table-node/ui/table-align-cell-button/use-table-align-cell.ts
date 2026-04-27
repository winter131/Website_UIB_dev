"use client"

import { useCallback, useMemo } from "react"
import type { Editor } from "@tiptap/react"


import { useTiptapEditor } from "@/hooks/use-tiptap-editor"


import { isExtensionAvailable } from "@/lib/tiptap-utils"
import type { Orientation } from "@/components/tiptap-node/table-node/lib/tiptap-table-utils"
import {
  getTable,
  getRowOrColumnCells,
} from "@/components/tiptap-node/table-node/lib/tiptap-table-utils"


import { AlignLeftIcon } from "@/components/tiptap-icons/align-left-icon"
import { AlignCenterIcon } from "@/components/tiptap-icons/align-center-icon"
import { AlignRightIcon } from "@/components/tiptap-icons/align-right-icon"
import { AlignJustifyIcon } from "@/components/tiptap-icons/align-justify-icon"
import { AlignBottomIcon } from "@/components/tiptap-icons/align-bottom-icon"
import { AlignTopIcon } from "@/components/tiptap-icons/align-top-icon"
import { AlignMiddleIcon } from "@/components/tiptap-icons/align-middle-icon"

export type TextAlignment = "left" | "center" | "right" | "justify"
export type VerticalAlignment = "top" | "middle" | "bottom"
export type AlignmentType = "text" | "vertical"

export interface UseTableAlignCellConfig {
  editor?: Editor | null
  alignmentType: AlignmentType
  alignment: TextAlignment | VerticalAlignment
  index?: number
  orientation?: Orientation
  hideWhenUnavailable?: boolean
  onAligned?: (alignment: TextAlignment | VerticalAlignment) => void
}

const REQUIRED_EXTENSIONS = ["table"]

export const tableAlignCellLabels = {
  text: {
    left: "Align left",
    center: "Align center",
    right: "Align right",
    justify: "Justify",
  } as Record<TextAlignment, string>,
  vertical: {
    top: "Align top",
    middle: "Align middle",
    bottom: "Align bottom",
  } as Record<VerticalAlignment, string>,
}

export const tableAlignCellIcons = {
  text: {
    left: AlignLeftIcon,
    center: AlignCenterIcon,
    right: AlignRightIcon,
    justify: AlignJustifyIcon,
  } as Record<TextAlignment, React.ComponentType<{ className?: string }>>,
  vertical: {
    top: AlignTopIcon,
    middle: AlignMiddleIcon,
    bottom: AlignBottomIcon,
  } as Record<VerticalAlignment, React.ComponentType<{ className?: string }>>,
}


function canAlignCell(editor: Editor | null): boolean {
  if (
    !editor ||
    !editor.isEditable ||
    !isExtensionAvailable(editor, REQUIRED_EXTENSIONS)
  ) {
    return false
  }

  try {
    return editor.isActive("tableCell") || editor.isActive("tableHeader")
  } catch {
    return false
  }
}


function canAlignRowColumn({
  editor,
  index,
  orientation,
}: {
  editor: Editor | null
  index?: number
  orientation?: Orientation
}): boolean {
  if (
    !editor ||
    !editor.isEditable ||
    !isExtensionAvailable(editor, REQUIRED_EXTENSIONS)
  ) {
    return false
  }

  try {
    const table = getTable(editor)
    if (!table) return false

    const cellData = getRowOrColumnCells(editor, index, orientation)

    if (cellData.cells.length === 0) return false

    return true
  } catch {
    return false
  }
}


function getCurrentAlignment(
  editor: Editor | null,
  alignmentType: AlignmentType
): TextAlignment | VerticalAlignment | null {
  if (!canAlignCell(editor) || !editor) return null

  try {
    const { selection } = editor.state
    const $anchor = selection.$anchor

    let cellNode = null
    for (let depth = $anchor.depth; depth >= 0; depth--) {
      const node = $anchor.node(depth)
      if (node.type.name === "tableCell" || node.type.name === "tableHeader") {
        cellNode = node
        break
      }
    }

    if (!cellNode) return null

    const attrs = cellNode.attrs || {}

    if (alignmentType === "text") {
      return (attrs.nodeTextAlign as TextAlignment) || "left"
    } else {
      return (attrs.nodeVerticalAlign as VerticalAlignment) || "top"
    }
  } catch {
    return null
  }
}


function getCurrentRowColumnAlignment(
  editor: Editor | null,
  alignmentType: AlignmentType,
  index?: number,
  orientation?: Orientation
): TextAlignment | VerticalAlignment | null {
  if (!editor) return null

  try {
    const cellData = getRowOrColumnCells(editor, index, orientation)

    if (cellData.cells.length === 0) return null

    const firstCell = cellData.cells[0]
    if (!firstCell?.node) return null

    const attrs = firstCell.node.attrs || {}

    if (alignmentType === "text") {
      return (attrs.nodeTextAlign as TextAlignment) || "left"
    } else {
      return (attrs.nodeVerticalAlign as VerticalAlignment) || "top"
    }
  } catch {
    return null
  }
}


function setTableCellAlignment(
  editor: Editor | null,
  alignmentType: AlignmentType,
  alignment: TextAlignment | VerticalAlignment
): boolean {
  if (!canAlignCell(editor) || !editor) return false

  try {
    if (alignmentType === "text") {
      return editor.commands.setCellAttribute("nodeTextAlign", alignment)
    } else {
      return editor.commands.setCellAttribute("nodeVerticalAlign", alignment)
    }
  } catch (error) {
    console.error("Error setting table cell alignment:", error)
    return false
  }
}


function setRowColumnAlignment({
  editor,
  alignmentType,
  alignment,
  index,
  orientation,
}: {
  editor: Editor | null
  alignmentType: AlignmentType
  alignment: TextAlignment | VerticalAlignment
  index?: number
  orientation?: Orientation
}): boolean {
  if (!canAlignRowColumn({ editor, index, orientation }) || !editor) {
    return false
  }

  try {
    const { state, view } = editor
    const tr = state.tr

    const cellData = getRowOrColumnCells(editor, index, orientation)

    if (cellData.cells.length === 0) {
      return false
    }

    const uniqueCells = new Map<number, (typeof cellData.cells)[0]>()

    cellData.cells.forEach((cellInfo) => {
      if (cellInfo.node && cellInfo.pos !== undefined) {
        uniqueCells.set(cellInfo.pos, cellInfo)
      }
    })

    if (uniqueCells.size === 0) {
      return false
    }

    const cellsToProcess = Array.from(uniqueCells.values()).sort(
      (a, b) => b.pos - a.pos
    )

    const attributeName =
      alignmentType === "text" ? "nodeTextAlign" : "nodeVerticalAlign"

    cellsToProcess.forEach((cellInfo) => {
      if (cellInfo.node && cellInfo.pos !== undefined) {
        const cellType = cellInfo.node.type

        const newCellNode = cellType.create(
          {
            ...cellInfo.node.attrs,
            [attributeName]: alignment,
          },
          cellInfo.node.content,
          cellInfo.node.marks
        )

        const cellEnd = cellInfo.pos + cellInfo.node.nodeSize
        tr.replaceWith(cellInfo.pos, cellEnd, newCellNode)
      }
    })

    if (tr.docChanged) {
      view.dispatch(tr)
      return true
    }

    return false
  } catch (error) {
    console.error(`Error aligning table ${orientation}:`, error)
    return false
  }
}


function tableAlignCell({
  editor,
  alignmentType,
  alignment,
  index,
  orientation,
}: {
  editor: Editor | null
  alignmentType: AlignmentType
  alignment: TextAlignment | VerticalAlignment
  index?: number
  orientation?: Orientation
}): boolean {
  if (!editor) return false

  try {
    if (typeof index === "number" && orientation) {
      return setRowColumnAlignment({
        editor,
        alignmentType,
        alignment,
        index,
        orientation,
      })
    } else {
      return setTableCellAlignment(editor, alignmentType, alignment)
    }
  } catch (error) {
    console.error("Error aligning table cell:", error)
    return false
  }
}


function shouldShowButton({
  editor,
  hideWhenUnavailable,
  index,
  orientation,
}: {
  editor: Editor | null
  hideWhenUnavailable: boolean
  index?: number
  orientation?: Orientation
}): boolean {
  if (!editor || !editor.isEditable) return false
  if (!isExtensionAvailable(editor, REQUIRED_EXTENSIONS)) return false

  if (hideWhenUnavailable) {
    if (typeof index === "number" && orientation) {
      return canAlignRowColumn({ editor, index, orientation })
    }

    return canAlignCell(editor)
  }

  return true
}


export function useTableAlignCell(config: UseTableAlignCellConfig) {
  const {
    editor: providedEditor,
    alignmentType,
    alignment,
    index,
    orientation,
    hideWhenUnavailable = false,
    onAligned,
  } = config

  const { editor } = useTiptapEditor(providedEditor)

  const isVisible = shouldShowButton({
    editor,
    hideWhenUnavailable,
    index,
    orientation,
  })

  const canPerformAlign = () => {
    if (typeof index === "number" && orientation) {
      return canAlignRowColumn({ editor, index, orientation })
    }
    return canAlignCell(editor)
  }

  const currentAlignment = () => {
    if (typeof index === "number" && orientation) {
      return getCurrentRowColumnAlignment(
        editor,
        alignmentType,
        index,
        orientation
      )
    }
    return getCurrentAlignment(editor, alignmentType)
  }

  const isActive = currentAlignment() === alignment

  const handleAlign = useCallback(() => {
    const success = tableAlignCell({
      editor,
      alignmentType,
      alignment,
      index,
      orientation,
    })

    if (success) {
      onAligned?.(alignment)
    }
    return success
  }, [editor, alignmentType, alignment, index, orientation, onAligned])

  const label = useMemo(() => {
    if (alignmentType === "text") {
      return tableAlignCellLabels.text[alignment as TextAlignment]
    } else {
      return tableAlignCellLabels.vertical[alignment as VerticalAlignment]
    }
  }, [alignmentType, alignment])

  const Icon = useMemo(() => {
    if (alignmentType === "text") {
      return tableAlignCellIcons.text[alignment as TextAlignment]
    } else {
      return tableAlignCellIcons.vertical[alignment as VerticalAlignment]
    }
  }, [alignmentType, alignment])

  return {
    isVisible,
    canAlignCell: canPerformAlign,
    handleAlign,
    label,
    Icon,
    isActive,
    currentAlignment,
  }
}