"use client"

import { forwardRef, useCallback } from "react"


import { useTiptapEditor } from "@/hooks/use-tiptap-editor"


import type { UseTableClearRowColumnContentConfig } from "@/components/tiptap-node/table-node/ui/table-clear-row-column-content-button"
import { useTableClearRowColumnContent } from "@/components/tiptap-node/table-node/ui/table-clear-row-column-content-button"


import type { ButtonProps } from "@/components/tiptap-ui-primitive/button"
import { Button } from "@/components/tiptap-ui-primitive/button"

export interface TableClearRowColumnContentButtonProps
  extends Omit<ButtonProps, "type">,
    UseTableClearRowColumnContentConfig {
  text?: string
}


export const TableClearRowColumnContentButton = forwardRef<
  HTMLButtonElement,
  TableClearRowColumnContentButtonProps
>(
  (
    {
      editor: providedEditor,
      index,
      orientation,
      hideWhenUnavailable = false,
      resetAttrs = false,
      onCleared,
      text,
      onClick,
      children,
      ...buttonProps
    },
    ref
  ) => {
    const { editor } = useTiptapEditor(providedEditor)
    const { isVisible, handleClear, label, canClearRowColumnContent, Icon } =
      useTableClearRowColumnContent({
        editor,
        index,
        orientation,
        hideWhenUnavailable,
        resetAttrs,
        onCleared,
      })

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        handleClear()
      },
      [handleClear, onClick]
    )

    if (!isVisible) {
      return null
    }

    return (
      <Button
        type="button"
        disabled={!canClearRowColumnContent}
        data-style="ghost"
        data-active-state="off"
        data-disabled={!canClearRowColumnContent}
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

TableClearRowColumnContentButton.displayName =
  "TableClearRowColumnContentButton"