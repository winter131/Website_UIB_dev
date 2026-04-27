"use client"

import { forwardRef, useCallback } from "react"


import { parseShortcutKeys } from "@/lib/tiptap-utils"


import { useTiptapEditor } from "@/hooks/use-tiptap-editor"


import type { UseMoveNodeConfig } from "@/components/tiptap-ui/move-node-button"
import { useMoveNode } from "@/components/tiptap-ui/move-node-button"


import type { ButtonProps } from "@/components/tiptap-ui-primitive/button"
import { Button } from "@/components/tiptap-ui-primitive/button"
import { Badge } from "@/components/tiptap-ui-primitive/badge"

export interface MoveNodeButtonProps
  extends Omit<ButtonProps, "type">,
    UseMoveNodeConfig {
  text?: string
  showShortcut?: boolean
}

export function MoveNodeShortcutBadge({
  shortcutKeys,
}: {
  shortcutKeys: string
}) {
  return <Badge>{parseShortcutKeys({ shortcutKeys })}</Badge>
}


export const MoveNodeButton = forwardRef<
  HTMLButtonElement,
  MoveNodeButtonProps
>(
  (
    {
      editor: providedEditor,
      text,
      direction,
      hideWhenUnavailable = false,
      onMoved,
      showShortcut = false,
      onClick,
      children,
      ...buttonProps
    },
    ref
  ) => {
    const { editor } = useTiptapEditor(providedEditor)
    const {
      isVisible,
      handleMoveNode,
      canMoveNode,
      label,
      shortcutKeys,
      Icon,
    } = useMoveNode({
      editor,
      direction,
      hideWhenUnavailable,
      onMoved,
    })

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        handleMoveNode()
      },
      [handleMoveNode, onClick]
    )

    if (!isVisible) {
      return null
    }

    const tooltip = direction === "up" ? "Move Up" : "Move Down"

    return (
      <Button
        type="button"
        data-style="ghost"
        role="button"
        tabIndex={-1}
        aria-label={label}
        tooltip={tooltip}
        disabled={!canMoveNode}
        onClick={handleClick}
        {...buttonProps}
        ref={ref}
      >
        {children ?? (
          <>
            <Icon className="tiptap-button-icon" />
            {text && <span className="tiptap-button-text">{text}</span>}
            {showShortcut && (
              <MoveNodeShortcutBadge shortcutKeys={shortcutKeys} />
            )}
          </>
        )}
      </Button>
    )
  }
)

MoveNodeButton.displayName = "MoveNodeButton"