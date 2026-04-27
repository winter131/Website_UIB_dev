"use client"

import { forwardRef, useCallback } from "react"


import { useTiptapEditor } from "@/hooks/use-tiptap-editor"


import type { UseTableDeleteRowColumnConfig } from "@/components/tiptap-node/table-node/ui/table-delete-row-column-button"
import { useTableDeleteRowColumn } from "@/components/tiptap-node/table-node/ui/table-delete-row-column-button"


import type { ButtonProps } from "@/components/tiptap-ui-primitive/button"
import { Button } from "@/components/tiptap-ui-primitive/button"

export interface TableDeleteRowColumnButtonProps
  extends Omit<ButtonProps, "type">,
    UseTableDeleteRowColumnConfig {
  text?: string
}


export const TableDeleteRowColumnButton = forwardRef<
  HTMLButtonElement,
  TableDeleteRowColumnButtonProps
>(
  (
    {
      editor: providedEditor,
      index,
      orientation,
      tablePos,
      hideWhenUnavailable = false,
      onDeleted,
      text,
      onClick,
      children,
      ...buttonProps
    },
    ref
  ) => {
    const { editor } = useTiptapEditor(providedEditor)
    const { isVisible, handleDelete, label, canDeleteRowColumn, Icon } =
      useTableDeleteRowColumn({
        editor,
        index,
        orientation,
        tablePos,
        hideWhenUnavailable,
        onDeleted,
      })

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        handleDelete()
      },
      [handleDelete, onClick]
    )

    if (!isVisible) {
      return null
    }

    return (
      <Button
        type="button"
        disabled={!canDeleteRowColumn}
        data-style="ghost"
        data-active-state="off"
        data-disabled={!canDeleteRowColumn}
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

TableDeleteRowColumnButton.displayName = "TableDeleteRowColumnButton"