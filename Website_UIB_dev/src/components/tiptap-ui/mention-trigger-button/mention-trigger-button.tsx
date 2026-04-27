"use client"

import { forwardRef, useCallback } from "react"


import { parseShortcutKeys } from "@/lib/tiptap-utils"


import { useTiptapEditor } from "@/hooks/use-tiptap-editor"


import type { UseMentionTriggerConfig } from "@/components/tiptap-ui/mention-trigger-button"
import {
  MENTION_TRIGGER_SHORTCUT_KEY,
  useMentionTrigger,
} from "@/components/tiptap-ui/mention-trigger-button"


import type { ButtonProps } from "@/components/tiptap-ui-primitive/button"
import { Button } from "@/components/tiptap-ui-primitive/button"
import { Badge } from "@/components/tiptap-ui-primitive/badge"

export interface MentionTriggerButtonProps
  extends Omit<ButtonProps, "type">,
    UseMentionTriggerConfig {
  text?: string
  showShortcut?: boolean
}

export function MentionShortcutBadge({
  shortcutKeys = MENTION_TRIGGER_SHORTCUT_KEY,
}: {
  shortcutKeys?: string
}) {
  return <Badge>{parseShortcutKeys({ shortcutKeys })}</Badge>
}


export const MentionTriggerButton = forwardRef<
  HTMLButtonElement,
  MentionTriggerButtonProps
>(
  (
    {
      editor: providedEditor,
      node,
      nodePos,
      text,
      trigger = "@",
      hideWhenUnavailable = false,
      onTriggered,
      showShortcut = false,
      onClick,
      children,
      ...buttonProps
    },
    ref
  ) => {
    const { editor } = useTiptapEditor(providedEditor)
    const { isVisible, canInsert, handleMention, label, shortcutKeys, Icon } =
      useMentionTrigger({
        editor,
        node,
        nodePos,
        trigger,
        hideWhenUnavailable,
        onTriggered,
      })

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        handleMention()
      },
      [handleMention, onClick]
    )

    if (!isVisible) {
      return null
    }

    return (
      <Button
        type="button"
        data-style="ghost"
        role="button"
        tabIndex={-1}
        disabled={!canInsert}
        data-disabled={!canInsert}
        aria-label={label}
        tooltip={label}
        onClick={handleClick}
        {...buttonProps}
        ref={ref}
      >
        {children ?? (
          <>
            <Icon className="tiptap-button-icon" />
            {text && <span className="tiptap-button-text">{text}</span>}
            {showShortcut && (
              <MentionShortcutBadge shortcutKeys={shortcutKeys} />
            )}
          </>
        )}
      </Button>
    )
  }
)

MentionTriggerButton.displayName = "MentionTriggerButton"