"use client"

import { forwardRef } from "react"


import { useTiptapEditor } from "@/hooks/use-tiptap-editor"


import type { UseTableTriggerButtonConfig } from "@/components/tiptap-node/table-node/ui/table-trigger-button"
import { useTableTriggerButton } from "@/components/tiptap-node/table-node/ui/table-trigger-button"


import { TableGridSelector } from "@/components/tiptap-node/table-node/ui/table-trigger-button/table-grid-selector"


import type { ButtonProps } from "@/components/tiptap-ui-primitive/button"
import { Button } from "@/components/tiptap-ui-primitive/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/tiptap-ui-primitive/popover"


import { Card, CardBody } from "@/components/tiptap-ui-primitive/card"

export interface TableTriggerButtonProps
  extends Omit<ButtonProps, "type">,
    UseTableTriggerButtonConfig {
  text?: string
}


export const TableTriggerButton = forwardRef<
  HTMLButtonElement,
  TableTriggerButtonProps
>(
  (
    {
      editor: providedEditor,
      hideWhenUnavailable = false,
      maxRows = 8,
      maxCols = 8,
      onInserted,
      text,
      children,
      ...buttonProps
    },
    ref
  ) => {
    const { editor } = useTiptapEditor(providedEditor)
    const {
      isVisible,
      canInsert,
      isOpen,
      setIsOpen,
      hoveredCell,
      handleCellHover,
      handleCellClick,
      resetHoveredCell,
      label,
      Icon,
    } = useTableTriggerButton({
      editor,
      hideWhenUnavailable,
      maxRows,
      maxCols,
      onInserted,
    })

    if (!isVisible) {
      return null
    }

    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            type="button"
            data-style="ghost"
            disabled={!canInsert}
            data-disabled={!canInsert}
            aria-label={label}
            tooltip={label}
            {...buttonProps}
          >
            {children ?? (
              <>
                <Icon className="tiptap-button-icon" />
                {text && <span className="tiptap-button-text">{text}</span>}
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" side="bottom">
          <Card>
            <CardBody>
              <TableGridSelector
                maxRows={maxRows}
                maxCols={maxCols}
                hoveredCell={hoveredCell}
                onCellHover={handleCellHover}
                onCellClick={handleCellClick}
                onMouseLeave={resetHoveredCell}
                disabled={!canInsert}
              />
            </CardBody>
          </Card>
        </PopoverContent>
      </Popover>
    )
  }
)

TableTriggerButton.displayName = "TableTriggerButton"