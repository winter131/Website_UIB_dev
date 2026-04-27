"use client"

import { useCallback, useEffect, useState } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { type Editor } from "@tiptap/react"
import { NodeSelection } from "@tiptap/pm/state"


import { useTiptapEditor } from "@/hooks/use-tiptap-editor"
import { useIsBreakpoint } from "@/hooks/use-is-breakpoint"


import { isExtensionAvailable } from "@/lib/tiptap-utils"


import { AlignCenterVerticalIcon } from "@/components/tiptap-icons/align-center-vertical-icon"
import { AlignEndVerticalIcon } from "@/components/tiptap-icons/align-end-vertical-icon"
import { AlignStartVerticalIcon } from "@/components/tiptap-icons/align-start-vertical-icon"

export type ImageAlign = "left" | "center" | "right"


export interface UseImageAlignConfig {
  editor?: Editor | null
  align: ImageAlign
  extensionName?: string
  attributeName?: string
  hideWhenUnavailable?: boolean
  onAligned?: () => void
}

export const IMAGE_ALIGN_SHORTCUT_KEYS: Record<ImageAlign, string> = {
  left: "alt+shift+l",
  center: "alt+shift+e",
  right: "alt+shift+r",
}

export const imageAlignIcons = {
  left: AlignStartVerticalIcon,
  center: AlignCenterVerticalIcon,
  right: AlignEndVerticalIcon,
}

export const imageAlignLabels: Record<ImageAlign, string> = {
  left: "Image align left",
  center: "Image align center",
  right: "Image align right",
}


export function canSetImageAlign(
  editor: Editor | null,
  align: ImageAlign,
  extensionName: string = "image",
  attributeName: string = "data-align"
): boolean {
  if (!editor || !editor.isEditable) return false
  if (!isExtensionAvailable(editor, [extensionName])) return false

  return editor
    .can()
    .updateAttributes(extensionName, { [attributeName]: align })
}


export function isImageAlignActive(
  editor: Editor | null,
  align: ImageAlign,
  extensionName: string = "image",
  attributeName: string = "data-align"
): boolean {
  if (!editor || !editor.isEditable) return false
  if (!isExtensionAvailable(editor, [extensionName])) return false

  const attributes = editor.getAttributes(extensionName)
  const currentAlign = attributes[attributeName] || "left"
  return currentAlign === align
}


export function setImageAlign(
  editor: Editor | null,
  align: ImageAlign,
  extensionName: string = "image",
  attributeName: string = "data-align"
): boolean {
  if (!editor?.isEditable) {
    return false
  }

  if (!isExtensionAvailable(editor, [extensionName])) {
    return false
  }

  if (!canSetImageAlign(editor, align, extensionName, attributeName)) {
    return false
  }

  try {
    const { selection } = editor.state
    const isNodeSelection = selection instanceof NodeSelection
    const selectionPosition = isNodeSelection
      ? selection.from
      : selection.$anchor.pos

    const alignmentUpdated = editor
      .chain()
      .focus()
      .updateAttributes(extensionName, { [attributeName]: align })
      .run()

    if (alignmentUpdated && isNodeSelection) {
      editor.commands.setNodeSelection(selectionPosition)
    }

    return alignmentUpdated
  } catch {
    return false
  }
}


export function shouldShowButton(props: {
  editor: Editor | null
  hideWhenUnavailable: boolean
  align: ImageAlign
  extensionName?: string
  attributeName?: string
}): boolean {
  const {
    editor,
    hideWhenUnavailable,
    align,
    extensionName = "image",
    attributeName = "data-align",
  } = props

  if (!editor || !editor.isEditable) return false
  if (!isExtensionAvailable(editor, [extensionName])) return false

  if (hideWhenUnavailable) {
    return canSetImageAlign(editor, align, extensionName, attributeName)
  }

  return true
}


export function useImageAlign(config: UseImageAlignConfig) {
  const {
    editor: providedEditor,
    align,
    extensionName = "image",
    attributeName = "data-align",
    hideWhenUnavailable = false,
    onAligned,
  } = config

  const { editor } = useTiptapEditor(providedEditor)
  const isMobile = useIsBreakpoint()
  const [isVisible, setIsVisible] = useState<boolean>(true)
  const canAlign = canSetImageAlign(editor, align, extensionName, attributeName)
  const isActive = isImageAlignActive(
    editor,
    align,
    extensionName,
    attributeName
  )

  useEffect(() => {
    if (!editor) return

    const handleSelectionUpdate = () => {
      setIsVisible(
        shouldShowButton({
          editor,
          align,
          hideWhenUnavailable,
          extensionName,
          attributeName,
        })
      )
    }

    handleSelectionUpdate()

    editor.on("selectionUpdate", handleSelectionUpdate)
    return () => {
      editor.off("selectionUpdate", handleSelectionUpdate)
    }
  }, [editor, hideWhenUnavailable, align, extensionName, attributeName])

  const handleImageAlign = useCallback(() => {
    if (!editor) return false

    const success = setImageAlign(editor, align, extensionName, attributeName)
    if (success) {
      onAligned?.()
    }
    return success
  }, [editor, align, extensionName, attributeName, onAligned])

  useHotkeys(
    IMAGE_ALIGN_SHORTCUT_KEYS[align],
    (event) => {
      event.preventDefault()
      handleImageAlign()
    },
    {
      enabled: isVisible && canAlign,
      enableOnContentEditable: !isMobile,
      enableOnFormTags: true,
    }
  )

  return {
    isVisible,
    isActive,
    handleImageAlign,
    canAlign,
    label: imageAlignLabels[align],
    shortcutKeys: IMAGE_ALIGN_SHORTCUT_KEYS[align],
    Icon: imageAlignIcons[align],
  }
}