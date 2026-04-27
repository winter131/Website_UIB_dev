"use client"

import { forwardRef, useCallback } from "react"


import { parseShortcutKeys } from "@/lib/tiptap-utils"


import { useTiptapEditor } from "@/hooks/use-tiptap-editor"


import type { UseCopyToClipboardConfig } from "@/components/tiptap-ui/copy-to-clipboard-button"
import {
  COPY_TO_CLIPBOARD_SHORTCUT_KEY,
  useCopyToClipboard,
} from "@/components/tiptap-ui/copy-to-clipboard-button"


import type { ButtonProps } from "@/components/tiptap-ui-primitive/button"
import { Button } from "@/components/tiptap-ui-primitive/button"
import { Badge } from "@/components/tiptap-ui-primitive/badge"

export interface CopyToClipboardButtonProps
  extends Omit<ButtonProps, "type">,
    UseCopyToClipboardConfig {
  text?: string
  showShortcut?: boolean
}

export function CopyToClipboardShortcutBadge({
  shortcutKeys = COPY_TO_CLIPBOARD_SHORTCUT_KEY,
}: {
  shortcutKeys?: string
}) {
  return <Badge>{parseShortcutKeys({ shortcutKeys })}</Badge>
}


export const CopyToClipboardButton = forwardRef<
  HTMLButtonElement,
  CopyToClipboardButtonProps
>(
  (
    {
      editor: providedEditor,
      text,
      copyWithFormatting = true,
      hideWhenUnavailable = false,
      onCopied,
      showShortcut = false,
      onClick,
      children,
      ...buttonProps
    },
    ref
  ) => {
    const { editor } = useTiptapEditor(providedEditor)
    const { isVisible, handleCopyToClipboard, label, shortcutKeys, Icon } =
      useCopyToClipboard({
        editor,
        copyWithFormatting,
        hideWhenUnavailable,
        onCopied,
      })

    const handleClick = useCallback(
      async (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        await handleCopyToClipboard()
      },
      [handleCopyToClipboard, onClick]
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
        aria-label={label}
        tooltip="Copy to clipboard"
        onClick={handleClick}
        {...buttonProps}
        ref={ref}
      >
        {children ?? (
          <>
            <Icon className="tiptap-button-icon" />
            {text && <span className="tiptap-button-text">{text}</span>}
            {showShortcut && (
              <CopyToClipboardShortcutBadge shortcutKeys={shortcutKeys} />
            )}
          </>
        )}
      </Button>
    )
  }
)

CopyToClipboardButton.displayName = "CopyToClipboardButton"