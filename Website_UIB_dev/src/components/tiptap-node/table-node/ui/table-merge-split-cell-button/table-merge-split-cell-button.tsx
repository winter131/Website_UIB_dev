"use client"

import { forwardRef, useCallback } from "react"


import { useTiptapEditor } from "@/hooks/use-tiptap-editor"


import type { UseTableMergeSplitCellConfig } from "@/components/tiptap-node/table-node/ui/table-merge-split-cell-button"
import { useTableMergeSplitCell } from "@/components/tiptap-node/table-node/ui/table-merge-split-cell-button"


import type { ButtonProps } from "@/components/tiptap-ui-primitive/button"
import { Button } from "@/components/tiptap-ui-primitive/button"

export interface TableMergeSplitCellButtonProps
  extends Omit<ButtonProps, "type">,
    UseTableMergeSplitCellConfig {
  text?: string
}


export const TableMergeSplitCellButton = forwardRef<
  HTMLButtonElement,
  TableMergeSplitCellButtonProps
>(
  (
    {
      editor: providedEditor,
      action,
      hideWhenUnavailable = false,
      onExecuted,
      text,
      onClick,
      children,
      ...buttonProps
    },
    ref
  ) => {
    const { editor } = useTiptapEditor(providedEditor)
    const { isVisible, handleExecute, label, canExecute, Icon } =
      useTableMergeSplitCell({
        editor,
        action,
        hideWhenUnavailable,
        onExecuted,
      })

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        handleExecute()
      },
      [handleExecute, onClick]
    )

    if (!isVisible) {
      return null
    }

    return (
      <Button
        type="button"
        disabled={!canExecute}
        data-style="ghost"
        data-active-state="off"
        data-disabled={!canExecute}
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

TableMergeSplitCellButton.displayName = "TableMergeSplitCellButton"