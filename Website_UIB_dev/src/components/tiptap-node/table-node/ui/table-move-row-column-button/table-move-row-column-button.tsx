"use client"

import { forwardRef, useCallback } from "react"


import { useTiptapEditor } from "@/hooks/use-tiptap-editor"


import type { UseTableMoveRowColumnConfig } from "@/components/tiptap-node/table-node/ui/table-move-row-column-button"
import { useTableMoveRowColumn } from "@/components/tiptap-node/table-node/ui/table-move-row-column-button"


import type { ButtonProps } from "@/components/tiptap-ui-primitive/button"
import { Button } from "@/components/tiptap-ui-primitive/button"

export interface TableMoveRowColumnButtonProps
  extends Omit<ButtonProps, "type">,
    UseTableMoveRowColumnConfig {
  text?: string
}


export const TableMoveRowColumnButton = forwardRef<
  HTMLButtonElement,
  TableMoveRowColumnButtonProps
>(
  (
    {
      editor: providedEditor,
      index,
      orientation,
      direction,
      hideWhenUnavailable = false,
      onMoved,
      text,
      onClick,
      children,
      ...buttonProps
    },
    ref
  ) => {
    const { editor } = useTiptapEditor(providedEditor)
    const { isVisible, handleMove, label, canMoveRowColumn, Icon } =
      useTableMoveRowColumn({
        editor,
        index,
        orientation,
        direction,
        hideWhenUnavailable,
        onMoved,
      })

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        handleMove()
      },
      [handleMove, onClick]
    )

    if (!isVisible) {
      return null
    }

    return (
      <Button
        type="button"
        disabled={!canMoveRowColumn}
        data-style="ghost"
        data-active-state="off"
        data-disabled={!canMoveRowColumn}
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

TableMoveRowColumnButton.displayName = "TableMoveRowColumnButton"