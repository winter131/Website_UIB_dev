"use client"

import { useCallback, useMemo } from "react"
import type { Editor } from "@tiptap/react"
import type { Node } from "@tiptap/pm/model"


import { useTiptapEditor } from "@/hooks/use-tiptap-editor"


import { isExtensionAvailable } from "@/lib/tiptap-utils"
import type { Orientation } from "@/components/tiptap-node/table-node/lib/tiptap-table-utils"
import {
  type CellInfo,
  getTable,
  getTableSelectionType,
  getRowOrColumnCells,
  isCellEmpty,
} from "@/components/tiptap-node/table-node/lib/tiptap-table-utils"


import { ArrowDownAZIcon } from "@/components/tiptap-icons/arrow-down-a-z-icon"
import { ArrowDownZAIcon } from "@/components/tiptap-icons/arrow-down-z-a-icon"

export type SortDirection = "asc" | "desc"

export interface UseTableSortRowColumnConfig {
  editor?: Editor | null
  index?: number
  orientation?: Orientation
  tablePos?: number
  direction: SortDirection
  hideWhenUnavailable?: boolean
  onSorted?: () => void
}

const REQUIRED_EXTENSIONS = ["tableHandleExtension"]

export const tableSortRowColumnLabels: Record<
  Orientation,
  Record<SortDirection, string>
> = {
  row: {
    asc: "Sort row A-Z",
    desc: "Sort row Z-A",
  },
  column: {
    asc: "Sort column A-Z",
    desc: "Sort column Z-A",
  },
}

export const tableSortRowColumnIcons = {
  asc: ArrowDownAZIcon,
  desc: ArrowDownZAIcon,
}


function isCellHeader(cellNode: Node | null): boolean {
  if (!cellNode) return false

  return (
    cellNode.type.name === "tableHeader" ||
    cellNode.type.name === "table_header" ||
    cellNode.attrs?.header === true
  )
}


function getCellSortText(cellNode: Node | null): string {
  if (!cellNode) return ""

  let text = ""
  cellNode.descendants((node) => {
    if (node.isText) {
      text += node.text || ""
    }
    return true
  })

  return text.trim().toLowerCase()
}


interface SortableCell {
  sortText: string
  originalNode: Node | null
  cellInfo: CellInfo
  originalIndex: number
  isHeader: boolean
  isEmpty: boolean
}


function canSortRowColumn({
  editor,
  index,
  orientation,
  tablePos,
}: {
  editor: Editor | null
  index?: number
  orientation?: Orientation
  tablePos?: number
}): boolean {
  if (
    !editor ||
    !editor.isEditable ||
    !isExtensionAvailable(editor, REQUIRED_EXTENSIONS)
  ) {
    return false
  }

  try {
    const table = getTable(editor, tablePos)
    if (!table) return false

    const cellData = getRowOrColumnCells(editor, index, orientation, tablePos)

    if (cellData.orientation === "row") {
      if (table.map.width < 2) return false
    } else {
      if (table.map.height < 2) return false
    }

    if (cellData.mergedCells.length > 0) {
      return false
    }

    const hasContent = cellData.cells.some(
      (cellInfo) =>
        cellInfo.node &&
        !isCellHeader(cellInfo.node) &&
        !isCellEmpty(cellInfo.node)
    )

    if (!hasContent) {
      return false
    }

    return true
  } catch {
    return false
  }
}


