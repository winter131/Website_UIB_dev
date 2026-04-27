"use client"

import { forwardRef, useCallback } from "react"


import { useTiptapEditor } from "@/hooks/use-tiptap-editor"


import type { UseTableAlignCellConfig } from "@/components/tiptap-node/table-node/ui/table-align-cell-button"
import { useTableAlignCell } from "@/components/tiptap-node/table-node/ui/table-align-cell-button"


import type { ButtonProps } from "@/components/tiptap-ui-primitive/button"
import { Button } from "@/components/tiptap-ui-primitive/button"

export interface TableAlignCellButtonProps
  extends Omit<ButtonProps, "type">,
    UseTableAlignCellConfig {
  text?: string
}


export const TableAlignCellButton = forwardRef<
  HTMLButtonElement,
  TableAlignCellButtonProps
>(
  (
    {
      editor: providedEditor,
      alignmentType,
      alignment,
      index,
      orientation,
      hideWhenUnavailable = false,
      onAligned,
      text,
      onClick,
      children,
      ...buttonProps
    },
    ref
  ) => {
    const { editor } = useTiptapEditor(providedEditor)
    const { isVisible, handleAlign, label, canAlignCell, Icon, isActive } =
      useTableAlignCell({
        editor,
        alignmentType,
        alignment,
        index,
        orientation,
        hideWhenUnavailable,
        onAligned,
      })

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        handleAlign()
      },
      [handleAlign, onClick]
    )

    if (!isVisible) {
      return null
    }

    return (
      <Button
        type="button"
        disabled={!canAlignCell}
        data-style="ghost"
        data-active-state={isActive ? "on" : "off"}
        data-disabled={!canAlignCell}
        role="button"
        tabIndex={-1}
        aria-label={label}
        aria-pressed={isActive}
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

TableAlignCellButton.displayName = "TableAlignCellButton"