"use client"

import { useCallback, useEffect, useState } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { type Editor } from "@tiptap/react"
import { NodeSelection } from "@tiptap/pm/state"


import { useTiptapEditor } from "@/hooks/use-tiptap-editor"
import { useIsBreakpoint } from "@/hooks/use-is-breakpoint"


import { CopyIcon } from "@/components/tiptap-icons/copy-icon"

export const DUPLICATE_SHORTCUT_KEY = "mod+d"


export interface UseDuplicateConfig {
  editor?: Editor | null
  hideWhenUnavailable?: boolean
  onDuplicated?: () => void
}


export function canDuplicateNode(editor: Editor | null): boolean {
  if (!editor || !editor.isEditable) return false

  try {
    const { state } = editor
    const { selection } = state

    if (selection instanceof NodeSelection) {
      return !!selection.node
    }

    const $anchor = selection.$anchor.node(1)

    return !!$anchor
  } catch {
    return false
  }
}


export function duplicateNode(editor: Editor | null): boolean {
  if (!editor || !editor.isEditable) return false

  try {
    const { state } = editor
    const { selection } = state
    const chain = editor.chain().focus()

    if (selection instanceof NodeSelection) {
      const selectedNode = selection.node
      const insertPos = selection.to

      chain.insertContentAt(insertPos, selectedNode.toJSON()).run()
      return true
    }

    const $anchor = selection.$anchor

    for (let depth = 1; depth <= $anchor.depth; depth++) {
      const node = $anchor.node(depth)

      if (node.type.name === "doc" || !node.type.spec.group) {
        continue
      }

      const nodeStart = $anchor.start(depth)
      const insertPos = Math.min(
        nodeStart + node.nodeSize,
        state.doc.content.size
      )

      chain.insertContentAt(insertPos, node.toJSON()).run()
      return true
    }

    return false
  } catch {
    return false
  }
}


export function shouldShowButton(props: {
  editor: Editor | null
  hideWhenUnavailable: boolean
}): boolean {
  const { editor, hideWhenUnavailable } = props

  if (!editor || !editor.isEditable) return false

  if (hideWhenUnavailable && !editor.isActive("code")) {
    return canDuplicateNode(editor)
  }

  return true
}


export function useDuplicate(config?: UseDuplicateConfig) {
  const {
    editor: providedEditor,
    hideWhenUnavailable = false,
    onDuplicated,
  } = config || {}

  const { editor } = useTiptapEditor(providedEditor)
  const isMobile = useIsBreakpoint()
  const [isVisible, setIsVisible] = useState<boolean>(true)
  const canDuplicate = canDuplicateNode(editor)

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

  const handleDuplicate = useCallback(() => {
    if (!editor) return false

    const success = duplicateNode(editor)
    if (success) {
      onDuplicated?.()
    }
    return success
  }, [editor, onDuplicated])

  useHotkeys(
    DUPLICATE_SHORTCUT_KEY,
    (event) => {
      event.preventDefault() 
      handleDuplicate()
    },
    {
      enabled: isVisible && canDuplicate,
      enableOnContentEditable: !isMobile,
      enableOnFormTags: true,
    }
  )

  return {
    isVisible,
    handleDuplicate,
    canDuplicate,
    label: "Duplicate node",
    shortcutKeys: DUPLICATE_SHORTCUT_KEY,
    Icon: CopyIcon,
  }
}