"use client"

import { useCallback, useEffect, useState } from "react"
import { isNodeSelection, type Editor } from "@tiptap/react"
import { useHotkeys } from "react-hotkeys-hook"


import {
  isExtensionAvailable,
  isNodeTypeSelected,
} from "@/lib/tiptap-utils"


import { useTiptapEditor } from "@/hooks/use-tiptap-editor"
import { useIsBreakpoint } from "@/hooks/use-is-breakpoint"


import { AiSparklesIcon } from "@/components/tiptap-icons/ai-sparkles-icon"

export interface UseAiAskConfig {
  editor?: Editor | null
  hideWhenUnavailable?: boolean
  onAiAsked?: () => void
}

export const AI_ASK_SHORTCUT_KEY = "mod+j"
export const AI_EXTENSIONS = ["aiGeneration", "ai"]
export const EXCLUDED_SELECTION_TYPES = ["codeBlock", "image", "imageUpload"]

export const canPerformAiAsk = (editor: Editor | null): boolean => {
  if (!editor || !editor.isEditable) return false
  if (
    !isExtensionAvailable(editor, AI_EXTENSIONS) ||
    isNodeTypeSelected(editor, ["image", "horizontalRule"])
  )
    return false

  const { selection } = editor.state
  if (!selection || selection.empty) return false

  if (isNodeSelection(selection)) {
    const selectedNode = selection.node
    if (EXCLUDED_SELECTION_TYPES.includes(selectedNode.type.name)) {
      return false
    }
  }

  return true
}

export function shouldShowButton(props: {
  editor: Editor | null
  hideWhenUnavailable: boolean
}): boolean {
  const { editor, hideWhenUnavailable } = props

  if (!editor || !editor.isEditable) return false
  if (!isExtensionAvailable(editor, AI_EXTENSIONS)) return false

  if (hideWhenUnavailable && !editor.isActive("code")) {
    return canPerformAiAsk(editor)
  }

  return true
}


export function useAiAsk(config: UseAiAskConfig = {}) {
  const {
    editor: providedEditor,
    hideWhenUnavailable = false,
    onAiAsked,
  } = config

  const { editor } = useTiptapEditor(providedEditor)
  const isMobile = useIsBreakpoint()
  const [isVisible, setIsVisible] = useState<boolean>(true)
  const canAiAsk = canPerformAiAsk(editor)

  const handleAiAsk = useCallback((): boolean => {
    if (!editor || !canAiAsk) return false

    const success = editor.chain().focus().aiGenerationShow().run()
    if (success) {
      onAiAsked?.()
    }
    return success
  }, [canAiAsk, editor, onAiAsked])

  useEffect(() => {
    if (!editor) {
      setIsVisible(false)
      return
    }

    const updateVisibility = () => {
      setIsVisible(shouldShowButton({ editor, hideWhenUnavailable }))
    }

    updateVisibility()

    editor.on("selectionUpdate", updateVisibility)

    return () => {
      editor.off("selectionUpdate", updateVisibility)
    }
  }, [editor, hideWhenUnavailable])

  useHotkeys(
    AI_ASK_SHORTCUT_KEY,
    (event) => {
      event.preventDefault()
      handleAiAsk()
    },
    {
      enabled: isVisible && canAiAsk,
      enableOnContentEditable: !isMobile,
      enableOnFormTags: true,
    }
  )

  return {
    isVisible,
    handleAiAsk,
    canAiAsk,
    label: "Ask AI Assistant",
    shortcutKeys: AI_ASK_SHORTCUT_KEY,
    Icon: AiSparklesIcon,
  }
}