"use client"

import { forwardRef, useMemo, useCallback } from "react"


import { Button } from "@/components/tiptap-ui-primitive/button"


import { cn } from "@/lib/tiptap-utils"


import { TableColumnIcon } from "@/components/tiptap-icons/table-column-icon"
import { TableRowIcon } from "@/components/tiptap-icons/table-row-icon"

import "./table-grid-selector.scss"


export interface CellCoordinates {
  row: number
  col: number
}

export interface TableGridSelectorProps {
  maxRows?: number
  maxCols?: number
  hoveredCell: CellCoordinates | null
  onCellHover: (row: number, col: number) => void
  onCellClick: (row: number, col: number) => void
  onMouseLeave?: () => void
  disabled?: boolean
  className?: string
  showSizeIndicator?: boolean
}

interface GridCellProps {
  row: number
  col: number
  isSelected: boolean
  disabled: boolean
  onMouseEnter: () => void
  onClick: () => void
}

const isCellSelected = (
  cell: CellCoordinates,
  hoveredCell: CellCoordinates | null
): boolean => {
  if (!hoveredCell) return false
  return cell.row <= hoveredCell.row && cell.col <= hoveredCell.col
}

const generateGridCells = (rows: number, cols: number): CellCoordinates[] => {
  const totalCells = rows * cols
  return Array.from({ length: totalCells }, (_, index) => ({
    row: Math.floor(index / cols),
    col: index % cols,
  }))
}

const GridCell = ({
  row,
  col,
  isSelected,
  disabled,
  onMouseEnter,
  onClick,
}: GridCellProps) => (
  <Button
    data-size="small"
    type="button"
    className={cn("tiptap-table-grid-cell", isSelected && "selected")}
    disabled={disabled}
    onMouseEnter={onMouseEnter}
    onClick={onClick}
    aria-label={`Select ${row + 1}x${col + 1} table`}
  />
)

const SizeIndicator = ({
  hoveredCell,
}: {
  hoveredCell: CellCoordinates | null
}) => {
  const columns = hoveredCell ? hoveredCell.col + 1 : 1
  const rows = hoveredCell ? hoveredCell.row + 1 : 1

  return (
    <div className="tiptap-table-size-indicator">
      <div className="tiptap-table-size-indicator-item">
        <TableColumnIcon className="tiptap-table-column-icon" />
        <span className="tiptap-table-size-indicator-text">{columns}</span>
      </div>
      <span className="tiptap-table-size-indicator-delimiter">x</span>
      <div className="tiptap-table-size-indicator-item">
        <TableRowIcon className="tiptap-table-row-icon" />
        <span className="tiptap-table-size-indicator-text">{rows}</span>
      </div>
    </div>
  )
}


export const TableGridSelector = forwardRef<
  HTMLDivElement,
  TableGridSelectorProps
>(
  (
    {
      maxRows = 8,
      maxCols = 8,
      hoveredCell,
      onCellHover,
      onCellClick,
      onMouseLeave,
      disabled = false,
      className,
      showSizeIndicator = true,
    },
    ref
  ) => {
    const gridCells = useMemo(
      () => generateGridCells(maxRows, maxCols),
      [maxRows, maxCols]
    )

    const gridStyle = useMemo(
      () =>
        ({
          "--tt-table-columns": maxCols,
          "--tt-table-rows": maxRows,
        }) as React.CSSProperties,
      [maxCols, maxRows]
    )

    const handleCellHover = useCallback(
      (row: number, col: number) => () => onCellHover(row, col),
      [onCellHover]
    )

    const handleCellClick = useCallback(
      (row: number, col: number) => () => onCellClick(row, col),
      [onCellClick]
    )

    return (
      <>
        <div
          ref={ref}
          className={cn("tiptap-table-grid", className)}
          onMouseLeave={onMouseLeave}
          style={gridStyle}
        >
          {gridCells.map((cell, index) => (
            <GridCell
              key={index}
              row={cell.row}
              col={cell.col}
              isSelected={isCellSelected(cell, hoveredCell)}
              disabled={disabled}
              onMouseEnter={handleCellHover(cell.row, cell.col)}
              onClick={handleCellClick(cell.row, cell.col)}
            />
          ))}
        </div>

        {showSizeIndicator && <SizeIndicator hoveredCell={hoveredCell} />}
      </>
    )
  }
)

TableGridSelector.displayName = "TableGridSelector"