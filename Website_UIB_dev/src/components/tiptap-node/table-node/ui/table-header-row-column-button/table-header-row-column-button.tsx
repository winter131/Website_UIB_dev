"use client"

import { forwardRef, useCallback } from "react"


import { useTiptapEditor } from "@/hooks/use-tiptap-editor"


import type { UseTableHeaderRowColumnConfig } from "@/components/tiptap-node/table-node/ui/table-header-row-column-button"
import { useTableHeaderRowColumn } from "@/components/tiptap-node/table-node/ui/table-header-row-column-button"


import type { ButtonProps } from "@/components/tiptap-ui-primitive/button"
import { Button } from "@/components/tiptap-ui-primitive/button"

export interface TableHeaderRowColumnButtonProps
  extends Omit<ButtonProps, "type">,
    UseTableHeaderRowColumnConfig {
  text?: string
}


export const TableHeaderRowColumnButton = forwardRef<
  HTMLButtonElement,
  TableHeaderRowColumnButtonProps
>(
  (
    {
      editor: providedEditor,
      index,
      orientation,
      hideWhenUnavailable = false,
      onToggled,
      text,
      onClick,
      children,
      ...buttonProps
    },
    ref
  ) => {
    const { editor } = useTiptapEditor(providedEditor)
    const { isVisible, handleToggle, label, canToggleHeader, Icon, isActive } =
      useTableHeaderRowColumn({
        editor,
        index,
        orientation,
        hideWhenUnavailable,
        onToggled,
      })

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        handleToggle()
      },
      [handleToggle, onClick]
    )

    if (!isVisible) {
      return null
    }

    return (
      <Button
        type="button"
        disabled={!canToggleHeader}
        data-style="ghost"
        data-active-state={isActive ? "on" : "off"}
        data-disabled={!canToggleHeader}
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

TableHeaderRowColumnButton.displayName = "TableHeaderRowColumnButton"