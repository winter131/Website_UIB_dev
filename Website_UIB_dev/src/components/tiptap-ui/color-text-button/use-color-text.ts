"use client"

import { useCallback, useEffect, useState } from "react"
import { type Editor } from "@tiptap/react"
import { useHotkeys } from "react-hotkeys-hook"


import { useTiptapEditor } from "@/hooks/use-tiptap-editor"
import { useIsBreakpoint } from "@/hooks/use-is-breakpoint"


import {
  isMarkInSchema,
  isNodeTypeSelected,
  selectCurrentBlockContent,
} from "@/lib/tiptap-utils"


import { TextColorSmallIcon } from "@/components/tiptap-icons/text-color-small-icon"

export const COLOR_TEXT_SHORTCUT_KEY = "mod+shift+t"
export const TEXT_COLORS = [
  {
    label: "Default text",
    value: "var(--tt-color-text)",
    border: "var(--tt-color-text-contrast)",
  },
  {
    label: "Gray text",
    value: "var(--tt-color-text-gray)",
    border: "var(--tt-color-text-gray-contrast)",
  },
  {
    label: "Brown text",
    value: "var(--tt-color-text-brown)",
    border: "var(--tt-color-text-brown-contrast)",
  },
  {
    label: "Orange text",
    value: "var(--tt-color-text-orange)",
    border: "var(--tt-color-text-orange-contrast)",
  },
  {
    label: "Yellow text",
    value: "var(--tt-color-text-yellow)",
    border: "var(--tt-color-text-yellow-contrast)",
  },
  {
    label: "Green text",
    value: "var(--tt-color-text-green)",
    border: "var(--tt-color-text-green-contrast)",
  },
  {
    label: "Blue text",
    value: "var(--tt-color-text-blue)",
    border: "var(--tt-color-text-blue-contrast)",
  },
  {
    label: "Purple text",
    value: "var(--tt-color-text-purple)",
    border: "var(--tt-color-text-purple-contrast)",
  },
  {
    label: "Pink text",
    value: "var(--tt-color-text-pink)",
    border: "var(--tt-color-text-pink-contrast)",
  },
  {
    label: "Red text",
    value: "var(--tt-color-text-red)",
    border: "var(--tt-color-text-red-contrast)",
  },
]


export interface UseColorTextConfig {
  editor?: Editor | null
  textColor: string
  label: string
  hideWhenUnavailable?: boolean
  onApplied?: ({ color, label }: { color: string; label: string }) => void
}


export function canColorText(editor: Editor | null): boolean {
  if (!editor || !editor.isEditable) return false
  if (
    !isMarkInSchema("textStyle", editor) ||
    isNodeTypeSelected(editor, ["image"])
  )
    return false

  try {
    return editor.can().setMark("textStyle", { color: "currentColor" })
  } catch {
    return false
  }
}


export function isColorTextActive(
  editor: Editor | null,
  textColor: string
): boolean {
  if (!editor || !editor.isEditable) return false
  return editor.isActive("textStyle", { color: textColor })
}


export function shouldShowButton(props: {
  editor: Editor | null
  hideWhenUnavailable: boolean
}): boolean {
  const { editor, hideWhenUnavailable } = props

  if (!editor || !editor.isEditable) return false
  if (!isMarkInSchema("textStyle", editor)) return false

  if (hideWhenUnavailable && !editor.isActive("code")) {
    return canColorText(editor)
  }

  return true
}


export function useColorText(config: UseColorTextConfig) {
  const {
    editor: providedEditor,
    label,
    textColor,
    hideWhenUnavailable = false,
    onApplied,
  } = config

  const { editor } = useTiptapEditor(providedEditor)
  const isMobile = useIsBreakpoint()
  const [isVisible, setIsVisible] = useState<boolean>(true)
  const canColorTextState = canColorText(editor)
  const isActive = isColorTextActive(editor, textColor)

  useEffect(() => {
    if (!editor) return

    const handleSelectionUpdate = () => {
      setIsVisible(shouldShowButton({ editor, hideWhenUnavailable }))
    }

    handleSelectionUpdate()

    editor.on("selectionUpdate", handleSelectionUpdate)

    return () => {
      editor.off("selectionUpdate", handleSelectionUpdate)
    }
  }, [editor, hideWhenUnavailable])

  const handleColorText = useCallback(() => {
    if (!editor || !canColorTextState) return false

    if (editor.state.storedMarks) {
      const textStyleMarkType = editor.schema.marks.textStyle
      if (textStyleMarkType) {
        editor.view.dispatch(
          editor.state.tr.removeStoredMark(textStyleMarkType)
        )
      }
    }

    setTimeout(() => {
      selectCurrentBlockContent(editor)

      const success = editor
        .chain()
        .focus()
        .toggleMark("textStyle", { color: textColor })
        .run()
      if (success) {
        onApplied?.({ color: textColor, label })
      }
      return success
    }, 0)
  }, [editor, canColorTextState, textColor, onApplied, label])

  useHotkeys(
    COLOR_TEXT_SHORTCUT_KEY,
    (event) => {
      event.preventDefault()
      handleColorText()
    },
    {
      enabled: isVisible && canColorTextState,
      enableOnContentEditable: !isMobile,
      enableOnFormTags: true,
    }
  )

  return {
    isVisible,
    isActive,
    handleColorText,
    canColorText: canColorTextState,
    label: label || `Color text to ${textColor}`,
    shortcutKeys: COLOR_TEXT_SHORTCUT_KEY,
    Icon: TextColorSmallIcon,
  }
}