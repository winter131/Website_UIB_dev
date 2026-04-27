"use client"

import { forwardRef, useCallback } from "react"


import { useTiptapEditor } from "@/hooks/use-tiptap-editor"


import type { UseTableSortRowColumnConfig } from "@/components/tiptap-node/table-node/ui/table-sort-row-column-button"
import { useTableSortRowColumn } from "@/components/tiptap-node/table-node/ui/table-sort-row-column-button"


import type { ButtonProps } from "@/components/tiptap-ui-primitive/button"
import { Button } from "@/components/tiptap-ui-primitive/button"

export interface TableSortRowColumnButtonProps
  extends Omit<ButtonProps, "type">,
    UseTableSortRowColumnConfig {
  text?: string
}


export const TableSortRowColumnButton = forwardRef<
  HTMLButtonElement,
  TableSortRowColumnButtonProps
>(
  (
    {
      editor: providedEditor,
      index,
      orientation,
      direction,
      hideWhenUnavailable = false,
      onSorted,
      text,
      onClick,
      children,
      ...buttonProps
    },
    ref
  ) => {
    const { editor } = useTiptapEditor(providedEditor)
    const { isVisible, handleSort, label, canSortRowColumn, Icon } =
      useTableSortRowColumn({
        editor,
        index,
        orientation,
        direction,
        hideWhenUnavailable,
        onSorted,
      })

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        handleSort()
      },
      [handleSort, onClick]
    )

    if (!isVisible) {
      return null
    }

    return (
      <Button
        type="button"
        disabled={!canSortRowColumn}
        data-style="ghost"
        data-active-state="off"
        data-disabled={!canSortRowColumn}
        role="button"
        tabIndex={-1}
        aria-label={label}
        aria-pressed={false}
        tooltip={label}
        onClick={handleClick}
        {...buttonProps}
        ref={ref}
      >
        {children ?? (
          <>
            <Icon className="tiptap-button-icon" />
            {text && <span className="tiptap-button-text">{text}</span>}
          </>
        )}
      </Button>
    )
  }
)

TableSortRowColumnButton.displayName = "TableSortRowColumnButton"