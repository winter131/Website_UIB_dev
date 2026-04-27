"use client"

import { forwardRef, useCallback } from "react"


import { parseShortcutKeys } from "@/lib/tiptap-utils"


import { useTiptapEditor } from "@/hooks/use-tiptap-editor"


import type {
  ImageAlign,
  UseImageAlignConfig,
} from "@/components/tiptap-ui/image-align-button"
import {
  IMAGE_ALIGN_SHORTCUT_KEYS,
  useImageAlign,
} from "@/components/tiptap-ui/image-align-button"


import type { ButtonProps } from "@/components/tiptap-ui-primitive/button"
import { Button } from "@/components/tiptap-ui-primitive/button"
import { Badge } from "@/components/tiptap-ui-primitive/badge"

export interface ImageAlignButtonProps
  extends Omit<ButtonProps, "type">,
    UseImageAlignConfig {
  text?: string
  showShortcut?: boolean
}

export function ImageAlignShortcutBadge({
  align,
  shortcutKeys = IMAGE_ALIGN_SHORTCUT_KEYS[align],
}: {
  align: ImageAlign
  shortcutKeys?: string
}) {
  return <Badge>{parseShortcutKeys({ shortcutKeys })}</Badge>
}


export const ImageAlignButton = forwardRef<
  HTMLButtonElement,
  ImageAlignButtonProps
>(
  (
    {
      editor: providedEditor,
      align,
      text,
      extensionName,
      attributeName = "data-align",
      hideWhenUnavailable = false,
      onAligned,
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
      handleImageAlign,
      label,
      canAlign,
      isActive,
      Icon,
      shortcutKeys,
    } = useImageAlign({
      editor,
      align,
      extensionName,
      attributeName,
      hideWhenUnavailable,
      onAligned,
    })

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        handleImageAlign()
      },
      [handleImageAlign, onClick]
    )

    if (!isVisible) {
      return null
    }

    return (
      <Button
        type="button"
        disabled={!canAlign}
        data-style="ghost"
        data-active-state={isActive ? "on" : "off"}
        data-disabled={!canAlign}
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
            {showShortcut ? (
              <ImageAlignShortcutBadge
                align={align}
                shortcutKeys={shortcutKeys}
              />
            ) : null}
          </>
        )}
      </Button>
    )
  }
)

ImageAlignButton.displayName = "ImageAlignButton"