function tableSortRowColumn({
  editor,
  index,
  orientation,
  direction,
  tablePos,
}: {
  editor: Editor | null
  index?: number
  orientation?: Orientation
  direction: SortDirection
  tablePos?: number
}): boolean {
  if (!canSortRowColumn({ editor, index, orientation, tablePos }) || !editor)
    return false

  try {
    const { state, view } = editor
    const tr = state.tr

    const cellData = getRowOrColumnCells(editor, index, orientation, tablePos)

    if (cellData.mergedCells.length > 0) {
      console.warn(`Cannot sort ${orientation} ${index}: contains merged cells`)
      return false
    }

    if (cellData.cells.length < 2) {
      return false
    }

    const allItems: SortableCell[] = cellData.cells.map(
      (cellInfo, originalIndex) => {
        const isHeader = isCellHeader(cellInfo.node)
        const isEmpty = cellInfo.node ? isCellEmpty(cellInfo.node) : true
        return {
          sortText: getCellSortText(cellInfo.node),
          originalNode: cellInfo.node,
          cellInfo,
          originalIndex,
          isHeader,
          isEmpty,
        }
      }
    )

    const dataItems = allItems.filter((item) => !item.isHeader)

    if (dataItems.length < 2) {
      console.log("No sortable data cells found (excluding headers)")
      return false
    }

    dataItems.sort((a, b) => {
      if (a.isEmpty && !b.isEmpty) return 1
      if (!a.isEmpty && b.isEmpty) return -1
      if (a.isEmpty && b.isEmpty) return 0

      const comparison = a.sortText.localeCompare(b.sortText, undefined, {
        sensitivity: "base",
      })
      return direction === "asc" ? comparison : -comparison
    })

    const newCellNodes: Node[] = []
    let dataIndex = 0

    for (let i = 0; i < allItems.length; i++) {
      const originalItem = allItems[i]
      const targetCell = cellData.cells[i]

      if (!targetCell || !originalItem) continue

      let nodeToPlace: Node | null = null

      if (originalItem.isHeader) {
        nodeToPlace = originalItem.originalNode
      } else {
        const sortedDataItem = dataItems[dataIndex]
        nodeToPlace = sortedDataItem?.originalNode || null
        dataIndex++
      }

      if (nodeToPlace && targetCell.node) {
        const cellType = targetCell.node.type
        const newCellNode = cellType.create(
          nodeToPlace.attrs,
          nodeToPlace.content,
          nodeToPlace.marks
        )
        newCellNodes.push(newCellNode)
      } else {
        newCellNodes.push(targetCell.node!)
      }
    }

    const cellsToReplace = [...cellData.cells].reverse()
    const newNodesToPlace = [...newCellNodes].reverse()

    cellsToReplace.forEach((targetCell, reverseIndex) => {
      const newNode = newNodesToPlace[reverseIndex]
      if (newNode && targetCell.node) {
        const cellEnd = targetCell.pos + targetCell.node.nodeSize
        tr.replaceWith(targetCell.pos, cellEnd, newNode)
      }
    })

    if (tr.docChanged) {
      view.dispatch(tr)
      return true
    }

    return false
  } catch (error) {
    console.error(`Error sorting table ${orientation}:`, error)
    return false
  }
}


function shouldShowButton({
  editor,
  index,
  orientation,
  hideWhenUnavailable,
  tablePos,
}: {
  editor: Editor | null
  index?: number
  orientation?: Orientation
  hideWhenUnavailable: boolean
  tablePos: number | undefined
}): boolean {
  if (!editor || !editor.isEditable) return false
  if (!isExtensionAvailable(editor, REQUIRED_EXTENSIONS)) return false

  const table = getTable(editor, tablePos)
  if (!table) return false

  const selectionType = getTableSelectionType(
    editor,
    index,
    orientation,
    tablePos
  )
  if (!selectionType) return false

  return hideWhenUnavailable
    ? canSortRowColumn({ editor, index, orientation, tablePos })
    : true
}


export function useTableSortRowColumn(
  config: UseTableSortRowColumnConfig = { direction: "asc" }
) {
  const {
    editor: providedEditor,
    index,
    orientation,
    tablePos,
    direction,
    hideWhenUnavailable = false,
    onSorted,
  } = config

  const { editor } = useTiptapEditor(providedEditor)

  const selectionType = getTableSelectionType(editor, index, orientation)

  const isVisible = shouldShowButton({
    editor,
    index,
    orientation,
    hideWhenUnavailable,
    tablePos,
  })

  const canPerformSort = canSortRowColumn({
    editor,
    index,
    orientation,
    tablePos,
  })

  const handleSort = useCallback(() => {
    const success = tableSortRowColumn({
      editor,
      index,
      orientation,
      direction,
      tablePos,
    })
    if (success) onSorted?.()
    return success
  }, [editor, index, orientation, direction, tablePos, onSorted])

  const label = useMemo(() => {
    const orientationLabels =
      tableSortRowColumnLabels[selectionType?.orientation || "row"]
    return (
      orientationLabels[direction] ||
      `Sort ${selectionType?.orientation} ${direction}`
    )
  }, [selectionType, direction])

  const Icon = useMemo(() => {
    return tableSortRowColumnIcons[direction] || ArrowDownAZIcon
  }, [direction])

  return {
    isVisible,
    canSortRowColumn: canPerformSort,
    handleSort,
    label,
    Icon,
  }
}